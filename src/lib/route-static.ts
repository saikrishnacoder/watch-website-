import { crumbsForPath } from "./breadcrumbs";

export type RouteNavLink = { href: string; label: string };

export type RouteCopy = {
  title: string;
  description: string;
  heading: string;
  body: string;
  nav: RouteNavLink[];
};

const MAISON_NAV: RouteNavLink[] = [
  { href: "/collection", label: "The Collection" },
  { href: "/maison", label: "The Maison" },
  { href: "/atelier", label: "Craft" },
  { href: "/journal", label: "Journal" },
  { href: "/boutique", label: "Private Viewing" },
];

const LINE_NAV: RouteNavLink[] = [
  { href: "/collection", label: "The Collection" },
  { href: "/collection/heritage", label: "Heritage" },
  { href: "/collection/chronograph", label: "Chronograph" },
  { href: "/collection/diver", label: "Diver" },
  { href: "/collection/imperial", label: "Imperial" },
  { href: "/collection/meridian", label: "Meridian" },
];

export const routeCopy: Record<string, RouteCopy> = {
  home: {
    title: "HORLOGE — Tempus compositum",
    description:
      "Independent Geneva watchmaking since 1924. HORLOGE — Tempus compositum. Five lines composed around a gold meridian at 12.",
    heading: "HORLOGE — Tempus compositum",
    body: "Every HORLOGE composition begins from a gold line at twelve. Cinematic opening, five collections, craft, and a private viewing — not a storefront.",
    nav: [
      { href: "/collection", label: "Explore the Collection" },
      { href: "/maison", label: "The Maison" },
      { href: "/atelier", label: "Craft" },
      { href: "/journal", label: "Journal" },
      { href: "/boutique", label: "Private Viewing" },
    ],
  },
  collection: {
    title: "The Collection — HORLOGE",
    description:
      "The HORLOGE collection: five expressions of one idea — time composed around a gold line at 12. Heritage, Chronograph, Diver, Imperial, Meridian.",
    heading: "The Collection",
    body: "Five expressions of one idea: time composed around a gold line at 12. Each Horloge watch begins from the same point; five collections interpret it in restraint, complication, depth, ceremony, and motion.",
    nav: LINE_NAV,
  },
  "collection/heritage": {
    title: "Heritage — HORLOGE",
    description:
      "Heritage, the original HORLOGE line. Time-only, hand-finished, unchanged since 1924. Enamel dials and extra-thin calibres around the gold meridian at 12.",
    heading: "Heritage",
    body: "The original line. Time-only, hand-finished, unchanged since 1924. Enamel dials, railroad minutes, and extra-thin calibres — the first sentence the maison ever wrote.",
    nav: [
      { href: "/collection/heritage", label: "Heritage watches" },
      { href: "/collection/chronograph", label: "Chronograph" },
      { href: "/collection/diver", label: "Diver" },
      { href: "/collection", label: "All collections" },
    ],
  },
  "collection/chronograph": {
    title: "Chronograph — HORLOGE",
    description:
      "HORLOGE Chronograph. Measured time. Column-wheel construction, built for precision under pressure.",
    heading: "Chronograph",
    body: "Measured time. Column-wheel construction, built for precision under pressure. Three registers, a tachymeter, and the start-stop-reset as three distinct mechanical events.",
    nav: [
      { href: "/collection/chronograph", label: "Chronograph watches" },
      { href: "/collection/heritage", label: "Heritage" },
      { href: "/collection/diver", label: "Diver" },
      { href: "/collection", label: "All collections" },
    ],
  },
  "collection/diver": {
    title: "Diver — HORLOGE",
    description: "HORLOGE Diver. Time at depth. 300m water resistance, engineered for the sea.",
    heading: "Diver",
    body: "Time at depth. 300m water resistance, engineered for the sea. Ceramic bezels, lume you can read when the water is black, and the gold meridian still at 12.",
    nav: [
      { href: "/collection/diver", label: "Diver watches" },
      { href: "/collection/chronograph", label: "Chronograph" },
      { href: "/collection/imperial", label: "Imperial" },
      { href: "/collection", label: "All collections" },
    ],
  },
  "collection/imperial": {
    title: "Imperial — HORLOGE",
    description:
      "HORLOGE Imperial. Time in ceremony. The Maison's dress collection, cased in precious metal.",
    heading: "Imperial",
    body: "Time in ceremony. The Maison's dress collection, cased in precious metal. Yellow gold, rose gold, numbered editions — finished to be refinished.",
    nav: [
      { href: "/collection/imperial", label: "Imperial watches" },
      { href: "/collection/meridian", label: "Meridian" },
      { href: "/collection/heritage", label: "Heritage" },
      { href: "/collection", label: "All collections" },
    ],
  },
  "collection/meridian": {
    title: "Meridian — HORLOGE",
    description:
      "HORLOGE Meridian. Time in motion. The line reimagined as a moving indication — our signature complication.",
    heading: "Meridian",
    body: "Time in motion. The line reimagined as a moving indication — our signature complication. GMT, dual time, worldtimer: the gold stroke at 12 carried around the world.",
    nav: [
      { href: "/collection/meridian", label: "Meridian watches" },
      { href: "/collection/imperial", label: "Imperial" },
      { href: "/collection/diver", label: "Diver" },
      { href: "/collection", label: "All collections" },
    ],
  },
  maison: {
    title: "The Maison — HORLOGE",
    description:
      "The Maison Horloge, Geneva, 1924. Independent watchmaking. A gold line at twelve, and a century composed around it.",
    heading: "The Maison",
    body: "Geneva, 1924. Horloge was founded by a single watchmaker with a single conviction: that a watch should be composed, not merely assembled. We remain independent. Cases are finished by hand. Movements are regulated individually, not by batch.",
    nav: [
      { href: "/maison", label: "Origin" },
      { href: "/heritage", label: "A century in years" },
      { href: "/atelier", label: "Craft" },
      { href: "/collection", label: "The Collection" },
    ],
  },
  heritage: {
    title: "Heritage timeline — HORLOGE",
    description:
      "A century of HORLOGE, 1924 to the present. The cinematic timeline of an independent Geneva maison.",
    heading: "A century in years",
    body: "The Heritage timeline — not the Heritage collection. Scroll the century from 1924 on the Rue du Rhône to the gold meridian written into the charter.",
    nav: [
      { href: "/maison", label: "The Maison" },
      { href: "/collection/heritage", label: "Heritage watches" },
      { href: "/atelier", label: "Craft" },
    ],
  },
  atelier: {
    title: "Craft — HORLOGE",
    description:
      "HORLOGE craftsmanship: case, dial, movement, finishing. Why this watch is valuable. Opened, then composed.",
    heading: "Craft",
    body: "Case, dial, movement, finishing. A HORLOGE passes through fewer than twelve pairs of hands. Surfaces are finished to be refinished. The meridian is drawn last.",
    nav: [
      { href: "/atelier", label: "The movement, opened" },
      { href: "/maison", label: "The Maison" },
      { href: "/collection", label: "The Collection" },
    ],
  },
  journal: {
    title: "Journal — HORLOGE",
    description:
      "HORLOGE Journal: four notes — The Golden Meridian, Inside the Atelier, Anatomy of a Mechanical Watch, Geneva & Independent Horology.",
    heading: "Journal",
    body: "Four notes from the maison. The meridian, the atelier, the movement, and Geneva. Not a press office.",
    nav: [
      { href: "/journal/the-meridian", label: "The Golden Meridian" },
      { href: "/journal/inside-the-atelier", label: "Inside the Atelier" },
      { href: "/journal/anatomy", label: "Anatomy of a Mechanical Watch" },
      { href: "/journal/geneva-independent", label: "Geneva & Independent Horology" },
    ],
  },
  boutique: {
    title: "Private Viewing — HORLOGE",
    description:
      "Private viewing at HORLOGE. Five maisons — Geneva, Paris, London, New York, Tokyo. A tray, the papers, and an hour.",
    heading: "Private Viewing",
    body: "Come closer to the work. Five maisons. We do not sell across a counter if the wrist has not met the watch. Request a viewing in Geneva, Paris, London, New York or Tokyo.",
    nav: [
      { href: "/boutique", label: "Request a viewing" },
      { href: "/collection", label: "The Collection" },
      { href: "/contact", label: "Write to the maison" },
    ],
  },
  contact: {
    title: "Speak to a specialist — HORLOGE",
    description: "Write to a HORLOGE specialist. Availability, a second strap, or which line sits on your wrist.",
    heading: "A quiet word",
    body: "Ask a specialist, or leave a note for the maison in Geneva. Availability, straps, and which line belongs on your wrist.",
    nav: [
      { href: "/contact", label: "Write" },
      { href: "/boutique", label: "Private Viewing" },
      { href: "/collection", label: "The Collection" },
    ],
  },
  privacy: {
    title: "Privacy policy — HORLOGE",
    description:
      "HORLOGE privacy policy. What stays on this device, what you send the maison, and how to write to the controller — Swiss FADP / GDPR.",
    heading: "Privacy policy",
    body: "How Maison Horloge handles personal data — what stays on your device, what you send us, and how you can change your mind. Forms, local cabinet, and optional analytics; not a marketing stack.",
    nav: [
      { href: "/privacy", label: "This policy" },
      { href: "/contact", label: "Write to privacy" },
      { href: "/", label: "Home" },
    ],
  },
  finder: {
    title: "Watch Finder — HORLOGE",
    description: "Filter HORLOGE by line, diameter, metal and depth. A finder, not a catalogue dump.",
    heading: "Watch Finder",
    body: "Filter by collection, diameter, metal and water resistance. Then open a reference, or book a viewing.",
    nav: [
      { href: "/finder", label: "Filter" },
      { href: "/collection", label: "The Collection" },
      { href: "/find", label: "Find your watch" },
    ],
  },
  find: {
    title: "Find your watch — HORLOGE",
    description: "A short HORLOGE questionnaire: line, size, and how you wear time.",
    heading: "Find your watch",
    body: "A few questions — line, size, depth — then a short list from the five collections, not a grid of everything.",
    nav: [
      { href: "/find", label: "Begin" },
      { href: "/finder", label: "Watch Finder" },
      { href: "/collection", label: "The Collection" },
    ],
  },
  checkout: {
    title: "Preview checkout — HORLOGE",
    description: "HORLOGE preview checkout. A study of the tray — not a live payment.",
    heading: "Preview checkout",
    body: "A preview of the tray. This is not a live payment. For a real piece, request availability or a private viewing.",
    nav: [
      { href: "/boutique", label: "Private Viewing" },
      { href: "/collection", label: "The Collection" },
    ],
  },
  wishlist: {
    title: "Wishlist — HORLOGE",
    description: "HORLOGE wishlist. Shortlist across Heritage, Chronograph, Diver, Imperial and Meridian.",
    heading: "Wishlist",
    body: "Saved for later. Shortlist across the five lines, then save to compare or book a viewing.",
    nav: [
      { href: "/wishlist", label: "Your list" },
      { href: "/compare", label: "Compare" },
      { href: "/collection", label: "The Collection" },
    ],
  },
  compare: {
    title: "Compare — HORLOGE",
    description: "Compare up to three HORLOGE references: diameter, calibre, depth and finishing.",
    heading: "Compare",
    body: "Up to three references, side by side. Diameter, calibre, depth and finishing — the same sheet a boutique advisor uses.",
    nav: [
      { href: "/compare", label: "The sheet" },
      { href: "/wishlist", label: "Wishlist" },
      { href: "/collection", label: "The Collection" },
    ],
  },
  cabinet: {
    title: "Cabinet — HORLOGE",
    description: "The HORLOGE cabinet on this device: wishlist, compare, compositions, registered pieces.",
    heading: "Cabinet",
    body: "A cabinet on this device — not an account. Wishlist, compare, compositions, and registered serials stay here until you erase them.",
    nav: [
      { href: "/cabinet", label: "This device" },
      { href: "/services", label: "Register a timepiece" },
      { href: "/collection", label: "The Collection" },
    ],
  },
  compose: {
    title: "Composer — HORLOGE",
    description: "Compose a HORLOGE study: case, dial, markers, hands, bezel and strap. Not a SKU.",
    heading: "Composer",
    body: "Case, dial, markers, hands, bezel and strap — a study composition, not a stock-keeping unit. The atelier will say whether it can be made.",
    nav: [
      { href: "/compose", label: "The study" },
      { href: "/collection", label: "The Collection" },
      { href: "/boutique", label: "Private Viewing" },
    ],
  },
  services: {
    title: "Services — HORLOGE",
    description: "HORLOGE services: complete service, case refresh, warranty, and timepiece registration.",
    heading: "Services",
    body: "Complete service, case and bracelet refresh, five-year warranty, and registration. The meridian is meant to be refinished.",
    nav: [
      { href: "/services", label: "Register" },
      { href: "/atelier", label: "Craft" },
      { href: "/contact", label: "Write" },
    ],
  },
  motion: {
    title: "Kinetic atelier — HORLOGE",
    description: "HORLOGE kinetic atelier: escapement, tourbillon and hairspring, drawn and set moving.",
    heading: "Kinetic atelier",
    body: "Escapement, tourbillon and hairspring — drawn with trigonometry, then set moving. A side room of the atelier, not the maison journey.",
    nav: [
      { href: "/motion", label: "The machines" },
      { href: "/atelier", label: "Craft" },
      { href: "/", label: "Home" },
    ],
  },
  chronograph: {
    title: "Chronograph — HORLOGE",
    description: "HORLOGE Chronograph line. Measured time, column-wheel construction.",
    heading: "Chronograph",
    body: "This address opens the Chronograph collection — measured time, column-wheel construction.",
    nav: LINE_NAV,
  },
  diver: {
    title: "Diver — HORLOGE",
    description: "HORLOGE Diver line. Time at depth, 300m water resistance.",
    heading: "Diver",
    body: "This address opens the Diver collection — time at depth, engineered for the sea.",
    nav: LINE_NAV,
  },
  imperial: {
    title: "Imperial — HORLOGE",
    description: "HORLOGE Imperial line. Time in ceremony, precious metal.",
    heading: "Imperial",
    body: "This address opens the Imperial collection — time in ceremony, cased in precious metal.",
    nav: LINE_NAV,
  },
  meridian: {
    title: "Meridian — HORLOGE",
    description: "HORLOGE Meridian line. Time in motion, the signature complication.",
    heading: "Meridian",
    body: "This address opens the Meridian collection — time in motion, our signature complication.",
    nav: LINE_NAV,
  },
};

export function copyForRoute(route: string): RouteCopy {
  const key = route.replace(/^\//, "").replace(/\/$/, "") || "home";
  return routeCopy[key] ?? {
    ...routeCopy.home,
    title: "Lost time — HORLOGE",
    heading: "Lost time",
    body: "This hour is not in the maison.",
    nav: MAISON_NAV,
  };
}

export function staticPageMarkup(copy: RouteCopy, path: string) {
  const nav = copy.nav
    .map((item) => `          <a href="${item.href}">${escapeHtml(item.label)}</a>`)
    .join("\n");
  const crumbs = crumbsForPath(path);
  const trail =
    crumbs && crumbs.length > 1
      ? `<nav class="crumbs-bar" aria-label="Breadcrumb"><ol>${crumbs
          .map((crumb, index) => {
            const last = index === crumbs.length - 1;
            const sep = index > 0 ? `<span class="crumbs-sep" aria-hidden="true">/</span>` : "";
            const node = last
              ? `<span aria-current="page">${escapeHtml(crumb.label)}</span>`
              : `<a href="${escapeHtml(crumb.href)}">${escapeHtml(crumb.label)}</a>`;
            return `<li>${sep}${node}</li>`;
          })
          .join("")}</ol></nav>`
      : "";
  return `<div class="static-route" data-route="${escapeHtml(path)}">
        <header>
          <p>HORLOGE</p>
        </header>
        ${trail}
        <main>
          <h1>${escapeHtml(copy.heading)}</h1>
          <p>${escapeHtml(copy.body)}</p>
          <nav aria-label="${escapeHtml(copy.heading)}">
${nav}
          </nav>
        </main>
      </div>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
