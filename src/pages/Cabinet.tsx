import { Link } from "react-router-dom";
import { getProduct } from "../config/site";
import { useCabinet } from "../context/CabinetContext";
import { compositionCode, compositionQuery } from "../lib/composition";
import { ProductCard } from "../components/ui/ProductCard";
import { MagneticButton } from "../components/ui/MagneticButton";
import { WatchFace } from "../components/watch/WatchFace";

export function Cabinet() {
  const { wish, pieces, compositions, recent, removePiece, removeComposition } = useCabinet();
  const saved = wish.map((slug) => getProduct(slug)).filter(Boolean);
  const viewed = recent.map((slug) => getProduct(slug)).filter(Boolean);

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Collector cabinet</div>
        <h1 className="display">Your watches, on this device.</h1>
        <p className="lede">
          A preview of owner care — wishlist, registered pieces and study compositions. Nothing here is an account.
          Erase it from the privacy page when you leave the machine.
        </p>
        <MagneticButton to="/services">Register a timepiece</MagneticButton>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <div className="eyebrow">Registered</div>
            <h2 className="display">On the maison record</h2>
          </div>
        </div>
        {pieces.length === 0 ? (
          <p className="empty">No pieces registered on this device yet.</p>
        ) : (
          <ul className="cabinet-list">
            {pieces.map((piece) => (
              <li key={piece.id} className="cabinet-card">
                <div className="eyebrow">{piece.reference}</div>
                <h3>{piece.serial}</h3>
                <p>
                  {piece.owner} · {new Date(piece.registeredAt).toLocaleDateString()}
                </p>
                <p className="studio-note">Service history will live here once Geneva replies. This row is local.</p>
                <button type="button" className="inspect-dismiss" onClick={() => removePiece(piece.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Compositions</div>
            <h2 className="display">Studies you saved</h2>
          </div>
          <Link className="section-link" to="/compose">
            Compose another
          </Link>
        </div>
        {compositions.length === 0 ? (
          <p className="empty">No study compositions yet.</p>
        ) : (
          <div className="cabinet-compose-grid">
            {compositions.map((item) => (
              <figure key={item.savedAt} className="cabinet-card">
                <WatchFace
                  caseMetal={item.caseMetal}
                  dial={item.dial}
                  dialText={item.dial.startsWith("#1") || item.dial.startsWith("#6") ? "#f4efe6" : "#1a1814"}
                  markers={item.markers}
                  hands={item.hands}
                  bezel={item.bezel}
                  strap={item.strap}
                  strapColor={item.strapColor}
                  size={180}
                  animate={false}
                />
                <figcaption>
                  <strong>{compositionCode(item)}</strong>
                  <p>
                    {item.dialLabel} · {item.strapLabel}
                  </p>
                  <Link to={`/compose?${compositionQuery(item)}`}>Open</Link>
                  <button type="button" className="inspect-dismiss" onClick={() => removeComposition(item.savedAt)}>
                    Remove
                  </button>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Wishlist</div>
            <h2 className="display">Set aside</h2>
          </div>
          <Link className="section-link" to="/wishlist">
            Full list
          </Link>
        </div>
        {saved.length === 0 ? (
          <p className="empty">The list is empty.</p>
        ) : (
          <div className="product-grid">
            {saved.map((product, index) => (
              <ProductCard key={product!.slug} product={product!} index={index} />
            ))}
          </div>
        )}
      </section>

      {viewed.length > 0 ? (
        <section className="section">
          <div className="section-head">
            <div>
              <div className="eyebrow">Recently viewed</div>
              <h2 className="display">Returned to</h2>
            </div>
          </div>
          <div className="product-grid">
            {viewed.map((product, index) => (
              <ProductCard key={product!.slug} product={product!} index={index} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
