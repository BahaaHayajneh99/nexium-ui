const { applyCors } = require('./_lib/cors');
const { getDb } = require('./_lib/firebase-admin');
const { PLAN_PRICES, getPaypalAccessToken, verifyPaypalOrder } = require('./_lib/paypal');

const YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const MAX_CLAIM_ATTEMPTS = 5;

/**
 * Claims one 'available' token, retrying a few times if it loses a race to another claim.
 *
 * Uses a re-read-then-update rather than a real RTDB transaction - the Realtime Database
 * emulator's `.transaction()` has a known bug where the callback receives `null` for the current
 * value even when the path genuinely exists, which made every claim fail locally. This leaves a
 * small race window (two simultaneous claims could both pass the re-read before either writes),
 * same accepted tradeoff already made for the non-transactional `stats` counters below - low risk
 * at this traffic scale, and it behaves identically in the emulator and in production.
 */
async function claimAvailableToken(db, plan) {
  const expiresAt = plan === 'yearly' ? new Date(Date.now() + YEAR_MS).toISOString() : null;

  for (let attempt = 0; attempt < MAX_CLAIM_ATTEMPTS; attempt++) {
    const query = db.ref('licenseTokens').orderByChild('status').equalTo('available').limitToFirst(1);
    const snapshot = await query.get();
    if (!snapshot.exists()) {
      return null; // pool exhausted
    }

    const [tokenKey] = Object.keys(snapshot.val());
    const tokenRef = db.ref(`licenseTokens/${tokenKey}`);

    const freshSnapshot = await tokenRef.get();
    if (!freshSnapshot.exists() || freshSnapshot.val().status !== 'available') {
      continue; // someone else claimed it first - loop and try the next available token
    }

    await tokenRef.update({ status: 'paid', plan, expiresAt });
    return tokenKey;
  }
  return null;
}

/**
 * Called by pro-upgrade.ts right after PayPal checkout capture succeeds. Re-verifies the order
 * directly with PayPal's REST API before handing out a real token - the client never sees
 * anything it could forge or replay. Formerly a Firebase Cloud Function; moved here so it can run
 * on Vercel's free Hobby tier with no billing account required at all.
 */
module.exports = async (req, res) => {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const orderId = req.body?.orderId;
  if (!orderId || typeof orderId !== 'string') {
    res.status(400).json({ error: 'Missing orderId' });
    return;
  }

  const db = getDb();

  try {
    // Idempotency: a retried/duplicate request for an order that already claimed a token
    // gets the same token back instead of claiming a second one.
    const existingPurchase = await db.ref(`purchases/${orderId}`).get();
    if (existingPurchase.exists()) {
      res.status(200).json({ token: existingPurchase.val().token });
      return;
    }

    const apiBase = process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com';
    const accessToken = await getPaypalAccessToken(
      apiBase,
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET,
    );
    const verification = await verifyPaypalOrder(orderId, apiBase, accessToken);
    if (!verification.ok) {
      console.warn('PayPal order verification failed', { orderId, reason: verification.reason });
      res.status(402).json({ error: `Payment could not be verified: ${verification.reason}` });
      return;
    }

    const claimedTokenKey = await claimAvailableToken(db, verification.plan);
    if (!claimedTokenKey) {
      console.error('License token pool exhausted', { orderId });
      res.status(410).json({ error: 'No license tokens left - please contact support.' });
      return;
    }

    const amountUsd = PLAN_PRICES[verification.plan];
    const capturedAt = new Date().toISOString();
    await db.ref(`purchases/${orderId}`).set({
      token: claimedTokenKey,
      plan: verification.plan,
      amountUsd,
      currency: 'USD',
      status: 'COMPLETED',
      payerEmail: verification.payerEmail ?? null,
      payerName: verification.payerName ?? null,
      capturedAt,
    });

    const totalsSnapshot = await db.ref('stats').get();
    const totals = totalsSnapshot.val() || {};
    await db.ref('stats').update({
      totalPurchases: (totals.totalPurchases || 0) + 1,
      totalRevenueUsd: (totals.totalRevenueUsd || 0) + Number(amountUsd),
      licenseTokensAvailable: Math.max(0, (totals.licenseTokensAvailable || 0) - 1),
      licenseTokensPaid: (totals.licenseTokensPaid || 0) + 1,
    });

    res.status(200).json({ token: claimedTokenKey });
  } catch (error) {
    console.error('claimLicenseToken failed', error);
    res.status(500).json({ error: 'Internal error while claiming a license token.' });
  }
};
