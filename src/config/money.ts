export const CURRENCIES = [
  { code: "CHF", label: "CHF", locale: "de-CH", rate: 1, city: "Geneva" },
  { code: "EUR", label: "EUR", locale: "fr-FR", rate: 1.04, city: "Paris" },
  { code: "USD", label: "USD", locale: "en-US", rate: 1.12, city: "New York" },
  { code: "GBP", label: "GBP", locale: "en-GB", rate: 0.88, city: "London" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export const DEFAULT_CURRENCY: CurrencyCode = "CHF";
export const MONEY_KEY = "horloge-currency";

export function isCurrency(value: string): value is CurrencyCode {
  return CURRENCIES.some((item) => item.code === value);
}

export function formatMoney(amountChf: number, code: CurrencyCode = DEFAULT_CURRENCY) {
  const currency = CURRENCIES.find((item) => item.code === code) ?? CURRENCIES[0];
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(Math.round(amountChf * currency.rate));
}
