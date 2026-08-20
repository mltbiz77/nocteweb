import { useEffect, useRef, useState, type ReactNode } from 'react';
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

export type Tone = 'paper' | 'night';

/* ────────────────────────────────────────────────────────────────
   Layout
   ──────────────────────────────────────────────────────────────── */

export const Container = ({
  id,
  className = '',
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) => (
  <div
    id={id}
    className={`mx-auto w-full max-w-[1340px] scroll-mt-24 px-6 sm:px-10 lg:px-14 ${className}`}
  >
    {children}
  </div>
);

/**
 * Fades content up as it enters view. Short and small on purpose — enough to
 * feel alive, not enough to feel like a template. Skipped entirely when the
 * visitor asks for reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  /** Milliseconds. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const still =
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.02 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Type
   ──────────────────────────────────────────────────────────────── */

/** Small monospace label. Eyebrows, table headers, field labels. */
export const Label = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span className={`font-sans text-[10.5px] font-medium uppercase tracking-label ${className}`}>{children}</span>
);

/** The one heading scale. `size` picks the scale, not the tag. */
export const Display = ({
  as: Tag = 'h2',
  size = 'md',
  weight = 500,
  className = '',
  style,
  children,
}: {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  size?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm';
  weight?: 500 | 600;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) => {
  const scale = {
    xxl: 'text-[clamp(2.9rem,7.4vw,6.5rem)] leading-[1.02] tracking-[-0.018em]',
    xl: 'text-[clamp(2.3rem,5vw,4.1rem)] leading-[1.06] tracking-[-0.015em]',
    lg: 'text-[clamp(1.95rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.012em]',
    md: 'text-[clamp(1.5rem,2.3vw,2.05rem)] leading-[1.18] tracking-[-0.01em]',
    sm: 'text-[clamp(1.3rem,1.7vw,1.5rem)] leading-[1.25] tracking-[-0.005em]',
  }[size];

  return (
    <Tag
      className={`font-display [text-wrap:balance] ${scale} ${className}`}
      style={{ fontWeight: weight, ...style }}
    >
      {children}
    </Tag>
  );
};

/** Body prose. The serif is what keeps long copy readable and warm. */
export const Prose = ({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={`font-sans text-[1.0rem] leading-[1.65] text-ink-muted [&_p+p]:mt-5 ${className}`}
  >
    {children}
  </div>
);

/** A section's opening: eyebrow, heading, optional lead and right-side link. */
export const SectionHead = ({
  eyebrow,
  title,
  lead,
  aside,
  tone = 'paper',
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  tone?: Tone;
}) => (
  <div className={`border-t pt-5 ${tone === 'night' ? 'border-night-rule' : 'border-rule'}`}>
    <div className="flex items-baseline justify-between gap-6">
      <Label className={tone === 'night' ? 'text-night-muted' : 'text-ink-faint'}>{eyebrow}</Label>
      {aside}
    </div>
    <div className="mt-7 grid gap-x-10 gap-y-6 lg:grid-cols-12">
      <Display
        as="h2"
        size="xl"
        className={`lg:col-span-7 ${tone === 'night' ? 'text-night-ink' : 'text-ink'}`}
      >
        {title}
      </Display>
      {lead ? (
        <div className="lg:col-span-4 lg:col-start-9 lg:pt-2">
          <Prose className={tone === 'night' ? 'text-night-muted' : ''}>{lead}</Prose>
        </div>
      ) : null}
    </div>
  </div>
);

/**
 * A numbered ruled entry. Advisory offerings, principles, product features
 * and legal clauses are all the same object: an index, a title, a body.
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

export const Tag = ({ children, tone = 'paper' }: { children: ReactNode; tone?: Tone }) => (
  <span
    className={`rounded-full border px-3 py-1 font-sans text-[10.5px] font-medium uppercase tracking-label ${
      tone === 'night' ? 'border-night-rule text-night-muted' : 'border-rule text-ink-faint'
    }`}
  >
    {children}
  </span>
);

/** The one button. `variant` picks the weight, never a new shape. */
export const Button = ({
  href,
  children,
  variant = 'solid',
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'night-solid' | 'night-outline';
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>) => {
  const skin = {
    solid: 'bg-ink text-paper hover:bg-accent',
    outline: 'border border-rule text-ink hover:border-ink',
    'night-solid': 'bg-night-ink text-night hover:bg-night-accent hover:text-night',
    'night-outline': 'border border-night-rule text-night-ink hover:border-night-ink',
  }[variant];

  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-label transition-colors ${skin} ${className}`}
      {...rest}
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
        &rarr;
      </span>
    </a>
  );
};

/** A quiet standing link whose rule draws in on hover. */
export const ArrowLink = ({
  href,
  children,
  tone = 'paper',
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>) => (
  <a
    href={href}
    className={`link-quiet inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-label transition-colors ${
      tone === 'night' ? 'text-night-accent hover:text-night-ink' : 'text-accent hover:text-accent-deep'
    } ${className}`}
    {...rest}
  >
    {children}
    <span aria-hidden="true">&rarr;</span>
  </a>
);

/** Live / in-build marker. Colour only appears once something is shipping. */
export const StatusMark = ({
  status,
  accent,
  tone = 'paper',
}: {
  status: 'live' | 'soon';
  accent: string;
  tone?: Tone;
}) => (
  <span
    className={`inline-flex items-center gap-2 whitespace-nowrap font-sans text-[10.5px] font-medium uppercase tracking-label ${
      tone === 'night' ? 'text-night-muted' : 'text-ink-muted'
    }`}
  >
    <span
      className="h-[7px] w-[7px] shrink-0 rounded-full"
      style={
        status === 'live'
          ? { background: accent }
          : {
              border: `1px solid ${tone === 'night' ? 'var(--night-muted)' : 'var(--ink-faint)'}`,
            }
      }
      aria-hidden="true"
    />
    {status === 'live' ? 'Live on the App Store' : 'In build'}
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
 * means one asset renders in ink on paper and near-white on the blue without
 * a second file, an invert filter, or a blend mode.
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
    screens: 'A look inside',
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
    screens: 'Ein Blick hinein',
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
  tone?: Tone;
}) => {
  const t = STRINGS[locale];

  if (!href) {
    return (
      <span
        className={`inline-flex items-center gap-2.5 border px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-label ${
          tone === 'night' ? 'border-night-rule text-night-muted' : 'border-rule text-ink-faint'
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
      className={`inline-flex items-center gap-2.5 px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-label transition-colors ${
        tone === 'night'
          ? 'bg-night-ink text-night hover:bg-night-accent'
          : 'bg-ink text-paper hover:bg-accent'
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

/**
 * The navigation takes the tone of the section it sits on, so the home page
 * reads as one continuous blue field from the top of the window down. No
 * scroll listener is involved — the page just says which tone it opens with.
 */
export const SiteNav = ({ current, tone = 'paper' }: { current?: string; tone?: Tone }) => {
  const [open, setOpen] = useState(false);
  const night = tone === 'night';

  return (
    <header
      className={`relative z-50 border-b ${
        night ? 'border-night-rule/60 bg-night text-night-ink' : 'border-rule bg-paper text-ink'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-5">
          <a href="/" aria-label="Nocte Ventures — Home" className="flex items-center">
            <LogoMark className="h-[18px] sm:h-[21px]" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => {
              const active = current === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`font-sans text-[11px] font-medium uppercase tracking-label transition-colors ${
                    night
                      ? active
                        ? 'text-night-ink'
                        : 'text-night-muted hover:text-night-ink'
                      : active
                        ? 'text-ink'
                        : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <span className={active ? 'link' : 'link-quiet'}>{link.label}</span>
                </a>
              );
            })}
            <Button href="/contact/" variant={night ? 'night-solid' : 'solid'} className="!py-2.5">
              Get in touch
            </Button>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="-mr-1 p-1 font-sans text-[11px] font-medium uppercase tracking-label md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </Container>

      <div
        id="site-menu"
        hidden={!open}
        className={`border-t md:hidden ${
          night ? 'border-night-rule/60 bg-night' : 'border-rule bg-paper'
        }`}
      >
        <Container>
          {[...NAV_LINKS, { label: 'Contact', href: '/contact/' }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={current === link.href ? 'page' : undefined}
              className={`block border-b py-3.5 font-sans text-[11px] font-medium uppercase tracking-label last:border-0 ${
                night ? 'border-night-rule/50' : 'border-rule-soft'
              } ${
                current === link.href
                  ? night
                    ? 'text-night-ink'
                    : 'text-ink'
                  : night
                    ? 'text-night-muted'
                    : 'text-ink-muted'
              }`}
            >
              {link.label}
            </a>
          ))}
        </Container>
      </div>
    </header>
  );
};

/** The blue field that closes every page. */
export const NightBand = ({
  heading,
  children,
  aside,
}: {
  heading: string;
  children?: ReactNode;
  aside?: ReactNode;
}) => (
  <section className="bg-night text-night-ink">
    <Container className="py-20 sm:py-28">
      <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Label className="text-night-muted">{COMPANY.tagline.replace(/\.$/, '')}</Label>
          <Display as="h2" size="xl" weight={600} className="mt-6 text-night-ink">
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
                className="link mt-4 block break-words font-sans text-[clamp(1.1rem,1.9vw,1.4rem)] tracking-[-0.02em] text-night-ink"
              >
                {CONTACT_EMAIL}
              </a>
              <Label className="mt-5 block text-night-muted">
                We reply within two working days
              </Label>
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
          <LogoMark className="h-[17px]" />
          <p className="mt-4 max-w-[30ch] font-sans text-[0.95rem] leading-[1.6] text-ink-muted">
            {COMPANY.subline}
          </p>
        </div>

        <nav aria-label="Company" className="lg:col-span-2 lg:col-start-6">
          <Label className="text-ink-faint">Company</Label>
          <ul className="mt-4 space-y-2.5">
            {[...NAV_LINKS, { label: 'Contact', href: '/contact/' }].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-quiet text-sm text-ink-muted hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Products" className="lg:col-span-2">
          <Label className="text-ink-faint">Products</Label>
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
          <Label className="text-ink-faint">Legal</Label>
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
        <Label className="text-ink-faint">{COMPANY.legalLine}</Label>
        <Label className="text-ink-faint">&copy; {new Date().getFullYear()}</Label>
      </div>
    </Container>
  </footer>
);

/** The opening block of every page other than the home page. */
export const PageMasthead = ({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) => (
  <section className="bg-night text-night-ink">
    <Container className="pt-16 pb-20 sm:pt-24 sm:pb-28">
      <Label className="rise text-night-muted">{eyebrow}</Label>
      <Display
        as="h1"
        size="xl"
        weight={600}
        className="rise mt-7 max-w-[22ch] text-night-ink"
        style={{ animationDelay: '60ms' }}
      >
        {title}
      </Display>
      {lead ? (
        <div className="rise mt-10 max-w-[52ch]" style={{ animationDelay: '130ms' }}>
          <Prose className="text-night-muted">{lead}</Prose>
          {children ? <div className="mt-9">{children}</div> : null}
        </div>
      ) : null}
    </Container>
  </section>
);

/** Every route renders inside this, so chrome cannot drift between pages. */
export const PageShell = ({
  current,
  navTone = 'night',
  children,
}: {
  current?: string;
  /** The tone of whatever sits directly under the nav. */
  navTone?: Tone;
  children: ReactNode;
}) => (
  <div className="min-h-screen bg-paper text-ink">
    <SiteNav current={current} tone={navTone} />
    <main>{children}</main>
    <SiteFooter />
  </div>
);
