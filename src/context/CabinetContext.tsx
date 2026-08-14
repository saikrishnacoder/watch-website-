import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Composition } from "../lib/composition";

const KEY = "horloge-cabinet";

export type RegisteredPiece = {
  id: string;
  reference: string;
  serial: string;
  owner: string;
  registeredAt: string;
};

export type SavedComposition = Composition & { savedAt: string };

type Cabinet = {
  wish: string[];
  compare: string[];
  recent: string[];
  pieces: RegisteredPiece[];
  compositions: SavedComposition[];
};

const empty: Cabinet = { wish: [], compare: [], recent: [], pieces: [], compositions: [] };

type CabinetContextValue = Cabinet & {
  toggleWish: (slug: string) => void;
  toggleCompare: (slug: string) => void;
  clearCompare: () => void;
  remember: (slug: string) => void;
  wished: (slug: string) => boolean;
  compared: (slug: string) => boolean;
  registerPiece: (piece: Omit<RegisteredPiece, "id" | "registeredAt">) => void;
  removePiece: (id: string) => void;
  saveComposition: (composition: Composition) => void;
  removeComposition: (savedAt: string) => void;
};

const CabinetContext = createContext<CabinetContextValue | null>(null);

function read(): Cabinet {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Cabinet>;
    return {
      ...empty,
      ...parsed,
      pieces: parsed.pieces ?? [],
      compositions: parsed.compositions ?? [],
    };
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
      registerPiece: (piece) =>
        setState((current) => ({
          ...current,
          pieces: [
            {
              ...piece,
              id: `${piece.reference}-${piece.serial}-${Date.now()}`,
              registeredAt: new Date().toISOString(),
            },
            ...current.pieces,
          ].slice(0, 24),
        })),
      removePiece: (id) =>
        setState((current) => ({ ...current, pieces: current.pieces.filter((item) => item.id !== id) })),
      saveComposition: (composition) =>
        setState((current) => ({
          ...current,
          compositions: [{ ...composition, savedAt: new Date().toISOString() }, ...current.compositions].slice(0, 12),
        })),
      removeComposition: (savedAt) =>
        setState((current) => ({
          ...current,
          compositions: current.compositions.filter((item) => item.savedAt !== savedAt),
        })),
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
