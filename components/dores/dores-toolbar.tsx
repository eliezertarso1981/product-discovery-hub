"use client";

import {
  ChevronDown,
  SlidersHorizontal,
  X,
  Search,
  LayoutGrid,
  List,
  Columns3,
  Calendar,
  Workflow,
} from "lucide-react";

export type ViewMode = "grid" | "list" | "board" | "calendar" | "flow";

interface Props {
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

const filters = [
  { label: "Persona", value: null },
  { label: "Severidade", value: "4–5" },
  { label: "Owner", value: null },
  { label: "Status: todos exceto descartadas", value: null },
];

export function DoresToolbar({ view, onViewChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const active = !!f.value;
          return (
            <button
              key={f.label}
              className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[13px] transition-colors hover:bg-[#f9fafb]"
              style={{
                borderColor: active ? "#13c8b5" : "#e5e7eb",
                color: "#2b364a",
                backgroundColor: active ? "#f4fdfb" : "#ffffff",
              }}
            >
              <span>{f.label}</span>
              {f.value && (
                <>
                  <span style={{ color: "#9ca3af" }}>·</span>
                  <span className="font-medium" style={{ color: "#13c8b5" }}>
                    {f.value}
                  </span>
                  <X size={12} style={{ color: "#13c8b5" }} />
                </>
              )}
              {!f.value && <ChevronDown size={12} style={{ color: "#9ca3af" }} />}
            </button>
          );
        })}
        <button
          className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[13px]"
          style={{ borderColor: "#e5e7eb", color: "#4b5563" }}
        >
          <SlidersHorizontal size={12} />
          Mais filtros
          <ChevronDown size={12} />
        </button>
        <button
          className="text-[13px] underline-offset-2 hover:underline"
          style={{ color: "#6b7280" }}
        >
          Limpar filtros
        </button>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div
          className="flex items-center gap-2 rounded-md border px-2.5 py-1.5"
          style={{ borderColor: "#e5e7eb", backgroundColor: "#ffffff" }}
        >
          <Search size={14} color="#9ca3af" />
          <input
            type="text"
            placeholder="Buscar nesta lista…"
            className="w-48 bg-transparent text-[13px] outline-none"
            style={{ color: "#2b364a" }}
          />
        </div>

        <div
          className="flex items-center rounded-md border p-0.5"
          style={{ borderColor: "#e5e7eb", backgroundColor: "#ffffff" }}
        >
          <ViewBtn
            icon={LayoutGrid}
            active={view === "grid"}
            onClick={() => onViewChange("grid")}
          />
          <ViewBtn icon={List} active={view === "list"} onClick={() => onViewChange("list")} />
          <ViewBtn
            icon={Columns3}
            active={view === "board"}
            onClick={() => onViewChange("board")}
          />
          <ViewBtn
            icon={Calendar}
            active={view === "calendar"}
            onClick={() => onViewChange("calendar")}
          />
        </div>
      </div>
    </div>
  );
}

function ViewBtn({
  icon: Icon,
  active,
  onClick,
}: {
  icon: typeof LayoutGrid;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded p-1.5 transition-colors"
      style={{
        backgroundColor: active ? "#f1f5f9" : "transparent",
        color: active ? "#2b364a" : "#9ca3af",
      }}
    >
      <Icon size={14} />
    </button>
  );
}
