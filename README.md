# HORLOGE — Luxury Watch Website Template

A fully templatised maison site for a watch brand. Swap the config, keep the atelier.

The entire brand — name, palette, copy, collections, boutiques, and even the look of each watch — lives in:

```
src/config/site.ts
src/config/catalog.ts
```

Motion is generated in two places:

- **Python** — `scripts/generate_animations.py` writes animated SVGs (gears, tourbillon, hairspring, orbits) plus particle CSS
- **CSS** — `src/styles/css-motion.css` holds float, pulse, spin, shimmer, ken burns, clip-reveal, blob, ripple, heartbeat, and more

Visit `/motion` for the kinetic atelier.

## Pages

- `/` — cinematic home (Rolex-style hero, collection families, novelties, journal)
- `/collection` — all models with family tiles
- `/collection/:line` — Heritage, Chronograph, Diver, Imperial
- `/finder` — Watch Finder (diameter, metal, movement, water resistance, price)
- `/find` — guided matching quiz
- `/watch/:slug` — photography gallery, studio calibre view, spec sheets, wrist preview, sticky bar
- `/compare` — side-by-side technical comparison (up to 3)
- `/wishlist` — saved pieces
- `/journal` — maison editorial
- `/atelier` — craftsmanship
- `/services` — maintenance, warranty, registration
- `/boutique` — five maisons + appointment request

Catalogue and copy live in `src/config/site.ts` and `src/config/catalog.ts`.

## Features

- Config-driven theme (CSS variables injected from `site.theme`)
- Animated SVG watch faces (ticking seconds, metals, bezels, straps, markers)
- Gold custom cursor, magnetic buttons, page transitions, scroll progress
- Cart drawer, search overlay, mobile menu
- Limited-edition countdown
- Live watch customizer (case / dial / markers / strap)
- Netlify Forms for newsletter and boutique appointments
- SPA routing ready for Netlify

## Customize the maison

Open `src/config/site.ts` and edit:

| Field | What it changes |
| --- | --- |
| `brand` | Wordmark, founded year, tagline |
| `theme` | Background, ink, gold, fonts |
| `nav` | Header links |
| `hero` | Homepage headline and featured watch |
| `products` | Catalogue — including `design` for the animated watch |
| `collections` | Filter chips |
| `boutiques` | Appointment houses |
| `locale` / `currency` | Price formatting (`USD`, `INR`, `EUR`…) |

A product `design` block looks like this:

```ts
design: {
  caseMetal: "gold",       // steel | gold | rose | black
  dial: "#c5a46a",
  dialText: "#3a2a12",
  markers: "roman",        // baton | roman | arabic | dots
  hands: "dauphine",       // dauphine | sword | sport
  bezel: "fluted",         // none | fluted | tachymeter | ceramic
  strap: "leather",        // leather | bracelet | nato
  strapColor: "#3b2418",
  chronograph: false,
  dateWindow: true,
}
```

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Netlify settings are in `netlify.toml` (`npm run build` → `dist`). Client-side routes rewrite to `index.html`.

Forms are registered in `index.html` and `public/__forms.html` so Netlify can detect them from the React app. Enable Forms in the Netlify UI after the first deploy.

## Stack

Vite, React, TypeScript, Framer Motion, Netlify.
