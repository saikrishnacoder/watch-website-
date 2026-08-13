import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { useMotion } from "../../context/MotionContext";

export function HeritageTimeline({ compact = false }: { compact?: boolean }) {
  const { reduceMotion } = useMotion();
  const chapters = site.heritage;
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const index = useTransform(scrollYProgress, [0, 1], [0, Math.max(chapters.length - 1, 0)]);

  if (reduceMotion) {
    return (
      <section className="section heritage-static">
        <div className="section-head">
          <div>
            <div className="eyebrow">Heritage</div>
            <h2 className="display">A century, composed.</h2>
          </div>
          {!compact && (
            <Link className="section-link" to="/heritage">
              The full timeline
            </Link>
          )}
        </div>
        <ol className="heritage-list">
          {chapters.map((chapter) => (
            <li key={chapter.year}>
              <strong>{chapter.year}</strong>
              <div>
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  const height = `${chapters.length * 100}vh`;

  return (
    <section
      ref={trackRef}
      className={`heritage-track ${compact ? "is-compact" : ""}`}
      style={{ height }}
      aria-label="Maison heritage timeline"
    >
      <div className="heritage-sticky">
        {chapters.map((chapter, i) => (
          <ChapterPanel key={chapter.year} chapter={chapter} index={i} progress={index} last={i === chapters.length - 1} />
        ))}
        <div className="heritage-progress" aria-hidden>
          <motion.span style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}

type Chapter = (typeof site.heritage)[number];

function ChapterPanel({
  chapter,
  index,
  progress,
  last,
}: {
  chapter: Chapter;
  index: number;
  progress: ReturnType<typeof useTransform<number, number>>;
  last: boolean;
}) {
  const opacity = useTransform(progress, (value) => {
    const distance = Math.abs(value - index);
    if (distance < 0.55) return 1 - distance * 0.35;
    return 0;
  });
  const scale = useTransform(progress, (value) => {
    const distance = Math.abs(value - index);
    return 1.08 - Math.min(distance, 1) * 0.08;
  });

  return (
    <motion.article className="heritage-panel" style={{ opacity }} aria-hidden={false}>
      <motion.img src={chapter.image} alt="" style={{ scale }} />
      <div className="heritage-copy">
        <div className="eyebrow">Heritage</div>
        <p className="heritage-year">{chapter.year}</p>
        <h2 className="display">{chapter.title}</h2>
        <p className="lede">{chapter.body}</p>
        {last && (
          <Link className="section-link" to="/maison">
            The maison
          </Link>
        )}
      </div>
    </motion.article>
  );
}
