import { Showcase } from './components/Showcase';
import {
  ArrowLink,
  Button,
  Container,
  Display,
  Entry,
  Label,
  NightBand,
  PageShell,
  Prose,
  Reveal,
  SectionHead,
} from './components/site';
import { MODES, OFFERINGS } from '@/data/services';
import { APPS, productPath } from '@/data/apps';

/**
 * One argument, made in as few words as possible: this company builds software
 * it is willing to own. The products carry the rest, so the page gets out of
 * their way quickly.
 */
export default function App() {
  return (
    <PageShell current="/" navTone="night">
      {/* ─── Hero ─── */}
      <section className="bg-night text-night-ink">
        <Container className="pt-20 pb-16 sm:pt-28 sm:pb-20">
          <Display
            as="h1"
            size="xxl"
            weight={600}
            className="rise max-w-[17ch] text-night-ink"
          >
            We build software worth owning.
          </Display>

          <div className="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="rise lg:col-span-5" style={{ animationDelay: '90ms' }}>
              <Prose className="text-night-muted">
                <p>
                  A parent company for digital products. We build and run our own, and work with a
                  small number of companies on theirs.
                </p>
              </Prose>
            </div>

            <div
              className="rise flex flex-wrap items-center gap-4 lg:col-span-6 lg:col-start-7 lg:justify-end"
              style={{ animationDelay: '150ms' }}
            >
              <Button href="#work" variant="night-solid">
                See our work
              </Button>
              <Button href="/advisory/" variant="night-outline">
                Work with us
              </Button>
            </div>
          </div>

          {/* Wordless proof: the products themselves, no counts or captions. */}
          <ul
            className="rise mt-16 flex flex-wrap items-center gap-5 sm:mt-20 sm:gap-7"
            style={{ animationDelay: '220ms' }}
          >
            {APPS.map((app) => (
              <li key={app.slug}>
                <a
                  href={productPath(app)}
                  aria-label={app.name}
                  className="block transition-transform duration-300 hover:-translate-y-1"
                >
                  <img
                    src={app.icon}
                    alt={app.name}
                    width={512}
                    height={512}
                    className="icon-mask plate h-[54px] w-[54px] sm:h-[64px] sm:w-[64px]"
                    draggable={false}
                  />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─── Work ─── */}
      <section id="work" className="scroll-mt-4">
        <Container className="pt-20 pb-12 sm:pt-28 sm:pb-14">
          <Reveal>
            <SectionHead
              eyebrow="Our work"
              title="The products we own."
              lead={
                <p>
                  Designed and built in-house, then run for the long term. These are companies, not
                  client projects.
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
            <SectionHead eyebrow="What we do" title="Three ways we get involved." />
          </Reveal>

          <div className="mt-12 border-t border-rule">
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
              eyebrow="Advisory"
              title="We work with companies the way we work on our own."
              lead={
                <p>
                  Operator experience rather than a deck about it. A small number of engagements at
                  a time.
                </p>
              }
              aside={<ArrowLink href="/advisory/">How we help</ArrowLink>}
            />
          </Reveal>

          <div className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2">
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
        <Prose className="max-w-[44ch] text-night-muted">
          <p>
            Building something new, or exploring a sale — we are open to the right conversations.
          </p>
        </Prose>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/contact/" variant="night-solid">
            Get in touch
          </Button>
        </div>
      </NightBand>
    </PageShell>
  );
}
