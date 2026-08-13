#!/usr/bin/env python3
"""Generate watch-themed SVG + CSS animations from Python math.

Run: python3 scripts/generate_animations.py
Outputs:
  public/animations/*.svg
  src/styles/python-motion.css
  src/data/python-motion.json
"""

from __future__ import annotations

import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SVG_DIR = ROOT / "public" / "animations"
CSS_PATH = ROOT / "src" / "styles" / "python-motion.css"
JSON_PATH = ROOT / "src" / "data" / "python-motion.json"

GOLD = "#c9a86c"
GOLD_SOFT = "#e8d5a3"
INK = "#f4efe6"
MUTED = "#9a9286"
BG = "#070605"


def svg_wrap(body: str, width: int = 720, height: int = 720, extra_css: str = "") -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" role="img" aria-label="Python-generated watch animation">
  <rect width="100%" height="100%" fill="{BG}"/>
  <style>
    {extra_css}
  </style>
  {body}
</svg>
"""


def gear_points(cx: float, cy: float, teeth: int, r_inner: float, r_outer: float) -> str:
    pts: list[str] = []
    steps = teeth * 4
    for i in range(steps):
        tooth = i // 4
        corner = i % 4
        angle = (tooth / teeth) * math.tau
        half = math.tau / teeth / 2
        if corner == 0:
            a, r = angle - half * 0.55, r_inner
        elif corner == 1:
            a, r = angle - half * 0.28, r_outer
        elif corner == 2:
            a, r = angle + half * 0.28, r_outer
        else:
            a, r = angle + half * 0.55, r_inner
        pts.append(f"{cx + r * math.cos(a):.2f},{cy + r * math.sin(a):.2f}")
    return " ".join(pts)


def write(name: str, content: str) -> None:
    path = SVG_DIR / name
    path.write_text(content, encoding="utf-8")
    print(f"  wrote {path.relative_to(ROOT)}")


def escapement() -> str:
    gears = [
        (360, 360, 48, 118, 132, 28, GOLD),
        (518, 360, 18, 44, 56, -74.6, GOLD_SOFT),
        (360, 198, 14, 34, 44, 96, INK),
        (248, 478, 22, 52, 64, -61, MUTED),
        (490, 510, 10, 22, 30, 134, GOLD),
    ]
    parts = ['<circle cx="360" cy="360" r="250" fill="none" stroke="rgba(201,168,108,0.18)" stroke-width="1"/>']
    for i, (cx, cy, teeth, inner, outer, dur, color) in enumerate(gears):
        pts = gear_points(cx, cy, teeth, inner, outer)
        parts.append(
            f"""<g>
  <polygon points="{pts}" fill="none" stroke="{color}" stroke-width="1.4">
    <animateTransform attributeName="transform" type="rotate" from="0 {cx} {cy}" to="{360 if dur > 0 else -360} {cx} {cy}" dur="{abs(dur)}s" repeatCount="indefinite"/>
  </polygon>
  <circle cx="{cx}" cy="{cy}" r="6" fill="{color}"/>
</g>"""
        )
    parts.append(
        """<g>
  <line x1="360" y1="360" x2="360" y2="250" stroke="#b5453a" stroke-width="1.5">
    <animateTransform attributeName="transform" type="rotate" from="0 360 360" to="360 360 360" dur="8s" repeatCount="indefinite"/>
  </line>
</g>"""
    )
    return svg_wrap("\n".join(parts), extra_css=".pulse{animation:p 3s ease-in-out infinite}@keyframes p{50%{opacity:.45}}")


def tourbillon() -> str:
    spokes = []
    for i in range(3):
        a = i * 120
        spokes.append(
            f'<line x1="360" y1="360" x2="{360 + 110 * math.cos(math.radians(a)):.1f}" y2="{360 + 110 * math.sin(math.radians(a)):.1f}" stroke="{GOLD}" stroke-width="2"/>'
        )
    spring = []
    for t in range(90):
        ang = t / 90 * math.tau * 4.5
        r = 12 + t * 0.35
        spring.append(f"{360 + r * math.cos(ang):.1f},{360 + r * math.sin(ang):.1f}")
    body = f"""
  <g>
    <animateTransform attributeName="transform" type="rotate" from="0 360 360" to="360 360 360" dur="12s" repeatCount="indefinite"/>
    <circle cx="360" cy="360" r="128" fill="none" stroke="{GOLD}" stroke-width="2"/>
    {''.join(spokes)}
    <g>
      <animateTransform attributeName="transform" type="rotate" values="-28 360 360;28 360 360;-28 360 360" dur="1.1s" repeatCount="indefinite"/>
      <circle cx="360" cy="360" r="46" fill="none" stroke="{INK}" stroke-width="3"/>
      <polyline points="{' '.join(spring)}" fill="none" stroke="{GOLD_SOFT}" stroke-width="1.1"/>
      <circle cx="360" cy="360" r="5" fill="{GOLD}"/>
    </g>
  </g>
"""
    return svg_wrap(body)


def hairspring() -> str:
    frames = []
    for frame in range(24):
        k = 0.82 + 0.18 * math.sin(frame / 24 * math.tau)
        pts = []
        for t in range(140):
            ang = t / 140 * math.tau * 6
            r = (8 + t * 0.55) * k
            pts.append(f"{360 + r * math.cos(ang):.1f},{360 + r * math.sin(ang):.1f}")
        frames.append(" ".join(pts))
    values = ";".join(frames)
    body = f"""
  <circle cx="360" cy="360" r="210" fill="none" stroke="rgba(201,168,108,0.2)"/>
  <polyline fill="none" stroke="{GOLD}" stroke-width="1.6" points="{frames[0]}">
    <animate attributeName="points" dur="2.4s" repeatCount="indefinite" values="{values}"/>
  </polyline>
  <circle cx="360" cy="360" r="7" fill="{GOLD}"/>
"""
    return svg_wrap(body)


def lissajous() -> str:
    pts = []
    for i in range(360):
        t = i / 360 * math.tau
        x = 360 + 220 * math.sin(3 * t)
        y = 360 + 160 * math.sin(4 * t + math.pi / 4)
        pts.append(f"{x:.1f},{y:.1f}")
    dash = 1800
    body = f"""
  <polyline class="trace" points="{' '.join(pts)}" fill="none" stroke="{GOLD}" stroke-width="1.4" stroke-linecap="round"/>
  <circle r="5" fill="{GOLD_SOFT}">
    <animateMotion dur="8s" repeatCount="indefinite" rotate="auto" path="M {' L '.join(pts)}"/>
  </circle>
"""
    css = f"""
      .trace {{
        stroke-dasharray: {dash};
        stroke-dashoffset: {dash};
        animation: draw 8s linear infinite;
      }}
      @keyframes draw {{
        to {{ stroke-dashoffset: 0; }}
      }}
    """
    return svg_wrap(body, extra_css=css)


def constellation() -> str:
    rings = []
    for ri, (count, radius, dur) in enumerate(((12, 90, 18), (18, 150, -26), (24, 210, 34), (8, 270, -48))):
        dots = []
        for i in range(count):
            a = i / count * math.tau
            x = 360 + radius * math.cos(a)
            y = 360 + radius * math.sin(a)
            delay = i * 0.12
            dots.append(
                f'<circle cx="{x:.1f}" cy="{y:.1f}" r="2.4" fill="{GOLD if ri % 2 == 0 else GOLD_SOFT}">'
                f'<animate attributeName="opacity" values="0.25;1;0.25" dur="3s" begin="{delay}s" repeatCount="indefinite"/>'
                f"</circle>"
            )
        rot = f'<g><animateTransform attributeName="transform" type="rotate" from="0 360 360" to="{360 if dur > 0 else -360} 360 360" dur="{abs(dur)}s" repeatCount="indefinite"/>{"".join(dots)}</g>'
        rings.append(rot)
        rings.append(f'<circle cx="360" cy="360" r="{radius}" fill="none" stroke="rgba(201,168,108,0.12)"/>')
    return svg_wrap("\n".join(rings))


def balance_wheel() -> str:
    ticks = []
    for i in range(60):
        a = i / 60 * math.tau
        r1 = 150 if i % 5 == 0 else 162
        ticks.append(
            f'<line x1="{360 + r1 * math.cos(a):.1f}" y1="{360 + r1 * math.sin(a):.1f}" x2="{360 + 172 * math.cos(a):.1f}" y2="{360 + 172 * math.sin(a):.1f}" stroke="{GOLD if i % 5 == 0 else MUTED}" stroke-width="{2 if i % 5 == 0 else 0.8}"/>'
        )
    body = f"""
  {''.join(ticks)}
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-32 360 360;32 360 360;-32 360 360" dur="0.9s" repeatCount="indefinite"/>
    <circle cx="360" cy="360" r="118" fill="none" stroke="{INK}" stroke-width="10"/>
    <circle cx="360" cy="360" r="78" fill="none" stroke="{GOLD}" stroke-width="2"/>
    <rect x="352" y="250" width="16" height="90" rx="3" fill="{GOLD}"/>
    <rect x="250" y="352" width="90" height="16" rx="3" fill="{GOLD}"/>
    <rect x="380" y="352" width="90" height="16" rx="3" fill="{GOLD}"/>
    <rect x="352" y="380" width="16" height="90" rx="3" fill="{GOLD}"/>
  </g>
  <circle cx="360" cy="360" r="8" fill="{GOLD_SOFT}"/>
"""
    return svg_wrap(body)


def orbit_dust() -> str:
    dots = []
    for i in range(42):
        rx = 80 + (i * 17) % 200
        ry = 50 + (i * 13) % 160
        dur = 6 + (i % 9) * 1.4
        delay = -(i * 0.37)
        color = GOLD if i % 3 else GOLD_SOFT
        dots.append(
            f"""<ellipse cx="360" cy="360" rx="{rx}" ry="{ry}" fill="none" stroke="rgba(201,168,108,0.08)"/>
<circle r="{1.6 + (i % 3) * 0.7}" fill="{color}">
  <animateMotion dur="{dur}s" begin="{delay}s" repeatCount="indefinite" path="M {360 + rx} 360 A {rx} {ry} 0 1 1 {360 - rx} 360 A {rx} {ry} 0 1 1 {360 + rx} 360"/>
</circle>"""
        )
    return svg_wrap("\n".join(dots))


def wave_dial() -> str:
    frames = []
    for f in range(32):
        phase = f / 32 * math.tau
        pts = []
        for x in range(0, 721, 8):
            y = 360 + 48 * math.sin(x / 70 + phase) + 18 * math.sin(x / 28 + phase * 2)
            pts.append(f"{x},{y:.1f}")
        frames.append(" ".join(pts))
    body = f"""
  <circle cx="360" cy="360" r="240" fill="none" stroke="rgba(201,168,108,0.25)"/>
  <polyline fill="none" stroke="{GOLD}" stroke-width="2" points="{frames[0]}">
    <animate attributeName="points" dur="4s" repeatCount="indefinite" values="{';'.join(frames)}"/>
  </polyline>
  <polyline fill="none" stroke="{GOLD_SOFT}" stroke-width="1" opacity="0.6" points="{frames[8]}">
    <animate attributeName="points" dur="4s" begin="-1s" repeatCount="indefinite" values="{';'.join(frames[8:] + frames[:8])}"/>
  </polyline>
"""
    return svg_wrap(body)


def pendulum() -> str:
    body = f"""
  <line x1="360" y1="80" x2="360" y2="430" stroke="{GOLD}" stroke-width="2">
    <animateTransform attributeName="transform" type="rotate" values="-18 360 80;18 360 80;-18 360 80" dur="2.6s" repeatCount="indefinite"/>
  </line>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-18 360 80;18 360 80;-18 360 80" dur="2.6s" repeatCount="indefinite"/>
    <circle cx="360" cy="470" r="48" fill="none" stroke="{GOLD}" stroke-width="6"/>
    <circle cx="360" cy="470" r="10" fill="{GOLD_SOFT}"/>
  </g>
  <circle cx="360" cy="80" r="6" fill="{INK}"/>
"""
    return svg_wrap(body)


def generate_css_and_json() -> tuple[str, dict]:
    particles = []
    keyframes = []
    utilities = []
    for i in range(36):
        x = round((math.sin(i * 0.7) * 0.5 + 0.5) * 100, 2)
        y = round((math.cos(i * 0.41) * 0.5 + 0.5) * 100, 2)
        size = round(2 + (i % 5) * 1.4, 1)
        dur = round(7 + (i % 8) * 1.25, 2)
        delay = round(-(i * 0.33), 2)
        amp = round(12 + (i % 7) * 4, 1)
        particles.append({"x": x, "y": y, "size": size, "dur": dur, "delay": delay, "amp": amp})
        name = f"py-drift-{i}"
        keyframes.append(
            f"""@keyframes {name} {{
  0%,100% {{ transform: translate(0,0) scale(1); opacity: .25; }}
  50% {{ transform: translate({amp * math.cos(i):.1f}px, {-amp:.1f}px) scale(1.35); opacity: 1; }}
}}"""
        )
        utilities.append(
            f".py-particle-{i}{{left:{x}%;top:{y}%;width:{size}px;height:{size}px;animation:{name} {dur}s ease-in-out {delay}s infinite;}}"
        )

    springs = []
    for i in range(8):
        name = f"py-spring-{i}"
        overshoot = 1.08 + i * 0.02
        keyframes.append(
            f"""@keyframes {name} {{
  0% {{ transform: scale(0.84) rotate(-{2 + i}deg); opacity: 0; }}
  55% {{ transform: scale({overshoot}) rotate({1 + i * 0.3}deg); opacity: 1; }}
  75% {{ transform: scale(0.97); }}
  100% {{ transform: scale(1) rotate(0); opacity: 1; }}
}}"""
        )
        springs.append(f".py-spring-{i}{{animation:{name} {0.7 + i * 0.05:.2f}s cubic-bezier(.22,1,.36,1) both;}}")

    pendula = []
    for i in range(6):
        name = f"py-pendulum-{i}"
        ang = 8 + i * 3
        keyframes.append(
            f"@keyframes {name} {{0%,100%{{transform:rotate(-{ang}deg)}}50%{{transform:rotate({ang}deg)}}}}"
        )
        pendula.append(f".py-pendulum-{i}{{transform-origin:top center;animation:{name} {1.6 + i * 0.25:.2f}s ease-in-out infinite;}}")

    css = f"""/* Generated by scripts/generate_animations.py — do not edit by hand */
{chr(10).join(keyframes)}

.py-particles {{
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}}
.py-particles span {{
  position: absolute;
  border-radius: 50%;
  background: {GOLD};
}}
{chr(10).join(utilities)}
{chr(10).join(springs)}
{chr(10).join(pendula)}
"""
    data = {"particles": particles, "svgs": [
        "escapement.svg",
        "tourbillon.svg",
        "hairspring.svg",
        "lissajous.svg",
        "constellation.svg",
        "balance.svg",
        "orbit-dust.svg",
        "wave-dial.svg",
        "pendulum.svg",
    ]}
    return css, data


def main() -> None:
    SVG_DIR.mkdir(parents=True, exist_ok=True)
    CSS_PATH.parent.mkdir(parents=True, exist_ok=True)
    JSON_PATH.parent.mkdir(parents=True, exist_ok=True)

    print("Generating Python animations…")
    write("escapement.svg", escapement())
    write("tourbillon.svg", tourbillon())
    write("hairspring.svg", hairspring())
    write("lissajous.svg", lissajous())
    write("constellation.svg", constellation())
    write("balance.svg", balance_wheel())
    write("orbit-dust.svg", orbit_dust())
    write("wave-dial.svg", wave_dial())
    write("pendulum.svg", pendulum())

    css, data = generate_css_and_json()
    CSS_PATH.write_text(css, encoding="utf-8")
    JSON_PATH.write_text(json.dumps(data, indent=2), encoding="utf-8")
    print(f"  wrote {CSS_PATH.relative_to(ROOT)}")
    print(f"  wrote {JSON_PATH.relative_to(ROOT)}")
    print("done.")


if __name__ == "__main__":
    main()
