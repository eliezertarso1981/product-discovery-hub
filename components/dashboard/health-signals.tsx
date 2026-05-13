import { healthSignals } from "@/lib/mock-data";

export function HealthSignals() {
  const inv = healthSignals.invalidationRate;

  return (
    <div
      className="rounded-2xl border p-6"
      style={{ borderColor: "#e5e7eb", backgroundColor: "#ffffff" }}
    >
      <h2 className="text-lg font-semibold" style={{ color: "#2b364a" }}>
        Sinais de saúde do discovery
      </h2>
      <p className="mt-0.5 text-sm" style={{ color: "#6b7280" }}>
        Métricas-chave da saúde do trabalho de produto
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-3">
        <div>
          <div
            className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "#9ca3af" }}
          >
            Taxa de invalidação de hipóteses
          </div>
          <div className="mt-3 text-4xl font-semibold" style={{ color: "#2b364a" }}>
            {inv.value}%
          </div>
          <div className="mt-4">
            <div
              className="relative h-2 rounded-full overflow-hidden flex"
              style={{ backgroundColor: "#e5e7eb" }}
            >
              <div style={{ width: `${inv.healthyMin}%`, backgroundColor: "#fecaca" }} />
              <div
                style={{
                  width: `${inv.healthyMax - inv.healthyMin}%`,
                  backgroundColor: "#86efac",
                }}
              />
              <div style={{ width: `${100 - inv.healthyMax}%`, backgroundColor: "#fecaca" }} />
              <div
                className="absolute top-1/2 h-3.5 w-0.5 -translate-y-1/2"
                style={{ left: `${inv.value}%`, backgroundColor: "#2b364a" }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px]" style={{ color: "#9ca3af" }}>
              <span>0%</span>
              <span>10%</span>
              <span>60%</span>
              <span>100%</span>
            </div>
          </div>
          <p className="mt-3 text-xs" style={{ color: "#6b7280" }}>
            {inv.note}
          </p>
        </div>

        <div>
          <div
            className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "#9ca3af" }}
          >
            Idade média — dores em investigação
          </div>
          <div className="mt-3 text-4xl font-semibold" style={{ color: "#f59e0b" }}>
            {healthSignals.avgPainAge.value} {healthSignals.avgPainAge.unit}
          </div>
          <div className="mt-4 text-xs font-semibold" style={{ color: "#16a34a" }}>
            ↗ {healthSignals.avgPainAge.delta}
          </div>
          <p className="mt-3 text-xs" style={{ color: "#c2410c" }}>
            {healthSignals.avgPainAge.note}
          </p>
        </div>

        <div>
          <div
            className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "#9ca3af" }}
          >
            Cobertura estratégica
          </div>
          <div className="mt-3 text-4xl font-semibold" style={{ color: "#2b364a" }}>
            {healthSignals.strategicCoverage.value}%
          </div>
          <div className="mt-4">
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: "#e5e7eb" }}
            >
              <div
                className="h-full"
                style={{
                  width: `${healthSignals.strategicCoverage.value}%`,
                  backgroundColor: "#13c8b5",
                }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px]" style={{ color: "#9ca3af" }}>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
          <p className="mt-3 text-xs" style={{ color: "#6b7280" }}>
            {healthSignals.strategicCoverage.note}
          </p>
        </div>
      </div>
    </div>
  );
}
