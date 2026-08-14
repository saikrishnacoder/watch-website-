import { site } from "../../config/site";

export function PressStrip({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`press-strip ${compact ? "is-compact" : ""}`} aria-label="As noted in print">
      <div className="press-strip-head">
        <div className="eyebrow">{site.press.eyebrow}</div>
        {!compact && <p className="press-strip-title">{site.press.title}</p>}
      </div>
      <ul>
        {site.press.items.map((item) => (
          <li key={item.name}>
            <strong>{item.name}</strong>
            <span>{item.line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
