import { lazy, Suspense, useCallback, useState } from "react"
import type { Product } from "../../config/types"
import { inspectHint, inspectSpots, type InspectSpotId } from "../../config/inspect"
import { useMotion } from "../../context/MotionContext"
import { Caseback } from "../watch/Caseback"
import { WatchFace } from "../watch/WatchFace"

const Scene = lazy(() => import("./WatchScene").then((m) => ({ default: m.WatchScene })))

type SpotPos = { x: number; y: number; visible: boolean }

const FALLBACK_POS: Record<InspectSpotId, { x: string; y: string }> = {
  meridian: { x: "50%", y: "18%" },
  dial: { x: "50%", y: "48%" },
  bezel: { x: "78%", y: "22%" },
  crown: { x: "92%", y: "50%" },
  caseback: { x: "18%", y: "78%" },
}

export function WatchStudio({ product }: { product: Product }) {
  const { webgl, saveData, slowNetwork } = useMotion()
  const heavy = webgl && !saveData && !slowNetwork
  const [active, setActive] = useState<InspectSpotId | null>(null)
  const [positions, setPositions] = useState<Partial<Record<InspectSpotId, SpotPos>>>({})
  const spot = inspectSpots.find((s) => s.id === active)

  const onHotspots = useCallback((next: Record<InspectSpotId, SpotPos>) => {
    setPositions(next)
  }, [])

  const toggle = (id: InspectSpotId) => {
    setActive((current) => (current === id ? null : id))
  }

  return (
    <div className="watch-studio inspect-studio">
      <div className="inspect-viewport">
        {heavy ? (
          <Suspense fallback={<WatchFace {...product.design} brand="HORLOGE" size={280} animate={false} />}>
            <Scene product={product} onHotspots={onHotspots} onInspect={setActive} inspectId={active} />
          </Suspense>
        ) : active === "caseback" ? (
          <Caseback metal={product.design.caseMetal} reference={product.reference} />
        ) : (
          <WatchFace {...product.design} brand="HORLOGE" size={280} animate={false} />
        )}
        {inspectSpots.map((s) => {
          const pos = positions[s.id]
          const style = heavy
            ? pos?.visible
              ? { left: pos.x, top: pos.y, opacity: 1 }
              : { opacity: 0, pointerEvents: "none" as const, left: 0, top: 0 }
            : { left: FALLBACK_POS[s.id].x, top: FALLBACK_POS[s.id].y, opacity: 1 }
          return (
            <button
              key={s.id}
              type="button"
              className={`inspect-hotspot${active === s.id ? " is-on" : ""}`}
              style={style}
              aria-pressed={active === s.id}
              aria-label={s.label}
              onClick={() => toggle(s.id)}
            >
              {s.n}
            </button>
          )
        })}
      </div>
      <p className="studio-note inspect-hint">{heavy ? inspectHint : "Five marks on the volume. Open one."}</p>
      <ol className="inspect-legend">
        {inspectSpots.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className={active === s.id ? "is-on" : ""}
              aria-pressed={active === s.id}
              onClick={() => toggle(s.id)}
            >
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
        <p className="studio-note">Open a mark — or double-click the case to lean in.</p>
      )}
    </div>
  )
}
