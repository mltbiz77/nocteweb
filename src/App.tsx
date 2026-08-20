import { ContactForm } from './components/ContactForm';
import {
  ArrowLink,
  Button,
  Container,
  Display,
  Label,
  PageShell,
  Prose,
  Reveal,
  SectionHead,
  StatusMark,
} from './components/site';
import { OFFERINGS } from '@/data/services';
import { APPS, productPath } from '@/data/apps';
import { CONTACT_EMAIL } from '@/data/company';

/**
 * The landing page offers two doors and nothing else: work with us, or look at
 * what we own. The full product showcase lives on /portfolio/ — here the
 * products are named, not exhibited, so a business arriving with an AI or
 * digital problem is not made to scroll through four app pitches first.
 */
export default function App() {
  return (
    <PageShell current="/" navTone="night">
      {/* ─── Hero ─── */}
      <section className="bg-night text-night-ink">
        <Container className="pt-24 pb-20 sm:pt-32 sm:pb-28">
          <Display as="h1" size="xxl" className="rise max-w-[20ch] text-night-ink">
            We build software worth owning.
          </Display>

          <div className="mt-11 grid gap-x-12 gap-y-9 lg:grid-cols-12">
            <div className="rise lg:col-span-5" style={{ animationDelay: '90ms' }}>
              <Prose className="text-night-muted">
                <p>
                  A parent company for digital products. We build and run our own, and we design,
                  build, and advise on AI and digital solutions for other companies.
                </p>
              </Prose>
            </div>
            <div
              className="rise flex flex-wrap items-center gap-4 lg:col-span-6 lg:col-start-7 lg:justify-end"
              style={{ animationDelay: '150ms' }}
            >
              <Button href="#advisory" variant="night-solid">
                Work with us
              </Button>
              <Button href="/portfolio/" variant="night-outline">
                Our products
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── The two doors, side by side ─── */}
      <section>
        <Container className="py-16 sm:py-20">
          <div className="grid lg:grid-cols-2">
            {/* Left — for companies who need something built or advised on. */}
            <Reveal className="border-t border-ink pt-8 lg:border-r lg:pr-14">
              <Label className="text-accent">For companies</Label>
              <Display as="h2" size="lg" className="mt-5 max-w-[20ch]">
                AI and digital solutions, built properly.
              </Display>
              <Prose className="mt-5 max-w-[42ch]">
                <p>
                  If your business needs an AI capability, an automation, or a product built and
                  you want it to survive contact with real customers, this is the side of the
                  house you want. We advise, and we build.
                </p>
              </Prose>
              <ul className="mt-7 space-y-3">
                {OFFERINGS.map((offering) => (
                  <li key={offering.numeral} className="flex items-baseline gap-3.5">
                    <span className="mt-[0.5em] h-[5px] w-[5px] shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span className="font-sans text-[0.98rem] text-ink">{offering.title}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <ArrowLink href="/advisory/">Advisory &amp; Solutions</ArrowLink>
              </div>
            </Reveal>

            {/* Right — the products we own, named rather than exhibited. */}
            <Reveal
              delay={80}
              className="mt-14 border-t border-ink pt-8 lg:mt-0 lg:pl-14"
            >
              <Label className="text-ink-faint">Our own products</Label>
              <Display as="h2" size="lg" className="mt-5 max-w-[20ch]">
                Software we build, own, and run.
              </Display>
              <Prose className="mt-5 max-w-[42ch]">
                <p>
                  We create our own companies and keep them. It is where every position we take on
                  pricing, retention, and launch timing gets tested before it reaches a client.
                </p>
              </Prose>
              <ul className="mt-7">
                {APPS.map((app) => (
                  <li key={app.slug}>
                    <a
                      href={productPath(app)}
                      className="group flex items-center gap-4 border-b border-rule-soft py-3.5 transition-colors hover:bg-paper-sunk/70"
                    >
                      <img
                        src={app.icon}
                        alt=""
                        aria-hidden="true"
                        width={512}
                        height={512}
                        loading="lazy"
                        className="icon-mask plate h-9 w-9 shrink-0"
                        draggable={false}
                      />
                      <span className="font-sans text-[0.98rem] font-medium text-ink">
                        {app.name}
                      </span>
                      <span className="ml-auto flex items-center gap-4">
                        <StatusMark status={app.status} accent={app.accent} />
                        <span
                          aria-hidden="true"
                          className="text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                        >
                          &rarr;
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <ArrowLink href="/portfolio/">See the portfolio</ArrowLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─── What we do for clients ─── */}
      <section id="advisory" className="scroll-mt-4 bg-paper-sunk">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Advisory & Solutions"
              title="Bring us the problem, not the spec."
              lead={
                <p>
                  We work with a small number of companies at a time on strategy, product, and
                  technical execution — including the AI and automation work most teams have not
                  built before.
                </p>
              }
              aside={<ArrowLink href="/advisory/">How we help</ArrowLink>}
            />
          </Reveal>

          <div className="mt-12 grid gap-x-14 gap-y-11 sm:grid-cols-2">
            {OFFERINGS.map((offering, i) => (
              <Reveal key={offering.numeral} delay={i * 60}>
                <div className="border-t border-rule pt-6">
                  <Label className="tabular text-accent">{offering.numeral}</Label>
                  <Display as="h3" size="md" className="mt-3.5">
                    {offering.title}
                  </Display>
                  <Prose className="mt-3 text-[0.98rem]">
                    <p>{offering.description}</p>
                  </Prose>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Contact, on the page ─── */}
      <section id="contact" className="scroll-mt-4 bg-night text-night-ink">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Label className="text-night-muted">Contact</Label>
              <Display as="h2" size="xl" className="mt-5 max-w-[18ch] text-night-ink">
                Tell us what you need built.
              </Display>
              <Prose className="mt-6 max-w-[40ch] text-night-muted">
                <p>
                  Founders, companies looking for AI or digital work, and anyone with a product
                  worth owning. A paragraph is enough to start.
                </p>
              </Prose>
              <p className="mt-8">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="link font-sans text-[1.05rem] text-night-ink"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ContactForm tone="night" />
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
