import { motion } from "framer-motion";
import { getProduct, site } from "../../config/site";
import { MagneticButton } from "../ui/MagneticButton";
import { WatchFace } from "../watch/WatchFace";
import { ParticleField } from "../motion/ParticleField";

export function Hero() {
  const featured = getProduct(site.hero.featuredSlug) ?? site.products[0];
  const letters = [...site.hero.title];

  return (
    <section className="cinema-hero" id="home">
      <motion.img
        className="cinema-bg"
        src={site.hero.image}
        alt=""
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="cinema-veil" />
      <ParticleField />
      <div className="hero-orbits" aria-hidden>
        <span className="anim-orbit"><i /></span>
        <span className="anim-orbit anim-spin-reverse" style={{ inset: "18%" }}><i /></span>
      </div>
      <div className="cinema-copy">
        <motion.div
          className="eyebrow anim-shimmer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
        >
          {site.hero.eyebrow}
        </motion.div>
        <h1 className="display anim-wave-text">
          {letters.map((letter, index) => (
            <span key={`${letter}-${index}`}>{letter}</span>
          ))}{" "}
          <em className="anim-letter-glow">{site.hero.accent}</em>
        </h1>
        <p className="lede anim-fade-up">{site.hero.body}</p>
        <div className="hero-actions stagger-in">
          <MagneticButton to={site.hero.primaryCta.href}>{site.hero.primaryCta.label}</MagneticButton>
          <MagneticButton variant="ghost" to={site.hero.secondaryCta.href}>
            {site.hero.secondaryCta.label}
          </MagneticButton>
        </div>
      </div>
      <div className="cinema-featured anim-pulse-gold">
        <WatchFace {...featured.design} brand={site.brand.name} size={180} />
        <div>
          <div className="product-line">New model</div>
          <strong>{featured.name}</strong>
          <span>
            {featured.diameter} mm · {featured.material}
          </span>
        </div>
      </div>
    </section>
  );
}
