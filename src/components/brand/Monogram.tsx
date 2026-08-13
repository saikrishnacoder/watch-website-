type MonogramProps = {
  size?: number;
  className?: string;
};

export function Monogram({ size = 36, className }: MonogramProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden
    >
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180;
        const r1 = i % 3 === 0 ? 24 : 26;
        return (
          <line
            key={i}
            x1={32 + Math.cos(a) * r1}
            y1={32 + Math.sin(a) * r1}
            x2={32 + Math.cos(a) * 28.5}
            y2={32 + Math.sin(a) * 28.5}
            stroke="currentColor"
            strokeWidth={i === 0 ? 1.8 : 0.7}
          />
        );
      })}
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Cormorant Garamond, serif"
        fontSize="22"
        fontWeight="600"
      >
        H
      </text>
      <line x1="32" y1="14" x2="32" y2="22" stroke="#c9a86c" strokeWidth="1.6" />
    </svg>
  );
}
