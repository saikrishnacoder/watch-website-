import { Link } from "react-router-dom";
import { useEffect } from "react";
import { REGIONS } from "../config/money";
import { site } from "../config/site";
import { useMoney } from "../context/CurrencyContext";
import { boutiqueOpen, zonedNow } from "../lib/boutiqueHours";
import { openSpecialist } from "../lib/specialist";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Reveal } from "../components/ui/Reveal";

export function Contact() {
  const { region, setRegion } = useMoney();
  const house = site.boutiques.find((item) => item.city === region.city) ?? site.boutiques[0];
  const openNow = boutiqueOpen(house);

  useEffect(() => {
    openSpecialist("ask");
  }, []);

  return (
    <div className="page">
      <section className="page-hero specialist-hero">
        <div className="eyebrow">Speak to a specialist</div>
        <h1 className="display">Not a contact page.</h1>
        <p className="lede">
          A specialist at the {house.city} maison. Ask the catalogue, or leave a note — we write within one working day.
          There is no generic inbox.
        </p>
        <p className={`specialist-live ${openNow ? "is-open" : ""}`}>
          {openNow
            ? `${house.city} is open now · ${zonedNow(house.zone).clock}`
            : `${house.city} is by appointment · ${house.hours}`}
        </p>
        <div className="hero-actions">
          <MagneticButton onClick={() => openSpecialist("ask")}>Ask a specialist</MagneticButton>
          <MagneticButton variant="ghost" onClick={() => openSpecialist("write")}>
            Write to {house.city}
          </MagneticButton>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="boutique-grid">
          {site.boutiques.map((item, index) => (
            <Reveal key={item.city} delay={index * 0.06} className="boutique-card">
              <div className="boutique-status">
                <em>{zonedNow(item.zone).clock}</em>
                <span className={boutiqueOpen(item) ? "is-open" : ""}>
                  {boutiqueOpen(item) ? "Open now" : "By appointment"}
                </span>
              </div>
              <h3>{item.city}</h3>
              <p>{item.address}</p>
              <p>{item.hours}</p>
              <p>{item.phone}</p>
              <button
                type="button"
                className="section-link"
                onClick={() => {
                  const match = REGIONS.find((entry) => entry.city === item.city);
                  if (match) setRegion(match.id, "user");
                  openSpecialist("write");
                }}
              >
                Speak to this maison
              </button>
            </Reveal>
          ))}
        </div>
        <p className="lede" style={{ marginTop: 48 }}>
          For privacy or legal correspondence, write to the controller on the{" "}
          <Link to="/privacy#contact">privacy policy</Link>.
        </p>
      </section>
    </div>
  );
}
