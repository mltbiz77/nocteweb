import { Reveal } from './Reveal';
import {
  AppStoreButton,
  AppleGlyph,
  ButtonLink,
  Card,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  ICON_SHADOW,
  IndexRow,
  PageShell,
  Section,
  SectionHeading,
  STRINGS,
} from './site';
import { productPath, type AppData } from '@/data/apps';

const PhoneShot = ({
  src,
  alt,
  className = '',
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) => (
  <div className={`shrink-0 ${className}`}>
    <div className="relative rounded-[1.8rem] border border-white/10 bg-card p-1.5 shadow-[0_24px_70px_rgba(0,0,0,0.7)]">
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className="w-full rounded-[1.45rem] block"
        draggable={false}
      />
    </div>
    {/* contact shadow: the phone stands on a floor instead of floating */}
    <div
      className="mx-auto mt-2 h-3 w-[70%] rounded-[50%] blur-[6px]"
      style={{ background: 'radial-gradient(ellipse, rgba(0,0,0,0.7), transparent 70%)' }}
      aria-hidden="true"
    />
  </div>
);

/**
 * Eclipse rim: a vast circle whose bottom limb arcs across the top of the
 * page, stroked in the app's accent, its glow falling down onto the content.
 * Pure CSS — the per-app hero light source.
 */
const EclipseRim = ({ accent, glow }: { accent: string; glow: string }) => (
  <div
    className="pointer-events-none absolute inset-x-0 top-0 h-[220px] overflow-hidden"
    style={{
      maskImage: 'linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)',
    }}
    aria-hidden="true"
  >
    <div
      className="absolute left-1/2 h-[1600px] w-[1600px] -translate-x-1/2 rounded-full"
      style={{
        top: '-1450px',
        border: `1px solid ${accent}73`,
        boxShadow: `0 30px 100px ${glow}`,
      }}
    />
  </div>
);

export default function AppPage({ app }: { app: AppData }) {
  const shots = app.screenshots ?? [];
  const hero = shots[0];
  const t = STRINGS[app.locale];

  return (
    <PageShell
      current={productPath(app)}
      navExtra={
        /* No dead pill when the app isn't on sale yet — the slot stays empty. */
        app.appStoreUrl ? (
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-card-hover border border-line px-4 py-2 text-xs font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            <AppleGlyph className="w-3.5 h-3.5" />
            {app.status === 'soon' ? t.preorder : t.getTheApp}
          </a>
        ) : null
      }
    >
      {/* ─── Hero, lit by the app's own accent ─── */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-24 px-6 sm:px-10 lg:px-16">
        <EclipseRim accent={app.accent} glow={app.glow} />
        <div className="relative max-w-5xl mx-auto">
          <a
            href="/portfolio/"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-ink-faint hover:text-ink-muted transition-colors mb-12"
          >
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {t.allApps}
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-14 lg:gap-16 items-center">
            <Reveal>
              <div className="flex items-center gap-5 mb-8">
                <img
                  src={app.icon}
                  alt={`${app.name} app icon`}
                  className="h-[72px] w-[72px] sm:h-20 sm:w-20 rounded-[23%] border border-white/10"
                  style={{ boxShadow: ICON_SHADOW }}
                  draggable={false}
                />
                <h1
                  className="font-display text-[clamp(2.75rem,6vw,4.5rem)] tracking-tight leading-none"
                  style={{ fontWeight: 400 }}
                >
                  {app.name}
                </h1>
              </div>

              <p
                className="font-display italic text-[1.45rem] leading-snug mb-5"
                style={{ color: app.accent, fontWeight: 380 }}
              >
                {app.tagline}
              </p>

              <p className="text-ink-muted leading-relaxed mb-9 max-w-[46ch]">{app.brief}</p>

              <AppStoreButton href={app.appStoreUrl} locale={app.locale} preorder={app.status === 'soon'} />

              <div className="flex flex-wrap items-center gap-2 mt-9">
                {app.meta.map((item) => (
                  <span
                    key={item.label}
                    className="rounded-full border border-line px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] text-ink-faint"
                  >
                    {item.value}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15} className="flex justify-center lg:justify-end">
              {hero ? (
                <PhoneShot src={hero.src} alt={hero.alt} className="w-[240px] sm:w-[270px]" priority />
              ) : (
                /* Nothing to show yet — the icon carries the hero instead */
                <div className="relative flex items-center justify-center py-6">
                  <span
                    className="absolute h-56 w-56 rounded-full blur-[80px]"
                    style={{ background: app.glow }}
                    aria-hidden="true"
                  />
                  <img
                    src={app.icon}
                    alt={`${app.name} app icon`}
                    className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-[23%] border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.7)]"
                    draggable={false}
                  />
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Screens (only once there are screenshots to show) ─── */}
      {shots.length > 0 ? (
        <section className="relative py-24 sm:py-32 border-t border-line">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <Reveal>
              <SectionHeading eyebrow={t.lookInside} title={t.screens} />
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            {/* Inner w-max + mx-auto centers when everything fits and stays fully
                scrollable when it doesn't (justify-center on a scroller makes the
                left overflow unreachable). tabIndex makes it keyboard-scrollable
                in Safari/Firefox. */}
            <div
              className="overflow-x-auto pb-6 snap-x snap-mandatory"
              tabIndex={0}
              role="region"
              aria-label={`${app.name} — ${t.screens}`}
            >
              <div className="mx-auto flex w-max gap-5 px-6 sm:px-10 lg:px-16">
                {shots.map((shot) => (
                  <PhoneShot
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    className="w-[180px] sm:w-[205px] snap-center"
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* ─── Features: ruled index, numerals in the app's accent ─── */}
      <Section>
        <Reveal>
          <SectionHeading eyebrow={t.whatItDoes} title={app.featuresTitle ?? t.builtAround} />
        </Reveal>

        <div className="border-b border-line">
          {app.features.map((feature, index) => (
            <Reveal key={feature.number} delay={index * 0.06}>
              <IndexRow
                numeral={feature.number}
                title={feature.title}
                description={feature.description}
                numeralColor={`${app.accent}8C`}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── Privacy + download ─── */}
      <Section>
        <Reveal>
          <Card className="relative overflow-hidden p-9 sm:p-12">
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 blur-[100px]"
              style={{ background: app.glow }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col lg:flex-row lg:items-center gap-9 lg:gap-14">
              <div className="flex-1">
                <span className="text-[11px] uppercase tracking-[0.3em] text-ink-faint block mb-5">
                  {t.privacy}
                </span>
                <h3
                  className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-tight mb-4"
                  style={{ fontWeight: 420 }}
                >
                  {t.dataStaysYours}
                </h3>
                <p className="text-ink-muted leading-relaxed max-w-[44ch]">{app.privacy}</p>
              </div>
              <div className="shrink-0">
                <AppStoreButton href={app.appStoreUrl} locale={app.locale} preorder={app.status === 'soon'} />
              </div>
            </div>
          </Card>
        </Reveal>
      </Section>

      {/* ─── Closing ─── */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-line">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <span className="text-[11px] uppercase tracking-[0.3em] text-ink-faint block mb-5">
              {t.builtBy}
            </span>
            <h2
              className="font-display text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight mb-8 leading-[1.15]"
              style={{ fontWeight: 420 }}
            >
              {t.oneOfOurs(app.name)}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ButtonLink href="/portfolio/">{t.seeOurApps}</ButtonLink>
              <ButtonLink href={CONTACT_MAILTO} variant="ghost">
                {CONTACT_EMAIL}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

    </PageShell>
  );
}
