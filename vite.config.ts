import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import netlify from "@netlify/vite-plugin";
import "./src/content/hydrate-node";
import { brandedNotFoundHtml } from "./src/lib/not-found-html";
import { brandedPrivacyHtml } from "./src/lib/privacy-html";
import { copyForRoute, spaStampRoutes, staticPageMarkup } from "./src/lib/route-static";
import { socialMetaMarkup } from "./src/lib/social";

function writeHtml(file: string, html: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function stampRoute(html: string, route: string) {
  const copy = copyForRoute(route);
  const pathName = route === "home" ? "/" : `/${route}`;
  const block = staticPageMarkup(copy, pathName);
  const description = copy.description.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  let next = html.replace(/<title>[^<]*<\/title>/, `<title>${copy.title}</title>`);
  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${description}" />`,
  );
  next = next.replace(
    /<!-- social-meta -->[\s\S]*?<!-- \/social-meta -->/,
    `<!-- social-meta -->\n    ${socialMetaMarkup(pathName)}\n    <!-- /social-meta -->`,
  );
  next = next.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>\n      ${block}\n    </noscript>`);
  next = next.replace(
    /<div id="root"[^>]*>[\s\S]*<\/div>\s*(?=<\/body>)/,
    `<div id="root" data-page="${pathName}">\n      ${block}\n    </div>\n    `,
  );
  return next;
}

function spaFallbackPages(): Plugin {
  return {
    name: "spa-fallback-pages",
    closeBundle() {
      const dist = path.resolve("dist");
      const index = path.join(dist, "index.html");
      if (!fs.existsSync(index)) return;
      const html = fs.readFileSync(index, "utf8");
      writeHtml(index, stampRoute(html, "home"));
      for (const route of spaStampRoutes()) {
        const page = route === "privacy" ? brandedPrivacyHtml(html) : stampRoute(html, route);
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
