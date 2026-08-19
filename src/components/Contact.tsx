import { ContactForm } from './ContactForm';
import {
  Container,
  FactTable,
  Label,
  NightBand,
  PageMasthead,
  PageShell,
  SectionMark,
} from './site';
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_MAILTO, INSTAGRAM_URL } from '@/data/company';

/** Who tends to write to us, so a visitor can place themselves quickly. */
const REASONS = [
  {
    index: '01',
    title: 'Founders',
    body: 'Seeking investment, a partnership, or a buyer for a product you have built.',
  },
  {
    index: '02',
    title: 'Companies',
    body: 'Looking for product and technical advisory, or an AI or digital solution built properly.',
  },
  {
    index: '03',
    title: 'Everyone else',
    body: 'Collaborations, press, support for one of our apps, or a question we have not thought of.',
  },
];

export default function Contact() {
  return (
    <PageShell current="/contact/">
      <PageMasthead
        slug="Contact"
        title="Tell us what you’re building."
        lead={
          <p>
            Whether you are a founder, a company looking for advisory or AI solutions, or just
            curious about Nocte Ventures, we would love to hear from you.
          </p>
        }
      />

      <Container className="pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionMark index="01" title="Write to us" />
            <ContactForm />
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <SectionMark index="02" title="Direct" />
            <a
              href={CONTACT_MAILTO}
              className="link block break-words font-sans text-[clamp(1.1rem,1.9vw,1.35rem)] tracking-[-0.02em] text-ink"
            >
              {CONTACT_EMAIL}
            </a>

            <div className="mt-8">
              <FactTable
                rows={[
                  { label: 'Reply within', value: '2 working days' },
                  { label: 'Language', value: 'English · Deutsch' },
                  { label: 'Registered', value: 'England & Wales' },
                ]}
              />
            </div>

            {BOOKING_URL ? (
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 border border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-label text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Book a call <span aria-hidden="true">&rarr;</span>
              </a>
            ) : null}

            <div className="mt-8">
              <Label>Elsewhere</Label>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet mt-3 block font-mono text-[11px] uppercase tracking-label text-ink-muted hover:text-ink"
              >
                Instagram &rarr;
              </a>
            </div>
          </div>
        </div>
      </Container>

      <NightBand
        heading="Who writes to us."
        aside={
          <div className="border-t border-night-rule">
            {REASONS.map((reason) => (
              <div key={reason.index} className="border-b border-night-rule py-4">
                <div className="flex items-baseline gap-3">
                  <span className="tabular font-mono text-[10px] uppercase tracking-label text-night-muted">
                    {reason.index}
                  </span>
                  <span className="font-sans text-[0.95rem] font-medium text-night-ink">
                    {reason.title}
                  </span>
                </div>
                <p className="mt-2 pl-8 font-text text-[0.9rem] leading-[1.55] text-night-muted">
                  {reason.body}
                </p>
              </div>
            ))}
          </div>
        }
      >
        <p className="max-w-[44ch] font-text text-[1.0625rem] leading-[1.65] text-night-muted">
          Most of what reaches us falls into one of three piles. Say which one you are in and we
          can skip a round of email.
        </p>
      </NightBand>
    </PageShell>
  );
}
