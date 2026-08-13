import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatPrice, site } from "../../config/site";
import { useUI } from "../../context/UIContext";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return site.products.slice(0, 4);
    return site.products.filter((product) =>
      [product.name, product.collection, product.tagline].join(" ").toLowerCase().includes(q),
    );
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
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
          >
            <header>
              <h2>Search the maison</h2>
              <button className="icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close search">
                ×
              </button>
            </header>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Chronograph, gold, sport…"
            />
            <div className="search-results">
              {results.map((product) => (
                <Link
                  key={product.slug}
                  className="search-hit"
                  to={`/watch/${product.slug}`}
                  onClick={() => setSearchOpen(false)}
                >
                  <strong>{product.name}</strong>
                  <span>
                    {product.collection} · {formatPrice(product.price)}
                  </span>
                </Link>
              ))}
              {results.length === 0 && <p className="empty">No timepieces match that search.</p>}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
