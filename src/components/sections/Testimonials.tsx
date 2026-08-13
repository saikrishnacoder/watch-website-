import { useEffect, useState } from "react";
import { site } from "../../config/site";
import { Reveal } from "../ui/Reveal";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = site.testimonials[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % site.testimonials.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section">
      <Reveal className="quote-wrap">
        <div className="eyebrow">Private notes</div>
        <blockquote className="quote">“{item.quote}”</blockquote>
        <div className="quote-meta">
          {item.name} — {item.role}
        </div>
        <div className="quote-nav">
          {site.testimonials.map((entry, i) => (
            <button
              key={entry.name}
              className={`dot ${i === index ? "is-on" : ""}`}
              aria-label={entry.name}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
