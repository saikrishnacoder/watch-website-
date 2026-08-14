import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { getProduct, site } from "../../config/site";
import { MagneticButton } from "../ui/MagneticButton";

export function Concierge() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const slug = location.pathname.startsWith("/watch/") ? location.pathname.split("/")[2] : "";
  const watching = slug ? getProduct(slug) : undefined;

  useEffect(() => {
    setOpen(false);
    setStatus("");
  }, [location.pathname]);

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
    setStatus("An advisor will write within one working day.");
    form.reset();
  };

  return (
    <>
      <button
        type="button"
        className={`concierge-fab ${open ? "is-on" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="concierge-panel"
      >
        {open ? "Close" : "Advisor"}
      </button>
      {open && (
        <aside id="concierge-panel" className="concierge-panel" role="dialog" aria-labelledby="concierge-title">
          <div className="eyebrow">Client advisor</div>
          <h2 id="concierge-title">A quiet word.</h2>
          <p>
            Availability, a second strap, or an hour in Geneva — a maison advisor, not a queue.
            {watching ? ` You are looking at ${watching.name}.` : ""}
          </p>
          {status ? (
            <p className="form-note">{status}</p>
          ) : (
            <form name="advisor" method="POST" data-netlify="true" onSubmit={onSubmit}>
              <input type="hidden" name="form-name" value="advisor" />
              <p hidden>
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>
              <label className="field">
                <span>Name</span>
                <input name="name" required placeholder="Full name" />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" name="email" required placeholder="you@atelier.example" />
              </label>
              <label className="field">
                <span>Boutique</span>
                <select name="boutique" defaultValue={site.boutiques[0].city}>
                  {site.boutiques.map((house) => (
                    <option key={house.city} value={house.city}>
                      {house.city}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Note</span>
                <textarea
                  name="message"
                  required
                  defaultValue={
                    watching ? `I would like advice on ${watching.name} (${watching.reference}).` : ""
                  }
                  placeholder="How may we help?"
                />
              </label>
              <input type="hidden" name="watch" value={watching?.slug ?? ""} />
              <MagneticButton type="submit">Request a word</MagneticButton>
            </form>
          )}
          <Link className="section-link" to="/boutique" onClick={() => setOpen(false)}>
            Or book a viewing
          </Link>
        </aside>
      )}
    </>
  );
}
