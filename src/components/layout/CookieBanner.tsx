import { Link } from "react-router-dom";
import { useConsent } from "../../context/ConsentContext";

export function CookieBanner() {
  const { consent, acceptAll, essentialOnly } = useConsent();
  if (consent !== "unset") return null;

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-copy">
      <div>
        <h2 id="cookie-title">Cookies</h2>
        <p id="cookie-copy">
          Necessary cookies keep your tray and motion preference. Analytics fire only if you allow them — no advertising
          pixels, no third-party heatmaps.{" "}
          <Link to="/privacy">Privacy policy</Link>
        </p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="btn btn-ghost" onClick={essentialOnly}>
          Essential only
        </button>
        <button type="button" className="btn" onClick={acceptAll}>
          Allow analytics
        </button>
      </div>
    </div>
  );
}
