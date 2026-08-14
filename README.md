# HORLOGE — luxury maison website template

A freelance starter for an independent watch maison. Swap the documents and the config; keep the atelier.

Quiet luxury nav: **Collections**, **The Maison**, **Craft**, **Journal**, **Private Viewing**.

This is a **maison** template, not a shop. There is no cart and no checkout. Availability, waitlist, and a private viewing are the commercial model.

## What you swap for a client

| Layer | Where | What it is |
| --- | --- | --- |
| Essays | `content/` | Maison, Journal, collection chapters, Craft, Boutique, Heritage — Markdown |
| Brand & products | `src/config/site.ts`, `src/config/catalog.ts` | Name, palette, nav, watches, boutiques |
| Photography | `public/lines/`, `public/gallery/`, `public/media/`, `public/journal/`, `public/studio/` | Line heroes, product gallery (studio / dial / case), bench, movement, journal frames |

React stays for the watch studio (360°), exploded calibre, composer, concierge, and viewing forms. SEO HTML is stamped from the **same** Markdown files — not a second copy of the site.

Authoring map: `content/README.md`.

## Public journey

- `/` — cinematic home (five lines, craft teaser, journal, private viewing)
- `/collection` and `/collection/:line` — five atmospheres, one meridian
- `/watch/:slug` — product gallery (lean-in zoom, thumbs, lightbox), 360°, specs, waitlist / viewing
- `/atelier` — exploded calibre, loupe, 360°
- `/maison`, `/heritage`, `/journal`, `/journal/:slug` — essays
- `/boutique` — five maisons + appointment
- `/compose` — atelier study (not a SKU)
- `/wishlist`, `/compare`, `/cabinet` — on this device

`/checkout` and `/motion` redirect to Private Viewing and Craft.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

`python3 scripts/generate_animations.py` writes animated SVGs used on Craft. Netlify settings are in `netlify.toml` (`npm run build` → `dist`). Forms are registered in `index.html` and `public/__forms.html`.

## Stack

Vite, React, TypeScript, Framer Motion. Deploys on Netlify or Vercel.
