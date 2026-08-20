# nocteventures.com — handoff

**Last updated:** 2026-08-20

- **Path:** `~/code/nocteweb`
- **Git:** `main` · remote: https://github.com/mltbiz77/nocteweb.git
- **Hosting:** Vercel project `nocteweb` (git-linked — a push to `main` deploys production)

> Read this before you touch anything here. **Update it before you finish.**
> Full project map: `~/PROJECTS.md`

## What this is

Nocte Ventures' public website. Positions the company as a parent company with two
pillars — **Products/Portfolio** (apps we own) and **Advisory & Solutions** (client work) —
plus per-product subpages and the legal pages.

## Stack

Vite 6 **multi-page app** (no router), React 18, Tailwind 3, TypeScript. Every route is its
own HTML entry point mounting its own React tree, so each page loads only its own JS.

## The design, and why

**The products are the argument.** Nocte owns real software that looks good, so the site's
job is to show it at a size a visitor can judge — an investor or a client should be able to
scroll the home page and see immediately that this company ships.

- **Deep blue opens and closes the site.** `--night` carries the hero, every interior
  masthead and the closing band. The nav takes the tone of whatever sits under it
  (`PageShell navTone`), so the home page reads as one continuous blue field from the top of
  the window down. No scroll listener is involved.
- **The work sits on a soft warm white in between**, so product artwork reads cleanly.
- **Each product gets a full-width band** (`Showcase.tsx`): its own colour as a flat 5% field,
  its real App Store screenshots at 280px, its proof points, and the two links that matter.
  Bands alternate sides so a long scroll has rhythm. Products without screenshots lead with
  their icon at 200px instead of a placeholder.
- **The hero's numbers are all checkable on the App Store** — products owned, live count,
  languages shipped, platforms. Nothing about downloads or revenue, because we cannot stand
  behind those.
- **Depth comes from real shadows and flat colour fields.** No gradient meshes, no glows, no
  glassmorphism. The `.plate` / `.plate-lift` classes are the only shadows in the system.
- **Motion is small and fast.** The hero animates itself in CSS (`.rise`, staggered) so it
  never waits on JavaScript; below the fold `Reveal` fades content up 12px over 500ms on
  intersection. Both are skipped under `prefers-reduced-motion`.

**Three type voices, each with one job:**

| Voice | Family | Used for |
|---|---|---|
| Structure | `Switzer` 400–700 (Fontshare) | Headings, product names, big numbers |
| Reading | `Erode` (Fontshare) | Paragraphs, legal text, descriptions |
| Data | System monospace | Labels, eyebrows, statuses, buttons |

**Colour discipline.** One blue, one accent, two rule weights. Each product's own colour
appears in three places and nowhere else: its band field, its tagline, and its status dot —
and the status dot is only filled when the product is **live**, so colour means shipping.

Re-inking the site is a **token change only** — edit the `:root` block in
`src/styles/global.css`. No component reads a hard-coded colour.

**Incorporation detail appears exactly once**, in the footer, from `COMPANY.legalLine`.

### The primitives (`src/components/site.tsx`)

`Container` · `Reveal` · `Label` · `Display` (one heading scale, `xxl`–`sm`) · `Prose` ·
`SectionHead` · `FactStrip` (the hero's numbers) · `FactTable` · `Entry` · `Tag` · `Button` ·
`ArrowLink` · `StatusMark` · `LogoMark` · `AppStoreButton` · `SiteNav` · `NightBand` ·
`SiteFooter` · `PageMasthead` · `PageShell`.

Build new sections from these. If something seems to need a new visual treatment, the content
usually belongs in an existing one.

## How to run

```bash
npm run dev        # dev server
npm run build      # tsc -b && vite build  → dist/
npm run preview    # serve the built site on :4173
```

## Routes

| Route | Entry point | Component |
|---|---|---|
| `/` | `index.html` | `src/App.tsx` |
| `/portfolio/` | `portfolio/index.html` | `src/components/Portfolio.tsx` |
| `/advisory/` | `advisory/index.html` | `src/components/Advisory.tsx` |
| `/about/` | `about/index.html` | `src/components/About.tsx` |
| `/contact/` | `contact/index.html` | `src/components/Contact.tsx` |
| `/privacy/`, `/terms/` | `privacy|terms/index.html` | `src/components/LegalPage.tsx` |
| `/jott/`, `/track-my-subs/`, `/fridgefox/`, `/callback/` | `<slug>/index.html` | `src/components/AppPage.tsx` |

`vercel.json` redirects `/products` → `/portfolio/` and `/services` → `/advisory/`.

## Content lives in data, not markup

| File | Drives |
|---|---|
| `src/data/company.ts` | Name, subline, tagline, contact email, nav + footer links, booking URL |
| `src/data/apps.ts` | Every product: name, taglines, platforms, App Store URL, features, screenshots |
| `src/data/services.ts` | Advisory offerings, "how we work", the two home-page pillars, `CASE_STUDIES` |
| `src/data/team.ts` | `TEAM` (empty) and the About-page principles |
| `src/data/legal.ts` | Privacy policy and terms, as structured sections |

Sections that would look thin when empty (`TEAM`, `CASE_STUDIES`) render only when
their array has entries. Adding the first one is a data change alone.

## Adding a product

1. Add an `AppData` object in `src/data/apps.ts` and append it to `APPS`.
2. Create `<slug>/index.html` (copy `jott/index.html`, update title/description/canonical/JSON-LD).
3. Create `src/pages/<slug>/main.tsx` rendering `<AppPage app={YOUR_APP} />`.
4. Add the slug to `ROUTES` in `vite.config.ts`.
5. Add the URL to `public/sitemap.xml`.

Icons go in `public/apps/<slug>/icon.png` at 512px, screenshots in the same folder.

**Screenshots must be 660px wide** — that covers the 280px showcase plate at 2x. The current
set was generated from source assets at quality 82, progressive:

- Jott: from `~/code/jott/jott app store pics/` (1290×2796 originals).
- Track My Subs: pulled from the live App Store listing via
  `https://itunes.apple.com/lookup?id=<id>`, replacing the `320x480bb.jpg` suffix on each
  `screenshotUrls` entry with `1290x2796bb.jpg`.

`highlights` on each `AppData` is two or three short, checkable proof points for the band.
Facts only — no download or revenue claims.

## Current state

Live on nocteventures.com. Home, Portfolio, Advisory, About, Contact, Privacy, Terms and
four product pages all build and render; zero console errors; no horizontal overflow at 390px.

## Next steps

- [ ] **Wire the contact form to a real inbox.** It currently falls back to opening a
      pre-filled mail draft. Set **one** env var in the Vercel project and it starts
      delivering: `RESEND_API_KEY` (+ `CONTACT_FROM`, needs DNS verification, 3k emails/mo
      free) or `WEB3FORMS_ACCESS_KEY` (no DNS, 250 submissions/mo free). See `api/contact.js`.
- [ ] **Add the registered office address to `COMPANY.legalLine`.** UK law (the Company, LLP
      and Business (Names and Trading Disclosures) Regulations 2015) requires a company's
      website to state its registered name, number, place of registration *and registered
      office address*. The first three are there; the address is missing because it was not
      to hand.
- [ ] Have the legal text in `src/data/legal.ts` reviewed by a solicitor — it is an
      accurate description of what the site does, not vetted advice.
- [ ] Point the App Store Connect "Privacy Policy URL" for each app at
      `https://www.nocteventures.com/privacy/` if you want one canonical hosted copy.
- [ ] Fill `TEAM` in `src/data/team.ts` (About page team section is hidden until then).
- [ ] Add the first entry to `CASE_STUDIES` in `src/data/services.ts` when there is one.
- [ ] Set `BOOKING_URL` in `src/data/company.ts` to show a "Book a call" button on /contact/.

## Gotchas

- **`node_modules` and `dist` used to be committed.** They were untracked on 2026-08-20.
  Never `git add -f` them back — Vercel builds from source.
- **Tailwind responsive overrides.** `Section` sets `py-24 sm:py-32`. A bare `pt-0` in
  `className` loses to `sm:py-32` at ≥640px — you need `pt-0 sm:pt-0`.
- **Hero title letters are `inline-block` spans.** A plain space between them collapses to
  zero width, which is why `src/App.tsx` renders `' '` for the word break.
- **`Reveal` uses IntersectionObserver.** Headless full-page screenshots reset scroll before
  capture, so below-the-fold sections photograph blank. That is a capture artifact, not a
  bug — scroll and take viewport shots when doing visual QA.
- **`public/type.html`** is an internal font-comparison page and is gitignored on purpose.
  Do not commit it; it would be publicly served at `/type.html`.
- Apps ship their legal text **in-app**; they link only to the site root and
  `hello@nocteventures.com`. Nothing depends on `/privacy/` or `/terms/` yet.
