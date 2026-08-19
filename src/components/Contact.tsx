import { Reveal } from './Reveal';
import { ContactForm } from './ContactForm';
import { Card, Horizon, PageHeader, PageShell, Section } from './site';
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_MAILTO, INSTAGRAM_URL } from '@/data/company';

/** Who tends to write to us, so a visitor can place themselves quickly. */
const REASONS = [
  {
    title: 'Founders',
    body: 'Seeking investment, a partnership, or a buyer for a product you have built.',
  },
  {
    title: 'Companies',
    body: 'Looking for product and technical advisory, or an AI or digital solution built properly.',
  },
  {
    title: 'Everyone else',
    body: 'Collaborations, press, support for one of our apps, or a question we have not thought of.',
  },
];

export default function Contact() {
  return (
    <PageShell current="/contact/">
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you’re building."
        lead={
          <p>
            Whether you are a founder, a company looking for advisory or AI solutions, or just
            curious about Nocte Ventures, we would love to hear from you.
          </p>
        }
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14 items-start">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.08} className="lg:sticky lg:top-28">
            <Card className="p-7 sm:p-8">
              <span className="text-[11px] uppercase tracking-[0.3em] text-ink-faint">
                Direct
              </span>
              <a
                href={CONTACT_MAILTO}
                className="mt-4 block text-lg text-ink hover:text-moonlight transition-colors break-words"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                Email reaches us fastest. We normally reply within two working days.
              </p>

              {BOOKING_URL ? (
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium rounded-full border border-line-hover text-ink-muted hover:text-ink hover:border-moonlight/40 transition-all duration-300"
                >
                  Book a call
                </a>
              ) : null}

              <div className="mt-8 pt-6 border-t border-line">
                <span className="text-[11px] uppercase tracking-[0.3em] text-ink-faint">
                  Elsewhere
                </span>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-sm text-ink-muted hover:text-ink transition-colors"
                >
                  Instagram →
                </a>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ─── Who writes to us ─── */}
      <Section className="pt-0 sm:pt-0 overflow-hidden">
        <div className="border-t border-line">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.06}>
              <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-8 border-b border-line py-7">
                <h2 className="text-base font-medium text-ink">{reason.title}</h2>
                <p className="text-sm text-ink-muted leading-relaxed max-w-[52ch]">{reason.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Horizon className="bottom-0 h-16" />
      </Section>
    </PageShell>
  );
}
