/**
 * Request values end up as Realtime Database path segments (`licenseTokens/${token}`), so anything
 * containing '/', '.', '#', '$', '[' or ']' must be rejected before it reaches `db.ref()` - otherwise
 * a caller could point the lookup at a different node than the one intended.
 */
const LICENSE_TOKEN_PATTERN = /^[A-Za-z0-9_-]{8,128}$/;

// PayPal order ids are short upper-case alphanumeric strings (e.g. 5O190127TN364715T).
const PAYPAL_ORDER_ID_PATTERN = /^[A-Z0-9]{8,32}$/;

function isValidLicenseToken(value) {
  return typeof value === 'string' && LICENSE_TOKEN_PATTERN.test(value);
}

function isValidPaypalOrderId(value) {
  return typeof value === 'string' && PAYPAL_ORDER_ID_PATTERN.test(value);
}

module.exports = { isValidLicenseToken, isValidPaypalOrderId };
