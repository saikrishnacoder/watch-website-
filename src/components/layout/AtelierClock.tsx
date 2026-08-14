import { useEffect, useState } from "react";

export function AtelierClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Zurich",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="atelier-clock" title="Atelier time in Geneva">
      Geneva · {time}
    </span>
  );
}
