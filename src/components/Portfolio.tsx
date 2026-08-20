import { Showcase } from './Showcase';
import {
  Button,
  Container,
  Display,
  NightBand,
  PageMasthead,
  PageShell,
  Prose,
  Reveal,
  SectionHead,
} from './site';
import { APPS } from '@/data/apps';

/**
 * The full portfolio. Everything here comes from `data/apps.ts` — adding a
 * product is a data change plus an HTML entry point, never a change to this
 * file or to `Showcase`.
 */
export default function Portfolio() {
  const live = APPS.filter((app) => app.status === 'live').length;
  const platforms = Array.from(new Set(APPS.flatMap((app) => app.platforms)));

  return (
    <PageShell current="/portfolio/" navTone="night">
      <PageMasthead
        eyebrow="Portfolio"
        title="The products we own."
        lead={
          <p>
            We build and operate our own mobile and web products, primarily SaaS and digital
            tools. These are companies we create, grow, and sometimes sell or spin out — designed
            and developed in-house rather than commissioned.
          </p>
        }
        facts={[
          { label: 'Products', value: String(APPS.length) },
          { label: 'Live', value: String(live) },
          { label: 'In build', value: String(APPS.length - live) },
          { label: 'Platforms', value: platforms.join(' · ') },
        ]}
      />

      <Showcase />

      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHead
            eyebrow="How we run them"
            title="Small products, run properly, for a long time."
            lead={
              <>
                <p>
                  Each product is owned rather than shipped and forgotten. We keep the surface area
                  small on purpose: a narrow product that one person can hold in their head tends
                  to outlive a broad one that nobody does.
                </p>
                <p>
                  None of them carry ads or sell data. That is a product decision before it is an
                  ethical one — it keeps the incentives pointed at the people paying us.
                </p>
              </>
            }
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 grid gap-x-12 gap-y-8 sm:grid-cols-3">
            {[
              ['Owned, not shipped', 'We keep what we build and answer for how it performs.'],
              ['No ads, no data sold', 'Every product earns from the person using it.'],
              ['Built in-house', 'The same people design, build and support each one.'],
            ].map(([title, body]) => (
              <div key={title} className="border-t border-rule pt-6">
                <Display as="h3" size="sm">
                  {title}
                </Display>
                <Prose className="mt-3 text-[1rem]">
                  <p>{body}</p>
                </Prose>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>

      <NightBand heading="Building something of your own?">
        <Prose className="max-w-[46ch] text-night-muted">
          <p>
            If you have a product worth owning, or want help building one, we would like to hear
            about it.
          </p>
        </Prose>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/contact/" variant="night-solid">
            Get in touch
          </Button>
          <Button href="/advisory/" variant="night-outline">
            Work with us
          </Button>
        </div>
      </NightBand>
    </PageShell>
  );
}
