import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "../config/site";

export type CartItem = {
  slug: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  lines: { product: Product; qty: number }[];
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<CartContextValue>(() => {
    const add = (slug: string) => {
      setItems((current) => {
        const found = current.find((item) => item.slug === slug);
        if (found) {
          return current.map((item) =>
            item.slug === slug ? { ...item, qty: item.qty + 1 } : item,
          );
        }
        return [...current, { slug, qty: 1 }];
      });
    };

    const remove = (slug: string) => {
      setItems((current) => current.filter((item) => item.slug !== slug));
    };

    const setQty = (slug: string, qty: number) => {
      if (qty < 1) {
        remove(slug);
        return;
      }
      setItems((current) =>
        current.map((item) => (item.slug === slug ? { ...item, qty } : item)),
      );
    };

    const lines = items
      .map((item) => {
        const product = getProduct(item.slug);
        return product ? { product, qty: item.qty } : null;
      })
      .filter((line): line is { product: Product; qty: number } => Boolean(line));

    const total = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
    const count = items.reduce((sum, item) => sum + item.qty, 0);

    return {
      items,
      count,
      add,
      remove,
      setQty,
      clear: () => setItems([]),
      lines,
      total,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
