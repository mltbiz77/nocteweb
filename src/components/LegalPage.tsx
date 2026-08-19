import { Container, Label, PageMasthead, PageShell } from './site';
import type { LegalDoc } from '@/data/legal';

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

const slug = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Renders a legal document from `data/legal.ts`. Both /privacy/ and /terms/
 * use this, so the two can never drift apart in layout — only in content.
 * Set as a document: numbered clauses, a serif reading column, and a
 * contents list that stays put on the way down.
 */
export default function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  return (
    <PageShell current={path}>
      <PageMasthead
        slug={doc.title}
        title={doc.title}
        lead={<p>{doc.intro}</p>}
        facts={[
          { label: 'Last updated', value: formatDate(doc.updated) },
          { label: 'Applies to', value: 'nocteventures.com' },
          { label: 'Clauses', value: String(doc.sections.length) },
        ]}
      />

      <Container className="pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
          {/* Contents */}
          <nav aria-label="Contents" className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <Label>Contents</Label>
              <ol className="mt-4 border-t border-rule">
                {doc.sections.map((section, index) => (
                  <li key={section.heading} className="border-b border-rule-soft">
                    <a
                      href={`#${slug(section.heading)}`}
                      className="flex items-baseline gap-3 py-2.5 text-[0.9rem] text-ink-muted transition-colors hover:text-ink"
                    >
                      <span className="tabular font-mono text-[10px] tracking-label text-ink-faint">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="link-quiet">{section.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          {/* The document */}
          <div className="lg:col-span-8 lg:col-start-5">
            {doc.sections.map((section, index) => (
              <section
                key={section.heading}
                id={slug(section.heading)}
                className="border-t border-rule pt-6 [&+section]:mt-12 scroll-mt-24"
              >
                <div className="flex items-baseline gap-4">
                  <span className="tabular font-mono text-[10px] uppercase tracking-label text-ink-faint">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-sans text-[1.25rem] font-medium tracking-[-0.02em] text-ink">
                    {section.heading}
                  </h2>
                </div>

                <div className="mt-4 max-w-measure font-text text-[1.0625rem] leading-[1.7] text-ink-muted [&_p+p]:mt-4">
                  {section.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {section.bullets?.length ? (
                  <ul className="mt-5 max-w-measure border-t border-rule-soft">
                    {section.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="grid grid-cols-[2rem_1fr] gap-3 border-b border-rule-soft py-3 font-text text-[1rem] leading-[1.6] text-ink-muted"
                      >
                        <span className="tabular font-mono text-[10px] tracking-label text-ink-faint">
                          {String.fromCharCode(97 + i)}.
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
