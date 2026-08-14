import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMotion } from "../../context/MotionContext";

export function BackToTop() {
  const { pathname } = useLocation();
  const { reduceMotion } = useMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const onScroll = () => setVisible(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
    >
      Top
    </button>
  );
}
