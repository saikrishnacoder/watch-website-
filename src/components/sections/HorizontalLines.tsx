import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { Reveal } from "../ui/Reveal";

export function HorizontalLines() {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <div className="eyebrow">Collections</div>
          <h2 className="display">The five lines</h2>
          <p>{site.products.length} references, one gold meridian at 12.</p>
        </div>
        <Link className="section-link" to="/collection">
          All models
        </Link>
      </div>
      <div className="family-grid">
        {site.collectionLines.map((line, index) => (
          <Reveal key={line.slug} delay={index * 0.08} className="family-card">
            <Link to={`/collection/${line.slug}`}>
              <img src={line.image} alt={line.name} />
              <div>
                <strong>{line.name}</strong>
                <span>{line.tagline}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
