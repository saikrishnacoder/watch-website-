import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ring.current;
    if (!node || window.matchMedia("(pointer: coarse)").matches) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      node.classList.add("is-on");
      const hover = (event.target as HTMLElement | null)?.closest("a, button, input, textarea, .product-card");
      node.classList.toggle("is-hover", Boolean(hover));
    };

    const tick = () => {
      tx += (x - tx) * 0.18;
      ty += (y - ty) * 0.18;
      node.style.transform = `translate(${tx - node.offsetWidth / 2}px, ${ty - node.offsetHeight / 2}px)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="cursor-ring" ref={ring} />;
}
