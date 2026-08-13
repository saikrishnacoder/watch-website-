import { KineticGallery } from "../components/motion/KineticGallery";
import { CssMotionBoard } from "../components/motion/CssMotionBoard";
import { LissajousCanvas } from "../components/motion/LissajousCanvas";
import { ParticleField } from "../components/motion/ParticleField";
import { Reveal } from "../components/ui/Reveal";

export function MotionLab() {
  return (
    <div className="page motion-page">
      <section className="page-hero motion-hero">
        <ParticleField />
        <div className="eyebrow">Kinetic atelier</div>
        <h1 className="display anim-clip-reveal">
          Motion, <em className="anim-letter-glow">engineered.</em>
        </h1>
        <p className="lede anim-fade-up">Python generates the calibres. CSS keeps the maison alive.</p>
      </section>

      <section className="section">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="eyebrow">Python</div>
              <h2 className="display">Nine generated machines</h2>
            </div>
            <p>
              Gears, springs, orbits and waves are computed in{" "}
              <code>scripts/generate_animations.py</code> — trigonometry, not keyframes drawn by hand.
            </p>
          </div>
        </Reveal>
        <KineticGallery />
      </section>

      <section className="section live-lissa">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="eyebrow">Live plot</div>
              <h2 className="display">Lissajous, in the browser</h2>
            </div>
            <p>The same 3:4 harmonic the Python SVG uses, redrawn every frame on canvas.</p>
          </div>
        </Reveal>
        <div className="lissa-frame anim-border-trace">
          <LissajousCanvas />
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="eyebrow">CSS</div>
              <h2 className="display">A vocabulary of motion</h2>
            </div>
            <p>Float, pulse, spin, shimmer, ken burns, clip-reveal, blob morph, ripple, heartbeat, wobble, glint, gradient shift.</p>
          </div>
        </Reveal>
        <CssMotionBoard />
        <p className="motion-note">
          Wave, stagger, border-trace, typewriter, magnetic buttons and Python particle drift also run on Home, cards, and the preloader.
        </p>
      </section>
    </div>
  );
}
