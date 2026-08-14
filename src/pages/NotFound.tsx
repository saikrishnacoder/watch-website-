import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BrandMark } from "../components/brand/BrandMark";
import { MagneticButton } from "../components/ui/MagneticButton";
import { site } from "../config/site";

export function NotFound() {
  useEffect(() => {
    document.title = `Lost time — ${site.brand.name}`;
  }, []);

  return (
    <div className="page not-found">
      <BrandMark stacked size={56} />
      <div className="eyebrow">Lost time · {site.brand.seal}</div>
      <h1 className="display">This hour is not in the maison.</h1>
      <p className="lede">
        The page has no meridian. Return home, or enter the collection — five lines, one gold stroke at 12.
      </p>
      <div className="hero-actions">
        <MagneticButton to="/">Return home</MagneticButton>
        <MagneticButton variant="ghost" to="/contact">
          Speak to a specialist
        </MagneticButton>
      </div>
      <nav className="not-found-links" aria-label="Maison">
        {site.collectionLines.map((line) => (
          <Link key={line.slug} to={`/collection/${line.slug}`}>
            {line.name}
          </Link>
        ))}
        <Link to="/maison">The maison</Link>
        <Link to="/privacy">Privacy</Link>
      </nav>
    </div>
  );
}
