/**
 * ── The people ───────────────────────────────────────────────────────────
 *
 * /about/ renders the team section only when this array has entries, so the
 * page reads cleanly while it is empty. Add a person, drop a square photo in
 * `public/team/`, and the grid picks it up.
 */

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** e.g. '/team/name.jpg'. Omitted → initials in a bordered tile. */
  photo?: string;
  links?: { label: string; href: string }[];
};

export const TEAM: TeamMember[] = [];

/** Principles shown on /about/ as a short ruled list. */
export const PRINCIPLES: { title: string; description: string }[] = [
  {
    title: 'Quality over quantity',
    description:
      'A small number of products, each one finished. We would rather run four things properly than twelve badly.',
  },
  {
    title: 'Operator-led, not advisory-led',
    description:
      'We ship our own products. The advice we sell is the same set of decisions we make with our own money on the line.',
  },
  {
    title: 'A long-term ownership mindset',
    description:
      'We build to hold. A sale happens when it is the right outcome for the business, not because it was the plan from day one.',
  },
];
