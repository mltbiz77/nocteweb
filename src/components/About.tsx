import {
  Container,
  Display,
  Entry,
  Label,
  NightBand,
  PageMasthead,
  PageShell,
  Prose,
  SectionMark,
} from './site';
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
  const live = APPS.filter((app) => app.status === 'live').length;

  return (
    <PageShell current="/about/">
      <PageMasthead
        slug="About"
        title={
          <>
            We build companies, and then we run them.
          </>
        }
        lead={
          <>
            <p>
              Nocte Ventures is a parent company for mobile and web apps, primarily SaaS and
              digital products. We build and manage our own portfolio of businesses, buy, sell,
              and invest in projects, and provide advisory and strategic services to other
              companies.
            </p>
            <p>
              We also build AI and digital solutions for business clients. The goal is a simple
              one and a hard one: to repeatedly create and operate valuable digital companies.
            </p>
          </>
        }
        facts={[
          { label: 'Products owned', value: String(APPS.length) },
          { label: 'Live on the App Store', value: String(live) },
          { label: 'Team', value: 'Small, senior' },
          { label: 'Focus', value: 'SaaS · Mobile · AI' },
        ]}
      />

      {/* ─── §01 The shape of it ─── */}
      <Container className="pt-16 sm:pt-24">
        <SectionMark index="01" title="The shape of it" />
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Display as="h2" size="md">
              One team across strategy, design, and engineering — no hand-offs between people who
              never speak.
            </Display>
          </div>
          <div className="lg:col-span-5">
            <Prose>
              <p>
                Most of what goes wrong in software goes wrong in the gap between deciding
                something and building it. We keep that gap short by not having one: the people
                who set the direction are the people who ship it.
              </p>
              <p>
                That is also why we own products rather than only advise on them. An opinion about
                pricing or retention is worth very little until it has been tested on the App
                Store under your own name.
              </p>
            </Prose>
          </div>
        </div>
      </Container>

      {/* ─── §02 How we think ─── */}
      <Container className="pt-20 sm:pt-28">
        <SectionMark index="02" title="How we think" />
        <div className="border-t border-rule">
          {PRINCIPLES.map((principle, index) => (
            <Entry
              key={principle.title}
              index={String(index + 1).padStart(2, '0')}
              title={principle.title}
            >
              <p>{principle.description}</p>
            </Entry>
          ))}
        </div>
      </Container>

      {/* ─── §03 Team: renders only once there is someone in `TEAM` ─── */}
      {TEAM.length > 0 ? (
        <Container className="pt-20 sm:pt-28">
          <SectionMark index="03" title="Who you'd work with" />
          <div className="border-t border-rule">
            {TEAM.map((member, index) => (
              <Entry
                key={member.name}
                index={String(index + 1).padStart(2, '0')}
                title={member.name}
                aside={
                  <div className="flex flex-wrap items-center gap-5">
                    <Label>{member.role}</Label>
                    {member.links?.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-quiet font-mono text-[10px] uppercase tracking-label text-ink"
                      >
                        {link.label} &rarr;
                      </a>
                    ))}
                  </div>
                }
              >
                <div className="flex items-start gap-5">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-14 w-14 shrink-0 border border-rule object-cover"
                      draggable={false}
                    />
                  ) : (
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-rule font-mono text-[11px] tracking-label text-ink-faint">
                      {initials(member.name)}
                    </span>
                  )}
                  <p>{member.bio}</p>
                </div>
              </Entry>
            ))}
          </div>
        </Container>
      ) : null}

      <div className="pb-24 sm:pb-32" />

      <NightBand heading="Two ways in.">
        <Prose className="max-w-[44ch] text-night-muted">
          <p>
            Look at what we own, or tell us what you are building. Either is a good place to
            start a conversation.
          </p>
        </Prose>
      </NightBand>
    </PageShell>
  );
}
