import { useState } from "react";
import type { CaseMetal, MarkerStyle } from "../../config/site";
import { site } from "../../config/site";
import { MagneticButton } from "../ui/MagneticButton";
import { Reveal } from "../ui/Reveal";
import { WatchFace } from "../watch/WatchFace";

type DialOption = (typeof site.customizer.dials)[number];
type StrapOption = (typeof site.customizer.straps)[number];

export function Customizer() {
  const [caseMetal, setCaseMetal] = useState<CaseMetal>("gold");
  const [dial, setDial] = useState<DialOption>(site.customizer.dials[0]);
  const [markers, setMarkers] = useState<MarkerStyle>("roman");
  const [strap, setStrap] = useState<StrapOption>(site.customizer.straps[0]);

  return (
    <section className="section">
      <div className="customizer">
        <Reveal>
          <WatchFace
            caseMetal={caseMetal}
            dial={dial.id}
            dialText={isLight(dial.id) ? "#1a1814" : "#f4efe6"}
            markers={markers}
            hands="dauphine"
            bezel="fluted"
            strap={strap.id}
            strapColor={strap.color}
            brand={site.brand.name}
            dateWindow
            size={380}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="eyebrow">{site.customizer.eyebrow}</div>
          <h2 className="display" style={{ fontSize: "clamp(40px, 5vw, 68px)", marginBottom: 16 }}>
            {site.customizer.title}
          </h2>
          <p className="lede">{site.customizer.body}</p>

          <div className="product-line">Case</div>
          <div className="swatches">
            {site.customizer.cases.map((item) => (
              <button
                key={item.id}
                className={`chip ${caseMetal === item.id ? "is-on" : ""}`}
                onClick={() => setCaseMetal(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="product-line">Dial</div>
          <div className="swatches">
            {site.customizer.dials.map((item) => (
              <button
                key={item.id}
                className={`swatch-dot ${dial.id === item.id ? "is-on" : ""}`}
                style={{ background: item.id }}
                aria-label={item.label}
                onClick={() => setDial(item)}
              />
            ))}
          </div>

          <div className="product-line">Markers</div>
          <div className="swatches">
            {site.customizer.markers.map((item) => (
              <button
                key={item.id}
                className={`chip ${markers === item.id ? "is-on" : ""}`}
                onClick={() => setMarkers(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="product-line">Strap</div>
          <div className="swatches">
            {site.customizer.straps.map((item) => (
              <button
                key={item.id}
                className={`chip ${strap.id === item.id ? "is-on" : ""}`}
                onClick={() => setStrap(item)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <MagneticButton to="/boutique">Request this composition</MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}

function isLight(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
