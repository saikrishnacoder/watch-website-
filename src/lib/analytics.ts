import { CONSENT_KEY, readConsent } from "./consent";

type AnalyticsDetail = Record<string, string | number | boolean | undefined>;

export function track(name: string, detail: AnalyticsDetail = {}) {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(CONSENT_KEY) !== "all") return;
  const payload = { event: name, ...detail, t: Date.now() };
  window.dispatchEvent(new CustomEvent("horloge:analytics", { detail: payload }));
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) dataLayer.push(payload);
}

export function hasAnalyticsConsent() {
  return readConsent() === "all";
}
