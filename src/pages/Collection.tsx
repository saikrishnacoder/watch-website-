import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { signatureProducts, site } from "../config/site";
import { ProductGrid } from "../components/ui/ProductGrid";
import { ProductCard } from "../components/ui/ProductCard";
import { RecentlyViewed } from "../components/sections/RecentlyViewed";
import { Reveal } from "../components/ui/Reveal";
import { MagneticButton } from "../components/ui/MagneticButton";

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

  const signatures = signatureProducts();

  return (
    <div className="page">
      <section className="collection-hero">
        <img src="/maison/meridian.jpg" alt="" />
        <div>
          <div className="eyebrow">The collection</div>
          <h1 className="display">Five lines. One meridian.</h1>
          <p className="lede">
            {site.products.length} current references. Signature pieces first — then the atelier catalogue. Filter here,
            or use the{" "}
            <Link to="/finder" style={{ color: "var(--gold)" }}>
              Watch Finder
            </Link>{" "}
            for diameter, metal and depth.
          </p>
          <MagneticButton to="/find">Find your watch</MagneticButton>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">The lines</div>
            <h2 className="display">Enter a family.</h2>
          </div>
        </div>
        <div className="line-chapters">
          {site.collectionLines.map((family, index) => (
            <Reveal key={family.slug} delay={index * 0.04} className={`line-chapter ${index % 2 ? "is-flip" : ""}`}>
              <Link to={`/collection/${family.slug}`} className="line-chapter-media">
                <img src={family.image} alt={family.name} />
              </Link>
              <div>
                <div className="eyebrow">
                  {family.name} · {family.calibre}
                </div>
                <h3 className="display">{family.tagline}</h3>
                <p>{family.description}</p>
                <p>{family.finishing}</p>
                <Link className="section-link" to={`/collection/${family.slug}`}>
                  {family.name} watches
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Signatures</div>
            <h2 className="display">The permanent collection.</h2>
          </div>
        </div>
        <div className="product-grid">
          {signatures.slice(0, 6).map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} priority={index < 2} />
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="catalogue">
        <div className="section-head">
          <div>
            <div className="eyebrow">Atelier catalogue</div>
            <h2 className="display">All current references.</h2>
          </div>
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
        <ProductGrid products={products} />
        <RecentlyViewed />
      </section>
    </div>
  );
}
