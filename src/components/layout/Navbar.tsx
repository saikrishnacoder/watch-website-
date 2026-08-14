import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { BrandMark } from "../brand/BrandMark";
import { site } from "../../config/site";
import { useUI } from "../../context/UIContext";

export function Navbar() {
  const { menuOpen, setMenuOpen } = useUI();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const location = useLocation();
  const overHero = location.pathname === "/" && !scrolled && !menuOpen;

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
      <header
        className={`nav ${scrolled || mega ? "is-scrolled" : ""} ${hidden && !menuOpen ? "is-hidden" : ""} ${menuOpen ? "is-open" : ""} ${overHero ? "is-over-hero" : ""}`}
        onMouseLeave={() => setMega(false)}
      >
        <BrandMark />
        <ul className="nav-links">
          {site.nav.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={item.href === "/collection" && mega ? "active" : undefined}
                onMouseEnter={() => setMega(item.href === "/collection")}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
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
          </div>
        )}
      </header>
      {menuOpen && (
        <nav className="mobile-menu" id="mobile-menu">
          <button type="button" className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
            Close
          </button>
          {site.nav.map((item) => (
            <NavLink key={item.href} to={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          {site.collectionLines.map((line) => (
            <NavLink key={line.slug} to={`/collection/${line.slug}`} onClick={() => setMenuOpen(false)}>
              {line.name}
            </NavLink>
          ))}
        </nav>
      )}
    </>
  );
}
