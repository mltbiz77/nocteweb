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

The site is **a document, not a theme**. Nocte is a holding company, so the site is built to
read like a register: **blue-black ink on warm cream stock**, the way a ledger or an
aerogramme is printed. Hairline rules, and the portfolio as an actual table of holdings on
the front page rather than a grid of cards.

**Blue is the ink and the night, not a coat of paint.** There are no blue gradients and no
blue glows. It appears in exactly three roles: the body ink (`--ink`, a deep navy), the
single accent for links and section numerals (`--accent`), and the midnight band that closes
every page (`--night`).

Everything that reads as decoration was removed on purpose. There are **no gradients, no
glows, no particle fields, no grain overlays, no rounded cards, and no scroll animations** —
those are the house style of every generated site, and they were what the previous version
looked like. Structure comes from rules, the grid, and type alone.

**Three type voices, each with one job:**

| Voice | Family | Used for |
|---|---|---|
| Structure | `Switzer` (Fontshare) | Headings, product names, UI |
| Reading | `Erode` (Fontshare) | Paragraphs, legal text, table descriptions |
| Data | System monospace | Numbers, labels, statuses, index numerals, nav |

**Colour is almost absent.** One cream paper, one ink, one accent, two rule weights. Beyond
that, the only saturated colour on the site is each product's own accent, used solely as a
7px status square in the register — and only when the product is **live**. In-build products
get a hollow grey square, so colour on the register means "this is shipping".

**One midnight band closes every page** (`NightBand`). That is where "Digital Craftsmanship
After Dark" earns its place, instead of being the wallpaper for the whole site.

Re-inking the site is a **token change only** — edit the `:root` block in
`src/styles/global.css`. No component reads a hard-coded colour, so a different blue, or a
full dark inversion, is one block of edits.

**Incorporation detail appears exactly once**, in the footer, from `COMPANY.legalLine`. It
used to be scattered across five pages and read like a filing. Everywhere it was removed,
the space now carries something a visitor actually wants: the page's own index on the home
masthead, and product/engagement facts elsewhere.

### The primitives (`src/components/site.tsx`)

`Container` · `Label` · `SectionMark` (the `§01 ───── TITLE` rule) · `Display` (the one
heading scale) · `Prose` (serif reading text) · `FactTable` (mono key/value rows) · `Entry`
(the numbered ruled row that services, principles, features and clauses all use) ·
`StatusMark` · `Button` · `ArrowLink` · `SiteNav` · `NightBand` · `SiteFooter` ·
`PageMasthead` · `PageShell`.

Build new sections out of these. If something needs a new visual treatment, it is usually a
sign the content belongs in an existing one.

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

Icons go in `public/apps/<slug>/icon.png`, screenshots in the same folder.

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
