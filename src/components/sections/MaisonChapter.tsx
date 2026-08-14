import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { Reveal } from "../ui/Reveal";

export function MaisonChapter() {
  return (
    <section className="section maison-home" data-meridian="maison" data-meridian-label="Maison">
      <Reveal>
        <div className="eyebrow">The Maison</div>
        <h2 className="display">{site.homeMaison.title}</h2>
        <p className="lede">{site.homeMaison.body}</p>
        <Link className="section-link" to="/maison">
          {site.homeMaison.cta}
        </Link>
      </Reveal>
    </section>
  );
}
