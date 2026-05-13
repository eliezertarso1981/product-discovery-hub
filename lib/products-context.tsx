"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface Product {
  id: string;
  name: string;
  initials: string;
  color: string;
}

export const initialProducts: Product[] = [
  { id: "prod-core", name: "PM Core", initials: "PC", color: "var(--primary)" },
  { id: "prod-insights", name: "Insights Hub", initials: "IH", color: "var(--purple)" },
  { id: "prod-mobile", name: "Mobile Companion", initials: "MC", color: "var(--warn-strong)" },
];

const STORAGE_KEY = "products-store-v1";
const SELECTED_KEY = "products-selected-v1";

interface Ctx {
  products: Product[];
  currentProduct: Product;
  setCurrentProductId: (id: string) => void;
  addProduct: (name: string) => Product;
  ready: boolean;
}

const ProductsCtx = createContext<Ctx | null>(null);

const colors = ["var(--primary)", "var(--purple)", "var(--warn-strong)", "var(--cyan)", "var(--success)", "var(--danger)"];

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedId, setSelectedId] = useState<string>(initialProducts[0].id);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProducts(JSON.parse(raw));
      const sel = localStorage.getItem(SELECTED_KEY);
      if (sel) setSelectedId(sel);
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(SELECTED_KEY, selectedId);
  }, [selectedId, ready]);

  const value = useMemo<Ctx>(() => {
    const currentProduct =
      products.find((p) => p.id === selectedId) ?? products[0] ?? initialProducts[0];
    return {
      products,
      currentProduct,
      setCurrentProductId: setSelectedId,
      ready,
      addProduct: (name: string) => {
        const id = `prod-${Date.now()}`;
        const initials = name
          .split(/\s+/)
          .map((w) => w[0])
          .filter(Boolean)
          .slice(0, 2)
          .join("")
          .toUpperCase();
        const product: Product = {
          id,
          name,
          initials: initials || "PR",
          color: colors[products.length % colors.length],
        };
        setProducts((prev) => [...prev, product]);
        setSelectedId(id);
        return product;
      },
    };
  }, [products, selectedId, ready]);

  return <ProductsCtx.Provider value={value}>{children}</ProductsCtx.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsCtx);
  if (!ctx) throw new Error("useProducts precisa estar dentro de <ProductsProvider>");
  return ctx;
}
