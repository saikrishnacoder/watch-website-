import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getProduct, relatedProducts, site } from "../config/site";
import type { WatchDesign } from "../config/site";
import { papersFor, maisonInclusions } from "../config/papers";
import { ProductCard } from "../components/ui/ProductCard";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Caseback } from "../components/watch/Caseback";
import { WatchFace } from "../components/watch/WatchFace";
import { useCabinet } from "../context/CabinetContext";
import { useMoney } from "../context/CurrencyContext";
import { useUI } from "../context/UIContext";
import { WatchStudio } from "../components/motion/WatchStudio";
import { StudioStage } from "../components/watch/StudioStage";
import { Lightbox } from "../components/motion/Lightbox";
import { SizeGuide, useSizeGuide } from "../components/ui/SizeGuide";
import { CraftModal, CraftStrip } from "../components/watch/CraftSheet";
import { PhotoZoom } from "../components/watch/PhotoZoom";
import { ProductCompose, strapFromDesign } from "../components/watch/ProductCompose";
import { WaitlistForm } from "../components/watch/WaitlistForm";
import { RecentlyViewed } from "../components/sections/RecentlyViewed";
import { braceletColor, isLightDial } from "../lib/composition";
import { NotFound } from "./NotFound";

export function Product() {
  const { slug = "" } = useParams();
  const location = useLocation();
  const product = getProduct(slug);
  const { formatPrice } = useMoney();
  const { setToast } = useUI();
  const { toggleWish, toggleCompare, wished, compared, remember, compare, saveComposition } = useCabinet();
  const [shot, setShot] = useState(0);
  const [studio, setStudio] = useState<"render" | "photo" | "calibre" | "volume">("volume");
  const [openGroup, setOpenGroup] = useState("Movement");
  const [wrist, setWrist] = useState(170);
  const [sticky, setSticky] = useState(false);
  const [engraving, setEngraving] = useState("");
  const [lightbox, setLightbox] = useState(false);
  const { open: sizeOpen, openGuide, closeGuide } = useSizeGuide();
  const [craftOpen, setCraftOpen] = useState(false);
  const [dialHex, setDialHex] = useState(product?.design.dial ?? "#f3ead8");
  const [strap, setStrap] = useState(() =>
    product ? strapFromDesign(product.design) : site.customizer.straps[0],
  );
  const [composeNote, setComposeNote] = useState("");

  useEffect(() => {
    if (product) remember(product.slug);
    setShot(0);
    setStudio("volume");
    if (product) {
      setDialHex(product.design.dial);
      setStrap(strapFromDesign(product.design));
      setComposeNote("");
    }
  }, [product, remember]);

  useEffect(() => {
    setCraftOpen(location.hash === "#craft");
  }, [location.hash]);

  const composedDesign = useMemo<WatchDesign | null>(() => {
    if (!product) return null;
    return {
      ...product.design,
      dial: dialHex,
      dialText: isLightDial(dialHex) ? "#1a1814" : "#f4efe6",
      strap: strap.id,
      strapColor: strap.id === "bracelet" ? braceletColor(product.design.caseMetal) : strap.color,
    };
  }, [product, dialHex, strap]);

  const liveProduct = useMemo(() => {
    if (!product || !composedDesign) return product;
    return { ...product, design: composedDesign };
  }, [product, composedDesign]);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!product || !liveProduct || !composedDesign) return <NotFound />;

  const waitlisted = product.availability === "Waitlist";
  const scarce = waitlisted || Boolean(product.limited);
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
          <MagneticButton to={boutiqueTo}>Private Viewing</MagneticButton>
          <MagneticButton variant="ghost" to={boutiqueTo}>
            Request Availability
          </MagneticButton>
        </div>
      )}

      <section className="pdp">
        <div>
          <div className="pdp-stage">
            {studio === "volume" ? (
              <WatchStudio product={liveProduct} />
            ) : studio === "calibre" ? (
              <WatchFace {...composedDesign} brand={site.brand.name} size={420} />
            ) : studio === "render" ? (
              <StudioStage product={liveProduct} size={400} />
            ) : (
              <PhotoZoom src={product.images[shot]} alt={product.name} />
            )}
            <div className="pdp-toggles">
              <button className={studio === "volume" ? "is-on" : ""} onClick={() => setStudio("volume")}>
                360°
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
              <button type="button" className="text-link" onClick={() => setLightbox(true)}>
                Open full frame
              </button>
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
          <p className="availability">
            {product.limited
              ? `${product.badge ?? "Atelier edition"} · ${product.availability}`
              : product.availability}
          </p>
          <p className="lede">{product.description}</p>
          <div className="pdp-facts">
            <span>{product.diameter} mm</span>
            <span>{product.material}</span>
            <span>{product.waterResistance} m WR</span>
            <span>{product.movementType}</span>
          </div>
          <CraftStrip product={product} onOpen={() => setCraftOpen(true)} />
          <ProductCompose
            product={product}
            design={composedDesign}
            onDial={(hex) => {
              setDialHex(hex);
              if (studio === "photo") setStudio("volume");
            }}
            onStrap={(next) => {
              setStrap(next);
              if (studio === "photo") setStudio("volume");
            }}
          />
          <p className="studio-note" style={{ marginBottom: 16 }}>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                saveComposition({
                  caseMetal: composedDesign.caseMetal,
                  dial: composedDesign.dial,
                  dialLabel:
                    site.customizer.dials.find((item) => item.id === composedDesign.dial)?.label ?? "Dial",
                  markers: composedDesign.markers,
                  hands: composedDesign.hands,
                  bezel: composedDesign.bezel,
                  strap: composedDesign.strap,
                  strapColor: composedDesign.strapColor,
                  strapLabel: strap.label,
                });
                setComposeNote("Saved to the cabinet on this device.");
              }}
            >
              Save this composition
            </button>
            {" · "}
            <Link to="/compose">Full composer</Link>
          </p>
          {composeNote && <p className="form-note">{composeNote}</p>}
          <div className="hero-actions">
            <MagneticButton to={boutiqueTo}>Private Viewing</MagneticButton>
            <MagneticButton variant="ghost" to={boutiqueTo}>
              Request Availability
            </MagneticButton>
          </div>
          {scarce && <WaitlistForm product={product} />}
          <div className="pdp-shortlist">
            <button
              type="button"
              className={wished(product.slug) ? "is-on" : ""}
              aria-pressed={wished(product.slug)}
              onClick={() => {
                toggleWish(product.slug);
                setToast(wished(product.slug) ? "Removed from wishlist." : "Saved to wishlist.");
              }}
            >
              {wished(product.slug) ? "In wishlist" : "Save to wishlist"}
            </button>
            <button
              type="button"
              className={compared(product.slug) ? "is-on" : ""}
              aria-pressed={compared(product.slug)}
              onClick={() => {
                if (!compared(product.slug) && compare.length >= 3) {
                  setToast("Three watches is the comparison. Remove one first.");
                  return;
                }
                toggleCompare(product.slug);
                setToast(compared(product.slug) ? "Removed from compare." : "Saved to compare.");
              }}
            >
              {compared(product.slug) ? "In compare" : "Save to compare"}
            </button>
          </div>
          <div className="pdp-tools">
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
            <button type="button" onClick={() => setCraftOpen(true)}>
              Craftsmanship sheet
            </button>
            <Link to={boutiqueTo}>Private Viewing</Link>
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
            <WatchFace {...composedDesign} brand={site.brand.name} size={200} />
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
      <CraftModal product={product} open={craftOpen} onClose={() => setCraftOpen(false)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
