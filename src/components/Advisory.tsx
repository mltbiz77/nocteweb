import {
  ArrowLink,
  Container,
  Entry,
  Label,
  NightBand,
  PageMasthead,
  PageShell,
  Prose,
  Reveal,
  SectionHead,
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
      <PageMasthead
        eyebrow="Advisory & Solutions"
        title={
          <>
            We work with companies the way we work on our own.
          </>
        }
        lead={
          <>
            <p>
              Nocte Ventures works with companies and founders on strategy, product, and technical
              execution. We help design, build, and scale digital products and AI-enabled
              solutions.
            </p>
            <p>
              What we bring is operator experience rather than a deck about it: we run our own
              products, so the positions we take on pricing, retention, architecture, and launch
              timing have been tested somewhere real before they reach you.
            </p>
          </>
        }
        facts={[
          { label: 'Engagements', value: 'Fixed scope' },
          { label: 'Team', value: 'Senior, small' },
          { label: 'Sectors', value: 'SaaS · Mobile · AI' },
          { label: 'Starts with', value: 'A paragraph by email' },
        ]}
      />

      {/* ─── §01 What we offer ─── */}
      <Container className="pt-16 sm:pt-24">
        <Reveal>
          <SectionHead
            eyebrow="What we offer"
            title="Four ways we get involved."
            lead={
              <p>
                Pick the one that matches where you are. Most engagements start with the first and
                grow into the third.
              </p>
            }
          />
        </Reveal>
        <div className="mt-14 border-t border-rule">
          {OFFERINGS.map((offering) => (
            <Entry
              key={offering.numeral}
              index={offering.numeral}
              title={offering.title}
              aside={
                offering.tags?.length ? (
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {offering.tags.map((tag) => (
                      <Label key={tag}>{tag}</Label>
                    ))}
                  </div>
                ) : null
              }
            >
              <p>{offering.description}</p>
            </Entry>
          ))}
        </div>
      </Container>

      {/* ─── §02 How we work ─── */}
      <Container className="pt-20 sm:pt-28">
        <Reveal>
          <SectionHead
            eyebrow="How we work"
            title="Fewer decisions, made earlier."
            lead={
              <p>
                Four habits that decide more about the outcome than any roadmap does.
              </p>
            }
          />
        </Reveal>
        <div className="mt-14 border-t border-rule">
          {HOW_WE_WORK.map((item, index) => (
            <Entry key={item.title} index={String(index + 1).padStart(2, '0')} title={item.title}>
              <p>{item.description}</p>
            </Entry>
          ))}
        </div>
      </Container>

      {/* ─── §03 Case studies: only once there is one to show ─── */}
      {CASE_STUDIES.length > 0 ? (
        <Container className="pt-20 sm:pt-28">
          <Reveal>
            <SectionHead eyebrow="Selected engagements" title="What that looked like." />
          </Reveal>
          <div className="mt-14 border-t border-rule">
            {CASE_STUDIES.map((study, index) => (
              <Entry
                key={study.slug}
                index={String(index + 1).padStart(2, '0')}
                title={study.client}
                aside={
                  <div className="flex flex-wrap items-center gap-5">
                    <Label>{study.sector}</Label>
                    {study.url ? <ArrowLink href={study.url}>Read more</ArrowLink> : null}
                  </div>
                }
              >
                <p>
                  <strong className="font-medium text-ink">Challenge.</strong> {study.challenge}
                </p>
                <p>
                  <strong className="font-medium text-ink">What we did.</strong> {study.work}
                </p>
                <p>
                  <strong className="font-medium text-ink">Outcome.</strong> {study.outcome}
                </p>
              </Entry>
            ))}
          </div>
        </Container>
      ) : null}

      <div className="pb-24 sm:pb-32" />

      <NightBand heading="Where would you start?">
        <Prose className="max-w-[48ch] text-night-muted">
          <p>
            If you are a founder or a company looking for strategic or technical help, get in
            touch. Tell us the problem in a paragraph and we will tell you honestly whether we are
            the right people for it.
          </p>
        </Prose>
      </NightBand>
    </PageShell>
  );
}
