import { Link } from "react-router-dom";
import { getProduct, site, type Product } from "../config/site";
import { useCabinet } from "../context/CabinetContext";
import { useMoney } from "../context/CurrencyContext";
import { MagneticButton } from "../components/ui/MagneticButton";
import { WatchFace } from "../components/watch/WatchFace";

const rows = [
  { label: "Reference", key: "reference" },
  { label: "Collection", key: "collection" },
  { label: "Price", key: "price" },
  { label: "Diameter", key: "diameter" },
  { label: "Thickness", key: "thickness" },
  { label: "Material", key: "material" },
  { label: "Movement", key: "movement" },
  { label: "Type", key: "movementType" },
  { label: "Power reserve", key: "powerReserve" },
  { label: "Water resistance", key: "waterResistance" },
  { label: "Crystal", key: "crystal" },
  { label: "Bracelet", key: "bracelet" },
  { label: "Complications", key: "complications" },
  { label: "Availability", key: "availability" },
] as const;

export function Compare() {
  const { compare, toggleCompare, clearCompare } = useCabinet();
  const { formatPrice } = useMoney();
  const watches = compare
    .map((slug) => getProduct(slug))
    .filter((product): product is Product => Boolean(product));

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Compare</div>
        <h1 className="display">Side by side.</h1>
        <p className="lede">
          Up to three references. Diameter, calibre, depth and finishing — the same sheet a boutique advisor uses.
        </p>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        {watches.length === 0 ? (
          <p className="empty">
            Add watches with Save to compare — on a card or a product page. Up to three, across the five lines. Start in
            the{" "}
            <Link to="/finder" style={{ color: "var(--gold)" }}>
              Watch Finder
            </Link>
            .
          </p>
        ) : (
          <>
            <div className="compare-table">
              <div className="compare-head">
                <span />
                  {watches.map((product) => (
                  <div key={product.slug} className="compare-watch">
                    <WatchFace {...product.design} brand={site.brand.name} size={160} />
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)}</p>
                    <MagneticButton to={`/watch/${product.slug}`}>Discover</MagneticButton>
                    <button className="text-link" onClick={() => toggleCompare(product.slug)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              {rows.map((row) => (
                <div className="compare-row" key={row.key}>
                  <span>{row.label}</span>
                  {watches.map((product) => {
                    const value = product[row.key];
                    let text = Array.isArray(value) ? value.join(", ") || "—" : String(value);
                    if (row.key === "price") text = formatPrice(product.price);
                    if (row.key === "diameter") text = `${product.diameter} mm`;
                    if (row.key === "thickness") text = `${product.thickness} mm`;
                    if (row.key === "powerReserve") text = `${product.powerReserve} hours`;
                    if (row.key === "waterResistance") text = `${product.waterResistance} m`;
                    return <strong key={product.slug}>{text}</strong>;
                  })}
                </div>
              ))}
            </div>
            <button className="btn btn-ghost" onClick={clearCompare} style={{ marginTop: 24 }}>
              Clear comparison
            </button>
          </>
        )}
      </section>
    </div>
  );
}
