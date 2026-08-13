import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const KEY = "horloge-cabinet";

type Cabinet = {
  wish: string[];
  compare: string[];
  recent: string[];
};

const empty: Cabinet = { wish: [], compare: [], recent: [] };

type CabinetContextValue = Cabinet & {
  toggleWish: (slug: string) => void;
  toggleCompare: (slug: string) => void;
  clearCompare: () => void;
  remember: (slug: string) => void;
  wished: (slug: string) => boolean;
  compared: (slug: string) => boolean;
};

const CabinetContext = createContext<CabinetContextValue | null>(null);

function read(): Cabinet {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

export function CabinetProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Cabinet>(empty);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(read());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const value = useMemo<CabinetContextValue>(
    () => ({
      ...state,
      toggleWish: (slug) =>
        setState((current) => ({
          ...current,
          wish: current.wish.includes(slug)
            ? current.wish.filter((item) => item !== slug)
            : [...current.wish, slug],
        })),
      toggleCompare: (slug) =>
        setState((current) => {
          if (current.compare.includes(slug)) {
            return { ...current, compare: current.compare.filter((item) => item !== slug) };
          }
          if (current.compare.length >= 3) return current;
          return { ...current, compare: [...current.compare, slug] };
        }),
      clearCompare: () => setState((current) => ({ ...current, compare: [] })),
      remember: (slug) =>
        setState((current) => {
          if (current.recent[0] === slug) return current;
          return {
            ...current,
            recent: [slug, ...current.recent.filter((item) => item !== slug)].slice(0, 6),
          };
        }),
      wished: (slug) => state.wish.includes(slug),
      compared: (slug) => state.compare.includes(slug),
    }),
    [state],
  );

  return <CabinetContext.Provider value={value}>{children}</CabinetContext.Provider>;
}

export function useCabinet() {
  const ctx = useContext(CabinetContext);
  if (!ctx) throw new Error("useCabinet must be used within CabinetProvider");
  return ctx;
}
