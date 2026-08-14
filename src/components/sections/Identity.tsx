import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { Monogram } from "../brand/Monogram";
import { Reveal } from "../ui/Reveal";

export function Identity({ showCrest = true }: { showCrest?: boolean }) {
  return (
    <section className="section identity" data-meridian="maison" data-meridian-label="Maison">
      {showCrest && (
        <Reveal className="identity-crest">
          <Monogram size={120} />
          <p className="identity-motto">{site.brand.motto}</p>
          <p className="identity-en">{site.brand.mottoEn}</p>
          <p className="identity-seal">{site.brand.seal}</p>
        </Reveal>
      )}
      <div className="identity-body">
        <div className="eyebrow">{site.brand.signature}</div>
        <h2 className="display">{site.brand.signatureNote}</h2>
        <div className="pillars">
          {site.brand.pillars.map((pillar) => (
            <article key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
        <div className="palette">
          {site.brand.palette.map((swatch) => (
            <div key={swatch.name} className="swatch-card">
              <i style={{ background: swatch.hex }} />
              <strong>{swatch.name}</strong>
              <span>{swatch.hex}</span>
              <em>{swatch.use}</em>
            </div>
          ))}
        </div>
        <Link className="section-link" to={showCrest ? "/maison" : "/heritage"}>
          {showCrest ? "The maison" : "Heritage timeline"}
        </Link>
      </div>
    </section>
  );
}
