import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { site } from "../../config/site";
import { MagneticButton } from "../ui/MagneticButton";
import { Reveal } from "../ui/Reveal";

export function Newsletter() {
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
    setStatus(site.newsletter.success);
    form.reset();
  };

  return (
    <section className="section newsletter" id="contact">
      <Reveal>
        <div className="eyebrow">{site.newsletter.eyebrow}</div>
        <h2 className="display">{site.newsletter.title}</h2>
        <p>{site.newsletter.body}</p>
        <form className="form-row" name="newsletter" method="POST" data-netlify="true" onSubmit={onSubmit}>
          <input type="hidden" name="form-name" value="newsletter" />
          <p hidden>
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>
          <input type="email" name="email" required placeholder={site.newsletter.placeholder} />
          <MagneticButton type="submit">{site.newsletter.cta}</MagneticButton>
        </form>
        {status && <p className="form-note">{status}</p>}
        <p className="form-note">
          We will not add you to a list sold onward. See <Link to="/privacy">privacy policy</Link>.
        </p>
      </Reveal>
    </section>
  );
}
