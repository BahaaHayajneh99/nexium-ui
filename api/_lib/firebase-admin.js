const admin = require('firebase-admin');

/**
 * Lazily initializes the Admin SDK against the same `nexium-ui` Realtime Database the old Cloud
 * Functions used - just with a cert credential built from Vercel env vars instead of the
 * ambient service-account identity a Cloud Function gets for free. Guarded by `admin.apps.length`
 * because Vercel can reuse a warm lambda instance across invocations, and `initializeApp` throws
 * if called twice.
 */
/**
 * Vercel env vars are single-line - the real key's embedded newlines are escaped as literal
 * "\n" and must be restored before the SDK will accept it. Also tolerates a pair of wrapping
 * quote characters, which easily end up as part of the value when copy-pasting the "private_key"
 * field straight out of the downloaded service-account JSON (its JSON string quotes aren't part
 * of the actual key, but it's an easy mistake to include them) - without stripping them, the SDK
 * fails with "Invalid PEM formatted message" since the key no longer starts with "-----BEGIN".
 */
function normalizePrivateKey(raw) {
  let key = (raw || '').trim();
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, '\n');
}

function getDb() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY),
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://nexium-ui-default-rtdb.firebaseio.com',
    });
  }
  return admin.database();
}

module.exports = { getDb };
