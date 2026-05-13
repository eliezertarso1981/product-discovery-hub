"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, Bookmark, Plus } from "lucide-react";
import { initialPains, type Pain, type PainStatus } from "@/lib/dores-data";
import { DoresToolbar, type ViewMode } from "@/components/dores/dores-toolbar";
import { PainBoard } from "@/components/dores/pain-board";
import { PainList } from "@/components/dores/pain-list";

export default function DoresPage() {
  const [pains, setPains] = useState<Pain[]>(initialPains);
  const [view, setView] = useState<ViewMode>("board");

  const counts = useMemo(() => {
    const total = pains.length;
    const ativas = pains.filter((p) => !["resolvida", "descartada"].includes(p.status)).length;
    const descartada = pains.filter((p) => p.status === "descartada").length;
    return { total, ativas, descartada };
  }, [pains]);

  const handleMove = (id: string, status: PainStatus) => {
    setPains((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  return (
    <div className="px-6 py-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[13px]" style={{ color: "#9ca3af" }}>
            <Link href="/dashboard" className="hover:underline">
              Discovery
            </Link>{" "}
            <span className="mx-1">›</span> <span style={{ color: "#4b5563" }}>Dores</span>
          </div>
          <h1
            className="mt-1 text-[28px] font-semibold tracking-tight"
            style={{ color: "#2b364a" }}
          >
            Dores
          </h1>
          <div className="mt-1 text-[13px]" style={{ color: "#6b7280" }}>
            <span className="font-mono">{counts.total} dores</span>
            <Sep /> <span className="font-mono">{counts.ativas} ativas</span>
            <Sep /> <span className="font-mono">{counts.descartada} descartada</span>
            <Sep /> atualizado há 2 min
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[13px] hover:bg-[#f9fafb]"
            style={{ borderColor: "#e5e7eb", color: "#4b5563" }}
          >
            <Download size={14} /> Exportar
          </button>
          <button
            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[13px] hover:bg-[#f9fafb]"
            style={{ borderColor: "#e5e7eb", color: "#4b5563" }}
          >
            <Bookmark size={14} /> Filtros salvos
          </button>
          <button
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#13c8b5" }}
          >
            <Plus size={14} /> Nova dor
          </button>
        </div>
      </div>

      <div className="mt-5">
        <DoresToolbar view={view} onViewChange={setView} />
      </div>

      <div className="mt-5">
        {view === "board" && <PainBoard pains={pains} onMove={handleMove} />}
        {view === "list" && <PainList pains={pains} />}
        {view === "grid" && <PainList pains={pains} />}
        {view === "calendar" && (
          <div
            className="rounded-xl border p-10 text-center text-[13px]"
            style={{ borderColor: "#e5e7eb", color: "#9ca3af" }}
          >
            Calendário em breve.
          </div>
        )}
      </div>
    </div>
  );
}

function Sep() {
  return (
    <span className="mx-1.5" style={{ color: "#d1d5db" }}>
      ·
    </span>
  );
}
