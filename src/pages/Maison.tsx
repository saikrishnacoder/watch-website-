import { Link } from "react-router-dom";
import { site } from "../config/site";
import { Monogram } from "../components/brand/Monogram";
import { HeritageTimeline } from "../components/sections/HeritageTimeline";
import { Identity } from "../components/sections/Identity";
import { PressStrip } from "../components/sections/PressStrip";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Reveal } from "../components/ui/Reveal";

export function Maison() {
  return (
    <div className="page">
      <section className="maison-hero-still" data-meridian="origin" data-meridian-label="Origin">
        <img src="/media/maison-meridian.jpg" alt="The gold meridian at 12 on a HORLOGE dial" />
        <div className="maison-hero-copy">
          <Monogram size={72} />
          <h1 className="display">{site.maisonPage.title}</h1>
          <p className="lede">{site.maisonPage.lede}</p>
          <div className="hero-actions">
            <MagneticButton href="#heritage">A century in years</MagneticButton>
            <MagneticButton variant="ghost" to="/atelier">
              The atelier
            </MagneticButton>
          </div>
        </div>
        <span className="maison-hero-meridian" aria-hidden />
      </section>

      <section className="section maison-origin">
        <div className="maison-split">
          <Reveal>
            <div className="eyebrow">1924</div>
            <h2 className="display">Composed, not assembled.</h2>
            {site.maisonPage.founding.map((paragraph) => (
              <p className="lede" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.08}>
            <img src="/media/maison-bench.jpg" alt="The atelier bench in Geneva" />
          </Reveal>
        </div>
      </section>

      <section className="section maison-essays">
        <div className="maison-split">
          <Reveal>
            <h2 className="display">{site.maisonPage.independence.title}</h2>
            <p className="lede">{site.maisonPage.independence.body}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display">{site.maisonPage.craft.title}</h2>
            <p className="lede">{site.maisonPage.craft.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="section maison-close">
        <Reveal>
          <p className="display">{site.maisonPage.closing}</p>
        </Reveal>
      </section>

      <PressStrip />

      <section className="section maison-meridian-essay">
        <Reveal className="maison-meridian-copy">
          <div className="eyebrow">{site.brand.signature}</div>
          <h2 className="display">{site.brand.signatureNote}</h2>
          <p className="lede">
            You will find it on Heritage enamel and on a Diver 500. If it is missing, it is not ours. Scroll, and the
            line draws with you — the same stroke that sits at 12 on every calibre that leaves the bench.
          </p>
        </Reveal>
      </section>

      <Identity showCrest={false} />
      <HeritageTimeline interactive />

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">The bench</div>
            <h2 className="display">Three pairs of hands.</h2>
          </div>
        </div>
        <div className="people-grid">
          {site.people.map((person, index) => (
            <Reveal key={person.name} delay={index * 0.08} className="person-card">
              <div className="eyebrow">{person.role}</div>
              <h3>{person.name}</h3>
              <p>{person.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Five lines</div>
            <h2 className="display">One meridian.</h2>
          </div>
          <Link className="section-link" to="/collection">
            The Collection
          </Link>
        </div>
        <div className="line-tiles">
          {site.collectionLines.map((line) => (
            <Link key={line.slug} to={`/collection/${line.slug}`} className="line-tile">
              <img src={line.image} alt="" />
              <div>
                <strong>{line.name}</strong>
                <span>{line.tagline}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Maisons</div>
            <h2 className="display">Come closer to the work.</h2>
          </div>
          <Link className="section-link" to="/boutique">
            Book a viewing
          </Link>
        </div>
        <div className="boutique-grid">
          {site.boutiques.map((house) => (
            <Link key={house.city} to="/boutique" className="boutique-card">
              <h3>{house.city}</h3>
              <p>{house.address}</p>
              <p>{house.hours}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
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

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="hero-actions">
          <MagneticButton to="/collection">See the collection</MagneticButton>
          <MagneticButton variant="ghost" to="/heritage">
            Heritage timeline
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
