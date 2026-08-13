import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readConsent, writeConsent, type ConsentLevel } from "../lib/consent";

type ConsentContextValue = {
  consent: ConsentLevel;
  allowAnalytics: boolean;
  acceptAll: () => void;
  essentialOnly: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentLevel>(() => readConsent());

  useEffect(() => {
    const onChange = () => setConsent(readConsent());
    window.addEventListener("horloge:consent", onChange);
    return () => window.removeEventListener("horloge:consent", onChange);
  }, []);

  const value = useMemo(
    () => ({
      consent,
      allowAnalytics: consent === "all",
      acceptAll: () => {
        writeConsent("all");
        setConsent("all");
      },
      essentialOnly: () => {
        writeConsent("essential");
        setConsent("essential");
      },
    }),
    [consent],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
