import { site } from "../../config/site";
import { Reveal } from "../ui/Reveal";

const ICONS = {
  movement: (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="18" cy="18" r="14" />
      <circle cx="18" cy="18" r="3" />
      <path d="M18 8v7M18 21v7M8 18h7M21 18h7" />
    </svg>
  ),
  crystal: (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M18 4l12 10-12 18L6 14 18 4z" />
      <path d="M6 14h24M18 4v28" />
    </svg>
  ),
  water: (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M18 6c6 8 10 12 10 18a10 10 0 1 1-20 0c0-6 4-10 10-18z" />
    </svg>
  ),
  service: (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M18 6l2.4 7.2H28l-6 4.6 2.3 7.2L18 20.8 11.7 25l2.3-7.2-6-4.6h7.6L18 6z" />
    </svg>
  ),
};

export function Features() {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <div className="eyebrow">Why {site.brand.name}</div>
          <h2 className="display">Held to the meridian.</h2>
        </div>
      </div>
      <div className="feature-grid">
        {site.features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.08} className="feature">
            <div className="feature-icon">{ICONS[feature.icon as keyof typeof ICONS]}</div>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
