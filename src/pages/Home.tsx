import { Link } from "react-router-dom";
import { signatureProducts, site } from "../config/site";
import { Hero } from "../components/sections/Hero";
import { HorizontalLines } from "../components/sections/HorizontalLines";
import { JourneyLockup } from "../components/sections/JourneyLockup";
import { MaisonChapter } from "../components/sections/MaisonChapter";
import { MeridianChapter } from "../components/sections/MeridianChapter";
import { WatchmakerStories } from "../components/sections/WatchmakerStories";
import { ConciergeInvite, ViewingInvite } from "../components/sections/JourneyInvites";
import { Story } from "../components/sections/Story";
import { KineticGallery } from "../components/motion/KineticGallery";
import { WatchStudio } from "../components/motion/WatchStudio";
import { CraftLoupe } from "../components/motion/CraftLoupe";
import { ExplodedCalibre } from "../components/motion/ExplodedCalibre";

export function Home() {
  const featured = signatureProducts()[0] ?? site.products[0];

  return (
    <div className="page home-journey">
      <JourneyLockup />
      <Hero />
      <MeridianChapter />
      <HorizontalLines />

      <section className="section inspect-home" data-meridian="watch" data-meridian-label="Watch">
        <div className="section-head">
          <div>
            <div className="eyebrow">Interactive watch</div>
            <h2 className="display">Turn it in the light.</h2>
          </div>
          <Link className="section-link" to={`/watch/${featured.slug}`}>
            Inspect a reference
          </Link>
        </div>
        <p className="lede" style={{ maxWidth: 560, marginBottom: 36 }}>
          Drag to rotate. Scroll to zoom. Double-click a point to inspect.
        </p>
        <WatchStudio product={featured} />
      </section>

      <ExplodedCalibre />
      <MaisonChapter />
      <WatchmakerStories />

      <section className="section" data-meridian="journal" data-meridian-label="Journal">
        <div className="section-head">
          <div>
            <div className="eyebrow">Journal</div>
            <h2 className="display">Notes from the bench.</h2>
          </div>
          <Link className="section-link" to="/journal">
            All stories
          </Link>
        </div>
        <div className="journal-grid">
          {site.journal.map((article) => (
            <Link key={article.slug} to={`/journal/${article.slug}`} className="journal-card">
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
      <ConciergeInvite />

      <div data-meridian="atelier" data-meridian-label="Atelier">
        <Story />
        <CraftLoupe marked={false} />
        <section className="section kinetic-home" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <div>
              <div className="eyebrow">The atelier</div>
              <h2 className="display">Machines, in motion</h2>
            </div>
            <Link className="section-link" to="/atelier">
              Enter the atelier
            </Link>
          </div>
          <p className="lede" style={{ maxWidth: 560, marginBottom: 36 }}>
            Escapement, tourbillon and hairspring — drawn with trigonometry, then set moving.
          </p>
          <KineticGallery featured={["escapement.svg", "tourbillon.svg", "hairspring.svg"]} />
        </section>
      </div>

      <JourneyLockup close />
    </div>
  );
}
