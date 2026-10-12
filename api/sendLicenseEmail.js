const { applyCors } = require('./_lib/cors');
const { getDb } = require('./_lib/firebase-admin');
const { isValidLicenseToken } = require('./_lib/validate');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
// Caps how many emails one token can trigger, so a token holder can't use this endpoint to spam
// arbitrary addresses or burn through the Resend sending quota.
const MAX_SENDS_PER_TOKEN = 3;
const SEND_WINDOW_MS = 24 * 60 * 60 * 1000;

/** Records one send for this token; returns false if the token already hit its limit in the current window. */
async function reserveEmailSend(db, token) {
  const ref = db.ref(`emailSends/${token}`);
  const now = Date.now();
  const record = (await ref.get()).val();
  if (!record || now - record.windowStart > SEND_WINDOW_MS) {
    await ref.set({ windowStart: now, count: 1 });
    return true;
  }
  if (record.count >= MAX_SENDS_PER_TOKEN) {
    return false;
  }
  await ref.update({ count: record.count + 1 });
  return true;
}
// Resend's shared onboarding sender works with no setup but looks less trustworthy and has low
// sending limits - verify your own domain in Resend and set FROM_EMAIL once you have one.
const FROM_EMAIL = process.env.FROM_EMAIL || 'NexiumUI <onboarding@resend.dev>';

/**
 * Emails an already-claimed license token to an address the buyer types in themselves - a backup
 * delivery path since the pro-upgrade success screen only ever shows the token once. Only ever
 * sends a token that's genuinely a paid license (looked up first) - this endpoint accepts an
 * arbitrary caller-supplied destination address, so it must never become an open mail relay.
 *
 * Formerly a Firebase Cloud Function; moved here so it can run on Vercel's free Hobby tier with
 * no billing account required at all.
 */
module.exports = async (req, res) => {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const token = req.body?.token;
  const email = req.body?.email;
  if (!isValidLicenseToken(token)) {
    res.status(400).json({ error: 'Missing or invalid token' });
    return;
  }
  if (!email || typeof email !== 'string' || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    res.status(400).json({ error: 'Missing or invalid email address' });
    return;
  }

  try {
    const db = getDb();
    const snapshot = await db.ref(`licenseTokens/${token}`).get();
    const record = snapshot.val();
    if (!snapshot.exists() || record.status !== 'paid') {
      res.status(404).json({ error: 'Unknown or unpaid license token' });
      return;
    }

    if (!(await reserveEmailSend(db, token))) {
      res.status(429).json({ error: 'Too many emails sent for this license today - please try again tomorrow.' });
      return;
    }

    const providerSnippet =
      "import { provideNxLicense } from 'nexium-ui';\n\nproviders: [\n  provideNxLicense('" +
      token +
      "'),\n]";

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: 'Your NexiumUI PRO license token',
        text:
          `Thanks for your purchase!\n\nYour license token:\n${token}\n\n` +
          `Add it to your app's bootstrap providers:\n\n${providerSnippet}\n\n` +
          `Keep this email - it's the only copy of your token we can resend you.`,
        html:
          `<p>Thanks for your purchase!</p><p>Your license token:</p>` +
          `<pre style="padding:10px;background:#111;color:#7ee787;border-radius:6px;">${token}</pre>` +
          `<p>Add it to your app's bootstrap providers:</p>` +
          `<pre style="padding:10px;background:#111;color:#e6e6e6;border-radius:6px;">${providerSnippet}</pre>` +
          `<p>Keep this email - it's the only copy of your token we can resend you.</p>`,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Resend API call failed', { status: response.status, errorBody });
      res.status(502).json({ error: 'Failed to send email' });
      return;
    }

    res.status(200).json({ sent: true });
  } catch (error) {
    console.error('sendLicenseEmail failed', error);
    res.status(500).json({ error: 'Internal error while sending the email.' });
  }
};
