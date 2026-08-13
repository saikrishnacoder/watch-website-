import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice, site, type Product } from "../../config/site";
import { useCabinet } from "../../context/CabinetContext";
import { WatchFace } from "../watch/WatchFace";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleWish, toggleCompare, wished, compared } = useCabinet();
  const photo = product.images[0];

  return (
    <motion.article
      className="product-card watch-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <div className="product-visual anim-shimmer">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <div className="card-tools">
          <button
            className={wished(product.slug) ? "is-on" : ""}
            aria-label="Wishlist"
            onClick={() => toggleWish(product.slug)}
          >
            ♥
          </button>
          <button
            className={compared(product.slug) ? "is-on" : ""}
            aria-label="Compare"
            onClick={() => toggleCompare(product.slug)}
          >
            ⧉
          </button>
        </div>
        <Link to={`/watch/${product.slug}`} className="card-media">
          <img src={photo} alt={product.name} className="card-photo" />
          <div className="card-watch">
            <WatchFace {...product.design} brand={site.brand.name} size={220} />
          </div>
        </Link>
      </div>
      <div className="product-body">
        <div className="product-line">
          {product.collection} · {product.reference}
        </div>
        <h3>
          <Link to={`/watch/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="card-meta">
          {product.diameter} mm · {product.material}
        </p>
        <div className="product-price">{formatPrice(product.price)}</div>
        <div className="product-actions">
          <Link className="btn btn-ghost" to={`/watch/${product.slug}`}>
            Discover
          </Link>
          <Link className="btn" to={`/boutique?watch=${product.slug}`}>
            Boutique
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
