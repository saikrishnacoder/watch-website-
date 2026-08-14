import { useEffect, useId } from "react";
import { altFor, type GalleryFrame } from "../../config/site";
import { tapFeel } from "../../lib/feel";
import { useMotion } from "../../context/MotionContext";
import { PhotoZoom } from "./PhotoZoom";

type ProductGalleryProps = {
  frames: GalleryFrame[];
  index: number;
  name: string;
  onIndex: (index: number) => void;
  onOpen: () => void;
  listenKeys?: boolean;
};

export function ProductGallery({ frames, index, name, onIndex, onOpen, listenKeys = true }: ProductGalleryProps) {
  const { reduceMotion } = useMotion();
  const labelId = useId();
  const frame = frames[index] ?? frames[0];
  const count = frames.length;

  useEffect(() => {
    if (!listenKeys) return;
    const onKey = (event: KeyboardEvent) => {
      const node = event.target as HTMLElement | null;
      const typing =
        node &&
        (node.tagName === "INPUT" || node.tagName === "TEXTAREA" || node.tagName === "SELECT" || node.isContentEditable);
      if (typing || !count) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        tapFeel();
        onIndex((index + 1) % count);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        tapFeel();
        onIndex((index - 1 + count) % count);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, index, listenKeys, onIndex]);

  if (!frame) return null;

  const go = (next: number) => {
    tapFeel();
    onIndex((next + count) % count);
  };

  return (
    <div className="product-gallery" aria-labelledby={labelId}>
      <div className="product-gallery-stage">
        <PhotoZoom src={frame.src} alt={frame.alt} />
        <p className="product-gallery-meta" id={labelId}>
          <span>
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <strong>{frame.caption}</strong>
          <span className="product-gallery-name">{name}</span>
        </p>
        {count > 1 && (
          <>
            <button type="button" className="product-gallery-nav is-prev" onClick={() => go(index - 1)} aria-label="Previous frame">
              Previous
            </button>
            <button type="button" className="product-gallery-nav is-next" onClick={() => go(index + 1)} aria-label="Next frame">
              Next
            </button>
          </>
        )}
      </div>
      <div className="product-gallery-thumbs" role="tablist" aria-label={`${name} photography`}>
        {frames.map((item, i) => (
          <button
            key={`${item.src}-${item.kind}`}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? "is-on" : ""}
            onClick={() => go(i)}
          >
            <img src={item.src} alt={altFor(item.src, item.alt)} />
            <span>{item.caption}</span>
          </button>
        ))}
      </div>
      <div className="product-gallery-actions">
        <button type="button" className="text-link" onClick={onOpen}>
          Open full frame
        </button>
        {!reduceMotion && <span className="product-gallery-hint">Hover to lean in · arrows to change frame</span>}
      </div>
    </div>
  );
}
