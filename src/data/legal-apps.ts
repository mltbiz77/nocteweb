/**
 * ── Track My Subs + Jott — hosted privacy policies and terms ─────────────
 *
 * App Store Connect requires a hosted privacy policy URL per app, and App Review
 * reads the page. These replace two ad-hoc arrangements:
 *
 *   - Track My Subs pointed at `mltbiz77.github.io/subtracker-legal/`, which is
 *     a personal GitHub Pages site rather than the company domain.
 *   - Jott had no hosted policy at all — only in-app sheets, whose text still
 *     claimed "we do not collect, transmit, or store your personal data on our
 *     servers". PostHog made that false.
 *
 * ⚠️ These describe what the apps actually do, verified against the code:
 * RevenueCat for purchases, PostHog (EU) for product measurement, and in Track
 * My Subs' case the Meta SDK for install attribution via SKAdNetwork. **No app
 * shows an App Tracking Transparency prompt and none may ever gain one** — Track
 * My Subs was rejected four times over ATT and shipped only by removing tracking
 * entirely.
 *
 * NOTE: written to match the code. Have a solicitor check it, and bump `updated`
 * whenever it changes.
 */

import type { LegalDoc } from './legal';

const CONTROLLER =
  'Nocte Ventures Ltd, registered in England and Wales, Company No. 16579177, 128 City Road, London EC1V 2NX, is the data controller. You can reach us at hello@nocteventures.com about anything in this policy.';

const NO_TRACKING = {
  heading: 'No advertising and no tracking',
  body: [
    'There is no advertising inside the app, no advertising identifier is read, and nothing you do is sold or shared with a data broker.',
    'You will never see the iOS "Allow app to track" prompt, because the app does not track you across other companies’ apps and websites. That is a deliberate, permanent decision.',
  ],
};

const RIGHTS = {
  heading: 'Your rights',
  body: [
    'You have the right of access, rectification, erasure, restriction, portability and objection under the GDPR. Because the app holds no name or email address, there is usually nothing for us to look up — your data is on your device, and deleting the app deletes it.',
    'For the measurement data described above, write to hello@nocteventures.com and we will delete what is attributable to your installation. We answer within one month. You may also complain to your local data protection authority; in the UK that is the Information Commissioner’s Office.',
  ],
};

export const TMS_PRIVACY: LegalDoc = {
  title: 'Track My Subs privacy policy',
  updated: '2026-08-20',
  intro:
    'Track My Subs keeps your subscriptions on your device. It has no account, no login and no cloud copy. Two services are involved — one for purchases, one for anonymous product measurement — and both are described below.',
  sections: [
    { heading: 'Who we are', body: [CONTROLLER] },
    {
      heading: 'What stays on your device',
      body: [
        'Every subscription you add — its name, price, currency, billing period, renewal date, category and notes — is stored on your iPhone and shared with the app’s own home-screen widget. None of it is uploaded.',
        'Deleting the app deletes all of it. You can also export everything to CSV from Settings at any time, which is yours to keep and does not pass through us.',
      ],
    },
    {
      heading: 'Renewal reminders',
      body: [
        'Reminders are scheduled by iOS on your device, from the renewal dates you entered. Nothing about them leaves the phone, and we cannot see them. If you decline notification permission the app keeps working and simply cannot remind you.',
      ],
    },
    {
      heading: 'Purchases',
      body: [
        'Payment is handled entirely by Apple. We never see your card, your billing address or your Apple Account.',
        'Whether Pro is active is kept in sync by RevenueCat, Inc. (United States), acting for us as a processor. It receives a pseudonymous installation identifier and the signed receipt from Apple, plus the technical details that accompany any such request such as country, device model and app version. It does not receive your name, your email address or any of your subscription data. Because RevenueCat is in the United States, that transfer relies on the European Commission’s standard contractual clauses; their policy is at revenuecat.com/privacy.',
      ],
    },
    {
      heading: 'Product measurement',
      body: [
        'We measure how the app is used, with PostHog, hosted in the European Union and acting for us as a processor. The lawful basis is our legitimate interest in a working product; you may object at any time by writing to us.',
        'What is recorded is that something happened — a screen was opened, a subscription was added or edited, the paywall appeared, a purchase started or completed — together with device model, app version, language, country and a pseudonymous identifier.',
        'What is never recorded: the name, price or renewal date of anything you track. Your list is not measured, only your use of the app.',
      ],
    },
    {
      heading: 'Install attribution',
      body: [
        'If you arrived from an advertisement, Apple’s SKAdNetwork may tell us that the campaign produced an install. That report comes from Apple, is aggregated, and does not identify you or your device. The Meta SDK is present in the app for this purpose only.',
        'This is why no tracking prompt appears: SKAdNetwork is designed to work without one, and we chose it over anything that would require permission to follow you.',
      ],
    },
    {
      heading: 'Logos',
      body: [
        'Service logos shown next to your subscriptions are fetched from logo.dev using the service name you typed. That request tells logo.dev which brand was looked up and your IP address; it carries no identifier of you and no other part of your list.',
      ],
    },
    NO_TRACKING,
    {
      heading: 'Children',
      body: [
        'Track My Subs is a personal finance utility for adults and is not directed at children under 13.',
      ],
    },
    RIGHTS,
  ],
};

export const TMS_TERMS: LegalDoc = {
  title: 'Track My Subs terms of use',
  updated: '2026-08-20',
  intro:
    'Track My Subs is a subscription tracker published by Nocte Ventures Ltd. By using it you agree to what follows.',
  sections: [
    {
      heading: 'What you get',
      body: [
        'A licence to use Track My Subs on devices you own. The free version tracks your subscriptions; Pro adds renewal reminders, insights and export.',
      ],
    },
    {
      heading: 'Pro, and the lifetime option',
      body: [
        'Pro is available monthly, annually, or as a one-time lifetime purchase. The monthly and annual plans are auto-renewing subscriptions billed through your Apple Account, and renew unless cancelled at least 24 hours before the period ends; manage or cancel in iOS Settings → Apple Account → Subscriptions.',
        'The lifetime purchase is a one-time payment. Nothing renews and there is nothing to cancel. It covers the Pro features that exist and those we add to the app; it is not a promise that the app will exist forever, which nobody can honestly make.',
        'Refunds are handled by Apple, not by us.',
      ],
    },
    {
      heading: 'It is a tracker, not an accountant',
      body: [
        'The figures shown are calculated from what you enter. Track My Subs does not connect to your bank, cannot see your actual charges, and cannot cancel anything on your behalf. Totals and forecasts are estimates for your own planning and are not financial advice.',
        'Currency conversions, where shown, use rates that may be out of date.',
      ],
    },
    {
      heading: 'Your data is yours',
      body: [
        'Your list lives on your device. Export it to CSV whenever you like. We hold no copy, which also means we cannot recover it for you if you delete the app or lose the device.',
      ],
    },
    {
      heading: 'Ending it',
      body: [
        'You can stop using the app at any time by deleting it. We may end access if these terms are broken.',
      ],
    },
    {
      heading: 'Law',
      body: [
        'These terms are governed by the law of England and Wales. Nothing here limits any right you have as a consumer that cannot be limited by agreement.',
      ],
    },
  ],
};

export const JOTT_PRIVACY: LegalDoc = {
  title: 'Jott privacy policy',
  updated: '2026-08-20',
  intro:
    'Jott keeps your to-dos on your device. There is no account, no login and no cloud copy — not even iCloud. One service receives anonymous measurement data and one handles purchases; both are described below.',
  sections: [
    { heading: 'Who we are', body: [CONTROLLER] },
    {
      heading: 'What stays on your device',
      body: [
        'Your to-dos, their order, and your completion history are stored on your iPhone in a container shared with the Jott widget, so the widget can show and tick off the same list. None of it is uploaded.',
        'iCloud sync is switched off in the app deliberately, which is why your list never leaves the device — and also why deleting the app deletes it permanently, with no backup we can restore.',
      ],
    },
    {
      heading: 'Product measurement',
      body: [
        'We measure how the app is used, with PostHog, hosted in the European Union and acting for us as a processor. The lawful basis is our legitimate interest in a working product; you may object at any time by writing to us.',
        'What is recorded is that something happened — a screen was opened, a to-do was added or completed, a theme was changed, the paywall appeared, a purchase started or completed — together with device model, app version, language, country and a pseudonymous identifier.',
        'What is never recorded: the text of any to-do. Your list is not measured, only your use of the app.',
        'An earlier version of this policy said the app collects nothing at all. That was written before any measurement existed, and this section replaces it.',
      ],
    },
    {
      heading: 'Purchases',
      body: [
        'Jott Pro is a one-time purchase, handled entirely by Apple. We never see your card, your billing address or your Apple Account.',
        'Whether Pro is active is kept in sync by RevenueCat, Inc. (United States), acting for us as a processor. It receives a pseudonymous installation identifier and the signed receipt from Apple, plus country, device model and app version. It does not receive your name, your email address or any of your to-dos. Because RevenueCat is in the United States, that transfer relies on the European Commission’s standard contractual clauses; their policy is at revenuecat.com/privacy.',
      ],
    },
    NO_TRACKING,
    {
      heading: 'Children',
      body: [
        'Jott is a general-purpose to-do app and is not directed at children under 13.',
      ],
    },
    RIGHTS,
  ],
};

export const JOTT_TERMS: LegalDoc = {
  title: 'Jott terms of use',
  updated: '2026-08-20',
  intro:
    'Jott is a to-do app published by Nocte Ventures Ltd. By using it you agree to what follows.',
  sections: [
    {
      heading: 'What you get',
      body: [
        'A licence to use Jott on devices you own. The app is free to use for keeping to-dos. Jott Pro unlocks the additional themes, the home-screen widget and shareable completion stats.',
      ],
    },
    {
      heading: 'Pro is a one-time purchase',
      body: [
        'Jott Pro is bought once, through your Apple Account. It is not a subscription: nothing renews, and there is nothing to cancel. Restore it on a new device with "Restore Purchases".',
        'It covers the Pro features that exist and those we add to the app. Refunds are handled by Apple, not by us.',
      ],
    },
    {
      heading: 'Your list is yours, and only yours',
      body: [
        'Jott stores your to-dos on your device with no cloud copy. That is the point of it — and it means that if you delete the app or lose the device, the list is gone and we cannot recover it. Please do not use Jott as the only record of something you cannot afford to lose.',
      ],
    },
    {
      heading: 'Ending it',
      body: [
        'You can stop using Jott at any time by deleting it. We may end access if these terms are broken.',
      ],
    },
    {
      heading: 'Law',
      body: [
        'These terms are governed by the law of England and Wales. Nothing here limits any right you have as a consumer that cannot be limited by agreement.',
      ],
    },
  ],
};
