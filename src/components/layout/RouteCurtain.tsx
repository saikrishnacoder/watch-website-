import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function RouteCurtain({ pathname, quiet }: { pathname: string; quiet: boolean }) {
  const primed = useRef(false);

  useEffect(() => {
    primed.current = true;
  }, []);

  if (quiet || !primed.current) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={pathname}
        className="route-curtain"
        initial={{ scaleY: 0, opacity: 0.9 }}
        animate={{ scaleY: 1, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
    </AnimatePresence>
  );
}
