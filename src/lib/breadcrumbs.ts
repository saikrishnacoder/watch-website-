import { getCollection, getProduct, site } from "../config/site";

export type Crumb = { href: string; label: string };

const PAGES: Record<string, string> = {
  "/collection": "Collection",
  "/journal": "Journal",
  "/maison": "The Maison",
  "/atelier": "Craft",
  "/heritage": "Heritage",
  "/boutique": "Private Viewing",
  "/privacy": "Privacy",
  "/contact": "Contact",
  "/services": "Services",
  "/finder": "Watch Finder",
  "/find": "Find your watch",
  "/wishlist": "Wishlist",
  "/compare": "Compare",
  "/cabinet": "Cabinet",
  "/compose": "Composer",
};

function normalize(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.replace(/\/+$/, "");
  return pathname || "/";
}

export function crumbsForPath(pathname: string): Crumb[] | null {
  const path = normalize(pathname);
  if (path === "/" || path === "/404") return null;

  const home: Crumb = { href: "/", label: "Home" };

  if (path.startsWith("/collection/")) {
    const slug = path.split("/")[2] ?? "";
    const line = getCollection(slug);
    if (!line) return null;
    return [home, { href: "/collection", label: "Collection" }, { href: `/collection/${line.slug}`, label: line.name }];
  }

  if (path.startsWith("/watch/")) {
    const slug = path.split("/")[2] ?? "";
    const product = getProduct(slug);
    if (!product) return null;
    const crumbs: Crumb[] = [
      home,
      { href: "/collection", label: "Collection" },
      { href: `/collection/${product.collectionSlug}`, label: product.collection },
      { href: `/watch/${product.slug}`, label: product.name },
    ];
    if (path.endsWith("/craft")) crumbs.push({ href: `/watch/${product.slug}/craft`, label: "Calibre" });
    return crumbs;
  }

  if (path.startsWith("/journal/")) {
    const slug = path.split("/")[2] ?? "";
    const article = site.journal.find((item) => item.slug === slug);
    if (!article) return null;
    return [home, { href: "/journal", label: "Journal" }, { href: `/journal/${article.slug}`, label: article.title }];
  }

  const label = PAGES[path];
  if (label) return [home, { href: path, label }];
  return null;
}
