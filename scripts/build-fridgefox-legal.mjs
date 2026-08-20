/**
 * ── FridgeFox legal: markdown → LegalDoc ─────────────────────────────────
 *
 * The authority for FridgeFox's privacy policy and terms is the markdown that
 * ships **inside the app** (`~/code/fridgefox/ios/FridgeFox/Recht/*.md`), so
 * the app works with no network. App Store Connect also needs a hosted copy,
 * and App Review does read it.
 *
 * Transcribing that text into this site by hand would guarantee the two drift.
 * So this generates `src/data/legal-fridgefox.ts` from the app's own files.
 * Run it whenever the legal texts change:
 *
 *     node scripts/build-fridgefox-legal.mjs
 *
 * It is deliberately a generator rather than a runtime fetch: the site is a
 * static build with no markdown dependency, and a legal page that depends on a
 * file outside the repo at request time is a legal page that can 500.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.FRIDGEFOX_RECHT
  ?? resolve(HERE, '../../fridgefox/ios/FridgeFox/Recht');
const OUT = resolve(HERE, '../src/data/legal-fridgefox.ts');

/**
 * Parse one of the app's legal documents.
 *
 * The shape is consistent across all six files: an `# H1`, a `**Version …**`
 * stanza, then `## n. Heading` sections whose bodies are paragraphs, `**bold**`
 * sub-headings and `- ` bullets. Sub-headings are folded into the paragraph flow
 * rather than becoming sections of their own, because the site's LegalDoc has
 * one level of heading and inventing a second would change the document's
 * structure — which for a legal text is not a cosmetic decision.
 */
function parse(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const doc = { title: '', updated: '', intro: '', sections: [] };
  let section = null;
  let paragraph = [];
  let bullet = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(' ').replace(/\s+/g, ' ').trim();
    if (text) (section ? section.body : []).push(text);
    if (!section && text && !doc.intro) doc.intro = text;
    paragraph = [];
  };
  const flushBullet = () => {
    if (!bullet.length) return;
    const text = bullet.join(' ').replace(/\s+/g, ' ').trim();
    if (text && section) (section.bullets ??= []).push(text);
    bullet = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.startsWith('# ')) {
      doc.title = line.slice(2).trim().toLowerCase();
      continue;
    }
    if (line.startsWith('## ')) {
      flushBullet();
      flushParagraph();
      // Drop the clause number: LegalPage numbers the contents list itself, so
      // keeping "3." here would render "3. 3. What FridgeFox processes".
      const heading = line.slice(3).trim().replace(/^\d+\.\s*/, '');
      section = { heading, body: [] };
      doc.sections.push(section);
      continue;
    }
    if (!line.trim()) {
      flushBullet();
      flushParagraph();
      continue;
    }
    if (/^[-*]\s/.test(line)) {
      flushBullet();
      flushParagraph();
      bullet = [line.replace(/^[-*]\s/, '')];
      continue;
    }
    // A continuation line of the bullet currently being read.
    if (bullet.length && /^\s{2,}\S/.test(raw)) {
      bullet.push(line.trim());
      continue;
    }
    flushBullet();
    paragraph.push(line.trim());
  }
  flushBullet();
  flushParagraph();

  // The "**Version of 20 August 2026.**" stanza is the intro; pull the date out
  // of it so the page header can render it the way every other legal page does.
  const stamp = doc.intro.match(/(\d{1,2})\.?\s+(\w+)\s+(\d{4})/);
  const MONTHS = {
    january: '01', february: '02', march: '03', april: '04', may: '05',
    june: '06', july: '07', august: '08', september: '09', october: '10',
    november: '11', december: '12',
    januar: '01', februar: '02', märz: '03', mai: '05', juni: '06',
    juli: '07', oktober: '10', dezember: '12',
  };
  if (stamp) {
    const month = MONTHS[stamp[2].toLowerCase()] ?? '01';
    doc.updated = `${stamp[3]}-${month}-${String(stamp[1]).padStart(2, '0')}`;
  }
  return doc;
}

/** Strip markdown emphasis, which LegalPage renders as plain text. */
const plain = (s) =>
  s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/(?<!\S)\*(.+?)\*(?!\S)/g, '$1');

const clean = (doc) => ({
  ...doc,
  intro: plain(doc.intro),
  sections: doc.sections.map((s) => ({
    heading: plain(s.heading),
    body: s.body.map(plain),
    ...(s.bullets ? { bullets: s.bullets.map(plain) } : {}),
  })),
});

/**
 * Merge the English and German documents into one page.
 *
 * FridgeFox's binding version is the German one, and a German user has a right
 * to read it. The site is otherwise English, so both go on one page: English
 * first, then the German text under its own heading, rather than a second route
 * nobody links to.
 */
function merge(en, de, title, intro) {
  return {
    title,
    updated: en.updated || de.updated,
    intro,
    sections: [
      ...clean(en).sections,
      {
        heading: 'Deutsche Fassung (verbindlich)',
        body: [
          'Die deutsche Fassung ist die verbindliche. Sie folgt hier vollständig und steht ebenso in der App unter Einstellungen → Rechtliches.',
        ],
      },
      ...clean(de).sections.map((s) => ({ ...s, heading: `DE — ${s.heading}` })),
    ],
  };
}

const read = (name) => {
  const path = resolve(SRC, name);
  if (!existsSync(path)) {
    console.error(`Missing ${path}\nSet FRIDGEFOX_RECHT to the app's Recht/ directory.`);
    process.exit(1);
  }
  return parse(readFileSync(path, 'utf8'));
};

const privacy = merge(
  read('datenschutz-en.md'),
  read('datenschutz-de.md'),
  'FridgeFox privacy policy',
  'This is the privacy policy that ships inside FridgeFox, published here as well because the App Store requires a hosted copy. It is the same text, word for word. The German version is the binding one and follows in full below.',
);

const terms = merge(
  read('nutzungsbedingungen-en.md'),
  read('nutzungsbedingungen-de.md'),
  'FridgeFox terms of use',
  'These are the terms that ship inside FridgeFox, published here as well. It is the same text, word for word. The German version is the binding one and follows in full below.',
);

const banner = `/**
 * ── FridgeFox legal — GENERATED, DO NOT EDIT ─────────────────────────────
 *
 * Source of truth: ~/code/fridgefox/ios/FridgeFox/Recht/*.md — the very files
 * that ship inside the app. Regenerate with:
 *
 *     node scripts/build-fridgefox-legal.mjs
 *
 * Editing this file by hand makes the hosted policy disagree with the one in
 * the app, which is exactly the failure this generator exists to prevent.
 */

import type { LegalDoc } from './legal';
`;

writeFileSync(
  OUT,
  `${banner}
export const FRIDGEFOX_PRIVACY: LegalDoc = ${JSON.stringify(privacy, null, 2)};

export const FRIDGEFOX_TERMS: LegalDoc = ${JSON.stringify(terms, null, 2)};
`,
  'utf8',
);

const count = (d) => `${d.sections.length} sections`;
console.log(`wrote ${OUT}`);
console.log(`  privacy: ${count(privacy)}, updated ${privacy.updated}`);
console.log(`  terms:   ${count(terms)}, updated ${terms.updated}`);
