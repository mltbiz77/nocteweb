import { useState, type FormEvent } from 'react';
import { CONTACT_EMAIL } from '@/data/company';

type Status = 'idle' | 'sending' | 'sent' | 'fallback' | 'error';

const FIELD =
  'w-full rounded-xl border border-line bg-card px-4 py-3 text-sm text-ink placeholder:text-ink-faint/70 transition-colors duration-200 focus:border-moonlight/40 focus:outline-none focus:ring-0';

const LABEL = 'block text-[11px] uppercase tracking-[0.2em] text-ink-faint mb-2';

/** Builds the mail draft used when no delivery provider is configured. */
const mailtoFor = (form: { name: string; email: string; company: string; message: string }) => {
  const subject = `Enquiry from ${form.name || 'the website'}${form.company ? ` — ${form.company}` : ''}`;
  const body = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Company: ${form.company || '—'}`,
    '',
    form.message,
  ].join('\n');
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/**
 * Posts to `/api/contact`. If that endpoint has no mail provider configured
 * yet (503) or cannot be reached, we open a pre-filled draft in the visitor's
 * mail client instead of failing — the message still gets written and sent,
 * just by them rather than by us.
 */
export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', website: '' });
  const [status, setStatus] = useState<Status>('idle');

  const set = (key: keyof typeof form) => (event: { target: { value: string } }) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus('sent');
        return;
      }
      if (response.status === 400) {
        setStatus('error');
        return;
      }
      // 503 not_configured, 502 delivery_failed, or anything unexpected.
      window.location.href = mailtoFor(form);
      setStatus('fallback');
    } catch {
      window.location.href = mailtoFor(form);
      setStatus('fallback');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-line bg-card p-9 sm:p-10 text-center">
        <h3 className="font-display text-2xl mb-3" style={{ fontWeight: 420 }}>
          Message sent.
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed max-w-[40ch] mx-auto">
          Thank you — we read everything that comes in and normally reply within two working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-card p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="cf-name">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            className={FIELD}
            placeholder="Your name"
            value={form.name}
            onChange={set('name')}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="cf-email">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={FIELD}
            placeholder="you@company.com"
            value={form.email}
            onChange={set('email')}
          />
        </div>
      </div>

      <div className="mt-5">
        <label className={LABEL} htmlFor="cf-company">
          Company <span className="normal-case tracking-normal text-ink-faint/70">(optional)</span>
        </label>
        <input
          id="cf-company"
          name="company"
          maxLength={160}
          autoComplete="organization"
          className={FIELD}
          placeholder="Where you work"
          value={form.company}
          onChange={set('company')}
        />
      </div>

      <div className="mt-5">
        <label className={LABEL} htmlFor="cf-message">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          className={`${FIELD} resize-y`}
          placeholder="What are you working on, and where could we help?"
          value={form.message}
          onChange={set('message')}
        />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={set('website')}
        />
      </div>

      <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-medium tracking-wide rounded-full bg-white text-black transition-all duration-300 hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p className="text-xs text-ink-faint leading-relaxed">
          We use what you send only to reply. See our{' '}
          <a href="/privacy/" className="text-ink-muted hover:text-ink transition-colors">
            privacy policy
          </a>
          .
        </p>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {status === 'sending' ? 'Sending your message' : ''}
      </p>

      {status === 'fallback' ? (
        <p className="mt-5 text-sm text-ink-muted leading-relaxed">
          We opened a pre-filled draft in your mail app — press send there and it reaches us. If
          nothing opened, email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink hover:underline">
            {CONTACT_EMAIL}
          </a>{' '}
          directly.
        </p>
      ) : null}

      {status === 'error' ? (
        <p className="mt-5 text-sm text-ink-muted leading-relaxed">
          Something in the form was rejected — check the name, email, and message fields, or just
          email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
