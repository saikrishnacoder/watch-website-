import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getProduct, site } from "../../config/site";
import { MagneticButton } from "../ui/MagneticButton";
import { WatchFace } from "../watch/WatchFace";

export function Hero() {
  const featured = getProduct(site.hero.featuredSlug) ?? site.products[0];
  const stage = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * -8, y: x * 10 });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-glow" />
      <div className="hero-rings" />
      <div>
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          {site.hero.eyebrow}
        </motion.div>
        <h1 className="display">
          <TitleLine text={site.hero.title} delay={1.55} />
          <motion.em
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.75, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {site.hero.accent}
          </motion.em>
        </h1>
        <motion.p
          className="lede"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        >
          {site.hero.body}
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.05, duration: 0.8 }}
        >
          <MagneticButton to={site.hero.primaryCta.href}>{site.hero.primaryCta.label}</MagneticButton>
          <MagneticButton variant="ghost" to={site.hero.secondaryCta.href}>
            {site.hero.secondaryCta.label}
          </MagneticButton>
        </motion.div>
      </div>
      <div className="hero-watch" ref={stage}>
        <motion.div
          style={{ rotateX: tilt.x, rotateY: tilt.y, transformPerspective: 900 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        >
          <WatchFace {...featured.design} brand={site.brand.name} size={420} />
        </motion.div>
      </div>
      <div className="scroll-hint">
        Scroll
        <b />
      </div>
    </section>
  );
}

function TitleLine({ text, delay }: { text: string; delay: number }) {
  return (
    <span style={{ display: "block", overflow: "hidden" }}>
      <motion.span
        style={{ display: "block" }}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}
