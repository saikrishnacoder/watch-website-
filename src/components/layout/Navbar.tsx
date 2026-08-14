import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { BrandMark } from "../brand/BrandMark";
import { site } from "../../config/site";
import { useUI } from "../../context/UIContext";

export function Navbar() {
  const { menuOpen, setMenuOpen } = useUI();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const location = useLocation();
  const closeTimer = useRef(0);
  const overHero = location.pathname === "/" && !scrolled && !menuOpen && !mega;

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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMega(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMega(true);
  };

  const scheduleCloseMega = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 160);
  };

  const closeMega = () => {
    window.clearTimeout(closeTimer.current);
    setMega(false);
  };

  return (
    <>
      <header
        className={`nav ${scrolled || mega ? "is-scrolled" : ""} ${menuOpen ? "is-open" : ""} ${overHero ? "is-over-hero" : ""}`}
      >
        <BrandMark />
        <ul className="nav-links">
          {site.nav.map((item) => {
            if (item.href === "/collection") {
              return (
                <li
                  key={item.href}
                  className="has-mega"
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleCloseMega}
                >
                  <NavLink to={item.href} className={({ isActive }) => (isActive || mega ? "active" : undefined)}>
                    {item.label}
                  </NavLink>
                  <button
                    type="button"
                    className="mega-toggle"
                    aria-expanded={mega}
                    aria-controls="collection-mega"
                    onClick={() => setMega((open) => !open)}
                  >
                    <span className="sr-only">{mega ? "Close collections" : "Open collections"}</span>
                  </button>
                  {mega && (
                    <div className="mega" id="collection-mega" onMouseEnter={openMega}>
                      {site.collectionLines.map((line) => (
                        <NavLink key={line.slug} to={`/collection/${line.slug}`} className="mega-card">
                          <img src={line.image} alt="" />
                          <div>
                            <strong>{line.name}</strong>
                            <span>{line.tagline}</span>
                          </div>
                        </NavLink>
                      ))}
                      <NavLink to="/collection" className="mega-all">
                        All collections
                      </NavLink>
                    </div>
                  )}
                </li>
              );
            }
            return (
              <li key={item.href}>
                <NavLink to={item.href} onMouseEnter={closeMega}>
                  {item.label}
                </NavLink>
              </li>
            );
          })}
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
      </header>
      {menuOpen && (
        <nav className="mobile-menu" id="mobile-menu">
          <button type="button" className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
            Close
          </button>
          <NavLink to="/collection" onClick={() => setMenuOpen(false)}>
            Collections
          </NavLink>
          <div className="mobile-menu-lines">
            {site.collectionLines.map((line) => (
              <NavLink key={line.slug} to={`/collection/${line.slug}`} onClick={() => setMenuOpen(false)}>
                {line.name}
              </NavLink>
            ))}
          </div>
          {site.nav
            .filter((item) => item.href !== "/collection")
            .map((item) => (
              <NavLink key={item.href} to={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </NavLink>
            ))}
        </nav>
      )}
    </>
  );
}
