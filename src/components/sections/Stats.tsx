import { useEffect, useRef, useState } from "react";
import { site } from "../../config/site";
import { Reveal } from "../ui/Reveal";

export function Stats() {
  return (
    <div className="stats">
      {site.stats.map((stat) => (
        <Reveal key={stat.label} className="stat">
          <strong>
            <CountUp value={stat.value} />
            {stat.suffix}
          </strong>
          <span>{stat.label}</span>
        </Reveal>
      ))}
    </div>
  );
}

function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.round(value * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value]);

  return <span ref={ref}>{n}</span>;
}
