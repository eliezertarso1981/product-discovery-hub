"use client";

import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { boardColumns, statusConfig, type Pain, type PainStatus } from "@/lib/dores-data";
import { PainCard } from "./pain-card";

interface Props {
  pains: Pain[];
  onMove: (id: string, status: PainStatus) => void;
}

export function PainBoard({ pains, onMove }: Props) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<PainStatus | null>(null);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {boardColumns.map((status) => {
        const cfg = statusConfig[status];
        const items = pains.filter((p) => p.status === status);
        const isOver = overCol === status;

        return (
          <div
            key={status}
            onDragOver={(e) => {
              e.preventDefault();
              setOverCol(status);
            }}
            onDragLeave={() => setOverCol((c) => (c === status ? null : c))}
            onDrop={() => {
              if (draggingId) onMove(draggingId, status);
              setOverCol(null);
            }}
            className="flex w-[300px] shrink-0 flex-col rounded-xl"
            style={{
              backgroundColor: isOver ? "#f4fdfb" : "transparent",
              outline: isOver ? "2px dashed #13c8b5" : "none",
              outlineOffset: -2,
              transition: "background-color 120ms",
            }}
          >
            <div
              className="relative flex items-center justify-between rounded-t-xl px-2 py-2"
              style={{
                backgroundColor: status === "enderecada" ? "#fffbeb" : "#f9fafb",
              }}
            >
              {cfg.accent && (
                <span
                  className="absolute left-0 right-0 top-0 h-[2px] rounded-t-xl"
                  style={{ backgroundColor: cfg.accent }}
                />
              )}
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cfg.dot }} />
                <span className="text-[14px] font-semibold" style={{ color: "#2b364a" }}>
                  {cfg.label}
                </span>
                <span className="text-[13px]" style={{ color: "#9ca3af" }}>
                  ({items.length})
                </span>
              </div>
              <div className="flex items-center gap-1" style={{ color: "#9ca3af" }}>
                <button className="rounded p-1 hover:bg-white" aria-label="Adicionar dor">
                  <Plus size={14} />
                </button>
                <button className="rounded p-1 hover:bg-white" aria-label="Mais opções">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-2 min-h-[120px]">
              {items.map((p) => {
                const isDragging = draggingId === p.id;
                return (
                  <div key={p.id} className="relative">
                    {isDragging && (
                      <div
                        className="rounded-lg border-2 border-dashed"
                        style={{
                          borderColor: "#cbd5e1",
                          height: 140,
                          backgroundColor: "#f9fafb",
                        }}
                      />
                    )}
                    {!isDragging && (
                      <PainCard
                        pain={p}
                        selected={selectedId === p.id}
                        onSelect={() => setSelectedId(p.id === selectedId ? null : p.id)}
                        onDragStart={(e) => {
                          e.dataTransfer.effectAllowed = "move";
                          setDraggingId(p.id);
                        }}
                        onDragEnd={() => {
                          setDraggingId(null);
                          setOverCol(null);
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
