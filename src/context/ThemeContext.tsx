import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { palettes, THEME_KEY, isTheme, type ThemeId } from "../config/theme";
import { site } from "../config/site";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readTheme(): ThemeId {
  if (typeof window === "undefined") return "encre";
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored && isTheme(stored) ? stored : "encre";
}

function applyPalette(id: ThemeId) {
  const palette = palettes[id];
  const root = document.documentElement;
  root.dataset.theme = id;
  root.style.setProperty("--bg", palette.bg);
  root.style.setProperty("--bg-elevated", palette.bgElevated);
  root.style.setProperty("--bg-soft", palette.bgSoft);
  root.style.setProperty("--ink", palette.ink);
  root.style.setProperty("--muted", palette.muted);
  root.style.setProperty("--gold", palette.gold);
  root.style.setProperty("--gold-soft", palette.goldSoft);
  root.style.setProperty("--line", palette.line);
  root.style.setProperty("--danger", palette.danger);
  root.style.setProperty("--font-display", site.theme.fontDisplay);
  root.style.setProperty("--font-body", site.theme.fontBody);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", palette.bg);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const id = readTheme();
    if (typeof document !== "undefined") applyPalette(id);
    return id;
  });

  useEffect(() => {
    applyPalette(theme);
  }, [theme]);

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next);
    window.localStorage.setItem(THEME_KEY, next);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "encre" ? "ivoire" : "encre"),
    }),
    [theme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
