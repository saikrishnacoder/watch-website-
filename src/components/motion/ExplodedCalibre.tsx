import { useRef, useState } from "react"
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { calibreStudy } from "../../config/calibre-study"
import { useMotion } from "../../context/MotionContext"
import { CalibreStudyDrawing } from "../watch/CalibreStudyDrawing"

export function ExplodedCalibre() {
  const { reduceMotion } = useMotion()
  if (reduceMotion) return <ExplodeStatic />
  return <ExplodePinned />
}

function ExplodePinned() {
  const trackRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, restDelta: 0.001 })
  const [stage, setStage] = useState(0)
  const current = calibreStudy.stages[stage]
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const last = calibreStudy.stages.length - 1
    setStage(Math.min(last, Math.max(0, Math.round(value * last))))
  })

  const goTo = (index: number) => {
    const el = trackRef.current
    if (!el) return
    const max = Math.max(1, el.offsetHeight - window.innerHeight)
    const top = el.getBoundingClientRect().top + window.scrollY + (index / (calibreStudy.stages.length - 1)) * max
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <section
      ref={trackRef}
      className="explode-track"
      style={{ height: `${calibreStudy.stages.length * 92}vh` }}
      aria-label="Scroll to open study calibre HO-01"
      data-meridian="movement"
      data-meridian-label="Movement"
    >
      <div className="explode-sticky">
        <div className="explode-copy">
          <p className="eyebrow">{calibreStudy.eyebrow}</p>
          <p className="explode-kicker">Scroll to open</p>
          <h2 className="display explode-stage-name" aria-live="polite">
            {current.label}
          </h2>
          <p className="lede explode-stage-copy">{current.copy}</p>
          <ol className="explode-rail">
            {calibreStudy.stages.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={index === stage ? "is-on" : ""}
                  aria-current={index === stage ? "step" : undefined}
                  onClick={() => goTo(index)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="explode-stage">
          <CalibreStudyDrawing progress={progress} live={stage >= 5 && stage < 8} />
          <ul className="explode-facts">
            {calibreStudy.facts.map((fact) => (
              <li key={fact.id} className={stage >= fact.from ? "is-on" : ""}>
                {fact.label}
              </li>
            ))}
          </ul>
          {stage === calibreStudy.stages.length - 1 ? (
            <p className="explode-assembled-mark">Assembled</p>
          ) : null}
        </div>

        <p className="explode-disclaimer explode-disclaimer-side">{calibreStudy.disclaimer}</p>
        <div className="explode-progress" aria-hidden>
          <motion.span style={{ width: bar }} />
        </div>
      </div>
    </section>
  )
}

function ExplodeStatic() {
  const frozen = useMotionValue(0.875)
  return (
    <section className="section explode-static" aria-label="Study calibre HO-01" data-meridian="movement" data-meridian-label="Movement">
      <div className="section-head">
        <div>
          <div className="eyebrow">{calibreStudy.eyebrow}</div>
          <h2 className="display">{calibreStudy.title}</h2>
        </div>
        <Link className="section-link" to="/atelier">
          The atelier
        </Link>
      </div>
      <p className="lede explode-disclaimer">{calibreStudy.disclaimer}</p>
      <div className="explode-static-grid">
        <CalibreStudyDrawing progress={frozen} />
        <ol className="explode-facts is-static">
          {calibreStudy.facts.map((fact) => (
            <li key={fact.id} className="is-on">
              {fact.label}
            </li>
          ))}
        </ol>
      </div>
      <ol className="explode-stage-list">
        {calibreStudy.stages.map((item) => (
          <li key={item.id}>
            <strong>{item.label}</strong>
            <span>{item.copy}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
