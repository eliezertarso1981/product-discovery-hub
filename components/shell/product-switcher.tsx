"use client";

import { useState } from "react";
import { ChevronDown, Check, Plus } from "lucide-react";
import { useProducts } from "@/lib/products-context";

export function ProductSwitcher() {
  const { products, currentProduct, setCurrentProductId, addProduct } = useProducts();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-[13px] hover:bg-[#f9fafb]"
        style={{ borderColor: "#e5e7eb", color: "#2b364a" }}
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-white"
          style={{ backgroundColor: currentProduct.color }}
        >
          {currentProduct.initials}
        </span>
        <span className="font-semibold">{currentProduct.name}</span>
        <ChevronDown size={14} color="#9ca3af" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute left-0 z-20 mt-1 w-64 rounded-md border bg-white py-1 shadow-lg"
            style={{ borderColor: "#e5e7eb" }}
          >
            <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af]">
              Produto
            </div>
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setCurrentProductId(p.id);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-2 py-1.5 text-[13px] hover:bg-[#f9fafb]"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-white"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.initials}
                  </span>
                  <span className="text-[#2b364a]">{p.name}</span>
                </span>
                {p.id === currentProduct.id && <Check size={14} color="#13c8b5" />}
              </button>
            ))}
            <div className="my-1 h-px" style={{ backgroundColor: "#f1f5f9" }} />
            <button
              onClick={() => {
                const name = prompt("Nome do novo produto?");
                if (name?.trim()) {
                  addProduct(name.trim());
                  setOpen(false);
                }
              }}
              className="flex w-full items-center gap-2 px-2 py-1.5 text-[13px] text-[#13c8b5] hover:bg-[#f4fdfb]"
            >
              <Plus size={14} /> Novo produto
            </button>
          </div>
        </>
      )}
    </div>
  );
}
