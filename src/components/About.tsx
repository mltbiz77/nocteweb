import { Reveal } from './Reveal';
import {
  ButtonLink,
  Card,
  CONTACT_EMAIL,
  Horizon,
  PageHeader,
  PageShell,
  Section,
  SectionHeading,
} from './site';
import { COMPANY } from '@/data/company';
import { PRINCIPLES, TEAM } from '@/data/team';
import { APPS } from '@/data/apps';

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/** Who we are and what we are trying to build, in the fewest words that do it. */
export default function About() {
  const liveApps = APPS.filter((app) => app.status === 'live').length;

  return (
    <PageShell current="/about/">
      <PageHeader
        eyebrow="About"
        title={
          <>
            We build companies,
            <br />
            <span className="italic" style={{ fontWeight: 380, color: 'rgba(242,243,247,0.5)' }}>
              and then we run them.
            </span>
          </>
        }
        lead={
          <>
            <p>
              Nocte Ventures is a parent company for mobile and web apps, primarily SaaS and digital
              products. We build and manage our own portfolio of businesses, buy, sell, and invest in
              projects, and provide advisory and strategic services to other companies.
            </p>
            <p>
              We also build AI and digital solutions for business clients. The goal is a simple one
              and a hard one: to repeatedly create and operate valuable digital companies.
            </p>
          </>
        }
      />

      {/* ─── Where we are ─── */}
      <Section id="today">
        <Reveal>
          <div className="grid gap-8 sm:grid-cols-3 border-y border-line py-10">
            <div>
              <p className="font-display text-[2.75rem] leading-none" style={{ fontWeight: 340 }}>
                {APPS.length}
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                products in the portfolio, {liveApps} of them shipping on the App Store today.
              </p>
            </div>
            <div>
              <p className="font-display text-[2.75rem] leading-none" style={{ fontWeight: 340 }}>
                One
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                team across strategy, design, and engineering — no hand-offs between people who never
                speak.
              </p>
            </div>
            <div>
              <p className="font-display text-[2.75rem] leading-none" style={{ fontWeight: 340 }}>
                2025
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                {COMPANY.registration.replace('Registered in', 'Founded and registered in')}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── How we think ─── */}
      <Section id="principles" className="pt-0 sm:pt-0">
        <Reveal>
          <SectionHeading
            eyebrow="How we think"
            title="Three things we hold to."
            lead="Not a manifesto — just the trade-offs we keep making the same way."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.06}>
              <Card className="h-full p-7 sm:p-8">
                <h3 className="text-lg font-medium text-ink mb-3">{principle.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{principle.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── Team: renders only once there is someone in `TEAM` ─── */}
      {TEAM.length > 0 ? (
        <Section id="team">
          <Reveal>
            <SectionHeading eyebrow="Who you'd work with" title="The team." />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.06}>
                <Card className="h-full p-7 sm:p-8">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-16 w-16 rounded-full border border-line object-cover mb-5"
                      draggable={false}
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full border border-line flex items-center justify-center text-sm tracking-[0.15em] text-ink-muted mb-5">
                      {initials(member.name)}
                    </div>
                  )}
                  <h3 className="text-lg font-medium text-ink">{member.name}</h3>
                  <p className="text-sm text-moonlight/70 mt-1">{member.role}</p>
                  <p className="text-sm text-ink-muted leading-relaxed mt-4">{member.bio}</p>
                  {member.links?.length ? (
                    <div className="flex flex-wrap gap-4 mt-5">
                      {member.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-ink-muted hover:text-ink transition-colors"
                        >
                          {link.label} →
                        </a>
                      ))}
                    </div>
                  ) : null}
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ─── Closing ─── */}
      <Section className="overflow-hidden border-t border-line">
        <Reveal className="relative text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-ink-faint block mb-5">
            {COMPANY.tagline.replace(/\.$/, '')}
          </span>
          <h2
            className="font-display text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight mb-8 leading-[1.15]"
            style={{ fontWeight: 420 }}
          >
            Two ways in.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink href="/portfolio/">See our products</ButtonLink>
            <ButtonLink href="/advisory/" variant="ghost">
              Work with us
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-ink-faint">
            Or just email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink-muted hover:text-ink transition-colors">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Reveal>
        <Horizon className="bottom-0 h-16" />
      </Section>
    </PageShell>
  );
}
