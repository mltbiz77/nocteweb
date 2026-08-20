import { ContactForm } from './components/ContactForm';
import {
  ArrowLink,
  Button,
  Container,
  Display,
  Label,
  MaskHeading,
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
 * The landing page. Two doors, presented as two panels you can feel rather
 * than two columns of text — the left for companies who need something built,
 * the right for the products we own. The full showcase stays on /portfolio/.
 */
export default function App() {
  return (
    <PageShell current="/">
      {/* ─── Hero ─── */}
      <section className="border-b border-rule">
        <Container className="pt-24 pb-24 sm:pt-32 sm:pb-32">
          <div className="fade-rise">
            <Label className="text-accent-hi">Nocte Ventures</Label>
          </div>

          <MaskHeading
            as="h1"
            lines={['we build software', 'worth owning.']}
            size="xxl"
            className="mt-8"
            delay={180}
          />

          <div className="mt-14 grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="fade-rise lg:col-span-5" style={{ animationDelay: '520ms' }}>
              <Prose>
                <p>
                  A parent company for digital products. We build and run our own, and we design,
                  build, and advise on AI and digital solutions for other companies.
                </p>
              </Prose>
            </div>
            <div
              className="fade-rise flex flex-wrap items-center gap-4 lg:col-span-6 lg:col-start-7 lg:justify-end"
              style={{ animationDelay: '620ms' }}
            >
              <Button href="#work">Work with us</Button>
              <Button href="/portfolio/" variant="outline">
                Our products
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Two doors ─── */}
      <section>
        <Container className="py-16 sm:py-20">
          <div className="grid gap-5 lg:grid-cols-2">
            {/* For companies */}
            <Reveal>
              <a
                href="/advisory/"
                className="panel group flex h-full flex-col p-9 sm:p-11 hover:-translate-y-1"
              >
                <Label className="text-accent-hi">For companies</Label>
                <Display as="h2" size="lg" weight={800} className="mt-6 max-w-[18ch]">
                  AI and digital solutions, built properly.
                </Display>
                <Prose className="mt-5 max-w-[40ch]">
                  <p>
                    If your business needs an AI capability, an automation, or a product built and
                    you want it to survive contact with real customers — this is the side of the
                    house you want.
                  </p>
                </Prose>

                <ul className="mt-9 space-y-3 border-t border-rule pt-7">
                  {OFFERINGS.map((offering) => (
                    <li key={offering.numeral} className="flex items-baseline gap-3.5">
                      <span
                        className="mt-[0.5em] h-[5px] w-[5px] shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      <span className="font-sans text-[0.98rem] text-ink">{offering.title}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-auto pt-10">
                  <span className="link-quiet inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-label text-accent-hi">
                    Advisory &amp; Solutions
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </span>
              </a>
            </Reveal>

            {/* Our products */}
            <Reveal delay={90}>
              <div className="panel flex h-full flex-col p-9 sm:p-11">
                <Label className="text-ink-faint">Our own products</Label>
                <Display as="h2" size="lg" weight={800} className="mt-6 max-w-[18ch]">
                  software we build, own, and run.
                </Display>
                <Prose className="mt-5 max-w-[40ch]">
                  <p>
                    We create our own companies and keep them. It is where every position we take
                    on pricing, retention, and launch timing gets tested first.
                  </p>
                </Prose>

                <ul className="mt-9 border-t border-rule pt-2">
                  {APPS.map((app) => (
                    <li key={app.slug}>
                      <a
                        href={productPath(app)}
                        className="group flex items-center gap-4 border-b border-rule-soft py-4 last:border-0"
                      >
                        <img
                          src={app.icon}
                          alt=""
                          aria-hidden="true"
                          width={512}
                          height={512}
                          loading="lazy"
                          className="icon-mask h-10 w-10 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110"
                          draggable={false}
                        />
                        <span className="font-sans text-[1rem] font-medium text-ink transition-transform duration-300 ease-out group-hover:translate-x-1">
                          {app.name}
                        </span>
                        <span className="ml-auto flex items-center gap-4">
                          <StatusMark status={app.status} accent={app.accent} />
                          <span
                            aria-hidden="true"
                            className="text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-hi"
                          >
                            &rarr;
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <span className="mt-auto pt-10">
                  <ArrowLink href="/portfolio/">See the portfolio</ArrowLink>
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─── What we do for clients ─── */}
      <section id="work" className="scroll-mt-4">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Advisory & Solutions"
              title="bring us the problem, not the spec."
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

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {OFFERINGS.map((offering, i) => (
              <Reveal key={offering.numeral} delay={i * 70}>
                <div className="panel h-full p-8 sm:p-9">
                  <Display as="h3" size="md" weight={800}>
                    {offering.title}
                  </Display>
                  <Prose className="mt-4 text-[0.98rem]">
                    <p>{offering.description}</p>
                  </Prose>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Contact, on the page ─── */}
      <section id="contact" className="scroll-mt-4 border-t border-rule">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Label className="text-accent-hi">Contact</Label>
                <Display as="h2" size="xl" weight={800} className="mt-6 max-w-[16ch]">
                  tell us what you need built.
                </Display>
                <Prose className="mt-7 max-w-[38ch]">
                  <p>
                    Founders, companies looking for AI or digital work, and anyone with a product
                    worth owning. A paragraph is enough to start.
                  </p>
                </Prose>
                <p className="mt-9">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="link font-sans text-[1.05rem] text-ink"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={90}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
