import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

type LightboxProps = {
  open: boolean;
  src: string;
  title: string;
  caption?: string;
  onClose: () => void;
};

export function Lightbox({ open, src, title, caption, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button ref={closeRef} className="lightbox-close" type="button" onClick={onClose}>
            Close
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={src} alt={title} />
            <figcaption>
              <h2 id="lightbox-title">{title}</h2>
              {caption && <p>{caption}</p>}
            </figcaption>
          </figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
