import { Link } from "react-router-dom";
import { site } from "../../config/site";
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
          {site.boutiques.map((house) => (
            <li key={house.city}>{house.city}</li>
          ))}
        </ul>
        <MagneticButton to="/boutique">Book a viewing</MagneticButton>
      </Reveal>
    </section>
  );
}

export function ConciergeInvite() {
  return (
    <section className="section concierge-invite" data-meridian="concierge" data-meridian-label="Concierge">
      <Reveal>
        <div className="eyebrow">Horloge concierge</div>
        <h2 className="display">A quiet word.</h2>
        <p className="lede">
          Availability, a second strap, or which line sits on your wrist. Ask the catalogue, or leave a note for an
          advisor in Geneva.
        </p>
        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-solid"
            onClick={() => window.dispatchEvent(new Event("horloge-open-concierge"))}
          >
            Ask the maison
          </button>
          <Link className="section-link" to="/boutique">
            Or write for a viewing
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
