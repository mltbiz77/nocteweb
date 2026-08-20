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
    className={`mx-auto w-full max-w-[1400px] scroll-mt-24 px-6 sm:px-10 lg:px-16 ${className}`}
  >
    {children}
  </div>
);

/* ────────────────────────────────────────────────────────────────
   Motion
   ──────────────────────────────────────────────────────────────── */

const prefersStill = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Fades a block up as it enters view. Short, and skipped for reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined' || prefersStill()) {
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
      { rootMargin: '0px 0px -8% 0px', threshold: 0.02 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Pulls an element gently toward the cursor while it is over it.
 *
 * Only on devices that actually hover — a magnetic offset on a touch screen
 * is just a jump. Written with direct style writes rather than React state
 * so it never re-renders on mousemove.
 */
function useMagnet<T extends HTMLElement>(strength = 0.22) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersStill() || !window.matchMedia('(hover: hover)').matches) return;

    const onMove = (event: MouseEvent) => {
      const box = el.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };
    const reset = () => {
      el.style.transform = '';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', reset);
    };
  }, [strength]);

  return ref;
}

/* ────────────────────────────────────────────────────────────────
   Type
   ──────────────────────────────────────────────────────────────── */

export const Label = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span className={`font-sans text-[10.5px] font-medium uppercase tracking-label ${className}`}>
    {children}
  </span>
);

const SCALE = {
  xxl: 'text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-[-0.04em]',
  xl: 'text-[clamp(2.2rem,5.4vw,4.4rem)] leading-[0.95] tracking-[-0.035em]',
  lg: 'text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.02] tracking-[-0.03em]',
  md: 'text-[clamp(1.4rem,2.1vw,1.75rem)] leading-[1.12] tracking-[-0.022em]',
  sm: 'text-[clamp(1.1rem,1.5vw,1.25rem)] leading-[1.22] tracking-[-0.015em]',
} as const;

/** The one heading scale. Lowercase copy, set tight. */
export const Display = ({
  as: Tag = 'h2',
  size = 'md',
  weight = 500,
  className = '',
  style,
  children,
}: {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  size?: keyof typeof SCALE;
  weight?: 500 | 800;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) => (
  <Tag
    className={`font-display [text-wrap:balance] ${SCALE[size]} ${className}`}
    style={{ fontWeight: weight, ...style }}
  >
    {children}
  </Tag>
);

/**
 * A headline whose lines wipe up from behind their own edge.
 *
 * Pass the lines explicitly — the clip has to be per line, so the component
 * cannot guess where the text breaks. Pure CSS with a staggered delay, so it
 * plays on first paint without waiting for JavaScript.
 */
export const MaskHeading = ({
  lines,
  as: Tag = 'h2',
  size = 'xl',
  weight = 800,
  delay = 0,
  className = '',
}: {
  lines: string[];
  as?: 'h1' | 'h2' | 'p';
  size?: keyof typeof SCALE;
  weight?: 500 | 800;
  /** Milliseconds before the first line moves. */
  delay?: number;
  className?: string;
}) => (
  <Tag className={`font-display ${SCALE[size]} ${className}`} style={{ fontWeight: weight }}>
    {lines.map((line, i) => (
      <span key={i} className="mask-line">
        <span className="mask-rise" style={{ animationDelay: `${delay + i * 90}ms` }}>
          {line}
        </span>
      </span>
    ))}
  </Tag>
);

export const Prose = ({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div className={`font-sans text-[1rem] leading-[1.68] text-ink-dim [&_p+p]:mt-5 ${className}`}>
    {children}
  </div>
);

/** A section's opening. No index numerals — those belong to a sibling site. */
export const SectionHead = ({
  eyebrow,
  title,
  lead,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
}) => (
  <div className="border-t border-rule pt-6">
    <div className="flex items-baseline justify-between gap-6">
      <Label className="text-accent-hi">{eyebrow}</Label>
      {aside}
    </div>
    <div className="mt-8 grid gap-x-12 gap-y-6 lg:grid-cols-12">
      <Display as="h2" size="xl" weight={800} className="lg:col-span-7">
        {title}
      </Display>
      {lead ? (
        <div className="lg:col-span-4 lg:col-start-9 lg:pt-2">
          <Prose>{lead}</Prose>
        </div>
      ) : null}
    </div>
  </div>
);

/**
 * A ruled row: title on the left, body on the right. Offerings, principles,
 * product features and legal clauses are all this shape.
 *
 * Deliberately unnumbered — index numerals down the side are the 4 More
 * Capital site's device, and this site should not borrow it.
 */
export const Entry = ({
  title,
  children,
  aside,
}: {
  title: string;
  children?: ReactNode;
  aside?: ReactNode;
}) => (
  <div className="group grid grid-cols-1 gap-x-12 gap-y-3 border-b border-rule py-8 transition-colors sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] hover:border-rule-soft">
    <Display as="h3" size="md" weight={800} className="text-ink">
      {title}
    </Display>
    <div>
      {children ? <Prose className="text-[0.98rem]">{children}</Prose> : null}
      {aside ? <div className="mt-5">{aside}</div> : null}
    </div>
  </div>
);

/** The closing call to action at the foot of every page. */
export const ClosingBand = ({
  heading,
  children,
  aside,
}: {
  /** Lines are clipped individually. */
  heading: string[];
  children?: ReactNode;
  aside?: ReactNode;
}) => (
  <section className="border-t border-rule">
    <Container className="py-20 sm:py-28">
      <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Label className="text-accent-hi">{COMPANY.tagline.replace(/\.$/, '')}</Label>
            <Display as="h2" size="xl" weight={800} className="mt-6 max-w-[20ch]">
              {heading.join(' ')}
            </Display>
            {children ? <div className="mt-8">{children}</div> : null}
          </Reveal>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={90}>
            {aside ?? (
              <>
                <Label className="text-ink-faint">Write to us</Label>
                <a
                  href={CONTACT_MAILTO}
                  className="link mt-4 block break-words font-sans text-[clamp(1.05rem,1.8vw,1.3rem)] text-ink"
                >
                  {CONTACT_EMAIL}
                </a>
                <Label className="mt-5 block text-ink-faint">
                  We reply within two working days
                </Label>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </Container>
  </section>
);

/* ────────────────────────────────────────────────────────────────
   Controls
   ──────────────────────────────────────────────────────────────── */

/** The one button. Magnetic on hover. */
export const Button = ({
  href,
  children,
  variant = 'solid',
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline';
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>) => {
  const ref = useMagnet<HTMLAnchorElement>(0.18);
  const skin =
    variant === 'solid'
      ? 'bg-ink text-bg hover:bg-accent hover:text-white'
      : 'border border-rule text-ink hover:border-accent-hi hover:text-accent-hi';

  return (
    <a
      ref={ref}
      href={href}
      className={`group inline-flex items-center gap-3 px-8 py-4 font-sans text-[11px] font-medium uppercase tracking-label transition-[background-color,color,border-color,transform] duration-300 ease-out ${skin} ${className}`}
      {...rest}
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        &rarr;
      </span>
    </a>
  );
};

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
    className={`link-quiet group inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-label text-accent-hi transition-colors hover:text-ink ${className}`}
    {...rest}
  >
    {children}
    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
      &rarr;
    </span>
  </a>
);

export const StatusMark = ({ status, accent }: { status: 'live' | 'soon'; accent: string }) => (
  <span className="inline-flex items-center gap-2 whitespace-nowrap font-sans text-[10.5px] font-medium uppercase tracking-label text-ink-faint">
    <span
      className="h-[6px] w-[6px] shrink-0 rounded-full"
      style={status === 'live' ? { background: accent } : { border: '1px solid var(--ink-faint)' }}
      aria-hidden="true"
    />
    {status === 'live' ? 'Live' : 'In build'}
  </span>
);

/* ────────────────────────────────────────────────────────────────
   Brand
   ──────────────────────────────────────────────────────────────── */

/**
 * The wordmark as a CSS mask over `currentColor`, so one black-artwork asset
 * renders in any ink without a second file or a filter.
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

export const STRINGS = {
  en: {
    portfolio: 'Portfolio',
    contact: 'Contact',
    comingSoon: 'Not yet released',
    allProducts: 'All products',
    downloadOn: 'Download on the App Store',
    preorderOn: 'Pre-order on the App Store',
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
    comingSoon: 'Noch nicht erschienen',
    allProducts: 'Alle Produkte',
    downloadOn: 'Laden im App Store',
    preorderOn: 'Vorbestellen im App Store',
    whatItDoes: 'Was die App kann',
    builtAround: 'Ein geschlossener Kreislauf',
    screens: 'Ein Blick hinein',
    privacy: 'Datenschutz',
    builtBy: 'Gebaut und betrieben von Nocte Ventures',
    oneOfOurs: (name: string) => `${name} ist eine von uns.`,
  },
} as const;

export const AppStoreButton = ({
  href,
  locale = 'en',
  preorder = false,
}: {
  href: string | null;
  locale?: Locale;
  preorder?: boolean;
}) => {
  const t = STRINGS[locale];

  if (!href) {
    return (
      <span className="inline-flex items-center gap-2.5 border border-rule px-8 py-4 font-sans text-[11px] font-medium uppercase tracking-label text-ink-faint">
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
      className="inline-flex items-center gap-2.5 bg-ink px-8 py-4 font-sans text-[11px] font-medium uppercase tracking-label text-bg transition-colors hover:bg-accent hover:text-white"
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
    <header className="sticky top-0 z-50 border-b border-rule bg-bg/85 backdrop-blur-md">
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
                    active ? 'text-ink' : 'text-ink-dim hover:text-ink'
                  }`}
                >
                  <span className={active ? 'link' : 'link-quiet'}>{link.label}</span>
                </a>
              );
            })}
            <Button href="/contact/" className="!px-6 !py-3">
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

      <div id="site-menu" hidden={!open} className="border-t border-rule bg-bg md:hidden">
        <Container>
          {[...NAV_LINKS, { label: 'Contact', href: '/contact/' }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={current === link.href ? 'page' : undefined}
              className={`block border-b border-rule-soft py-4 font-sans text-[11px] font-medium uppercase tracking-label last:border-0 ${
                current === link.href ? 'text-ink' : 'text-ink-dim'
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

export const SiteFooter = () => (
  <footer className="border-t border-rule">
    <Container className="py-16">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <LogoMark className="h-[18px]" />
          <p className="mt-5 max-w-[28ch] font-sans text-[0.95rem] leading-[1.6] text-ink-dim">
            {COMPANY.subline}
          </p>
          <a
            href={CONTACT_MAILTO}
            className="link mt-6 inline-block font-sans text-[1rem] text-ink"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <nav aria-label="Company" className="lg:col-span-2 lg:col-start-7">
          <Label className="text-ink-faint">Company</Label>
          <ul className="mt-5 space-y-3">
            {[...NAV_LINKS, { label: 'Contact', href: '/contact/' }].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-quiet text-sm text-ink-dim hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Products" className="lg:col-span-2">
          <Label className="text-ink-faint">Products</Label>
          <ul className="mt-5 space-y-3">
            {APPS.map((app) => (
              <li key={app.slug}>
                <a
                  href={productPath(app)}
                  className="link-quiet text-sm text-ink-dim hover:text-ink"
                >
                  {app.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal" className="lg:col-span-2">
          <Label className="text-ink-faint">Legal</Label>
          <ul className="mt-5 space-y-3">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-quiet text-sm text-ink-dim hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet inline-flex items-center gap-2 text-sm text-ink-dim hover:text-ink"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* The statutory trading disclosure — the only place incorporation
          details appear on the site. */}
      <div className="mt-16 border-t border-rule pt-7">
        <Label className="text-ink-faint">{COMPANY.legalLine}</Label>
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
  /** Lines are clipped individually, so pass them explicitly. */
  title: string[];
  lead?: ReactNode;
  children?: ReactNode;
}) => (
  <section className="border-b border-rule">
    <Container className="pt-20 pb-20 sm:pt-28 sm:pb-28">
      <div className="fade-rise">
        <Label className="text-accent-hi">{eyebrow}</Label>
      </div>
      <MaskHeading as="h1" lines={title} size="xl" className="mt-7" delay={120} />
      {lead ? (
        <div className="fade-rise mt-10 max-w-[54ch]" style={{ animationDelay: '340ms' }}>
          <Prose>{lead}</Prose>
          {children ? <div className="mt-9">{children}</div> : null}
        </div>
      ) : null}
    </Container>
  </section>
);

export const PageShell = ({
  current,
  children,
}: {
  current?: string;
  children: ReactNode;
}) => (
  <div className="min-h-screen bg-bg text-ink">
    <SiteNav current={current} />
    <main>{children}</main>
    <SiteFooter />
  </div>
);
