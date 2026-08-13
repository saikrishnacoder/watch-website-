import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice, site, type Product } from "../../config/site";
import { useCart } from "../../context/CartContext";
import { useUI } from "../../context/UIContext";
import { WatchFace } from "../watch/WatchFace";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { add } = useCart();
  const { setCartOpen } = useUI();

  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <Link to={`/watch/${product.slug}`} className="product-visual">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <WatchFace {...product.design} brand={site.brand.name} size={240} />
      </Link>
      <div className="product-body">
        <div className="product-line">{product.collection}</div>
        <h3>{product.name}</h3>
        <div className="product-price">{formatPrice(product.price)}</div>
        <div className="product-actions">
          <Link className="btn btn-ghost" to={`/watch/${product.slug}`}>
            View
          </Link>
          <button
            className="btn"
            onClick={() => {
              add(product.slug);
              setCartOpen(true);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
