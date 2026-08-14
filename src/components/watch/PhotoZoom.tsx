import { useState, type PointerEvent as ReactPointerEvent } from "react";
import { useMotion } from "../../context/MotionContext";

export function PhotoZoom({ src, alt }: { src: string; alt: string }) {
  const { reduceMotion, coarsePointer } = useMotion();
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [lean, setLean] = useState(false);

  const move = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setOrigin({
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    });
    if (!coarsePointer) setLean(true);
  };

  const zoomed = !reduceMotion && lean;

  return (
    <button
      type="button"
      className={`photo-zoom ${zoomed ? "is-on" : ""}`}
      onPointerMove={move}
      onPointerLeave={() => setLean(false)}
      onClick={() => {
        if (coarsePointer) setLean((value) => !value);
      }}
      aria-label={zoomed ? "Photography, zoomed" : "Photography. Hover or tap to lean in."}
    >
      <img
        src={src}
        alt={alt}
        style={{
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transform: zoomed ? "scale(2.35)" : "scale(1)",
        }}
      />
      <span>{coarsePointer ? "Tap to lean in" : "Hover to lean in"}</span>
    </button>
  );
}
