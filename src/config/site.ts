/**
 * HORLOGE Watch Maison — site template configuration.
 *
 * Swap this file to rebrand the entire website: name, palette, copy,
 * collections, boutiques, and product designs. Components read from here
 * and nowhere else for marketing content.
 */

export type CaseMetal = "steel" | "gold" | "rose" | "black";
export type MarkerStyle = "baton" | "roman" | "arabic" | "dots";
export type HandStyle = "dauphine" | "sword" | "sport";
export type BezelStyle = "none" | "fluted" | "tachymeter" | "ceramic";
export type StrapStyle = "leather" | "bracelet" | "nato";

export type WatchDesign = {
  caseMetal: CaseMetal;
  dial: string;
  dialText: string;
  markers: MarkerStyle;
  hands: HandStyle;
  bezel: BezelStyle;
  strap: StrapStyle;
  strapColor: string;
  chronograph?: boolean;
  dateWindow?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  collection: string;
  price: number;
  limited?: boolean;
  badge?: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  design: WatchDesign;
};

export const site = {
  brand: {
    name: "HORLOGE",
    wordmark: "HORLOGE",
    short: "H",
    founded: 1924,
    tagline: "The art of time",
    description:
      "Independent watchmaking focused on precision, craftsmanship and timeless design.",
    url: "https://horloge.example",
  },

  seo: {
    title: "HORLOGE — Luxury Watches",
    description:
      "Precision engineering meets timeless design. Discover watches crafted for those who appreciate exceptional detail, performance and character.",
  },

  locale: "en-US",
  currency: "USD",

  theme: {
    bg: "#070605",
    bgElevated: "#110f0d",
    bgSoft: "#181614",
    ink: "#f4efe6",
    muted: "#9a9286",
    gold: "#c9a86c",
    goldSoft: "#e8d5a3",
    line: "rgba(244, 239, 230, 0.1)",
    danger: "#b5453a",
    fontDisplay: '"Cormorant Garamond", "Times New Roman", serif',
    fontBody: '"Outfit", system-ui, sans-serif',
  },

  nav: [
    { label: "Collection", href: "/collection" },
    { label: "Atelier", href: "/atelier" },
    { label: "Boutique", href: "/boutique" },
  ],

  hero: {
    eyebrow: "Maison est. 1924 — Geneva",
    title: "Time",
    accent: "redefined.",
    body: "Precision engineering meets timeless design. Discover watches crafted for those who appreciate exceptional detail, performance and character.",
    primaryCta: { label: "Explore collection", href: "/collection" },
    secondaryCta: { label: "Visit the atelier", href: "/atelier" },
    featuredSlug: "chronograph-one",
  },

  marquee: [
    "Swiss movement",
    "Sapphire crystal",
    "100m water resistance",
    "Hand-assembled",
    "Limited series",
    "Lifetime service",
    "Geneva finishing",
  ],

  stats: [
    { value: 1924, suffix: "", label: "Founded in Geneva" },
    { value: 217, suffix: "", label: "Components in a calibre" },
    { value: 100, suffix: "m", label: "Water resistance" },
    { value: 12, suffix: "", label: "Months of finishing" },
  ],

  features: [
    {
      icon: "movement",
      title: "Swiss movement",
      body: "In-house and partner calibres, regulated in five positions for exceptional daily accuracy.",
    },
    {
      icon: "crystal",
      title: "Sapphire crystal",
      body: "Double-domed, anti-reflective sapphire protects every dial from the world outside.",
    },
    {
      icon: "water",
      title: "Engineered cases",
      body: "Monobloc construction and gaskets rated to 100 metres — built for a life well lived.",
    },
    {
      icon: "service",
      title: "Lifetime service",
      body: "Dedicated after-sales ateliers to preserve your timepiece across generations.",
    },
  ],

  story: {
    eyebrow: "Our philosophy",
    title: "Crafted for generations.",
    paragraphs: [
      "HORLOGE was founded around one simple belief: a watch should be more than an instrument for measuring time.",
      "It should represent personality, precision and craftsmanship. Every component is selected, engineered and assembled with obsessive attention to detail — from the first sketch in Geneva to the final regulation.",
    ],
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Close study of a luxury watch dial",
  },

  atelier: {
    eyebrow: "The atelier",
    title: "Where hours become heirlooms.",
    intro:
      "Behind each HORLOGE signature is a quiet room, a loupe, and a pair of hands that refuse to rush. This is not a factory. It is a maison.",
    chapters: [
      {
        year: "01",
        title: "Design",
        body: "Proportions are drawn by hand before they ever meet CAD. The 10:10 pose, the lume plot, the negative space of a dial — all decided here.",
      },
      {
        year: "02",
        title: "Movement",
        body: "Plates are beveled, wheels are circular-grained, and every jewel is seated by eye. Regulation happens in five positions over fourteen days.",
      },
      {
        year: "03",
        title: "Case & crystal",
        body: "Steel, gold or DLC is machined, brushed, and polished in alternating planes. The sapphire is double-domed so the dial seems to float.",
      },
      {
        year: "04",
        title: "Assembly",
        body: "A single watchmaker owns a piece from casing to final timing. Their punch mark sits inside the caseback. Ours, and theirs.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1200&q=80",
        alt: "Watchmaker at the bench",
        caption: "The bench",
      },
      {
        src: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1200&q=80",
        alt: "Watch movement macro",
        caption: "The calibre",
      },
      {
        src: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=1200&q=80",
        alt: "Wristwatch in natural light",
        caption: "The wrist",
      },
    ],
  },

  lookbook: [
    {
      title: "Evening gold",
      caption: "Imperial Gold photographed at dusk, Place de la Fusterie.",
      src: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Apex, in motion",
      caption: "The sport line, built for the commute and the coast.",
      src: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Noir study",
      caption: "A midnight dial under atelier lamps.",
      src: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1400&q=80",
    },
  ],

  testimonials: [
    {
      quote:
        "It is the first watch I have owned that feels like it was waiting for me, rather than the other way around.",
      name: "Amelia Voss",
      role: "Architect, Copenhagen",
    },
    {
      quote:
        "Quiet on the wrist, loud in the details. The finishing on the Chronograph One is obsessive in the best sense.",
      name: "Julian Park",
      role: "Collector, Seoul",
    },
    {
      quote:
        "I bought Heritage for my father. He said it was the first object in years that made him slow down.",
      name: "Noor Rahman",
      role: "Editor, London",
    },
  ],

  limited: {
    slug: "noir",
    eyebrow: "Atelier edition — 192 pieces",
    title: "Noir is almost gone.",
    body: "A black-DLC case, a midnight sunray dial, and gold dauphine hands. When 192 are spoken for, the reference closes forever.",
    endsAt: "2026-12-31T23:59:59Z",
  },

  customizer: {
    eyebrow: "Compose yours",
    title: "A watch, in your register.",
    body: "Case, dial, markers and strap — preview a HORLOGE made to your eye. The atelier will confirm availability within two days.",
    cases: [
      { id: "steel", label: "Steel" },
      { id: "gold", label: "Yellow gold" },
      { id: "rose", label: "Rose gold" },
      { id: "black", label: "Black DLC" },
    ] as { id: CaseMetal; label: string }[],
    dials: [
      { id: "#f3ead8", label: "Ivory" },
      { id: "#1a1d24", label: "Midnight" },
      { id: "#1e3a34", label: "Forest" },
      { id: "#6b1d2a", label: "Burgundy" },
      { id: "#c5a46a", label: "Champagne" },
    ],
    markers: [
      { id: "baton", label: "Baton" },
      { id: "roman", label: "Roman" },
      { id: "arabic", label: "Arabic" },
      { id: "dots", label: "Dots" },
    ] as { id: MarkerStyle; label: string }[],
    straps: [
      { id: "leather", label: "Alligator", color: "#2a1f18" },
      { id: "bracelet", label: "Bracelet", color: "#c5c7ca" },
      { id: "nato", label: "Textile", color: "#1c2430" },
    ] as { id: StrapStyle; label: string; color: string }[],
  },

  collections: ["All", "Classic", "Sport", "Premium"],

  products: [
    {
      slug: "chronograph-one",
      name: "Chronograph One",
      collection: "Classic",
      price: 8900,
      tagline: "The signature three-register.",
      description:
        "A precision-crafted chronograph combining contemporary proportions with traditional finishing. Ivory opaline dial, blued steel hands, and a column-wheel calibre visible through the sapphire caseback.",
      specs: [
        { label: "Movement", value: "H-72 automatic chronograph" },
        { label: "Power reserve", value: "48 hours" },
        { label: "Case", value: "40.5mm stainless steel" },
        { label: "Crystal", value: "Double-domed sapphire" },
        { label: "Water resistance", value: "100 metres" },
        { label: "Strap", value: "Hand-stitched alligator" },
      ],
      design: {
        caseMetal: "steel",
        dial: "#f3ead8",
        dialText: "#1a1814",
        markers: "baton",
        hands: "dauphine",
        bezel: "none",
        strap: "leather",
        strapColor: "#2a1f18",
        chronograph: true,
        dateWindow: true,
      },
    },
    {
      slug: "apex-sport",
      name: "Apex Sport",
      collection: "Sport",
      price: 12400,
      badge: "New",
      tagline: "Built for velocity, finished for life.",
      description:
        "A ceramic-bezel sport watch with a tachymeter scale and a high-contrast dial. The Apex is equally at home on a night drive or a linen cuff.",
      specs: [
        { label: "Movement", value: "H-90 automatic" },
        { label: "Power reserve", value: "70 hours" },
        { label: "Case", value: "41mm steel, ceramic bezel" },
        { label: "Crystal", value: "Sapphire, AR coated" },
        { label: "Water resistance", value: "200 metres" },
        { label: "Strap", value: "Integrated bracelet" },
      ],
      design: {
        caseMetal: "steel",
        dial: "#12151c",
        dialText: "#f4efe6",
        markers: "baton",
        hands: "sport",
        bezel: "tachymeter",
        strap: "bracelet",
        strapColor: "#c5c7ca",
        chronograph: false,
        dateWindow: true,
      },
    },
    {
      slug: "imperial-gold",
      name: "Imperial Gold",
      collection: "Premium",
      price: 24900,
      tagline: "Warm metal. Quiet authority.",
      description:
        "Eighteen-karat yellow gold with a champagne sunray dial and applied Roman numerals. A dress watch in the classical sense — thin, luminous, and meant to be inherited.",
      specs: [
        { label: "Movement", value: "H-12 extra-thin automatic" },
        { label: "Power reserve", value: "42 hours" },
        { label: "Case", value: "38mm 18k yellow gold" },
        { label: "Crystal", value: "Box sapphire" },
        { label: "Water resistance", value: "50 metres" },
        { label: "Strap", value: "Glazed alligator, gold buckle" },
      ],
      design: {
        caseMetal: "gold",
        dial: "#c5a46a",
        dialText: "#3a2a12",
        markers: "roman",
        hands: "dauphine",
        bezel: "fluted",
        strap: "leather",
        strapColor: "#3b2418",
        dateWindow: true,
      },
    },
    {
      slug: "heritage",
      name: "Heritage",
      collection: "Classic",
      price: 7400,
      tagline: "Railroad minutes. Modern heart.",
      description:
        "A tribute to early maison pocket watches, re-proportioned for the wrist. Enamel-white dial, railroad chapter ring, and heat-blued feuille hands.",
      specs: [
        { label: "Movement", value: "H-08 manual wind" },
        { label: "Power reserve", value: "38 hours" },
        { label: "Case", value: "36mm stainless steel" },
        { label: "Crystal", value: "Box sapphire" },
        { label: "Water resistance", value: "30 metres" },
        { label: "Strap", value: "Honey calf" },
      ],
      design: {
        caseMetal: "steel",
        dial: "#f7f4ee",
        dialText: "#1c1a16",
        markers: "arabic",
        hands: "dauphine",
        bezel: "none",
        strap: "leather",
        strapColor: "#8a5a32",
        dateWindow: false,
      },
    },
    {
      slug: "velocity",
      name: "Velocity",
      collection: "Sport",
      price: 13900,
      tagline: "Titanium, distilled.",
      description:
        "Grade-5 titanium with a forest-green sandwich dial and a textile strap. Light on the wrist, serious in the water, unapologetic after midnight.",
      specs: [
        { label: "Movement", value: "H-90T automatic" },
        { label: "Power reserve", value: "70 hours" },
        { label: "Case", value: "42mm grade-5 titanium" },
        { label: "Crystal", value: "Sapphire, AR coated" },
        { label: "Water resistance", value: "200 metres" },
        { label: "Strap", value: "Woven textile" },
      ],
      design: {
        caseMetal: "black",
        dial: "#1e3a34",
        dialText: "#e8f0ea",
        markers: "dots",
        hands: "sport",
        bezel: "ceramic",
        strap: "nato",
        strapColor: "#1c2430",
        dateWindow: true,
      },
    },
    {
      slug: "noir",
      name: "Noir",
      collection: "Premium",
      price: 31900,
      limited: true,
      badge: "192 pcs",
      tagline: "Midnight, in gold.",
      description:
        "Black DLC over steel, a sunray midnight dial, and yellow-gold dauphine hands. An atelier edition of 192 numbered pieces. When they are gone, the reference closes.",
      specs: [
        { label: "Movement", value: "H-12G automatic" },
        { label: "Power reserve", value: "42 hours" },
        { label: "Case", value: "39mm steel, black DLC" },
        { label: "Crystal", value: "Double-domed sapphire" },
        { label: "Water resistance", value: "50 metres" },
        { label: "Strap", value: "Black alligator" },
      ],
      design: {
        caseMetal: "black",
        dial: "#0e1420",
        dialText: "#e8d5a3",
        markers: "baton",
        hands: "dauphine",
        bezel: "fluted",
        strap: "leather",
        strapColor: "#14110f",
        dateWindow: true,
      },
    },
  ] as Product[],

  boutiques: [
    {
      city: "Geneva",
      address: "12 Rue du Rhône, 1204",
      hours: "Tue–Sat, 10:00–18:30",
      phone: "+41 22 555 1924",
    },
    {
      city: "Paris",
      address: "18 Place Vendôme, 75001",
      hours: "Mon–Sat, 11:00–19:00",
      phone: "+33 1 55 00 19 24",
    },
    {
      city: "New York",
      address: "727 Fifth Avenue, NY 10022",
      hours: "Mon–Sat, 10:00–18:00",
      phone: "+1 212 555 1924",
    },
  ],

  newsletter: {
    eyebrow: "Join the maison",
    title: "Stay ahead of time.",
    body: "Collection launches, private views, and atelier notes — never more than a letter a month.",
    placeholder: "Your email address",
    cta: "Subscribe",
    success: "Welcome to HORLOGE. We will write when it matters.",
  },

  footer: {
    blurb:
      "Independent watchmaking focused on precision, craftsmanship and timeless design.",
    columns: [
      {
        title: "Collection",
        links: [
          { label: "Classic", href: "/collection?line=Classic" },
          { label: "Sport", href: "/collection?line=Sport" },
          { label: "Premium", href: "/collection?line=Premium" },
        ],
      },
      {
        title: "Maison",
        links: [
          { label: "Atelier", href: "/atelier" },
          { label: "Boutiques", href: "/boutique" },
          { label: "Journal", href: "/atelier" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Appointments", href: "/boutique" },
          { label: "Shipping", href: "/boutique" },
          { label: "Warranty", href: "/atelier" },
        ],
      },
    ],
    legal: "All rights reserved.",
  },

  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Vimeo", href: "https://vimeo.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
  ],
};

export type SiteConfig = typeof site;

export function formatPrice(amount: number) {
  return new Intl.NumberFormat(site.locale, {
    style: "currency",
    currency: site.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getProduct(slug: string): Product | undefined {
  return site.products.find((product) => product.slug === slug);
}

export function relatedProducts(slug: string, count = 3) {
  const current = getProduct(slug);
  const rest = site.products.filter((product) => product.slug !== slug);
  const same = rest.filter((product) => product.collection === current?.collection);
  return [...same, ...rest.filter((p) => !same.includes(p))].slice(0, count);
}
