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
};

export const OFFERINGS: Offering[] = [
  {
    numeral: '01',
    title: 'product & growth strategy',
    description:
      'Positioning, roadmap, pricing, and go-to-market. We look hard at retention before anyone suggests spending more on acquisition.',
  },
  {
    numeral: '02',
    title: 'architecture & AI',
    description:
      'System design, AI integration, and automation built for a business rather than a demo — scoped to what you can run once we leave.',
  },
  {
    numeral: '03',
    title: 'build & co-build',
    description:
      'End-to-end product development, or a build alongside your own team, shipping on a schedule you can hold us to.',
  },
  {
    numeral: '04',
    title: 'investment & acquisition',
    description:
      'Capital plus the operating work that follows it, and a path to a sale when the timing is right.',
  },
];

/** Kept deliberately short — five would already be too many. */
export const HOW_WE_WORK: { title: string; description: string }[] = [
  {
    title: 'a small, senior team',
    description:
      'The people who set the direction are the ones who ship it. No hand-offs and no translation layer.',
  },
  {
    title: 'an operator’s mindset',
    description:
      'We run our own products, so the positions we take have been tested under our own name first.',
  },
  {
    title: 'focused engagements',
    description: 'A defined outcome and a date, not an open-ended retainer.',
  },
  {
    title: 'evidence over opinion',
    description: 'Roadmap and messaging follow what usage and revenue show. We change our minds when the numbers say to.',
  },
];

/**
 * The three ways the company makes money. This is the spine of the home
 * page — a visitor should be able to place themselves in one of them.
 */
export const MODES: {
  index: string;
  title: string;
  body: string;
  link: { label: string; href: string };
}[] = [
  {
    index: '01',
    title: 'build',
    body: 'We start and run our own products, and keep them. Everything we recommend to a client has been tested on our own P&L first.',
    link: { label: 'Our work', href: '/portfolio/' },
  },
  {
    index: '02',
    title: 'acquire',
    body: 'We buy digital products worth owning and back a small number of ventures with capital and hands-on work.',
    link: { label: 'Talk to us', href: '/contact/' },
  },
  {
    index: '03',
    title: 'advise',
    body: 'We work with a small number of companies on strategy, product, and technical execution.',
    link: { label: 'Advisory', href: '/advisory/' },
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
