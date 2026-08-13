import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { site } from "../config/site";
import { ProductCard } from "../components/ui/ProductCard";

export function Collection() {
  const [params] = useSearchParams();
  const initial = params.get("line") ?? "All";
  const known = site.collections as readonly string[];
  const [line, setLine] = useState(known.includes(initial) ? initial : "All");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const products = useMemo(() => {
    const filtered =
      line === "All" ? [...site.products] : site.products.filter((product) => product.collection === line);
    if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [line, sort]);

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">The collection</div>
        <h1 className="display">Every hour, considered.</h1>
        <p className="lede">
          Six signatures. Three lines. A maison small enough that each piece still leaves with a watchmaker’s mark.
        </p>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="filters">
          {site.collections.map((item) => (
            <button
              key={item}
              className={`filter-btn ${line === item ? "is-on" : ""}`}
              onClick={() => setLine(item)}
            >
              {item}
            </button>
          ))}
          <select
            className="filter-btn"
            value={sort}
            onChange={(event) => setSort(event.target.value as typeof sort)}
            aria-label="Sort"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price · low</option>
            <option value="price-desc">Price · high</option>
          </select>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
