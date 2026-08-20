/**
 * ── Callback AI — hosted privacy policy and terms ────────────────────────
 *
 * App Store Connect requires a **hosted** privacy policy URL; the copy inside
 * the app is not enough on its own, and App Review does read the page. These
 * two documents are the hosted halves of `LegalView.swift` in ~/code/callback.
 *
 * ⚠️ Keep this file and `Callback/Features/Legal/LegalView.swift` saying the
 * same thing. They are two renderings of one policy, and a reviewer comparing
 * them is a realistic scenario. If you change what the app does — add
 * analytics, a crash reporter, a cloud tutor — change both in the same sitting,
 * along with the App Privacy answers in App Store Connect.
 *
 * NOTE: written to describe what the code actually does. Have it checked by a
 * solicitor before relying on it, and bump `updated` whenever it changes.
 */

import type { LegalDoc } from './legal';

export const CALLBACK_PRIVACY: LegalDoc = {
  title: 'Callback AI privacy policy',
  updated: '2026-08-20',
  intro:
    'What you study in Callback stays on your iPhone. Two things do leave it, both because they cannot work otherwise — signing in, if you choose to, and your subscription. Both are described below. There is no analytics, no advertising and no tracking anywhere in the app.',
  sections: [
    {
      heading: 'Who we are',
      body: [
        'Nocte Ventures Ltd, registered in England, Company No. 16579177, is the data controller for Callback AI. You can reach us at hello@nocteventures.com about anything in this policy.',
      ],
    },
    {
      heading: 'What stays on your device',
      body: [
        'Your name, role, interview date, self-rated level, every answer you give, your streak, saved questions and all history are written to a single file in the app’s own storage on your iPhone. None of it is uploaded — not to us, not to anyone.',
        'Deleting the app deletes all of it. “Reset all progress” in Settings erases it on demand.',
      ],
    },
    {
      heading: 'The AI tutor',
      body: [
        'The tutor runs entirely on your iPhone using Apple’s on-device foundation model. There is no API key and no server involved. What you type — including anything you paste from your CV or your own draft answers — is not transmitted anywhere, and is not used to train any model.',
      ],
    },
    {
      heading: 'The microphone',
      body: [
        'A mock interview can be answered out loud. While you are answering, audio goes from the microphone to Apple’s on-device speech recogniser and nowhere else. It is not written to disk and not kept: the moment your words have been turned into text, the audio is gone.',
        'The text is stored with the rest of your progress on the device, and it is marked by the same on-device model described above. Callback never opens the microphone outside a spoken mock round, and you can answer by tapping instead at any time.',
      ],
    },
    {
      heading: 'Signing in, if you choose to',
      body: [
        'An account is optional. Every part of the app works without one, and we will never require one in order to study.',
        'If you sign in with Apple, Apple tells us an identifier for you and — only the first time, and only if you allow it — your name and email address. Apple’s Hide My Email gives us a relay address instead of your real one, and that works perfectly well here. If you sign in with Google, Google tells us the same three things after you approve the request.',
        'That is all we receive. The identifier is kept in your device’s Keychain and used as the key your subscription hangs off. Your name and email, if we were given them, are shown on the account screen so you can see who is signed in. No answer, score, streak or tutor conversation is ever attached to your account or uploaded.',
        'You can sign out at any time, and “Delete account” in Settings → Account deletes the account itself: your sign-in with us is revoked and the subscription record described below is deleted. Study progress on the device is deliberately left alone, so deleting an account does not wipe weeks of work.',
      ],
    },
    {
      heading: 'Subscriptions',
      body: [
        'Payment is handled entirely by Apple. We never see your card, your billing address or your Apple Account.',
        'Whether Callback Pro is active is kept in sync by RevenueCat, Inc. (United States), acting for us as a processor. It receives an app user identifier — either the identifier described above or, if you have not signed in, a random one generated on your device — together with the signed receipt of the purchase from Apple and the basic technical details that accompany any such request, such as your country, device model and app version.',
        'RevenueCat does not receive your name, your email address, or anything you have studied. Because it is in the United States, that transfer relies on the European Commission’s standard contractual clauses. Their own privacy policy is at revenuecat.com/privacy.',
      ],
    },
    {
      heading: 'What uses the network',
      body: [
        'The Markets tab fetches public data from primary sources only, so that nothing shown in the app depends on a commercial data licence:',
      ],
      bullets: [
        'The European Central Bank (data-api.ecb.europa.eu) and Frankfurter (api.frankfurter.dev) — policy rates and exchange rates.',
        'The Deutsche Bundesbank, the US Treasury and the Federal Reserve Bank of New York — government yields and reference rates.',
        'The Federal Reserve Board and the ECB — press releases.',
        'The US Securities and Exchange Commission’s EDGAR system — live merger and tender-offer filings.',
      ],
    },
    {
      heading: 'What those requests reveal',
      body: [
        'They are plain read requests that carry no identifier of you or your device beyond what any web request necessarily reveals to the host it reaches, such as its IP address. Results are cached on the device so the tab still works offline. Opening an item hands the link to Safari, at which point that publisher’s own privacy policy applies.',
        'Signing in contacts Apple or Google. The subscription check contacts RevenueCat. Neither happens unless you sign in or open the paywall.',
        'The first spoken answer needs a network once: iOS downloads the speech recognition model for your language from Apple. That download is made by the system rather than by Callback, and once it is done, spoken answers work offline like everything else.',
        'Every other part of the app works with no network at all.',
      ],
    },
    {
      heading: 'No tracking',
      body: [
        'There is no analytics SDK, no advertising identifier, no crash reporter and no third-party tracker in Callback. Nothing you do in the app is profiled, used to target advertising, or sold — to anyone, ever. RevenueCat is used for subscriptions and for nothing else.',
      ],
    },
    {
      heading: 'Children',
      body: [
        'Callback is made for adults preparing for professional interviews. It is not directed at children under 13, and we do not knowingly collect information from them.',
      ],
    },
    {
      heading: 'Your rights',
      body: [
        'Almost everything is already in your hands: your study data is on your device, and Settings can erase it. The only personal data we hold elsewhere is the account identifier and the subscription record described above, and “Delete account” removes both without needing to ask us.',
        'If you would rather we did it, or you want a copy of what we hold, or you object to any of it, write to hello@nocteventures.com and we will answer within one month. You also have the right to complain to your local data protection authority; in the UK that is the Information Commissioner’s Office.',
      ],
    },
  ],
};

export const CALLBACK_TERMS: LegalDoc = {
  title: 'Callback AI terms of use',
  updated: '2026-08-20',
  intro:
    'Callback AI is a study app for finance interview preparation, published by Nocte Ventures Ltd. By using it you agree to what follows.',
  sections: [
    {
      heading: 'What you get',
      body: [
        'A licence to use Callback on devices you own, for your own preparation. The questions, explanations, drills and interviewer notes are our original work — every one of them written from scratch for this app.',
        'You may not copy, republish, resell or redistribute that content, use it to build a competing product, or use it as training data for a model.',
      ],
    },
    {
      heading: 'Subscriptions',
      body: [
        'Callback Pro is an auto-renewing subscription billed through your Apple Account. It renews at the end of each period unless you cancel at least 24 hours before that. Manage or cancel it in iOS Settings → Apple Account → Subscriptions.',
        'The free tier is a usable product in its own right: the top areas for your target role, fit questions, brainteasers and practice drills. Pro adds depth — every area, timed tests with a scored report, mock rounds and the full plan. Nothing is ever gated behind grinding through material you already know.',
        'Refunds are handled by Apple, not by us. Apple’s terms govern the payment itself.',
      ],
    },
    {
      heading: 'Your account',
      body: [
        'You can use Callback without an account. If you choose to sign in with Apple or Google, that account exists for one purpose: to tie a Pro subscription to you rather than to one handset.',
        'Keep your sign-in to yourself. A subscription is for one person, and sharing an account in order to share Pro is a breach of these terms.',
      ],
    },
    {
      heading: 'No guarantee of an outcome',
      body: [
        'Callback prepares you for interviews. It does not promise you an interview, an offer, or that any particular question will come up.',
        'Nothing in the app is financial, investment, legal or career advice. The market data shown is for study only and must never be used for a real decision.',
      ],
    },
    {
      heading: 'Accuracy',
      body: [
        'We write and check every question ourselves, and correct errors when we find them. Even so, the content is provided as-is: markets, standards and conventions change, and you should verify anything you intend to state as fact in an interview.',
        'The market data and filings shown come from central banks, finance ministries and regulators. We pass them through without alteration and cannot warrant their accuracy or availability.',
      ],
    },
    {
      heading: 'Ending it',
      body: [
        'You can stop using Callback at any time by deleting it, which removes everything stored on your device. If you signed in, “Delete account” in Settings → Account removes the account itself; cancelling a subscription is separate and is done in iOS Settings.',
        'We may end access if the terms above are broken.',
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
