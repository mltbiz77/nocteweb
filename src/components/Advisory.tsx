import { Reveal } from './Reveal';
import {
  ButtonLink,
  Card,
  CONTACT_EMAIL,
  Horizon,
  IndexRow,
  PageHeader,
  PageShell,
  Section,
  SectionHeading,
  Tag,
} from './site';
import { CASE_STUDIES, HOW_WE_WORK, OFFERINGS } from '@/data/services';

/**
 * The client-facing half of the business. Offerings, how an engagement runs,
 * and a way to start one. Case studies render themselves once `CASE_STUDIES`
 * has entries and stay invisible until then.
 */
export default function Advisory() {
  return (
    <PageShell current="/advisory/">
      <PageHeader
        eyebrow="Advisory & Solutions"
        title={
          <>
            We work with companies
            <br />
            the way we work on our own.
          </>
        }
        lead={
          <>
            <p>
              Nocte Ventures works with companies and founders on strategy, product, and technical
              execution. We help design, build, and scale digital products and AI-enabled solutions.
            </p>
            <p>
              What we bring is operator experience rather than a deck about it: we run our own
              products, so the positions we take on pricing, retention, architecture, and launch
              timing have been tested somewhere real before they reach you.
            </p>
          </>
        }
      />

      {/* ─── What we offer ─── */}
      <Section id="offerings">
        <Reveal>
          <SectionHeading
            eyebrow="What we offer"
            title="Four ways we get involved."
            lead="Pick the one that matches where you are. Most engagements start with the first and grow into the third."
          />
        </Reveal>

        <div className="border-b border-line">
          {OFFERINGS.map((offering, index) => (
            <Reveal key={offering.numeral} delay={index * 0.06}>
              <IndexRow
                numeral={offering.numeral}
                title={offering.title}
                description={offering.description}
              >
                {offering.tags?.length ? (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {offering.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                ) : null}
              </IndexRow>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── How we work ─── */}
      <Section id="how-we-work">
        <Reveal>
          <SectionHeading
            eyebrow="How we work"
            title="Fewer decisions, made earlier."
            lead="Four habits that decide more about the outcome than any roadmap does."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {HOW_WE_WORK.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <Card className="h-full p-7 sm:p-8">
                <h3 className="text-lg font-medium text-ink mb-3">{item.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{item.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── Case studies: only once there is one to show ─── */}
      {CASE_STUDIES.length > 0 ? (
        <Section id="case-studies">
          <Reveal>
            <SectionHeading eyebrow="Selected engagements" title="What that looked like." />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {CASE_STUDIES.map((study, index) => (
              <Reveal key={study.slug} delay={index * 0.06}>
                <Card className="h-full p-7 sm:p-8">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-ink-faint">
                    {study.sector}
                  </span>
                  <h3 className="mt-4 text-xl font-medium text-ink">{study.client}</h3>
                  <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                    <div>
                      <dt className="text-ink-faint">Challenge</dt>
                      <dd className="text-ink-muted mt-1">{study.challenge}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-faint">What we did</dt>
                      <dd className="text-ink-muted mt-1">{study.work}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-faint">Outcome</dt>
                      <dd className="text-ink-muted mt-1">{study.outcome}</dd>
                    </div>
                  </dl>
                  {study.url ? (
                    <a
                      href={study.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-block text-sm text-ink-muted hover:text-ink transition-colors"
                    >
                      Read more →
                    </a>
                  ) : null}
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ─── Start something ─── */}
      <Section className="overflow-hidden border-t border-line">
        <Reveal className="relative text-center">
          <h2
            className="font-display text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight mb-6 leading-[1.15]"
            style={{ fontWeight: 420 }}
          >
            Where would you start?
          </h2>
          <p className="text-ink-muted max-w-[46ch] mx-auto mb-10 leading-relaxed">
            If you are a founder or a company looking for strategic or technical help, get in touch.
            Tell us the problem in a paragraph and we will tell you honestly whether we are the right
            people for it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink href="/contact/">Contact us</ButtonLink>
            <ButtonLink href={`mailto:${CONTACT_EMAIL}`} variant="ghost">
              {CONTACT_EMAIL}
            </ButtonLink>
          </div>
        </Reveal>
        <Horizon className="bottom-0 h-16" />
      </Section>
    </PageShell>
  );
}
