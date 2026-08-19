import { PageHeader, PageShell, Section } from './site';
import type { LegalDoc } from '@/data/legal';

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

/**
 * Renders a legal document from `data/legal.ts`. Both /privacy/ and /terms/
 * use this, so the two can never drift apart in layout — only in content.
 * No scroll-reveal here: legal text should be readable the instant it loads.
 */
export default function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  return (
    <PageShell current={path}>
      <PageHeader
        eyebrow={`Last updated ${formatDate(doc.updated)}`}
        title={doc.title}
        lead={<p>{doc.intro}</p>}
      />

      <Section>
        <div className="max-w-[68ch] space-y-12">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl tracking-tight mb-4" style={{ fontWeight: 420 }}>
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.body.map((paragraph, index) => (
                  <p key={index} className="text-ink-muted leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet, index) => (
                    <li
                      key={index}
                      className="relative pl-6 text-ink-muted leading-relaxed before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-moonlight/50"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
