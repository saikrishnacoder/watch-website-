import { site } from "../../config/site";

export function Marquee() {
  const items = [...site.marquee, ...site.marquee];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
