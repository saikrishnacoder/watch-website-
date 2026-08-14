/** Standalone HORLOGE 404 document — dark theme, maison type, a way home. */

const LOST_SHELL = `
  <div class="lost-shell" id="lost-shell">
    <a class="lost-mark" href="/" aria-label="HORLOGE">
      <svg width="56" height="56" viewBox="0 0 64 64" aria-hidden>
        <circle cx="32" cy="32" r="30" fill="none" stroke="#c9a86c" stroke-width="1"/>
        <line x1="32" y1="14" x2="32" y2="22" stroke="#c9a86c" stroke-width="1.6"/>
        <text x="32" y="40" text-anchor="middle" fill="#f4efe6" font-family="Cormorant Garamond, serif" font-size="22" font-weight="600">H</text>
      </svg>
      <span>
        <strong>HORLOGE</strong>
        <small>Tempus compositum</small>
      </span>
    </a>
    <div class="lost-eyebrow">Lost time · Maison Horloge · Genève · 1924</div>
    <h1>This hour is not in the maison.</h1>
    <p>The page has no meridian. Return home, or enter the collection — five lines, one gold stroke at 12.</p>
    <div class="lost-actions">
      <a class="lost-btn" href="/">Return home</a>
      <a class="lost-btn lost-btn-ghost" href="/collection">Explore the Collection</a>
    </div>
    <nav class="lost-nav" aria-label="Maison">
      <a href="/collection/heritage">Heritage</a>
      <a href="/collection/chronograph">Chronograph</a>
      <a href="/collection/diver">Diver</a>
      <a href="/collection/imperial">Imperial</a>
      <a href="/collection/meridian">Meridian</a>
      <a href="/maison">The maison</a>
      <a href="/privacy">Privacy</a>
    </nav>
  </div>
`;

const LOST_CSS = `
html, body {
  margin: 0;
  min-height: 100%;
  background: #070605;
  color: #f4efe6;
}
body {
  font-family: Outfit, system-ui, sans-serif;
}
.lost-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 6% 64px;
  position: relative;
}
.lost-shell::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 72px;
  background: #c9a86c;
  transform: translateX(-50%);
}
.lost-mark {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  color: #c9a86c;
  text-decoration: none;
  margin-bottom: 36px;
}
.lost-mark strong {
  display: block;
  font-family: "Cormorant Garamond", "Times New Roman", serif;
  font-size: 22px;
  letter-spacing: 0.28em;
  font-weight: 500;
}
.lost-mark small {
  display: block;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-size: 8px;
  color: #9a9286;
  margin-top: 4px;
}
.lost-eyebrow {
  color: #c9a86c;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  font-size: 11px;
  margin-bottom: 22px;
}
.lost-shell h1 {
  font-family: "Cormorant Garamond", "Times New Roman", serif;
  font-weight: 500;
  font-size: clamp(40px, 7vw, 88px);
  line-height: 0.92;
  letter-spacing: -0.02em;
  max-width: 16ch;
  margin: 0 0 24px;
}
.lost-shell p {
  max-width: 460px;
  color: #9a9286;
  font-weight: 300;
  line-height: 1.7;
  margin: 0 0 36px;
}
.lost-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 40px;
}
.lost-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 28px;
  border: 1px solid #c9a86c;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 11px;
  text-decoration: none;
  background: #c9a86c;
  color: #070605;
}
.lost-btn-ghost {
  background: transparent;
  color: #c9a86c;
}
.lost-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 22px;
  max-width: 520px;
}
.lost-nav a {
  color: #9a9286;
  text-decoration: none;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 10px;
}
.lost-nav a:hover {
  color: #c9a86c;
}
`;

export function brandedNotFoundHtml(indexHtml: string): string {
  const extras = [
    ...indexHtml.matchAll(/<link rel="stylesheet"[^>]*>/g),
    ...indexHtml.matchAll(/<link rel="modulepreload"[^>]*>/g),
    ...indexHtml.matchAll(/<script type="module"[^>]*><\/script>/g),
  ]
    .map((match) => match[0])
    .join("\n    ");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#070605" />
    <title>Lost time — HORLOGE</title>
    <meta name="description" content="This hour is not in the maison. Return home, or enter the HORLOGE collection." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
    <style>${LOST_CSS}</style>
    ${extras}
  </head>
  <body>
    ${LOST_SHELL}
    <div id="root"></div>
    <script>
      (function () {
        var shell = document.getElementById("lost-shell");
        var root = document.getElementById("root");
        function hide() {
          if (shell) shell.hidden = true;
        }
        if (root && window.MutationObserver) {
          new MutationObserver(function () {
            if (root.childNodes.length) hide();
          }).observe(root, { childList: true });
        }
      })();
    </script>
  </body>
</html>
`;
}
