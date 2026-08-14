import { useEffect } from "react";
import { Link } from "react-router-dom";
import { calibreFamily, craftDisclaimer } from "../../config/calibres";
import type { Product } from "../../config/site";

export function CraftStrip({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const calibre = calibreFamily(product.movement);

  return (
    <div className="craft-strip">
      <div className="craft-strip-facts">
        <p>
          <span>Calibre</span>
          <strong>{calibre?.id ?? product.movement}</strong>
        </p>
        <p>
          <span>Power reserve</span>
          <strong>{product.powerReserve} h</strong>
        </p>
        <p>
          <span>Water resistance</span>
          <strong>{product.waterResistance} m</strong>
        </p>
      </div>
      <button type="button" className="section-link" onClick={onOpen}>
        Open the craftsmanship sheet
      </button>
    </div>
  );
}

export function CraftSheet({ product }: { product: Product }) {
  const calibre = calibreFamily(product.movement);
  const movement = product.specGroups.find((group) => group.title === "Movement");
  const casing = product.specGroups.find((group) => group.title === "Case");

  return (
    <div className="craft-sheet">
      <div className="eyebrow">The calibre</div>
      <h2 id="craft-sheet-title" className="display">
        {calibre?.name ?? product.movement}
      </h2>
      <p className="lede">
        {product.name} · {product.reference}. {calibre?.note ?? product.tagline}
      </p>
      <dl className="craft-sheet-facts">
        <div>
          <dt>Calibre</dt>
          <dd>{product.movement}</dd>
        </div>
        <div>
          <dt>Type</dt>
          <dd>{product.movementType}</dd>
        </div>
        <div>
          <dt>Power reserve</dt>
          <dd>{product.powerReserve} hours</dd>
        </div>
        <div>
          <dt>Water resistance</dt>
          <dd>{product.waterResistance} metres</dd>
        </div>
        <div>
          <dt>Diameter</dt>
          <dd>{product.diameter} mm</dd>
        </div>
        <div>
          <dt>Thickness</dt>
          <dd>{product.thickness} mm</dd>
        </div>
      </dl>
      {calibre && (
        <p className="craft-sheet-note">
          {calibre.winding}. The {calibre.line} line is built around this family. This sheet is the watch in front of
          you — not the teaching drawing HO-01.
        </p>
      )}
      {movement && (
        <div className="craft-sheet-group">
          <h3>Movement</h3>
          {movement.rows.map((row) => (
            <p key={row.label}>
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </p>
          ))}
        </div>
      )}
      {casing && (
        <div className="craft-sheet-group">
          <h3>Case</h3>
          {casing.rows.map((row) => (
            <p key={row.label}>
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </p>
          ))}
        </div>
      )}
      {product.complications.length > 0 && (
        <p className="craft-sheet-complications">{product.complications.join(" · ")}</p>
      )}
      <p className="form-note">{craftDisclaimer}</p>
    </div>
  );
}

export function CraftModal({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="craft-modal" role="dialog" aria-modal="true" aria-labelledby="craft-sheet-title" onClick={onClose}>
      <div className="craft-modal-card" onClick={(event) => event.stopPropagation()}>
        <CraftSheet product={product} />
        <div className="craft-modal-actions">
          <Link className="section-link" to={`/watch/${product.slug}/craft`} onClick={onClose}>
            Open as a page
          </Link>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
