import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getProduct, site } from "../../config/site";
import { track } from "../../lib/analytics";
import { useMotion } from "../../context/MotionContext";
import { BrandMark } from "../brand/BrandMark";
import { WatchFace } from "../watch/WatchFace";

type CinematicIntroProps = {
  open: boolean;
  onSkip: (reason: "skip" | "complete") => void;
};

const HOLD_MS = 4200;

export function CinematicIntro({ open, onSkip }: CinematicIntroProps) {
  const skipRef = useRef<HTMLButtonElement>(null);
  const { reduceMotion, canParallax } = useMotion();
  const featured = getProduct(site.hero.featuredSlug) ?? site.products[0];

  useEffect(() => {
    if (!open) return;
    track("intro_start");
    skipRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => onSkip("complete"), HOLD_MS);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onSkip("skip");
      if (event.key === "Enter") onSkip("complete");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onSkip]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cinematic-intro"
          role="dialog"
          aria-modal="true"
          aria-labelledby="intro-title"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            className="intro-still"
            src={site.hero.image}
            alt=""
            initial={reduceMotion ? false : { scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: HOLD_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="intro-veil" />
          {canParallax && <div className="intro-grain" aria-hidden />}
          <div className="intro-stage">
            <motion.div
              className="intro-watch"
              initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <WatchFace
                {...featured.design}
                brand={site.brand.name}
                size={220}
                animate={!reduceMotion}
              />
            </motion.div>
            <BrandMark to={false} stacked size={48} />
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {site.brand.seal}
            </motion.p>
            <motion.h1
              id="intro-title"
              className="display"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8 }}
            >
              {site.brand.motto}
            </motion.h1>
            <motion.p
              className="lede"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.55, duration: 0.7 }}
            >
              {site.brand.mottoEn}. A gold meridian at 12.
            </motion.p>
            <motion.span
              className="intro-meridian"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.button
              type="button"
              className="btn intro-enter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.5 }}
              onClick={() => onSkip("complete")}
            >
              Enter the maison
            </motion.button>
          </div>
          <button
            ref={skipRef}
            className="intro-skip"
            type="button"
            onClick={() => onSkip("skip")}
          >
            Skip introduction
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
