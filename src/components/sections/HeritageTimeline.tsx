import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { altFor, site } from "../../config/site";
import { useMotion } from "../../context/MotionContext";

type Chapter = (typeof site.heritage)[number];

export function HeritageTimeline({
  compact = false,
  interactive = compact,
  chapters = site.heritage,
}: {
  compact?: boolean;
  interactive?: boolean;
  chapters?: typeof site.heritage;
}) {
  const { reduceMotion, canParallax } = useMotion();

  if (interactive || reduceMotion || !canParallax) {
    return <HeritageInteractive chapters={chapters} compact={compact || interactive} />;
  }

  return <HeritageScroll chapters={chapters} />;
}

function HeritageInteractive({ chapters, compact }: { chapters: Chapter[]; compact: boolean }) {
  const [index, setIndex] = useState(0);
  const chapter = chapters[index] ?? chapters[0];
  const latest = chapters[chapters.length - 1]?.year ?? site.brand.founded;

  const go = (next: number) => setIndex(Math.min(chapters.length - 1, Math.max(0, next)));

  return (
    <section
      className={`section heritage-interactive ${compact ? "is-compact" : ""}`}
      data-meridian="heritage"
      data-meridian-label="Heritage"
      aria-label="Maison heritage timeline, 1924 to present"
      id="heritage"
    >
      <div className="section-head">
        <div>
          <div className="eyebrow">Heritage</div>
          <h2 className="display">
            {site.brand.founded} to {latest}.
          </h2>
        </div>
        {compact && (
          <Link className="section-link" to="/heritage">
            Scroll the century
          </Link>
        )}
      </div>
      <div className="heritage-axis" role="tablist" aria-label="Years">
        <span className="heritage-axis-line" aria-hidden />
        {chapters.map((item, i) => (
          <button
            key={item.year}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? "is-on" : ""}
            onClick={() => setIndex(i)}
          >
            {item.year}
          </button>
        ))}
      </div>
      {chapter && (
        <article className="heritage-interactive-card">
          <img src={chapter.image} alt={altFor(chapter.image, `${chapter.year} · ${chapter.title}`)} />
          <div>
            <p className="heritage-year">{chapter.year}</p>
            <h3 className="display">{chapter.title}</h3>
            <p className="lede">{chapter.body}</p>
            <div className="heritage-interactive-nav">
              <button type="button" className="section-link" disabled={index === 0} onClick={() => go(index - 1)}>
                Previous
              </button>
              <button
                type="button"
                className="section-link"
                disabled={index === chapters.length - 1}
                onClick={() => go(index + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function HeritageScroll({ chapters }: { chapters: Chapter[] }) {
  const trackRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const index = useTransform(scrollYProgress, [0, 1], [0, Math.max(chapters.length - 1, 0)]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const max = Math.max(1, el.offsetHeight - window.innerHeight);
    const top = el.getBoundingClientRect().top + window.scrollY + (i / (chapters.length - 1)) * max;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      ref={trackRef}
      className="heritage-track"
      style={{ height: `${chapters.length * 100}vh` }}
      aria-label="Maison heritage timeline"
      data-meridian="heritage"
      data-meridian-label="Heritage"
    >
      <div className="heritage-sticky">
        {chapters.map((chapter, i) => (
          <ChapterPanel key={chapter.year} chapter={chapter} index={i} progress={index} last={i === chapters.length - 1} />
        ))}
        <div className="heritage-year-rail" role="tablist" aria-label="Years">
          {chapters.map((chapter, i) => (
            <button key={chapter.year} type="button" onClick={() => goTo(i)}>
              {chapter.year}
            </button>
          ))}
        </div>
        <div className="heritage-progress" aria-hidden>
          <motion.span style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}

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
      <motion.img src={chapter.image} alt={altFor(chapter.image, `${chapter.year} · ${chapter.title}`)} style={{ scale }} />
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
