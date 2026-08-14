import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { useLocation } from "react-router-dom";
import { useConsent } from "../../context/ConsentContext";
import { track } from "../../lib/analytics";

export function AnalyticsGate() {
  const { allowAnalytics } = useConsent();
  const location = useLocation();

  useEffect(() => {
    if (!allowAnalytics) return;
    track("pageview", { path: location.pathname });
  }, [allowAnalytics, location.pathname]);

  useEffect(() => {
    if (!allowAnalytics) return;
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
    if (!domain || document.querySelector("script[data-horloge-plausible]")) return;
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.horlogePlausible = "true";
    script.dataset.domain = domain;
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
  }, [allowAnalytics]);

  if (!allowAnalytics) return null;
  return <Analytics />;
}
