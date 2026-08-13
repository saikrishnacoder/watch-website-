import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { detectCapabilities, type DeviceCapabilities } from "../lib/capabilities";

const STORAGE_KEY = "horloge-reduce-motion";

type MotionContextValue = DeviceCapabilities & {
  userReduce: boolean;
  setUserReduce: (value: boolean) => void;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [userReduce, setUserReduceState] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });
  const [caps, setCaps] = useState<DeviceCapabilities>(() =>
    typeof window === "undefined"
      ? {
          reduceMotion: false,
          coarsePointer: false,
          saveData: false,
          slowNetwork: false,
          webgl: false,
          canHeavy: false,
        }
      : detectCapabilities(userReduce),
  );

  const setUserReduce = (value: boolean) => {
    setUserReduceState(value);
    window.localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  };

  useEffect(() => {
    const sync = () => setCaps(detectCapabilities(userReduce));
    sync();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, [userReduce]);

  useEffect(() => {
    document.documentElement.dataset.reduceMotion = caps.reduceMotion ? "true" : "false";
    document.documentElement.classList.toggle("reduce-motion", caps.reduceMotion);
  }, [caps.reduceMotion]);

  const value = useMemo(
    () => ({ ...caps, userReduce, setUserReduce }),
    [caps, userReduce],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error("useMotion must be used within MotionProvider");
  return ctx;
}
