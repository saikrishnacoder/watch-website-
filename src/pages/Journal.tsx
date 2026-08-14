import { Link } from "react-router-dom";
import { site } from "../config/site";
import { Reveal } from "../components/ui/Reveal";

export function Journal() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Journal</div>
        <h1 className="display">Journal</h1>
        <p className="lede">Four notes. The meridian, the atelier, the movement, and Geneva.</p>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="journal-grid">
          {site.journal.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.08} className="journal-card">
              <Link to={`/journal/${article.slug}`}>
                <img src={article.image} alt="" />
                <div>
                  <div className="product-line">
                    {article.category} · {article.date}
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
