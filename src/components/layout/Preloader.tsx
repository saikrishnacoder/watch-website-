import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandMark } from "../brand/BrandMark";
import { useMotion } from "../../context/MotionContext";

export function Preloader() {
  const { reduceMotion, saveData } = useMotion();
  const [show, setShow] = useState(() => !reduceMotion && !saveData);

  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(() => setShow(false), 900);
    return () => window.clearTimeout(timer);
  }, [show]);

  if (reduceMotion || saveData) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          exit={{ y: "-100%", opacity: 0.6 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader-mark">
            <BrandMark to={false} stacked size={64} />
            <div className="preloader-line">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <button type="button" className="intro-skip" onClick={() => setShow(false)}>
              Skip
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
