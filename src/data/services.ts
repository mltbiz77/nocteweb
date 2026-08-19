/**
 * ── What we sell ─────────────────────────────────────────────────────────
 *
 * The advisory side of the business, as data. `OFFERINGS` drives the ruled
 * index on /advisory/; `HOW_WE_WORK` drives the short list under it. To add
 * an offering, append an object and renumber — no component touches needed.
 */

export type Offering = {
  numeral: string;
  title: string;
  description: string;
  /** Shown as small tags under the description on /advisory/. */
  tags?: string[];
};

export const OFFERINGS: Offering[] = [
  {
    numeral: '01',
    title: 'Product & Growth Strategy',
    description:
      'Product strategy, roadmap, positioning, and go-to-market for digital products. We look hard at pricing and retention before anyone suggests spending more on acquisition.',
    tags: ['Positioning', 'Roadmap', 'Pricing', 'Go-to-market'],
  },
  {
    numeral: '02',
    title: 'Technical Architecture & AI Solutions',
    description:
      'System design, AI integration, and automation built for a business rather than a demo. We scope it to what you can actually run once we leave.',
    tags: ['Architecture', 'AI integration', 'Automation', 'Data'],
  },
  {
    numeral: '03',
    title: 'Build & Co-Build Engagements',
    description:
      'End-to-end product development, or a build alongside your own team. Design and engineering in one place, shipping on a schedule you can hold us to.',
    tags: ['Design', 'Engineering', 'Launch', 'Embedded team'],
  },
  {
    numeral: '04',
    title: 'Investment & Acquisition',
    description:
      'We buy, sell, and invest in digital products. Capital plus the operating work that follows it, and a path to a sale when the timing is right.',
    tags: ['Acquisition', 'Capital', 'Exit'],
  },
];

/** Kept deliberately short — five would already be too many. */
export const HOW_WE_WORK: { title: string; description: string }[] = [
  {
    title: 'A small, senior team',
    description:
      'The people who set the direction are the ones who ship it. No hand-offs, no translation layer, no one waiting on a brief.',
  },
  {
    title: 'An operator’s mindset',
    description:
      'We run our own products on the App Store. Positions on pricing, retention, and launch timing are tested under our own name first.',
  },
  {
    title: 'Focused engagements',
    description:
      'A defined outcome and a date, not an open-ended retainer. Scope is the first thing we cut and the last thing we grow.',
  },
  {
    title: 'Evidence over opinion',
    description:
      'Roadmap and messaging follow what usage and revenue actually show. We change our minds when the numbers say to.',
  },
];

/**
 * The two pillars of the business, used for the cards on the home page.
 * Keep this at two — the whole point is that a visitor picks one.
 */
export const PILLARS: {
  eyebrow: string;
  title: string;
  line: string;
  body: string;
  cta: { label: string; href: string };
}[] = [
  {
    eyebrow: 'Pillar 01',
    title: 'Our Products',
    line: 'We build and operate our own SaaS and digital products.',
    body: 'Apps we create, grow, and sometimes sell or spin out. Everything we recommend to a client has been run on our own P&L first.',
    cta: { label: 'View portfolio', href: '/portfolio/' },
  },
  {
    eyebrow: 'Pillar 02',
    title: 'Advisory & Solutions',
    line: 'We advise companies and build custom AI and digital solutions.',
    body: 'Strategy, product, and technical execution for founders and companies — from a positioning problem to a system that has to go live.',
    cta: { label: 'See how we can help', href: '/advisory/' },
  },
];

/**
 * Case studies. Empty by design: /advisory/ renders the section only when
 * this array has entries, so adding the first one is a data change alone.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  /** Use "Confidential" (or similar) when the client can't be named. */
  sector: string;
  challenge: string;
  work: string;
  outcome: string;
  url?: string;
};

export const CASE_STUDIES: CaseStudy[] = [];
