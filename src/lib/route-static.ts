import { crumbsForPath } from "./breadcrumbs";
import { craftDisclaimer, productionCalibres } from "../config/calibres";
import { collectionLines, getProduct, signatureProducts, site } from "../config/site";
import { essay, lineEssay } from "../content/load";

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
    heading: site.collectionPage.title,
    body: site.collectionPage.lede,
    nav: LINE_NAV,
  },
  "collection/heritage": {
    title: "Heritage — HORLOGE",
    description:
      "Heritage, the original HORLOGE line. Time-only, hand-finished, unchanged since 1924. Enamel dials and extra-thin calibres around the gold meridian at 12.",
    heading: "Heritage",
    body: collectionLines.find((line) => line.slug === "heritage")?.indexBlurb ?? "",
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
    body: collectionLines.find((line) => line.slug === "chronograph")?.indexBlurb ?? "",
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
    body: collectionLines.find((line) => line.slug === "diver")?.indexBlurb ?? "",
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
    body: collectionLines.find((line) => line.slug === "imperial")?.indexBlurb ?? "",
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
    body: collectionLines.find((line) => line.slug === "meridian")?.indexBlurb ?? "",
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
    heading: site.maisonPage.title,
    body: site.maisonPage.lede,
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
    heading: site.heritagePage.title,
    body: site.heritagePage.lede,
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
    heading: site.atelier.title,
    body: site.atelier.intro,
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
    nav: site.journal.map((item) => ({ href: `/journal/${item.slug}`, label: item.title })),
  },
  boutique: {
    title: "Private Viewing — HORLOGE",
    description:
      "Private viewing at HORLOGE. Five maisons — Geneva, Paris, London, New York, Tokyo. A tray, the papers, and an hour.",
    heading: site.boutiquePage.title,
    body: site.boutiquePage.lede,
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
  if (routeCopy[key]) return routeCopy[key];

  if (key.startsWith("journal/")) {
    const article = site.journal.find((item) => item.slug === key.slice("journal/".length));
    if (article) {
      return {
        title: `${article.title} — HORLOGE`,
        description: article.excerpt,
        heading: article.title,
        body: article.excerpt,
        nav: [
          { href: `/journal/${article.slug}`, label: article.title },
          { href: "/journal", label: "All notes" },
          { href: "/maison", label: "The Maison" },
        ],
      };
    }
  }

  if (key.startsWith("watch/")) {
    const slug = key.replace(/^watch\//, "").replace(/\/craft$/, "");
    const product = getProduct(slug);
    if (product) {
      return {
        title: `${product.name} — HORLOGE`,
        description: `${product.name}, ${product.reference}. ${product.tagline}`,
        heading: product.name,
        body: product.description,
        nav: [
          { href: `/watch/${product.slug}`, label: product.name },
          { href: `/collection/${product.collectionSlug}`, label: product.collection },
          { href: "/boutique", label: "Private Viewing" },
        ],
      };
    }
  }

  return {
    ...routeCopy.home,
    title: "Lost time — HORLOGE",
    heading: "Lost time",
    body: "This hour is not in the maison.",
    nav: MAISON_NAV,
  };
}

export function spaStampRoutes() {
  const notes = site.journal.map((item) => `journal/${item.slug}`);
  const watches = signatureProducts().map((item) => `watch/${item.slug}`);
  return [...SPA_STAMP_BASE, ...notes, ...watches];
}

export const SPA_STAMP_BASE = [
  "collection",
  "collection/heritage",
  "collection/chronograph",
  "collection/diver",
  "collection/imperial",
  "collection/meridian",
  "chronograph",
  "diver",
  "imperial",
  "meridian",
  "maison",
  "privacy",
  "finder",
  "find",
  "boutique",
  "contact",
  "heritage",
  "atelier",
  "journal",
  "services",
  "wishlist",
  "cabinet",
  "compose",
  "compare",
] as const;

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
          ${uniqueBodyHtml(path)}
          <nav aria-label="${escapeHtml(copy.heading)}">
${nav}
          </nav>
        </main>
      </div>`;
}

function uniqueBodyHtml(path: string) {
  if (path === "/") {
    const lines = collectionLines
      .map(
        (line) =>
          `          <li><a href="/collection/${escapeHtml(line.slug)}">${escapeHtml(line.name)}</a> — ${escapeHtml(line.tagline)}</li>`,
      )
      .join("\n");
    return `<section aria-label="Five lines">
          <h2>Five atmospheres. One meridian.</h2>
          <ul>
${lines}
          </ul>
        </section>`;
  }

  if (path === "/collection") {
    const articles = collectionLines
      .map(
        (line) => `          <article>
            <h2><a href="/collection/${escapeHtml(line.slug)}">${escapeHtml(line.name)}</a></h2>
            <p>${escapeHtml(line.chapterTitle)} ${escapeHtml(line.indexBlurb)}</p>
            <p>${escapeHtml(line.finishing)} · ${escapeHtml(line.calibre)}</p>
          </article>`,
      )
      .join("\n");
    return `<article aria-label="The Collection">
          ${essay("collection").html}
        </article>
        <section aria-label="Five collections">
${articles}
        </section>`;
  }

  if (path.startsWith("/collection/")) {
    const slug = path.split("/")[2] ?? "";
    const line = collectionLines.find((item) => item.slug === slug);
    if (!line) return "";
    const essays = lineEssay(slug).html;
    const watches = signatureProducts(slug)
      .slice(0, 6)
      .map(
        (watch) => `          <article>
            <h3><a href="/watch/${escapeHtml(watch.slug)}">${escapeHtml(watch.name)}</a></h3>
            <p>${escapeHtml(watch.reference)} · ${escapeHtml(watch.tagline)}</p>
          </article>`,
      )
      .join("\n");
    return `<section aria-label="${escapeHtml(line.name)}">
          <h2>${escapeHtml(line.chapterTitle)}</h2>
          ${essays}
        </section>
        <section aria-label="${escapeHtml(line.name)} watches">
${watches}
        </section>`;
  }

  if (path === "/maison") {
    const people = site.people
      .map(
        (person) =>
          `          <article><h3>${escapeHtml(person.name)}</h3><p>${escapeHtml(person.role)}. ${escapeHtml(person.note)}</p></article>`,
      )
      .join("\n");
    return `<article aria-label="The Maison">
          ${essay("maison").html}
        </article>
        <section aria-label="The bench">
          <h2>Three pairs of hands.</h2>
${people}
        </section>`;
  }

  if (path === "/atelier") {
    const calibres = productionCalibres
      .map(
        (item) =>
          `          <article><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.line)}. ${escapeHtml(item.winding)}. ${escapeHtml(item.note)}</p></article>`,
      )
      .join("\n");
    return `<article aria-label="Craft">
          ${essay("atelier").html}
        </article>
        <section aria-label="Production calibres">
          <h2>Five production calibres</h2>
${calibres}
          <p>${escapeHtml(craftDisclaimer)}</p>
        </section>`;
  }

  if (path === "/journal") {
    const notes = site.journal
      .map(
        (item) => `          <article>
            <h2><a href="/journal/${escapeHtml(item.slug)}">${escapeHtml(item.title)}</a></h2>
            <p>${escapeHtml(item.category)} · ${escapeHtml(item.date)}</p>
            <p>${escapeHtml(item.excerpt)}</p>
          </article>`,
      )
      .join("\n");
    return `<section aria-label="Notes">
${notes}
        </section>`;
  }

  if (path.startsWith("/journal/")) {
    const article = site.journal.find((item) => item.slug === path.slice("/journal/".length));
    if (!article) return "";
    return `<article>
          <p>${escapeHtml(article.category)} · ${escapeHtml(article.date)}</p>
          ${article.html}
        </article>`;
  }

  if (path === "/heritage") {
    return `<article aria-label="A century">
          ${essay("heritage").html}
        </article>`;
  }

  if (path === "/boutique") {
    const houses = site.boutiques
      .map(
        (house) =>
          `          <article><h3>${escapeHtml(house.city)}</h3><p>${escapeHtml(house.address)}</p><p>${escapeHtml(house.hours)}</p><p>${escapeHtml(house.phone)}</p></article>`,
      )
      .join("\n");
    return `<section aria-label="Maisons">
          ${essay("boutique").html}
${houses}
        </section>`;
  }

  if (path === "/contact") {
    const houses = site.boutiques
      .map(
        (house) =>
          `          <article><h3>${escapeHtml(house.city)}</h3><p>${escapeHtml(house.address)} · ${escapeHtml(house.phone)}</p></article>`,
      )
      .join("\n");
    return `<section aria-label="Specialist">
          <p>Ask a specialist, or leave a note for the maison. There is no generic inbox.</p>
${houses}
        </section>`;
  }

  if (path === "/services") {
    const items = site.services
      .map(
        (item) =>
          `          <article><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.duration)}. ${escapeHtml(item.body)}</p></article>`,
      )
      .join("\n");
    return `<section aria-label="Care">
${items}
        </section>`;
  }

  if (path.startsWith("/watch/")) {
    const slug = path.replace(/^\/watch\//, "").replace(/\/craft$/, "");
    const product = getProduct(slug);
    if (!product) return "";
    return `<article>
          <p>${escapeHtml(product.collection)} · ${escapeHtml(product.reference)}</p>
          <p>${escapeHtml(product.tagline)}</p>
          <p>${product.diameter} mm · ${escapeHtml(product.material)} · ${product.waterResistance} m · ${escapeHtml(product.movement)}</p>
          <p>${escapeHtml(product.description)}</p>
          <p><a href="/collection/${escapeHtml(product.collectionSlug)}">${escapeHtml(product.collection)} collection</a></p>
        </article>`;
  }

  return "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
