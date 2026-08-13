# HORLOGE — Luxury Watch Website Template

A fully templatised maison site for a watch brand. Swap the config, keep the atelier.

The entire brand — name, palette, copy, collections, boutiques, and even the look of each watch — lives in one file:

```
src/config/site.ts
```

Change that file and the homepage, collection, product pages, customizer, cart, search, newsletter, and boutique booking all update with it.

## Pages

- `/` — cinematic home: preloader, hero, marquee, collection, stats, story, features, live watch customizer, lookbook, limited-edition countdown, testimonials, newsletter
- `/collection` — filterable, sortable catalogue
- `/watch/:slug` — product detail with live analog watch, specs, related pieces
- `/atelier` — craftsmanship timeline and gallery
- `/boutique` — maisons + Netlify Forms appointment request

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
