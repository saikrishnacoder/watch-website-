import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { Reveal } from "../ui/Reveal";

export function MeridianChapter() {
  return (
    <section className="section meridian-chapter" data-meridian="meridian" data-meridian-label="Meridian">
      <Reveal>
        <div className="eyebrow">{site.brand.signature}</div>
        <h2 className="display meridian-chapter-title">The golden meridian.</h2>
        <span className="journey-stroke is-block" aria-hidden />
        <p className="lede">{site.brand.signatureNote}</p>
        <p className="lede">
          You will find it on Heritage enamel and on a Diver 500. If it is missing, it is not ours. Scroll, and the
          line draws with you — the same stroke that sits at 12 on every calibre that leaves the bench.
        </p>
        <Link className="section-link" to="/maison">
          Read the meridian
        </Link>
      </Reveal>
    </section>
  );
}
