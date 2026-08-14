export type ConsentLevel = "unset" | "essential" | "all";

export const CONSENT_KEY = "horloge-consent";

const DEVICE_KEYS = [
  CONSENT_KEY,
  "horloge-theme",
  "horloge-currency",
  "horloge-region",
  "horloge-region-source",
  "horloge-reduce-motion",
  "horloge-cabinet",
];

export function readConsent(): ConsentLevel {
  if (typeof window === "undefined") return "unset";
  const value = window.localStorage.getItem(CONSENT_KEY);
  if (value === "essential" || value === "all") return value;
  return "unset";
}

export function writeConsent(level: Exclude<ConsentLevel, "unset">) {
  window.localStorage.setItem(CONSENT_KEY, level);
  window.dispatchEvent(new CustomEvent("horloge:consent", { detail: { level } }));
}

/** Removes maison data stored in this browser. Hosting logs and form inboxes are not affected. */
export function clearDeviceStores() {
  if (typeof window === "undefined") return;
  for (const key of DEVICE_KEYS) window.localStorage.removeItem(key);
  window.sessionStorage.removeItem("horloge-intro");
  window.dispatchEvent(new CustomEvent("horloge:consent", { detail: { level: "unset" } }));
}
