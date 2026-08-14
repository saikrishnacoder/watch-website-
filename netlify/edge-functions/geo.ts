type GeoContext = {
  geo?: {
    city?: string;
    timezone?: string;
    country?: { code?: string };
  };
};

export default async (_req: Request, context: GeoContext) => {
  const geo = context.geo ?? {};
  return Response.json(
    {
      country: geo.country?.code ?? "",
      city: geo.city ?? "",
      timezone: geo.timezone ?? "",
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300",
        "Content-Type": "application/json",
      },
    },
  );
};

export const config = {
  path: "/api/geo",
};
