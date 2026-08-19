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
