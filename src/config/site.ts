/**
 * HORLOGE Watch Maison — site template configuration.
 *
 * Swap this file (and `catalog.ts`) to rebrand the entire website.
 */

export type {
  Availability,
  BezelStyle,
  CaseMetal,
  HandStyle,
  MarkerStyle,
  MovementType,
  Product,
  SpecGroup,
  StrapStyle,
  WatchDesign,
} from "./types";

import { extraProducts } from "./products-extra";
import { atelierProducts } from "./generate-catalogue";
import { collectionLines, journal, photos, products as coreProducts, quiz, services } from "./catalog";
import { DEFAULT_CURRENCY, formatMoney } from "./money";
import type { CaseMetal, MarkerStyle, Product, StrapStyle } from "./types";

export { collectionLines, journal, photos, quiz, services };
export const products = [...coreProducts, ...extraProducts, ...atelierProducts];

export const site = {
  brand: {
    name: "HORLOGE",
    wordmark: "HORLOGE",
    short: "H",
    founded: 1924,
    city: "Geneva",
    tagline: "The art of time",
    motto: "Tempus compositum",
    mottoEn: "Time, composed",
    seal: "Maison Horloge · Genève · 1924",
    signature: "The Meridian",
    signatureNote:
      "A gold line at 12 on every dial — the maison’s mark, taken from the Geneva meridian and drawn thinner than a hair.",
    description:
      "Independent Geneva watchmaking. Five lines, one meridian. Watches composed for those who measure life in moments, not minutes.",
    url: "https://horloge.example",
    pillars: [
      {
        title: "Silence",
        body: "No ambassadors. No shouting. A HORLOGE should be noticed second, and remembered first.",
      },
      {
        title: "Measure",
        body: "Every calibre is regulated in five positions. We time the watch until it agrees with Geneva.",
      },
      {
        title: "Inherit",
        body: "Cases are finished to be refinished. The meridian is designed to outlast the first owner.",
      },
    ],
    palette: [
      { name: "Encre", hex: "#070605", use: "Atelier black — grounds, cases, night" },
      { name: "Ivoire", hex: "#f4efe6", use: "Paper, enamel, type" },
      { name: "Or de Genève", hex: "#c9a86c", use: "The meridian, the seal, the metal" },
      { name: "Bordeaux", hex: "#6b1d2a", use: "Seconds hands, limited marks" },
    ],
  },

  seo: {
    title: "HORLOGE — Tempus compositum",
    description:
      "Maison Horloge, Geneva 1924. Heritage, Chronograph, Diver, Imperial and Meridian — watches composed around a gold line at 12.",
  },

  locale: "de-CH",
  currency: "CHF",

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
    { label: "Watches", href: "/collection" },
    { label: "Watch Finder", href: "/finder" },
    { label: "World of HORLOGE", href: "/maison" },
    { label: "Boutiques", href: "/boutique" },
  ],

  hero: {
    eyebrow: "Maison Horloge · Genève · 1924",
    title: "Time",
    accent: "composed.",
    body: "Independent Geneva watchmaking since 1924. Five lines, one gold meridian at 12. Watches for those who measure life in moments, not minutes.",
    primaryCta: { label: "Find your watch", href: "/finder" },
    secondaryCta: { label: "Explore the collection", href: "/collection" },
    featuredSlug: "chronograph-one",
    image: "/media/maison-meridian.jpg",
  },

  marquee: [
    "Tempus compositum",
    "The gold meridian",
    "Geneva 1924",
    "Swiss movement",
    "Sapphire crystal",
    "Hand-assembled",
    "Five lines, one maison",
    "Lifetime service",
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
      "HORLOGE was founded in Geneva in 1924 around a single idea: time should be composed, not merely counted. The gold meridian at 12 is that idea, drawn on every dial.",
      "Five lines — Heritage, Chronograph, Diver, Imperial, Meridian — share one mark, one city, and a refusal to rush the finishing.",
    ],
    image: "/lines/heritage.jpg",
    imageAlt: "Heritage enamel dial with the gold meridian at 12",
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
        src: "/media/maison-bench.jpg",
        alt: "Watchmaker’s bench in Geneva",
        caption: "The bench",
      },
      {
        src: "/media/maison-meridian.jpg",
        alt: "Gold meridian at 12 on a HORLOGE dial",
        caption: "The meridian",
      },
      {
        src: "/lines/chronograph.jpg",
        alt: "Chronograph One in studio light",
        caption: "The wrist",
      },
    ],
  },

  heritage: [
    {
      year: "1924",
      title: "A maison in Geneva",
      body: "HORLOGE opens on the Rue du Rhône. The first enamel dials carry a gold line at 12 — the Geneva meridian, drawn thinner than a hair.",
      image: photos.bench,
    },
    {
      year: "1947",
      title: "The club chronograph",
      body: "Timing watches for Geneva motor clubs. The column wheel, the 10:10 pose, and a tachymeter that is still on Chronograph One.",
      image: photos.ivory,
    },
    {
      year: "1969",
      title: "We stayed mechanical",
      body: "Quartz arrives. The atelier does not follow. Regulation in five positions becomes a rule, not a brochure line.",
      image: photos.movement,
    },
    {
      year: "1998",
      title: "The meridian, named",
      body: "What had been a finishing habit is written into the charter. Every dial, every line, one gold stroke at 12.",
      image: photos.cinematic,
    },
    {
      year: "2018",
      title: "Chronograph One",
      body: "The signature three-register. Ivory opaline, blued hands, a sapphire caseback. The maison’s most requested reference.",
      image: photos.ivory,
    },
    {
      year: "2024",
      title: "A century",
      body: "One hundred years of composed time. Five lines share the seal. The meridian outlasts the first owner, as intended.",
      image: photos.classic,
    },
    {
      year: "2026",
      title: "Meridian",
      body: "The namesake line: GMT, worldtimer, dual time. HORLOGE is named for the clock. This line is named for the line.",
      image: photos.black,
    },
  ],

  lookbook: [
    {
      title: "Evening gold",
      caption: "Imperial, photographed for the maison stills — gold that remembers the lamp.",
      src: "/lines/imperial.jpg",
    },
    {
      title: "Apex, in motion",
      caption: "The Diver line. Ceramic, lume, and a meridian that does not dive.",
      src: "/lines/diver.jpg",
    },
    {
      title: "The namesake",
      caption: "Meridian. Dual time, and the gold stroke at 12.",
      src: "/lines/meridian.jpg",
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

  collectionLines,
  products,
  journal,
  services,
  quiz,

  people: [
    {
      name: "Élise Moreau",
      role: "Master watchmaker",
      note: "Owns each Heritage from casing to final timing. Her punch mark sits inside the caseback.",
    },
    {
      name: "Kenji Arai",
      role: "Regulator",
      note: "Five positions, fourteen days. He does not sign a watch until Geneva agrees with it.",
    },
    {
      name: "Clara Voss",
      role: "Dial painter",
      note: "The meridian is drawn last, thinner than a hair, in gold that will outlast the first owner.",
    },
  ],

  boutiques: [
    {
      city: "Geneva",
      address: "12 Rue du Rhône, 1204",
      hours: "Tue–Sat, 10:00–18:30",
      phone: "+41 22 555 1924",
      zone: "Europe/Zurich",
      days: [2, 3, 4, 5, 6],
      opens: "10:00",
      closes: "18:30",
    },
    {
      city: "Paris",
      address: "18 Place Vendôme, 75001",
      hours: "Mon–Sat, 11:00–19:00",
      phone: "+33 1 55 00 19 24",
      zone: "Europe/Paris",
      days: [1, 2, 3, 4, 5, 6],
      opens: "11:00",
      closes: "19:00",
    },
    {
      city: "New York",
      address: "727 Fifth Avenue, NY 10022",
      hours: "Mon–Sat, 10:00–18:00",
      phone: "+1 212 555 1924",
      zone: "America/New_York",
      days: [1, 2, 3, 4, 5, 6],
      opens: "10:00",
      closes: "18:00",
    },
    {
      city: "London",
      address: "14 Old Bond Street, W1S 4PP",
      hours: "Mon–Sat, 10:00–18:00",
      phone: "+44 20 7946 1924",
      zone: "Europe/London",
      days: [1, 2, 3, 4, 5, 6],
      opens: "10:00",
      closes: "18:00",
    },
    {
      city: "Tokyo",
      address: "6-8-3 Ginza, Chuo-ku",
      hours: "Wed–Mon, 11:00–19:00",
      phone: "+81 3 5551 1924",
      zone: "Asia/Tokyo",
      days: [0, 1, 3, 4, 5, 6],
      opens: "11:00",
      closes: "19:00",
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
      "Maison Horloge, Geneva. Tempus compositum — time, composed. Five lines around a gold meridian at 12.",
    columns: [
      {
        title: "Collection",
        links: [
          { label: "All watches", href: "/collection" },
          { label: "Watch Finder", href: "/finder" },
          { label: "Find your watch", href: "/find" },
          { label: "Checkout preview", href: "/checkout" },
        ],
      },
      {
        title: "Collections",
        links: [
          { label: "Heritage", href: "/collection/heritage" },
          { label: "Chronograph", href: "/collection/chronograph" },
          { label: "Diver", href: "/collection/diver" },
          { label: "Imperial", href: "/collection/imperial" },
          { label: "Meridian", href: "/collection/meridian" },
        ],
      },
      {
        title: "Maison",
        links: [
          { label: "The maison", href: "/maison" },
          { label: "Heritage", href: "/heritage" },
          { label: "Kinetic atelier", href: "/motion" },
          { label: "Atelier", href: "/atelier" },
          { label: "Journal", href: "/journal" },
          { label: "Services", href: "/services" },
          { label: "Boutiques", href: "/boutique" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Appointments", href: "/boutique" },
          { label: "Warranty", href: "/services" },
          { label: "Wishlist", href: "/wishlist" },
          { label: "Privacy", href: "/privacy" },
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

const productBySlug = new Map(products.map((product) => [product.slug, product]));

export function canPreviewCheckout(product: Product) {
  return product.availability !== "Waitlist";
}

export function formatPrice(amount: number) {
  return formatMoney(amount, DEFAULT_CURRENCY);
}

export function getProduct(slug: string): Product | undefined {
  return productBySlug.get(slug);
}

export function getCollection(slug: string) {
  return collectionLines.find((line) => line.slug === slug);
}

export function productsIn(slug: string) {
  return products.filter((product) => product.collectionSlug === slug);
}

export function signatureProducts(slug?: string) {
  const list = slug ? coreProducts.filter((product) => product.collectionSlug === slug) : coreProducts;
  return list;
}

export function relatedProducts(slug: string, count = 3) {
  const current = getProduct(slug);
  const rest = products.filter((product) => product.slug !== slug);
  const same = rest.filter((product) => product.collection === current?.collection);
  return [...same, ...rest.filter((p) => !same.includes(p))].slice(0, count);
}
