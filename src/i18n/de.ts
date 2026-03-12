/**
 * Static German locale for SmartHarvest / Rex-AT Reto-Fit Thüringen.
 * Single-language, no runtime switching — import directly in each component.
 * All user-facing text lives here. No hardcoded strings in templates.
 */
export const t = {
  seo: {
    title: 'Retrofit Thüringen | Maschinenmodernisierung vom Experten – Rex-AT',
    description:
      'Rex AutomatierungsTechnik GmbH modernisiert Ihre Produktionsmaschinen in Thüringen – nachhaltig, zuverlässig und ohne Neukauf. Jetzt kostenlosen 2.000 € Retrofit-Check sichern!',
    keywords:
      'Retrofit, Retro-Fit, Maschinenmodernisierung, Thüringen, Erfurt, Rex-AT, Rex AutomatierungsTechnik, Produktionsmaschinen, Automatisierung, Elektrotechnik, Maschinenreparatur, Nachhaltigkeit, Industrieautomation, SPS-Programmierung, Schaltschrankbau, Anlagenmodernisierung',
    ogTitle: 'Retrofit Thüringen | Maschine modernisieren – Rex AutomatierungsTechnik',
    ogDescription:
      'Häufige Maschinenausfälle? Mit einem Retrofit von Rex-AT modernisieren wir Ihre Anlagen – effizient, nachhaltig und ohne Neukauf. 2.000 € Gutschein sichern!',
    twitterTitle: 'Retrofit Thüringen – Maschinenmodernisierung | Rex-AT',
    twitterDescription:
      'Produktionsmaschinen modernisieren statt ersetzen. Rex-AT in Erfurt: über 35 Jahre Erfahrung in Automatisierung & Elektrotechnik. Jetzt 2.000 € Gutschein sichern.',
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
  },

  postcard: {
    received: 'Sie haben unsere Postkarte erhalten!',
    hook: 'Ihre Maschine hat angerufen – sie wäre bereit für ein Retrofit.',
    bridgeText:
      'Machen Sie jetzt den <strong class="text-forest-green">Retrofit-Check</strong> und sprechen Sie mit unseren Experten. Sichern Sie sich dabei Ihren <strong class="text-industrial-amber">2.000 € Retrofit-Gutschein</strong>.',
  },

  modal: {
    title: 'Gutschein jetzt sichern',
    subtitle: '2.000 € – Ohne Verpflichtung',
    successTitle: 'Anfrage eingegangen!',
    successText:
      'Unser Team meldet sich innerhalb von 24 Stunden, um Ihren kostenlosen Reto-Fit-Check zu terminieren.',
    successNote: 'Prüfen Sie Ihr Postfach für eine Bestätigung.',
    name: 'Name',
    namePlaceholder: 'Max Mustermann',
    email: 'E-Mail-Adresse',
    emailPlaceholder: 'max@beispiel.de',
    phone: 'Telefonnummer',
    phonePlaceholder: '+49 123 456 7890',
    farmSize: 'Betriebsgröße (Hektar)',
    farmSizePlaceholder: 'z.B. 250',
    equipment: 'Maschinentypen',
    equipmentPlaceholder: 'z.B. 2 Mähdrescher, 1 Ballenpresse',
    message: 'Weitere Informationen',
    messagePlaceholder:
      'Erzählen Sie uns von Ihrer Maschine oder Ihren spezifischen Anforderungen …',
    submit: 'Anfrage absenden',
    privacyNote:
      'Mit dem Absenden stimmen Sie zu, von unserem Team kontaktiert zu werden. Wir behandeln Ihre Daten vertraulich.',
    required: 'Pflichtfeld',
  },

  footer: {
    brandName: 'Retrofit Thüringen',
    description:
      'Rex AutomatierungsTechnik GmbH – Wir bringen Ihre Produktionsmaschinen wieder auf Vordermann. Nachhaltig, ohne Neukauf.',
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
      company: 'Rex AutomatierungsTechnik GmbH',
      street: 'Fichtenweg 26',
      city: '99098 Erfurt Kerspleben',
      phone: '036208 666-0',
      email: 'info@rex-at.de',
    },
    certifiedTitle: 'Zertifiziert & Konform',
    certifications: [
      'CE-konform',
      'Nachhaltigkeitspartner',
      'Langjährige Erfahrung',
    ],
    copyright: (year: number) => `© ${year} Rex AutomatierungsTechnik GmbH. Alle Rechte vorbehalten.`,
    madeWith: 'Mit ❤️ für Betriebe, die auf Nachhaltigkeit setzen',
    disclaimer:
      'Der Gutschein ist nicht übertragbar, nicht in bar auszahlbar und nur gültig für Retrofit-Dienstleistungen von Rex-AT. Nicht kombinierbar mit anderen Angeboten. Einlösbar bis zum 30.04.2026. Weitere Bedingungen auf Anfrage.',
    surveyUrl: 'https://rex-at.de/landingpage-retrofit.html',
    voucherCta: 'Retrofit-Check',
    voucherAmount: '2.000 €',
    voucherExpiry: 'Einlösbar bis zum 30.04.2026',
  },
  nav: {
    homeUrl: 'https://rex-at.de/willkommen.html',
  },
} as const

export type Translations = typeof t
