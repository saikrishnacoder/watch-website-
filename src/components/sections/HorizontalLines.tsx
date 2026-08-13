import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "../../config/site";
import { useMotion } from "../../context/MotionContext";
import { Reveal } from "../ui/Reveal";

export function HorizontalLines() {
  const { reduceMotion, coarsePointer } = useMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  if (reduceMotion || coarsePointer) {
    return (
      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Collections</div>
            <h2 className="display">The five lines</h2>
            <p>{site.products.length} references, one gold meridian at 12.</p>
          </div>
          <Link className="section-link" to="/collection">
            All models
          </Link>
        </div>
        <div className="family-grid">
          {site.collectionLines.map((line, index) => (
            <Reveal key={line.slug} delay={index * 0.08} className="family-card">
              <Link to={`/collection/${line.slug}`}>
                <img src={line.image} alt={line.name} />
                <div>
                  <strong>{line.name}</strong>
                  <span>{line.tagline}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="horizon-track" style={{ height: "320vh" }}>
      <div className="horizon-sticky">
        <div className="horizon-head">
          <div>
            <div className="eyebrow">Collections</div>
            <h2 className="display">The five lines</h2>
          </div>
          <Link className="section-link" to="/collection">
            All models
          </Link>
        </div>
        <motion.div className="horizon-row" style={{ x }}>
          {site.collectionLines.map((line) => (
            <Link key={line.slug} to={`/collection/${line.slug}`} className="horizon-card">
              <img src={line.image} alt="" />
              <div>
                <strong>{line.name}</strong>
                <span>{line.tagline}</span>
                <em>{line.description}</em>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
