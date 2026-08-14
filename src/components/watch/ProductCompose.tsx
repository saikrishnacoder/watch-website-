import { site } from "../../config/site";
import type { Product, StrapStyle, WatchDesign } from "../../config/site";
import { braceletColor } from "../../lib/composition";

type StrapOption = (typeof site.customizer.straps)[number];

export function ProductCompose({
  product,
  design,
  onDial,
  onStrap,
}: {
  product: Product;
  design: WatchDesign;
  onDial: (hex: string) => void;
  onStrap: (strap: StrapOption) => void;
}) {
  const dials = uniqueDials(product.design.dial);
  const straps = site.customizer.straps;

  return (
    <div className="pdp-compose">
      <div className="eyebrow">Compose this reference</div>
      <p>
        Dial and strap update the 360° view in front of you. A study on this page — not a new SKU. The atelier confirms
        whether it can be made.
      </p>
      <div className="product-line">Dial</div>
      <div className="swatches">
        {dials.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`swatch-dot ${design.dial === item.id ? "is-on" : ""}`}
            style={{ background: item.id }}
            aria-label={item.label}
            aria-pressed={design.dial === item.id}
            onClick={() => onDial(item.id)}
          />
        ))}
      </div>
      <div className="product-line">Strap</div>
      <div className="swatches">
        {straps.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`chip ${design.strap === item.id ? "is-on" : ""}`}
            aria-pressed={design.strap === item.id}
            onClick={() => onStrap(withBraceletColor(item, product.design.caseMetal))}
          >
            {strapWord(item.id)}
          </button>
        ))}
      </div>
    </div>
  );
}

function uniqueDials(original: string) {
  const fromMaison = site.customizer.dials;
  if (fromMaison.some((item) => item.id === original)) return fromMaison;
  return [{ id: original, label: "As drawn" }, ...fromMaison];
}

function strapWord(id: StrapStyle) {
  if (id === "leather") return "Leather";
  if (id === "bracelet") return "Steel";
  return "NATO";
}

function withBraceletColor(item: StrapOption, metal: WatchDesign["caseMetal"]): StrapOption {
  if (item.id !== "bracelet") return item;
  return { ...item, color: braceletColor(metal) };
}

export function strapFromDesign(design: WatchDesign): StrapOption {
  const found = site.customizer.straps.find((item) => item.id === design.strap);
  if (!found) {
    return { id: design.strap, label: design.strap, color: design.strapColor };
  }
  if (found.id === "bracelet") return withBraceletColor(found, design.caseMetal);
  return { ...found, color: design.strapColor };
}
