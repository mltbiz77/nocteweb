import {
  AppStoreButton,
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
  StatusMark,
  STRINGS,
} from './site';
import { productPath, type AppData } from '@/data/apps';

/**
 * One product, as an entry in the register: identification, specification,
 * what it does, and what happens to your data. Same document grammar as the
 * rest of the site — the only thing a product brings of its own is the
 * accent colour on its status mark.
 */
export default function AppPage({ app }: { app: AppData }) {
  const shots = app.screenshots ?? [];
  const t = STRINGS[app.locale];

  return (
    <PageShell current={productPath(app)}>
      {/* ─── Identification ─── */}
      <Container className="pt-14 sm:pt-20">
        <div className="flex items-baseline justify-between gap-6 border-b border-ink pb-3">
          <Label className="text-ink">{app.name}</Label>
          <a
            href="/portfolio/"
            className="link-quiet font-mono text-[10px] uppercase tracking-label text-ink-muted"
          >
            &larr; {t.allProducts}
          </a>
        </div>

        <div className="grid gap-x-8 gap-y-10 pt-10 sm:pt-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-5">
              <img
                src={app.icon}
                alt={`${app.name} app icon`}
                className="h-16 w-16 shrink-0 rounded-[22%] border border-rule-soft sm:h-20 sm:w-20"
                draggable={false}
              />
              <div>
                <Display as="h1" size="lg">
                  {app.name}
                </Display>
                <div className="mt-3">
                  <StatusMark status={app.status} accent={app.accent} />
                </div>
              </div>
            </div>

            <p className="mt-8 max-w-[30ch] font-sans text-[clamp(1.35rem,2.6vw,1.9rem)] font-medium leading-[1.15] tracking-[-0.025em] text-ink">
              {app.tagline}
            </p>

            <Prose className="mt-6 max-w-[52ch]">
              <p>{app.brief}</p>
            </Prose>

            <div className="mt-9">
              <AppStoreButton
                href={app.appStoreUrl}
                locale={app.locale}
                preorder={app.status === 'soon'}
              />
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Label>{t.specification}</Label>
            <div className="mt-4">
              <FactTable
                rows={[
                  ...app.meta.map((item) => ({ label: item.label, value: item.value })),
                  { label: 'Owner', value: 'Nocte Ventures' },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* ─── §01 Screens ─── */}
      {shots.length > 0 ? (
        <Container className="pt-20 sm:pt-28">
          <SectionMark index="01" title={t.screens} />
          <div
            className="-mx-6 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14"
            tabIndex={0}
            role="region"
            aria-label={`${app.name} — ${t.screens}`}
          >
            <div className="flex w-max gap-4">
              {shots.map((shot, index) => (
                <figure key={shot.src} className="w-[168px] shrink-0 sm:w-[196px]">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="block w-full border border-rule"
                    draggable={false}
                  />
                  <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-label text-ink-faint">
                    {String(index + 1).padStart(2, '0')}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      ) : null}

      {/* ─── §02 What it does ─── */}
      <Container className="pt-20 sm:pt-28">
        <SectionMark index={shots.length > 0 ? '02' : '01'} title={t.whatItDoes} />
        <div className="border-t border-rule">
          {app.features.map((feature) => (
            <Entry key={feature.number} index={feature.number} title={feature.title}>
              <p>{feature.description}</p>
            </Entry>
          ))}
        </div>
      </Container>

      {/* ─── §03 Privacy ─── */}
      <Container className="pt-20 pb-24 sm:pt-28 sm:pb-32">
        <SectionMark index={shots.length > 0 ? '03' : '02'} title={t.privacy} />
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Display as="h2" size="md">
              Your data stays yours.
            </Display>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Prose>
              <p>{app.privacy}</p>
            </Prose>
            <div className="mt-6">
              <ArrowLink href="/privacy/">Site privacy policy</ArrowLink>
            </div>
          </div>
        </div>
      </Container>

      <NightBand heading={t.oneOfOurs(app.name)}>
        <Prose className="max-w-[44ch] text-night-muted">
          <p>{t.builtBy}. Look at the rest of the register, or tell us what you are building.</p>
        </Prose>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
          <a
            href="/portfolio/"
            className="link-quiet font-mono text-[11px] uppercase tracking-label text-night-ink"
          >
            {t.allProducts} &rarr;
          </a>
          <a
            href="/contact/"
            className="link-quiet font-mono text-[11px] uppercase tracking-label text-night-ink"
          >
            {t.contact} &rarr;
          </a>
        </div>
      </NightBand>
    </PageShell>
  );
}
