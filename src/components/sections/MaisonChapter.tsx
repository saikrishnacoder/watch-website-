import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { Reveal } from "../ui/Reveal";

export function MaisonChapter() {
  return (
    <section className="section" data-meridian="maison" data-meridian-label="Maison">
      <Reveal>
        <div className="eyebrow">The maison</div>
        <h2 className="display">Silence, measure, inherit.</h2>
        <p className="lede">{site.brand.description}</p>
      </Reveal>
      <div className="pillars">
        {site.brand.pillars.map((pillar) => (
          <Reveal key={pillar.title}>
            <article>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Link className="section-link" to="/maison">
        Enter the maison
      </Link>
    </section>
  );
}
