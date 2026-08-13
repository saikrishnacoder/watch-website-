import type { BezelStyle, CaseMetal, HandStyle, MarkerStyle, StrapStyle } from "../../config/site";

export type WatchFaceProps = {
  size?: number;
  caseMetal: CaseMetal;
  dial: string;
  dialText: string;
  markers: MarkerStyle;
  hands: HandStyle;
  bezel: BezelStyle;
  strap: StrapStyle;
  strapColor: string;
  brand?: string;
  chronograph?: boolean;
  dateWindow?: boolean;
  animate?: boolean;
  className?: string;
  hours?: number;
  minutes?: number;
};

const METAL: Record<CaseMetal, { outer: string; mid: string; inner: string; gleam: string }> = {
  steel: { outer: "#5c6066", mid: "#d5d8dc", inner: "#8b9096", gleam: "#f6f7f8" },
  gold: { outer: "#7a5a24", mid: "#e0c070", inner: "#b8893a", gleam: "#f8e7b0" },
  rose: { outer: "#7a4a3a", mid: "#e0b09c", inner: "#b87864", gleam: "#f8d8cc" },
  black: { outer: "#0c0c0c", mid: "#3a3a3c", inner: "#1a1a1c", gleam: "#6a6a6c" },
};

const ROMANS = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

export function WatchFace({
  size = 360,
  caseMetal,
  dial,
  dialText,
  markers,
  hands,
  bezel,
  strap,
  strapColor,
  brand = "HORLOGE",
  chronograph = false,
  dateWindow = true,
  animate = true,
  className,
  hours = 10,
  minutes = 10,
}: WatchFaceProps) {
  const metal = METAL[caseMetal];
  const cx = 140;
  const cy = 148;
  const hourAngle = hours * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const id = `${caseMetal}-${dial.replace("#", "")}-${markers}-${bezel}`;
  const strapFront = strap === "bracelet" ? metal.mid : strapColor;
  const strapEdge = strap === "bracelet" ? metal.inner : shade(strapColor, -20);

  return (
    <svg
      viewBox="0 0 280 420"
      width={size}
      height={size * (420 / 280)}
      className={className}
      role="img"
      aria-label={`${brand} watch`}
    >
      <defs>
        <radialGradient id={`dial-${id}`} cx="42%" cy="32%" r="70%">
          <stop offset="0%" stopColor={tint(dial, 18)} />
          <stop offset="55%" stopColor={dial} />
          <stop offset="100%" stopColor={shade(dial, 22)} />
        </radialGradient>
        <linearGradient id={`case-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={metal.gleam} />
          <stop offset="35%" stopColor={metal.mid} />
          <stop offset="70%" stopColor={metal.inner} />
          <stop offset="100%" stopColor={metal.gleam} />
        </linearGradient>
        <linearGradient id={`bezel-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={metal.gleam} />
          <stop offset="50%" stopColor={metal.inner} />
          <stop offset="100%" stopColor={metal.mid} />
        </linearGradient>
        <linearGradient id={`strap-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={strapEdge} />
          <stop offset="20%" stopColor={strapFront} />
          <stop offset="80%" stopColor={strapFront} />
          <stop offset="100%" stopColor={strapEdge} />
        </linearGradient>
        <filter id={`shadow-${id}`} x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* lower strap */}
      <path
        d="M96 250 C96 250 92 410 140 410 C188 410 184 250 184 250 Z"
        fill={`url(#strap-${id})`}
      />
      {strap === "bracelet" &&
        [268, 292, 316, 340, 364, 388].map((y) => (
          <rect key={y} x="100" y={y} width="80" height="14" rx="3" fill={metal.inner} opacity="0.45" />
        ))}
      {strap === "nato" &&
        [270, 300, 330, 360, 390].map((y) => (
          <rect key={y} x="102" y={y} width="76" height="8" rx="1" fill="#000" opacity="0.25" />
        ))}

      {/* upper strap */}
      <path
        d="M98 46 C98 46 102 8 140 8 C178 8 182 46 182 46 Z"
        fill={`url(#strap-${id})`}
      />

      <g filter={`url(#shadow-${id})`}>
        {/* crown */}
        <rect x="246" y="136" width="12" height="26" rx="3" fill={metal.mid} stroke={metal.outer} />
        <rect x="256" y="140" width="5" height="18" rx="1.5" fill={metal.inner} />

        {/* case */}
        <circle cx={cx} cy={cy} r="112" fill={`url(#case-${id})`} />
        <circle cx={cx} cy={cy} r="104" fill={`url(#bezel-${id})`} />

        {bezel === "fluted" &&
          Array.from({ length: 60 }).map((_, i) => {
            const a = ((i * 6 - 90) * Math.PI) / 180;
            const inner = 96;
            const outer = 104;
            return (
              <line
                key={i}
                x1={cx + Math.cos(a) * inner}
                y1={cy + Math.sin(a) * inner}
                x2={cx + Math.cos(a) * outer}
                y2={cy + Math.sin(a) * outer}
                stroke={i % 5 === 0 ? metal.gleam : metal.outer}
                strokeWidth={i % 5 === 0 ? 2.2 : 1}
              />
            );
          })}

        {bezel === "tachymeter" &&
          Array.from({ length: 12 }).map((_, i) => {
            const a = ((i * 30 - 90) * Math.PI) / 180;
            return (
              <text
                key={i}
                x={cx + Math.cos(a) * 99}
                y={cy + Math.sin(a) * 99 + 3}
                textAnchor="middle"
                fontSize="7"
                fill={metal.gleam}
                fontFamily="Outfit, sans-serif"
              >
                {i === 0 ? 400 : 60 + i * 20}
              </text>
            );
          })}

        {bezel === "ceramic" && (
          <circle cx={cx} cy={cy} r="104" fill="#0b0d10" stroke={metal.mid} strokeWidth="1.2" />
        )}

        {/* dial */}
        <circle cx={cx} cy={cy} r="88" fill={`url(#dial-${id})`} />
        <circle cx={cx} cy={cy} r="88" fill="none" stroke={dialText} strokeOpacity="0.12" />

        {chronograph && (
          <>
            <circle cx={cx - 28} cy={cy} r="16" fill="none" stroke={dialText} strokeOpacity="0.35" />
            <circle cx={cx + 28} cy={cy} r="16" fill="none" stroke={dialText} strokeOpacity="0.35" />
            <circle cx={cx} cy={cy + 32} r="16" fill="none" stroke={dialText} strokeOpacity="0.35" />
          </>
        )}

        {Array.from({ length: 60 }).map((_, i) => {
          const a = ((i * 6 - 90) * Math.PI) / 180;
          const major = i % 5 === 0;
          const r1 = major ? 78 : 82;
          const r2 = 86;
          return (
            <line
              key={i}
              x1={cx + Math.cos(a) * r1}
              y1={cy + Math.sin(a) * r1}
              x2={cx + Math.cos(a) * r2}
              y2={cy + Math.sin(a) * r2}
              stroke={dialText}
              strokeOpacity={major ? 0.9 : 0.35}
              strokeWidth={major ? 2 : 0.7}
            />
          );
        })}

        {Array.from({ length: 12 }).map((_, i) => {
          const a = ((i * 30 - 90) * Math.PI) / 180;
          const r = markers === "roman" || markers === "arabic" ? 64 : 70;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;

          if (markers === "roman") {
            return (
              <text
                key={i}
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill={dialText}
                fontSize="11"
                fontFamily="Cormorant Garamond, serif"
                fontWeight="600"
              >
                {ROMANS[i]}
              </text>
            );
          }

          if (markers === "arabic") {
            return (
              <text
                key={i}
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill={dialText}
                fontSize="13"
                fontFamily="Outfit, sans-serif"
                fontWeight="500"
              >
                {i === 0 ? 12 : i}
              </text>
            );
          }

          if (markers === "dots") {
            return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3.2 : 2} fill={dialText} />;
          }

          const dx = Math.cos(a);
          const dy = Math.sin(a);
          const inner = 58;
          const outer = 74;
          return (
            <rect
              key={i}
              x={cx + dx * inner - 2.2}
              y={cy + dy * inner - 6}
              width="4.4"
              height="16"
              rx="1"
              fill={dialText}
              transform={`rotate(${i * 30} ${cx + dx * ((inner + outer) / 2)} ${cy + dy * ((inner + outer) / 2)})`}
            />
          );
        })}

        <text
          x={cx}
          y={cy - 28}
          textAnchor="middle"
          fill={dialText}
          fontSize="9"
          letterSpacing="3"
          fontFamily="Outfit, sans-serif"
        >
          {brand}
        </text>
        <text
          x={cx}
          y={cy - 16}
          textAnchor="middle"
          fill={dialText}
          opacity="0.55"
          fontSize="6"
          letterSpacing="2"
          fontFamily="Outfit, sans-serif"
        >
          GENÈVE
        </text>
        <polygon
          points={`${cx},${cy - 86} ${cx - 4},${cy - 76} ${cx + 4},${cy - 76}`}
          fill="#c9a86c"
        />

        {dateWindow && (
          <g>
            <rect x={cx + 52} y={cy - 8} width="18" height="16" rx="1.5" fill={tint(dial, 30)} stroke={dialText} strokeOpacity="0.35" />
            <text x={cx + 61} y={cy + 4} textAnchor="middle" fontSize="8" fill={dialText} fontFamily="Outfit, sans-serif">
              18
            </text>
          </g>
        )}

        <Hand
          cx={cx}
          cy={cy}
          length={hands === "sport" ? 48 : 44}
          width={hands === "sport" ? 6 : 5}
          angle={hourAngle}
          color={hands === "sport" ? "#c9a86c" : dialText}
          style={hands}
        />
        <Hand
          cx={cx}
          cy={cy}
          length={hands === "sport" ? 68 : 64}
          width={hands === "sport" ? 4.5 : 3.4}
          angle={minuteAngle}
          color={hands === "sport" ? "#c9a86c" : dialText}
          style={hands}
        />
        <g
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: animate ? "watch-second 60s linear infinite" : undefined,
          }}
        >
          <line x1={cx} y1={cy + 14} x2={cx} y2={cy - 76} stroke="#b5453a" strokeWidth="1.2" />
          <circle cx={cx} cy={cy - 62} r="2.2" fill="#b5453a" />
        </g>
        <circle cx={cx} cy={cy} r="5" fill={metal.mid} stroke={dialText} strokeWidth="1" />
        <circle cx={cx} cy={cy} r="2" fill="#b5453a" />
      </g>

      {/* glass gleam */}
      <ellipse cx={cx - 28} cy={cy - 36} rx="42" ry="22" fill="#fff" opacity="0.08" />
    </svg>
  );
}

function Hand({
  cx,
  cy,
  length,
  width,
  angle,
  color,
  style,
}: {
  cx: number;
  cy: number;
  length: number;
  width: number;
  angle: number;
  color: string;
  style: HandStyle;
}) {
  const rad = ((angle - 90) * Math.PI) / 180;
  const x2 = cx + Math.cos(rad) * length;
  const y2 = cy + Math.sin(rad) * length;
  const x0 = cx - Math.cos(rad) * 12;
  const y0 = cy - Math.sin(rad) * 12;

  if (style === "dauphine") {
    const px = Math.cos(rad + Math.PI / 2) * (width / 2);
    const py = Math.sin(rad + Math.PI / 2) * (width / 2);
    const midX = cx + Math.cos(rad) * (length * 0.55);
    const midY = cy + Math.sin(rad) * (length * 0.55);
    return (
      <polygon
        points={`${x0 + px},${y0 + py} ${midX},${midY} ${x2},${y2} ${midX},${midY} ${x0 - px},${y0 - py}`}
        fill={color}
      />
    );
  }

  return (
    <line
      x1={x0}
      y1={y0}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={width}
      strokeLinecap={style === "sport" ? "butt" : "round"}
    />
  );
}

function shade(hex: string, percent: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = clamp(((n >> 16) & 255) - percent);
  const g = clamp(((n >> 8) & 255) - percent);
  const b = clamp((n & 255) - percent);
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

function tint(hex: string, percent: number) {
  return shade(hex, -percent);
}

function clamp(n: number) {
  return Math.max(0, Math.min(255, n));
}
