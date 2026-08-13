import { Link } from "react-router-dom";
import { site } from "../config/site";
import { useConsent } from "../context/ConsentContext";

export function Privacy() {
  const { consent, acceptAll, essentialOnly } = useConsent();

  return (
    <div className="page">
      <article className="article">
        <div className="eyebrow">Legal</div>
        <h1 className="display">Privacy & cookies</h1>
        <p>
          {site.brand.name} stores only what the site needs to function: your selection tray, wishlist, compare list,
          motion preference, and — if you allow it — anonymous interaction events such as skipping the introduction.
        </p>
        <h2>Necessary</h2>
        <p>
          Tray, wishlist and motion settings live in your browser’s local storage. They never leave the device. The
          cinematic introduction remembers that you dismissed it for the rest of the session.
        </p>
        <h2>Analytics</h2>
        <p>
          Optional. If you allow analytics we record named events in this browser only (for example{" "}
          <code>intro_skip</code>). We do not load Google Analytics, advertising pixels, or session replay unless you
          later add them to the template — and those must wait for this consent.
        </p>
        <h2>Media</h2>
        <p>
          Hero visuals are muted stills by default. Any future autoplay video will stay muted, offer a pause control,
          and will not load on small screens or when you ask for reduced motion.
        </p>
        <p>
          Current choice: <strong>{consent === "all" ? "analytics allowed" : consent === "essential" ? "essential only" : "not yet chosen"}</strong>
        </p>
        <div className="hero-actions">
          <button type="button" className="btn" onClick={acceptAll}>
            Allow analytics
          </button>
          <button type="button" className="btn btn-ghost" onClick={essentialOnly}>
            Essential only
          </button>
          <Link className="section-link" to="/">
            Return home
          </Link>
        </div>
      </article>
    </div>
  );
}
