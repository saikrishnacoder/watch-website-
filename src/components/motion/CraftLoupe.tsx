import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import { finishing, type FinishId } from "../../config/finishing"
import { useMotion } from "../../context/MotionContext"

const ZOOM = 2.4
const LOUPE = 180

export function CraftLoupe() {
  const { reduceMotion, coarsePointer } = useMotion()
  const bench = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0.52, y: 0.38 })
  const [size, setSize] = useState({ w: 640, h: 420 })
  const [active, setActive] = useState<FinishId | null>(null)
  const [hovering, setHovering] = useState(false)
  const spot = finishing.spots.find((s) => s.id === active)

  useEffect(() => {
    const el = bench.current
    if (!el) return
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = bench.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos({
      x: Math.min(1, Math.max(0, (event.clientX - r.left) / r.width)),
      y: Math.min(1, Math.max(0, (event.clientY - r.top) / r.height)),
    })
    setHovering(true)
  }

  const showLoupe = !reduceMotion && (hovering || coarsePointer || Boolean(active))
  const px = pos.x
  const py = pos.y
  const radius = LOUPE / 2

  return (
    <section className="section craft-loupe" data-meridian="bench" data-meridian-label="Bench">
      <div className="section-head">
        <div>
          <div className="eyebrow">{finishing.eyebrow}</div>
          <h2 className="display">{finishing.title}</h2>
        </div>
      </div>
      <p className="lede" style={{ maxWidth: 560, marginBottom: 36 }}>
        {finishing.lede}
      </p>
      <div className="loupe-layout">
        <div
          ref={bench}
          className="loupe-bench"
          onPointerMove={move}
          onPointerEnter={move}
          onPointerLeave={() => setHovering(false)}
        >
          <FinishingPlate />
          <div
            className="loupe-rake"
            style={{ background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,244,220,0.22), transparent 42%)` }}
            aria-hidden
          />
          {finishing.spots.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`loupe-spot${active === s.id ? " is-on" : ""}`}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              aria-label={s.label}
              aria-pressed={active === s.id}
              onClick={() => setActive(active === s.id ? null : s.id)}
            >
              {s.n}
            </button>
          ))}
          {showLoupe ? (
            <div
              className="loupe-glass"
              style={{ left: `${px * 100}%`, top: `${py * 100}%` }}
              aria-hidden
            >
              <div
                className="loupe-zoom"
                style={{
                  width: size.w,
                  height: size.h,
                  transform: `translate(${radius - px * size.w * ZOOM}px, ${radius - py * size.h * ZOOM}px) scale(${ZOOM})`,
                  transformOrigin: "0 0",
                }}
              >
                <FinishingPlate />
              </div>
            </div>
          ) : null}
        </div>
        <div className="loupe-side">
          <ol className="loupe-legend">
            {finishing.spots.map((s) => (
              <li key={s.id}>
                <button type="button" className={active === s.id ? "is-on" : ""} onClick={() => setActive(s.id)}>
                  {s.n} {s.label}
                </button>
              </li>
            ))}
          </ol>
          {spot ? (
            <aside className="inspect-card" aria-live="polite">
              <p className="eyebrow">
                {spot.n} {spot.label}
              </p>
              <p>{spot.copy}</p>
              <button type="button" className="inspect-dismiss" onClick={() => setActive(null)}>
                Close
              </button>
            </aside>
          ) : (
            <p className="studio-note">
              {reduceMotion ? "Open a mark to read the finishing." : "Drag across the plate. The loupe and the lamp follow."}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

function FinishingPlate() {
  return (
    <svg className="loupe-plate" viewBox="0 0 640 420" role="img" aria-label="Atelier finishing plate">
      <defs>
        <radialGradient id="enamel-well" cx="42%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#f7f1e4" />
          <stop offset="60%" stopColor="#efe4cc" />
          <stop offset="100%" stopColor="#c9b48a" />
        </radialGradient>
        <linearGradient id="bridge-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ece7db" />
          <stop offset="50%" stopColor="#c4bba8" />
          <stop offset="100%" stopColor="#8f8776" />
        </linearGradient>
        <clipPath id="plate-clip">
          <rect x="24" y="28" width="250" height="250" rx="8" />
        </clipPath>
        <clipPath id="bridge-clip">
          <path d="M300 48h250l-28 196H328z" />
        </clipPath>
      </defs>
      <rect width="640" height="420" fill="#12100e" />
      <rect x="24" y="28" width="250" height="250" rx="8" fill="#b7b0a2" />
      <g clipPath="url(#plate-clip)">
        {Array.from({ length: 70 }, (_, i) => {
          const col = i % 7
          const row = Math.floor(i / 7)
          return (
            <circle
              key={i}
              cx={48 + col * 34 + (row % 2) * 16}
              cy={52 + row * 24}
              r="16"
              fill="none"
              stroke="#8a8376"
              strokeWidth="1.1"
            />
          )
        })}
      </g>
      <text x="36" y="300" fill="#c9a86c" fontSize="9" letterSpacing="3" fontFamily="Outfit, sans-serif">
        PERLAGE
      </text>

      <path d="M300 48h250l-28 196H328z" fill="url(#bridge-metal)" />
      <g clipPath="url(#bridge-clip)">
        {Array.from({ length: 14 }, (_, i) => (
          <path
            key={i}
            d={`M280 ${40 + i * 16} C 380 ${56 + i * 16}, 470 ${28 + i * 16}, 580 ${48 + i * 16}`}
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="7"
          />
        ))}
      </g>
      <path d="M300 48h250l-28 196H328z" fill="none" stroke="#e8d5a3" strokeWidth="3.5" />
      <text x="318" y="268" fill="#c9a86c" fontSize="9" letterSpacing="3" fontFamily="Outfit, sans-serif">
        CÔTES · ANGLAGE
      </text>

      <circle cx="160" cy="352" r="48" fill="url(#enamel-well)" />
      <circle cx="160" cy="352" r="48" fill="none" stroke="#c9a86c" strokeWidth="1.2" />
      <line x1="160" y1="308" x2="160" y2="332" stroke="#c9a86c" strokeWidth="1.6" strokeLinecap="round" />
      <text x="220" y="348" fill="#c9a86c" fontSize="9" letterSpacing="3" fontFamily="Outfit, sans-serif">
        ÉMAIL
      </text>
      <text x="220" y="364" fill="#9a9286" fontSize="9" letterSpacing="2" fontFamily="Outfit, sans-serif">
        MERIDIAN
      </text>

      <circle cx="470" cy="330" r="56" fill="#1a1814" stroke="#c9a86c" strokeWidth="1" />
      <line x1="470" y1="278" x2="470" y2="318" stroke="#c9a86c" strokeWidth="1.8" strokeLinecap="round" />
      <text
        x="470"
        y="348"
        textAnchor="middle"
        fill="#c9a86c"
        fontSize="8"
        letterSpacing="3"
        fontFamily="Outfit, sans-serif"
      >
        HO-01
      </text>
    </svg>
  )
}
