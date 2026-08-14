import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { getProduct, site } from "../../config/site";
import { useMoney } from "../../context/CurrencyContext";
import { boutiqueOpen, zonedNow } from "../../lib/boutiqueHours";
import { briefFromCatalogue, catalogueContext, conciergeSuggestions } from "../../lib/horology-brief";
import { OPEN_SPECIALIST, type SpecialistTab } from "../../lib/specialist";
import { MagneticButton } from "../ui/MagneticButton";

type Tab = SpecialistTab;
type ChatTurn = { role: "you" | "maison"; text: string; source?: "catalogue" | "model"; links?: { label: string; href: string }[] };

const CHAT_KEY = "horloge-concierge-chat";

function readChat(): ChatTurn[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(CHAT_KEY);
    return raw ? (JSON.parse(raw) as ChatTurn[]) : [];
  } catch {
    return [];
  }
}

export function Concierge() {
  const location = useLocation();
  const { region } = useMoney();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("ask");
  const [status, setStatus] = useState("");
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [chat, setChat] = useState<ChatTurn[]>(readChat);
  const slug = location.pathname.startsWith("/watch/") ? location.pathname.split("/")[2] : "";
  const watching = slug ? getProduct(slug) : undefined;
  const house = site.boutiques.find((item) => item.city === region.city) ?? site.boutiques[0];
  const openNow = boutiqueOpen(house);

  useEffect(() => {
    sessionStorage.setItem(CHAT_KEY, JSON.stringify(chat));
  }, [chat]);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const next = (event as CustomEvent<{ tab?: Tab }>).detail?.tab;
      setOpen(true);
      setTab(next === "write" ? "write" : "ask");
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener(OPEN_SPECIALIST, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_SPECIALIST, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams();
    data.forEach((value, key) => params.append(key, String(value)));
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    setStatus("A specialist will write within one working day.");
    form.reset();
  };

  const ask = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    setBusy(true);
    setQuestion("");
    setChat((current) => [...current, { role: "you", text: q }]);
    const local = briefFromCatalogue(q, watching);
    try {
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, context: catalogueContext(watching) }),
      });
      if (response.ok) {
        const data = (await response.json()) as { answer?: string };
        if (data.answer) {
          setChat((current) => [
            ...current,
            { role: "maison", text: data.answer ?? "", source: "model", links: local.links },
          ]);
          setBusy(false);
          return;
        }
      }
    } catch {
      /* catalogue brief is the public fallback */
    }
    setChat((current) => [...current, { role: "maison", text: local.answer, source: "catalogue", links: local.links }]);
    setBusy(false);
  };

  return (
    <>
      <button
        type="button"
        className={`concierge-fab ${open ? "is-on" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="concierge-panel"
        aria-label={open ? "Close concierge" : "HORLOGE Concierge"}
      >
        {open ? "Close" : "Concierge"}
      </button>
      {open && (
        <aside id="concierge-panel" className="concierge-panel" role="dialog" aria-labelledby="concierge-title">
          <div className="eyebrow">HORLOGE Concierge</div>
          <h2 id="concierge-title">A quiet word.</h2>
          <p className={`specialist-live ${openNow ? "is-open" : ""}`}>
            {openNow
              ? `${house.city} is open now · ${zonedNow(house.zone).clock}`
              : `${house.city} is by appointment · a specialist writes within one working day`}
          </p>
          <div className="concierge-tabs">
            <button type="button" className={tab === "ask" ? "is-on" : ""} onClick={() => setTab("ask")}>
              Ask
            </button>
            <button type="button" className={tab === "write" ? "is-on" : ""} onClick={() => setTab("write")}>
              Write
            </button>
          </div>
          {tab === "ask" ? (
            <div className="concierge-ask">
              <p>
                Ask the catalogue
                {watching ? ` — you are looking at ${watching.name}` : ""}. If an atelier model is available it will
                answer; otherwise this page reads the maison itself. For a human specialist, write.
              </p>
              <div className="concierge-log">
                {chat.map((turn, index) => (
                  <div key={`${turn.role}-${index}`} className={`concierge-turn is-${turn.role}`}>
                    <p>{turn.text}</p>
                    {turn.source === "catalogue" ? <span>Catalogue brief</span> : null}
                    {turn.source === "model" ? <span>Atelier model</span> : null}
                    {turn.links?.map((link) => (
                      <Link key={link.href} to={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="concierge-suggestions">
                {conciergeSuggestions.map((item) => (
                  <button key={item} type="button" onClick={() => void ask(item)}>
                    {item}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void ask(question);
                }}
              >
                <label className="field">
                  <span>Ask</span>
                  <input
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="The meridian, a line, a boutique…"
                  />
                </label>
                <MagneticButton type="submit">{busy ? "Looking…" : "Ask"}</MagneticButton>
              </form>
            </div>
          ) : status ? (
            <p className="form-note">{status}</p>
          ) : (
            <form name="advisor" method="POST" data-netlify="true" onSubmit={onSubmit}>
              <input type="hidden" name="form-name" value="advisor" />
              <p hidden>
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>
              <label className="field">
                <span>Name</span>
                <input name="name" required placeholder="Full name" />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" name="email" required placeholder="you@atelier.example" />
              </label>
              <label className="field">
                <span>Maison</span>
                <select key={house.city} name="boutique" defaultValue={house.city}>
                  {site.boutiques.map((item) => (
                    <option key={item.city} value={item.city}>
                      {item.city}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Note</span>
                <textarea
                  name="message"
                  required
                  defaultValue={
                    watching ? `I would like advice on ${watching.name} (${watching.reference}).` : ""
                  }
                  placeholder="How may we help?"
                />
              </label>
              <input type="hidden" name="watch" value={watching?.slug ?? ""} />
              <MagneticButton type="submit">Write to a specialist</MagneticButton>
            </form>
          )}
          <Link className="section-link" to="/boutique">
            Or book a viewing
          </Link>
        </aside>
      )}
    </>
  );
}
