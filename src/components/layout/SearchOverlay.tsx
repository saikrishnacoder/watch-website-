import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { useUI } from "../../context/UIContext";

type Hit = {
  href: string;
  title: string;
  meta: string;
  kind: "Watch" | "Line" | "Journal" | "Boutique";
};

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const watches: Hit[] = site.products.map((product) => ({
      href: `/watch/${product.slug}`,
      title: product.name,
      meta: `${product.collection} · ${product.reference}`,
      kind: "Watch",
    }));
    const lines: Hit[] = site.collectionLines.map((line) => ({
      href: `/collection/${line.slug}`,
      title: line.name,
      meta: line.tagline,
      kind: "Line",
    }));
    const stories: Hit[] = site.journal.map((article) => ({
      href: `/journal/${article.slug}`,
      title: article.title,
      meta: `${article.category} · ${article.date}`,
      kind: "Journal",
    }));
    const houses: Hit[] = site.boutiques.map((house) => ({
      href: "/boutique",
      title: house.city,
      meta: house.address,
      kind: "Boutique",
    }));
    const pool = [...watches, ...lines, ...stories, ...houses];
    if (!q) return watches.slice(0, 8);
    return pool
      .filter((hit) => `${hit.title} ${hit.meta} ${hit.kind}`.toLowerCase().includes(q))
      .slice(0, 12);
  }, [query]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          />
          <motion.div
            className="search-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
          >
            <header>
              <h2 id="search-title">Search the maison</h2>
              <span className="search-hint">⌘K</span>
              <button className="icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close search">
                ×
              </button>
            </header>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="A reference, a city, a line, a story…"
            />
            <div className="search-results">
              {results.map((hit) => (
                <Link
                  key={`${hit.kind}-${hit.href}-${hit.title}`}
                  className="search-hit"
                  to={hit.href}
                  onClick={() => setSearchOpen(false)}
                >
                  <strong>{hit.title}</strong>
                  <span>
                    {hit.kind} · {hit.meta}
                  </span>
                </Link>
              ))}
              {results.length === 0 && <p className="empty">No timepieces, stories or maisons match that search.</p>}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
