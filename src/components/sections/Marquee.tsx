import { useState } from "react";
import { site } from "../../config/site";
import { useMotion } from "../../context/MotionContext";

export function Marquee() {
  const { reduceMotion } = useMotion();
  const [paused, setPaused] = useState(false);
  const items = [...site.marquee, ...site.marquee];
  const stop = reduceMotion || paused;

  return (
    <div className={`marquee ${stop ? "is-paused" : ""}`}>
      <div className="marquee-track" aria-hidden={stop}>
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
      <p className="visually-hidden">{site.marquee.join(" · ")}</p>
      <button
        type="button"
        className="marquee-pause"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={stop}
      >
        {stop ? "Play ticker" : "Pause ticker"}
      </button>
    </div>
  );
}
