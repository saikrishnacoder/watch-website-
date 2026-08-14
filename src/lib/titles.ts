import { getCollection, getProduct, site } from "../config/site";

export function documentTitle(pathname: string) {
  if (pathname.startsWith("/watch/")) {
    const parts = pathname.split("/");
    const product = getProduct(parts[2] ?? "");
    if (product && parts[3] === "craft") return `${product.name} · Calibre — ${site.brand.name}`;
    return product ? `${product.name} — ${site.brand.name}` : site.seo.title;
  }
  if (pathname.startsWith("/collection/")) {
    const line = getCollection(pathname.split("/")[2] ?? "");
    return line ? `${line.name} — ${site.brand.name}` : `Watches — ${site.brand.name}`;
  }
  if (pathname.startsWith("/journal/")) {
    const article = site.journal.find((item) => item.slug === pathname.split("/")[2]);
    return article ? `${article.title} — ${site.brand.name}` : `Journal — ${site.brand.name}`;
  }

  const pages: Record<string, string> = {
    "/": site.seo.title,
    "/collection": `The Collection — ${site.brand.name}`,
    "/finder": `Watch Finder — ${site.brand.name}`,
    "/find": `Find your watch — ${site.brand.name}`,
    "/compare": `Compare — ${site.brand.name}`,
    "/wishlist": `Wishlist — ${site.brand.name}`,
    "/cabinet": `Cabinet — ${site.brand.name}`,
    "/compose": `Composer — ${site.brand.name}`,
    "/journal": `Journal — ${site.brand.name}`,
    "/services": `Services — ${site.brand.name}`,
    "/maison": `The Maison — ${site.brand.name}`,
    "/heritage": `Heritage — ${site.brand.name}`,
    "/atelier": `Craft — ${site.brand.name}`,
    "/boutique": `Private Viewing — ${site.brand.name}`,
    "/contact": `Speak to a specialist — ${site.brand.name}`,
    "/privacy": `Privacy policy — ${site.brand.name}`,
    "/404": `Lost time — ${site.brand.name}`,
  };

  return pages[pathname] ?? `Lost time — ${site.brand.name}`;
}
