/**
 * One-time (and re-runnable) admin script that tops up the PRO license token pool.
 *
 * Against your REAL production database:
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json node seed-license-tokens.js --count 1000
 *
 * Download a service-account key from the Firebase console (Project Settings > Service
 * Accounts > Generate new private key) - this script needs Admin SDK access, it will NOT work
 * with the public firebaseConfig used by the client apps.
 *
 * Against the LOCAL emulator (for testing, e.g. alongside `firebase emulators:start`) - no
 * credentials needed at all, just point the Admin SDK at the emulator host:
 *   set FIREBASE_DATABASE_EMULATOR_HOST=127.0.0.1:9000   (PowerShell: $env:FIREBASE_DATABASE_EMULATOR_HOST="127.0.0.1:9000")
 *   node seed-license-tokens.js --count 20
 *
 * Re-run any time the pool is running low (e.g. with --count 10000 once the library takes off) -
 * it only ever adds new 'available' tokens, it never touches existing ones.
 */
const admin = require('firebase-admin');
const { generateRandomToken } = require('./token-format');

const countArgIndex = process.argv.indexOf('--count');
const count = countArgIndex !== -1 ? Number(process.argv[countArgIndex + 1]) : 1000;

if (!Number.isFinite(count) || count <= 0) {
  console.error('Usage: node seed-license-tokens.js --count <number>');
  process.exit(1);
}

const usingEmulator = !!process.env.FIREBASE_DATABASE_EMULATOR_HOST;

// The emulator accepts any/no credentials, so skip resolving real Google credentials in that
// case - that's what lets this script seed the emulator without a service account key at all.
admin.initializeApp({
  projectId: 'nexium-ui',
  databaseURL: 'https://nexium-ui-default-rtdb.firebaseio.com',
  ...(usingEmulator ? {} : { credential: admin.credential.applicationDefault() }),
});

const db = admin.database();

async function seed() {
  const updates = {};
  for (let i = 0; i < count; i++) {
    const token = generateRandomToken();
    updates[`licenseTokens/${token}`] = {
      status: 'available',
      createdAt: new Date().toISOString(),
    };
  }

  await db.ref().update(updates);

  const statsSnapshot = await db.ref('stats').get();
  const stats = statsSnapshot.val() || {};
  await db.ref('stats').update({
    licenseTokensAvailable: (stats.licenseTokensAvailable || 0) + count,
    licenseTokensTotal: (stats.licenseTokensTotal || 0) + count,
  });

  console.log(`Seeded ${count} new available license tokens.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
