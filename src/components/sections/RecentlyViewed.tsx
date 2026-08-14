import { Link } from "react-router-dom";
import { getProduct } from "../../config/site";
import { useCabinet } from "../../context/CabinetContext";
import { ProductCard } from "../ui/ProductCard";

export function RecentlyViewed({ exclude }: { exclude?: string }) {
  const { recent } = useCabinet();
  const watches = recent
    .filter((slug) => slug !== exclude)
    .map((slug) => getProduct(slug))
    .filter(Boolean)
    .slice(0, 4);

  if (watches.length === 0) return null;

  return (
    <section className="related">
      <div className="section-head">
        <h2 className="display">Recently viewed</h2>
        <Link className="section-link" to="/wishlist">
          Wishlist
        </Link>
      </div>
      <div className="product-grid">
        {watches.map((item, index) => (
          <ProductCard key={item!.slug} product={item!} index={index} />
        ))}
      </div>
    </section>
  );
}
