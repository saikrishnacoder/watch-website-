import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import netlify from "@netlify/vite-plugin";
import { brandedNotFoundHtml } from "./src/lib/not-found-html";

const SPA_ROUTES = [
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
  "checkout",
  "wishlist",
  "cabinet",
  "compose",
  "compare",
  "motion",
];

function writeHtml(file: string, html: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

const PAGE_TITLES: Record<string, string> = {
  collection: "Watches — HORLOGE",
  "collection/heritage": "Heritage — HORLOGE",
  "collection/chronograph": "Chronograph — HORLOGE",
  "collection/diver": "Diver — HORLOGE",
  "collection/imperial": "Imperial — HORLOGE",
  "collection/meridian": "Meridian — HORLOGE",
  maison: "The maison — HORLOGE",
  privacy: "Privacy policy — HORLOGE",
  checkout: "Preview checkout — HORLOGE",
  boutique: "Boutiques — HORLOGE",
  contact: "Speak to a specialist — HORLOGE",
  finder: "Watch Finder — HORLOGE",
  find: "Find your watch — HORLOGE",
  heritage: "Heritage — HORLOGE",
  atelier: "Atelier — HORLOGE",
  journal: "Journal — HORLOGE",
  services: "Services — HORLOGE",
  wishlist: "Wishlist — HORLOGE",
  cabinet: "Cabinet — HORLOGE",
  compose: "Composer — HORLOGE",
  compare: "Compare — HORLOGE",
  motion: "Kinetic atelier — HORLOGE",
};

function stampRoute(html: string, route: string) {
  const title = PAGE_TITLES[route];
  if (!title) return html;
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace('<div id="root"></div>', `<div id="root" data-page="/${route}"></div>`);
}

function spaFallbackPages(): Plugin {
  return {
    name: "spa-fallback-pages",
    closeBundle() {
      const dist = path.resolve("dist");
      const index = path.join(dist, "index.html");
      if (!fs.existsSync(index)) return;
      const html = fs.readFileSync(index, "utf8");
      for (const route of SPA_ROUTES) {
        const page = stampRoute(html, route);
        writeHtml(path.join(dist, `${route}.html`), page);
        writeHtml(path.join(dist, route, "index.html"), page);
      }
      writeHtml(path.join(dist, "404.html"), brandedNotFoundHtml(html));
    },
  };
}

export default defineConfig({
  plugins: [react(), netlify(), spaFallbackPages()],
  preview: {
    port: 4173,
  },
  appType: "spa",
});
