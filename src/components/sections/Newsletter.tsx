import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { site } from "../../config/site";
import { MagneticButton } from "../ui/MagneticButton";
import { Reveal } from "../ui/Reveal";

export function Newsletter({
  source = "page",
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
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

  if (compact) {
    return (
      <form className="newsletter-compact" name="newsletter" method="POST" data-netlify="true" onSubmit={onSubmit}>
        <input type="hidden" name="form-name" value="newsletter" />
        <input type="hidden" name="magnet" value="meridian-early-access" />
        <input type="hidden" name="source" value={source} />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" />
          </label>
        </p>
        <p className="newsletter-compact-copy">{site.newsletter.magnet}</p>
        <div className="form-row">
          <input type="email" name="email" required placeholder={site.newsletter.placeholder} />
          <MagneticButton type="submit">{site.newsletter.cta}</MagneticButton>
        </div>
        {status && <p className="form-note">{status}</p>}
      </form>
    );
  }

  return (
    <section className="section newsletter meridian-letter">
      <span className="journey-stroke is-block meridian-letter-line" aria-hidden />
      <Reveal>
        <div className="eyebrow">{site.newsletter.eyebrow}</div>
        <h2 className="display">{site.newsletter.title}</h2>
        <p>{site.newsletter.body}</p>
        <form className="meridian-letter-form" name="newsletter" method="POST" data-netlify="true" onSubmit={onSubmit}>
          <input type="hidden" name="form-name" value="newsletter" />
          <input type="hidden" name="magnet" value="meridian-early-access" />
          <input type="hidden" name="source" value={source} />
          <p hidden>
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>
          <div className="form-row meridian-letter-row">
            <input type="text" name="name" placeholder="Name, if you wish" autoComplete="name" />
            <input type="email" name="email" required placeholder={site.newsletter.placeholder} />
            <MagneticButton type="submit">{site.newsletter.cta}</MagneticButton>
          </div>
        </form>
        {status && <p className="form-note">{status}</p>}
        <p className="form-note">
          Early looks at Meridian, then the occasional maison letter. Never a list sold onward.{" "}
          <Link to="/privacy">Privacy</Link>.
        </p>
      </Reveal>
    </section>
  );
}
