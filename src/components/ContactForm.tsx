import { useState, type FormEvent } from 'react';
import { CONTACT_EMAIL } from '@/data/company';

type Status = 'idle' | 'sending' | 'sent' | 'fallback' | 'error';

/* Underlined fields, not boxes — the page is a document, so the form is a
   form on paper rather than a stack of rounded inputs. */
const FIELD =
  'w-full border-0 border-b border-rule bg-transparent px-0 py-2.5 font-sans text-[1rem] text-ink placeholder:text-ink-faint/70 transition-colors focus:border-ink focus:outline-none focus:ring-0';

const LABEL = 'block font-mono text-[10px] uppercase tracking-label text-ink-faint mb-1';

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
 * Posts to `/api/contact/`. If that endpoint has no mail provider configured
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
      // Trailing slash on purpose: vercel.json sets trailingSlash, so posting
      // to '/api/contact' costs a 308 hop before the function runs.
      const response = await fetch('/api/contact/', {
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
      window.location.href = mailtoFor(form);
      setStatus('fallback');
    } catch {
      window.location.href = mailtoFor(form);
      setStatus('fallback');
    }
  }

  if (status === 'sent') {
    return (
      <div className="border-t border-ink pt-8">
        <span className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
          Received
        </span>
        <p className="mt-4 font-sans text-[clamp(1.25rem,2.4vw,1.75rem)] tracking-[-0.02em] text-ink">
          Message sent.
        </p>
        <p className="mt-4 max-w-[42ch] font-text text-[1rem] leading-[1.6] text-ink-muted">
          Thank you — we read everything that comes in and normally reply within two working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border-t border-ink pt-8">
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
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

      <div className="mt-7">
        <label className={LABEL} htmlFor="cf-company">
          Company <span className="text-ink-faint/60">(optional)</span>
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

      <div className="mt-7">
        <label className={LABEL} htmlFor="cf-message">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
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

      <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-3 bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-label text-paper transition-colors hover:bg-ink/85 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending' : 'Send message'}
          <span aria-hidden="true">&rarr;</span>
        </button>
        <p className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
          Used only to reply ·{' '}
          <a href="/privacy/" className="link text-accent">
            Privacy
          </a>
        </p>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {status === 'sending' ? 'Sending your message' : ''}
      </p>

      {status === 'fallback' ? (
        <p className="mt-6 max-w-[52ch] font-text text-[0.95rem] leading-[1.6] text-ink-muted">
          We opened a pre-filled draft in your mail app — press send there and it reaches us. If
          nothing opened, email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="link text-accent">
            {CONTACT_EMAIL}
          </a>{' '}
          directly.
        </p>
      ) : null}

      {status === 'error' ? (
        <p className="mt-6 max-w-[52ch] font-text text-[0.95rem] leading-[1.6] text-ink-muted">
          Something in the form was rejected — check the name, email, and message fields, or just
          email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="link text-accent">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
