import { useState, type ReactNode } from 'react';
import {
  COMPANY,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  FOOTER_LINKS,
  INSTAGRAM_URL,
  NAV_LINKS,
} from '@/data/company';

/* Re-exported so pages can pull chrome and contact points from one import. */
export { CONTACT_EMAIL, CONTACT_MAILTO, INSTAGRAM_URL };

/** Bevel shared by every app icon — a touch of jewel without going glossy. */
export const ICON_SHADOW =
  'inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 30px rgba(0,0,0,0.5)';

export const LogoMark = ({ className = 'h-7' }: { className?: string }) => (
  <img
    src="/nocte-logo-cropped.png"
    alt="Nocte"
    className={`${className} w-auto select-none`}
    style={{ filter: 'invert(1) brightness(2) contrast(2)', mixBlendMode: 'lighten' }}
    draggable={false}
  />
);

export const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const AppleGlyph = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.05 12.54c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.71-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.87-.76-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.75 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.87.69 1.18-.02 1.93-1.08 2.65-2.14.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.3-3.5zM14.88 5.9c.6-.74 1.01-1.76.9-2.78-.87.04-1.93.58-2.56 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.58-1.21z" />
  </svg>
);

export const ArrowRight = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export type Locale = 'en' | 'de';

/** UI chrome for an app page, so a German page is German all the way through. */
export const STRINGS = {
  en: {
    apps: 'Portfolio',
    contact: 'Contact',
    getTheApp: 'Get the app',
    comingSoon: 'Coming soon',
    allApps: 'All work',
    live: 'Live',
    downloadOn: 'Download on the',
    preorderOn: 'Pre-order on the',
    preorder: 'Pre-order',
    appStore: 'App Store',
    lookInside: 'A look inside',
    screens: 'Screens',
    whatItDoes: 'What it does',
    builtAround: 'Built around one idea',
    privacy: 'Privacy',
    dataStaysYours: 'Your data stays yours.',
    builtBy: 'Built by Nocte Ventures',
    oneOfOurs: (name: string) => `${name} is one of ours.`,
    seeOurApps: 'See our work',
  },
  de: {
    apps: 'Portfolio',
    contact: 'Kontakt',
    getTheApp: 'Zur App',
    comingSoon: 'Bald verfügbar',
    allApps: 'Alle Arbeiten',
    live: 'Live',
    downloadOn: 'Jetzt laden im',
    preorderOn: 'Vorbestellen im',
    preorder: 'Vorbestellen',
    appStore: 'App Store',
    lookInside: 'Ein Blick hinein',
    screens: 'Bildschirme',
    whatItDoes: 'Was die App kann',
    builtAround: 'Ein geschlossener Kreislauf',
    privacy: 'Datenschutz',
    dataStaysYours: 'Deine Daten bleiben deine.',
    builtBy: 'Von Nocte Ventures',
    oneOfOurs: (name: string) => `${name} ist eine von uns.`,
    seeOurApps: 'Unsere Arbeiten ansehen',
  },
} as const;

/**
 * Download button. With no href (app not on sale yet) it renders a non-clickable
 * "Coming soon" pill instead of a dead link.
 */
export const AppStoreButton = ({
  href,
  size = 'lg',
  locale = 'en',
  preorder = false,
}: {
  href: string | null;
  size?: 'lg' | 'sm';
  locale?: Locale;
  /** When true and href is set, the label reads "Pre-order on the App Store". */
  preorder?: boolean;
}) => {
  const t = STRINGS[locale];
  const pad = size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm';
  const glyph = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  if (!href) {
    return (
      <span
        className={`inline-flex items-center gap-3 rounded-full border border-line-hover text-ink-muted font-medium tracking-wide ${pad}`}
      >
        <AppleGlyph className={glyph} />
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            {t.appStore}
          </span>
          <span>{t.comingSoon}</span>
        </span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 rounded-full bg-white text-black font-medium tracking-wide hover:bg-white/90 transition-all duration-300 shadow-[0_0_50px_rgba(201,212,238,0.12)] ${pad}`}
    >
      <AppleGlyph className={glyph} />
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] uppercase tracking-[0.2em] text-black/50">
          {preorder ? t.preorderOn : t.downloadOn}
        </span>
        <span>{t.appStore}</span>
      </span>
    </a>
  );
};

/**
 * ── Design system ──────────────────────────────────────────────
 * One rhythm, one card language, one type scale. Every section on
 * every page composes from these so the site reads as one thing.
 */

/** Vertical rhythm + gutters. Identical on every section. */
export const Section = ({
  id,
  className = '',
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) => (
  <section id={id} className={`relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 ${className}`}>
    <div className="max-w-5xl mx-auto">{children}</div>
  </section>
);

/** The one surface treatment. Everything boxed uses this. */
export const Card = ({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div className={`rounded-2xl border border-line bg-card transition-colors duration-500 ${className}`}>
    {children}
  </div>
);

/** Consistent eyebrow + display title pair used at the top of every section. */
export const SectionHeading = ({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) => (
  <div className="mb-14 sm:mb-16 max-w-2xl">
    <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-ink-faint mb-5">
      <span className="w-6 h-px bg-line-hover" />
      {eyebrow}
    </span>
    <h2
      className="font-display text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.1]"
      style={{ fontWeight: 420 }}
    >
      {title}
    </h2>
    {lead ? <p className="mt-5 text-ink-muted leading-relaxed max-w-[46ch]">{lead}</p> : null}
  </div>
);

/**
 * A ruled editorial row: big serif numeral, title, description. Used for the
 * Services index on the home page and the Features index on app pages.
 */
export const IndexRow = ({
  numeral,
  title,
  description,
  numeralColor,
  children,
}: {
  numeral: string;
  title: string;
  description: string;
  numeralColor?: string;
  /** Optional extras under the description, e.g. offering tags. */
  children?: ReactNode;
}) => (
  <div className="group grid grid-cols-[80px_1fr] sm:grid-cols-[96px_1fr_minmax(0,40ch)] gap-x-6 gap-y-2 items-baseline border-t border-line py-7 transition-colors duration-300 hover:border-line-hover">
    <span
      className="font-display text-[2.75rem] leading-none transition-colors duration-300"
      style={
        numeralColor
          ? { fontWeight: 340, color: numeralColor }
          : { fontWeight: 340, color: 'rgba(155,161,180,0.55)' }
      }
    >
      {numeral}
    </span>
    <h3 className="text-xl font-medium text-ink transition-transform duration-300 group-hover:translate-x-1">
      {title}
    </h3>
    <div className="col-start-2 sm:col-start-3">
      <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
      {children}
    </div>
  </div>
);

/** Small bordered label. Platform tags, offering tags, status pills. */
export const Tag = ({ children }: { children: ReactNode }) => (
  <span className="rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-ink-faint">
    {children}
  </span>
);

/** The one button. `variant` picks the weight, never a new shape. */
export const ButtonLink = ({
  href,
  children,
  variant = 'primary',
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>) => {
  const base =
    'group inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-medium tracking-wide rounded-full transition-all duration-300';
  const skin =
    variant === 'primary'
      ? 'bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(201,212,238,0.12)]'
      : 'border border-line-hover text-ink-muted hover:text-ink hover:border-moonlight/40';

  return (
    <a href={href} className={`${base} ${skin} ${className}`} {...rest}>
      {children}
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
};

/** A thin moonlit line with a warm bloom above it — the edge of night. */
export const Horizon = ({ className = '' }: { className?: string }) => (
  <div className={`pointer-events-none absolute inset-x-0 ${className}`} aria-hidden="true">
    <div
      className="absolute inset-x-0 bottom-0 h-10"
      style={{ background: 'var(--dusk)', filter: 'blur(30px)' }}
    />
    <div
      className="absolute inset-x-0 bottom-0 h-px"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(201,212,238,0.35), transparent)',
      }}
    />
  </div>
);

/**
 * The one navigation, on every page. `current` dims the link for the page you
 * are already on. `extra` is the slot app pages use for their download pill.
 */
export const SiteNav = ({ current, extra }: { current?: string; extra?: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-night/70 backdrop-blur-md border-b border-line">
      <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5">
        <a href="/" className="block" aria-label="Nocte Ventures — Home">
          <LogoMark className="h-6 sm:h-7" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = current === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`relative text-sm transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-moonlight after:shadow-[0_0_8px_rgba(201,212,238,0.35)] after:transition-all after:duration-300 hover:after:w-full ${
                  active ? 'text-ink after:w-full' : 'text-ink-muted hover:text-ink after:w-0'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          {extra}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          {extra}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="p-1.5 -mr-1.5 text-ink-muted hover:text-ink transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer: plain links, closed by navigating away. */}
      <div
        id="site-menu"
        hidden={!open}
        className="md:hidden border-t border-line bg-night/95 px-6 sm:px-10 py-3"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={current === link.href ? 'page' : undefined}
            className={`block py-3 text-sm border-b border-line last:border-0 ${
              current === link.href ? 'text-ink' : 'text-ink-muted'
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

/** The eyebrow + H1 + lead that opens every page other than the home page. */
export const PageHeader = ({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}) => (
  <section className="relative pt-36 sm:pt-44 pb-4 px-6 sm:px-10 lg:px-16">
    <Horizon className="top-0 h-full" />
    <div className="relative max-w-5xl mx-auto">
      <span className="text-[11px] uppercase tracking-[0.3em] text-ink-faint block mb-5">
        {eyebrow}
      </span>
      <h1
        className="font-display text-[clamp(2.5rem,6vw,4.5rem)] tracking-tight leading-[1.05]"
        style={{ fontWeight: 380 }}
      >
        {title}
      </h1>
      {lead ? (
        <div className="mt-6 text-ink-muted leading-relaxed max-w-[52ch] space-y-4">{lead}</div>
      ) : null}
    </div>
  </section>
);

export const SiteFooter = () => (
  <footer className="relative border-t border-line py-14 px-6 sm:px-10 lg:px-16">
    <div className="max-w-5xl mx-auto flex flex-col gap-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
        <a href="/" className="flex items-center" aria-label="Nocte Ventures — Home">
          <LogoMark className="h-5" />
        </a>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-ink-muted hover:text-ink transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nocte Ventures on Instagram"
          className="text-ink-muted hover:text-ink transition-colors duration-200"
        >
          <InstagramIcon className="w-5 h-5" />
        </a>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-line pt-8">
        <span className="text-xs text-ink-faint">{COMPANY.registration}</span>
        <span className="text-xs text-ink-faint">
          &copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
        </span>
      </div>
    </div>
  </footer>
);

/**
 * Page wrapper: night background, film grain, nav, footer. Every route renders
 * inside one of these so chrome can never drift between pages.
 */
export const PageShell = ({
  current,
  navExtra,
  children,
}: {
  current?: string;
  navExtra?: ReactNode;
  children: ReactNode;
}) => (
  <div className="relative min-h-screen bg-night text-ink overflow-x-hidden">
    <div className="noise-overlay" aria-hidden="true" />
    <SiteNav current={current} extra={navExtra} />
    <main>{children}</main>
    <SiteFooter />
  </div>
);
