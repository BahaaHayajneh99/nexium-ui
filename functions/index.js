// SUPERSEDED - no longer deployed (firebase.json has no "functions" entry anymore). These three
// endpoints now live at api/verifyLicenseToken.js, api/claimLicenseToken.js, api/sendLicenseEmail.js
// as Vercel serverless functions instead, so the license-pool backend works without ever needing
// Firebase's paid Blaze plan. Kept here only as reference for the ported logic; safe to delete.
const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret, defineString } = require('firebase-functions/params');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');

admin.initializeApp({
  databaseURL: 'https://nexium-ui-default-rtdb.firebaseio.com',
});
const db = admin.database();

const PAYPAL_CLIENT_ID = defineSecret('PAYPAL_CLIENT_ID');
const PAYPAL_CLIENT_SECRET = defineSecret('PAYPAL_CLIENT_SECRET');
// Sandbox by default - switch to https://api-m.paypal.com once you flip pro-upgrade.ts's
// PAYPAL_CLIENT_ID from 'sb' to a real live Client ID.
const PAYPAL_API_BASE = defineString('PAYPAL_API_BASE', {
  default: 'https://api-m.sandbox.paypal.com',
});
// Must stay in sync with PLAN_PRICES in projects/demo/src/app/pro-upgrade/pro-upgrade.ts - the
// client renders these same two prices, but the PLAN is always derived here from what PayPal
// actually confirms was paid, never trusted from the client.
const PLAN_PRICES = { lifetime: '199.00', yearly: '59.00' };
const YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const MAX_CLAIM_ATTEMPTS = 5;

const RESEND_API_KEY = defineSecret('RESEND_API_KEY');
// Resend's shared onboarding sender works with no setup but looks less trustworthy and has low
// sending limits - verify your own domain in Resend and override this once you have one.
const FROM_EMAIL = defineString('FROM_EMAIL', { default: 'NexiumUI <onboarding@resend.dev>' });
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** OAuth2 client-credentials token for PayPal's REST API - never exposed to any client. */
async function getPaypalAccessToken(apiBase, clientId, clientSecret) {
  const response = await fetch(`${apiBase}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!response.ok) {
    throw new Error(`PayPal OAuth failed: ${response.status}`);
  }
  const data = await response.json();
  return data.access_token;
}

/** Confirms an order is really captured and paid the expected amount - directly with PayPal, server-side. */
async function verifyPaypalOrder(orderId, apiBase, accessToken) {
  const response = await fetch(`${apiBase}/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    return { ok: false, reason: `order lookup failed (${response.status})` };
  }
  const order = await response.json();
  if (order.status !== 'COMPLETED') {
    return { ok: false, reason: `order status is '${order.status}', not COMPLETED` };
  }
  const capture = order.purchase_units?.[0]?.payments?.captures?.[0];
  const paidAmount = capture?.amount?.value;
  const matchedPlan = Object.entries(PLAN_PRICES).find(([, price]) => price === paidAmount)?.[0];
  if (!matchedPlan) {
    return { ok: false, reason: `paid amount '${paidAmount}' does not match any known plan price` };
  }
  const payer = order.payer || {};
  return {
    ok: true,
    plan: matchedPlan,
    payerEmail: payer.email_address,
    payerName: [payer.name?.given_name, payer.name?.surname].filter(Boolean).join(' ') || undefined,
  };
}

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
async function claimAvailableToken(plan) {
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

exports.claimLicenseToken = onRequest(
  { secrets: [PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET], cors: true },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const orderId = req.body?.orderId;
    if (!orderId || typeof orderId !== 'string') {
      res.status(400).json({ error: 'Missing orderId' });
      return;
    }

    try {
      // Idempotency: a retried/duplicate request for an order that already claimed a token
      // gets the same token back instead of claiming a second one.
      const existingPurchase = await db.ref(`purchases/${orderId}`).get();
      if (existingPurchase.exists()) {
        res.status(200).json({ token: existingPurchase.val().token });
        return;
      }

      const accessToken = await getPaypalAccessToken(
        PAYPAL_API_BASE.value(),
        PAYPAL_CLIENT_ID.value(),
        PAYPAL_CLIENT_SECRET.value(),
      );
      const verification = await verifyPaypalOrder(orderId, PAYPAL_API_BASE.value(), accessToken);
      if (!verification.ok) {
        logger.warn('PayPal order verification failed', { orderId, reason: verification.reason });
        res.status(402).json({ error: `Payment could not be verified: ${verification.reason}` });
        return;
      }

      const claimedTokenKey = await claimAvailableToken(verification.plan);
      if (!claimedTokenKey) {
        logger.error('License token pool exhausted', { orderId });
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
      logger.error('claimLicenseToken failed', error);
      res.status(500).json({ error: 'Internal error while claiming a license token.' });
    }
  },
);

exports.verifyLicenseToken = onRequest({ cors: true }, async (req, res) => {
  const token = req.method === 'POST' ? req.body?.token : req.query.token;
  if (!token || typeof token !== 'string') {
    res.status(400).json({ valid: false, error: 'Missing token' });
    return;
  }

  try {
    const snapshot = await db.ref(`licenseTokens/${token}`).get();
    const record = snapshot.val();
    // A missing expiresAt (tokens claimed before yearly plans existed) is treated as lifetime,
    // same as an explicit null.
    const notExpired = !record?.expiresAt || new Date(record.expiresAt).getTime() > Date.now();
    const valid = snapshot.exists() && record.status === 'paid' && notExpired;
    res.status(200).json({ valid });
  } catch (error) {
    logger.error('verifyLicenseToken failed', error);
    res.status(500).json({ valid: false, error: 'Internal error while verifying the token.' });
  }
});

/**
 * Emails an already-claimed license token to an address the buyer types in themselves - a backup
 * delivery path since the pro-upgrade success screen only ever shows the token once. Only ever
 * sends a token that's genuinely a paid license (looked up first) - this endpoint accepts an
 * arbitrary caller-supplied destination address, so it must never become an open mail relay.
 */
exports.sendLicenseEmail = onRequest({ secrets: [RESEND_API_KEY], cors: true }, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const token = req.body?.token;
  const email = req.body?.email;
  if (!token || typeof token !== 'string') {
    res.status(400).json({ error: 'Missing token' });
    return;
  }
  if (!email || typeof email !== 'string' || !EMAIL_PATTERN.test(email)) {
    res.status(400).json({ error: 'Missing or invalid email address' });
    return;
  }

  try {
    const snapshot = await db.ref(`licenseTokens/${token}`).get();
    const record = snapshot.val();
    if (!snapshot.exists() || record.status !== 'paid') {
      res.status(404).json({ error: 'Unknown or unpaid license token' });
      return;
    }

    const providerSnippet =
      "import { provideNxLicense } from 'nexium-ui';\n\nproviders: [\n  provideNxLicense('" +
      token +
      "'),\n]";

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY.value()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL.value(),
        to: email,
        subject: 'Your NexiumUI PRO license token',
        text:
          `Thanks for your purchase!\n\nYour license token:\n${token}\n\n` +
          `Add it to your app's bootstrap providers:\n\n${providerSnippet}\n\n` +
          `Keep this email - it's the only copy of your token we can resend you.`,
        html:
          `<p>Thanks for your purchase!</p><p>Your license token:</p>` +
          `<pre style="padding:10px;background:#111;color:#7ee787;border-radius:6px;">${token}</pre>` +
          `<p>Add it to your app's bootstrap providers:</p>` +
          `<pre style="padding:10px;background:#111;color:#e6e6e6;border-radius:6px;">${providerSnippet}</pre>` +
          `<p>Keep this email - it's the only copy of your token we can resend you.</p>`,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      logger.error('Resend API call failed', { status: response.status, errorBody });
      res.status(502).json({ error: 'Failed to send email' });
      return;
    }

    res.status(200).json({ sent: true });
  } catch (error) {
    logger.error('sendLicenseEmail failed', error);
    res.status(500).json({ error: 'Internal error while sending the email.' });
  }
});
