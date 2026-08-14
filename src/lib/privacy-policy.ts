import { site } from "../config/site";

const geneva = site.boutiques[0];

export const privacyTitle = "Privacy policy — HORLOGE";

export const privacyDescription =
  "HORLOGE privacy policy. What stays on this device, what you send the maison, and how to write to the controller — Swiss FADP / GDPR.";

export const privacyLede =
  "How Maison Horloge handles personal data on this website — what stays on your device, what you send us, and how you can change your mind.";

export type PolicyLink = { href: string; label: string };
export type PolicyPart = string | PolicyLink;
export type PolicyRow = [string, string, string];

export type PolicyBlock =
  | { kind: "h2"; id?: string; text: string }
  | { kind: "p"; parts: PolicyPart[] }
  | { kind: "table"; headers: [string, string, string]; rows: PolicyRow[] }
  | { kind: "slot"; name: "analytics" | "erase" };

export const privacyToc: PolicyLink[] = [
  { href: "#who", label: "Who we are" },
  { href: "#device", label: "On this device" },
  { href: "#forms", label: "Forms you send" },
  { href: "#checkout", label: "Preview checkout" },
  { href: "#hosting", label: "Hosting and fonts" },
  { href: "#analytics", label: "Analytics" },
  { href: "#rights", label: "Your rights" },
  { href: "#contact", label: "Contact" },
];

export function privacyMetaLine() {
  return `Effective ${site.privacy.updated}. Controller: ${site.privacy.entity}, ${site.privacy.address}. This policy covers the public website, boutique appointment forms, the Meridian early-access letter, waitlist, specialist messages, and timepiece registration.`;
}

export const privacyBlocks: PolicyBlock[] = [
  {
    kind: "h2",
    id: "who",
    text: "Who we are",
  },
  {
    kind: "p",
    parts: [
      `${site.privacy.entity} (“${site.brand.name}”, “we”) is the controller for personal data collected through this site. The maison is in Geneva. Boutiques in Paris, London, New York and Tokyo are listed for viewing appointments; they do not run separate websites.`,
    ],
  },
  {
    kind: "p",
    parts: [
      "If you publish this template under another name, you become the controller. Replace the entity, address and email on this page before collecting real enquiries.",
    ],
  },
  {
    kind: "h2",
    id: "device",
    text: "Data that stays on this device",
  },
  {
    kind: "p",
    parts: [
      "These items are stored in your browser (local storage or session storage). They are not uploaded to the maison. Clearing your browser data, or using Erase below, removes them here.",
    ],
  },
  {
    kind: "table",
    headers: ["What", "Why", "Basis"],
    rows: [
      [
        "Selection tray",
        "Remember watches you added during this visit. The tray is held in memory and is not written to disk.",
        "Necessary for the site to work",
      ],
      [
        "Wishlist, compare, recently viewed, registered pieces, study compositions",
        "Keep a cabinet of references and finishing studies between visits. Registered serials stay on this device until you erase them.",
        "Necessary for a feature you use",
      ],
      [
        "Maison and currency",
        "Remember which maison (Geneva, Paris, London, New York, Tokyo) and which currency to show. May be set from your country or timezone on first visit, then kept if you change it.",
        "Necessary for a feature you use",
      ],
      [
        "Paper/ivoire theme, reduced motion",
        "Keep display preferences you set in the bar.",
        "Necessary for a feature you use",
      ],
      [
        "Cookie choice",
        "Remember whether analytics may run, so we do not ask on every page.",
        "Consent (Swiss FADP / GDPR)",
      ],
      [
        "Introduction dismissed",
        "Skip the opening sequence for the rest of this session only.",
        "Necessary for the site to work",
      ],
    ],
  },
  {
    kind: "p",
    parts: [
      "We do not use advertising cookies, third-party heatmaps, or social pixels. The cookie banner refers to this local storage and to optional analytics — not to a marketing stack.",
    ],
  },
  {
    kind: "h2",
    id: "forms",
    text: "Information you send us",
  },
  {
    kind: "p",
    parts: [
      "When you submit a form, we process what you type so we can answer. Fields are only those on the form. We do not buy lists or append extra profiles.",
    ],
  },
  {
    kind: "table",
    headers: ["Form", "Typical fields", "Purpose"],
    rows: [
      [
        "Newsletter / Meridian early access",
        "Email, optional name, which page you joined from",
        "Early looks at the Meridian collection, then occasional maison letters. Consent.",
      ],
      [
        "Boutique appointment",
        "Name, email, phone, house, date, message, watch",
        "To prepare a private viewing. Steps toward a contract.",
      ],
      [
        "Waitlist",
        "Name, email, watch, edition",
        "To write when a waitlisted reference can be seen. Consent.",
      ],
      [
        "Specialist",
        "Name, email, maison, message, watch",
        "To answer a question about availability or a piece. Consent / steps toward a contract.",
      ],
      [
        "Timepiece registration",
        "Name, email, reference, caseback number, notes",
        "Service history for a watch you own. Contract / legitimate interest in after-sales.",
      ],
    ],
  },
  {
    kind: "p",
    parts: [
      "On a Netlify deploy, those posts are stored as Netlify Forms submissions for the site owner. On any other host, configure an equivalent inbox before inviting real clients. We keep enquiries as long as needed to complete the viewing, waitlist or service, then delete or archive according to Swiss commercial record rules where they apply (generally up to ten years for client files tied to a sale or repair).",
    ],
  },
  {
    kind: "p",
    parts: [
      "Newsletter addresses are used only for Meridian early access and maison letters. You may unsubscribe by writing to us. We do not sell lists.",
    ],
  },
  {
    kind: "h2",
    id: "checkout",
    text: "Preview checkout",
  },
  {
    kind: "p",
    parts: [
      "The payment screen is a preview. Card number, expiry and CVC stay in the browser for that session. They are not sent to a processor, not stored, and not used to charge. Do not enter a live card. A completed preview produces an on-screen receipt only.",
    ],
  },
  {
    kind: "h2",
    id: "hosting",
    text: "Hosting, fonts and images",
  },
  {
    kind: "p",
    parts: [
      "The site is served from a hosting provider (for example Vercel or Netlify). The host logs technical data such as IP address, time, requested path and browser type to operate the network, detect abuse and measure availability. Those logs follow the host’s own terms and retention.",
    ],
  },
  {
    kind: "p",
    parts: [
      "Type is loaded from Google Fonts (Cormorant Garamond, Outfit). Google may see your IP address when the files are fetched. Some editorial stills are requested from Unsplash; Unsplash may see the image request. We do not control those third-party logs. You can block third-party requests in your browser; the maison layout still works with system fonts.",
    ],
  },
  {
    kind: "h2",
    id: "analytics",
    text: "Analytics",
  },
  {
    kind: "p",
    parts: [
      "Optional and off until you allow it. If you choose “Allow analytics”, this browser may record named events such as intro_start, intro_skip, intro_complete and pageview. Events stay in this tab (a custom event, and window.dataLayer if a tag manager is added later). We then load Vercel Analytics and, if the site owner has set a Plausible domain, Plausible. Neither script runs until you allow it. We do not load Google Analytics, advertising pixels, or session replay unless you later add them — and those must wait for this same consent.",
    ],
  },
  { kind: "slot", name: "analytics" },
  {
    kind: "h2",
    id: "rights",
    text: "Your rights",
  },
  {
    kind: "p",
    parts: [
      "Under the Swiss Federal Act on Data Protection and, where it applies, the EU GDPR, you may ask to access, correct or erase personal data we hold, restrict or object to certain processing, withdraw consent (without affecting earlier lawful use), and receive a copy of data you provided in a common format. You may lodge a complaint with the Swiss Federal Data Protection and Information Commissioner (FDPIC) or with a supervisory authority in your country of residence in the EEA or UK.",
    ],
  },
  {
    kind: "p",
    parts: [
      `To exercise rights about data on this device, use Erase below. To exercise rights about a form you sent, write to ${site.privacy.email} from the same address and name the form (newsletter, appointment, waitlist, specialist, or registration).`,
    ],
  },
  {
    kind: "p",
    parts: [
      "The site is not directed at children under 16. If you believe a child has sent us personal data, write to us and we will delete it.",
    ],
  },
  { kind: "slot", name: "erase" },
  {
    kind: "h2",
    text: "How long we keep data",
  },
  {
    kind: "p",
    parts: [
      "Device storage lasts until you clear it or it is overwritten. Hosting logs follow the host. Form submissions are kept for the purpose above, then deleted or archived. We do not keep preview card details.",
    ],
  },
  {
    kind: "h2",
    text: "Sharing",
  },
  {
    kind: "p",
    parts: [
      "We share personal data only with processors who host the site or receive form posts (the hosting platform), with a boutique if you asked for a viewing there, and if the law requires it. We do not sell personal data or share it for advertising.",
    ],
  },
  {
    kind: "h2",
    text: "Transfers",
  },
  {
    kind: "p",
    parts: [
      "The maison is in Switzerland. Hosting, fonts or form inboxes may process data in the EU, the UK or the United States. Where GDPR applies, we rely on an adequacy decision (Switzerland, UK) or the processor’s standard contractual clauses.",
    ],
  },
  {
    kind: "h2",
    id: "contact",
    text: "Contact",
  },
  {
    kind: "p",
    parts: [
      "For a watch, a viewing, or the catalogue, ",
      { href: "/contact", label: "speak to a specialist" },
      " — there is no generic contact form.",
    ],
  },
  {
    kind: "p",
    parts: [
      `${site.privacy.entity}\n${site.privacy.address}\n${geneva.phone}\n`,
      { href: `mailto:${site.privacy.email}`, label: site.privacy.email },
    ],
  },
  {
    kind: "p",
    parts: [
      "We will update this policy if the site starts to process data differently — for example if a real payment provider is connected. Vercel Analytics and optional Plausible already wait for “Allow analytics”. The date at the top will change.",
    ],
  },
];

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isLink(part: PolicyPart): part is PolicyLink {
  return typeof part === "object";
}

function renderPartsHtml(parts: PolicyPart[]) {
  return parts
    .map((part) => {
      if (!isLink(part)) {
        return escapeHtml(part).replaceAll("\n", "<br />");
      }
      return `<a href="${escapeHtml(part.href)}">${escapeHtml(part.label)}</a>`;
    })
    .join("");
}

export function privacyArticleHtml(options: { analyticsChoice?: string } = {}) {
  const choice = options.analyticsChoice ?? "not yet chosen — open this page with JavaScript to set it";
  const toc = privacyToc
    .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
    .join("\n          ");

  const body = privacyBlocks
    .map((block) => {
      if (block.kind === "h2") {
        const id = block.id ? ` id="${escapeHtml(block.id)}"` : "";
        return `        <h2${id}>${escapeHtml(block.text)}</h2>`;
      }
      if (block.kind === "p") {
        return `        <p>${renderPartsHtml(block.parts)}</p>`;
      }
      if (block.kind === "table") {
        const head = block.headers.map((cell) => `<th>${escapeHtml(cell)}</th>`).join("");
        const rows = block.rows
          .map(
            (row) =>
              `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`,
          )
          .join("\n            ");
        return `        <table class="privacy-table">
          <thead><tr>${head}</tr></thead>
          <tbody>
            ${rows}
          </tbody>
        </table>`;
      }
      if (block.name === "analytics") {
        return `        <p>Current choice on this device: <strong>${escapeHtml(choice)}</strong>. You can change it at any time when JavaScript is available. Essential-only stops analytics immediately; it does not delete form messages already sent.</p>
        <p>Write to <a href="mailto:${escapeHtml(site.privacy.email)}">${escapeHtml(site.privacy.email)}</a> if you cannot use the on-page controls.</p>`;
      }
      return `        <p>To erase maison data stored in this browser, clear site data in your browser settings, or open this page with JavaScript and use Erase data on this device.</p>`;
    })
    .join("\n");

  return `<article class="article privacy-policy" id="privacy-policy">
        <div class="eyebrow">Legal</div>
        <h1>Privacy policy</h1>
        <p class="lede">${escapeHtml(privacyLede)}</p>
        <p class="privacy-meta">${escapeHtml(privacyMetaLine())}</p>
        <nav class="privacy-toc" aria-label="Policy sections">
          ${toc}
        </nav>
${body}
        <p><a class="section-link" href="/">Return home</a></p>
      </article>`;
}
