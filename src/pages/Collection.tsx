import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { site } from "../config/site";
import { ProductCard } from "../components/ui/ProductCard";

export function Collection() {
  const [params] = useSearchParams();
  const initial = params.get("line") ?? "All";
  const names = ["All", ...site.collectionLines.map((line) => line.name)];
  const [line, setLine] = useState(names.includes(initial) ? initial : "All");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "size">("featured");

  const products = useMemo(() => {
    const filtered =
      line === "All" ? [...site.products] : site.products.filter((product) => product.collection === line);
    if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
    if (sort === "size") filtered.sort((a, b) => a.diameter - b.diameter);
    return filtered;
  }, [line, sort]);

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">The collection</div>
        <h1 className="display">All models</h1>
        <p className="lede">
          Twelve current references across four families. Filter here, or use the{" "}
          <Link to="/finder" style={{ color: "var(--gold)" }}>
            Watch Finder
          </Link>{" "}
          for diameter, metal and depth.
        </p>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="line-tiles">
          {site.collectionLines.map((family) => (
            <Link key={family.slug} to={`/collection/${family.slug}`} className="line-tile">
              <img src={family.image} alt="" />
              <div>
                <strong>{family.name}</strong>
                <span>{family.tagline}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="filters">
          {names.map((item) => (
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
            <option value="size">Diameter</option>
            <option value="price-asc">Price · low</option>
            <option value="price-desc">Price · high</option>
          </select>
        </div>
        <p className="finder-count">{products.length} timepieces</p>
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
