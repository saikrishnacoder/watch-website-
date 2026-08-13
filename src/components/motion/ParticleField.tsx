import motion from "../../data/python-motion.json";
import { useMotion } from "../../context/MotionContext";

export function ParticleField({ className = "" }: { className?: string }) {
  const { reduceMotion } = useMotion();
  if (reduceMotion) return null;

  return (
    <div className={`py-particles ${className}`} aria-hidden>
      {motion.particles.map((_, index) => (
        <span key={index} className={`py-particle-${index}`} />
      ))}
    </div>
  );
}
