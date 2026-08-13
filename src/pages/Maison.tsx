import { Link } from "react-router-dom";
import { site } from "../config/site";
import { Monogram } from "../components/brand/Monogram";
import { Identity } from "../components/sections/Identity";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Reveal } from "../components/ui/Reveal";

export function Maison() {
  return (
    <div className="page">
      <section className="page-hero maison-hero">
        <Monogram size={88} />
        <div className="eyebrow">{site.brand.seal}</div>
        <h1 className="display">{site.brand.motto}</h1>
        <p className="lede">{site.brand.mottoEn}. {site.brand.description}</p>
      </section>
      <Identity showCrest={false} />
      <section className="section">
        <div className="section-head">
          <h2 className="display">Five lines. One meridian.</h2>
        </div>
        <div className="family-grid">
          {site.collectionLines.map((line, index) => (
            <Reveal key={line.slug} delay={index * 0.06} className="family-card">
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
        <div className="hero-actions" style={{ marginTop: 32 }}>
          <MagneticButton to="/heritage">Heritage timeline</MagneticButton>
          <MagneticButton variant="ghost" to="/collection">
            See all {site.products.length} watches
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
