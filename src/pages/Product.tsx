import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatPrice, getProduct, relatedProducts, site } from "../config/site";
import { ProductCard } from "../components/ui/ProductCard";
import { MagneticButton } from "../components/ui/MagneticButton";
import { WatchFace } from "../components/watch/WatchFace";
import { useCabinet } from "../context/CabinetContext";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";
import { WatchStudio } from "../components/motion/WatchStudio";
import { NotFound } from "./NotFound";

export function Product() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const { setCartOpen } = useUI();
  const { toggleWish, toggleCompare, wished, compared, remember, recent } = useCabinet();
  const [shot, setShot] = useState(0);
  const [studio, setStudio] = useState<"photo" | "calibre" | "volume">("photo");
  const [openGroup, setOpenGroup] = useState("Movement");
  const [wrist, setWrist] = useState(170);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    if (product) remember(product.slug);
    setShot(0);
    setStudio("photo");
  }, [product, remember]);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!product) return <NotFound />;

  const recentWatches = recent
    .filter((item) => item !== product.slug)
    .map((item) => getProduct(item))
    .filter(Boolean);

  return (
    <div className="page">
      {sticky && (
        <div className="sticky-buy">
          <strong>{product.name}</strong>
          <span>{formatPrice(product.price)}</span>
          <MagneticButton
            onClick={() => {
              add(product.slug);
              setCartOpen(true);
            }}
          >
            Add to tray
          </MagneticButton>
        </div>
      )}

      <section className="pdp">
        <div>
          <div className="pdp-stage">
            {studio === "volume" ? (
              <WatchStudio design={product.design} />
            ) : studio === "calibre" ? (
              <WatchFace {...product.design} brand={site.brand.name} size={420} />
            ) : (
              <img src={product.images[shot]} alt={product.name} />
            )}
            <div className="pdp-toggles">
              <button className={studio === "photo" ? "is-on" : ""} onClick={() => setStudio("photo")}>
                Photography
              </button>
              <button className={studio === "calibre" ? "is-on" : ""} onClick={() => setStudio("calibre")}>
                Studio calibre
              </button>
              <button className={studio === "volume" ? "is-on" : ""} onClick={() => setStudio("volume")}>
                Volume
              </button>
            </div>
          </div>
          {studio === "photo" && (
            <div className="thumbs">
              {product.images.map((src, index) => (
                <button key={src} className={shot === index ? "is-on" : ""} onClick={() => setShot(index)}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="crumbs">
            <Link to="/collection">Watches</Link>
            <span>/</span>
            <Link to={`/collection/${product.collectionSlug}`}>{product.collection}</Link>
          </div>
          <div className="eyebrow">
            {product.reference}
            {product.limited ? " · Atelier edition" : ""}
          </div>
          <h1 className="display">{product.name}</h1>
          <p className="pdp-kicker">{product.tagline}</p>
          <div className="price">{formatPrice(product.price)}</div>
          <p className="availability">{product.availability}</p>
          <p className="lede">{product.description}</p>
          <div className="pdp-facts">
            <span>{product.diameter} mm</span>
            <span>{product.material}</span>
            <span>{product.waterResistance} m WR</span>
            <span>{product.movementType}</span>
          </div>
          <div className="hero-actions">
            <MagneticButton
              onClick={() => {
                add(product.slug);
                setCartOpen(true);
              }}
            >
              Add to tray
            </MagneticButton>
            <MagneticButton variant="ghost" to={`/boutique?watch=${product.slug}`}>
              Contact a boutique
            </MagneticButton>
          </div>
          <div className="pdp-tools">
            <button className={wished(product.slug) ? "is-on" : ""} onClick={() => toggleWish(product.slug)}>
              {wished(product.slug) ? "In wishlist" : "Save to wishlist"}
            </button>
            <button className={compared(product.slug) ? "is-on" : ""} onClick={() => toggleCompare(product.slug)}>
              {compared(product.slug) ? "Added to compare" : "Compare"}
            </button>
          </div>

          <div className="specs">
            {product.specGroups.map((group) => (
              <div key={group.title}>
                <button
                  className={`spec-toggle ${openGroup === group.title ? "is-on" : ""}`}
                  onClick={() => setOpenGroup(openGroup === group.title ? "" : group.title)}
                >
                  {group.title}
                </button>
                {openGroup === group.title &&
                  group.rows.map((row) => (
                    <div className="spec" key={row.label}>
                      <span>{row.label}</span>
                      <strong>{row.value}</strong>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tryon-section">
        <div className="tryon">
          <div className="wrist" style={{ ["--wrist-scale" as string]: String(0.7 + (wrist - 150) / 250) }}>
            <div className="wrist-band" />
            <WatchFace {...product.design} brand={site.brand.name} size={200} />
          </div>
          <div>
            <div className="eyebrow">On the wrist</div>
            <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 52px)", marginBottom: 16 }}>
              How {product.name} wears.
            </h2>
            <p className="lede">
              {product.story} Adjust the slider to preview scale on a {wrist} mm wrist.
            </p>
            <label className="finder-label">
              Wrist circumference · {wrist} mm
              <input
                type="range"
                min={140}
                max={210}
                value={wrist}
                onChange={(event) => setWrist(Number(event.target.value))}
              />
            </label>
          </div>
        </div>
      </section>

      <section className="related">
        <div className="section-head">
          <h2 className="display">In the same line</h2>
          <Link className="section-link" to={`/collection/${product.collectionSlug}`}>
            {product.collection}
          </Link>
        </div>
        <div className="product-grid">
          {relatedProducts(product.slug).map((item, index) => (
            <ProductCard key={item.slug} product={item} index={index} />
          ))}
        </div>
      </section>

      {recentWatches.length > 0 && (
        <section className="related">
          <div className="section-head">
            <h2 className="display">Recently viewed</h2>
          </div>
          <div className="product-grid">
            {recentWatches.slice(0, 3).map((item, index) => (
              <ProductCard key={item!.slug} product={item!} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
