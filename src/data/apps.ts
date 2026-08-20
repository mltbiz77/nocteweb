export type AppFeature = {
  number: string;
  title: string;
  description: string;
};

export type AppData = {
  slug: string;
  name: string;
  /** Language of the app page itself. The home page is always English. */
  locale: 'en' | 'de';
  tagline: string;
  /** Home-page card tagline. Defaults to `tagline`; set it when the app page
   *  is not in English so the English home page stays consistent. */
  cardTagline?: string;
  /** One line, used on the home page card. Always English. */
  short: string;
  /**
   * Platform tags rendered on the portfolio card, e.g. ['iOS', 'iPadOS'].
   * Kept separate from `meta` so a card and an app page can say it
   * differently without one of them going stale.
   */
  platforms: string[];
  /** One short paragraph on the app page. Kept deliberately tight. */
  brief: string;
  /** 'live' = on sale now. 'soon' = pre-order / not yet released. */
  status: 'live' | 'soon';
  /**
   * App Store link. Null until Apple issues the ID — the UI falls back to a
   * "Coming soon" state, so dropping the real URL in here is the only change
   * needed to make every download button on the site go live.
   */
  appStoreUrl: string | null;
  icon: string;
  accent: string;
  glow: string;
  meta: { label: string; value: string }[];
  /** Overrides the default "Built around one idea" features heading. */
  featuresTitle?: string;
  /**
   * Two or three short, checkable proof points shown on the showcase band.
   * Facts only — no download or revenue claims we cannot stand behind.
   */
  highlights: string[];
  /** Omitted for unreleased apps: the page hides its "Screens" section. */
  screenshots?: { src: string; alt: string }[];
  features: AppFeature[];
  privacy: string;
};

export const JOTT: AppData = {
  slug: 'jott',
  name: 'Jott',
  locale: 'en',
  tagline: 'A to-do list that does one thing well.',
  short: 'A minimalist to-do list for iPhone and iPad.',
  platforms: ['iOS', 'iPadOS'],
  status: 'live',
  brief:
    'No projects. No tags. No reminders. Just your tasks and a checkbox — open it, type, tap the circle when it is done.',
  appStoreUrl: 'https://apps.apple.com/app/id6748267916',
  icon: '/apps/jott/icon.png',
  accent: '#e8b64c',
  glow: 'rgba(232,182,76,0.16)',
  meta: [
    { label: 'Platform', value: 'iPhone · iPad' },
    { label: 'Category', value: 'Productivity' },
    { label: 'Requires', value: 'iOS 17+' },
  ],
  screenshots: [
    { src: '/apps/jott/shot-2.jpg', alt: 'Jott’s six themes' },
    { src: '/apps/jott/shot-3.jpg', alt: 'Tracking a completion streak in Jott' },
    { src: '/apps/jott/shot-4.jpg', alt: 'Jott’s completion history' },
    { src: '/apps/jott/shot-5.jpg', alt: 'A shareable Jott stats card' },
    { src: '/apps/jott/shot-1.jpg', alt: 'Jott’s task list on iPhone' },
  ],
  features: [
    {
      number: '01',
      title: 'One list, nothing else',
      description: 'Unlimited to-dos. Swipe to delete, drag to reorder.',
    },
    {
      number: '02',
      title: 'Six handcrafted themes',
      description: 'Each with its own palette and custom typography.',
    },
    {
      number: '03',
      title: 'Designed to feel good',
      description: 'Considered animation and haptics on every check.',
    },
    {
      number: '04',
      title: 'Streaks and history',
      description: 'A full record of everything you have finished.',
    },
  ],
  highlights: ['Free, no subscription', 'Six handcrafted themes', 'Nothing leaves the device'],
  privacy: 'No account, no ads, no tracking. Your list stays on your device.',
};

export const TRACK_MY_SUBS: AppData = {
  slug: 'track-my-subs',
  name: 'Track My Subs',
  locale: 'en',
  tagline: 'See and cut what you pay every month.',
  short: 'Every recurring charge in one place, on iPhone.',
  platforms: ['iOS', 'iPadOS'],
  status: 'live',
  brief:
    'Most people have 12+ subscriptions and forget about a third of them. Track My Subs puts every recurring charge in one place — so a free trial never turns into a yearly bill.',
  appStoreUrl: 'https://apps.apple.com/app/id6749513883',
  icon: '/apps/track-my-subs/icon.png',
  accent: '#34d399',
  glow: 'rgba(52,211,153,0.14)',
  meta: [
    { label: 'Platform', value: 'iPhone · iPad' },
    { label: 'Category', value: 'Finance' },
    { label: 'Languages', value: '44' },
    { label: 'Requires', value: 'iOS 18.5+' },
  ],
  screenshots: [
    { src: '/apps/track-my-subs/shot-1.jpg', alt: 'Track My Subs showing a monthly subscription total' },
    { src: '/apps/track-my-subs/shot-2.jpg', alt: 'Track My Subs spending insights by category' },
    { src: '/apps/track-my-subs/shot-3.jpg', alt: 'The Track My Subs renewal calendar' },
  ],
  features: [
    {
      number: '01',
      title: 'Add in seconds',
      description: 'A built-in catalog of the services you already use.',
    },
    {
      number: '02',
      title: 'Know your real number',
      description: 'What you spend per day, week, month and year.',
    },
    {
      number: '03',
      title: 'Never get surprised',
      description: 'A renewal calendar and a reminder before every charge.',
    },
    {
      number: '04',
      title: 'Home Screen widget',
      description: 'Your monthly total, always in view.',
    },
  ],
  highlights: ['Live in 44 languages', '50+ currencies, auto-detected', 'Home Screen widget'],
  privacy:
    'Stored on your device. No account, no sign-up, and we never collect what you track.',
};

export const FRIDGEFOX: AppData = {
  slug: 'fridgefox',
  name: 'FridgeFox',
  locale: 'en',
  tagline: 'Never throw away food again.',
  short: 'Scan the receipt, cook what needs to go.',
  platforms: ['iOS', 'iPadOS'],
  brief:
    'Photograph your receipt. FridgeFox knows what is in your kitchen, warns you before anything expires, and tells you what to cook with it.',
  // The closed loop is the whole positioning — worth saying on the page.
  featuresTitle: 'A loop that closes itself',
  status: 'soon',
  // Set this to the App Store / pre-order URL and every download button goes live.
  appStoreUrl: null,
  icon: '/apps/fridgefox/icon.png',
  // Brand colours from the FridgeFox brief: fox orange on brand green.
  accent: '#E8813A',
  glow: 'rgba(232,129,58,0.16)',
  meta: [
    { label: 'Platform', value: 'iPhone · iPad' },
    { label: 'Requires', value: 'iOS 18+' },
    { label: 'Language', value: 'German' },
  ],
  features: [
    {
      number: '01',
      title: 'The receipt does the work',
      description:
        'One photo at the checkout. Every line item is read and checked against the printed total. No typing, no list to keep up to date.',
    },
    {
      number: '02',
      title: 'Cook what needs to go',
      description:
        'Five recipes from what you actually have at home. Whatever expires soonest goes in the pot first.',
    },
    {
      number: '03',
      title: 'Thirty seconds a day',
      description:
        'Once a day it asks whether something is still good. Swipe, done — that is what keeps the pantry honest.',
    },
    {
      number: '04',
      title: 'One shared fridge',
      description:
        'Pantry, shopping list and weekly plan belong to the whole household — flatshare, family or couple.',
    },
  ],
  highlights: ['Reads a receipt in one photo', 'Hosted in Frankfurt', 'Shared household pantry'],
  privacy:
    'No ads, no tracking, no data selling. Everything is stored in Frankfurt, Germany. Receipt photos are read and never kept, and your contacts never leave the device.',
};

export const CALLBACK: AppData = {
  slug: 'callback',
  name: 'Callback AI',
  locale: 'en',
  tagline: 'Land the callback.',
  short: 'Finance interview prep with an on-device AI tutor.',
  platforms: ['iOS'],
  brief:
    'Real interview questions with model answers, drills, mock interviews and a study plan — plus an AI tutor that runs entirely on your iPhone. Built for anyone chasing a front-office offer.',
  featuresTitle: 'Built for the callback',
  status: 'soon',
  // Set this to the App Store pre-order URL and every button flips to "Pre-order".
  appStoreUrl: null,
  icon: '/apps/callback/icon.png',
  // Readable derivative of the icon's electric blue (#2408D8 fails contrast on night).
  accent: '#6577FF',
  glow: 'rgba(80,90,255,0.16)',
  meta: [
    { label: 'Platform', value: 'iPhone' },
    { label: 'Category', value: 'Education' },
    { label: 'Requires', value: 'iOS 26' },
  ],
  features: [
    {
      number: '01',
      title: 'The whole prep, offline',
      description:
        'Hundreds of real interview questions with model answers, organized into a plan. No connection needed.',
    },
    {
      number: '02',
      title: 'A tutor in your pocket',
      description:
        'On-device Apple Intelligence coaches your answers privately — nothing you say leaves the phone.',
    },
    {
      number: '03',
      title: 'Drills and mock interviews',
      description:
        'Timed rounds that feel like the real thing, so the real thing feels like a drill.',
    },
    {
      number: '04',
      title: 'Markets, every morning',
      description:
        'A daily markets snapshot to walk in current — cached, with an honest "as of" date.',
    },
  ],
  highlights: ['On-device Apple Intelligence', 'Hundreds of real questions', 'Works fully offline'],
  privacy:
    'The tutor runs on-device with Apple Intelligence — your answers never leave your phone. The study product works fully offline. No account, no tracking.',
};

export const APPS: AppData[] = [JOTT, TRACK_MY_SUBS, FRIDGEFOX, CALLBACK];

/**
 * Where an app's own page lives on this site. Every app is a top-level route
 * (`/jott/`), so adding a product means adding an entry above, an HTML entry
 * point, and a line in `vite.config.ts` — nothing else.
 */
export const productPath = (app: AppData) => `/${app.slug}/`;
