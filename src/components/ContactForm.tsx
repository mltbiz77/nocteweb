import { useState, type FormEvent } from 'react';
import { CONTACT_EMAIL } from '@/data/company';
import { Label, type Tone } from './site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Sends the message from the page.
 *
 * There is deliberately no `mailto:` fallback — opening the visitor's mail
 * client is a dead end on a phone and on any machine without a configured
 * client. If delivery fails we say so in place and show the address as
 * selectable text with a copy button, so the visitor is never stranded.
 *
 * Delivery is handled by `api/contact.js`, which needs one environment
 * variable set on the Vercel project before it can actually send.
 */
export function ContactForm({ tone = 'paper' }: { tone?: Tone }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', website: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);
  const night = tone === 'night';

  const field = `w-full border-0 border-b bg-transparent px-0 py-2.5 font-sans text-[1rem] transition-colors focus:outline-none focus:ring-0 ${
    night
      ? 'border-night-rule text-night-ink placeholder:text-night-muted/70 focus:border-night-ink'
      : 'border-rule text-ink placeholder:text-ink-faint/70 focus:border-ink'
  }`;

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
      setStatus(response.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable — the address is selectable either way. */
    }
  }

  if (status === 'sent') {
    return (
      <div className={`border-t pt-8 ${night ? 'border-night-rule' : 'border-rule'}`}>
        <Label className={night ? 'text-night-muted' : 'text-ink-faint'}>Received</Label>
        <p
          className={`mt-4 font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.1] ${
            night ? 'text-night-ink' : 'text-ink'
          }`}
        >
          thank you — your message is with us.
        </p>
        <p
          className={`mt-4 max-w-[44ch] font-sans text-[1rem] leading-[1.65] ${
            night ? 'text-night-muted' : 'text-ink-muted'
          }`}
        >
          We read everything that comes in and normally reply within two working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`border-t pt-8 ${night ? 'border-night-rule' : 'border-rule'}`}>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div>
          <Label className={night ? 'text-night-muted' : 'text-ink-faint'}>Name</Label>
          <input
            id="cf-name"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            className={`${field} mt-1.5`}
            placeholder="Your name"
            value={form.name}
            onChange={set('name')}
            aria-label="Name"
          />
        </div>
        <div>
          <Label className={night ? 'text-night-muted' : 'text-ink-faint'}>Email</Label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={`${field} mt-1.5`}
            placeholder="you@company.com"
            value={form.email}
            onChange={set('email')}
            aria-label="Email"
          />
        </div>
      </div>

      <div className="mt-7">
        <Label className={night ? 'text-night-muted' : 'text-ink-faint'}>Company (optional)</Label>
        <input
          id="cf-company"
          name="company"
          maxLength={160}
          autoComplete="organization"
          className={`${field} mt-1.5`}
          placeholder="Where you work"
          value={form.company}
          onChange={set('company')}
          aria-label="Company"
        />
      </div>

      <div className="mt-7">
        <Label className={night ? 'text-night-muted' : 'text-ink-faint'}>Message</Label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          maxLength={5000}
          className={`${field} mt-1.5 resize-y`}
          placeholder="What are you working on, and where could we help?"
          value={form.message}
          onChange={set('message')}
          aria-label="Message"
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

      <div className="mt-9 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`inline-flex items-center gap-3 px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-label transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            night
              ? 'bg-night-ink text-night hover:bg-night-accent'
              : 'bg-ink text-paper hover:bg-accent'
          }`}
        >
          {status === 'sending' ? 'Sending' : 'Send message'}
          <span aria-hidden="true">&rarr;</span>
        </button>
        <Label className={night ? 'text-night-muted' : 'text-ink-faint'}>
          Used only to reply
        </Label>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {status === 'sending' ? 'Sending your message' : ''}
      </p>

      {status === 'error' ? (
        <div
          className={`mt-7 border-t pt-6 ${night ? 'border-night-rule' : 'border-rule-soft'}`}
          role="alert"
        >
          <p
            className={`max-w-[52ch] font-sans text-[0.95rem] leading-[1.6] ${
              night ? 'text-night-muted' : 'text-ink-muted'
            }`}
          >
            That did not go through. Please email us directly and we will pick it up straight
            away.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span
              className={`select-all font-sans text-[1.05rem] ${
                night ? 'text-night-ink' : 'text-ink'
              }`}
            >
              {CONTACT_EMAIL}
            </span>
            <button
              type="button"
              onClick={copyAddress}
              className={`border px-4 py-2 font-sans text-[10.5px] font-medium uppercase tracking-label transition-colors ${
                night
                  ? 'border-night-rule text-night-ink hover:border-night-ink'
                  : 'border-rule text-ink hover:border-ink'
              }`}
            >
              {copied ? 'Copied' : 'Copy address'}
            </button>
          </div>
        </div>
      ) : null}
    </form>
  );
}
