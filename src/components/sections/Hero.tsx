import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getProduct, site } from "../../config/site";
import { useMotion } from "../../context/MotionContext";
import { MagneticButton } from "../ui/MagneticButton";
import { WatchFace } from "../watch/WatchFace";
import { ParticleField } from "../motion/ParticleField";

export function Hero() {
  const featured = getProduct(site.hero.featuredSlug) ?? site.products[0];
  const { reduceMotion, canParallax } = useMotion();
  const [paused, setPaused] = useState(false);
  const { scrollY } = useScroll();
  const quiet = reduceMotion || paused || !canParallax;
  const y = useTransform(scrollY, [0, 720], [0, quiet ? 0 : 160]);
  const scale = useTransform(scrollY, [0, 720], [1, quiet ? 1 : 1.08]);

  return (
    <section className="cinema-hero" id="home">
      <motion.img
        className="cinema-bg"
        src={site.hero.image}
        alt={`${site.brand.name} ${featured.name} in the atelier`}
        width={2000}
        height={1333}
        fetchPriority="high"
        decoding="async"
        style={quiet ? undefined : { y, scale }}
      />
      <div className="cinema-veil" />
      {!quiet && <ParticleField />}
      {!quiet && (
        <div className="hero-orbits" aria-hidden>
          <span className="anim-orbit">
            <i />
          </span>
          <span className="anim-orbit anim-spin-reverse" style={{ inset: "18%" }}>
            <i />
          </span>
        </div>
      )}
      <div className="cinema-copy">
        <div className="eyebrow">{site.hero.eyebrow}</div>
        <h1 className="display">
          {site.hero.title} <em>{site.hero.accent}</em>
        </h1>
        <p className="lede">{site.hero.body}</p>
        <div className="hero-actions">
          <MagneticButton to={site.hero.primaryCta.href}>{site.hero.primaryCta.label}</MagneticButton>
          <MagneticButton variant="ghost" to={site.hero.secondaryCta.href}>
            {site.hero.secondaryCta.label}
          </MagneticButton>
        </div>
      </div>
      <div className="cinema-featured">
        <WatchFace {...featured.design} brand={site.brand.name} size={180} animate={!quiet} />
        <div>
          <div className="product-line">New model</div>
          <strong>{featured.name}</strong>
          <span>
            {featured.diameter} mm · {featured.material}
          </span>
        </div>
      </div>
      <button
        className="hero-pause"
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused || reduceMotion}
      >
        {paused || reduceMotion ? "Play visual" : "Pause visual"}
      </button>
    </section>
  );
}
