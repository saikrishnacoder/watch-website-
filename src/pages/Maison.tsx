import { Link } from "react-router-dom";
import { site } from "../config/site";
import { Monogram } from "../components/brand/Monogram";
import { Identity } from "../components/sections/Identity";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Reveal } from "../components/ui/Reveal";

export function Maison() {
  return (
    <div className="page">
      <section className="maison-hero-still">
        <img src="/maison/meridian.jpg" alt="The gold meridian at 12 on a HORLOGE dial" />
        <div className="maison-hero-copy">
          <Monogram size={72} />
          <div className="eyebrow">{site.brand.seal}</div>
          <h1 className="display">{site.brand.motto}</h1>
          <p className="lede">
            {site.brand.mottoEn}. {site.brand.description}
          </p>
          <div className="hero-actions">
            <MagneticButton to="/heritage">A century in years</MagneticButton>
            <MagneticButton variant="ghost" to="/atelier">
              The atelier
            </MagneticButton>
          </div>
        </div>
        <span className="maison-hero-meridian" aria-hidden />
      </section>

      <section className="section maison-origin">
        <Reveal>
          <div className="eyebrow">Origin</div>
          <h2 className="display">A maison on the Rue du Rhône.</h2>
        </Reveal>
        <div className="maison-split">
          <Reveal>
            <p className="lede">
              HORLOGE opens in Geneva in {site.brand.founded}. The first enamel dials carry a gold line at 12 — the
              Geneva meridian, drawn thinner than a hair. That line is still the only mark we put on every watch.
            </p>
            <p className="lede">
              Five lines share one city, one seal, and a refusal to rush the finishing. Heritage, Chronograph, Diver,
              Imperial, Meridian. Silence, measure, inherit.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <img src="/maison/bench.jpg" alt="The atelier bench in Geneva" />
          </Reveal>
        </div>
      </section>

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
            All watches
          </Link>
        </div>
        <div className="line-chapters">
          {site.collectionLines.map((line, index) => (
            <Reveal key={line.slug} delay={index * 0.04} className={`line-chapter ${index % 2 ? "is-flip" : ""}`}>
              <Link to={`/collection/${line.slug}`} className="line-chapter-media">
                <img src={line.image} alt={line.name} />
              </Link>
              <div>
                <div className="eyebrow">
                  {line.name} · {line.calibre}
                </div>
                <h3 className="display">{line.tagline}</h3>
                {line.essay.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <Link className="section-link" to={`/collection/${line.slug}`}>
                  Enter {line.name}
                </Link>
              </div>
            </Reveal>
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
