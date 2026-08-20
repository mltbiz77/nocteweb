/**
 * ── Company facts, contact points, and site-wide navigation ──────────────
 *
 * Everything here is content, not markup. Change a link label, an email, or
 * the legal entity once and every page follows. Nothing in `components/`
 * should hard-code any of it.
 */

export const SITE_URL = 'https://www.nocteventures.com';

export const COMPANY = {
  name: 'Nocte Ventures',
  legalName: 'Nocte Ventures Ltd',
  /** Sits under the H1 on the home page and in the meta description. */
  subline: 'A company that builds, owns, and advises digital businesses.',
  /** Kept as a motif, never as the primary explanation of what we do. */
  tagline: 'Digital Craftsmanship After Dark.',
  /**
   * The statutory trading disclosure, and the only place incorporation
   * details appear on the site — once, in the footer.
   *
   * UK law (the Company, LLP and Business (Names and Trading Disclosures)
   * Regulations 2015) requires a company's website to state its registered
   * name, its registered number, its place of registration **and its
   * registered office address**. The address is still missing here; add it
   * to this string once it is confirmed.
   */
  legalLine: 'Nocte Ventures Ltd · Registered in England & Wales, No. 16579177',
} as const;

export const CONTACT_EMAIL = 'hello@nocteventures.com';
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
export const INSTAGRAM_URL = 'https://www.instagram.com/nocteventures/';

/**
 * Optional "book a call" link shown on the contact page. Drop a Cal.com or
 * Calendly URL in here and the button appears; leave it null and it doesn't.
 */
export const BOOKING_URL: string | null = null;

export type NavLink = { label: string; href: string };

/** The primary navigation, in order, on every page. */
export const NAV_LINKS: NavLink[] = [
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Advisory', href: '/advisory/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
];
