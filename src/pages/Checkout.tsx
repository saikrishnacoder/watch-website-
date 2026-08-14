import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { site } from "../config/site";
import { useCart, type CartLine } from "../context/CartContext";
import { useMoney } from "../context/CurrencyContext";
import { MagneticButton } from "../components/ui/MagneticButton";
import { WatchFace } from "../components/watch/WatchFace";
import { Caseback } from "../components/watch/Caseback";

type PayState = "form" | "success";

type Receipt = {
  order: string;
  name: string;
  wrap: boolean;
  engraving: string;
  note: string;
  lines: CartLine[];
  total: number;
};

export function Checkout() {
  const { checkoutLines, waitlistLines, checkoutTotal, clear } = useCart();
  const { formatPrice, region } = useMoney();
  const [state, setState] = useState<PayState>("form");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [wrap, setWrap] = useState(true);
  const [engraving, setEngraving] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const last4 = useMemo(() => digits(card).slice(-4).padStart(4, "•"), [card]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const number = digits(card);
    if (number.length < 16) {
      setError("Enter a 16-digit card number. For the preview, use 4242 4242 4242 4242.");
      return;
    }
    if (expiry.replace(/\D/g, "").length < 4) {
      setError("Enter expiry as MM/YY.");
      return;
    }
    if (cvc.length < 3) {
      setError("Enter a 3-digit CVC.");
      return;
    }
    setError("");
    const order = `HOR-PREVIEW-${Date.now().toString().slice(-8)}`;
    setReceipt({
      order,
      name,
      wrap,
      engraving: engraving.trim().toUpperCase(),
      note: note.trim(),
      lines: checkoutLines,
      total: checkoutTotal,
    });
    setState("success");
    clear();
  };

  if (checkoutLines.length === 0 && state === "form") {
    const waitlisted = waitlistLines.length > 0;
    return (
      <div className="page">
        <section className="page-hero">
          <div className="eyebrow">Checkout</div>
          <h1 className="display">{waitlisted ? "This reference is on waitlist." : "Your tray is empty."}</h1>
          <p className="lede">
            {waitlisted
              ? "Waitlist watches are not available for preview checkout. Enquire at a maison boutique."
              : "Add a watch from the catalogue, then return here to preview payment."}
          </p>
          <MagneticButton
            to={
              waitlisted
                ? `/boutique?watch=${waitlistLines[0].product.slug}`
                : "/collection"
            }
          >
            {waitlisted ? "Enquire in boutique" : "Browse 1,000 watches"}
          </MagneticButton>
        </section>
      </div>
    );
  }

  if (state === "success" && receipt) {
    return (
      <div className="page">
        <section className="page-hero checkout-success">
          <div className="eyebrow">Preview only</div>
          <h1 className="display">No charge was made.</h1>
          <p className="lede">
            Order {receipt.order} is a demonstration. {site.brand.name} does not process cards on this template. The
            tray has been cleared.
          </p>
        </section>
        <section className="section" style={{ paddingTop: 0 }}>
          <article className="extrait" id="extrait">
            <header>
              <span>{site.brand.seal}</span>
              <strong>Extrait de registre</strong>
            </header>
            <p className="extrait-motto">{site.brand.motto}</p>
            <dl>
              <div>
                <dt>Reference</dt>
                <dd>{receipt.order}</dd>
              </div>
              <div>
                <dt>Client</dt>
                <dd>{receipt.name || "—"}</dd>
              </div>
              <div>
                <dt>Atelier</dt>
                <dd>{site.brand.city}</dd>
              </div>
            </dl>
            <ul>
              {receipt.lines.map(({ product, qty }) => (
                <li key={product.slug}>
                  <strong>{product.name}</strong>
                  <span>
                    {product.reference} · ×{qty} · {formatPrice(product.price * qty)}
                  </span>
                </li>
              ))}
            </ul>
            {receipt.engraving && (
              <div className="extrait-engrave">
                <Caseback
                  metal={receipt.lines[0]?.product.design.caseMetal ?? "steel"}
                  reference={receipt.lines[0]?.product.reference ?? receipt.order}
                  engraving={receipt.engraving}
                  size={140}
                />
                <p>Caseback: {receipt.engraving}</p>
              </div>
            )}
            <p className="extrait-gifts">
              {receipt.wrap ? "Presented in the gilt maison box. " : ""}
              {receipt.note ? `Card: “${receipt.note}”. ` : ""}
              White-glove delivery or boutique collection.
            </p>
            <div className="extrait-total">
              <span>Total (preview)</span>
              <strong>{formatPrice(receipt.total)}</strong>
            </div>
            <footer>This leaf is a design preview. No payment was taken. {site.brand.signature}.</footer>
          </article>
          <div className="hero-actions" style={{ padding: "0 6% 48px" }}>
            <MagneticButton type="button" onClick={() => window.print()}>
              Print the extrait
            </MagneticButton>
            <MagneticButton variant="ghost" to="/collection">
              Return to the catalogue
            </MagneticButton>
            <MagneticButton variant="ghost" to="/boutique">
              Book a boutique instead
            </MagneticButton>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Preview checkout</div>
        <h1 className="display">Pay, without paying.</h1>
        <p className="lede">
          A maison payment screen for design review. Nothing is charged, stored, or sent. Use{" "}
          <strong>4242 4242 4242 4242</strong>, any future date, any CVC.
        </p>
      </section>
      <section className="section checkout" style={{ paddingTop: 0 }}>
        <form className="checkout-form" onSubmit={onSubmit} autoComplete="off">
          <div className="preview-ribbon">Preview — no payment is processed</div>
          <h2>Contact</h2>
          <div className="fields">
            <label className="field">
              <span>Full name</span>
              <input name="fullName" required placeholder="Name on the order" />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" name="email" required placeholder="you@atelier.example" />
            </label>
          </div>
          <h2>Delivery</h2>
          <div className="fields">
            <label className="field">
              <span>Method</span>
              <select name="method" defaultValue="boutique">
                <option value="boutique">Collect in boutique</option>
                <option value="ship">White-glove (preview)</option>
              </select>
            </label>
            <label className="field">
              <span>City</span>
              <select name="boutique" defaultValue={site.boutiques[0].city}>
                {site.boutiques.map((house) => (
                  <option key={house.city} value={house.city}>
                    {house.city}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <h2>Gift atelier</h2>
          <p className="form-note" style={{ marginTop: 0, marginBottom: 16 }}>
            Complimentary. Confirmed with the papers, never with a surcharge.
          </p>
          <label className="gift-check">
            <input type="checkbox" checked={wrap} onChange={(event) => setWrap(event.target.checked)} />
            Present in the gilt maison box
          </label>
          <div className="fields">
            <label className="field">
              <span>Caseback engraving</span>
              <input
                value={engraving}
                maxLength={12}
                placeholder="Initials, optional"
                onChange={(event) => setEngraving(event.target.value)}
              />
            </label>
            <label className="field">
              <span>Handwritten card</span>
              <input
                value={note}
                maxLength={80}
                placeholder="A short line for the tray"
                onChange={(event) => setNote(event.target.value)}
              />
            </label>
          </div>
          <h2>Payment</h2>
          <div className="pay-card" aria-hidden>
            <span>{site.brand.wordmark}</span>
            <strong>{formatCard(card) || "•••• •••• •••• ••••"}</strong>
            <div>
              <em>{name || "Name on card"}</em>
              <em>{formatExpiry(expiry) || "MM/YY"}</em>
            </div>
          </div>
          <div className="fields">
            <label className="field full">
              <span>Name on card</span>
              <input value={name} onChange={(event) => setName(event.target.value)} required placeholder="As printed" />
            </label>
            <label className="field full">
              <span>Card number</span>
              <input
                inputMode="numeric"
                autoComplete="off"
                value={formatCard(card)}
                onChange={(event) => setCard(digits(event.target.value).slice(0, 16))}
                placeholder="4242 4242 4242 4242"
                required
              />
            </label>
            <label className="field">
              <span>Expiry</span>
              <input
                inputMode="numeric"
                autoComplete="off"
                value={formatExpiry(expiry)}
                onChange={(event) => setExpiry(digits(event.target.value).slice(0, 4))}
                placeholder="MM/YY"
                required
              />
            </label>
            <label className="field">
              <span>CVC</span>
              <input
                inputMode="numeric"
                autoComplete="off"
                value={cvc}
                onChange={(event) => setCvc(digits(event.target.value).slice(0, 4))}
                placeholder="123"
                required
              />
            </label>
          </div>
          {error && <p className="form-note checkout-error">{error}</p>}
          <MagneticButton type="submit">Pay {formatPrice(checkoutTotal)} — preview</MagneticButton>
          <p className="form-note">
            Ending {last4}. Prices for the {region.city} maison, in {region.currency}. This form never leaves the
            browser. Prefer a viewing? <Link to="/boutique">Book a boutique</Link>.
          </p>
        </form>
        <aside className="checkout-summary">
          <h2>Tray</h2>
          {checkoutLines.map(({ product, qty }) => (
            <div className="checkout-line" key={product.slug}>
              <WatchFace {...product.design} brand={site.brand.name} size={72} animate={false} />
              <div>
                <strong>{product.name}</strong>
                <span>
                  {product.reference} · ×{qty}
                </span>
              </div>
              <em>{formatPrice(product.price * qty)}</em>
            </div>
          ))}
          {waitlistLines.length > 0 && (
            <div className="checkout-waitlist">
              <h3>Waitlist — boutique only</h3>
              {waitlistLines.map(({ product }) => (
                <div className="checkout-line" key={product.slug}>
                  <WatchFace {...product.design} brand={site.brand.name} size={72} animate={false} />
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.reference} · not for preview checkout</span>
                  </div>
                  <Link to={`/boutique?watch=${product.slug}`}>Boutique</Link>
                </div>
              ))}
            </div>
          )}
          <div className="checkout-gifts">
            {wrap && <span>Gilt box</span>}
            {engraving.trim() && <span>Engraved</span>}
            {note.trim() && <span>Handwritten card</span>}
            <span>White-glove or boutique</span>
          </div>
          <div className="checkout-total">
            <span>
              Total · {region.city} · {region.currency}
            </span>
            <strong>{formatPrice(checkoutTotal)}</strong>
          </div>
        </aside>
      </section>
    </div>
  );
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function formatCard(value: string) {
  return digits(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  const raw = digits(value).slice(0, 4);
  if (raw.length <= 2) return raw;
  return `${raw.slice(0, 2)}/${raw.slice(2)}`;
}
