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
  "heritage",
  "atelier",
  "journal",
  "services",
  "checkout",
  "wishlist",
  "compare",
  "motion",
];

function writeHtml(file: string, html: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
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
        writeHtml(path.join(dist, `${route}.html`), html);
        writeHtml(path.join(dist, route, "index.html"), html);
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
