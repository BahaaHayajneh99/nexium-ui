const admin = require('firebase-admin');

/**
 * Lazily initializes the Admin SDK against the same `nexium-ui` Realtime Database the old Cloud
 * Functions used - just with a cert credential built from Vercel env vars instead of the
 * ambient service-account identity a Cloud Function gets for free. Guarded by `admin.apps.length`
 * because Vercel can reuse a warm lambda instance across invocations, and `initializeApp` throws
 * if called twice.
 */
function getDb() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Vercel env vars are single-line - the real key's embedded newlines are escaped as
        // literal "\n" and must be restored before the SDK will accept it.
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://nexium-ui-default-rtdb.firebaseio.com',
    });
  }
  return admin.database();
}

module.exports = { getDb };
