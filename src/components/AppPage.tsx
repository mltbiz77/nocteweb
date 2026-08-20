import {
  AppStoreButton,
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
  StatusMark,
  STRINGS,
} from './site';
import { productPath, type AppData } from '@/data/apps';

/**
 * One product, given a proper page: a blue hero carrying the product's own
 * colour and its lead screenshot, the screens at a size you can read, what it
 * does, and what happens to your data.
 */
export default function AppPage({ app }: { app: AppData }) {
  const shots = app.screenshots ?? [];
  const hero = shots[0];
  const rest = shots.slice(1);
  const t = STRINGS[app.locale];

  return (
    <PageShell current={productPath(app)} navTone="night">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-night text-night-ink">
        {/* A trace of the product's colour, and a full-width rule of it at the
            foot of the hero. Overlaying a warm accent on navy at any real
            strength just greys the blue out. */}
        <span
          className="pointer-events-none absolute inset-0"
          style={{ background: app.accent, opacity: 0.05 }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px]"
          style={{ background: app.accent }}
          aria-hidden="true"
        />

        <Container className="relative pt-10 pb-14 sm:pt-14 sm:pb-18">
          <a
            href="/portfolio/"
            className="link-quiet rise inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-night-muted"
          >
            &larr; {t.allProducts}
          </a>

          <div className="mt-10 grid items-center gap-x-12 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="rise flex items-center gap-5" style={{ animationDelay: '60ms' }}>
                <img
                  src={app.icon}
                  alt={`${app.name} app icon`}
                  width={512}
                  height={512}
                  className="icon-mask plate h-[68px] w-[68px] shrink-0 sm:h-20 sm:w-20"
                  draggable={false}
                />
                <div>
                  <Display as="h1" size="xl" weight={600} className="text-night-ink">
                    {app.name}
                  </Display>
                  <div className="mt-2">
                    <StatusMark status={app.status} accent={app.accent} tone="night" />
                  </div>
                </div>
              </div>

              <p
                className="rise mt-8 max-w-[24ch] font-sans text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.15] tracking-[-0.03em]"
                style={{ fontWeight: 500, color: app.accent, animationDelay: '120ms' }}
              >
                {app.tagline}
              </p>

              <div className="rise" style={{ animationDelay: '180ms' }}>
                <Prose className="mt-6 max-w-[48ch] text-night-muted">
                  <p>{app.brief}</p>
                </Prose>

                <div className="mt-9">
                  <AppStoreButton
                    href={app.appStoreUrl}
                    locale={app.locale}
                    preorder={app.status === 'soon'}
                    tone="night"
                  />
                </div>
              </div>
            </div>

            <div className="rise lg:col-span-5 lg:col-start-8" style={{ animationDelay: '160ms' }}>
              {hero ? (
                <img
                  src={hero.src}
                  alt={hero.alt}
                  width={660}
                  height={1434}
                  className="plate-lift mx-auto w-[58%] max-w-[268px] rounded-[1.5rem] lg:mx-0 lg:ml-auto"
                  draggable={false}
                />
              ) : (
                <img
                  src={app.icon}
                  alt={`${app.name} app icon`}
                  width={512}
                  height={512}
                  className="icon-mask plate-lift mx-auto h-44 w-44 sm:h-56 sm:w-56 lg:mx-0 lg:ml-auto"
                  draggable={false}
                />
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Screens ─── */}
      {rest.length > 0 ? (
        <section className="bg-paper-sunk">
          <Container className="py-16 sm:py-20">
            <Reveal>
              <SectionHead eyebrow={t.screens} title={`${app.name}, on screen.`} />
            </Reveal>
            <Reveal delay={80}>
              <div
                className="-mx-6 mt-12 overflow-x-auto px-6 pb-6 sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14"
                tabIndex={0}
                role="region"
                aria-label={`${app.name} — ${t.screens}`}
              >
                <div className="flex w-max gap-6">
                  {rest.map((shot) => (
                    <img
                      key={shot.src}
                      src={shot.src}
                      alt={shot.alt}
                      width={660}
                      height={1434}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="plate w-[220px] shrink-0 rounded-[1.4rem] sm:w-[264px]"
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ─── What it does ─── */}
      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHead eyebrow={t.whatItDoes} title={app.featuresTitle ?? t.builtAround} />
        </Reveal>
        <div className="mt-14 border-t border-rule">
          {app.features.map((feature, i) => (
            <Reveal key={feature.number} delay={i * 50}>
              <Entry index={feature.number} title={feature.title}>
                <p>{feature.description}</p>
              </Entry>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* ─── Privacy ─── */}
      <section className="bg-paper-sunk">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Label className="text-ink-faint">{t.privacy}</Label>
                <Display as="h2" size="lg" className="mt-5">
                  Your data stays yours.
                </Display>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <Prose>
                  <p>{app.privacy}</p>
                </Prose>
                <div className="mt-6">
                  <ArrowLink href="/privacy/">Site privacy policy</ArrowLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <NightBand heading={t.oneOfOurs(app.name)}>
        <Prose className="max-w-[46ch] text-night-muted">
          <p>{t.builtBy}. Look at the rest of the portfolio, or tell us what you are building.</p>
        </Prose>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/portfolio/" variant="night-solid">
            {t.allProducts}
          </Button>
          <Button href="/contact/" variant="night-outline">
            {t.contact}
          </Button>
        </div>
      </NightBand>
    </PageShell>
  );
}
