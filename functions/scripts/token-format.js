const crypto = require('crypto');

/** Same opaque token shape used everywhere - a valid Realtime Database key, unguessable. */
function generateRandomToken() {
  return `nxui_pro_${crypto.randomBytes(16).toString('hex')}`;
}

module.exports = { generateRandomToken };
