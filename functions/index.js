const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret, defineString } = require('firebase-functions/params');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.database();

const PAYPAL_CLIENT_ID = defineSecret('PAYPAL_CLIENT_ID');
const PAYPAL_CLIENT_SECRET = defineSecret('PAYPAL_CLIENT_SECRET');
// Sandbox by default - switch to https://api-m.paypal.com once you flip pro-upgrade.ts's
// PAYPAL_CLIENT_ID from 'sb' to a real live Client ID.
const PAYPAL_API_BASE = defineString('PAYPAL_API_BASE', {
  default: 'https://api-m.sandbox.paypal.com',
});
const PRO_PRICE_USD = '19.00';
const MAX_CLAIM_ATTEMPTS = 5;

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
  if (paidAmount !== PRO_PRICE_USD) {
    return { ok: false, reason: `paid amount '${paidAmount}' does not match expected '${PRO_PRICE_USD}'` };
  }
  const payer = order.payer || {};
  return {
    ok: true,
    payerEmail: payer.email_address,
    payerName: [payer.name?.given_name, payer.name?.surname].filter(Boolean).join(' ') || undefined,
  };
}

/** Atomically claims one 'available' token, retrying a few times if it loses a race to another claim. */
async function claimAvailableToken() {
  for (let attempt = 0; attempt < MAX_CLAIM_ATTEMPTS; attempt++) {
    const query = db.ref('licenseTokens').orderByChild('status').equalTo('available').limitToFirst(1);
    const snapshot = await query.get();
    if (!snapshot.exists()) {
      return null; // pool exhausted
    }

    const [tokenKey] = Object.keys(snapshot.val());
    const tokenRef = db.ref(`licenseTokens/${tokenKey}`);
    const result = await tokenRef.transaction((current) => {
      if (!current || current.status !== 'available') {
        return undefined; // someone else claimed it first - abort, caller retries
      }
      return { ...current, status: 'paid' };
    });

    if (result.committed) {
      return tokenKey;
    }
    // lost the race - loop and try again with the next available token
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

      const claimedTokenKey = await claimAvailableToken();
      if (!claimedTokenKey) {
        logger.error('License token pool exhausted', { orderId });
        res.status(410).json({ error: 'No license tokens left - please contact support.' });
        return;
      }

      const capturedAt = new Date().toISOString();
      await db.ref(`purchases/${orderId}`).set({
        token: claimedTokenKey,
        amountUsd: PRO_PRICE_USD,
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
        totalRevenueUsd: (totals.totalRevenueUsd || 0) + Number(PRO_PRICE_USD),
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
    const valid = snapshot.exists() && snapshot.val().status === 'paid';
    res.status(200).json({ valid });
  } catch (error) {
    logger.error('verifyLicenseToken failed', error);
    res.status(500).json({ valid: false, error: 'Internal error while verifying the token.' });
  }
});
