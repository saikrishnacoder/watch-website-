import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { site } from "../config/site";
import { ProductGrid } from "../components/ui/ProductGrid";
import { useMoney } from "../context/CurrencyContext";

const diameters = ["All", "34–36", "38–41", "42+"];
const materials = ["All", "Steel", "Gold", "Titanium", "DLC"];
const movements = ["All", "Automatic", "Manual", "Chronograph"];
const water = ["All", "30–50m", "100m+", "200m+"];

export function WatchFinder() {
  const { formatPrice } = useMoney();
  const [params] = useSearchParams();
  const [collection, setCollection] = useState(params.get("line") ?? "All");
  const [diameter, setDiameter] = useState("All");
  const [material, setMaterial] = useState("All");
  const [movement, setMovement] = useState("All");
  const [depth, setDepth] = useState("All");
  const ceiling = useMemo(
    () => Math.max(...site.products.map((product) => product.price)),
    [],
  );
  const [maxPrice, setMaxPrice] = useState(ceiling);

  const results = useMemo(() => {
    return site.products.filter((product) => {
      if (collection !== "All" && product.collection !== collection) return false;
      if (diameter === "34–36" && product.diameter > 36) return false;
      if (diameter === "38–41" && (product.diameter < 38 || product.diameter > 41)) return false;
      if (diameter === "42+" && product.diameter < 42) return false;
      if (material === "Steel" && !product.material.toLowerCase().includes("steel")) return false;
      if (material === "Gold" && !product.material.toLowerCase().includes("gold")) return false;
      if (material === "Titanium" && !product.material.toLowerCase().includes("titanium")) return false;
      if (material === "DLC" && !product.material.toLowerCase().includes("dlc")) return false;
      if (movement !== "All" && product.movementType !== movement) return false;
      if (depth === "30–50m" && product.waterResistance > 50) return false;
      if (depth === "100m+" && product.waterResistance < 100) return false;
      if (depth === "200m+" && product.waterResistance < 200) return false;
      if (product.price > maxPrice) return false;
      return true;
    });
  }, [collection, diameter, material, movement, depth, maxPrice]);

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Watch Finder</div>
        <h1 className="display">Find your HORLOGE</h1>
        <p className="lede">
          Filter the catalogue the way a maison boutique would: collection, diameter, metal, movement and depth.
        </p>
      </section>
      <section className="section finder" style={{ paddingTop: 0 }}>
        <aside className="finder-filters">
          <Filter label="Collection" value={collection} onChange={setCollection} options={["All", ...site.collectionLines.map((l) => l.name)]} />
          <Filter label="Diameter" value={diameter} onChange={setDiameter} options={diameters} />
          <Filter label="Material" value={material} onChange={setMaterial} options={materials} />
          <Filter label="Movement" value={movement} onChange={setMovement} options={movements} />
          <Filter label="Water resistance" value={depth} onChange={setDepth} options={water} />
          <label className="finder-label">
            Price up to {maxPrice >= ceiling ? "any" : formatPrice(maxPrice)}
            <input
              type="range"
              min={7000}
              max={ceiling}
              step={1000}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
          </label>
          <Link className="section-link" to="/find">
            Prefer a guided matching?
          </Link>
        </aside>
        <div>
          <p className="finder-count">{results.length} timepieces</p>
          <ProductGrid products={results} />
          {results.length === 0 && <p className="empty">No watches match those filters. Relax a criterion.</p>}
        </div>
      </section>
    </div>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <div className="finder-label">{label}</div>
      <div className="filters">
        {options.map((option) => (
          <button
            key={option}
            className={`filter-btn ${value === option ? "is-on" : ""}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
