import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { openSpecialist } from "../../lib/specialist";
import { MagneticButton } from "../ui/MagneticButton";
import { Reveal } from "../ui/Reveal";

export function ViewingInvite() {
  return (
    <section className="section viewing-invite" data-meridian="viewing" data-meridian-label="Viewing">
      <Reveal>
        <div className="eyebrow">Private viewing</div>
        <h2 className="display">Come closer to the work.</h2>
        <p className="lede">
          Five maisons. A tray, the papers, and an hour. We do not sell across a counter if the wrist has not met the
          watch.
        </p>
        <ul className="viewing-cities">
          {site.boutiques.map((house, index) => (
            <li key={house.city} style={{ ["--i" as string]: String(index) }}>
              {house.city}
            </li>
          ))}
        </ul>
        <MagneticButton to="/boutique">Private Viewing</MagneticButton>
      </Reveal>
    </section>
  );
}

export function ConciergeInvite() {
  return (
    <section className="section concierge-invite" data-meridian="concierge" data-meridian-label="Concierge">
      <Reveal>
        <div className="eyebrow">Speak to a specialist</div>
        <h2 className="display">A quiet word.</h2>
        <p className="lede">
          Availability, a second strap, or which line sits on your wrist. Ask a specialist, or leave a note for the
          maison in Geneva.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn btn-solid" onClick={() => openSpecialist("ask")}>
            Speak to a specialist
          </button>
          <Link className="section-link" to="/contact">
            Or open the specialist desk
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
