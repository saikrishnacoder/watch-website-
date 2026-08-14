import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, relatedProducts, site } from "../config/site";
import { papersFor, maisonInclusions } from "../config/papers";
import { ProductCard } from "../components/ui/ProductCard";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Caseback } from "../components/watch/Caseback";
import { WatchFace } from "../components/watch/WatchFace";
import { useCabinet } from "../context/CabinetContext";
import { useCart } from "../context/CartContext";
import { useMoney } from "../context/CurrencyContext";
import { useUI } from "../context/UIContext";
import { WatchStudio } from "../components/motion/WatchStudio";
import { StudioStage } from "../components/watch/StudioStage";
import { Lightbox } from "../components/motion/Lightbox";
import { SizeGuide, useSizeGuide } from "../components/ui/SizeGuide";
import { RecentlyViewed } from "../components/sections/RecentlyViewed";
import { openSpecialist } from "../lib/specialist";
import { NotFound } from "./NotFound";

export function Product() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { add, addOnce } = useCart();
  const { formatPrice } = useMoney();
  const { setCartOpen, setToast } = useUI();
  const { toggleWish, toggleCompare, wished, compared, remember } = useCabinet();
  const [shot, setShot] = useState(0);
  const [studio, setStudio] = useState<"render" | "photo" | "calibre" | "volume">("volume");
  const [openGroup, setOpenGroup] = useState("Movement");
  const [wrist, setWrist] = useState(170);
  const [sticky, setSticky] = useState(false);
  const [engraving, setEngraving] = useState("");
  const [lightbox, setLightbox] = useState(false);
  const [waitStatus, setWaitStatus] = useState("");
  const { open: sizeOpen, openGuide, closeGuide } = useSizeGuide();

  useEffect(() => {
    if (product) remember(product.slug);
    setShot(0);
    setStudio("volume");
  }, [product, remember]);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!product) return <NotFound />;

  const waitlisted = product.availability === "Waitlist";
  const boutiqueTo = `/boutique?watch=${product.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.reference,
    brand: { "@type": "Brand", name: site.brand.name },
    description: product.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "CHF",
      price: product.price,
      availability:
        product.availability === "Waitlist"
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
    },
  };

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
          {waitlisted ? (
            <MagneticButton variant="ghost" to={boutiqueTo}>
              Boutique
            </MagneticButton>
          ) : (
            <MagneticButton variant="ghost" to="/checkout" onClick={() => addOnce(product.slug)}>
              Buy — preview
            </MagneticButton>
          )}
        </div>
      )}

      <section className="pdp">
        <div>
          <div className="pdp-stage">
            {studio === "volume" ? (
              <WatchStudio product={product} />
            ) : studio === "calibre" ? (
              <WatchFace {...product.design} brand={site.brand.name} size={420} />
            ) : studio === "render" ? (
              <StudioStage product={product} size={400} />
            ) : (
              <button type="button" className="pdp-photo" onClick={() => setLightbox(true)}>
                <img src={product.images[shot]} alt={product.name} />
              </button>
            )}
            <div className="pdp-toggles">
              <button className={studio === "volume" ? "is-on" : ""} onClick={() => setStudio("volume")}>
                Inspect
              </button>
              <button className={studio === "render" ? "is-on" : ""} onClick={() => setStudio("render")}>
                Studio render
              </button>
              <button className={studio === "photo" ? "is-on" : ""} onClick={() => setStudio("photo")}>
                Photography
              </button>
              <button className={studio === "calibre" ? "is-on" : ""} onClick={() => setStudio("calibre")}>
                Studio calibre
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
            {waitlisted ? (
              <MagneticButton variant="ghost" to={boutiqueTo}>
                Enquire in boutique
              </MagneticButton>
            ) : (
              <MagneticButton variant="ghost" to="/checkout" onClick={() => addOnce(product.slug)}>
                Buy — preview
              </MagneticButton>
            )}
            <MagneticButton variant="ghost" onClick={() => openSpecialist("write")}>
              Speak to a specialist
            </MagneticButton>
          </div>
          {waitlisted && (
            <form
              className="waitlist-form"
              name="waitlist"
              method="POST"
              data-netlify="true"
              onSubmit={async (event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const data = new FormData(form);
                const params = new URLSearchParams();
                data.forEach((value, key) => params.append(key, String(value)));
                await fetch("/", {
                  method: "POST",
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: params.toString(),
                });
                setWaitStatus("You are on the maison waitlist. We write when a piece is released.");
                form.reset();
              }}
            >
              <input type="hidden" name="form-name" value="waitlist" />
              <input type="hidden" name="watch" value={product.slug} />
              <p hidden>
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>
              <div className="fields">
                <label className="field">
                  <input name="name" required placeholder="Full name" />
                </label>
                <label className="field">
                  <input type="email" name="email" required placeholder="Email" />
                </label>
              </div>
              <MagneticButton type="submit">Join the waitlist</MagneticButton>
              {waitStatus && <p className="form-note">{waitStatus}</p>}
            </form>
          )}
          <div className="pdp-tools">
            <button className={wished(product.slug) ? "is-on" : ""} onClick={() => toggleWish(product.slug)}>
              {wished(product.slug) ? "In wishlist" : "Save to wishlist"}
            </button>
            <button className={compared(product.slug) ? "is-on" : ""} onClick={() => toggleCompare(product.slug)}>
              {compared(product.slug) ? "Added to compare" : "Compare"}
            </button>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  setToast("Reference link copied.");
                } catch {
                  setToast("Copy the address bar to share this reference.");
                }
              }}
            >
              Share
            </button>
            <button type="button" onClick={openGuide}>
              Size guide
            </button>
            <button type="button" onClick={() => openSpecialist("write")}>
              Speak to a specialist
            </button>
            <Link to={boutiqueTo}>Boutique</Link>
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
          <ul className="pdp-inclusions">
            {maisonInclusions().map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
            <button type="button" className="text-link" onClick={openGuide}>
              Open the size guide
            </button>
          </div>
        </div>
      </section>

      <section className="section papers-section">
        <div className="papers">
          <div>
            <div className="eyebrow">The papers</div>
            <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 52px)", marginBottom: 16 }}>
              What leaves Geneva with the watch.
            </h2>
            <div className="papers-grid">
              {papersFor(product).map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="caseback-studio">
            <Caseback metal={product.design.caseMetal} reference={product.reference} engraving={engraving} size={260} />
            <label className="finder-label">
              Caseback engraving
              <input
                value={engraving}
                maxLength={12}
                placeholder="Initials or a short line"
                onChange={(event) => setEngraving(event.target.value.toUpperCase())}
              />
            </label>
            <p className="form-note">Twelve characters. Cut in the atelier after confirmation — complimentary.</p>
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

      <RecentlyViewed exclude={product.slug} />
      <Lightbox
        open={lightbox}
        src={product.images[shot]}
        title={product.name}
        caption={`${product.reference} · ${product.material}`}
        onClose={() => setLightbox(false)}
      />
      <SizeGuide open={sizeOpen} onClose={closeGuide} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
