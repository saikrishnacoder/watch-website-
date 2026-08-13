import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { site } from "./config/site";
import { CartDrawer } from "./components/layout/CartDrawer";
import { CompareBar } from "./components/layout/CompareBar";
import { CustomCursor } from "./components/layout/CustomCursor";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { Preloader } from "./components/layout/Preloader";
import { SearchOverlay } from "./components/layout/SearchOverlay";
import { CabinetProvider } from "./context/CabinetContext";
import { CartProvider } from "./context/CartContext";
import { UIProvider } from "./context/UIContext";
import { Atelier } from "./pages/Atelier";
import { Boutique } from "./pages/Boutique";
import { Collection } from "./pages/Collection";
import { CollectionFamily } from "./pages/CollectionFamily";
import { Compare } from "./pages/Compare";
import { FindWatch } from "./pages/FindWatch";
import { Home } from "./pages/Home";
import { Journal } from "./pages/Journal";
import { JournalArticle } from "./pages/JournalArticle";
import { NotFound } from "./pages/NotFound";
import { Product } from "./pages/Product";
import { Services } from "./pages/Services";
import { WatchFinder } from "./pages/WatchFinder";
import { Wishlist } from "./pages/Wishlist";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const theme = site.theme;
    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--bg-elevated", theme.bgElevated);
    root.style.setProperty("--bg-soft", theme.bgSoft);
    root.style.setProperty("--ink", theme.ink);
    root.style.setProperty("--muted", theme.muted);
    root.style.setProperty("--gold", theme.gold);
    root.style.setProperty("--gold-soft", theme.goldSoft);
    root.style.setProperty("--line", theme.line);
    root.style.setProperty("--danger", theme.danger);
    root.style.setProperty("--font-display", theme.fontDisplay);
    root.style.setProperty("--font-body", theme.fontBody);
    document.title = site.seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", site.seo.description);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <CartProvider>
      <CabinetProvider>
        <UIProvider>
          <div className="app-shell">
            <Preloader />
            <CustomCursor />
            <Navbar />
            <SearchOverlay />
            <CartDrawer />
            <CompareBar />
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route path="/collection/:slug" element={<CollectionFamily />} />
                  <Route path="/watch/:slug" element={<Product />} />
                  <Route path="/finder" element={<WatchFinder />} />
                  <Route path="/find" element={<FindWatch />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/journal/:slug" element={<JournalArticle />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/atelier" element={<Atelier />} />
                  <Route path="/boutique" element={<Boutique />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </motion.div>
            </AnimatePresence>
          </div>
        </UIProvider>
      </CabinetProvider>
    </CartProvider>
  );
}
