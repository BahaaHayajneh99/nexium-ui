const crypto = require('crypto');
const admin = require('firebase-admin');
const { applyCors } = require('./_lib/cors');
const { getDb } = require('./_lib/firebase-admin');

/** Vercel's geo headers are URI-encoded (e.g. "S%C3%A3o%20Paulo"). */
function readGeoHeader(req, name) {
  const value = req.headers[name];
  if (!value || typeof value !== 'string') return 'Unknown';
  try {
    return decodeURIComponent(value).slice(0, 100);
  } catch {
    return 'Unknown';
  }
}

/**
 * Counts unique docs-site visitors. Formerly done straight from the browser, which needed the
 * `visitors` node to be world-readable and world-writable and stored every visitor's raw IP where
 * anyone could download it. Now the browser just pings this endpoint: the visitor is keyed by a
 * salted hash of their IP (never the IP itself), location comes from Vercel's own geo headers
 * instead of third-party GeoIP APIs, and the database rules can deny all client access.
 */
module.exports = async (req, res) => {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const forwardedFor = req.headers['x-forwarded-for'];
  const ip = (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0] : req.socket?.remoteAddress || '').trim();
  if (!ip) {
    res.status(204).end();
    return;
  }

  try {
    const salt = process.env.VISITOR_HASH_SALT || 'nexium-ui-visitors';
    const visitorKey = crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
    const db = getDb();
    const visitorRef = db.ref(`visitors/${visitorKey}`);

    if (!(await visitorRef.get()).exists()) {
      await visitorRef.set({
        visitedAt: new Date().toISOString(),
        country: readGeoHeader(req, 'x-vercel-ip-country'),
        city: readGeoHeader(req, 'x-vercel-ip-city'),
      });
      await db.ref('stats/totalUniqueVisitors').set(admin.database.ServerValue.increment(1));
    }

    res.status(204).end();
  } catch (error) {
    console.error('trackVisitor failed', error);
    res.status(500).json({ error: 'Internal error while tracking the visit.' });
  }
};
