/**
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

export const FRIDGEFOX_PRIVACY: LegalDoc = {
  "title": "FridgeFox privacy policy",
  "updated": "2026-08-20",
  "intro": "This is the privacy policy that ships inside FridgeFox, published here as well because the App Store requires a hosted copy. It is the same text, word for word. The German version is the binding one and follows in full below.",
  "sections": [
    {
      "heading": "Controller",
      "body": [
        "Nocte Ventures Ltd 128 City Road, London EC1V 2NX, United Kingdom Registered in England and Wales, Company No. 16579177 Email: hello@nocteventures.com"
      ]
    },
    {
      "heading": "In short",
      "body": [],
      "bullets": [
        "Your data is stored on servers in Frankfurt am Main, Germany (EU).",
        "FridgeFox shows no advertising, sells no data and uses no cross-app tracking.",
        "For product measurement FridgeFox uses PostHog (hosted in the EU). Only the fact THAT something happened is measured — never an item name, a recipe, a receipt photo, and explicitly never an allergy or dietary setting. It can be switched off in Settings → Data (section 5a).",
        "To read receipts and to suggest recipes, FridgeFox uses an AI model through a service provider in the USA (section 5).",
        "Your allergies and dietary preferences are a special category of personal data. They are processed only with your explicit consent and are visible to the members of your household. The app tells you this in both places (onboarding and joining) before you agree."
      ]
    },
    {
      "heading": "What FridgeFox processes",
      "body": [
        "Account (legal basis: performance of a contract, Art. 6(1)(b) GDPR)",
        "Pantry and purchases (performance of a contract)",
        "Dietary preferences and allergies (explicit consent, Art. 9(2)(a) GDPR)",
        "Household (performance of a contract)",
        "Subscription (performance of a contract)",
        "Technically necessary (legitimate interest, Art. 6(1)(f) GDPR)",
        "What FridgeFox does NOT process"
      ],
      "bullets": [
        "Email address and password (the authentication service stores the password only as a hash; we never see it).",
        "Username and display name. The username exists so that others can invite you into their household.",
        "Optionally a profile picture. It is stored in Frankfurt under a random file name and is visible to the members of your household. The address is publicly reachable but not guessable; you can replace or remove the picture at any time.",
        "Optionally a second factor (TOTP). In that case the authentication service holds a secret used to verify your code.",
        "Photographed receipts: the photo is sent to our server, split into individual line items by an AI model and not stored permanently. Only the recognised items are kept (name, category, quantity, price, the receipt text of each line and the printed total).",
        "Items entered by hand or scanned by barcode; for barcodes the article number (EAN) is sent to the free Open Food Facts database (section 6).",
        "How you handle your pantry (eaten, thrown away, \"still good\", quantities, best-before dates you set yourself). The app learns your household's shelf-life estimates from this.",
        "Shopping list, weekly plan, saved recipes and favourites.",
        "Diet (for example vegetarian, halal), allergies and avoided ingredients. You provide them voluntarily during onboarding or later; \"no restrictions\" is always an option. They are used solely to filter recipe suggestions: dishes containing your allergens are removed, not merely flagged.",
        "Visibility in the household: members of your household can see your allergies and diet so that everyone can cook safely. The app points this out before you join. You can change or delete your entries at any time.",
        "Household name, members, invitation codes (valid for seven days). The shared pantry, shopping list, weekly plan, learned shelf lives and favourites belong to the household and are visible to all of its members.",
        "Whether your household has FridgeFox Pro, until when, whether it renews, and the transaction identifier from Apple. Plus a random subscription key per household that lets Apple's notifications be matched to the right household; it contains no personal data itself.",
        "We never see payment data. Purchase, renewal, cancellation and refunds are handled entirely by Apple.",
        "Connection data (IP address, timestamp) occurs when our servers are called, as with any internet service. We do not evaluate it; our hosting provider uses it for operational security.",
        "Counters for AI calls per account and per household (cost and abuse protection, and to show you your remaining quota).",
        "No location, no advertising identifiers, no cross-app tracking, no analytics SDKs, no sharing with ad networks.",
        "Contacts: if you use \"choose from contacts\" when creating a household, the system's contact picker opens. The app receives only the ONE contact you chose (name, phone number) and uses it exclusively on your device to pre-fill a message draft. It is not transmitted to our servers. Only you send the message.",
        "Notifications: the daily reminder is scheduled locally on your device (no push servers); it can be switched off and is only created when something is actually about to expire.",
        "Your settings for appearance, haptics and reminder time stay on the device."
      ]
    },
    {
      "heading": "Where the data is stored",
      "body": [
        "Our database, file storage and server functions run at Supabase (processor), project region Frankfurt am Main, Germany. A data processing agreement with Supabase is in place; it forms part of the Supabase terms (supabase.com/legal/dpa) and incorporates the EU standard contractual clauses.",
        "Separation between households is enforced technically in the database (row level security): no account can read data belonging to another household."
      ]
    },
    {
      "heading": "AI processing (receipts and recipes)",
      "body": [
        "Two features use a language model:",
        "1. Reading a receipt: the photo is passed through our server to the API provider OpenRouter, Inc. (USA) and evaluated there by the model \"Claude\" (Anthropic). Receipts can allow conclusions about shopping behaviour; they do not usually contain your name or contact details. 2. Suggesting recipes: the model receives your pantry summarised by category, your store cupboard, the titles of earlier suggestions and the combined diets and allergies of the selected diners. The latter is necessary so that no dish containing your allergens is suggested, and is covered by your consent under section 3.",
        "The language you use the app in is also transmitted, so that the answer comes back in your language. Nothing else: account data (email, names, profile picture) is never sent to the model.",
        "Transfer to the USA takes place on the basis of the EU standard contractual clauses, which form part of OpenRouter's data processing terms. Only what is described above is transferred. We do not store receipt photos — they are passed on for the duration of the evaluation and discarded afterwards — and we do not use photos or pantry data to train any model."
      ]
    },
    {
      "heading": "5a. Product measurement (PostHog)",
      "body": [
        "So that we can see which parts of the app are actually used, we measure usage with PostHog (PostHog, Inc.), hosted in the European Union and acting for us as a processor. The lawful basis is our legitimate interest in a working product (Art. 6(1)(f) GDPR); you may object at any time.",
        "What is measured is that something happened: a receipt was captured or failed, a recipe round ran, the daily check-in was completed, the purchase sheet was shown, a free limit was reached, a household was created or joined. Alongside that: device model, app version, language and country, and a random identifier.",
        "The content is not measured: no receipt photo, no item name, no recipe title, no household name and — explicitly — no allergy and no dietary setting. That last point is not a matter of interpretation: allergies and diet are special categories under Art. 9 GDPR and do not belong in an analytics tool, not even as a count, because \"has allergies: yes\" would itself be a health statement. Tap-level capture is disabled in the SDK so that text from the screen cannot be swept up by accident.",
        "Switching it off: Settings → Data → \"Share anonymous usage\". The switch stops collection inside the SDK, not merely in the interface.",
        "There is no tracking prompt (ATT), because no cross-app tracking takes place. The current list of every event name lives in a single file in the source (`AnalyticsManager.swift`) — precisely so this promise is checkable."
      ]
    },
    {
      "heading": "Other recipients",
      "body": [],
      "bullets": [
        "Open Food Facts (France, non-profit): when you scan a barcode, the app queries the product database directly with the EAN. Open Food Facts sees your IP address in the process; no account or name is transmitted.",
        "Apple: operating system services (message draft, on-device notifications) and the complete handling of the subscription, in each case under Apple's own terms.",
        "Nobody else. No transfer to ad networks, data brokers or social networks."
      ]
    },
    {
      "heading": "Retention",
      "body": [],
      "bullets": [
        "Account and household data: until you delete your account or the household is deleted.",
        "Receipt photos: only for the duration of the evaluation (not stored).",
        "Invitation codes: seven days.",
        "Booking records for AI calls: at most 48 hours.",
        "Connection data at the hosting provider: according to the periods in its own privacy policy (supabase.com/privacy); we have no access to it."
      ]
    },
    {
      "heading": "Your rights",
      "body": [
        "You have the right of access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), data portability (Art. 20) and objection (Art. 21 GDPR), as well as the right to withdraw consent at any time with effect for the future (Art. 7(3)). Please contact hello@nocteventures.com. You may also lodge a complaint with a data protection supervisory authority — the competent one is the authority of your place of residence, your place of work or the place of the alleged infringement (Art. 77 GDPR). In the United Kingdom that is the Information Commissioner's Office (ico.org.uk).",
        "Deleting your account: in the app under Profile → \"Delete account\". This permanently deletes your account, login, username, display name, profile picture, second factor and your dietary and allergy entries, with no retention period. Household data (pantry, shopping list, weekly plan, learned shelf lives) remains with the household as long as other members use it; if you are the last member, the household and all of its data are deleted with you. The app explains which of the two cases applies before you confirm.",
        "An Apple subscription does not end as a result. Cancel it in the subscription settings of your Apple ID."
      ]
    },
    {
      "heading": "Children",
      "body": [
        "FridgeFox is not directed at children under 16. Registration requires a minimum age of 16."
      ]
    },
    {
      "heading": "Changes",
      "body": [
        "We will adapt this policy when the app or the legal situation changes. The current version is available at https://nocteventures.com/fridgefox/privacy/ and always in the app under Settings → Legal; the app will inform you about material changes."
      ]
    },
    {
      "heading": "Deutsche Fassung (verbindlich)",
      "body": [
        "Die deutsche Fassung ist die verbindliche. Sie folgt hier vollständig und steht ebenso in der App unter Einstellungen → Rechtliches."
      ]
    },
    {
      "heading": "DE — Verantwortlicher",
      "body": [
        "Nocte Ventures Ltd 128 City Road, London EC1V 2NX, Vereinigtes Königreich Registriert in England und Wales, Company No. 16579177 E-Mail: hello@nocteventures.com"
      ]
    },
    {
      "heading": "DE — Kurzfassung",
      "body": [],
      "bullets": [
        "Deine Daten liegen auf Servern in Frankfurt am Main (EU).",
        "FridgeFox zeigt keine Werbung, verkauft keine Daten und setzt kein App-übergreifendes Tracking ein.",
        "Zur Produktmessung nutzt FridgeFox PostHog (EU-Hosting). Gemessen wird nur, DASS etwas passiert ist — nie ein Artikelname, ein Rezept, ein Bon-Foto und ausdrücklich nie eine Allergie oder Ernährungsweise. Abschaltbar in Einstellungen → Daten (Abschnitt 5a).",
        "Für das Auslesen von Kassenbons und für Rezeptvorschläge nutzt FridgeFox ein KI-Modell über einen Dienstleister in den USA (Abschnitt 5).",
        "Deine Allergien und Ernährungsweise sind besonders geschützte Daten. Sie werden nur mit deiner ausdrücklichen Einwilligung verarbeitet und sind für die Mitglieder deines Haushalts sichtbar. Das sagt dir die App an beiden Stellen (Onboarding und Beitritt), bevor du zustimmst."
      ]
    },
    {
      "heading": "DE — Welche Daten FridgeFox verarbeitet",
      "body": [
        "Konto (Rechtsgrundlage: Vertragserfüllung, Art. 6 Abs. 1 b DSGVO)",
        "Vorrat und Einkäufe (Vertragserfüllung)",
        "Ernährungs-Präferenzen und Allergien (ausdrückliche Einwilligung, Art. 9 Abs. 2 a DSGVO)",
        "Haushalt (Vertragserfüllung)",
        "Abo (Vertragserfüllung)",
        "Technisch Notwendiges (berechtigtes Interesse, Art. 6 Abs. 1 f DSGVO)",
        "Was FridgeFox NICHT verarbeitet"
      ],
      "bullets": [
        "E-Mail-Adresse und Passwort (das Passwort speichert der Anmeldedienst nur als Hash, wir sehen es nie).",
        "Benutzername und Anzeigename. Der Benutzername ist dafür da, dass dich andere in ihren Haushalt einladen können.",
        "Optional ein Profilbild. Es liegt in unserem Speicher in Frankfurt unter einem zufälligen Dateinamen und ist für die Mitglieder deines Haushalts sichtbar. Die Adresse ist öffentlich abrufbar, aber nicht erratbar; du kannst das Bild jederzeit ersetzen oder entfernen.",
        "Optional ein zweiter Faktor (TOTP). Dann liegt beim Anmeldedienst ein Geheimnis, mit dem dein Code geprüft wird.",
        "Fotografierte Kassenbons: Das Foto wird zur Auswertung an unseren Server übertragen, dort von einem KI-Modell in einzelne Positionen zerlegt und nicht dauerhaft gespeichert. Gespeichert werden nur die erkannten Positionen (Bezeichnung, Warengruppe, Menge, Preis, der Bon-Textauszug je Zeile und die Endsumme).",
        "Von Hand eingetippte oder per Barcode erfasste Artikel; bei Barcodes wird die Artikelnummer (EAN) an die freie Datenbank Open Food Facts gesendet (Abschnitt 6).",
        "Dein Umgang mit dem Vorrat (aufgegessen, weggeworfen, „noch gut\", Mengen, selbst gesetzte Haltbarkeitsdaten). Daraus lernt die App die Haltbarkeits-Schätzung deines Haushalts.",
        "Einkaufsliste, Wochenplan, gespeicherte Rezepte und Favoriten.",
        "Ernährungsweise (z. B. vegetarisch, halal), Allergien und gemiedene Zutaten. Du gibst sie freiwillig im Onboarding oder später an; „keine Einschränkungen\" ist jederzeit wählbar. Sie dienen ausschließlich dazu, Rezeptvorschläge zu filtern: Gerichte mit deinen Allergenen werden entfernt, nicht markiert.",
        "Sichtbarkeit im Haushalt: Mitglieder deines Haushalts sehen deine Allergien und Ernährungsweise, damit für alle sicher gekocht werden kann. Darauf weist die App vor dem Beitritt hin. Du kannst deine Angaben jederzeit ändern oder löschen.",
        "Haushaltsname, Mitglieder, Einladungscodes (sieben Tage gültig). Der gemeinsame Vorrat, die Einkaufsliste, der Wochenplan, gelernte Haltbarkeiten und Favoriten gehören dem Haushalt und sind für alle Mitglieder sichtbar.",
        "Ob dein Haushalt FridgeFox Pro hat, bis wann, ob es sich verlängert, und die Transaktionskennung von Apple. Dazu ein zufälliger Abo-Schlüssel je Haushalt, mit dem Apples Meldungen dem richtigen Haushalt zugeordnet werden; er enthält selbst keine Personendaten.",
        "Zahlungsdaten sehen wir nie. Kauf, Verlängerung, Kündigung und Erstattung laufen ausschließlich über Apple.",
        "Beim Abruf unserer Server fallen Verbindungsdaten an (IP-Adresse, Zeitpunkt), wie bei jedem Internetdienst. Wir werten sie nicht aus; unser Hosting-Dienstleister nutzt sie zur Betriebssicherheit.",
        "Zähler für KI-Aufrufe je Konto und je Haushalt (Kosten- und Missbrauchsschutz sowie die Anzeige deines Kontingents).",
        "Kein Standort, keine Werbe-IDs, kein App-übergreifendes Tracking, keine Weitergabe an Werbenetzwerke. Es gibt keinen ATT-Dialog, weil nicht getrackt wird.",
        "Die Produktmessung (Abschnitt 5a) erhält keine Allergien, keine Ernährungsweisen, keine Artikelnamen, keine Rezepte und keine Bon-Fotos.",
        "Kontakte: Wenn du beim Haushalt-Gründen „Aus Kontakten wählen\" nutzt, öffnet sich die Kontaktauswahl des Systems. Die App erhält nur den EINEN gewählten Kontakt (Name, Telefonnummer) und verwendet ihn ausschließlich lokal auf deinem Gerät, um einen Nachrichten-Entwurf vorzubefüllen. Er wird nicht an unsere Server übertragen. Gesendet wird die Nachricht nur von dir selbst.",
        "Benachrichtigungen: Die tägliche Erinnerung wird lokal auf deinem Gerät geplant (keine Push-Server); sie ist abschaltbar und wird nur angelegt, wenn wirklich etwas abläuft.",
        "Deine Einstellungen zu Erscheinungsbild, Haptik und Erinnerungszeit bleiben auf dem Gerät."
      ]
    },
    {
      "heading": "DE — Wo die Daten liegen",
      "body": [
        "Unsere Datenbank, der Dateispeicher und die Serverfunktionen laufen bei Supabase (Auftragsverarbeiter), Projekt-Region Frankfurt am Main, Deutschland. Mit Supabase besteht ein Auftragsverarbeitungsvertrag; er ist Teil der Supabase-Vertragsbedingungen (supabase.com/legal/dpa) und schließt die EU-Standardvertragsklauseln ein.",
        "Die Trennung zwischen Haushalten wird technisch in der Datenbank durchgesetzt (Row Level Security): Kein Konto kann Daten eines fremden Haushalts abrufen."
      ]
    },
    {
      "heading": "DE — KI-Auswertung (Bons und Rezepte)",
      "body": [
        "Zwei Funktionen nutzen ein Sprachmodell:",
        "1. Bon auslesen: Das Bon-Foto wird über unseren Server an den API-Dienstleister OpenRouter, Inc. (USA) übermittelt und dort vom Modell „Claude\" (Anthropic) ausgewertet. Kassenbons können Rückschlüsse auf Einkaufsverhalten zulassen; Name oder Kontaktdaten enthalten sie üblicherweise nicht. 2. Rezepte vorschlagen: An das Modell gehen dein zusammengefasster Vorrat (Warengruppen), dein Vorratsschrank, die Titel früherer Vorschläge sowie die vereinigten Ernährungsweisen und Allergien der ausgewählten Mitesser. Letzteres ist nötig, damit keine Gerichte mit euren Allergenen vorgeschlagen werden, und von deiner Einwilligung aus Abschnitt 3 umfasst.",
        "Mit übermittelt wird die Sprache, in der du die App benutzt, damit die Antwort in deiner Sprache kommt. Sonst nichts: Kontodaten (E-Mail, Namen, Profilbild) gehen nie an das Modell.",
        "Übermittlung in die USA: Sie erfolgt auf Grundlage der EU-Standardvertragsklauseln, die Teil der Auftragsverarbeitungsbedingungen von OpenRouter sind. Übermittelt wird ausschließlich, was oben beschrieben ist. Bon-Fotos speichern wir nicht — sie werden für die Dauer der Auswertung weitergegeben und danach verworfen —, und wir verwenden weder Fotos noch Vorratsdaten zum Trainieren von Modellen."
      ]
    },
    {
      "heading": "DE — 5a. Produktmessung (PostHog)",
      "body": [
        "Damit wir sehen, welche Teile der App tatsächlich benutzt werden, messen wir die Nutzung mit PostHog (PostHog, Inc.), gehostet in der Europäischen Union und für uns als Auftragsverarbeiter tätig. Rechtsgrundlage ist unser berechtigtes Interesse an einem funktionierenden Produkt (Art. 6 Abs. 1 lit. f DSGVO); du kannst jederzeit widersprechen.",
        "Gemessen wird, dass etwas passiert ist: Ein Bon wurde erfasst oder es ging schief, eine Rezeptrunde lief, die Kurzabfrage wurde abgeschlossen, die Kauf-Ansicht war offen, eine Free-Grenze wurde erreicht, ein Haushalt wurde gegründet oder betreten. Dazu kommen Gerätemodell, App-Fassung, Sprache und Land sowie eine zufällige Kennung.",
        "Nicht gemessen wird der Inhalt: kein Bon-Foto, kein Artikelname, kein Rezepttitel, kein Haushaltsname und — ausdrücklich — keine Allergie und keine Ernährungsweise. Letzteres ist keine Auslegungsfrage: Allergien und Diät sind besondere Kategorien nach Art. 9 DSGVO und gehören in kein Analyse-Werkzeug, auch nicht als Zählwert, weil schon „hat Allergien: ja\" eine Gesundheitsangabe wäre. Die Erfassung von Tipp-Ereignissen ist im SDK abgeschaltet, damit nicht versehentlich Text vom Bildschirm mitgeht.",
        "Abschalten: Einstellungen → Daten → „Anonyme Nutzung teilen\". Der Schalter beendet die Erhebung im SDK selbst, nicht bloss in der Anzeige.",
        "Es gibt keinen Tracking-Dialog (ATT), weil app-übergreifend nicht getrackt wird. Die jeweils aktuelle Liste aller Ereignisnamen steht im Quellcode in einer einzigen Datei (`AnalyticsManager.swift`) — genau damit diese Zusage prüfbar ist."
      ]
    },
    {
      "heading": "DE — Weitere Empfänger",
      "body": [],
      "bullets": [
        "Open Food Facts (Frankreich, gemeinnützig): Beim Barcode-Scan fragt die App die Produktdatenbank direkt mit der EAN an. Dabei sieht Open Food Facts deine IP-Adresse; ein Konto oder Name wird nicht übermittelt.",
        "Apple: Betriebssystemdienste (Nachrichten-Entwurf, Mitteilungen auf dem Gerät) und die vollständige Abwicklung des Abos, jeweils nach Apples eigenen Bestimmungen.",
        "Sonst niemand. Keine Übermittlung an Werbenetzwerke, Datenhändler oder soziale Netzwerke."
      ]
    },
    {
      "heading": "DE — Speicherdauer",
      "body": [],
      "bullets": [
        "Konto- und Haushaltsdaten: bis zur Löschung deines Kontos bzw. des Haushalts.",
        "Bon-Fotos: nur für die Dauer der Auswertung (nicht gespeichert).",
        "Einladungscodes: sieben Tage.",
        "Buchungsnachweise für KI-Aufrufe: höchstens 48 Stunden.",
        "Verbindungsdaten beim Hosting-Dienstleister: nach den Fristen aus dessen eigener Datenschutzerklärung (supabase.com/privacy); wir haben darauf keinen Zugriff."
      ]
    },
    {
      "heading": "DE — Deine Rechte",
      "body": [
        "Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO) sowie das Recht, eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen (Art. 7 Abs. 3). Wende dich an hello@nocteventures.com. Du kannst dich zudem bei einer Datenschutz-Aufsichtsbehörde beschweren — zuständig ist die Behörde deines Wohnsitzes, deines Arbeitsplatzes oder des Ortes des vermuteten Verstoßes (Art. 77 DSGVO). In Deutschland ist das die Aufsichtsbehörde deines Bundeslandes, im Vereinigten Königreich das Information Commissioner's Office (ico.org.uk).",
        "Konto löschen: in der App unter Profil → „Konto löschen\". Gelöscht werden Konto, Anmeldung, Benutzername, Anzeigename, Profilbild, zweiter Faktor und deine Ernährungs- und Allergie-Angaben, endgültig und ohne Aufbewahrungsfrist. Haushaltsdaten (Vorrat, Einkaufsliste, Wochenplan, gelernte Haltbarkeiten) verbleiben beim Haushalt, solange andere Mitglieder ihn nutzen; bist du das letzte Mitglied, wird der Haushalt mitsamt allen Daten gelöscht. Die App erklärt vor der Bestätigung, welcher der beiden Fälle eintritt.",
        "Ein Apple-Abo endet dadurch nicht. Das kündigst du in den Abo-Einstellungen deiner Apple-ID."
      ]
    },
    {
      "heading": "DE — Kinder",
      "body": [
        "FridgeFox richtet sich nicht an Kinder unter 16 Jahren. Für die Registrierung ist ein Mindestalter von 16 Jahren erforderlich."
      ]
    },
    {
      "heading": "DE — Änderungen",
      "body": [
        "Wir passen diese Erklärung an, wenn sich die App oder die Rechtslage ändert. Die jeweils aktuelle Fassung steht unter https://nocteventures.com/fridgefox/privacy/ und immer in der App unter Einstellungen → Rechtliches; über wesentliche Änderungen informiert die App."
      ]
    }
  ]
};

export const FRIDGEFOX_TERMS: LegalDoc = {
  "title": "FridgeFox terms of use",
  "updated": "2026-08-20",
  "intro": "These are the terms that ship inside FridgeFox, published here as well. It is the same text, word for word. The German version is the binding one and follows in full below.",
  "sections": [
    {
      "heading": "Scope and provider",
      "body": [
        "These terms apply to the use of the iOS app \"FridgeFox\" by Nocte Ventures Ltd, 128 City Road, London EC1V 2NX, United Kingdom (\"we\"). By registering you agree to them. Our privacy policy also applies; you will find it in the app under Settings → Legal."
      ]
    },
    {
      "heading": "What FridgeFox is",
      "body": [
        "FridgeFox reads photographed receipts, keeps a household pantry with estimated shelf lives from them and suggests recipes based on what you have. The core features are free (\"Free\", clause 2a); extended features are available as a subscription (\"FridgeFox Pro\", clause 2b). Our principles: prices are per household, limits are shown before you reach them, and features you already use are never locked away afterwards."
      ]
    },
    {
      "heading": "2a. Free: what is included",
      "body": [
        "Free contains the full loop of the app. The two features that cost us money per use (AI reading of receipt photos and generating recipe suggestions) are limited per household and calendar month: currently 5 receipt scans and 15 recipe rounds. The app shows the applicable numbers before you reach a limit. The counter resets on the first of the month (German time). Failed calls do not count. Manual entry, barcode lookup, shopping list, weekly plan (by hand), the daily check-in, favourites and invitations are unlimited and will remain so."
      ]
    },
    {
      "heading": "2b. FridgeFox Pro (subscription)",
      "body": [],
      "bullets": [
        "What you get: Pro removes the monthly limits from clause 2a and includes additional convenience features (currently the automatic filling of free days in the weekly plan). Instead of a monthly limit, a fair use limit of 300 receipt scans and 600 recipe rounds per household and calendar month applies. It protects against automated abuse and is far above normal use; the app shows it before you buy.",
        "One purchase per household: the subscription applies to all members of the household in which the purchase was matched. Apple Family Sharing is disabled; the household inside the app is the sharing model.",
        "Purchase, price, term: the purchase is an auto-renewable subscription through your Apple ID; price and term (monthly or yearly) are shown in the purchase screen and in App Store Connect. The subscription renews automatically unless cancelled at least 24 hours before the end of the current period in the subscription settings of your Apple ID. Cancellation, refunds and payment are handled exclusively by Apple.",
        "Restoring: on a second device or after reinstalling, retrieve your subscription through Settings → App → \"Restore purchases\".",
        "Changing account or household: deleting your FridgeFox account does NOT end your Apple subscription; cancel it with Apple as well. Pro status stays with the household it was bought for, for as long as the Apple subscription runs.",
        "After it ends: when Pro ends, Free (clause 2a) applies again. Everything you have already captured stays fully visible and usable; only new AI calls count against the Free limits again."
      ]
    },
    {
      "heading": "Important: estimates and AI results",
      "body": [],
      "bullets": [
        "Shelf lives are estimates. They are based on your household's experience and on a table, not on the best-before date printed on the packaging. When deciding whether to eat something, rely on how it looks and smells and on the printed date, not on the app alone. Expired entries are never deleted automatically, only made visible.",
        "Receipt recognition can be wrong. The app checks the recognised items against the printed total and shows any discrepancy. Please still check what you take over.",
        "Recipes and allergies: the app removes suggestions that conflict with the allergies you entered, not only through the AI instruction but also through a deliberately generous check in our own code. It is still no substitute for checking the ingredients yourself, especially with severe allergies. Read the ingredient lists of the products you actually use.",
        "Translated content: recipe titles, cooking steps and product names are generated by the model in your language. That, too, is machine output and can contain mistakes."
      ]
    },
    {
      "heading": "Account and household",
      "body": [],
      "bullets": [
        "You need an account to use the app (email, password, username). Keep your credentials secret; you are responsible for activity through your account. Minimum age: 16.",
        "An account belongs to at most one household. Membership means shared access to the pantry, shopping list, weekly plan and favourites, and mutual visibility of diet and allergies. You only ever join a household yourself, through an invitation; nobody is added silently.",
        "Only invite people who have agreed to it, and do not enter third parties' data without their knowledge."
      ]
    },
    {
      "heading": "Acceptable use",
      "body": [
        "The following are not permitted in particular: circumventing the separation between households, spying on other households, automated mass creation of accounts or requests (the app contains daily and monthly limits for AI calls), and posting unlawful content through free-text fields. We may suspend or delete accounts in case of violations."
      ]
    },
    {
      "heading": "Availability and changes",
      "body": [
        "We aim for continuous availability but do not owe it; maintenance, further development and outages at third parties (hosting, AI service, Open Food Facts) can restrict the service. We may develop the app further and change features as long as its core is preserved (clause 2, third sentence, remains unaffected)."
      ]
    },
    {
      "heading": "Termination",
      "body": [
        "You can delete your account in the app at any time (Profile → \"Delete account\"); these terms end with it. Household data that other members continue to use (shared pantry, learned shelf lives) remains with the household; your personal data (account, preferences, allergies) is deleted. A running Apple subscription does not end as a result."
      ]
    },
    {
      "heading": "Liability",
      "body": [
        "We are liable without limitation for intent and gross negligence and for injury to life, body or health. In cases of simple negligence we are liable only for breach of material contractual obligations, limited to the foreseeable damage typical for this type of contract. Clause 3 remains unaffected: the app provides estimates and suggestions; the decision about eating and preparing food is yours."
      ]
    },
    {
      "heading": "Final provisions",
      "body": [
        "German law applies, excluding the UN Convention on Contracts for the International Sale of Goods; mandatory consumer protection provisions of your country of residence remain unaffected. Should individual provisions be invalid, the remainder stays in force. The app will announce changes to these terms; if you do not object within six weeks, they are deemed accepted. We will inform you about this right to object when announcing them.",
        "Legal notice under § 5 DDG: Nocte Ventures Ltd, 128 City Road, London EC1V 2NX, United Kingdom, Company No. 16579177, email hello@nocteventures.com. Also available at https://nocteventures.com/fridgefox/terms/."
      ]
    },
    {
      "heading": "Deutsche Fassung (verbindlich)",
      "body": [
        "Die deutsche Fassung ist die verbindliche. Sie folgt hier vollständig und steht ebenso in der App unter Einstellungen → Rechtliches."
      ]
    },
    {
      "heading": "DE — Geltungsbereich und Anbieter",
      "body": [
        "Diese Bedingungen gelten für die Nutzung der iOS-App „FridgeFox\" von Nocte Ventures Ltd, 128 City Road, London EC1V 2NX, Vereinigtes Königreich („wir\"). Mit der Registrierung stimmst du ihnen zu. Es gilt außerdem die Datenschutzerklärung, die du in der App unter Einstellungen → Rechtliches findest."
      ]
    },
    {
      "heading": "DE — Was FridgeFox ist",
      "body": [
        "FridgeFox liest fotografierte Kassenbons aus, führt daraus einen Haushaltsvorrat mit geschätzten Haltbarkeiten und schlägt Rezepte aus dem vor, was da ist. Die Grundfunktionen sind kostenlos („Free\", Absatz 2a); erweiterte Funktionen gibt es als Abo („FridgeFox Pro\", Absatz 2b). Es gilt: Preise gelten je Haushalt, Grenzen werden vorher sichtbar gemacht, und Funktionen, die du bereits nutzt, werden nicht nachträglich weggesperrt."
      ]
    },
    {
      "heading": "DE — 2a. Free: der kostenlose Umfang",
      "body": [
        "Free enthält den vollen Kreislauf der App. Die beiden Funktionen, die bei uns je Nutzung Kosten auslösen (das KI-Auslesen von Bon-Fotos und das Erzeugen von Rezeptvorschlägen), sind je Haushalt und Kalendermonat begrenzt: derzeit 5 Bon-Scans und 15 Rezept-Runden; die jeweils gültigen Zahlen zeigt die App an, bevor du eine Grenze erreichst. Der Zähler beginnt am Monatsersten (deutsche Zeit) neu. Fehlgeschlagene Aufrufe zählen nicht. Manuelles Eintragen, Barcode-Abfrage, Einkaufsliste, Wochenplan (von Hand), Kurzabfrage, Favoriten und Einladungen sind unbegrenzt und bleiben es."
      ]
    },
    {
      "heading": "DE — 2b. FridgeFox Pro (Abo)",
      "body": [],
      "bullets": [
        "Leistung: Pro hebt die Monatsgrenzen aus Absatz 2a auf und enthält zusätzliche Komfortfunktionen (derzeit das automatische Füllen freier Wochenplan-Tage). Statt eines Monatslimits gilt eine Fair-Use-Grenze von 300 Bon-Scans und 600 Rezept-Runden je Haushalt und Kalendermonat. Sie schützt vor automatisiertem Missbrauch und liegt weit über üblicher Nutzung; die App zeigt sie vor dem Kauf an.",
        "Ein Kauf je Haushalt: Das Abo gilt für alle Mitglieder des Haushalts, in dem der Kauf abgeglichen wurde. Family Sharing von Apple ist deaktiviert; der Haushalt in der App ist das Teilungsmodell.",
        "Abschluss, Preis, Laufzeit: Der Kauf läuft als Auto-Renewable Subscription über deine Apple-ID; Preis und Laufzeit (Monat oder Jahr) stehen in der Kaufansicht und in App Store Connect. Das Abo verlängert sich automatisch, bis es spätestens 24 Stunden vor Ablauf in den Abo-Einstellungen der Apple-ID gekündigt wird. Kündigung, Erstattungen und Zahlungsabwicklung laufen ausschließlich über Apple.",
        "Wiederherstellen: Auf einem zweiten Gerät oder nach einer Neuinstallation holst du dein Abo über Einstellungen → App → „Käufe wiederherstellen\" zurück.",
        "Konto- oder Haushaltswechsel: Das Löschen deines FridgeFox-Kontos beendet dein Apple-Abo NICHT; kündige es zusätzlich bei Apple. Der Pro-Status verbleibt beim Haushalt, für den gekauft wurde, solange das Apple-Abo läuft.",
        "Nach Ablauf: Endet Pro, gilt wieder Free (Absatz 2a). Bereits Erfasstes bleibt vollständig sichtbar und nutzbar; nur neue KI-Aufrufe zählen wieder gegen die Free-Grenzen."
      ]
    },
    {
      "heading": "DE — Wichtig: Schätzungen und KI-Ergebnisse",
      "body": [],
      "bullets": [
        "Haltbarkeiten sind Schätzungen. Sie beruhen auf Erfahrungswerten und einer Tabelle, nicht auf dem Mindesthaltbarkeitsdatum der Packung. Verlass dich beim Verzehr auf Aussehen, Geruch und das aufgedruckte Datum, nicht allein auf die App. Abgelaufene Einträge werden nie automatisch gelöscht, sondern nur sichtbar gemacht.",
        "Bon-Erkennung kann irren. Die App prüft die erkannten Positionen gegen die gedruckte Endsumme und zeigt Abweichungen an; kontrolliere die Übernahme trotzdem.",
        "Rezepte und Allergien: Die App entfernt Vorschläge, die deinen eingetragenen Allergien widersprechen, zusätzlich zur KI-Anweisung auch durch eine eigene Prüfung im Code, bewusst großzügig. Sie ist trotzdem kein Ersatz für deine eigene Kontrolle der Zutaten, insbesondere bei schweren Allergien. Prüfe Zutatenlisten der tatsächlich verwendeten Produkte selbst.",
        "Übersetzte Inhalte: Rezepttitel, Zubereitungsschritte und Produktbezeichnungen erzeugt das Modell in deiner Sprache. Auch das ist eine maschinelle Ausgabe und kann Fehler enthalten."
      ]
    },
    {
      "heading": "DE — Konto und Haushalt",
      "body": [],
      "bullets": [
        "Für die Nutzung brauchst du ein Konto (E-Mail, Passwort, Benutzername). Halte deine Zugangsdaten geheim; du bist für Aktivitäten über dein Konto verantwortlich. Mindestalter: 16 Jahre.",
        "Ein Konto gehört zu höchstens einem Haushalt. Mitgliedschaft im Haushalt bedeutet: gemeinsamer Zugriff auf Vorrat, Einkaufsliste, Wochenplan und Favoriten sowie gegenseitige Sichtbarkeit von Ernährungsweise und Allergien. Einem Haushalt trittst du nur selbst über eine Einladung bei; niemand wird still hinzugefügt.",
        "Lade nur Personen ein, deren Einverständnis du hast, und trage keine Daten Dritter ohne deren Wissen ein."
      ]
    },
    {
      "heading": "DE — Zulässige Nutzung",
      "body": [
        "Unzulässig sind insbesondere: Umgehung der Zugriffstrennung, Ausspähen fremder Haushalte, automatisiertes Massen-Anlegen von Konten oder Anfragen (die App enthält Tages- und Monatsgrenzen für KI-Aufrufe), Einstellen rechtswidriger Inhalte über Freitextfelder. Bei Verstößen können wir Konten sperren oder löschen."
      ]
    },
    {
      "heading": "DE — Verfügbarkeit und Änderungen",
      "body": [
        "Wir bemühen uns um durchgehende Verfügbarkeit, schulden sie aber nicht; Wartung, Weiterentwicklung und Störungen von Drittanbietern (Hosting, KI-Dienst, Open Food Facts) können den Dienst einschränken. Wir dürfen die App weiterentwickeln und Funktionen ändern, solange ihr Kern erhalten bleibt (Absatz 2 Satz 3 bleibt unberührt)."
      ]
    },
    {
      "heading": "DE — Beendigung",
      "body": [
        "Du kannst dein Konto jederzeit in der App löschen (Profil → „Konto löschen\"); damit enden diese Bedingungen. Daten des Haushalts, die andere Mitglieder weiter nutzen (gemeinsamer Vorrat, gelernte Haltbarkeiten), bleiben dem Haushalt erhalten; deine persönlichen Daten (Konto, Präferenzen, Allergien) werden gelöscht. Ein laufendes Apple-Abo endet dadurch nicht."
      ]
    },
    {
      "heading": "DE — Haftung",
      "body": [
        "Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie bei Verletzung von Leben, Körper und Gesundheit. Bei einfacher Fahrlässigkeit haften wir nur für die Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), begrenzt auf den vorhersehbaren, vertragstypischen Schaden. Absatz 3 bleibt unberührt: Die App liefert Schätzungen und Vorschläge; die Entscheidung über Verzehr und Zubereitung triffst du."
      ]
    },
    {
      "heading": "DE — Schlussbestimmungen",
      "body": [
        "Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts; zwingende Verbraucherschutzvorschriften deines Aufenthaltsstaats bleiben unberührt. Sollten einzelne Bestimmungen unwirksam sein, bleibt der Rest wirksam. Änderungen dieser Bedingungen zeigt die App an; widersprichst du nicht innerhalb von sechs Wochen, gelten sie als angenommen. Über dieses Widerspruchsrecht informieren wir bei der Ankündigung.",
        "Anbieterkennzeichnung nach § 5 DDG: Nocte Ventures Ltd, 128 City Road, London EC1V 2NX, Vereinigtes Königreich, Company No. 16579177, E-Mail hello@nocteventures.com. Auch unter https://nocteventures.com/fridgefox/terms/ abrufbar."
      ]
    }
  ]
};
