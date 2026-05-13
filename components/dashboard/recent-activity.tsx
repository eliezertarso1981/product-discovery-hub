import { ChevronRight } from "lucide-react";
import { recentActivity } from "@/lib/mock-data";
import { entityConfig } from "@/lib/entity-config";
import { Avatar } from "@/components/shared/avatar";

export function RecentActivity() {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{ borderColor: "#e5e7eb", backgroundColor: "#ffffff" }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold" style={{ color: "#2b364a" }}>
          Atividade recente
        </h2>
        <button
          className="inline-flex items-center gap-1 text-sm font-semibold"
          style={{ color: "#13c8b5" }}
        >
          Ver tudo <ChevronRight size={14} />
        </button>
      </div>

      <ul className="mt-4 space-y-1">
        {recentActivity.map((item) => {
          const cfg = entityConfig[item.type];
          const Icon = cfg.icon;
          return (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#f9fafb]"
            >
              <div
                className="flex h-9 w-9 flex-none items-center justify-center rounded-lg"
                style={{ backgroundColor: cfg.bg }}
              >
                <Icon size={16} color={cfg.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm" style={{ color: "#2b364a" }}>
                  <span className="font-semibold">{item.who}</span> {item.text}
                </div>
                <div className="mt-0.5 text-xs" style={{ color: "#6b7280" }}>
                  {item.meta} · {item.when}
                </div>
              </div>
              <Avatar initials={item.initials} color={item.avatarColor} size={28} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
