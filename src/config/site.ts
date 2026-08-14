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
import { collectionLines as lineRecords, photos, products as coreProducts, quiz, services } from "./catalog";
import { journalNotes, lineEssay, essay, headingSections, heritageYears } from "../content/load";
import { DEFAULT_CURRENCY, formatMoney } from "./money";
import type { BezelStyle, CaseMetal, HandStyle, MarkerStyle, Product, StrapStyle } from "./types";

export { photos, quiz, services };
export { altFor, photoAlt } from "./catalog";

export const collectionLines = lineRecords.map((line) => {
  const doc = lineEssay(line.slug);
  return {
    ...line,
    chapterTitle: doc.meta.chapter || line.chapterTitle,
    indexBlurb: doc.meta.blurb || line.indexBlurb,
    essay: doc.paragraphs.length ? doc.paragraphs : line.essay,
  };
});

export const journal = journalNotes().map((doc) => ({
  slug: doc.slug,
  title: doc.meta.title,
  date: doc.meta.date ?? "",
  category: doc.meta.category ?? "",
  excerpt: doc.meta.excerpt ?? doc.paragraphs[0] ?? "",
  image: doc.meta.image || photos.cinematic,
  imageAlt: doc.meta.imageAlt || doc.meta.title,
  body: doc.paragraphs,
  html: doc.html,
}));

const collectionDoc = essay("collection");
const maisonDoc = essay("maison");
const atelierDoc = essay("atelier");
const boutiqueDoc = essay("boutique");
const heritageDoc = essay("heritage");

const heritageImages: Record<string, string> = {
  "1924": photos.bench,
  "1938": photos.classic,
  "1947": photos.ivory,
  "1969": photos.movement,
  "1984": photos.bench,
  "1998": photos.cinematic,
  "2018": photos.ivory,
  "2024": photos.classic,
  "2026": photos.black,
};

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

  privacy: {
    updated: "14 August 2026",
    email: "privacy@horloge.example",
    entity: "Maison Horloge",
    address: "12 Rue du Rhône, 1204 Geneva, Switzerland",
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
    { label: "Collections", href: "/collection" },
    { label: "The Maison", href: "/maison" },
    { label: "Craft", href: "/atelier" },
    { label: "Journal", href: "/journal" },
    { label: "Private Viewing", href: "/boutique" },
  ],

  hero: {
    eyebrow: "HORLOGE",
    title: "HORLOGE",
    accent: "Tempus compositum",
    body: "Every composition begins from a gold line at 12.",
    primaryCta: { label: "Explore the Collection", href: "/collection" },
    secondaryCta: { label: "Private Viewing", href: "/boutique" },
    featuredSlug: "chronograph-one",
    image: "/media/maison-meridian.jpg",
  },

  homeMaison: {
    title: "Geneva · 1924",
    body: "Independent Geneva watchmaking. No conglomerate owns our movements, our cases, or our name. The full history lives with the Maison.",
    cta: "Discover The Maison",
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

  collectionPage: {
    title: collectionDoc.meta.title || "The Collection",
    lede: collectionDoc.meta.lede || "",
    gridIntro: collectionDoc.paragraphs[0] || "",
  },

  maisonPage: {
    title: maisonDoc.meta.title || "The Maison",
    lede: maisonDoc.meta.lede || "",
  },

  boutiquePage: {
    title: boutiqueDoc.meta.title || "Private Viewing",
    lede: boutiqueDoc.meta.lede || "",
    note: boutiqueDoc.paragraphs[0] || "",
  },

  heritagePage: {
    title: heritageDoc.meta.title || "A century in years",
    lede: heritageDoc.meta.lede || "",
  },

  atelier: {
    eyebrow: "The atelier",
    title: atelierDoc.meta.title || "Where hours become heirlooms.",
    intro: atelierDoc.meta.lede || atelierDoc.paragraphs[0] || "",
    chapters: headingSections("atelier").map((section, index) => ({
      year: String(index + 1).padStart(2, "0"),
      title: section.title,
      body: section.body,
    })),
    gallery: [
      {
        src: photos.bench,
        alt: "Watchmaker’s bench in Geneva",
        caption: "The bench",
      },
      {
        src: photos.cinematic,
        alt: "Gold meridian at 12 on a HORLOGE dial",
        caption: "The meridian",
      },
      {
        src: photos.ivory,
        alt: "Chronograph One in studio light",
        caption: "The wrist",
      },
    ],
  },

  heritage: heritageYears().map((item) => ({
    ...item,
    image: heritageImages[item.year] ?? photos.cinematic,
  })),

  press: {
    eyebrow: "As noted",
    title: "In print.",
    items: [
      { name: "The Geneva Review", line: "The meridian, drawn" },
      { name: "Rue du Rhône", line: "A maison that stayed mechanical" },
      { name: "Atelier Quarterly", line: "Five positions, fourteen days" },
      { name: "Chronos Letter", line: "Chronograph One, as requested" },
      { name: "Horological Record", line: "A century, composed" },
    ],
  },

  customizer: {
    eyebrow: "Compose yours",
    title: "A watch, in your register.",
    body: "Case, dial, markers, hands, bezel and strap — a study composition, not a stock-keeping unit. The atelier will say whether it can be made.",
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
    hands: [
      { id: "dauphine", label: "Dauphine" },
      { id: "sword", label: "Sword" },
      { id: "sport", label: "Sport" },
    ] as { id: HandStyle; label: string }[],
    bezels: [
      { id: "none", label: "Smooth" },
      { id: "fluted", label: "Fluted" },
      { id: "tachymeter", label: "Tachymeter" },
      { id: "ceramic", label: "Ceramic" },
    ] as { id: BezelStyle; label: string }[],
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
    eyebrow: "Early access",
    title: "Join for the Meridian collection.",
    magnet: "Early access to Meridian.",
    body: "First look at new Meridian pieces, private views, and the gold line at 12 — never more than a letter a month.",
    placeholder: "Your email address",
    cta: "Request access",
    success: "You are on the Meridian list. We write when a piece is ready to be seen.",
  },

  footer: {
    blurb:
      "Maison Horloge, Geneva. Tempus compositum — time, composed. Five lines around a gold meridian at 12.",
    columns: [
      {
        title: "Collections",
        links: [
          { label: "The Collection", href: "/collection" },
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
          { label: "The Maison", href: "/maison" },
          { label: "Craft", href: "/atelier" },
          { label: "Journal", href: "/journal" },
          { label: "Private Viewing", href: "/boutique" },
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
