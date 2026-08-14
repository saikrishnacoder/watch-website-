import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { Reveal } from "../ui/Reveal";

export function HorizontalLines() {
  return (
    <section className="section" data-meridian="collections" data-meridian-label="Collections">
      <div className="section-head">
        <div>
          <div className="eyebrow">Collections</div>
          <h2 className="display">Five atmospheres. One meridian.</h2>
        </div>
      </div>
      <div className="line-atmospheres">
        {site.collectionLines.map((line, index) => (
          <Reveal key={line.slug} delay={index * 0.06} className={`line-atmosphere is-${line.slug}`}>
            <img src={line.image} alt="" />
            <div>
              <strong>{line.name}</strong>
              <span>{line.description}</span>
              <Link to={`/collection/${line.slug}`}>Explore Collection</Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
