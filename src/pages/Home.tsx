import { Link } from "react-router-dom";
import { signatureProducts, site } from "../config/site";
import { Hero } from "../components/sections/Hero";
import { HorizontalLines } from "../components/sections/HorizontalLines";
import { MaisonChapter } from "../components/sections/MaisonChapter";
import { MeridianChapter } from "../components/sections/MeridianChapter";
import { CraftChapter } from "../components/sections/CraftChapter";
import { ViewingInvite } from "../components/sections/JourneyInvites";
import { WatchStudio } from "../components/motion/WatchStudio";

export function Home() {
  const featured = signatureProducts()[0] ?? site.products[0];

  return (
    <div className="page home-journey">
      <Hero />
      <MeridianChapter />
      <HorizontalLines />

      <section className="section inspect-home" data-meridian="watch" data-meridian-label="Watch">
        <div className="section-head">
          <div>
            <div className="eyebrow">Interactive watch</div>
            <h2 className="display">In the round.</h2>
          </div>
          <Link className="section-link" to={`/watch/${featured.slug}`}>
            Discover the Watch
          </Link>
        </div>
        <p className="lede" style={{ maxWidth: 560, marginBottom: 36 }}>
          Rotate. Lean in. Inspect the dial, the case, the crown, the gold meridian, and the caseback.
        </p>
        <div className="inspect-halo">
          <WatchStudio product={featured} />
        </div>
      </section>

      <CraftChapter />
      <MaisonChapter />

      <section className="section" data-meridian="journal" data-meridian-label="Journal">
        <div className="section-head">
          <div>
            <div className="eyebrow">Journal</div>
            <h2 className="display">Four notes from the maison.</h2>
          </div>
          <Link className="section-link" to="/journal">
            The Journal
          </Link>
        </div>
        <div className="journal-grid">
          {site.journal.map((article, index) => (
            <Link key={article.slug} to={`/journal/${article.slug}`} className="journal-card" style={{ ["--i" as string]: String(index) }}>
              <img src={article.image} alt="" />
              <div>
                <div className="product-line">
                  {article.category} · {article.date}
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ViewingInvite />
    </div>
  );
}
