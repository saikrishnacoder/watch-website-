import { motion, useScroll, useSpring } from "framer-motion";
import { useMotion } from "../../context/MotionContext";

export function MeridianRail() {
  const { reduceMotion, canParallax } = useMotion();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 48, damping: 22, restDelta: 0.001 });

  if (reduceMotion || !canParallax) {
    return <div className="meridian-rail" aria-hidden />;
  }

  return (
    <div className="meridian-rail" aria-hidden>
      <motion.i style={{ scaleY }} />
    </div>
  );
}
