import { Link } from "react-router-dom";
import { site } from "../config/site";
import { FrameImage } from "../components/ui/FrameImage";
import { Reveal } from "../components/ui/Reveal";

export function Journal() {
  const [featured, ...rest] = site.journal;

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Journal</div>
        <h1 className="display">Four notes from the bench.</h1>
        <p className="lede">
          The meridian, the kiln, the movement, and Geneva. These are workshop letters — not a press office, and not the
          same four cards that sit on the homepage.
        </p>
      </section>

      {featured && (
        <section className="section journal-lead">
          <Link to={`/journal/${featured.slug}`} className="journal-lead-media">
            <FrameImage src={featured.image} alt={featured.imageAlt} />
          </Link>
          <div>
            <div className="eyebrow">
              {featured.category} · {featured.date}
            </div>
            <h2 className="display">{featured.title}</h2>
            <p className="lede">{featured.excerpt}</p>
            <Link className="section-link" to={`/journal/${featured.slug}`}>
              Read the note
            </Link>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="journal-list">
          {rest.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.06} className="journal-list-item">
              <Link to={`/journal/${article.slug}`}>
                <div className="product-line">
                  {article.category} · {article.date}
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
