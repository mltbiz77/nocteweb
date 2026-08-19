/**
 * ── Contact form handler ─────────────────────────────────────────────────
 *
 * A Vercel Serverless Function. Free on the Hobby plan, no third-party form
 * service, nothing to maintain. It supports two providers and picks whichever
 * one is configured — set exactly one of these in the Vercel project's
 * environment variables:
 *
 *   RESEND_API_KEY         Resend (resend.com). Free tier: 3,000 emails/month.
 *                          Requires verifying nocteventures.com in Resend and
 *                          adding the DNS records it gives you. Also set
 *                          CONTACT_FROM (e.g. "Nocte Ventures <site@nocteventures.com>").
 *
 *   WEB3FORMS_ACCESS_KEY   Web3Forms (web3forms.com). Free, 250 submissions/month,
 *                          no DNS setup — you just confirm your email address
 *                          once and paste the access key here.
 *
 * With neither set the endpoint returns 503 `not_configured`, and the form on
 * the site falls back to opening a pre-filled mail draft. The contact page is
 * therefore never broken, only ever less convenient.
 */

const TO_EMAIL = process.env.CONTACT_TO || 'hello@nocteventures.com';
const FROM_EMAIL = process.env.CONTACT_FROM || 'Nocte Ventures <onboarding@resend.dev>';

const LIMITS = { name: 120, email: 200, company: 160, message: 5000 };

const clean = (value, max) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

/** Deliberately permissive — the mail server is the real validator. */
const looksLikeEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

async function sendWithResend({ name, email, company, message }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `Website enquiry — ${name}${company ? ` (${company})` : ''}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Company: ${company || '—'}`,
        '',
        message,
        '',
        '— sent from the contact form on nocteventures.com',
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}

async function sendWithWeb3Forms({ name, email, company, message }) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
      subject: `Website enquiry — ${name}${company ? ` (${company})` : ''}`,
      from_name: 'nocteventures.com',
      name,
      email,
      company: company || '—',
      message,
    }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.success === false) {
    throw new Error(`Web3Forms responded ${response.status}: ${JSON.stringify(result)}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};

  // Honeypot: real people leave this hidden field empty. Answer 200 so a bot
  // filling it in learns nothing from the response.
  if (clean(body.website, 200)) return res.status(200).json({ ok: true });

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const company = clean(body.company, LIMITS.company);
  const message = clean(body.message, LIMITS.message);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'missing_fields' });
  }
  if (!looksLikeEmail(email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  try {
    if (process.env.RESEND_API_KEY) {
      await sendWithResend({ name, email, company, message });
    } else if (process.env.WEB3FORMS_ACCESS_KEY) {
      await sendWithWeb3Forms({ name, email, company, message });
    } else {
      // No provider configured yet — the client falls back to a mail draft.
      return res.status(503).json({ error: 'not_configured' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[contact] delivery failed:', error);
    return res.status(502).json({ error: 'delivery_failed' });
  }
}

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}
