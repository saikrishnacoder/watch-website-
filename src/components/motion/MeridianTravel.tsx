import { useEffect, useRef, useState } from "react";
import { useMotion } from "../../context/MotionContext";

const STOPS = [
  { id: "dial", title: "Dial", copy: "The stroke at twelve." },
  { id: "case", title: "Case", copy: "Then into the metal." },
  { id: "movement", title: "Movement", copy: "Then into the calibre." },
] as const;

export function MeridianTravel() {
  const { reduceMotion } = useMotion();
  const root = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setOn(true);
      return;
    }
    const node = root.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setOn(true);
      },
      { threshold: 0.35 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <div ref={root} className={`meridian-travel ${on ? "is-on" : ""}`} aria-hidden>
      <span className="meridian-travel-stroke">
        <i className="meridian-bead" />
      </span>
      <div className="meridian-travel-stops">
        {STOPS.map((stop, index) => (
          <article key={stop.id} className={`meridian-stop is-${stop.id}`} style={{ ["--i" as string]: String(index) }}>
            <div className="meridian-glyph">
              {stop.id === "dial" && <DialGlyph />}
              {stop.id === "case" && <CaseGlyph />}
              {stop.id === "movement" && <MovementGlyph />}
            </div>
            <strong>{stop.title}</strong>
            {stop.copy}
          </article>
        ))}
      </div>
    </div>
  );
}

function DialGlyph() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64">
      <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
      <line className="glyph-meridian" x1="32" y1="10" x2="32" y2="32" />
    </svg>
  );
}

function CaseGlyph() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64">
      <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <rect x="54" y="26" width="6" height="12" rx="1" fill="currentColor" />
    </svg>
  );
}

function MovementGlyph() {
  return (
    <span className="gear-pair">
      <i className="gear gear-lg" />
      <i className="gear gear-sm" />
    </span>
  );
}
