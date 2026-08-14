import { useEffect, useState } from "react";

const ROWS = [
  { wrist: "140–155 mm", size: "34–36 mm", note: "Heritage, a quiet wrist" },
  { wrist: "155–175 mm", size: "38–41 mm", note: "The maison’s centre" },
  { wrist: "175–190 mm", size: "41–43 mm", note: "Chronograph, Diver, Meridian" },
  { wrist: "190 mm+", size: "43–44 mm", note: "A larger presence" },
];

export function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
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
    <div className="size-guide" role="dialog" aria-modal="true" aria-labelledby="size-guide-title" onClick={onClose}>
      <div className="size-guide-card" onClick={(event) => event.stopPropagation()}>
        <div className="eyebrow">Fitting</div>
        <h2 id="size-guide-title">Wrist to diameter</h2>
        <p>A boutique advisor measures the wrist, then the lug-to-lug. This is the sheet they keep under the tray.</p>
        <table>
          <thead>
            <tr>
              <th>Wrist</th>
              <th>Case</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.wrist}>
                <td>{row.wrist}</td>
                <td>{row.size}</td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export function useSizeGuide() {
  const [open, setOpen] = useState(false);
  return { open, openGuide: () => setOpen(true), closeGuide: () => setOpen(false) };
}
