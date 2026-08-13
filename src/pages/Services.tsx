import { useState, type FormEvent } from "react";
import { site } from "../config/site";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Reveal } from "../components/ui/Reveal";

export function Services() {
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
    setStatus("Your timepiece is now on the maison record.");
    form.reset();
  };

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Care</div>
        <h1 className="display">Services.</h1>
        <p className="lede">
          A watch leaves Geneva once. It returns for oil, regulation and the occasional polite polish.
        </p>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="service-grid">
          {site.services.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.08} className="service-card">
              <div className="product-line">{item.duration}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>
        <div className="appointment" style={{ marginTop: 72 }}>
          <div>
            <div className="eyebrow">Register</div>
            <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 48px)", marginBottom: 16 }}>
              Attach your watch to the maison.
            </h2>
            <p className="lede">
              Reference and caseback number. We will keep the service history, and write when a complete overhaul is due.
            </p>
          </div>
          <form name="appointment" method="POST" data-netlify="true" onSubmit={onSubmit}>
            <input type="hidden" name="form-name" value="appointment" />
            <div className="fields">
              <label className="field">
                <input name="name" required placeholder="Full name" />
              </label>
              <label className="field">
                <input type="email" name="email" required placeholder="Email" />
              </label>
              <label className="field">
                <input name="phone" required placeholder="Reference, e.g. H.72.40.IV" />
              </label>
              <label className="field">
                <input name="boutique" required placeholder="Caseback number" />
              </label>
              <label className="field full">
                <textarea name="message" placeholder="Notes for the atelier" />
              </label>
            </div>
            <div style={{ height: 16 }} />
            <MagneticButton type="submit">Register timepiece</MagneticButton>
            {status && <p className="form-note">{status}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
