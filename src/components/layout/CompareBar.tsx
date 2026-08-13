import { Link } from "react-router-dom";
import { getProduct, site } from "../../config/site";
import { useCabinet } from "../../context/CabinetContext";
import { WatchFace } from "../watch/WatchFace";

export function CompareBar() {
  const { compare, toggleCompare, clearCompare } = useCabinet();
  if (compare.length === 0) return null;

  return (
    <div className="compare-bar">
      <div className="compare-bar-items">
        {compare.map((slug) => {
          const product = getProduct(slug);
          if (!product) return null;
          return (
            <button key={slug} className="compare-chip" onClick={() => toggleCompare(slug)}>
              <WatchFace {...product.design} brand={site.brand.name} size={48} animate={false} />
              <span>{product.name}</span>
              <i>×</i>
            </button>
          );
        })}
        {Array.from({ length: 3 - compare.length }).map((_, index) => (
          <span key={index} className="compare-slot">
            Add a watch
          </span>
        ))}
      </div>
      <div className="compare-bar-actions">
        <Link className="btn" to="/compare">
          Compare {compare.length}
        </Link>
        <button className="btn btn-ghost" onClick={clearCompare}>
          Clear
        </button>
      </div>
    </div>
  );
}
