const CSS_DEMOS = [
  { name: "Float", className: "anim-float", label: "ease-in-out translate" },
  { name: "Pulse", className: "anim-pulse-gold", label: "gold aura" },
  { name: "Spin", className: "anim-spin-slow", label: "linear 360°" },
  { name: "Reverse spin", className: "anim-spin-reverse", label: "counter-rotate" },
  { name: "Shimmer", className: "anim-shimmer", label: "light sweep" },
  { name: "Heartbeat", className: "anim-heartbeat", label: "scale beat" },
  { name: "Wobble", className: "anim-wobble", label: "balance tick" },
  { name: "Ripple", className: "anim-ripple", label: "expanding ring" },
  { name: "Blob", className: "anim-blob", label: "morphing radius" },
  { name: "Glint", className: "anim-glint", label: "brightness tick" },
  { name: "Clip reveal", className: "anim-clip-reveal", label: "inset mask" },
  { name: "Gradient", className: "anim-gradient-shift", label: "shifting wash" },
];

export function CssMotionBoard() {
  return (
    <div className="css-board stagger-in">
      {CSS_DEMOS.map((demo) => (
        <div key={demo.name} className={`css-demo ${demo.className}`}>
          <div className="css-swatch" />
          <strong>{demo.name}</strong>
          <span>{demo.label}</span>
        </div>
      ))}
    </div>
  );
}
