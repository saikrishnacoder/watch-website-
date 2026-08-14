import { useEffect, useRef, useState } from "react";
import { useMotion } from "../../context/MotionContext";

export function CountUp({ to, from = 0, duration = 1600 }: { to: number; from?: number; duration?: number }) {
  const { reduceMotion } = useMotion();
  const [value, setValue] = useState(reduceMotion ? to : from);
  const node = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      setValue(to);
      return;
    }
    const el = node.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - t) ** 3;
          setValue(Math.round(from + (to - from) * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [duration, from, reduceMotion, to]);

  return <span ref={node}>{value}</span>;
}
