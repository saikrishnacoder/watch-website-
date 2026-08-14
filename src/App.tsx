import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { site } from "./config/site";
import { CartDrawer } from "./components/layout/CartDrawer";
import { CompareBar } from "./components/layout/CompareBar";
import { Concierge } from "./components/layout/Concierge";
import { CookieBanner } from "./components/layout/CookieBanner";
import { CustomCursor } from "./components/layout/CustomCursor";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { Preloader } from "./components/layout/Preloader";
import { RegionNotice } from "./components/layout/RegionNotice";
import { RegionPanel } from "./components/layout/RegionSwitch";
import { SearchOverlay } from "./components/layout/SearchOverlay";
import { SkipLink } from "./components/layout/SkipLink";
import { Toast } from "./components/layout/Toast";
import { MeridianRail } from "./components/brand/MeridianRail";
import { CabinetProvider } from "./context/CabinetContext";
import { CartProvider } from "./context/CartContext";
import { ConsentProvider } from "./context/ConsentContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { MotionProvider, useMotion } from "./context/MotionContext";
import { ThemeProvider } from "./context/ThemeContext";
import { UIProvider, useUI } from "./context/UIContext";
import { documentTitle } from "./lib/titles";
import { Atelier } from "./pages/Atelier";
import { Boutique } from "./pages/Boutique";
import { Cabinet } from "./pages/Cabinet";
import { Checkout } from "./pages/Checkout";
import { Collection } from "./pages/Collection";
import { CollectionFamily } from "./pages/CollectionFamily";
import { Compare } from "./pages/Compare";
import { Compose } from "./pages/Compose";
import { Contact } from "./pages/Contact";
import { FindWatch } from "./pages/FindWatch";
import { Heritage } from "./pages/Heritage";
import { Home } from "./pages/Home";
import { Journal } from "./pages/Journal";
import { JournalArticle } from "./pages/JournalArticle";
import { Maison } from "./pages/Maison";
import { MotionLab } from "./pages/MotionLab";
import { NotFound } from "./pages/NotFound";
import { Privacy } from "./pages/Privacy";
import { Product } from "./pages/Product";
import { ProductCraft } from "./pages/ProductCraft";
import { Services } from "./pages/Services";
import { WatchFinder } from "./pages/WatchFinder";
import { Wishlist } from "./pages/Wishlist";

export default function App() {
  return (
    <MotionProvider>
      <ConsentProvider>
        <ThemeProvider>
          <AppShell />
        </ThemeProvider>
      </ConsentProvider>
    </MotionProvider>
  );
}

function AppShell() {
  const location = useLocation();
  const { reduceMotion } = useMotion();
  const prefersReduce = useReducedMotion();
  const quiet = reduceMotion || Boolean(prefersReduce);
  const firstPaint = useRef(true);

  useEffect(() => {
    firstPaint.current = false;
  }, [location.pathname]);

  useEffect(() => {
    document.title = documentTitle(location.pathname);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", site.seo.description);
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: quiet ? "auto" : "smooth" });
  }, [location.pathname, quiet]);

  return (
    <CartProvider>
      <CurrencyProvider>
      <CabinetProvider>
        <UIProvider>
          <div className="app-shell">
            <SkipLink />
            <BootSequence />
            <MeridianRail />
            <Shortcuts />
            <CanonicalizePath />
            <CustomCursor />
            <Navbar />
            <RegionNotice />
            <SearchOverlay />
            <CartDrawer />
            <CompareBar />
            <AnimatePresence mode="wait">
              <motion.div
                id="main"
                key={location.pathname}
                initial={quiet || firstPaint.current ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={quiet ? undefined : { opacity: 0 }}
                transition={quiet ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route path="/collection/:slug" element={<CollectionFamily />} />
                  <Route path="/chronograph" element={<Navigate to="/collection/chronograph" replace />} />
                  <Route path="/diver" element={<Navigate to="/collection/diver" replace />} />
                  <Route path="/imperial" element={<Navigate to="/collection/imperial" replace />} />
                  <Route path="/meridian" element={<Navigate to="/collection/meridian" replace />} />
                  <Route path="/watch/:slug/craft" element={<ProductCraft />} />
                  <Route path="/watch/:slug" element={<Product />} />
                  <Route path="/finder" element={<WatchFinder />} />
                  <Route path="/find" element={<FindWatch />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/cabinet" element={<Cabinet />} />
                  <Route path="/compose" element={<Compose />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/journal/:slug" element={<JournalArticle />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/maison" element={<Maison />} />
                  <Route path="/heritage" element={<Heritage />} />
                  <Route path="/atelier" element={<Atelier />} />
                  <Route path="/craft" element={<Navigate to="/atelier" replace />} />
                  <Route path="/motion" element={<MotionLab />} />
                  <Route path="/boutique" element={<Boutique />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </motion.div>
            </AnimatePresence>
            <CookieBanner />
            <RegionPanel />
            <Concierge />
            <Toast />
          </div>
        </UIProvider>
      </CabinetProvider>
      </CurrencyProvider>
    </CartProvider>
  );
}

function BootSequence() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;
  return <Preloader />;
}

function Shortcuts() {
  const { searchOpen, setSearchOpen, setMenuOpen } = useUI();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const node = event.target as HTMLElement | null;
      const typing =
        node &&
        (node.tagName === "INPUT" ||
          node.tagName === "TEXTAREA" ||
          node.tagName === "SELECT" ||
          node.isContentEditable);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
        return;
      }
      if (event.key === "/" && !typing) {
        event.preventDefault();
        setSearchOpen(true);
        return;
      }
      if (event.key === "Escape") {
        if (searchOpen) setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen, setMenuOpen]);

  return null;
}

const LINE_ALIASES: Record<string, string> = {
  "/chronograph": "/collection/chronograph",
  "/diver": "/collection/diver",
  "/imperial": "/collection/imperial",
  "/meridian": "/collection/meridian",
  "/craft": "/atelier",
  "/journal/column-wheel": "/journal/anatomy",
  "/journal/enamel-firing": "/journal/inside-the-atelier",
  "/journal/wearing-gold": "/journal/geneva-independent",
};

function CanonicalizePath() {
  const location = useLocation();
  let path = location.pathname;
  if (path.length > 1 && path.endsWith("/")) path = path.replace(/\/+$/, "");
  if (path.endsWith("/index.html")) path = path.slice(0, -"/index.html".length) || "/";
  else if (path.endsWith(".html")) path = path.slice(0, -".html".length) || "/";
  path = LINE_ALIASES[path] ?? path;
  if (path !== location.pathname) {
    return <Navigate to={`${path}${location.search}${location.hash}`} replace />;
  }
  return null;
}
