import { useEffect, useState } from "react";
import { REGIONS, type RegionId } from "../../config/money";
import { useMoney } from "../../context/CurrencyContext";
import { OPEN_REGION, openRegion } from "../../lib/specialist";

export function RegionSwitch({ compact = false }: { compact?: boolean }) {
  const { region, setRegion } = useMoney();

  if (compact) {
    return (
      <div className="region-switch is-compact">
        <p className="region-panel-kicker">Maison · currency</p>
        <RegionList onPick={(id) => setRegion(id, "user")} />
      </div>
    );
  }

  return (
    <button type="button" className="region-switch-trigger" onClick={openRegion}>
      {region.city} · {region.currency}
    </button>
  );
}

export function RegionPanel() {
  const { setRegion } = useMoney();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener(OPEN_REGION, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_REGION, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="region-overlay" onClick={() => setOpen(false)}>
      <div
        className="region-panel is-modal"
        role="dialog"
        aria-label="Maison and currency"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="region-panel-kicker">Maison</p>
        <RegionList
          onPick={(id) => {
            setRegion(id, "user");
            setOpen(false);
          }}
        />
        <p className="region-panel-note">
          List prices in Swiss francs. Other maisons use the atelier rate, shown for the city you choose.
        </p>
        <button type="button" className="section-link" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
}

function RegionList({ onPick }: { onPick: (id: RegionId) => void }) {
  const { region } = useMoney();
  return (
    <div className="region-list" role="listbox" aria-label="Maison and currency">
      {REGIONS.map((item) => (
        <button
          key={item.id}
          type="button"
          role="option"
          aria-selected={item.id === region.id}
          className={item.id === region.id ? "is-on" : ""}
          onClick={() => onPick(item.id)}
        >
          <strong>
            {item.city} · {item.currency}
          </strong>
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
}
