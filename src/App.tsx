import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { site } from "./config/site";
import { CartDrawer } from "./components/layout/CartDrawer";
import { CompareBar } from "./components/layout/CompareBar";
import { Concierge } from "./components/layout/Concierge";
import { CookieBanner } from "./components/layout/CookieBanner";
import { CustomCursor } from "./components/layout/CustomCursor";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { Preloader } from "./components/layout/Preloader";
import { SearchOverlay } from "./components/layout/SearchOverlay";
import { SkipLink } from "./components/layout/SkipLink";
import { Toast } from "./components/layout/Toast";
import { MeridianRail } from "./components/brand/MeridianRail";
import { CinematicIntro } from "./components/motion/CinematicIntro";
import { CabinetProvider } from "./context/CabinetContext";
import { CartProvider } from "./context/CartContext";
import { ConsentProvider } from "./context/ConsentContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { MotionProvider, useMotion } from "./context/MotionContext";
import { ThemeProvider } from "./context/ThemeContext";
import { UIProvider, useUI } from "./context/UIContext";
import { track } from "./lib/analytics";
import { documentTitle } from "./lib/titles";
import { Atelier } from "./pages/Atelier";
import { Boutique } from "./pages/Boutique";
import { Checkout } from "./pages/Checkout";
import { Collection } from "./pages/Collection";
import { CollectionFamily } from "./pages/CollectionFamily";
import { Compare } from "./pages/Compare";
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
import { Services } from "./pages/Services";
import { WatchFinder } from "./pages/WatchFinder";
import { Wishlist } from "./pages/Wishlist";

const INTRO_KEY = "horloge-intro";

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
            <CustomCursor />
            <Navbar />
            <SearchOverlay />
            <CartDrawer />
            <CompareBar />
            <AnimatePresence mode="wait">
              <motion.div
                id="main"
                key={location.pathname}
                initial={quiet || firstPaint.current ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={quiet ? undefined : { opacity: 0, y: -12 }}
                transition={quiet ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route path="/collection/:slug" element={<CollectionFamily />} />
                  <Route path="/watch/:slug" element={<Product />} />
                  <Route path="/finder" element={<WatchFinder />} />
                  <Route path="/find" element={<FindWatch />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/journal/:slug" element={<JournalArticle />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/maison" element={<Maison />} />
                  <Route path="/heritage" element={<Heritage />} />
                  <Route path="/atelier" element={<Atelier />} />
                  <Route path="/motion" element={<MotionLab />} />
                  <Route path="/boutique" element={<Boutique />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </motion.div>
            </AnimatePresence>
            <CookieBanner />
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
  const location = useLocation();
  const { canParallax, saveData } = useMotion();
  const booted = useRef(false);
  const [intro, setIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.location.pathname === "/" && sessionStorage.getItem(INTRO_KEY) !== "done";
  });

  const dismiss = useCallback((reason: "skip" | "complete") => {
    sessionStorage.setItem(INTRO_KEY, "done");
    track(reason === "skip" ? "intro_skip" : "intro_complete");
    booted.current = true;
    setIntro(false);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") setIntro(false);
  }, [location.pathname]);

  useEffect(() => {
    if (intro && (!canParallax || saveData)) {
      sessionStorage.setItem(INTRO_KEY, "done");
      setIntro(false);
    }
  }, [intro, canParallax, saveData]);

  if (intro && canParallax && !saveData && location.pathname === "/") {
    return <CinematicIntro open onSkip={dismiss} />;
  }

  if (booted.current) return null;
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
