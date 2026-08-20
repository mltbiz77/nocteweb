import { ContactForm } from './components/ContactForm';
import {
  Button,
  Container,
  Display,
  HoverIndex,
  Label,
  MaskHeading,
  PageShell,
  Prose,
  Reveal,
  StatusMark,
} from './components/site';
import { OFFERINGS } from '@/data/services';
import { APPS, productPath } from '@/data/apps';
import { CONTACT_EMAIL } from '@/data/company';

/**
 * The landing page is four moves and no boxes: a statement, what we do for
 * companies, what we own, and a way to start. The two indexes carry the
 * structure — point at a line and its detail comes up beside it — which is
 * why nothing here needs a card to sit in.
 */
export default function App() {
  return (
    <PageShell current="/">
      {/* ─── Hero ─── */}
      <section>
        <Container className="pt-24 pb-28 sm:pt-32 sm:pb-36">
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

          <div className="mt-16 grid gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="fade-rise lg:col-span-5" style={{ animationDelay: '520ms' }}>
              <Prose>
                <p>
                  A parent company for digital products. We build and run our own, and we design,
                  build, and advise on AI and digital solutions for other companies.
                </p>
              </Prose>
            </div>
            <div
              className="fade-rise flex flex-wrap items-end gap-x-12 gap-y-6 lg:col-span-6 lg:col-start-7 lg:justify-end"
              style={{ animationDelay: '620ms' }}
            >
              <Button href="#work">Work with us</Button>
              <Button href="/portfolio/" variant="quiet">
                Our products
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── What we do for companies ─── */}
      <section id="work" className="band scroll-mt-4 border-y border-rule">
        <Container className="py-24 sm:py-32">
          <Reveal>
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Label className="text-accent-hi">For companies</Label>
                <Display as="h2" size="xl" weight={900} className="mt-6 max-w-[22ch]">
                  AI and digital solutions, built properly.
                </Display>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 lg:pt-14">
                <Prose>
                  <p>
                    If your business needs an AI capability, an automation, or a product built and
                    you want it to survive contact with real customers — this is where to start.
                  </p>
                </Prose>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-16 sm:mt-20">
            <HoverIndex
              items={OFFERINGS.map((offering) => ({
                key: offering.numeral,
                href: '/advisory/',
                label: (
                  <Display as="span" size="lg" weight={900}>
                    {offering.title}
                  </Display>
                ),
                detail: (
                  <Prose className="max-w-[40ch] text-[0.98rem]">
                    <p>{offering.description}</p>
                  </Prose>
                ),
              }))}
            />
          </Reveal>

          <Reveal delay={140} className="mt-16">
            <Button href="/advisory/">How we work</Button>
          </Reveal>
        </Container>
      </section>

      {/* ─── What we own ─── */}
      <section>
        <Container className="py-24 sm:py-32">
          <Reveal>
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Label className="text-ink-faint">Our own products</Label>
                <Display as="h2" size="xl" weight={900} className="mt-6 max-w-[22ch]">
                  software we build, own, and run.
                </Display>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 lg:pt-14">
                <Prose>
                  <p>
                    We create our own companies and keep them. It is where every position we take
                    on pricing, retention, and launch timing gets tested first.
                  </p>
                </Prose>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-16 sm:mt-20">
            <HoverIndex
              items={APPS.map((app) => ({
                key: app.slug,
                href: productPath(app),
                label: (
                  <span className="flex items-center gap-5">
                    <img
                      src={app.icon}
                      alt=""
                      aria-hidden="true"
                      width={512}
                      height={512}
                      loading="lazy"
                      className="icon-mask h-11 w-11 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110"
                      draggable={false}
                    />
                    <Display as="span" size="lg" weight={900}>
                      {app.name}
                    </Display>
                    <span className="ml-auto hidden sm:block">
                      <StatusMark status={app.status} accent={app.accent} />
                    </span>
                  </span>
                ),
                detail: (
                  <div>
                    {app.screenshots?.[0] ? (
                      <img
                        src={app.screenshots[0].src}
                        alt={app.screenshots[0].alt}
                        width={660}
                        height={1434}
                        loading="lazy"
                        decoding="async"
                        className="plate w-[190px] rounded-[1.3rem] lg:w-[230px]"
                        draggable={false}
                      />
                    ) : null}
                    <Prose className="mt-5 max-w-[36ch] text-[0.98rem]">
                      <p>{app.short}</p>
                    </Prose>
                  </div>
                ),
              }))}
            />
          </Reveal>

          <Reveal delay={140} className="mt-16">
            <Button href="/portfolio/">See the portfolio</Button>
          </Reveal>
        </Container>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="band scroll-mt-4 border-t border-rule">
        <Container className="py-24 sm:py-32">
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Label className="text-accent-hi">Contact</Label>
                <Display as="h2" size="xl" weight={900} className="mt-6 max-w-[16ch]">
                  tell us what you need built.
                </Display>
                <Prose className="mt-8 max-w-[38ch]">
                  <p>
                    Founders, companies looking for AI or digital work, and anyone with a product
                    worth owning. A paragraph is enough to start.
                  </p>
                </Prose>
                <p className="mt-10">
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
