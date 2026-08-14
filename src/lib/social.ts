import { collectionLines, photos, site } from "../config/site";
import { copyForRoute } from "./route-static";

export type SocialTags = {
  title: string;
  description: string;
  image: string;
  url: string;
};

export function ogImageForRoute(route: string) {
  const key = route.replace(/^\//, "").replace(/\/$/, "") || "home";
  let image = photos.cinematic;
  if (key.startsWith("collection/")) {
    const slug = key.split("/")[1] ?? "";
    image = collectionLines.find((line) => line.slug === slug)?.ogImage ?? photos.cinematic;
  } else if (key === "collection") image = photos.luxury;
  else if (key === "maison" || key === "heritage") image = photos.bench;
  else if (key === "atelier") image = photos.movement;
  else if (key === "boutique") image = photos.wrist;
  return image.replace(/w=\d+/, "w=1200");
}

export function socialForPath(pathname: string): SocialTags {
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.replace(/\/+$/, "") : pathname || "/";
  const key = path.replace(/^\//, "") || "home";
  const copy = copyForRoute(key);
  const origin = site.brand.url.replace(/\/$/, "");
  return {
    title: copy.title,
    description: copy.description,
    image: ogImageForRoute(key),
    url: path === "/" ? `${origin}/` : `${origin}${path}`,
  };
}

export function socialMetaMarkup(pathname: string) {
  const social = socialForPath(pathname);
  const title = escapeAttr(social.title);
  const description = escapeAttr(social.description);
  const image = escapeAttr(social.image);
  const url = escapeAttr(social.url);
  return `<meta property="og:type" content="website" />
    <meta property="og:site_name" content="HORLOGE" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <link rel="canonical" href="${url}" />`;
}

export function applySocialTags(pathname: string) {
  const social = socialForPath(pathname);
  document.title = social.title;
  setNamed("description", social.description);
  setProperty("og:type", "website");
  setProperty("og:site_name", "HORLOGE");
  setProperty("og:title", social.title);
  setProperty("og:description", social.description);
  setProperty("og:image", social.image);
  setProperty("og:url", social.url);
  setNamed("twitter:card", "summary_large_image");
  setNamed("twitter:title", social.title);
  setNamed("twitter:description", social.description);
  setNamed("twitter:image", social.image);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", social.url);
}

function setNamed(name: string, content: string) {
  let node = document.querySelector(`meta[name="${name}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute("name", name);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function setProperty(property: string, content: string) {
  let node = document.querySelector(`meta[property="${property}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute("property", property);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function escapeAttr(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}
