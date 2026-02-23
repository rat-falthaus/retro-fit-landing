/**
 * Static German locale for SmartHarvest / Rex-AT Reto-Fit Thüringen.
 * Single-language, no runtime switching — import directly in each component.
 * All user-facing text lives here. No hardcoded strings in templates.
 */
export const t = {
  seo: {
    title: 'Reto-Fit Thüringen – Upgrade die Maschine. Bewahr das Erbe.',
    description:
      'Häufige Maschinenausfälle? Ständige Reparaturen? Mit einem Reto-Fit von Rex-AT bringen wir Ihre Produktionsmaschinen wieder auf Vordermann – nachhaltig, ohne Neukauf. Jetzt 2.000 € Gutschein sichern.',
    keywords:
      'Reto-Fit, Retro-Fit, Maschinenmodernisierung, Thüringen, Rex-AT, Produktionsmaschinen, Nachhaltigkeit, Maschinenreparatur',
    ogTitle: 'Reto-Fit Thüringen – Rex AutomatierungsTechnik GmbH',
    ogDescription:
      'Upgrade die Maschine, bewahr das Erbe. Jetzt kostenlosen 2.000 € Reto-Fit-Check sichern.',
    twitterTitle: 'Reto-Fit Thüringen – Jetzt 2.000 € Gutschein sichern',
    twitterDescription:
      'Rex-AT bringt Ihre Produktionsmaschinen wieder auf Vordermann – nachhaltig & ohne Neukauf.',
    canonical: 'https://rex-at.de/landingpage-retrofit.html',
  },

  hero: {
    headline: 'Upgrade die Maschine.',
    headlineAccent: 'Bewahr das Erbe.',
    subheadline:
      'Häufige Ausfälle, ständige Reparaturen, unzuverlässige Laufzeiten? Ihre Maschinen brauchen keinen Austausch – sie brauchen ein Reto-Fit.',
    ctaPrimary: 'Jetzt 2.000 € Gutschein sichern',
    ctaSecondary: 'Maschine entdecken ↓',
    sliderLabel: 'Vorher / Nachher',
    sliderBefore: 'Vorher',
    sliderAfter: 'Nachher',
    stampLabel: 'Reto Fitted',
    sliderHint: 'Schieben zum Vergleichen',
    trustItems: [
      'Nachhaltig & Ressourcenschonend',
      'Bewährte Maschinen, moderne Technik',
      'Langjährige Erfahrung in Thüringen',
    ] as const,
    imageAltBefore: 'Produktionsmaschine vor dem Reto-Fit',
    imageAltAfter: 'Produktionsmaschine nach dem Reto-Fit',
  },

  postcard: {
    received: 'Sie haben unsere Postkarte erhalten!',
    hook: 'Ihre Maschine rief an – sie fühlt sich ein bisschen nach 1995 an.',
    bridgeText:
      'Kein Scherz. Ihre Maschinen sind erprobt und zuverlässig – sie brauchen nur ein <strong class="text-forest-green">modernes Innenleben</strong>, um wieder auf <strong class="text-industrial-amber">Volldampf</strong> zu laufen und dabei Betriebskosten zu senken.',
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
    brandName: 'Reto-Fit Thüringen',
    description:
      'Rex AutomatierungsTechnik GmbH – Wir bringen Ihre Produktionsmaschinen wieder auf Vordermann. Nachhaltig, ohne Neukauf.',
    tagline: 'Upgrade die Maschine. Bewahr das Erbe.',
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
        { label: 'Datenschutz', href: 'https://www.rex-at.de' },
        { label: 'Impressum', href: 'https://www.rex-at.de' },
        { label: 'AGB', href: 'https://www.rex-at.de' },
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
      'Der Gutschein ist nicht übertragbar, nicht in bar auszahlbar und nur gültig für Reto-Fit-Dienstleistungen von Rex-AT. Nicht kombinierbar mit anderen Angeboten. Einlösbar bis 31.04.2026. Weitere Bedingungen auf Anfrage.',
    surveyUrl: 'https://rex-at.de/landingpage-retrofit.html',
    voucherCta: 'Jetzt Gutschein sichern',
    voucherAmount: '2.000 €',
    voucherExpiry: 'Einlösbar bis 31.04.2026',
  },
} as const

export type Translations = typeof t
