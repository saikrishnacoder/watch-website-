import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { getProduct, site } from "../config/site";
import { useMoney } from "../context/CurrencyContext";
import { boutiqueOpen, zonedNow } from "../lib/boutiqueHours";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Reveal } from "../components/ui/Reveal";

export function Boutique() {
  const { region } = useMoney();
  const [status, setStatus] = useState("");
  const [params] = useSearchParams();
  const requested = getProduct(params.get("watch") ?? "");
  const composition = params.get("compose");
  const [card, setCard] = useState<{ name: string; boutique: string; date: string; watch: string } | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams();
    data.forEach((value, key) => params.append(key, String(value)));
    const name = String(data.get("name") ?? "");
    const boutique = String(data.get("boutique") ?? "");
    const date = String(data.get("date") ?? "");
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    setCard({
      name,
      boutique,
      date,
      watch: requested ? `${requested.name} · ${requested.reference}` : "A private tray",
    });
    setStatus("Your request is with the maison. We will confirm within one working day.");
    form.reset();
  };

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Private Viewing</div>
        <h1 className="display">{site.boutiquePage.title}</h1>
        <p className="lede">{site.boutiquePage.lede}</p>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="boutique-grid">
          {site.boutiques.map((house, index) => (
            <Reveal key={house.city} delay={index * 0.08} className="boutique-card">
              <div className="boutique-status">
                <em>{zonedNow(house.zone).clock}</em>
                <span className={boutiqueOpen(house) ? "is-open" : ""}>
                  {boutiqueOpen(house) ? "Open now" : "By appointment"}
                </span>
              </div>
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
            <p className="lede">{site.boutiquePage.note}</p>
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
                <select name="boutique" required defaultValue={region.city} key={region.city}>
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
                <textarea
                  name="message"
                  defaultValue={
                    requested
                      ? `I would like to see ${requested.name} (${requested.reference}).`
                      : composition
                        ? `I would like to discuss study composition ${composition}. It is a preview, not a catalogue SKU.`
                        : ""
                  }
                  placeholder="Which timepiece would you like to see?"
                />
              </label>
            </div>
            <div style={{ height: 16 }} />
            <MagneticButton type="submit">Request appointment</MagneticButton>
            {status && <p className="form-note">{status}</p>}
          </form>
        </div>
        {card && (
          <article className="appointment-card">
            <span>{site.brand.seal}</span>
            <h3>Private viewing</h3>
            <p>
              {card.name}
              <br />
              {card.boutique} · {card.date}
              <br />
              {card.watch}
            </p>
            <em>Please arrive five minutes early. The tray will be ready.</em>
          </article>
        )}
      </section>
    </div>
  );
}
