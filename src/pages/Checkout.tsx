import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { formatPrice, site } from "../config/site";
import { useCart } from "../context/CartContext";
import { MagneticButton } from "../components/ui/MagneticButton";
import { WatchFace } from "../components/watch/WatchFace";

type PayState = "form" | "success";

export function Checkout() {
  const { lines, total, clear } = useCart();
  const [state, setState] = useState<PayState>("form");
  const [order, setOrder] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
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
    setOrder(`HOR-PREVIEW-${Date.now().toString().slice(-8)}`);
    setState("success");
    clear();
  };

  if (lines.length === 0 && state === "form") {
    return (
      <div className="page">
        <section className="page-hero">
          <div className="eyebrow">Checkout</div>
          <h1 className="display">Your tray is empty.</h1>
          <p className="lede">Add a watch from the catalogue, then return here to preview payment.</p>
          <MagneticButton to="/collection">Browse 1,000 watches</MagneticButton>
        </section>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="page">
        <section className="page-hero checkout-success">
          <div className="eyebrow">Preview only</div>
          <h1 className="display">No charge was made.</h1>
          <p className="lede">
            Order {order} is a demonstration. {site.brand.name} does not process cards on this template. The tray has
            been cleared.
          </p>
          <div className="hero-actions">
            <MagneticButton to="/collection">Return to the catalogue</MagneticButton>
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
                <option value="ship">Ship (preview)</option>
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
          <h2>Payment</h2>
          <div className="pay-card" aria-hidden>
            <span>{site.brand.wordmark}</span>
            <strong>{formatCard(card) || "•••• •••• •••• ••••"}</strong>
            <div>
              <em>{name || "Name on card"}</em>
              <em>{expiry || "MM/YY"}</em>
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
          <MagneticButton type="submit">Pay {formatPrice(total)} — preview</MagneticButton>
          <p className="form-note">
            Ending {last4}. This form never leaves the browser. Prefer a viewing?{" "}
            <Link to="/boutique">Book a boutique</Link>.
          </p>
        </form>
        <aside className="checkout-summary">
          <h2>Tray</h2>
          {lines.map(({ product, qty }) => (
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
          <div className="checkout-total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
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
