import { useEffect, useState } from "react";
import { useMoney } from "../../context/CurrencyContext";
import { openRegion } from "../../lib/specialist";

const NOTICE_KEY = "horloge-region-notice";

export function RegionNotice() {
  const { region, source, setRegion } = useMoney();
  const [hidden, setHidden] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem(NOTICE_KEY) === "dismissed";
  });

  useEffect(() => {
    if (source !== "geo") setHidden(true);
  }, [source]);

  if (hidden || source !== "geo" || region.id === "ch") return null;

  const dismiss = () => {
    sessionStorage.setItem(NOTICE_KEY, "dismissed");
    setHidden(true);
  };

  return (
    <div className="region-notice" role="status">
      <p>
        Prices for the {region.city} maison, in {region.currency}.
      </p>
      <div>
        <button type="button" onClick={openRegion}>
          Change maison
        </button>
        <button
          type="button"
          onClick={() => {
            setRegion("ch", "user");
            dismiss();
          }}
        >
          Geneva · CHF
        </button>
        <button type="button" onClick={dismiss} aria-label="Dismiss">
          Close
        </button>
      </div>
    </div>
  );
}
