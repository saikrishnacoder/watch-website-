import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import { altFor, site } from "../../config/site";
import { useMotion } from "../../context/MotionContext";
import { Reveal } from "../ui/Reveal";

export function HorizontalLines() {
  return (
    <section className="section" data-meridian="collections" data-meridian-label="Collections">
      <div className="section-head">
        <div>
          <div className="eyebrow">Collections</div>
          <h2 className="display">Five atmospheres. One meridian.</h2>
        </div>
      </div>
      <div className="line-atmospheres">
        {site.collectionLines.map((line, index) => (
          <AtmosphereCard key={line.slug} slug={line.slug} name={line.name} description={line.description} image={line.image} delay={index * 0.08} />
        ))}
      </div>
    </section>
  );
}

function AtmosphereCard({
  slug,
  name,
  description,
  image,
  delay,
}: {
  slug: string;
  name: string;
  description: string;
  image: string;
  delay: number;
}) {
  const { reduceMotion } = useMotion();
  const frame = useRef<HTMLDivElement>(null);

  const tilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const node = frame.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    node.style.setProperty("--tx", `${x * 22}px`);
    node.style.setProperty("--ty", `${y * 16}px`);
    node.style.setProperty("--rx", `${y * -4}deg`);
    node.style.setProperty("--ry", `${x * 6}deg`);
  };

  const reset = () => {
    const node = frame.current;
    if (!node) return;
    node.style.setProperty("--tx", "0px");
    node.style.setProperty("--ty", "0px");
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  };

  return (
    <Reveal delay={delay} className={`line-atmosphere is-${slug}`} y={56}>
      <div ref={frame} className="line-atmosphere-frame" onPointerMove={tilt} onPointerLeave={reset}>
        <img src={image} alt={altFor(image, name)} />
        <span className="line-atmosphere-fx" aria-hidden />
        <div>
          <strong>{name}</strong>
          <span>{description}</span>
          <Link to={`/collection/${slug}`}>Explore Collection</Link>
        </div>
      </div>
    </Reveal>
  );
}
