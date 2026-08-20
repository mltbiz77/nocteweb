import {
  AppleGlyph,
  ArrowLink,
  Container,
  Display,
  Label,
  Prose,
  Reveal,
  StatusMark,
} from './site';
import { APPS, productPath, type AppData } from '@/data/apps';

/**
 * The portfolio, shown rather than listed.
 *
 * Each product gets a full-width band: its own colour as a flat field, its
 * real App Store screenshots at a size you can actually read, and the two
 * links that matter. The products are the argument this company makes, so
 * they get the room instead of a row in a table.
 *
 * Bands alternate sides so a long scroll has rhythm. Products without
 * screenshots yet lead with their icon at scale instead of a placeholder.
 */

const Shots = ({ app, flipped }: { app: AppData; flipped: boolean }) => {
  const shots = (app.screenshots ?? []).slice(0, 2);

  if (shots.length === 0) {
    return (
      <div className="flex items-center justify-center py-6">
        <img
          src={app.icon}
          alt={`${app.name} app icon`}
          width={512}
          height={512}
          className="icon-mask plate-lift h-40 w-40 sm:h-52 sm:w-52"
          loading="lazy"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-end justify-center gap-4 sm:gap-6 ${
        flipped ? 'sm:justify-start' : 'sm:justify-end'
      }`}
    >
      {shots.map((shot, i) => (
        <img
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          width={660}
          height={1434}
          loading="lazy"
          decoding="async"
          draggable={false}
          /* The second plate sits slightly lower, so the pair reads as a
             considered arrangement rather than two images in a row. */
          className={`plate w-[46%] max-w-[280px] rounded-[1.4rem] sm:w-[45%] ${
            i === 1 ? 'hidden translate-y-8 sm:block' : ''
          }`}
        />
      ))}
    </div>
  );
};

const Band = ({ app, index }: { app: AppData; index: number }) => {
  const flipped = index % 2 === 1;
  const hasShots = (app.screenshots ?? []).length > 0;

  return (
    <article className="relative overflow-hidden border-t border-rule">
      {/* The product's own colour, as a flat field rather than a glow. */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{ background: app.accent, opacity: 0.05 }}
        aria-hidden="true"
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-12">
          {/* Copy */}
          <div
            className={`lg:col-span-5 ${flipped ? 'lg:col-start-8 lg:order-2' : 'lg:col-start-1'}`}
          >
            <Reveal>
              {/* Products with no screenshots yet carry their icon in the
                  artwork column, so it is never shown twice on one band. */}
              <div className="flex items-center gap-4">
                {hasShots ? (
                  <img
                    src={app.icon}
                    alt=""
                    aria-hidden="true"
                    width={512}
                    height={512}
                    loading="lazy"
                    className="icon-mask plate h-14 w-14 shrink-0"
                    draggable={false}
                  />
                ) : null}
                <div>
                  <Display as="h3" size="lg" weight={600}>
                    {app.name}
                  </Display>
                  <div className="mt-1.5">
                    <StatusMark status={app.status} accent={app.accent} />
                  </div>
                </div>
              </div>

              <Display as="p" size="md" className="mt-7" style={{ color: app.accent }}>
                {app.cardTagline ?? app.tagline}
              </Display>

              <Prose className="mt-5 max-w-[46ch]">
                <p>{app.brief}</p>
              </Prose>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ArrowLink href={productPath(app)}>View {app.name}</ArrowLink>
                {app.appStoreUrl ? (
                  <a
                    href={app.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-quiet inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-label text-ink-muted hover:text-ink"
                  >
                    <AppleGlyph className="h-3.5 w-3.5" />
                    App Store
                  </a>
                ) : null}
              </div>
            </Reveal>
          </div>

          {/* Artwork */}
          <div
            className={`lg:col-span-6 ${flipped ? 'lg:col-start-1 lg:order-1' : 'lg:col-start-7'}`}
          >
            <Reveal delay={80}>
              <Shots app={app} flipped={flipped} />
            </Reveal>
          </div>
        </div>
      </Container>
    </article>
  );
};

export const Showcase = ({ apps = APPS }: { apps?: AppData[] }) => (
  <div>
    {apps.map((app, index) => (
      <Band key={app.slug} app={app} index={index} />
    ))}

    {/* The portfolio is deliberately unfinished — say so, and invite the
        conversation that fills it. */}
    <div className="border-y border-rule">
      <Container className="py-14 sm:py-16">
        <div className="grid items-baseline gap-x-12 gap-y-5 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Label className="text-ink-faint">Open</Label>
            <Display as="p" size="md" className="mt-3 text-ink-faint">
              And the ones we haven’t built yet.
            </Display>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Prose className="max-w-[46ch]">
              <p>
                More products are in build, and we buy digital products worth owning. If you have
                one, or an idea for one, we would like to hear about it.
              </p>
            </Prose>
            <div className="mt-6">
              <ArrowLink href="/contact/">Start a conversation</ArrowLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  </div>
);
