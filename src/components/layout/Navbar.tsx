import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { AtelierClock } from "./AtelierClock";
import { BrandMark } from "../brand/BrandMark";
import { RegionSwitch } from "./RegionSwitch";
import { site } from "../../config/site";
import { useCabinet } from "../../context/CabinetContext";
import { useCart } from "../../context/CartContext";
import { useMotion } from "../../context/MotionContext";
import { useTheme } from "../../context/ThemeContext";
import { useUI } from "../../context/UIContext";

export function Navbar() {
  const { count } = useCart();
  const { wish } = useCabinet();
  const { setCartOpen, setSearchOpen, menuOpen, setMenuOpen } = useUI();
  const { reduceMotion, userReduce, setUserReduce } = useMotion();
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setMega(false);
  }, [location.pathname, setMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > last && y > 160 && !mega);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mega]);

  return (
    <>
      <div className="utility-bar">
        <span>
          {site.brand.seal}
          <AtelierClock />
        </span>
        <div>
          <RegionSwitch />
          <NavLink to="/finder">Watch Finder</NavLink>
          <NavLink to="/heritage">Heritage</NavLink>
          <button
            type="button"
            className="motion-toggle"
            onClick={toggleTheme}
            aria-pressed={theme === "ivoire"}
          >
            {theme === "ivoire" ? "Ivoire" : "Encre"}
          </button>
          <button
            type="button"
            className="motion-toggle"
            onClick={() => setUserReduce(!userReduce)}
            aria-pressed={reduceMotion}
          >
            {reduceMotion ? "Motion off" : "Motion on"}
          </button>
        </div>
      </div>
      <header
        className={`nav ${scrolled || mega ? "is-scrolled" : ""} ${hidden && !menuOpen ? "is-hidden" : ""} ${menuOpen ? "is-open" : ""}`}
        onMouseLeave={() => setMega(false)}
      >
        <BrandMark />
        <ul className="nav-links">
          <li>
            <NavLink
              to="/collection"
              className={mega ? "active" : ""}
              onMouseEnter={() => setMega(true)}
            >
              Watches
            </NavLink>
          </li>
          <li>
            <NavLink to="/finder">Watch Finder</NavLink>
          </li>
          <li>
            <NavLink to="/maison">World of {site.brand.name}</NavLink>
          </li>
          <li>
            <NavLink to="/boutique">Boutiques</NavLink>
          </li>
        </ul>
        <div className="nav-actions">
          <NavLink to="/wishlist" className="icon-btn" aria-label="Wishlist">
            ♥{wish.length > 0 && <span className="cart-count">{wish.length}</span>}
          </NavLink>
          <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </button>
          <button className="icon-btn" aria-label="Cart" onClick={() => setCartOpen(true)}>
            <BagIcon />
            {count > 0 && <span className="cart-count">{count}</span>}
          </button>
          <button
            className="burger"
            aria-label={menuOpen ? "Close menu" : "Menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
        {mega && (
          <div className="mega">
            {site.collectionLines.map((line) => (
              <NavLink key={line.slug} to={`/collection/${line.slug}`} className="mega-card">
                <img src={line.image} alt="" />
                <div>
                  <strong>{line.name}</strong>
                  <span>{line.tagline}</span>
                </div>
              </NavLink>
            ))}
            <div className="mega-links">
              <NavLink to="/collection">All watches</NavLink>
              <NavLink to="/finder">Watch Finder</NavLink>
              <NavLink to="/find">Find your watch</NavLink>
              <NavLink to="/compare">Compare</NavLink>
              <NavLink to="/journal">Journal</NavLink>
              <NavLink to="/maison">The maison</NavLink>
              <NavLink to="/heritage">Heritage</NavLink>
              <NavLink to="/atelier">Atelier</NavLink>
              <NavLink to="/compose">Composer</NavLink>
              <NavLink to="/cabinet">Cabinet</NavLink>
              <NavLink to="/contact">Speak to a specialist</NavLink>
              <NavLink to="/motion">Kinetic atelier</NavLink>
            </div>
          </div>
        )}
      </header>
      {menuOpen && (
        <nav className="mobile-menu" id="mobile-menu">
          <button type="button" className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
            Close
          </button>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          {site.collectionLines.map((line) => (
            <NavLink key={line.slug} to={`/collection/${line.slug}`} onClick={() => setMenuOpen(false)}>
              {line.name}
            </NavLink>
          ))}
          <NavLink to="/finder" onClick={() => setMenuOpen(false)}>
            Watch Finder
          </NavLink>
          <NavLink to="/maison" onClick={() => setMenuOpen(false)}>
            The maison
          </NavLink>
          <NavLink to="/heritage" onClick={() => setMenuOpen(false)}>
            Heritage
          </NavLink>
          <NavLink to="/atelier" onClick={() => setMenuOpen(false)}>
            Atelier
          </NavLink>
          <NavLink to="/motion" onClick={() => setMenuOpen(false)}>
            Kinetic atelier
          </NavLink>
          <NavLink to="/journal" onClick={() => setMenuOpen(false)}>
            Journal
          </NavLink>
          <NavLink to="/services" onClick={() => setMenuOpen(false)}>
            Services
          </NavLink>
          <NavLink to="/cabinet" onClick={() => setMenuOpen(false)}>
            Cabinet
          </NavLink>
          <NavLink to="/compose" onClick={() => setMenuOpen(false)}>
            Composer
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            Speak to a specialist
          </NavLink>
          <NavLink to="/boutique" onClick={() => setMenuOpen(false)}>
            Boutiques
          </NavLink>
          <NavLink to="/checkout" onClick={() => setMenuOpen(false)}>
            Checkout preview
          </NavLink>
          <NavLink to="/privacy" onClick={() => setMenuOpen(false)}>
            Privacy
          </NavLink>
          <RegionSwitch compact />
          <button type="button" className="motion-toggle" onClick={toggleTheme}>
            {theme === "ivoire" ? "Paper · Ivoire" : "Night · Encre"}
          </button>
        </nav>
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l5 5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </svg>
  );
}
