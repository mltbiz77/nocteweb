import { Register } from './components/Register';
import {
  ArrowLink,
  Container,
  Display,
  Entry,
  FactTable,
  Label,
  NightBand,
  PageShell,
  Prose,
  SectionMark,
} from './components/site';
import { COMPANY } from '@/data/company';
import { MODES } from '@/data/services';
import { APPS } from '@/data/apps';

/**
 * The front page of the register.
 *
 * A masthead that states what the company is, the holdings themselves, and
 * the three ways we make money. No hero, no cards, no animation — the page
 * is the document, and the document leads with facts.
 */
export default function App() {
  const live = APPS.filter((app) => app.status === 'live').length;

  return (
    <PageShell current="/">
      {/* ─── Masthead ─── */}
      <Container className="pt-14 sm:pt-20">
        <div className="flex items-baseline justify-between gap-6 border-b border-ink pb-3">
          <Label className="text-ink">{COMPANY.name}</Label>
          <Label>
            {COMPANY.jurisdiction} · Est. {COMPANY.founded}
          </Label>
        </div>

        <div className="grid gap-x-8 gap-y-12 pt-10 sm:pt-14 lg:grid-cols-12">
          <div className="lg:col-span-10">
            <Display as="h1" size="xl" className="max-w-[17ch]">
              A company that builds, owns, and advises digital businesses.
            </Display>
          </div>

          <div className="lg:col-span-5">
            <Prose>
              <p>
                Nocte Ventures is a parent company for mobile and web software. We build and
                operate our own portfolio, buy and invest in digital products, and advise other
                companies on the same decisions we make with our own money.
              </p>
            </Prose>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ArrowLink href="/portfolio/">See our products</ArrowLink>
              <ArrowLink href="/advisory/">Work with us</ArrowLink>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <FactTable
              rows={[
                { label: 'Products owned', value: String(APPS.length) },
                { label: 'Live on the App Store', value: String(live) },
                { label: 'Incorporated', value: `${COMPANY.founded} · ${COMPANY.jurisdiction}` },
                { label: 'Company no.', value: COMPANY.companyNumber },
              ]}
            />
          </div>
        </div>
      </Container>

      {/* ─── §01 The register ─── */}
      <Container className="pt-20 sm:pt-28">
        <SectionMark
          index="01"
          title="The register"
          aside={<ArrowLink href="/portfolio/">Full portfolio</ArrowLink>}
        />
        <Register />
      </Container>

      {/* ─── §02 What we do ─── */}
      <Container className="pt-20 pb-24 sm:pt-28 sm:pb-32">
        <SectionMark index="02" title="What we do" />
        <div className="border-t border-rule">
          {MODES.map((mode) => (
            <Entry
              key={mode.index}
              index={mode.index}
              title={mode.title}
              aside={<ArrowLink href={mode.link.href}>{mode.link.label}</ArrowLink>}
            >
              <p>{mode.body}</p>
            </Entry>
          ))}
        </div>
      </Container>

      <NightBand heading="Let’s talk about your next venture.">
        <Prose className="max-w-[46ch] text-night-muted">
          <p>
            Building something new, looking for an operator to advise on it, or exploring a sale —
            we are open to the right conversations.
          </p>
        </Prose>
      </NightBand>
    </PageShell>
  );
}
