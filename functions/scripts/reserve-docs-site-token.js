/**
 * One-off admin script: claims a single token from the pool (marking it 'paid') reserved for the
 * docs site's own bootstrap trust (projects/demo/src/app/app.config.ts's DOCS_SITE_LICENSE_TOKEN)
 * so every demo page always shows real, working PRO content regardless of a visitor's own
 * license status - the same trust model as before, just backed by a real pool entry instead of a
 * locally-forged token.
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json node reserve-docs-site-token.js
 *
 * Run this once (re-running is harmless but wasteful - it'll just claim a second, unused token).
 * Paste the printed token into DOCS_SITE_LICENSE_TOKEN in app.config.ts.
 */
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // databaseURL: 'https://nexium-ui-default-rtdb.<your-region>.firebasedatabase.app',
});

const db = admin.database();
const RESERVED_ORDER_ID = 'nexium-ui-docs-site';

async function reserve() {
  const existing = await db.ref(`purchases/${RESERVED_ORDER_ID}`).get();
  if (existing.exists()) {
    console.log('Docs-site token was already reserved:');
    console.log(existing.val().token);
    process.exit(0);
  }

  const query = db.ref('licenseTokens').orderByChild('status').equalTo('available').limitToFirst(1);
  const snapshot = await query.get();
  if (!snapshot.exists()) {
    console.error('No available tokens - run seed-license-tokens.js first.');
    process.exit(1);
  }

  const [tokenKey] = Object.keys(snapshot.val());
  await db.ref(`licenseTokens/${tokenKey}`).update({
    status: 'paid',
    claimedOrderId: RESERVED_ORDER_ID,
    claimedAt: new Date().toISOString(),
  });
  await db.ref(`purchases/${RESERVED_ORDER_ID}`).set({
    token: tokenKey,
    amountUsd: '0.00',
    currency: 'USD',
    status: 'RESERVED',
    capturedAt: new Date().toISOString(),
  });

  console.log('Reserved docs-site token - paste this into app.config.ts:');
  console.log(tokenKey);
  process.exit(0);
}

reserve().catch((error) => {
  console.error('Reservation failed:', error);
  process.exit(1);
});
