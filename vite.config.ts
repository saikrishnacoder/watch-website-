import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import netlify from "@netlify/vite-plugin";

const SPA_ROUTES = [
  "collection",
  "collection/heritage",
  "collection/chronograph",
  "collection/diver",
  "collection/imperial",
  "collection/meridian",
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

function spaFallbackPages(): Plugin {
  return {
    name: "spa-fallback-pages",
    closeBundle() {
      const dist = path.resolve("dist");
      const index = path.join(dist, "index.html");
      if (!fs.existsSync(index)) return;
      const html = fs.readFileSync(index, "utf8");
      fs.writeFileSync(path.join(dist, "404.html"), html);
      for (const route of SPA_ROUTES) {
        const dir = path.join(dist, route);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), html);
      }
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
