import { Reveal } from './components/Reveal';
import { ParticleField } from './components/ParticleField';
import { Constellation } from './components/Constellation';
import {
  ArrowRight,
  ButtonLink,
  Card,
  CONTACT_EMAIL,
  Horizon,
  PageShell,
  Section,
  SectionHeading,
} from './components/site';
import { COMPANY } from '@/data/company';
import { PILLARS } from '@/data/services';
import { APPS } from '@/data/apps';

const TITLE = COMPANY.name;

/**
 * The home page has one job: say what the company is in a sentence, then send
 * a visitor down one of two paths — the products we own, or the work we do for
 * other people. Everything else lives on the page it belongs to.
 */
export default function App() {
  return (
    <PageShell current="/">
      {/* ─── Hero: the night sky ─── */}
      <section className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden py-32">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #030409 0%, #05060B 55%, #0B1024 86%, #0D1128 100%)',
          }}
          aria-hidden="true"
        />
        <Horizon className="top-0 h-[86%]" />
        <ParticleField />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <h1
            aria-label={TITLE}
            className="coalesce font-display text-[clamp(3rem,8vw,6.5rem)] leading-[1.02] tracking-[-0.015em]"
            style={{ fontWeight: 380 }}
          >
            {TITLE.split('').map((ch, i) => (
              <span key={i} aria-hidden="true" style={{ animationDelay: `${100 + i * 40}ms` }}>
                {/* Each letter is inline-block, and a plain space between two of those
                    collapses to zero width — the word break has to be a non-breaking space. */}
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-[24ch] sm:max-w-none font-display text-[clamp(1.15rem,2.6vw,1.75rem)] leading-snug text-ink/90"
             style={{ fontWeight: 380 }}>
            {COMPANY.subline}
          </p>

          <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-ink-faint">
            {COMPANY.tagline.replace(/\.$/, '')}
          </p>

          <div className="mt-11 flex flex-col sm:flex-row items-center gap-4">
            <ButtonLink href="/portfolio/">See our products</ButtonLink>
            <ButtonLink href="/advisory/" variant="ghost">
              Work with us
            </ButtonLink>
          </div>

          <div className="mt-20">
            <Constellation apps={APPS} />
          </div>
        </div>

        <div className="scroll-cue absolute bottom-8 z-10">
          <svg className="w-4 h-4 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </section>

      {/* ─── What we do ─── */}
      <Section id="what-we-do">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                A parent company for
                <br />
                <span className="italic" style={{ fontWeight: 380, color: 'rgba(242,243,247,0.5)' }}>
                  digital businesses.
                </span>
              </>
            }
            lead="Nocte Ventures builds and operates its own portfolio of mobile and web products, mostly SaaS and digital tools."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-x-16 gap-y-8 sm:grid-cols-2 max-w-4xl">
            <p className="text-ink-muted leading-relaxed">
              We create companies, grow them, and buy, sell, or invest in others. Strategy, design,
              engineering, and go-to-market sit in one place, which keeps the distance between a
              decision and its result short enough to learn from.
            </p>
            <p className="text-ink-muted leading-relaxed">
              Alongside that, we advise founders and companies and build AI and digital solutions for
              business clients. Our own apps are where that advice gets tested first — under our own
              name, on our own P&amp;L.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="border-y border-line py-10 text-center mt-16">
            <p
              className="font-display text-[clamp(1.5rem,3vw,2.1rem)] text-ink"
              style={{ fontWeight: 380 }}
            >
              Build <span className="text-moonlight/50 px-2">·</span> Own
              <span className="text-moonlight/50 px-2">·</span> Advise
              <span className="text-moonlight/50 px-2">·</span> Invest
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ─── The two pillars: pick a path ─── */}
      <Section id="pillars" className="pt-0 sm:pt-0">
        <div className="grid gap-5 md:grid-cols-2">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.08}>
              <Card className="group relative flex h-full flex-col overflow-hidden p-9 sm:p-10 hover:border-line-hover hover:bg-card-hover">
                <span
                  className="pointer-events-none absolute -top-28 -right-28 h-64 w-64 rounded-full opacity-0 blur-[90px] transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: 'rgba(201,212,238,0.10)' }}
                  aria-hidden="true"
                />
                <span className="relative text-[11px] uppercase tracking-[0.3em] text-ink-faint">
                  {pillar.eyebrow}
                </span>
                <h3
                  className="relative mt-5 font-display text-[clamp(1.6rem,3vw,2.1rem)] tracking-tight"
                  style={{ fontWeight: 420 }}
                >
                  {pillar.title}
                </h3>
                <p className="relative mt-4 text-ink leading-relaxed">{pillar.line}</p>
                <p className="relative mt-3 text-sm text-ink-muted leading-relaxed">{pillar.body}</p>
                <a
                  href={pillar.cta.href}
                  className="relative mt-8 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors group-hover:text-ink"
                >
                  {pillar.cta.label}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── Contact: the page ends where it began, at the edge of night ─── */}
      <Section id="contact" className="overflow-hidden border-t border-line">
        <Reveal className="relative text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-ink-faint block mb-5">
            Get in touch
          </span>
          <h2
            className="font-display text-[clamp(2.25rem,5vw,3.75rem)] tracking-tight mb-6 leading-[1.1]"
            style={{ fontWeight: 420 }}
          >
            Let&apos;s talk about your
            <br />
            next venture.
          </h2>
          <p className="text-ink-muted max-w-[46ch] mx-auto mb-10 leading-relaxed">
            Building something new, looking for an operator to advise on it, or exploring a sale — we
            are open to the right conversations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink href="/contact/">Contact us</ButtonLink>
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
