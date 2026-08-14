export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: { question?: string; context?: string } = {};
  try {
    body = (await req.json()) as { question?: string; context?: string };
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const question = body.question?.slice(0, 800).trim();
  if (!question) return Response.json({ error: "Missing question" }, { status: 400 });

  const key = Netlify.env.get("OPENAI_API_KEY");
  const base = Netlify.env.get("OPENAI_BASE_URL");
  if (!key || !base) {
    return Response.json({ error: "gateway-unavailable" }, { status: 503 });
  }

  const response = await fetch(`${base.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 280,
      messages: [
        {
          role: "system",
          content:
            "You are a discreet specialist for Maison Horloge, a fictional Geneva watch maison used on this website. Answer only from the supplied catalogue brief. Never invent production specifications, prices, or calibres. If something is a teaching drawing (HO-01), say so. Keep answers under 120 words. Tone: quiet, precise, no slogans.",
        },
        { role: "user", content: `${body.context ?? ""}\n\nQuestion: ${question}` },
      ],
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "gateway-unavailable" }, { status: 503 });
  }

  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  return Response.json({ answer: data.choices?.[0]?.message?.content ?? "" });
};

export const config = {
  path: "/api/concierge",
};
