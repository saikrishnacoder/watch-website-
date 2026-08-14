export const CURRENCIES = [
  { code: "CHF", label: "CHF", locale: "de-CH", rate: 1, city: "Geneva" },
  { code: "EUR", label: "EUR", locale: "fr-FR", rate: 1.04, city: "Paris" },
  { code: "USD", label: "USD", locale: "en-US", rate: 1.12, city: "New York" },
  { code: "GBP", label: "GBP", locale: "en-GB", rate: 0.88, city: "London" },
  { code: "JPY", label: "JPY", locale: "ja-JP", rate: 185, city: "Tokyo" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export const REGIONS = [
  {
    id: "ch",
    name: "Switzerland",
    city: "Geneva",
    currency: "CHF",
    countries: ["CH"],
    zones: ["Europe/Zurich"],
  },
  {
    id: "eu",
    name: "Eurozone",
    city: "Paris",
    currency: "EUR",
    countries: ["AT", "BE", "CY", "DE", "EE", "ES", "FI", "FR", "GR", "HR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"],
    zones: [
      "Europe/Paris",
      "Europe/Berlin",
      "Europe/Rome",
      "Europe/Madrid",
      "Europe/Amsterdam",
      "Europe/Brussels",
      "Europe/Vienna",
      "Europe/Lisbon",
      "Europe/Dublin",
      "Europe/Athens",
    ],
  },
  {
    id: "uk",
    name: "United Kingdom",
    city: "London",
    currency: "GBP",
    countries: ["GB"],
    zones: ["Europe/London"],
  },
  {
    id: "us",
    name: "United States",
    city: "New York",
    currency: "USD",
    countries: ["US"],
    zones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Phoenix"],
  },
  {
    id: "jp",
    name: "Japan",
    city: "Tokyo",
    currency: "JPY",
    countries: ["JP"],
    zones: ["Asia/Tokyo"],
  },
] as const;

export type RegionId = (typeof REGIONS)[number]["id"];
export type Region = (typeof REGIONS)[number];
export type RegionSource = "user" | "geo" | "default";

export const DEFAULT_CURRENCY: CurrencyCode = "CHF";
export const DEFAULT_REGION: RegionId = "ch";
export const MONEY_KEY = "horloge-currency";
export const REGION_KEY = "horloge-region";
export const REGION_SOURCE_KEY = "horloge-region-source";

export function isCurrency(value: string): value is CurrencyCode {
  return CURRENCIES.some((item) => item.code === value);
}

export function isRegion(value: string): value is RegionId {
  return REGIONS.some((item) => item.id === value);
}

export function getRegion(id: RegionId = DEFAULT_REGION) {
  return REGIONS.find((item) => item.id === id) ?? REGIONS[0];
}

export function regionForCurrency(code: CurrencyCode) {
  return REGIONS.find((item) => item.currency === code) ?? REGIONS[0];
}

export function regionFromCountry(code: string) {
  const country = code.trim().toUpperCase();
  if (!country) return undefined;
  return REGIONS.find((item) => (item.countries as readonly string[]).includes(country));
}

export function regionFromZone(zone: string) {
  if (!zone) return undefined;
  return REGIONS.find((item) => (item.zones as readonly string[]).includes(zone));
}

export function formatMoney(amountChf: number, code: CurrencyCode = DEFAULT_CURRENCY) {
  const currency = CURRENCIES.find((item) => item.code === code) ?? CURRENCIES[0];
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(Math.round(amountChf * currency.rate));
}
