import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { Reveal } from "../ui/Reveal";

export function HeritageTeaser() {
  return (
    <section className="section heritage-teaser">
      <div className="section-head">
        <div>
          <div className="eyebrow">Heritage</div>
          <h2 className="display">A century, in years.</h2>
        </div>
        <Link className="section-link" to="/heritage">
          Scroll the timeline
        </Link>
      </div>
      <div className="heritage-years">
        {site.heritage.map((chapter, index) => (
          <Reveal key={chapter.year} delay={index * 0.05}>
            <Link to="/heritage" className="heritage-year-link">
              <strong>{chapter.year}</strong>
              <span>{chapter.title}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
