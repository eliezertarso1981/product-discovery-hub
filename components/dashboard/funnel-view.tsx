import { ChevronRight, AlertTriangle } from "lucide-react";
import { funnel, bottleneck } from "@/lib/mock-data";

export function FunnelView() {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{ borderColor: "#e5e7eb", backgroundColor: "#ffffff" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: "#2b364a" }}>
            Funil de Discovery
          </h2>
          <p className="mt-0.5 text-sm" style={{ color: "#6b7280" }}>
            Conversão entre estágios — últimos 90 dias
          </p>
        </div>
        <button
          className="inline-flex items-center gap-1 text-sm font-semibold"
          style={{ color: "#13c8b5" }}
        >
          Ver detalhes <ChevronRight size={14} />
        </button>
      </div>

      <div className="mt-6 flex items-stretch gap-1 overflow-x-auto">
        {funnel.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-1">
            <div
              className="flex min-w-[110px] flex-col rounded-xl p-3"
              style={{ backgroundColor: "#e6f8f5" }}
            >
              <div className="text-[11px] leading-tight" style={{ color: "#0f766e" }}>
                {stage.label}
              </div>
              <div className="mt-2 text-2xl font-semibold" style={{ color: "#2b364a" }}>
                {stage.value}
              </div>
              {stage.rate && (
                <div className="mt-1 text-xs font-semibold" style={{ color: "#13c8b5" }}>
                  {stage.rate}
                </div>
              )}
            </div>
            {i < funnel.length - 1 && <ChevronRight size={16} color="#9ca3af" />}
          </div>
        ))}
      </div>

      <div
        className="mt-5 flex items-center justify-between rounded-xl p-4"
        style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa" }}
      >
        <div className="flex items-center gap-3">
          <AlertTriangle size={18} color="#f59e0b" />
          <div className="text-sm" style={{ color: "#2b364a" }}>
            <span className="font-semibold" style={{ color: "#c2410c" }}>
              Gargalo detectado
            </span>{" "}
            em &quot;{bottleneck.stage}&quot; ({bottleneck.rate} — esperado {bottleneck.expected})
          </div>
        </div>
        <button
          className="inline-flex items-center gap-1 text-sm font-semibold"
          style={{ color: "#c2410c" }}
        >
          Investigar <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
