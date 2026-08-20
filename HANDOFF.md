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
  its real App Store screenshots at 280px, and the two links that matter. Bands alternate
  sides so a long scroll has rhythm. Products without screenshots lead with their icon at
  200px instead of a placeholder — and in that case the icon is **not** repeated beside the
  name, which is what `hasShots` guards.
- **The hero is deliberately spare**: headline, one paragraph, two buttons. No counts, no
  captions, no product imagery.
- **The landing page offers two doors, side by side, early.** A left half for companies who
  need AI or digital work built, and a right half for the products we own — where the products
  are *named*, not exhibited. This is on purpose: a business arriving with a problem should
  not have to scroll past four app pitches to find us.
- **The full product showcase lives only on `/portfolio/`.** Do not put it back on the home
  page.
- **Depth comes from real shadows and flat colour fields.** No gradient meshes, no glows, no
  glassmorphism. The `.plate` / `.plate-lift` classes are the only shadows in the system.
- **Motion is small and fast.** The hero animates itself in CSS (`.rise`, staggered) so it
  never waits on JavaScript; below the fold `Reveal` fades content up 12px over 500ms on
  intersection. Both are skipped under `prefers-reduced-motion`.
- **The contact form is on the landing page as well as `/contact/`**, same `ContactForm`
  component, which takes a `tone` prop so it renders on navy or paper.
- **`ContactForm` has no `mailto:` fallback, deliberately.** Opening a mail client is a dead
  end on a phone. If delivery fails it says so in place and shows the address as selectable
  text with a copy button. Plain email links elsewhere on the site are fine — those are a
  deliberate click.
- **Contact appears once in the nav**, as the "Get in touch" button. `NAV_LINKS` does not
  contain it; the mobile drawer and footer append it explicitly.

**Two families, self-hosted.**

| Family | Weights | Used for |
|---|---|---|
| `Cormorant Garamond` | 400, 500 | Headlines and product taglines only |
| `Switzer` | 400, 500, 600 | Body copy, labels, buttons, navigation |

Malte asked for the typography of **a16z.com/portfolio**. That site sets its titles in
**Orpheus Pro** (Adobe Typekit) on a deep navy, with a grotesque for everything small —
Orpheus is licensed and cannot be self-hosted, so headlines use **Cormorant Garamond**, the
closest licence-free relative: classical, high contrast, small delicate serifs.

Cormorant has a small x-height and is **display-only** — never set it below about 1.3rem.
`Display` is the only component that uses it, which is the guardrail. There is no monospace
anywhere; it read as a techier register and clashed with the geometric logotype.

### Three things make this ours rather than generic

An elegant serif on navy is the house style of every VC and holding-company site. These are
the decisions that stop it being one of them, and they are derived from the brand rather
than from a trend:

1. **Headlines are lowercase.** The logotype is a lowercase `nocte`, so the voice is
   lowercase too — "we build software worth owning.", "the products we own." Almost nobody in
   this market does it, and it costs nothing. Write headline copy lowercase **in the source**;
   there is no `text-transform`, because that would wreck genuine proper nouns. **Keep AI,
   Nocte and product names capitalised.**
2. **The accent is warm amber, not another blue.** `--accent` (`#8a5a0f` on light,
   `--night-accent` `#e3b171` on navy) is the lamplight in "after dark". A blue accent on a
   blue site is invisible and generic; amber against the navy is the thing people remember.
   Two values because a readable amber on warm white has to be far darker than one on navy.
3. **Oversized serif numerals mark structure.** `SectionHead` takes an `index`, and the home
   page's two halves carry `01` / `02` — set in the display serif at low contrast, like a
   printed book's chapter numbers. They need the `.figures` class: Cormorant defaults to
   oldstyle figures, which renders "01" as something that reads as "OI".

**Say less.** There are no specification tables, no counts of platforms or languages, no
"hosted in X" bullet lists. The products and the copy carry the argument; a visitor should
leave knowing what the company does and not much else. If you are tempted to add a metadata
table, that is the instinct this pass removed.

**Colour discipline.** One blue, one warm accent, two rule weights. Each product's own colour
appears in three places and nowhere else: its band field, its tagline, and its status dot —
and the status dot is only filled when the product is **live**, so colour means shipping.

Re-inking the site is a **token change only** — edit the `:root` block in
`src/styles/global.css`. No component reads a hard-coded colour.

**Incorporation detail appears exactly once**, in the footer, from `COMPANY.legalLine`.

**The old "a company that builds companies" line is gone** at Malte's request, along with the
listy "builds, owns, and advises digital businesses" variant. The home headline is
`We build software worth owning.` — set once in `src/App.tsx`.

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
