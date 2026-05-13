import { TrendingUp, Minus, Clock } from "lucide-react";

interface MetricTileProps {
  label: string;
  value: string;
  delta: string;
  deltaTone: "up" | "flat" | "warn";
  deltaLabel: string;
}

const toneConfig = {
  up: { color: "#16a34a", icon: TrendingUp },
  flat: { color: "#6b7280", icon: Minus },
  warn: { color: "#f59e0b", icon: Clock },
};

export function MetricTile({ label, value, delta, deltaTone, deltaLabel }: MetricTileProps) {
  const cfg = toneConfig[deltaTone];
  const Icon = cfg.icon;
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ borderColor: "#e5e7eb", backgroundColor: "#ffffff" }}
    >
      <div
        className="text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: "#9ca3af" }}
      >
        {label}
      </div>
      <div className="mt-3 text-4xl font-semibold" style={{ color: "#2b364a" }}>
        {value}
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs">
        <Icon size={14} color={cfg.color} />
        {delta && (
          <span className="font-semibold" style={{ color: cfg.color }}>
            {delta}
          </span>
        )}
        <span style={{ color: "#6b7280" }}>{deltaLabel}</span>
      </div>
    </div>
  );
}
