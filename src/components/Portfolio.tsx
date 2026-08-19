import { Reveal } from './Reveal';
import {
  ArrowRight,
  ButtonLink,
  Card,
  CONTACT_EMAIL,
  Horizon,
  ICON_SHADOW,
  PageHeader,
  PageShell,
  Section,
  Tag,
} from './site';
import { APPS, productPath } from '@/data/apps';

/**
 * The products we own. Everything on this page comes from `data/apps.ts` —
 * adding a product is a data change plus an HTML entry point, never a change
 * to this file.
 */
export default function Portfolio() {
  return (
    <PageShell current="/portfolio/">
      <PageHeader
        eyebrow="Portfolio"
        title="The products we own."
        lead={
          <p>
            We build and operate our own mobile and web products, primarily SaaS and digital tools.
            These are companies we create, grow, and sometimes sell or spin out — designed and
            developed in-house.
          </p>
        }
      />

      {/* ─── The cards ─── */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {APPS.map((app, index) => (
            <Reveal key={app.slug} delay={index * 0.08}>
              <a
                href={productPath(app)}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all duration-500 hover:-translate-y-1 hover:border-line-hover hover:bg-card-hover"
              >
                <span
                  className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full opacity-0 blur-[90px] transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: app.glow }}
                  aria-hidden="true"
                />

                <div className="relative flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <img
                      src={app.icon}
                      alt=""
                      aria-hidden="true"
                      className="h-14 w-14 rounded-[23%] border border-white/10 transition-transform duration-500 group-hover:scale-[1.05]"
                      style={{ boxShadow: ICON_SHADOW }}
                      draggable={false}
                    />
                    <span
                      className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em]"
                      style={
                        app.status === 'live'
                          ? { borderColor: `${app.accent}59`, color: app.accent }
                          : { borderColor: 'rgba(148,163,199,0.22)', color: 'rgba(155,161,180,0.78)' }
                      }
                    >
                      {app.status === 'live' ? 'Live' : 'In progress'}
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight leading-none mb-2">
                    {app.name}
                  </h2>
                  <p className="text-sm font-medium mb-4" style={{ color: app.accent }}>
                    {app.cardTagline ?? app.tagline}
                  </p>
                  <p className="text-sm text-ink-muted leading-relaxed mb-6">{app.short}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {app.platforms.map((platform) => (
                      <Tag key={platform}>{platform}</Tag>
                    ))}
                  </div>

                  <span className="mt-auto inline-flex items-center gap-2 text-sm text-ink-muted transition-colors group-hover:text-ink">
                    View product
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}

          {/* Placeholder tile: the portfolio is explicitly not finished. */}
          <Reveal delay={APPS.length * 0.08}>
            <Card className="flex h-full min-h-[220px] flex-col items-center justify-center border-dashed p-8 text-center">
              <span className="font-display text-3xl text-ink-faint/60" style={{ fontWeight: 340 }}>
                Next
              </span>
              <p className="mt-3 text-sm text-ink-muted leading-relaxed max-w-[28ch]">
                More in build, and we buy products worth owning. If yours might be one of them,{' '}
                <a href="/contact/" className="text-ink hover:underline">
                  tell us about it
                </a>
                .
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ─── Closing ─── */}
      <Section className="overflow-hidden border-t border-line">
        <Reveal className="relative text-center">
          <h2
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] tracking-tight mb-8 leading-[1.15]"
            style={{ fontWeight: 420 }}
          >
            Building something of your own?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink href="/advisory/">Work with us</ButtonLink>
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
