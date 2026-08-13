import motion from "../../data/python-motion.json";

export function ParticleField({ className = "" }: { className?: string }) {
  return (
    <div className={`py-particles ${className}`} aria-hidden>
      {motion.particles.map((_, index) => (
        <span key={index} className={`py-particle-${index}`} />
      ))}
    </div>
  );
}
