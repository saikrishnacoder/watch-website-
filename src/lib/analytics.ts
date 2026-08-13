type AnalyticsDetail = Record<string, string | number | boolean | undefined>;

export function track(name: string, detail: AnalyticsDetail = {}) {
  const payload = { event: name, ...detail, t: Date.now() };
  window.dispatchEvent(new CustomEvent("horloge:analytics", { detail: payload }));
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) dataLayer.push(payload);
}
