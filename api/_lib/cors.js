/**
 * Replaces Firebase's `onRequest({ cors: true })` - Vercel functions get no automatic CORS
 * handling, so every handler calls this first and returns immediately if it handled an OPTIONS
 * preflight. Allowing all origins is safe here: every endpoint either does a read-only lookup
 * keyed by an unguessable token, or re-verifies the sensitive part (the PayPal order) itself
 * server-side - nothing trusts the calling origin.
 */
function applyCors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}

module.exports = { applyCors };
