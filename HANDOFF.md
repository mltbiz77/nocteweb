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

**Nocte is night, so the site is night.** One continuous near-black field with a blue cast
(`--bg: #06080f`), raised panels for structure, and electric blue (`--accent: #3f6dff`) as the
only colour that isn't ink. No cream, no serif, no numbered sections.

### Why not the obvious thing

The sibling **4 More Capital** site (`~/code/capital-website`) is warm cream `#F1ECE3` + a dark
saturated hue + a Spectral-serif / IBM-Plex-Sans pair + `01 / 02 / 03` section numerals + a
two-column "two disciplines" split. Earlier versions of this site drifted into all five of
those and Malte rightly said it looked like the same company twice.

**Do not reintroduce any of them here.** If a change starts to look like cream paper, a serif
headline, or numbered sections, it is wrong for Nocte regardless of how good it looks.

### Type

| Family | Weights | Used for |
|---|---|---|
| `Cabinet Grotesk` | 500, 800 | Display — huge, tight, lowercase |
| `Switzer` | 400, 500, 600 | Body, labels, buttons, navigation |

Headlines are **lowercase**, echoing the lowercase `nocte` logotype — written lowercase in the
source, never via `text-transform`, so AI, Nocte and the product names keep their capitals.

### Motion — the thing that actually makes it feel like something

1. **The opening.** `#nv-curtain` in `index.html` covers the viewport, wipes the wordmark in
   left to right with a blue hairline sweeping under it, then lifts. It lives in the **HTML,
   not React**, so it is in the first painted frame rather than appearing a beat late, and an
   inline script removes it from the DOM afterwards so it can never swallow a click. Once per
   browser session (`sessionStorage`), and skipped entirely for `prefers-reduced-motion`.
   Home page only — an intro on every navigation is a tax.
2. **`MaskHeading`** wipes each line of a headline up from behind its own edge. A clip reveal,
   not a fade, which is what makes it read as typeset rather than animated. Pass the lines
   explicitly; the clip has to be per line. `.mask-line` pads inside the clip and pulls the box
   back, because otherwise the clip cuts descenders off.
3. **Magnetic buttons.** `useMagnet` pulls a button toward the cursor while it is over it —
   direct style writes, so no re-render on mousemove. Hover-capable devices only.
4. **`Reveal`** fades blocks up on intersection, below the fold only.

Every one is off under `prefers-reduced-motion`. There are still no particle fields, no
gradient meshes and no glows — depth comes from `.panel` surfaces and real shadows.

### The primitives (`src/components/site.tsx`)

`Container` · `Reveal` · `Label` · `Display` · `MaskHeading` · `Prose` · `SectionHead` ·
`Entry` · `ClosingBand` · `Button` · `ArrowLink` · `StatusMark` · `LogoMark` ·
`AppStoreButton` · `SiteNav` · `SiteFooter` · `PageMasthead` · `PageShell`.

`Entry` is deliberately **unnumbered** — index numerals down the side are the capital site's
device.

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

- [ ] **The contact form does not deliver mail yet — this is the one blocking item.**
      `api/contact.js` is written and wired; it needs **one** environment variable on the
      Vercel project. Until then every submission shows the "email us directly" state.
      - `WEB3FORMS_ACCESS_KEY` — free, 250/mo, no DNS. Confirm an email at web3forms.com,
        paste the key. Fastest path.
      - or `RESEND_API_KEY` + `CONTACT_FROM` — free 3k/mo, but needs nocteventures.com
        verified in Resend with DNS records.

      Set it with `npx vercel env add WEB3FORMS_ACCESS_KEY production` in this repo, then
      redeploy. No code change needed.
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

- **Do not poll the live site in a loop.** Repeated automated requests to
  nocteventures.com trip Vercel's bot mitigation, which then answers with a 403 and a
  "Vercel Security Checkpoint" page (`x-vercel-mitigated: challenge` in the response
  headers). It happened on 2026-08-20 from tight `until curl ...; do sleep 8; done` deploy
  polls. To check a deploy landed, use `vercel ls nocteweb` / `vercel inspect` instead of
  hammering the domain, and verify page content against the local `npm run preview` build.
  Clearing it: `vercel firewall attack-mode disable` — **the CLI refuses to run this for an
  agent** ("dangerous_operation_requires_user"), so a human has to run it interactively or
  toggle it in the Vercel dashboard under Project → Firewall. It also decays on its own once
  traffic normalises.

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
