import { useId } from "react"
import { motion, type MotionValue, useTransform } from "framer-motion"
import { explodeKeys, explodeLayers } from "../../config/calibre-study"

const CX = 220
const CY = 220
const GOLD = "#c9a86c"
const PLATE = "#c5c1b6"
const BRIDGE = "#d8d2c4"
const STEEL = "#9aa0a6"
const INK = "#1a1814"

type Props = {
  progress: MotionValue<number>
  live?: boolean
}

export function CalibreStudyDrawing({ progress, live = false }: Props) {
  const uid = useId().replace(/:/g, "")

  return (
    <svg
      className={`explode-drawing${live ? " is-live" : ""}`}
      viewBox="0 0 440 440"
      role="img"
      aria-hidden
    >
      <defs>
        <radialGradient id={`${uid}-dial`} cx="42%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#f7f1e4" />
          <stop offset="55%" stopColor="#efe6d4" />
          <stop offset="100%" stopColor="#d9cdb6" />
        </radialGradient>
        <linearGradient id={`${uid}-case`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4f5f6" />
          <stop offset="40%" stopColor="#c8ccd0" />
          <stop offset="100%" stopColor="#7a7e84" />
        </linearGradient>
        <radialGradient id={`${uid}-plate`} cx="38%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ebe6da" />
          <stop offset="100%" stopColor="#b7b0a2" />
        </radialGradient>
        <clipPath id={`${uid}-plate-clip`}>
          <circle cx={CX} cy={CY} r="78" />
        </clipPath>
      </defs>

      <Layer progress={progress} layer="caseback">
        <circle cx={CX} cy={CY} r="108" fill="#8a8e94" stroke="#c5c7ca" strokeWidth="6" />
        <circle cx={CX} cy={CY} r="72" fill="none" stroke={INK} strokeOpacity="0.25" />
        <text x={CX} y={CY - 8} textAnchor="middle" fill={INK} fontSize="9" letterSpacing="3" fontFamily="Outfit, sans-serif">
          HORLOGE
        </text>
        <text x={CX} y={CY + 10} textAnchor="middle" fill={INK} fontSize="8" letterSpacing="2" fontFamily="Outfit, sans-serif">
          HO-01
        </text>
      </Layer>

      <Layer progress={progress} layer="case">
        <circle cx={CX} cy={CY} r="118" fill={`url(#${uid}-case)`} />
        <circle cx={CX} cy={CY} r="102" fill="#070605" />
      </Layer>

      <Layer progress={progress} layer="movement">
        <circle cx={CX} cy={CY} r="80" fill={`url(#${uid}-plate)`} />
        <g clipPath={`url(#${uid}-plate-clip)`}>
          {Array.from({ length: 28 }, (_, i) => {
            const a = (i / 28) * Math.PI * 2
            const r = 22 + (i % 4) * 14
            return (
              <circle
                key={i}
                cx={CX + Math.cos(a) * r}
                cy={CY + Math.sin(a) * r}
                r="11"
                fill="none"
                stroke="#9c9588"
                strokeOpacity="0.35"
              />
            )
          })}
        </g>
        <circle cx={CX} cy={CY} r="80" fill="none" stroke={STEEL} strokeWidth="1.2" />
        <path
          d={`M${CX - 8} ${CY - 62} A62 62 0 0 1 ${CX + 58} ${CY - 18} L${CX + 36} ${CY + 8} L${CX - 18} ${CY - 8} Z`}
          fill={BRIDGE}
          stroke="#8a8376"
          strokeWidth="0.8"
        />
        {[
          [CX - 4, CY - 48],
          [CX + 44, CY - 14],
          [CX + 20, CY + 2],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" fill={STEEL} stroke={INK} strokeWidth="0.6" />
        ))}
      </Layer>

      <Layer progress={progress} layer="gears">
        <g className="explode-spin explode-spin-slow" style={{ transformOrigin: `${CX - 36}px ${CY + 10}px` }}>
          <Gear cx={CX - 36} cy={CY + 10} r={30} teeth={48} fill="#b8a56a" />
          <circle cx={CX - 36} cy={CY + 10} r="16" fill="none" stroke={GOLD} strokeWidth="1.2" />
        </g>
        <g className="explode-spin" style={{ transformOrigin: `${CX + 6}px ${CY - 8}px` }}>
          <Gear cx={CX + 6} cy={CY - 8} r={18} teeth={32} fill="#d0ccc2" />
        </g>
        <g className="explode-spin explode-spin-slow" style={{ transformOrigin: `${CX + 34}px ${CY - 28}px` }}>
          <Gear cx={CX + 34} cy={CY - 28} r={13} teeth={24} fill="#c4c0b6" />
        </g>
      </Layer>

      <Layer progress={progress} layer="spring">
        <path
          d={hairspring(CX + 52, CY + 42, 22)}
          fill="none"
          stroke={GOLD}
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </Layer>

      <Layer progress={progress} layer="balance">
        <g className="explode-spin" style={{ transformOrigin: `${CX + 52}px ${CY + 42}px` }}>
          <circle cx={CX + 52} cy={CY + 42} r="26" fill="none" stroke={GOLD} strokeWidth="4.5" />
          <circle cx={CX + 52} cy={CY + 42} r="7" fill={BRIDGE} stroke={STEEL} />
          <line x1={CX + 52} y1={CY + 18} x2={CX + 52} y2={CY + 66} stroke={STEEL} strokeWidth="2" />
          <line x1={CX + 28} y1={CY + 42} x2={CX + 76} y2={CY + 42} stroke={STEEL} strokeWidth="2" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2
            return (
              <circle
                key={i}
                cx={CX + 52 + Math.cos(a) * 26}
                cy={CY + 42 + Math.sin(a) * 26}
                r="2.1"
                fill={STEEL}
              />
            )
          })}
        </g>
      </Layer>

      <Layer progress={progress} layer="dial">
        <circle cx={CX} cy={CY} r="88" fill={`url(#${uid}-dial)`} />
        {Array.from({ length: 60 }, (_, i) => {
          const a = ((i * 6 - 90) * Math.PI) / 180
          const major = i % 5 === 0
          const r1 = major ? 74 : 80
          return (
            <line
              key={i}
              x1={CX + Math.cos(a) * r1}
              y1={CY + Math.sin(a) * r1}
              x2={CX + Math.cos(a) * 84}
              y2={CY + Math.sin(a) * 84}
              stroke={INK}
              strokeOpacity={major ? 0.85 : 0.28}
              strokeWidth={major ? 2 : 0.7}
            />
          )
        })}
        <line x1={CX} y1={CY - 84} x2={CX} y2={CY - 46} stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" />
        <polygon points={`${CX},${CY - 86} ${CX - 3},${CY - 78} ${CX + 3},${CY - 78}`} fill={GOLD} />
        <text
          x={CX}
          y={CY - 22}
          textAnchor="middle"
          fill={INK}
          fontSize="8"
          letterSpacing="3"
          fontFamily="Outfit, sans-serif"
        >
          HORLOGE
        </text>
      </Layer>

      <Layer progress={progress} layer="hands">
        <polygon
          points={`${CX},${CY - 52} ${CX - 4},${CY} ${CX},${CY + 10} ${CX + 4},${CY}`}
          fill={INK}
          transform={`rotate(-55 ${CX} ${CY})`}
        />
        <polygon
          points={`${CX},${CY - 72} ${CX - 2.6},${CY} ${CX},${CY + 12} ${CX + 2.6},${CY}`}
          fill={INK}
          transform={`rotate(60 ${CX} ${CY})`}
        />
        <line x1={CX} y1={CY + 12} x2={CX} y2={CY - 78} stroke="#b5453a" strokeWidth="1.15" />
        <circle cx={CX} cy={CY} r="5" fill={STEEL} />
        <circle cx={CX} cy={CY} r="2" fill="#b5453a" />
      </Layer>

      <Layer progress={progress} layer="bezel">
        <circle cx={CX} cy={CY} r="104" fill="none" stroke={`url(#${uid}-case)`} strokeWidth="10" />
        {Array.from({ length: 60 }, (_, i) => {
          const a = ((i * 6 - 90) * Math.PI) / 180
          return (
            <line
              key={i}
              x1={CX + Math.cos(a) * 99}
              y1={CY + Math.sin(a) * 99}
              x2={CX + Math.cos(a) * 108}
              y2={CY + Math.sin(a) * 108}
              stroke={i % 5 === 0 ? "#f4f5f6" : "#7a7e84"}
              strokeWidth={i % 5 === 0 ? 2 : 0.8}
            />
          )
        })}
      </Layer>

      <Layer progress={progress} layer="crystal">
        <circle cx={CX} cy={CY} r="92" fill="#f4efe6" fillOpacity="0.08" stroke="#f4efe6" strokeOpacity="0.28" strokeWidth="1.2" />
      </Layer>
    </svg>
  )
}

function Layer({
  progress,
  layer,
  children,
}: {
  progress: MotionValue<number>
  layer: keyof typeof explodeLayers
  children: React.ReactNode
}) {
  const pack = explodeLayers[layer]
  const x = useTransform(progress, explodeKeys, [...pack.x])
  const y = useTransform(progress, explodeKeys, [...pack.y])
  const scale = useTransform(
    progress,
    explodeKeys,
    "scale" in pack ? [...pack.scale] : [1, 1, 1, 1, 1, 1, 1, 1, 1],
  )
  return (
    <motion.g className={`explode-layer explode-layer-${layer}`} style={{ x, y, scale }}>
      {children}
    </motion.g>
  )
}

function Gear({ cx, cy, r, teeth, fill }: { cx: number; cy: number; r: number; teeth: number; fill: string }) {
  const pts: string[] = []
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2 - Math.PI / 2
    const rr = i % 2 === 0 ? r : r * 0.78
    pts.push(`${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`)
  }
  return (
    <g>
      <polygon points={pts.join(" ")} fill={fill} stroke="#6a655c" strokeWidth="0.5" />
      <circle cx={cx} cy={cy} r={r * 0.28} fill={PLATE} stroke={INK} strokeWidth="0.7" />
      <circle cx={cx} cy={cy} r={r * 0.1} fill={INK} />
    </g>
  )
}

function hairspring(cx: number, cy: number, turns: number) {
  const pts: string[] = []
  const steps = 180
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const a = t * turns * Math.PI * 2
    const r = 4 + t * 18
    pts.push(`${i === 0 ? "M" : "L"}${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r}`)
  }
  return pts.join(" ")
}
