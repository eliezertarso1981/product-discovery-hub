import { Calendar, ChevronDown } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-semibold" style={{ color: "#2b364a" }}>
          Bom dia, Eliezer
        </h1>
        <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
          Visão geral de Acme Product Team — terça-feira, 12 de novembro
        </p>
      </div>
      <button
        className="inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium"
        style={{ borderColor: "#e5e7eb", color: "#2b364a", backgroundColor: "#ffffff" }}
      >
        <Calendar size={16} color="#6b7280" />
        Esta semana
        <ChevronDown size={14} color="#6b7280" />
      </button>
    </div>
  );
}
