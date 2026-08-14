import { useEffect, useState } from "react";
import { getProduct, site } from "../../config/site";
import { WaitlistForm } from "../watch/WaitlistForm";
import { MagneticButton } from "../ui/MagneticButton";
import { WatchFace } from "../watch/WatchFace";

export function Limited() {
  const product = getProduct(site.limited.slug);
  const remaining = useCountdown(site.limited.endsAt);
  if (!product) return null;

  return (
    <section className="limited">
      <div>
        <WatchFace {...product.design} brand={site.brand.name} size={320} />
      </div>
      <div>
        <div className="eyebrow">{site.limited.eyebrow}</div>
        <h2 className="display" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: "8px 0 16px" }}>
          {site.limited.title}
        </h2>
        <p className="lede">{site.limited.body}</p>
        <div className="countdown">
          {remaining.map((unit) => (
            <div className="count" key={unit.label}>
              <strong>{String(unit.value).padStart(2, "0")}</strong>
              <span>{unit.label}</span>
            </div>
          ))}
        </div>
        <MagneticButton to={`/watch/${product.slug}`}>See Noir</MagneticButton>
        <WaitlistForm product={product} />
      </div>
    </section>
  );
}

function useCountdown(iso: string) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const diff = Math.max(0, new Date(iso).getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Mins", value: minutes },
    { label: "Secs", value: seconds },
  ];
}
