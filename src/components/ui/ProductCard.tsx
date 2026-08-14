import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { site, type Product } from "../../config/site";
import { useCabinet } from "../../context/CabinetContext";
import { useMoney } from "../../context/CurrencyContext";
import { useMotion } from "../../context/MotionContext";
import { WatchFace } from "../watch/WatchFace";

type ProductCardProps = {
  product: Product;
  index?: number;
  priority?: boolean;
};

export function ProductCard({ product, index = 0, priority = false }: ProductCardProps) {
  const { toggleWish, toggleCompare, wished, compared } = useCabinet();
  const { formatPrice } = useMoney();
  const { reduceMotion } = useMotion();

  return (
    <motion.article
      className="product-card watch-card"
      initial={reduceMotion || priority ? false : { opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: reduceMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      layout={!reduceMotion}
    >
      <div className={`product-visual ${reduceMotion ? "" : "anim-shimmer"}`}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {product.availability === "Waitlist" && !product.badge && (
          <span className="product-badge is-wait">Waitlist</span>
        )}
        <div className="card-tools">
          <button
            className={wished(product.slug) ? "is-on" : ""}
            aria-label={`Save ${product.name} to wishlist`}
            onClick={() => toggleWish(product.slug)}
          >
            ♥
          </button>
          <button
            className={compared(product.slug) ? "is-on" : ""}
            aria-label={`Compare ${product.name}`}
            onClick={() => toggleCompare(product.slug)}
          >
            ⧉
          </button>
        </div>
        <Link to={`/watch/${product.slug}`} className="card-media">
          <img
            src="/studio/velvet.jpg"
            alt=""
            className="card-photo"
            width={1400}
            height={1050}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "low"}
          />
          <div className="card-watch">
            <WatchFace {...product.design} brand={site.brand.name} size={220} animate={!reduceMotion} />
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
        <p className={`card-avail is-${product.availability.replace(/\s/g, "-").toLowerCase()}`}>
          {product.availability}
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
