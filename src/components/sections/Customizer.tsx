import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { BezelStyle, CaseMetal, HandStyle, MarkerStyle } from "../../config/site";
import { site } from "../../config/site";
import { useCabinet } from "../../context/CabinetContext";
import { compositionCode, compositionQuery, parseComposition, type Composition } from "../../lib/composition";
import { MagneticButton } from "../ui/MagneticButton";
import { Reveal } from "../ui/Reveal";
import { WatchFace } from "../watch/WatchFace";

type DialOption = (typeof site.customizer.dials)[number];
type StrapOption = (typeof site.customizer.straps)[number];

function defaults(): Composition {
  const dial = site.customizer.dials[0];
  const strap = site.customizer.straps[0];
  return {
    caseMetal: "gold",
    dial: dial.id,
    dialLabel: dial.label,
    markers: "roman",
    hands: "dauphine",
    bezel: "fluted",
    strap: strap.id,
    strapColor: strap.color,
    strapLabel: strap.label,
  };
}

export function Customizer({ standalone = false }: { standalone?: boolean }) {
  const [params] = useSearchParams();
  const { saveComposition } = useCabinet();
  const [note, setNote] = useState("");
  const initial = useMemo(() => parseComposition(params.toString(), defaults()), [params]);
  const [caseMetal, setCaseMetal] = useState<CaseMetal>(initial.caseMetal);
  const [dial, setDial] = useState<DialOption>(
    site.customizer.dials.find((item) => item.id === initial.dial) ?? site.customizer.dials[0],
  );
  const [markers, setMarkers] = useState<MarkerStyle>(initial.markers);
  const [hands, setHands] = useState<HandStyle>(initial.hands);
  const [bezel, setBezel] = useState<BezelStyle>(initial.bezel);
  const [strap, setStrap] = useState<StrapOption>(
    site.customizer.straps.find((item) => item.id === initial.strap) ?? site.customizer.straps[0],
  );

  const composition: Composition = {
    caseMetal,
    dial: dial.id,
    dialLabel: dial.label,
    markers,
    hands,
    bezel,
    strap: strap.id,
    strapColor: strap.color,
    strapLabel: strap.label,
  };
  const code = compositionCode(composition);
  const query = compositionQuery(composition);

  const inner = (
    <div className="customizer" data-meridian="compose" data-meridian-label="Compose">
      <Reveal>
        <WatchFace
          caseMetal={caseMetal}
          dial={dial.id}
          dialText={isLight(dial.id) ? "#1a1814" : "#f4efe6"}
          markers={markers}
          hands={hands}
          bezel={bezel}
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
        <p className="product-line">Study reference {code}</p>

        <div className="product-line">Case</div>
        <div className="swatches">
          {site.customizer.cases.map((item) => (
            <button
              key={item.id}
              type="button"
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
              type="button"
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
              type="button"
              className={`chip ${markers === item.id ? "is-on" : ""}`}
              onClick={() => setMarkers(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="product-line">Hands</div>
        <div className="swatches">
          {site.customizer.hands.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`chip ${hands === item.id ? "is-on" : ""}`}
              onClick={() => setHands(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="product-line">Bezel</div>
        <div className="swatches">
          {site.customizer.bezels.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`chip ${bezel === item.id ? "is-on" : ""}`}
              onClick={() => setBezel(item.id)}
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
              type="button"
              className={`chip ${strap.id === item.id ? "is-on" : ""}`}
              onClick={() => setStrap(item)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hero-actions">
          <MagneticButton to={`/boutique?compose=${encodeURIComponent(code)}`}>Request this composition</MagneticButton>
          <MagneticButton
            variant="ghost"
            onClick={() => {
              saveComposition(composition);
              setNote("Saved to the cabinet on this device.");
            }}
          >
            Save to cabinet
          </MagneticButton>
        </div>
        {standalone ? null : (
          <p className="studio-note" style={{ marginTop: 16 }}>
            <Link to={`/compose?${query}`} style={{ color: "var(--gold)" }}>
              Open the full composer
            </Link>
          </p>
        )}
        {note ? <p className="form-note">{note}</p> : null}
      </Reveal>
    </div>
  );

  if (standalone) return inner;
  return <section className="section">{inner}</section>;
}

function isLight(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
