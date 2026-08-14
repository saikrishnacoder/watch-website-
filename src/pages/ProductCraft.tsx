import { Link, useParams } from "react-router-dom";
import { getProduct } from "../config/site";
import { CraftSheet } from "../components/watch/CraftSheet";
import { MagneticButton } from "../components/ui/MagneticButton";
import { NotFound } from "./NotFound";

export function ProductCraft() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  if (!product) return <NotFound />;

  return (
    <div className="page">
      <section className="page-hero craft-page-hero">
        <div className="eyebrow">
          {product.collection} · {product.reference}
        </div>
        <h1 className="display">{product.name}</h1>
        <p className="lede">Calibre, reserve, and depth — the sheet a specialist keeps under the tray.</p>
        <div className="hero-actions">
          <MagneticButton to={`/watch/${product.slug}`}>The watch</MagneticButton>
          <MagneticButton variant="ghost" to="/atelier">
            The atelier
          </MagneticButton>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <CraftSheet product={product} />
        <p style={{ marginTop: 36 }}>
          <Link className="section-link" to={`/collection/${product.collectionSlug}`}>
            {product.collection} line
          </Link>
        </p>
      </section>
    </div>
  );
}
