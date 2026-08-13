import motion from "../../data/python-motion.json";
import { useMotion } from "../../context/MotionContext";

const TITLES: Record<string, string> = {
  "escapement.svg": "Escapement train",
  "tourbillon.svg": "Tourbillon cage",
  "hairspring.svg": "Hairspring",
  "lissajous.svg": "Lissajous trace",
  "constellation.svg": "Orbiting markers",
  "balance.svg": "Balance wheel",
  "orbit-dust.svg": "Gold dust orbits",
  "wave-dial.svg": "Dial harmonics",
  "pendulum.svg": "Regulator pendulum",
};

type KineticGalleryProps = {
  featured?: string[];
};

export function KineticGallery({ featured }: KineticGalleryProps) {
  const { reduceMotion } = useMotion();
  const files = featured ?? motion.svgs;
  return (
    <div className="kinetic-grid">
      {files.map((file, index) => (
        <figure key={file} className={`kinetic-card ${reduceMotion ? "" : `py-spring-${index % 8} anim-border-trace`}`}>
          {reduceMotion ? (
            <img src={`/animations/${file}`} alt={TITLES[file] ?? file} width={640} height={640} loading="lazy" />
          ) : (
            <object data={`/animations/${file}`} type="image/svg+xml" aria-label={TITLES[file] ?? file} />
          )}
          <figcaption>
            <span className="product-line">Python</span>
            <strong>{TITLES[file] ?? file}</strong>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
