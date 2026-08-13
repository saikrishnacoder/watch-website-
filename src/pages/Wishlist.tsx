import { Link } from "react-router-dom";
import { getProduct } from "../config/site";
import { useCabinet } from "../context/CabinetContext";
import { ProductCard } from "../components/ui/ProductCard";

export function Wishlist() {
  const { wish } = useCabinet();
  const items = wish.map((slug) => getProduct(slug)).filter(Boolean);

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Wishlist</div>
        <h1 className="display">Saved for later.</h1>
        <p className="lede">Pieces you have set aside. Book a viewing when you are ready to meet them on the wrist.</p>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        {items.length === 0 ? (
          <p className="empty">
            Your list is empty. Browse the{" "}
            <Link to="/collection" style={{ color: "var(--gold)" }}>
              collection
            </Link>
            .
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
