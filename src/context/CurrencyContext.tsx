import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  CURRENCIES,
  DEFAULT_CURRENCY,
  MONEY_KEY,
  formatMoney,
  isCurrency,
  type CurrencyCode,
} from "../config/money";

type CurrencyContextValue = {
  code: CurrencyCode;
  setCode: (code: CurrencyCode) => void;
  formatPrice: (amountChf: number) => string;
  currencies: typeof CURRENCIES;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function readCurrency(): CurrencyCode {
  if (typeof window === "undefined") return DEFAULT_CURRENCY;
  const stored = window.localStorage.getItem(MONEY_KEY);
  return stored && isCurrency(stored) ? stored : DEFAULT_CURRENCY;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCodeState] = useState<CurrencyCode>(readCurrency);

  const setCode = useCallback((next: CurrencyCode) => {
    setCodeState(next);
    window.localStorage.setItem(MONEY_KEY, next);
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      code,
      setCode,
      formatPrice: (amountChf: number) => formatMoney(amountChf, code),
      currencies: CURRENCIES,
    }),
    [code, setCode],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useMoney() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useMoney must be used within CurrencyProvider");
  return ctx;
}
