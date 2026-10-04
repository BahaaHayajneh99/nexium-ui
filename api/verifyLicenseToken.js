const { applyCors } = require('./_lib/cors');
const { getDb } = require('./_lib/firebase-admin');

/**
 * Looked up by the published library's `nxProLicenseGranted()` (see
 * projects/components/src/lib/licensing/nx-license.ts) from any consuming app, anywhere - no
 * mutation, no PayPal call, just a pool lookup. Formerly a Firebase Cloud Function; moved here so
 * it can run on Vercel's free Hobby tier with no billing account required at all.
 */
module.exports = async (req, res) => {
  if (applyCors(req, res)) return;

  const token = req.method === 'POST' ? req.body?.token : req.query.token;
  if (!token || typeof token !== 'string') {
    res.status(400).json({ valid: false, error: 'Missing token' });
    return;
  }

  try {
    const snapshot = await getDb().ref(`licenseTokens/${token}`).get();
    const record = snapshot.val();
    // A missing expiresAt (tokens claimed before yearly plans existed) is treated as lifetime,
    // same as an explicit null.
    const notExpired = !record?.expiresAt || new Date(record.expiresAt).getTime() > Date.now();
    const valid = snapshot.exists() && record.status === 'paid' && notExpired;
    res.status(200).json({ valid });
  } catch (error) {
    console.error('verifyLicenseToken failed', error);
    res.status(500).json({ valid: false, error: 'Internal error while verifying the token.' });
  }
};
