import { signatureProducts, site } from "../config/site"
import type { Product } from "../config/types"

type Brief = {
  answer: string
  links: { label: string; href: string }[]
}

const SUGGESTIONS = [
  "What is the gold meridian?",
  "A chronograph I can try",
  "Where is the Geneva boutique?",
  "How do I register a watch?",
]

export const conciergeSuggestions = SUGGESTIONS

export function briefFromCatalogue(question: string, watching?: Product): Brief {
  const q = question.toLowerCase()
  const links: Brief["links"] = []

  if (watching) {
    links.push({ label: watching.name, href: `/watch/${watching.slug}` })
  }

  if (/meridian|gold line|at 12|twelve/.test(q)) {
    return {
      answer:
        "The gold meridian is a stroke at twelve on every HORLOGE dial — thinner than a hair, drawn last. It is the maison's north, taken from Geneva. If it is missing, the watch is not ours. Production lines are Heritage, Chronograph, Diver, Imperial and Meridian; the namesake Meridian line carries GMT and dual time.",
      links: [
        { label: "The maison", href: "/maison" },
        { label: "Meridian line", href: "/collection/meridian" },
      ],
    }
  }

  if (/boutique|geneva|paris|london|tokyo|new york|viewing|appointment|try on|try it/.test(q)) {
    const house = site.boutiques.find((b) => q.includes(b.city.toLowerCase())) ?? site.boutiques[0]
    return {
      answer: `${house.city}: ${house.address}. ${house.hours}. Private viewings are by appointment — we prepare the tray, the papers, and a quiet room. An advisor writes within one working day.`,
      links: [
        { label: "Book a viewing", href: watching ? `/boutique?watch=${watching.slug}` : "/boutique" },
        { label: house.city, href: "/boutique" },
      ],
    }
  }

  if (/register|service|overhaul|warranty|repair|cabinet/.test(q)) {
    return {
      answer:
        "Register a timepiece in the cabinet with reference and caseback number. That record lives on this device until you erase it, and the atelier form notifies Geneva. Complete overhaul, regulation and refinishing are listed under Services. Warranty on the movement is five years; the meridian is meant to be refinished.",
      links: [
        { label: "Services", href: "/services" },
        { label: "Your cabinet", href: "/cabinet" },
      ],
    }
  }

  if (/compose|configur|custom|strap|dial colour|dial color/.test(q)) {
    return {
      answer:
        "The composer lets you preview case, dial, markers, hands, bezel and strap. It is a study, not a stock-keeping unit — the atelier confirms whether that composition can be made. Request it as a private viewing.",
      links: [{ label: "Compose a watch", href: "/compose" }],
    }
  }

  if (/calibre|movement|power|vph|ho-01|exploded/.test(q)) {
    return {
      answer:
        "Wrist watches use production calibres H-08, H-72, H-90, H-12 and H-24. The exploded drawing on this site is teaching calibre HO-01 — a concept architecture, not a specification sheet. Chronograph One, for example, is an H-72 automatic chronograph with a 48-hour reserve.",
      links: [
        { label: "Atelier study", href: "/atelier" },
        { label: "Chronograph One", href: "/watch/chronograph-one" },
      ],
    }
  }

  const line = site.collectionLines.find((l) => q.includes(l.name.toLowerCase()) || q.includes(l.slug))
  if (line) {
    return {
      answer: `${line.name} — ${line.tagline}. ${line.description} Calibre ${line.calibre}.`,
      links: [{ label: `${line.name} collection`, href: `/collection/${line.slug}` }],
    }
  }

  const named = signatureProducts().find(
    (p) => q.includes(p.name.toLowerCase()) || q.includes(p.reference.toLowerCase()) || q.includes(p.slug),
  )
  if (named) {
    return {
      answer: `${named.name} (${named.reference}). ${named.tagline} ${named.diameter} mm, ${named.material}, ${named.movement}. ${named.availability}.`,
      links: [
        { label: named.name, href: `/watch/${named.slug}` },
        { label: "Book a viewing", href: `/boutique?watch=${named.slug}` },
      ],
    }
  }

  if (/chrono|diver|heritage|imperial|under|price|chf|budget|sport|dress|gmt/.test(q)) {
    const pool = signatureProducts()
    const ranked = pool
      .map((p) => {
        let score = 0
        if (/chrono/.test(q) && p.collectionSlug === "chronograph") score += 3
        if (/diver|water|sport/.test(q) && p.collectionSlug === "diver") score += 3
        if (/heritage|dress|enamel/.test(q) && p.collectionSlug === "heritage") score += 3
        if (/imperial|gold/.test(q) && p.collectionSlug === "imperial") score += 3
        if (/gmt|travel|dual/.test(q) && p.collectionSlug === "meridian") score += 3
        const cap = q.match(/(\d[\d,\.]*)\s*(k|000)?/)
        if (cap) {
          const n = parseFloat(cap[1].replace(",", "")) * (cap[2] === "k" ? 1000 : cap[2] === "000" ? 1 : 1)
          if (p.price <= n) score += 2
        }
        if (/under|below/.test(q) && p.price < 10000) score += 1
        return { p, score }
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
    if (ranked.length) {
      return {
        answer: ranked.map(({ p }) => `${p.name} (${p.reference}) — ${p.tagline} From the ${p.collection} line.`).join(" "),
        links: ranked.map(({ p }) => ({ label: p.name, href: `/watch/${p.slug}` })),
      }
    }
  }

  if (watching) {
    return {
      answer: `You are looking at ${watching.name}, ${watching.reference}. ${watching.tagline} ${watching.availability}. I can open the collection, book a viewing, or take a note for an advisor.`,
      links: [
        { label: watching.name, href: `/watch/${watching.slug}` },
        { label: "Private viewing", href: `/boutique?watch=${watching.slug}` },
      ],
    }
  }

  return {
    answer:
      "I read the catalogue and the maison pages. Ask about the meridian, a line, a reference, a boutique, or how to register a watch. For a human advisor, leave a note — they write within one working day.",
    links: [
      { label: "Collection", href: "/collection" },
      { label: "Book a viewing", href: "/boutique" },
    ],
  }
}

export function catalogueContext(watching?: Product) {
  const lines = site.collectionLines.map((l) => `${l.name} (${l.slug}): ${l.tagline}. Calibre ${l.calibre}.`).join("\n")
  const pieces = signatureProducts()
    .slice(0, 24)
    .map((p) => `${p.name} | ${p.reference} | ${p.collection} | CHF ${p.price} | ${p.movement} | ${p.availability}`)
    .join("\n")
  const looking = watching ? `Currently viewing: ${watching.name} (${watching.reference}).` : "No product in view."
  return `HORLOGE is a fictional Geneva maison (1924) for this website. Do not invent production specifications beyond this brief. The gold meridian at 12 is the brand mark. Teaching calibre HO-01 is a concept drawing, not a production spec. Production calibres: H-08, H-72, H-90, H-12, H-24.\n${looking}\nLines:\n${lines}\nSignature watches:\n${pieces}`
}
