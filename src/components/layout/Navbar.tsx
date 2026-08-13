import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { site } from "../../config/site";
import { useCart } from "../../context/CartContext";
import { useUI } from "../../context/UIContext";

export function Navbar() {
  const { count } = useCart();
  const { setCartOpen, setSearchOpen, menuOpen, setMenuOpen } = useUI();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, setMenuOpen]);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""} ${hidden && !menuOpen ? "is-hidden" : ""}`}>
        <NavLink to="/" className="logo">
          {site.brand.wordmark}
        </NavLink>
        <ul className="nav-links">
          {site.nav.map((item) => (
            <li key={item.href}>
              <NavLink to={item.href}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </button>
          <button className="icon-btn" aria-label="Cart" onClick={() => setCartOpen(true)}>
            <BagIcon />
            {count > 0 && <span className="cart-count">{count}</span>}
          </button>
          <button className="burger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
            <span />
          </button>
        </div>
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      </header>
      {menuOpen && (
        <nav className="mobile-menu">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          {site.nav.map((item) => (
            <NavLink key={item.href} to={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
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
