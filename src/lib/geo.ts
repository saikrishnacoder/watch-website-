import { regionFromCountry, regionFromZone, type Region } from "../config/money";

type GeoPayload = {
  country?: string;
  city?: string;
  timezone?: string;
};

export async function detectRegion(): Promise<Region | undefined> {
  const fromEdge = await readGeoEndpoint();
  const byCountry = regionFromCountry(fromEdge?.country ?? "");
  if (byCountry) return byCountry;

  const zone =
    fromEdge?.timezone ||
    (typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "");
  return regionFromZone(zone);
}

async function readGeoEndpoint(): Promise<GeoPayload | undefined> {
  try {
    const response = await fetch("/api/geo", { headers: { Accept: "application/json" } });
    if (!response.ok) return undefined;
    return (await response.json()) as GeoPayload;
  } catch {
    return undefined;
  }
}
