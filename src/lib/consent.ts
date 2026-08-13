export type ConsentLevel = "unset" | "essential" | "all";

export const CONSENT_KEY = "horloge-consent";

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
