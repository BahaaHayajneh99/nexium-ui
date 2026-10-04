// Must stay in sync with PLAN_PRICES in projects/demo/src/app/pro-upgrade/pro-upgrade.ts - the
// client renders these same two prices, but the PLAN is always derived here from what PayPal
// actually confirms was paid, never trusted from the client.
const PLAN_PRICES = { lifetime: '199.00', yearly: '59.00' };

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

module.exports = { PLAN_PRICES, getPaypalAccessToken, verifyPaypalOrder };
