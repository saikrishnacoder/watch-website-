import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type UIContextValue = {
  cartOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  toast: string;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
  setToast: (message: string) => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");

  const value = useMemo(
    () => ({
      cartOpen,
      searchOpen,
      menuOpen,
      toast,
      setCartOpen,
      setSearchOpen,
      setMenuOpen,
      setToast,
    }),
    [cartOpen, searchOpen, menuOpen, toast],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
