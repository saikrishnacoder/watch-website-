import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { useLocation } from "react-router-dom"
import { useMotion } from "../../context/MotionContext"

type Chapter = { id: string; label: string; top: number }

export function MeridianRail() {
  const { reduceMotion } = useMotion()
  const location = useLocation()
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 48, damping: 22, restDelta: 0.001 })
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const scan = () => {
      const nodes = [...document.querySelectorAll<HTMLElement>("[data-meridian]")].filter(
        (node) => node.dataset.meridian,
      )
      const doc = Math.max(document.documentElement.scrollHeight, 1)
      setChapters(
        nodes.map((node) => ({
          id: node.dataset.meridian ?? "",
          label: node.dataset.meridianLabel ?? node.dataset.meridian ?? "",
          top: (node.getBoundingClientRect().top + window.scrollY) / doc,
        })),
      )
    }
    scan()
    const id = window.setTimeout(scan, 240)
    const ro = new ResizeObserver(scan)
    ro.observe(document.documentElement)
    window.addEventListener("resize", scan)
    return () => {
      window.clearTimeout(id)
      ro.disconnect()
      window.removeEventListener("resize", scan)
    }
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => {
      const y = (window.scrollY + window.innerHeight * 0.32) / Math.max(document.documentElement.scrollHeight, 1)
      let index = 0
      chapters.forEach((chapter, i) => {
        if (chapter.top <= y) index = i
      })
      setActive(index)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [chapters])

  const go = (id: string) => {
    document.querySelector(`[data-meridian="${id}"]`)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <div className="meridian-rail" aria-hidden={chapters.length === 0}>
      {reduceMotion ? <i /> : <motion.i style={{ scaleY }} />}
      {chapters.length > 1 ? (
        <ol className="meridian-ticks">
          {chapters.map((chapter, index) => (
            <li key={chapter.id} style={{ top: `${Math.min(92, Math.max(8, chapter.top * 100))}%` }}>
              <button
                type="button"
                className={index === active ? "is-on" : ""}
                aria-label={chapter.label}
                title={chapter.label}
                onClick={() => go(chapter.id)}
              />
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  )
}
