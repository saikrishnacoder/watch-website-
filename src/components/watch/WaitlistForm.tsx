import { useState, type FormEvent } from "react";
import { MagneticButton } from "../ui/MagneticButton";
import type { Product } from "../../config/site";
import { useUI } from "../../context/UIContext";
import { tapFeel } from "../../lib/feel";

export function WaitlistForm({ product }: { product: Product }) {
  const [status, setStatus] = useState("");
  const { setToast } = useUI();
  const limited = Boolean(product.limited);
  const waitlisted = product.availability === "Waitlist";

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
    const note = limited
      ? "You are on the atelier list. We write when a numbered piece can be seen."
      : "You are on the maison waitlist. We write when a piece is released.";
    tapFeel();
    setStatus(note);
    setToast(note);
    form.reset();
  };

  return (
    <form className="waitlist-form" name="waitlist" method="POST" data-netlify="true" onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value="waitlist" />
      <input type="hidden" name="watch" value={product.slug} />
      <input type="hidden" name="edition" value={limited ? "atelier" : "waitlist"} />
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>
      <p className="waitlist-copy">
        {limited && waitlisted
          ? `${product.badge ?? "Atelier edition"}. Numbered, and currently waitlisted. Leave your name — we write when a tray is free.`
          : limited
            ? `${product.badge ?? "Atelier edition"}. When the edition is spoken for, the reference closes. Join the list to be written first.`
            : "This reference is not on the open tray. Join the waitlist and we write when a piece can be seen."}
      </p>
      <div className="fields">
        <label className="field">
          <input name="name" required placeholder="Full name" />
        </label>
        <label className="field">
          <input type="email" name="email" required placeholder="Email" />
        </label>
      </div>
      <MagneticButton type="submit">{limited ? "Join the atelier list" : "Join the waitlist"}</MagneticButton>
      {status && <p className="form-note">{status}</p>}
    </form>
  );
}
