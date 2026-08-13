import { useEffect, useRef } from "react";

export function LissajousCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const t0 = frame / 70;
      ctx.beginPath();
      for (let i = 0; i <= 420; i++) {
        const t = t0 + i / 70;
        const x = cx + width * 0.38 * Math.sin(3 * t);
        const y = cy + height * 0.32 * Math.sin(4 * t + Math.PI / 4);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(201,168,108,0.85)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      const x = cx + width * 0.38 * Math.sin(3 * t0);
      const y = cy + height * 0.32 * Math.sin(4 * t0 + Math.PI / 4);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#e8d5a3";
      ctx.fill();
      frame += 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="lissa-canvas" aria-label="Live Lissajous animation" />;
}
