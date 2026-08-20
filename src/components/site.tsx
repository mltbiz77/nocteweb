import { useState, type ReactNode } from 'react';
import {
  COMPANY,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  INSTAGRAM_URL,
  LEGAL_LINKS,
  NAV_LINKS,
} from '@/data/company';
import { APPS, productPath } from '@/data/apps';

export { CONTACT_EMAIL, CONTACT_MAILTO, INSTAGRAM_URL };

/* ────────────────────────────────────────────────────────────────
   Layout primitives

   The whole site is built from a container, hairline rules, and a
   twelve-column grid that you can actually see. There are no cards
   and no surfaces — structure comes from rules and space alone.
   ──────────────────────────────────────────────────────────────── */

export const Container = ({
  id,
  className = '',
  children,
}: {
  /** Set when the page index links to this block. */
  id?: string;
  className?: string;
  children: ReactNode;
}) => (
  <div
    id={id}
    className={`mx-auto w-full max-w-[1320px] scroll-mt-20 px-6 sm:px-10 lg:px-14 ${className}`}
  >
    {children}
  </div>
);

/** Small monospace label. Section marks, table headers, field labels. */
export const Label = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={`font-mono text-[10px] uppercase tracking-label text-ink-faint ${className}`}
  >
    {children}
  </span>
);

/**
 * A numbered section mark sitting on a full-width rule:
 *   § 02 ─────────────────────────────── WHAT WE DO
 */
export const SectionMark = ({
  index,
  title,
  aside,
}: {
  index: string;
  title: string;
  aside?: ReactNode;
}) => (
  <div className="flex items-baseline gap-4 border-t-2 border-ink pt-3 pb-8 sm:pb-10">
    <Label className="tabular text-accent">§{index}</Label>
    <h2 className="font-mono text-[10px] uppercase tracking-label text-ink">{title}</h2>
    {aside ? <div className="ml-auto">{aside}</div> : null}
  </div>
);

/** The one heading scale. `level` picks the size, not the tag. */
export const Display = ({
  as: Tag = 'h2',
  size = 'md',
  className = '',
  children,
}: {
  as?: 'h1' | 'h2' | 'h3' | 'p';
  size?: 'xl' | 'lg' | 'md' | 'sm';
  className?: string;
  children: ReactNode;
}) => {
  const scale = {
    xl: 'text-[clamp(2.5rem,6.4vw,5.5rem)] leading-[0.93] tracking-[-0.042em]',
    lg: 'text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.0] tracking-masthead',
    md: 'text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.08] tracking-[-0.025em]',
    sm: 'text-[clamp(1.15rem,1.7vw,1.4rem)] leading-[1.2] tracking-[-0.015em]',
  }[size];

  return (
    <Tag className={`font-sans font-medium [text-wrap:balance] ${scale} ${className}`}>
      {children}
    </Tag>
  );
};

/** Body prose. The serif is what makes this read as a document. */
export const Prose = ({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={`font-text text-[1.0625rem] leading-[1.65] text-ink-muted [&_p+p]:mt-5 ${className}`}
  >
    {children}
  </div>
);

/** Key/value rows in monospace. The company's facts, a product's spec. */
export const FactTable = ({
  rows,
  tone = 'paper',
}: {
  rows: { label: string; value: ReactNode }[];
  tone?: 'paper' | 'night';
}) => (
  <dl className="w-full">
    {rows.map((row) => (
      <div
        key={row.label}
        className={`flex items-baseline justify-between gap-6 border-b py-2.5 ${
          tone === 'night' ? 'border-night-rule' : 'border-rule-soft'
        }`}
      >
        <dt
          className={`font-mono text-[10px] uppercase tracking-label ${
            tone === 'night' ? 'text-night-muted' : 'text-ink-faint'
          }`}
        >
          {row.label}
        </dt>
        <dd
          className={`tabular text-right font-mono text-[12px] ${
            tone === 'night' ? 'text-night-ink' : 'text-ink'
          }`}
        >
          {row.value}
        </dd>
      </div>
    ))}
  </dl>
);

/**
 * A numbered ruled entry — the workhorse. Services, principles, product
 * features and legal clauses are all the same object: an index numeral,
 * a title, a body, and optionally something in the right margin.
 */
export const Entry = ({
  index,
  title,
  children,
  aside,
  href,
}: {
  index: string;
  title: string;
  children?: ReactNode;
  aside?: ReactNode;
  href?: string;
}) => {
  const inner = (
    <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-3 border-b border-rule py-7 sm:grid-cols-[4rem_minmax(0,15rem)_minmax(0,1fr)] sm:gap-x-8">
      <Label className="tabular pt-1.5 text-accent">{index}</Label>
      <Display as="h3" size="sm" className="text-ink">
        {title}
      </Display>
      <div className="col-start-2 sm:col-start-3">
        {children ? <Prose className="text-[1rem]">{children}</Prose> : null}
        {aside ? <div className="mt-4">{aside}</div> : null}
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="group block transition-colors hover:bg-paper-sunk/70">
      {inner}
    </a>
  ) : (
    inner
  );
};

/** Solid ink rectangle. There is exactly one button in this system. */
export const Button = ({
  href,
  children,
  variant = 'solid',
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'night';
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>) => {
  const skin = {
    solid: 'bg-ink text-paper hover:bg-accent',
    outline: 'border border-ink text-ink hover:bg-ink hover:text-paper',
    night: 'bg-night-ink text-night hover:bg-night-accent',
  }[variant];

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-3 px-6 py-3 font-mono text-[11px] uppercase tracking-label transition-colors ${skin} ${className}`}
      {...rest}
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </a>
  );
};

/** A quiet standing link with a rule that draws in on hover. */
export const ArrowLink = ({
  href,
  children,
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>) => (
  <a
    href={href}
    className={`link-quiet inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-accent transition-colors hover:text-accent-deep ${className}`}
    {...rest}
  >
    {children}
    <span aria-hidden="true">&rarr;</span>
  </a>
);

/** Live / in-build marker. A square, because a dot reads as decoration. */
export const StatusMark = ({ status, accent }: { status: 'live' | 'soon'; accent: string }) => (
  <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-label text-ink-muted">
    <span
      className="h-[7px] w-[7px] shrink-0"
      style={
        status === 'live'
          ? { background: accent }
          : { border: '1px solid var(--ink-faint)', background: 'transparent' }
      }
      aria-hidden="true"
    />
    {status === 'live' ? 'Live' : 'In build'}
  </span>
);

/* ────────────────────────────────────────────────────────────────
   Brand
   ──────────────────────────────────────────────────────────────── */

/**
 * The wordmark, painted rather than drawn.
 *
 * `nocte-wordmark.png` is the supplied logo re-cut for this site: the flat
 * #F4F4F4 field turned into real transparency and the canvas trimmed to the
 * artwork, so a height class sizes the wordmark and not its padding.
 *
 * It is used as a CSS mask over `currentColor` instead of as an image, which
 * means one asset renders in ink blue on paper and in near-white on the night
 * band without a second file, an invert filter, or a blend mode.
 */
export const LogoMark = ({ className = 'h-5' }: { className?: string }) => (
  <span
    role="img"
    aria-label="Nocte"
    className={`block w-auto select-none bg-current ${className}`}
    style={{
      aspectRatio: '826 / 231',
      WebkitMaskImage: 'url(/nocte-wordmark.png)',
      maskImage: 'url(/nocte-wordmark.png)',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
    }}
  />
);

export const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const AppleGlyph = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.05 12.54c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.71-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.87-.76-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.75 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.87.69 1.18-.02 1.93-1.08 2.65-2.14.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.3-3.5zM14.88 5.9c.6-.74 1.01-1.76.9-2.78-.87.04-1.93.58-2.56 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.58-1.21z" />
  </svg>
);

export type Locale = 'en' | 'de';

/** UI chrome for a product page, so a German page is German throughout. */
export const STRINGS = {
  en: {
    portfolio: 'Portfolio',
    contact: 'Contact',
    getTheApp: 'Get the app',
    comingSoon: 'Not yet released',
    allProducts: 'All products',
    downloadOn: 'Download on the App Store',
    preorderOn: 'Pre-order on the App Store',
    preorder: 'Pre-order',
    specification: 'Specification',
    whatItDoes: 'What it does',
    builtAround: 'Built around one idea',
    screens: 'Screens',
    privacy: 'Privacy',
    builtBy: 'Built and operated by Nocte Ventures',
    oneOfOurs: (name: string) => `${name} is one of ours.`,
  },
  de: {
    portfolio: 'Portfolio',
    contact: 'Kontakt',
    getTheApp: 'Zur App',
    comingSoon: 'Noch nicht erschienen',
    allProducts: 'Alle Produkte',
    downloadOn: 'Laden im App Store',
    preorderOn: 'Vorbestellen im App Store',
    preorder: 'Vorbestellen',
    specification: 'Daten',
    whatItDoes: 'Was die App kann',
    builtAround: 'Ein geschlossener Kreislauf',
    screens: 'Bildschirme',
    privacy: 'Datenschutz',
    builtBy: 'Gebaut und betrieben von Nocte Ventures',
    oneOfOurs: (name: string) => `${name} ist eine von uns.`,
  },
} as const;

/** With no href the app is not on sale yet, so it states that instead. */
export const AppStoreButton = ({
  href,
  locale = 'en',
  preorder = false,
  tone = 'paper',
}: {
  href: string | null;
  locale?: Locale;
  preorder?: boolean;
  tone?: 'paper' | 'night';
}) => {
  const t = STRINGS[locale];

  if (!href) {
    return (
      <span
        className={`inline-flex items-center gap-2.5 border px-6 py-3 font-mono text-[11px] uppercase tracking-label ${
          tone === 'night'
            ? 'border-night-rule text-night-muted'
            : 'border-rule text-ink-muted'
        }`}
      >
        <AppleGlyph className="h-3.5 w-3.5" />
        {t.comingSoon}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 px-6 py-3 font-mono text-[11px] uppercase tracking-label transition-colors ${
        tone === 'night'
          ? 'bg-night-ink text-night hover:bg-night-ink/85'
          : 'bg-ink text-paper hover:bg-ink/85'
      }`}
    >
      <AppleGlyph className="h-3.5 w-3.5" />
      {preorder ? t.preorderOn : t.downloadOn}
    </a>
  );
};

/* ────────────────────────────────────────────────────────────────
   Chrome
   ──────────────────────────────────────────────────────────────── */

export const SiteNav = ({ current }: { current?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between py-4">
          <a href="/" aria-label="Nocte Ventures — Home" className="flex items-center gap-3">
            <LogoMark className="h-4 sm:h-[18px]" />
            <span className="hidden font-mono text-[10px] uppercase tracking-label text-ink-faint sm:inline">
              Ventures
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link, i) => {
              const active = current === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`group flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-label transition-colors ${
                    active ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <span className="tabular text-ink-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={active ? 'link' : 'link-quiet'}>{link.label}</span>
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="-mr-1 p-1 font-mono text-[11px] uppercase tracking-label text-ink md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </Container>

      <div id="site-menu" hidden={!open} className="border-t border-rule bg-paper md:hidden">
        <Container>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={current === link.href ? 'page' : undefined}
              className="flex items-baseline gap-3 border-b border-rule-soft py-3.5 font-mono text-[11px] uppercase tracking-label last:border-0"
            >
              <span className="tabular text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
              <span className={current === link.href ? 'text-ink' : 'text-ink-muted'}>
                {link.label}
              </span>
            </a>
          ))}
        </Container>
      </div>
    </header>
  );
};

/**
 * The one black band on the site — the close of every page. "After dark"
 * belongs here, as punctuation, rather than as a background everywhere.
 */
export const NightBand = ({
  heading,
  children,
  aside,
}: {
  heading: string;
  children?: ReactNode;
  /** Replaces the default email + facts column. */
  aside?: ReactNode;
}) => (
  <section className="bg-night text-night-ink">
    <Container className="py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="font-mono text-[10px] uppercase tracking-label text-night-muted">
            {COMPANY.tagline.replace(/\.$/, '')}
          </span>
          <Display as="h2" size="lg" className="mt-6 text-night-ink">
            {heading}
          </Display>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          {aside ?? (
            <>
              <Label className="text-night-muted">Write to us</Label>
              <a
                href={CONTACT_MAILTO}
                className="link mt-4 block break-words font-sans text-[clamp(1.2rem,2.2vw,1.6rem)] tracking-[-0.02em] text-night-ink"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-label text-night-muted">
                We reply within two working days
              </p>
            </>
          )}
        </div>
      </div>
    </Container>
  </section>
);

export const SiteFooter = () => (
  <footer className="border-t border-rule bg-paper">
    <Container className="py-14">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <LogoMark className="h-4" />
          <p className="mt-4 max-w-[30ch] font-text text-[0.95rem] leading-[1.6] text-ink-muted">
            {COMPANY.subline}
          </p>
        </div>

        <nav aria-label="Company" className="lg:col-span-2 lg:col-start-6">
          <Label>Company</Label>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-quiet text-sm text-ink-muted hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Products" className="lg:col-span-2">
          <Label>Products</Label>
          <ul className="mt-4 space-y-2.5">
            {APPS.map((app) => (
              <li key={app.slug}>
                <a
                  href={productPath(app)}
                  className="link-quiet text-sm text-ink-muted hover:text-ink"
                >
                  {app.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal" className="lg:col-span-2">
          <Label>Legal</Label>
          <ul className="mt-4 space-y-2.5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-quiet text-sm text-ink-muted hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* The statutory trading disclosure, and the only place on the site
          where incorporation details appear. */}
      <div className="mt-14 flex flex-col gap-2 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
          {COMPANY.legalLine}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </Container>
  </footer>
);

/**
 * A page's own table of contents, sitting in the masthead's right margin.
 * It earns that space by being navigation — it replaced a stack of
 * incorporation facts that told a visitor nothing they came for.
 */
export const PageIndex = ({
  sections,
}: {
  sections: { index: string; title: string; href: string }[];
}) => (
  <nav aria-label="On this page">
    <Label>On this page</Label>
    <ol className="mt-4 border-t border-rule">
      {sections.map((section) => (
        <li key={section.href} className="border-b border-rule-soft">
          <a
            href={section.href}
            className="group flex items-baseline gap-3 py-2.5 font-mono text-[11px] uppercase tracking-label text-ink-muted transition-colors hover:text-ink"
          >
            <span className="tabular text-accent">§{section.index}</span>
            <span className="link-quiet">{section.title}</span>
          </a>
        </li>
      ))}
    </ol>
  </nav>
);

/**
 * The opening block of every page other than the home page: a masthead slug
 * on a rule, a display heading, a lead, and an optional fact table in the
 * right margin. Same shape every time, so the pages read as one document.
 */
export const PageMasthead = ({
  slug,
  title,
  lead,
  facts,
}: {
  slug: string;
  title: ReactNode;
  lead?: ReactNode;
  facts?: { label: string; value: ReactNode }[];
}) => (
  <Container className="pt-14 sm:pt-20">
    <div className="flex items-baseline justify-between gap-6 border-b-2 border-ink pb-3">
      <Label className="text-ink">{slug}</Label>
      <Label>{COMPANY.name}</Label>
    </div>

    <div className="grid gap-x-8 gap-y-10 pt-10 sm:pt-14 lg:grid-cols-12">
      <div className="lg:col-span-9">
        <Display as="h1" size="lg">
          {title}
        </Display>
      </div>

      {lead ? (
        <div className="lg:col-span-6">
          <Prose>{lead}</Prose>
        </div>
      ) : null}

      {facts?.length ? (
        <div className="lg:col-span-4 lg:col-start-9">
          <FactTable rows={facts} />
        </div>
      ) : null}
    </div>
  </Container>
);

/** Every route renders inside this, so chrome cannot drift between pages. */
export const PageShell = ({
  current,
  children,
}: {
  current?: string;
  children: ReactNode;
}) => (
  <div className="relative min-h-screen bg-paper text-ink">
    <SiteNav current={current} />
    <main>{children}</main>
    <SiteFooter />
  </div>
);
