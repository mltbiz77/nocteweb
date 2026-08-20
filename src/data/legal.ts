/**
 * ── Legal pages, as data ─────────────────────────────────────────────────
 *
 * These cover **this website only**. Each app ships its own policy in-app and
 * on the App Store; nothing here overrides those.
 *
 * NOTE: template text describing what the site actually does. Have it checked
 * by a solicitor before relying on it, and bump `updated` whenever it changes.
 */

export type LegalSection = {
  heading: string;
  /** Each string is a paragraph. */
  body: string[];
  /** Rendered as a bulleted list under the paragraphs. */
  bullets?: string[];
};

export type LegalDoc = {
  title: string;
  /** ISO date; also rendered human-readably at the top of the page. */
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const PRIVACY: LegalDoc = {
  title: 'privacy policy',
  updated: '2026-08-20',
  intro:
    'This policy explains what happens to your information when you use nocteventures.com. It covers this website only — each of our apps ships its own privacy policy, which you will find inside the app and on its App Store listing.',
  sections: [
    {
      heading: 'Who we are',
      body: [
        'Nocte Ventures Ltd, registered in England, Company No. 16579177, is the data controller for this website. You can reach us at hello@nocteventures.com about anything in this policy.',
      ],
    },
    {
      heading: 'What we collect',
      body: [
        'This is a static website. We do not use advertising cookies, we do not run analytics or tracking scripts, and we do not build a profile of you. Every asset — including the typefaces — is served from this domain, so loading a page does not disclose your visit to any third party.',
        'Two things do involve your data:',
      ],
      bullets: [
        'Server logs. Our hosting provider (Vercel Inc.) records standard request data — IP address, browser user agent, the page requested, and a timestamp — to serve the site and protect it from abuse.',
        'Contact requests. If you email us or send the form on the contact page, we receive the name, email address, company, and message you provide, so that we can reply.',
      ],
    },
    {
      heading: 'Why we may use it, and for how long',
      body: [
        'We use contact details only to respond to you and to carry on the conversation you started. The lawful basis is our legitimate interest in answering enquiries, or steps taken at your request before entering a contract.',
        'We keep correspondence for as long as it is commercially relevant, and delete it when it is not. Server logs are retained by our host on their own short rolling schedule.',
      ],
    },
    {
      heading: 'Who we share it with',
      body: [
        'We do not sell your data and we do not share it for advertising. We use a small number of processors to run the site and our email, each bound to handle data only on our instructions:',
      ],
      bullets: [
        'Vercel Inc. — website hosting and delivery.',
        'Our email provider — receiving and storing correspondence.',
      ],
    },
    {
      heading: 'International transfers',
      body: [
        'Some of these providers operate outside the UK and EEA. Where data is transferred, it is done under the safeguards that provider offers, such as standard contractual clauses.',
      ],
    },
    {
      heading: 'Your rights',
      body: [
        'Under UK and EU data protection law you can ask us for a copy of the personal data we hold about you, ask us to correct or delete it, or object to our processing it. Email hello@nocteventures.com and we will respond within one month.',
        'If you are not satisfied with our response, you can complain to the UK Information Commissioner’s Office (ico.org.uk) or your local supervisory authority.',
      ],
    },
    {
      heading: 'Cookies',
      body: [
        'This website sets no cookies of its own and shows no cookie banner, because there is nothing to consent to. If that ever changes, this policy will change with it first.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'When we update this policy we revise the date at the top of this page. Material changes will be described here rather than made quietly.',
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  title: 'terms of use',
  updated: '2026-08-20',
  intro:
    'These terms govern your use of nocteventures.com. Our apps are licensed separately under their own terms and the App Store’s standard licence agreement; nothing here replaces those.',
  sections: [
    {
      heading: 'The agreement',
      body: [
        'By using this website you accept these terms. If you do not accept them, please do not use the site. The site is operated by Nocte Ventures Ltd, registered in England, Company No. 16579177.',
      ],
    },
    {
      heading: 'Use of the site',
      body: [
        'You may view, download, and print pages from this site for your own use. You may not republish, sell, or systematically extract material from it without our written permission, and you may not use it in any way that damages it or interferes with anyone else’s access.',
      ],
    },
    {
      heading: 'Intellectual property',
      body: [
        'All content on this site — text, design, code, logos, product names, and imagery — belongs to Nocte Ventures Ltd or its licensors and is protected by copyright and trade mark law. "Nocte Ventures", "Jott", "Track My Subs", "FridgeFox", and "Callback AI" are our marks.',
      ],
    },
    {
      heading: 'No warranty, and no advice',
      body: [
        'The site is provided as-is. We work to keep it accurate and available but make no guarantee that it is free of errors or uninterrupted, and we may change or withdraw any part of it without notice.',
        'Nothing on this site is legal, financial, tax, or investment advice, and nothing on it is an offer of securities or an invitation to invest. Any engagement with us is governed by a separate written agreement.',
      ],
    },
    {
      heading: 'Links to other sites',
      body: [
        'Where we link to third-party sites — the App Store, our social accounts, or anything else — we do so for convenience. We do not control them and are not responsible for their content or their practices.',
      ],
    },
    {
      heading: 'Liability',
      body: [
        'To the extent the law allows, we are not liable for any loss of profit, revenue, data, or business arising from your use of this site. Nothing in these terms limits our liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be limited.',
      ],
    },
    {
      heading: 'Governing law',
      body: [
        'These terms are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction over any dispute arising from them.',
      ],
    },
    {
      heading: 'Contact',
      body: ['Questions about these terms go to hello@nocteventures.com.'],
    },
  ],
};
