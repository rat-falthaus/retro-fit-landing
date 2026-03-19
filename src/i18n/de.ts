/**
 * Static German locale for SmartHarvest / Rex-AT Reto-Fit Thüringen.
 * Single-language, no runtime switching — import directly in each component.
 * All user-facing text lives here. No hardcoded strings in templates.
 */
export const t = {
  seo: {
    title: 'Retrofit Thüringen | Maschinenmodernisierung vom Experten – Rex Automatisierungstechnik GmbH',
    description:
      'Rex Automatisierungstechnik GmbH modernisiert Ihre Produktionsmaschinen in Thüringen – nachhaltig, zuverlässig und ohne Neukauf. Jetzt kostenlosen 2.000 € Retrofit-Check sichern!',
    keywords:
      'Retrofit, Retro-Fit, Maschinenmodernisierung, Thüringen, Erfurt, Rex Automatisierungstechnik GmbH, Produktionsmaschinen, Automatisierung, Elektrotechnik, Maschinenreparatur, Nachhaltigkeit, Industrieautomation, SPS-Programmierung, Schaltschrankbau, Anlagenmodernisierung',
    ogTitle: 'Retrofit Thüringen | Maschine modernisieren – Rex Automatisierungstechnik GmbH',
    ogDescription:
      'Häufige Maschinenausfälle? Mit einem Retrofit von Rex Automatisierungstechnik GmbH modernisieren wir Ihre Anlagen – effizient, nachhaltig und ohne Neukauf. 2.000 € Gutschein sichern!',
    twitterTitle: 'Retrofit Thüringen – Maschinenmodernisierung | Rex Automatisierungstechnik GmbH',
    twitterDescription:
      'Produktionsmaschinen modernisieren statt ersetzen. Rex Automatisierungstechnik GmbH in Erfurt: über 35 Jahre Erfahrung in Automatisierung & Elektrotechnik. Jetzt 2.000 € Gutschein sichern.',
    canonical: 'https://rex-at.de/landingpage-retrofit.html',
  },

  hero: {
    headline: 'Maschine modernisieren.',
    headlineAccent: 'Bewährte Technik erhalten.',
    subheadline:
      'Häufige Ausfälle, ständige Reparaturen oder unzuverlässige Laufzeiten? Ihre Maschinen brauchen keinen Austausch – sie brauchen ein Retrofit.',
    ctaPrimary: 'Jetzt 2.000 € Gutschein sichern',
    ctaSecondary: 'Referenz',
    referenceUrl: 'https://rex-at.de/files/medien/loesungen/AGG%20Kerspleben/RexAT%20L%C3%B6sung%20AGG%20Kerspleben.pdf',
    sliderLabel: 'Vorher / Nachher',
    sliderBefore: 'Vorher',
    sliderAfter: 'Nachher',
    stampLabel: 'RETROFITTED',
    sliderHint: 'Schieben zum Vergleichen',
    trustItems: [
      'Nachhaltig und ressourcenschonend',
      'Bewährte Maschinen – moderne Technik',
      'Über 35 Jahre Erfahrung in Thüringen',
      'Experten für Automatisierung und Elektrotechnik',
      'Analyse, Planung und Umsetzung aus einer Hand',
    ] as const,
    imageAltBefore: 'Produktionsmaschine vor dem Retrofit',
    imageAltAfter: 'Produktionsmaschine nach dem Retrofit',
    mobileHeadline: 'Ihre Maschine.',
    mobileHeadlineAccent: 'Neu gedacht.',
    mobileSubline: 'Scrollen & den Unterschied erleben',
    scrollHint: 'Weiter scrollen',
  },

  stats: {
    yearsValue: '35+',
    yearsLabel: 'Jahre Erfahrung',
    projectsValue: '500+',
    projectsLabel: 'Projekte',
    savingsValue: '40%',
    savingsLabel: 'Einsparung',
    uptimeValue: '99,2%',
    uptimeLabel: 'Verfügbarkeit',
  },

  postcard: {
    received: 'Sie haben unsere Postkarte erhalten!',
    hook: 'Ihre Maschine hat angerufen – sie wäre bereit für ein Retrofit.',
    bridgeText:
      'Machen Sie jetzt den <strong class="text-forest-green">Retrofit-Check</strong> und sprechen Sie mit unseren Experten. Sichern Sie sich dabei Ihren <strong class="text-industrial-amber">2.000 € Retrofit-Gutschein</strong>.',
    mobileHighlight: 'Modernisieren statt ersetzen — günstiger, schneller, nachhaltiger.',
  },

  modal: {
    title: 'Jetzt Retrofit-Check starten',
    subtitle: '2.000 € Gutschein – Ohne Verpflichtung',

    // Section 1 — Contact
    sectionContact: 'Ihre Kontaktdaten',
    name: 'Name Ansprechpartner',
    namePlaceholder: 'Max Mustermann',
    email: 'E-Mail-Adresse',
    emailPlaceholder: 'max@beispiel.de',
    phone: 'Telefonnummer',
    phonePlaceholder: '+49 36203 9591-0',

    // Section 2 — Machine
    sectionMachine: 'Angaben zur Anlage',
    machineType: 'Anlagenname / Anlagentyp',
    machineTypePlaceholder: 'z.B. Abfüllanlage XY-200',
    machineAge: 'Alter der Anlage',
    machineAgeOptions: [
      { label: 'jünger als 10 Jahre', value: 'juenger als 10' },
      { label: '10 – 20 Jahre', value: '10-20' },
      { label: 'älter als 20 Jahre', value: 'aelter als 20' },
    ] as const,
    servicePartner: 'Gibt es Service- oder Supportpartner?',
    servicePartnerOptions: [
      { label: 'Ja', value: 'ja' },
      { label: 'Nein', value: 'nein' },
    ] as const,
    spareParts: 'Gibt es Ersatzteile?',
    sparePartsOptions: [
      { label: 'Ja', value: 'ja' },
      { label: 'Nein', value: 'nein' },
      { label: 'Unbekannt', value: 'unbekannt' },
    ] as const,
    recentIssues: 'Gab es Störungen in den letzten 2 Jahren?',
    recentIssuesOptions: [
      { label: 'Ja', value: 'ja' },
      { label: 'Nein', value: 'nein' },
    ] as const,
    machineDocs: 'Vorhandene Unterlagen (optional)',
    machineDocsOptions: [
      { label: 'Betriebsanleitung', value: 'manual' },
      { label: 'Schaltplan', value: 'circuit' },
      { label: 'Softwarebeschreibung', value: 'software_desc' },
      { label: 'Softwarequellen', value: 'software_src' },
    ] as const,

    // Section 3 — Optional
    sectionOptional: 'Weitere Angaben (optional)',
    companyName: 'Name der Firma',
    companyNamePlaceholder: 'Musterfirma GmbH',
    companyAddress: 'Adresse der Firma',
    companyAddressPlaceholder: 'Musterstraße 1, 12345 Musterstadt',
    notes: 'Weitere Angaben / Kommentare',
    notesPlaceholder: 'Erzählen Sie uns mehr zu Ihrer Anlage oder Ihren spezifischen Anforderungen …',

    submit: 'Retrofit-Check absenden →',
    privacyNote:
      'Ihre Daten werden direkt an REX Automatisierungstechnik GmbH übermittelt. Keine Weitergabe an Dritte.',
    required: 'Pflichtfeld',

    // Step 2 — Redirected state
    openedTitle: 'Formular wird übermittelt!',
    openedText:
      'Das vollständige Retrofit-Formular wurde in einem neuen Tab geöffnet und Ihre Angaben automatisch übertragen. Falls das Formular nicht automatisch abgesendet wurde, klicken Sie dort bitte auf „Absenden".',
    openedFallback: 'Falls kein Tab geöffnet wurde:',
    openedFallbackLink: 'Retrofit-Check direkt öffnen →',
    openedClose: 'Schließen',

    validationToastTitle: 'Bitte alle Pflichtfelder ausfüllen',
    validationToastDetail: 'Einige erforderliche Felder sind noch nicht vollständig ausgefüllt.',

    // Wizard step labels (desktop dialog)
    dialogStep1Label: 'Ihre Anlage',
    dialogStep2Label: 'Kontakt & Details',
    dialogStepNext: 'Weiter',
    dialogStepBack: 'Zurück',
  },

  inlineForm: {
    title: 'Jetzt Retrofit-Check starten',
    subtitle: 'Füllen Sie das Formular aus – unsere Experten melden sich bei Ihnen.',
    successTitle: 'Formular wird übermittelt!',
    successText: 'Ihre Daten werden direkt an REX Automatisierungstechnik GmbH übertragen. Wir melden uns schnellstmöglich. Vielen Dank!',
    stepLabels: ['Kontakt', 'Maschine', 'Details'] as const,
  },

  footer: {
    brandName: 'REX Automatisierungstechnik GmbH',
    description:
      'Wir bringen Ihre Produktionsmaschinen wieder auf Vordermann. Nachhaltig, ohne Neukauf.',
    tagline: 'Maschine modernisieren. Bewährte Technik erhalten.',
    sections: {
      company: 'Unternehmen',
      support: 'Support',
      legal: 'Rechtliches',
    },
    links: {
      company: [
        { label: 'Über uns', href: 'https://www.rex-at.de' },
        { label: 'Unsere Leistungen', href: 'https://www.rex-at.de' },
        { label: 'Referenzen', href: 'https://www.rex-at.de' },
        { label: 'Karriere', href: 'https://www.rex-at.de' },
      ],
      support: [
        { label: 'Kontakt', href: 'mailto:info@rex-at.de' },
        { label: 'FAQ', href: 'https://www.rex-at.de' },
        { label: 'Technischer Support', href: 'https://www.rex-at.de' },
      ],
      legal: [
        { label: 'Datenschutz', href: 'https://rex-at.de/datenschutz.html' },
        { label: 'Impressum', href: 'https://rex-at.de/impressum.html' },
        { label: 'AGB', href: 'https://rex-at.de/allgemeine-geschaeftsbedingungen.html' },
      ],
    },
    contact: {
      company: 'REX Automatisierungstechnik GmbH',
      street: 'Fichtenweg 36',
      city: '99098 Erfurt',
      phone: '036208 666-0',
      email: 'info@rex-at.de',
    },
    certifiedTitle: 'Zertifiziert & Konform',
    certifications: [
      'CE-konform',
      'Nachhaltigkeitspartner',
      'Langjährige Erfahrung',
    ],
    copyright: (year: number) => `© ${year} Rex Automatisierungstechnik GmbH. Alle Rechte vorbehalten.`,
    madeWith: 'Mit ❤️ für Betriebe, die auf Nachhaltigkeit setzen',
    disclaimer:
      'Der Gutschein ist nicht übertragbar, nicht in bar auszahlbar und nur gültig für Retrofit-Dienstleistungen von REX Automatisierungstechnik GmbH. Nicht kombinierbar mit anderen Angeboten. Einlösbar bis zum 30.04.2026. Weitere Bedingungen auf Anfrage.',
    disclaimerToggle: 'Rechtliche Hinweise ▸',
    surveyUrl: 'https://rex-at.de/landingpage-retrofit.html',
    voucherCta: 'Retrofit-Check',
    voucherAmount: '2.000 €',
    voucherExpiry: 'Einlösbar bis zum 30.04.2026',
    voucherName: 'Retrofit-Gutschein',
  },
  nav: {
    homeUrl: 'https://rex-at.de/willkommen.html',
    menuToggle: 'Menü öffnen',
    menuClose: 'Menü schließen',
    retrofitCheck: 'Retrofit-Check starten',
    about: 'Über uns',
    contact: 'Kontakt',
  },
} as const

export type Translations = typeof t
