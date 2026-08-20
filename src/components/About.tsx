import {
  Container,
  Display,
  Entry,
  Label,
  ClosingBand,
  PageMasthead,
  PageShell,
  Prose,
  Reveal,
  SectionHead,
} from './site';
import { PRINCIPLES, TEAM } from '@/data/team';

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/** Who we are and what we are trying to build, in the fewest words that do it. */
export default function About() {
  return (
    <PageShell current="/about/">
      <PageMasthead
        eyebrow="About"
        title={['we build companies,', 'and then we run them.']}
        lead={
          <p>
            We build and run our own digital products, acquire the ones worth owning, and work
            with a small number of companies on theirs. The goal is simple to say and hard to
            do: create and operate valuable digital companies, repeatedly.
          </p>
        }
      />

      {/* ─── §01 The shape of it ─── */}
      <Container className="pt-16 sm:pt-24">
        <Reveal>
          <SectionHead
            eyebrow="The shape of it"
            title="one team across strategy, design, and engineering."
          />
        </Reveal>
        <div className="mt-14 grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Display as="p" size="md">
              no hand-offs between people who never speak.
            </Display>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
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
        <Reveal>
          <SectionHead eyebrow="How we think" title="three things we hold to." />
        </Reveal>
        <div className="mt-14 border-t border-rule">
          {PRINCIPLES.map((principle) => (
            <Entry
              key={principle.title}
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
          <Reveal>
            <SectionHead eyebrow="The team" title="who you'd work with." />
          </Reveal>
          <div className="mt-14 border-t border-rule">
            {TEAM.map((member) => (
              <Entry
                key={member.name}
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

      <ClosingBand heading={["Two ways in."]}>
        <Prose className="max-w-[44ch] text-ink-dim">
          <p>
            Look at what we own, or tell us what you are building. Either is a good place to
            start a conversation.
          </p>
        </Prose>
      </ClosingBand>
    </PageShell>
  );
}
