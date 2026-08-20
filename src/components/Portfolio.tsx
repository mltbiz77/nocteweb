import { Showcase } from './Showcase';
import {
  Button,
  Container,
  Display,
  ClosingBand,
  PageMasthead,
  PageShell,
  Prose,
  Reveal,
  SectionHead,
} from './site';

/**
 * The full portfolio. Everything here comes from `data/apps.ts` — adding a
 * product is a data change plus an HTML entry point, never a change to this
 * file or to `Showcase`.
 */
export default function Portfolio() {
  return (
    <PageShell current="/portfolio/">
      <PageMasthead
        eyebrow="Portfolio"
        title={['the products', 'we own.']}
        lead={
          <p>
            Designed and built in-house, then run for the long term. These are companies we
            create and grow — and sometimes sell.
          </p>
        }
      />

      <Showcase />

      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHead
            eyebrow="How we run them"
            title="small products, run properly, for a long time."
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
              ['owned, not shipped', 'We keep what we build and answer for how it performs.'],
              ['no ads, no data sold', 'Every product earns from the person using it.'],
              ['built in-house', 'The same people design, build and support each one.'],
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

      <ClosingBand heading={["Building something of your own?"]}>
        <Prose className="max-w-[46ch] text-ink-dim">
          <p>
            If you have a product worth owning, or want help building one, we would like to hear
            about it.
          </p>
        </Prose>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/contact/" variant="solid">
            Get in touch
          </Button>
          <Button href="/advisory/" variant="outline">
            Work with us
          </Button>
        </div>
      </ClosingBand>
    </PageShell>
  );
}
