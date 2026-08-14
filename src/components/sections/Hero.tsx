import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProduct, site } from "../../config/site";
import { useMotion } from "../../context/MotionContext";
import { MagneticButton } from "../ui/MagneticButton";
import { WatchFace } from "../watch/WatchFace";

const HERO_KEY = "horloge-hero";
const ease = [0.22, 1, 0.36, 1] as const;

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
    <section className="cinema-hero" id="home" data-meridian="reveal" data-meridian-label="Reveal">
      <div className="cinema-stage">
        <motion.span
          className="cinema-meridian"
          aria-hidden
          initial={instant ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: instant ? 0 : 1.9, ease }}
        />
        <motion.div
          className="cinema-watch"
          initial={instant ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: instant ? 0 : 1.55, duration: instant ? 0 : 2.2, ease }}
        >
          <WatchFace {...featured.design} brand={site.brand.name} size={300} animate={!reduceMotion} />
        </motion.div>
        <motion.div
          className="cinema-lockup"
          initial={instant ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: instant ? 0 : 3.4, duration: instant ? 0 : 1.2, ease }}
          onAnimationComplete={persist}
        >
          <p className="cinema-wordmark">{site.brand.wordmark}</p>
          <p className="cinema-motto">{site.brand.motto}</p>
        </motion.div>
        <motion.div
          className="hero-actions cinema-actions"
          initial={instant ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: instant ? 0 : 4.5, duration: instant ? 0 : 0.9, ease }}
        >
          <MagneticButton to={site.hero.primaryCta.href}>{site.hero.primaryCta.label}</MagneticButton>
          <MagneticButton variant="ghost" to={site.hero.secondaryCta.href}>
            {site.hero.secondaryCta.label}
          </MagneticButton>
        </motion.div>
      </div>
      {!instant && (
        <button type="button" className="intro-skip" onClick={skip}>
          Skip
        </button>
      )}
    </section>
  );
}
