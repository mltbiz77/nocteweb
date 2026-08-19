import { Register } from './Register';
import {
  Container,
  Display,
  NightBand,
  PageMasthead,
  PageShell,
  Prose,
  SectionMark,
} from './site';
import { APPS } from '@/data/apps';

/**
 * The full register. Everything on this page comes from `data/apps.ts` —
 * adding a product is a data change plus an HTML entry point, never a change
 * to this file.
 */
export default function Portfolio() {
  const live = APPS.filter((app) => app.status === 'live').length;
  const platforms = Array.from(new Set(APPS.flatMap((app) => app.platforms)));

  return (
    <PageShell current="/portfolio/">
      <PageMasthead
        slug="Portfolio"
        title="The products we own."
        lead={
          <p>
            We build and operate our own mobile and web products, primarily SaaS and digital
            tools. These are companies we create, grow, and sometimes sell or spin out — designed
            and developed in-house rather than commissioned.
          </p>
        }
        facts={[
          { label: 'Holdings', value: String(APPS.length) },
          { label: 'Live', value: String(live) },
          { label: 'In build', value: String(APPS.length - live) },
          { label: 'Platforms', value: platforms.join(' · ') },
        ]}
      />

      <Container className="pt-16 sm:pt-24">
        <SectionMark index="01" title="Register of holdings" />
        <Register />
      </Container>

      <Container className="pt-20 pb-24 sm:pt-28 sm:pb-32">
        <SectionMark index="02" title="How we run them" />
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Display as="h3" size="md">
              Small products, run properly, for a long time.
            </Display>
          </div>
          <div className="lg:col-span-5">
            <Prose>
              <p>
                Each product is owned rather than shipped and forgotten. We keep the surface area
                small on purpose: a narrow product that one person can hold in their head tends to
                outlive a broad one that nobody does.
              </p>
              <p>
                None of them carry ads or sell data. That is a product decision before it is an
                ethical one — it keeps the incentives pointed at the people paying us.
              </p>
            </Prose>
          </div>
        </div>
      </Container>

      <NightBand heading="Building something of your own?">
        <Prose className="max-w-[46ch] text-night-muted">
          <p>
            If you have a product worth owning, or want help building one, we would like to hear
            about it.
          </p>
        </Prose>
      </NightBand>
    </PageShell>
  );
}
