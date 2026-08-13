import { Link, useParams } from "react-router-dom";
import { formatPrice, getProduct, relatedProducts, site } from "../config/site";
import { ProductCard } from "../components/ui/ProductCard";
import { MagneticButton } from "../components/ui/MagneticButton";
import { WatchFace } from "../components/watch/WatchFace";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";
import { NotFound } from "./NotFound";

export function Product() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const { setCartOpen } = useUI();

  if (!product) return <NotFound />;

  return (
    <div className="page">
      <section className="pdp">
        <div className="pdp-stage">
          <WatchFace {...product.design} brand={site.brand.name} size={460} />
        </div>
        <div>
          <div className="eyebrow">
            {product.collection}
            {product.limited ? " · Atelier edition" : ""}
          </div>
          <h1 className="display">{product.name}</h1>
          <div className="price">{formatPrice(product.price)}</div>
          <p className="lede">{product.description}</p>
          <MagneticButton
            onClick={() => {
              add(product.slug);
              setCartOpen(true);
            }}
          >
            Add to tray
          </MagneticButton>
          <div className="specs">
            {product.specs.map((spec) => (
              <div className="spec" key={spec.label}>
                <span>{spec.label}</span>
                <strong>{spec.value}</strong>
              </div>
            ))}
          </div>
          <p className="lede">
            Prefer to see it on the wrist first?{" "}
            <Link to="/boutique" style={{ color: "var(--gold)" }}>
              Reserve a boutique appointment
            </Link>
            .
          </p>
        </div>
      </section>
      <section className="related">
        <div className="section-head">
          <h2 className="display">You may also wear</h2>
        </div>
        <div className="product-grid">
          {relatedProducts(product.slug).map((item, index) => (
            <ProductCard key={item.slug} product={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
