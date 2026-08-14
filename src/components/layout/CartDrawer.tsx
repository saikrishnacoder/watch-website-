import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { useCart } from "../../context/CartContext";
import { useMoney } from "../../context/CurrencyContext";
import { useUI } from "../../context/UIContext";
import { MagneticButton } from "../ui/MagneticButton";
import { WatchFace } from "../watch/WatchFace";

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUI();
  const { lines, checkoutLines, waitlistLines, total, setQty, remove } = useCart();
  const { formatPrice } = useMoney();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <header>
              <h2 id="cart-title">Your selection</h2>
              <button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close cart">
                ×
              </button>
            </header>
            {lines.length === 0 ? (
              <p className="empty">Your tray is empty. The collection is waiting.</p>
            ) : (
              <div>
                {lines.map(({ product, qty }) => (
                  <div className="cart-line" key={product.slug}>
                    <WatchFace {...product.design} brand={site.brand.name} size={88} animate={false} />
                    <div>
                      <h3>{product.name}</h3>
                      <p>{formatPrice(product.price)}</p>
                      {product.availability === "Waitlist" ? (
                        <p className="form-note">Waitlist — boutique only</p>
                      ) : (
                        <div className="qty">
                          <button onClick={() => setQty(product.slug, qty - 1)}>-</button>
                          <span>{qty}</span>
                          <button onClick={() => setQty(product.slug, qty + 1)}>+</button>
                        </div>
                      )}
                    </div>
                    <button className="icon-btn" onClick={() => remove(product.slug)} aria-label="Remove">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="drawer-foot">
              <div className="total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              {checkoutLines.length > 0 ? (
                <MagneticButton to="/checkout" onClick={() => setCartOpen(false)}>
                  Checkout preview
                </MagneticButton>
              ) : lines.length > 0 ? (
                <MagneticButton
                  to={`/boutique${waitlistLines[0] ? `?watch=${waitlistLines[0].product.slug}` : ""}`}
                  onClick={() => setCartOpen(false)}
                >
                  Reserve in boutique
                </MagneticButton>
              ) : (
                <MagneticButton to="/collection" onClick={() => setCartOpen(false)}>
                  Browse collection
                </MagneticButton>
              )}
              <div style={{ height: 10 }} />
              {checkoutLines.length > 0 && (
                <MagneticButton variant="ghost" to="/boutique" onClick={() => setCartOpen(false)}>
                  Reserve in boutique
                </MagneticButton>
              )}
              <p className="form-note">
                Reservations are confirmed by your nearest maison.{" "}
                <Link to="/boutique" onClick={() => setCartOpen(false)}>
                  Book a viewing
                </Link>
                .
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
