import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProduct, site } from "../../config/site";
import { useMotion } from "../../context/MotionContext";
import { MagneticButton } from "../ui/MagneticButton";
import { WatchFace } from "../watch/WatchFace";

const HERO_KEY = "horloge-hero";
const ease = [0.22, 1, 0.36, 1] as const;
const LETTERS = site.brand.wordmark.split("");

export function Hero() {
  const featured = getProduct(site.hero.featuredSlug) ?? site.products[0];
  const { reduceMotion } = useMotion();
  const [settled, setSettled] = useState(() => {
    if (typeof window === "undefined") return true;
    return reduceMotion || sessionStorage.getItem(HERO_KEY) === "done";
  });

  useEffect(() => {
    if (reduceMotion) setSettled(true);
  }, [reduceMotion]);

  const persist = () => {
    sessionStorage.setItem(HERO_KEY, "done");
  };

  const skip = () => {
    persist();
    setSettled(true);
  };

  const instant = settled || reduceMotion;

  return (
    <section
      className={`cinema-hero ${instant ? "is-settled" : "is-playing"}`}
      id="home"
      data-meridian="reveal"
      data-meridian-label="Reveal"
    >
      <div className="cinema-dust" aria-hidden />
      <div className="cinema-field" aria-hidden>
        <span className="cinema-orbit cinema-orbit-a" />
        <span className="cinema-orbit cinema-orbit-b" />
        <span className="cinema-orbit cinema-orbit-c" />
      </div>

      <div className="cinema-stage">
        <div className="cinema-chapter" aria-hidden>
          {Array.from({ length: 12 }, (_, index) => (
            <i key={index} style={{ ["--a" as string]: `${index * 30}deg`, ["--d" as string]: `${0.55 + index * 0.08}s` }} />
          ))}
        </div>
        <motion.span
          className="cinema-meridian"
          aria-hidden
          initial={instant ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: instant ? 0 : 1.9, ease }}
        >
          <i className="cinema-gleam" />
        </motion.span>
        <motion.div
          className="cinema-watch"
          initial={instant ? false : { opacity: 0, scale: 0.86, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: instant ? 0 : 1.35, duration: instant ? 0 : 2.4, ease }}
        >
          <span className="cinema-rake" aria-hidden />
          <WatchFace {...featured.design} brand={site.brand.name} size={300} animate={!reduceMotion} />
        </motion.div>
        <div className="cinema-lockup">
          <p className="cinema-wordmark">
            {LETTERS.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                initial={instant ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: instant ? 0 : 3.15 + index * 0.07, duration: instant ? 0 : 0.7, ease }}
              >
                {letter}
              </motion.span>
            ))}
          </p>
          <motion.p
            className="cinema-motto"
            initial={instant ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{ delay: instant ? 0 : 3.85, duration: instant ? 0 : 1.1, ease }}
            onAnimationComplete={persist}
          >
            {site.brand.motto}
          </motion.p>
        </div>
        <motion.div
          className="hero-actions cinema-actions"
          initial={instant ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: instant ? 0 : 4.6, duration: instant ? 0 : 0.9, ease }}
        >
          <MagneticButton to={site.hero.primaryCta.href}>{site.hero.primaryCta.label}</MagneticButton>
          <MagneticButton variant="ghost" to={site.hero.secondaryCta.href}>
            {site.hero.secondaryCta.label}
          </MagneticButton>
        </motion.div>
      </div>

      <div className="scroll-hint cinema-scroll" aria-hidden>
        Scroll
        <b />
      </div>

      {!instant && (
        <button type="button" className="intro-skip" onClick={skip}>
          Skip
        </button>
      )}
    </section>
  );
}
