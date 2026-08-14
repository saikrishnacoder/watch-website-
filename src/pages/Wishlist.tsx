import { Link } from "react-router-dom";
import { getProduct } from "../config/site";
import { useCabinet } from "../context/CabinetContext";
import { ProductCard } from "../components/ui/ProductCard";

export function Wishlist() {
  const { wish, compare } = useCabinet();
  const items = wish.map((slug) => getProduct(slug)).filter(Boolean);

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Wishlist</div>
        <h1 className="display">Saved for later.</h1>
        <p className="lede">
          Shortlist across Heritage, Chronograph, Diver, Imperial and Meridian. Save to compare when you want three on
          one sheet — then book a viewing.
        </p>
        {compare.length > 0 && (
          <Link className="section-link" to="/compare">
            Compare {compare.length}
          </Link>
        )}
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        {items.length === 0 ? (
          <p className="empty">
            Your list is empty. Browse the{" "}
            <Link to="/collection" style={{ color: "var(--gold)" }}>
              five lines
            </Link>
            , then save a watch here or to compare.
          </p>
        ) : (
          <div className="product-grid">
            {items.map((product, index) => (
              <ProductCard key={product!.slug} product={product!} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
