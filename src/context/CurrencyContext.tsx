import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CURRENCIES,
  DEFAULT_REGION,
  MONEY_KEY,
  REGION_KEY,
  REGION_SOURCE_KEY,
  formatMoney,
  getRegion,
  isCurrency,
  isRegion,
  regionForCurrency,
  type CurrencyCode,
  type Region,
  type RegionId,
  type RegionSource,
} from "../config/money";
import { detectRegion } from "../lib/geo";

type CurrencyContextValue = {
  code: CurrencyCode;
  region: Region;
  source: RegionSource;
  setCode: (code: CurrencyCode) => void;
  setRegion: (id: RegionId, source?: RegionSource) => void;
  formatPrice: (amountChf: number) => string;
  currencies: typeof CURRENCIES;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function readStoredRegion(): { id: RegionId; source: RegionSource } {
  if (typeof window === "undefined") return { id: DEFAULT_REGION, source: "default" };
  const storedRegion = window.localStorage.getItem(REGION_KEY);
  const storedSource = window.localStorage.getItem(REGION_SOURCE_KEY);
  if (storedRegion && isRegion(storedRegion)) {
    return { id: storedRegion, source: storedSource === "geo" || storedSource === "user" ? storedSource : "user" };
  }
  const storedCurrency = window.localStorage.getItem(MONEY_KEY);
  if (storedCurrency && isCurrency(storedCurrency)) {
    return { id: regionForCurrency(storedCurrency).id, source: "user" };
  }
  return { id: DEFAULT_REGION, source: "default" };
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const initial = readStoredRegion();
  const [regionId, setRegionId] = useState<RegionId>(initial.id);
  const [source, setSource] = useState<RegionSource>(initial.source);

  const persist = useCallback((id: RegionId, nextSource: RegionSource) => {
    const next = getRegion(id);
    setRegionId(next.id);
    setSource(nextSource);
    window.localStorage.setItem(REGION_KEY, next.id);
    window.localStorage.setItem(REGION_SOURCE_KEY, nextSource);
    window.localStorage.setItem(MONEY_KEY, next.currency);
  }, []);

  const setRegion = useCallback(
    (id: RegionId, nextSource: RegionSource = "user") => {
      persist(id, nextSource);
    },
    [persist],
  );

  const setCode = useCallback(
    (code: CurrencyCode) => {
      persist(regionForCurrency(code).id, "user");
    },
    [persist],
  );

  useEffect(() => {
    if (source !== "default") return;
    let cancelled = false;
    void detectRegion().then((guess) => {
      if (cancelled || !guess) return;
      persist(guess.id, "geo");
    });
    return () => {
      cancelled = true;
    };
  }, [persist, source]);

  const region = getRegion(regionId);
  const code = region.currency;

  const value = useMemo<CurrencyContextValue>(
    () => ({
      code,
      region,
      source,
      setCode,
      setRegion,
      formatPrice: (amountChf: number) => formatMoney(amountChf, code),
      currencies: CURRENCIES,
    }),
    [code, region, source, setCode, setRegion],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useMoney() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useMoney must be used within CurrencyProvider");
  return ctx;
}
