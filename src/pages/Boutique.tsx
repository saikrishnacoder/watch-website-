import { useState, type FormEvent } from "react";
import { site } from "../config/site";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Reveal } from "../components/ui/Reveal";

export function Boutique() {
  const [status, setStatus] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams();
    data.forEach((value, key) => params.append(key, String(value)));
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    setStatus("Your request is with the maison. We will confirm within one working day.");
    form.reset();
  };

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Boutiques</div>
        <h1 className="display">Come closer to the work.</h1>
        <p className="lede">
          Three maisons. Private viewings by appointment. Tea, a tray of signatures, and as much silence as you need.
        </p>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="boutique-grid">
          {site.boutiques.map((house, index) => (
            <Reveal key={house.city} delay={index * 0.08} className="boutique-card">
              <h3>{house.city}</h3>
              <p>{house.address}</p>
              <p>{house.hours}</p>
              <p>{house.phone}</p>
            </Reveal>
          ))}
        </div>
        <div className="appointment">
          <div>
            <div className="eyebrow">Private viewing</div>
            <h2 className="display" style={{ fontSize: "clamp(36px, 4vw, 56px)", marginBottom: 16 }}>
              Book an hour with us.
            </h2>
            <p className="lede">
              Tell us which piece you wish to meet. We will prepare the tray, the papers, and a quiet room.
            </p>
          </div>
          <form name="appointment" method="POST" data-netlify="true" onSubmit={onSubmit}>
            <input type="hidden" name="form-name" value="appointment" />
            <p hidden>
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>
            <div className="fields">
              <label className="field">
                <input name="name" required placeholder="Full name" />
              </label>
              <label className="field">
                <input type="email" name="email" required placeholder="Email" />
              </label>
              <label className="field">
                <input type="tel" name="phone" placeholder="Phone" />
              </label>
              <label className="field">
                <select name="boutique" required defaultValue="">
                  <option value="" disabled>
                    Boutique
                  </option>
                  {site.boutiques.map((house) => (
                    <option key={house.city} value={house.city}>
                      {house.city}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <input type="date" name="date" required />
              </label>
              <label className="field full">
                <textarea name="message" placeholder="Which timepiece would you like to see?" />
              </label>
            </div>
            <div style={{ height: 16 }} />
            <MagneticButton type="submit">Request appointment</MagneticButton>
            {status && <p className="form-note">{status}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
