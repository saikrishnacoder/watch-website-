import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../../config/site";
import { track } from "../../lib/analytics";
import { BrandMark } from "../brand/BrandMark";

type CinematicIntroProps = {
  open: boolean;
  onSkip: (reason: "skip" | "complete") => void;
};

export function CinematicIntro({ open, onSkip }: CinematicIntroProps) {
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    track("intro_start");
    skipRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => onSkip("complete"), 6400);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onSkip("skip");
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
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            className="intro-still"
            src={site.hero.image}
            alt=""
            initial={{ scale: 1.16 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="intro-veil" />
          <div className="intro-grain" aria-hidden />
          <div className="intro-stage">
            <BrandMark to={false} stacked size={56} />
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              {site.brand.seal}
            </motion.p>
            <motion.h1
              id="intro-title"
              className="display"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9 }}
            >
              {site.brand.motto}
            </motion.h1>
            <motion.p
              className="lede"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              {site.brand.mottoEn}. A gold meridian at 12.
            </motion.p>
            <motion.span
              className="intro-meridian"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
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
