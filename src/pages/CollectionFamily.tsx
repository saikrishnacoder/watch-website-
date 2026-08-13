import { Link, useParams } from "react-router-dom";
import { getCollection, productsIn } from "../config/site";
import { ProductCard } from "../components/ui/ProductCard";
import { MagneticButton } from "../components/ui/MagneticButton";
import { NotFound } from "./NotFound";

export function CollectionFamily() {
  const { slug = "" } = useParams();
  const line = getCollection(slug);
  if (!line) return <NotFound />;
  const watches = productsIn(slug);

  return (
    <div className="page">
      <section className="family-hero" style={{ backgroundImage: `url(${line.image})` }}>
        <div>
          <div className="eyebrow">{line.name}</div>
          <h1 className="display">{line.tagline}</h1>
          <p className="lede">{line.description}</p>
          <MagneticButton to="/finder">Filter this line</MagneticButton>
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <h2 className="display">{watches.length} models</h2>
          <Link className="section-link" to="/collection">
            All watches
          </Link>
        </div>
        <div className="product-grid">
          {watches.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
