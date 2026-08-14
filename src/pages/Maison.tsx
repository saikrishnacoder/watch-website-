import { Link } from "react-router-dom";
import { altFor, photos, site } from "../config/site";
import { EssayBody } from "../components/ui/EssayBody";
import { FrameImage } from "../components/ui/FrameImage";
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
        <FrameImage src={photos.cinematic} alt={altFor(photos.cinematic, "The gold meridian at 12 on a HORLOGE dial")} />
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
            <EssayBody id="maison" />
          </Reveal>
          <Reveal delay={0.08}>
            <FrameImage src={photos.bench} alt={altFor(photos.bench, "The atelier bench in Geneva")} />
          </Reveal>
        </div>
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

      <section className="section maison-continue">
        <div className="eyebrow">Continue</div>
        <h2 className="display">The rest of the maison lives on its own pages.</h2>
        <div className="maison-continue-grid">
          <Link to="/collection">
            <strong>The Collection</strong>
            <span>Five lines. Essays and signatures, not a homepage strip.</span>
          </Link>
          <Link to="/atelier">
            <strong>Craft</strong>
            <span>The exploded calibre and the loupe — opened only here.</span>
          </Link>
          <Link to="/journal">
            <strong>Journal</strong>
            <span>Four notes from the bench, at full length.</span>
          </Link>
          <Link to="/boutique">
            <strong>Private Viewing</strong>
            <span>Five maisons, a tray, an hour.</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
