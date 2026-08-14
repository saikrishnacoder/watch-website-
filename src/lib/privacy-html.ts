/** Standalone HORLOGE privacy policy — readable without JavaScript. */

import {
  privacyArticleHtml,
  privacyDescription,
  privacyTitle,
} from "./privacy-policy";

const PRIVACY_CSS = `
html, body {
  margin: 0;
  min-height: 100%;
  background: #070605;
  color: #f4efe6;
}
body {
  font-family: Outfit, system-ui, sans-serif;
  font-weight: 300;
}
.privacy-shell {
  max-width: 820px;
  margin: 0 auto;
  padding: 48px 6% 80px;
}
.privacy-shell .privacy-mark {
  display: inline-flex;
  flex-direction: column;
  color: #c9a86c;
  text-decoration: none;
  margin-bottom: 48px;
}
.privacy-shell .privacy-mark strong {
  font-family: "Cormorant Garamond", "Times New Roman", serif;
  font-size: 20px;
  letter-spacing: 0.28em;
  font-weight: 500;
}
.privacy-shell .privacy-mark small {
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-size: 8px;
  color: #9a9286;
  margin-top: 4px;
}
.privacy-shell .eyebrow {
  color: #c9a86c;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  font-size: 11px;
  margin-bottom: 16px;
}
.privacy-shell h1 {
  font-family: "Cormorant Garamond", "Times New Roman", serif;
  font-weight: 500;
  font-size: clamp(40px, 7vw, 72px);
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
}
.privacy-shell h2 {
  font-family: "Cormorant Garamond", "Times New Roman", serif;
  font-weight: 500;
  font-size: 28px;
  margin: 40px 0 14px;
}
.privacy-shell .lede,
.privacy-shell p {
  color: #9a9286;
  line-height: 1.75;
  margin: 0 0 16px;
  font-size: 16px;
}
.privacy-shell .lede {
  font-size: 18px;
  max-width: 52ch;
  margin-bottom: 20px;
}
.privacy-shell a {
  color: #c9a86c;
}
.privacy-toc {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
  margin: 12px 0 36px;
  padding: 20px 0;
  border-top: 1px solid rgba(244, 239, 230, 0.1);
  border-bottom: 1px solid rgba(244, 239, 230, 0.1);
}
.privacy-toc a {
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 10px;
  text-decoration: none;
}
.privacy-table {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0 28px;
  font-size: 15px;
}
.privacy-table th,
.privacy-table td {
  text-align: left;
  vertical-align: top;
  padding: 12px 14px 12px 0;
  border-bottom: 1px solid rgba(244, 239, 230, 0.1);
  color: #9a9286;
  line-height: 1.55;
}
.privacy-table th {
  color: #c9a86c;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 500;
}
.privacy-meta {
  font-size: 14px !important;
}
`;

export function brandedPrivacyHtml(indexHtml: string): string {
  const extras = [
    ...indexHtml.matchAll(/<link rel="stylesheet"[^>]*>/g),
    ...indexHtml.matchAll(/<link rel="modulepreload"[^>]*>/g),
    ...indexHtml.matchAll(/<script type="module"[^>]*><\/script>/g),
  ]
    .map((match) => match[0])
    .join("\n    ");

  const description = privacyDescription.replaceAll("&", "&amp;").replaceAll('"', "&quot;");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#070605" />
    <title>${privacyTitle}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="/privacy" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
    <style>${PRIVACY_CSS}</style>
    ${extras}
  </head>
  <body>
    <div class="privacy-shell" id="privacy-shell">
      <a class="privacy-mark" href="/" aria-label="HORLOGE">
        <strong>HORLOGE</strong>
        <small>Tempus compositum</small>
      </a>
      ${privacyArticleHtml()}
    </div>
    <div id="root"></div>
    <script>
      (function () {
        var shell = document.getElementById("privacy-shell");
        var root = document.getElementById("root");
        function hide() {
          if (shell) shell.hidden = true;
        }
        if (root && window.MutationObserver) {
          new MutationObserver(function () {
            if (root.querySelector(".privacy-policy")) hide();
          }).observe(root, { childList: true, subtree: true });
        }
      })();
    </script>
  </body>
</html>
`;
}
