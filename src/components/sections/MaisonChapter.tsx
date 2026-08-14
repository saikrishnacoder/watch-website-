import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../ui/Reveal";

export function MaisonChapter() {
  return (
    <section className="section maison-home" data-meridian="maison" data-meridian-label="Maison">
      <Reveal>
        <div className="eyebrow">The Maison</div>
        <h2 className="display maison-year">
          Geneva · <CountUp to={site.brand.founded} from={1840} duration={1800} />
        </h2>
        <p className="lede">{site.homeMaison.body}</p>
        <Link className="section-link" to="/maison">
          {site.homeMaison.cta}
        </Link>
      </Reveal>
    </section>
  );
}
