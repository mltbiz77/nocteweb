import { Showcase } from './components/Showcase';
import {
  ArrowLink,
  Button,
  Container,
  Display,
  Entry,
  FactStrip,
  Label,
  NightBand,
  PageShell,
  Prose,
  Reveal,
  SectionHead,
} from './components/site';
import { COMPANY } from '@/data/company';
import { MODES, OFFERINGS } from '@/data/services';
import { APPS } from '@/data/apps';

/**
 * The home page makes one argument: this company builds real products, owns
 * them, and will do the same work for you. So it opens with a statement, then
 * spends most of its length showing the products at a size you can judge.
 */
export default function App() {
  const live = APPS.filter((app) => app.status === 'live').length;
  const languages = Math.max(
    ...APPS.map((app) => {
      const entry = app.meta.find((m) => m.label === 'Languages');
      return entry ? Number(entry.value) : 1;
    }),
  );

  return (
    <PageShell current="/" navTone="night">
      {/* ─── Hero ─── */}
      <section className="relative bg-night text-night-ink">
        <Container className="pt-20 pb-14 sm:pt-28 sm:pb-20">
          <Label className="rise text-night-muted">{COMPANY.name}</Label>

          <Display
            as="h1"
            size="xxl"
            weight={600}
            className="rise mt-7 max-w-[19ch] text-night-ink"
            style={{ animationDelay: '70ms' }}
          >
            A company that builds, owns, and advises digital businesses.
          </Display>

          <div className="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="rise lg:col-span-5" style={{ animationDelay: '150ms' }}>
              <Prose className="text-night-muted">
                <p>
                  Nocte Ventures is a parent company for mobile and web software. We build and
                  operate our own portfolio, buy and invest in digital products, and advise other
                  companies on the same decisions we make with our own money.
                </p>
              </Prose>
            </div>

            <div
              className="rise flex flex-wrap items-center gap-4 lg:col-span-6 lg:col-start-7 lg:justify-end"
              style={{ animationDelay: '210ms' }}
            >
              <Button href="#portfolio" variant="night-solid">
                See our products
              </Button>
              <Button href="/advisory/" variant="night-outline">
                Work with us
              </Button>
            </div>
          </div>

          {/* Every number here is checkable on the App Store. */}
          <div className="rise mt-16 sm:mt-20" style={{ animationDelay: '280ms' }}>
            <FactStrip
              items={[
                { value: String(APPS.length), label: 'Products owned' },
                { value: String(live), label: 'Live on App Store' },
                { value: String(languages), label: 'Languages shipped' },
                { value: 'iPhone · iPad', label: 'Platforms' },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* ─── Portfolio ─── */}
      <section id="portfolio" className="scroll-mt-4">
        <Container className="pt-20 pb-12 sm:pt-28 sm:pb-14">
          <Reveal>
            <SectionHead
              eyebrow="Portfolio"
              title="The products we own."
              lead={
                <p>
                  We build and operate our own software, primarily SaaS and mobile. These are
                  companies we create, grow, and sometimes sell — designed and developed in-house
                  rather than commissioned.
                </p>
              }
              aside={<ArrowLink href="/portfolio/">All products</ArrowLink>}
            />
          </Reveal>
        </Container>

        <Showcase />
      </section>

      {/* ─── What we do ─── */}
      <section className="bg-paper-sunk">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHead
              eyebrow="What we do"
              title="Three ways we get involved."
              lead={
                <p>
                  Most conversations start in one of these and move into another. All three are the
                  same skill applied at a different point.
                </p>
              }
            />
          </Reveal>

          <div className="mt-14 border-t border-rule">
            {MODES.map((mode, i) => (
              <Reveal key={mode.index} delay={i * 60}>
                <Entry
                  index={mode.index}
                  title={mode.title}
                  aside={<ArrowLink href={mode.link.href}>{mode.link.label}</ArrowLink>}
                >
                  <p>{mode.body}</p>
                </Entry>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Advisory ─── */}
      <section>
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Advisory & Solutions"
              title="We work with companies the way we work on our own."
              lead={
                <p>
                  Operator experience rather than a deck about it. The positions we take on
                  pricing, retention, architecture, and launch timing have been tested somewhere
                  real before they reach you.
                </p>
              }
              aside={<ArrowLink href="/advisory/">How we help</ArrowLink>}
            />
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {OFFERINGS.map((offering, i) => (
              <Reveal key={offering.numeral} delay={i * 60}>
                <div className="border-t border-rule pt-6">
                  <Label className="tabular text-accent">{offering.numeral}</Label>
                  <Display as="h3" size="md" className="mt-4">
                    {offering.title}
                  </Display>
                  <Prose className="mt-3 text-[1rem]">
                    <p>{offering.description}</p>
                  </Prose>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <NightBand heading="Let’s talk about your next venture.">
        <Prose className="max-w-[48ch] text-night-muted">
          <p>
            Building something new, looking for an operator to advise on it, or exploring a sale —
            we are open to the right conversations.
          </p>
        </Prose>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/contact/" variant="night-solid">
            Get in touch
          </Button>
          <Button href="/portfolio/" variant="night-outline">
            See the portfolio
          </Button>
        </div>
      </NightBand>
    </PageShell>
  );
}
