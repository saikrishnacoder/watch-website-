import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { galleryFor, type Product } from "../../config/site";
import { useCabinet } from "../../context/CabinetContext";
import { useMoney } from "../../context/CurrencyContext";
import { useMotion } from "../../context/MotionContext";
import { useUI } from "../../context/UIContext";
import { tapFeel } from "../../lib/feel";
import { FrameImage } from "./FrameImage";

type ProductCardProps = {
  product: Product;
  index?: number;
  priority?: boolean;
};

export function ProductCard({ product, index = 0, priority = false }: ProductCardProps) {
  const { toggleWish, toggleCompare, wished, compared, compare } = useCabinet();
  const { formatPrice } = useMoney();
  const { reduceMotion } = useMotion();
  const { setToast } = useUI();
  const frames = galleryFor(product);
  const hero = frames[0];
  const hover = frames[1] ?? frames[0];

  return (
    <motion.article
      className="product-card watch-card"
      initial={reduceMotion || priority ? false : { opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: reduceMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      layout={!reduceMotion}
    >
      <div className="product-visual">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {product.availability === "Waitlist" && !product.badge && (
          <span className="product-badge is-wait">Waitlist</span>
        )}
        {product.limited && !product.badge && product.availability !== "Waitlist" && (
          <span className="product-badge is-wait">Atelier edition</span>
        )}
        <div className="card-tools">
          <button
            className={wished(product.slug) ? "is-on" : ""}
            aria-label={`Save ${product.name} to wishlist`}
            onClick={() => {
              tapFeel();
              toggleWish(product.slug);
              setToast(wished(product.slug) ? "Removed from wishlist." : "Saved to wishlist.");
            }}
          >
            ♥
          </button>
          <button
            className={compared(product.slug) ? "is-on" : ""}
            aria-label={`Save ${product.name} to compare`}
            onClick={() => {
              if (!compared(product.slug) && compare.length >= 3) {
                setToast("Three watches is the comparison. Remove one first.");
                return;
              }
              tapFeel();
              toggleCompare(product.slug);
              setToast(compared(product.slug) ? "Removed from compare." : "Saved to compare.");
            }}
          >
            ⧉
          </button>
        </div>
        <Link to={`/watch/${product.slug}`} className="card-media" aria-label={`${product.name}, open gallery`}>
          {hero && (
            <FrameImage
              src={hero.src}
              alt={hero.alt}
              className="card-photo"
              width={1600}
              height={1200}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={priority ? "high" : "low"}
            />
          )}
          {hover && hover.src !== hero?.src && (
            <FrameImage
              src={hover.src}
              alt=""
              className="card-photo-next"
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
            />
          )}
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
          {product.limited ? `${product.badge ?? "Atelier edition"} · ${product.availability}` : product.availability}
        </p>
        <div className="product-price">{formatPrice(product.price)}</div>
        <div className="product-actions">
          <Link className="btn btn-ghost" to={`/watch/${product.slug}`}>
            Gallery
          </Link>
          <button
            type="button"
            className="btn"
            onClick={() => {
              if (!compared(product.slug) && compare.length >= 3) {
                setToast("Three watches is the comparison. Remove one first.");
                return;
              }
              tapFeel();
              toggleCompare(product.slug);
              setToast(compared(product.slug) ? "Removed from compare." : "Saved to compare.");
            }}
          >
            {compared(product.slug) ? "In compare" : "Save to compare"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
