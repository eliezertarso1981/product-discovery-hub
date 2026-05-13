"use client";

import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { statusConfig, type Pain } from "@/lib/dores-data";
import { Avatar } from "@/components/shared/avatar";
import { SeverityDots } from "./severity-dots";
import { PersonaStack } from "./persona-chip";

export function PainList({ pains }: { pains: Pain[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#e5e7eb" }}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr
            className="text-[11px] uppercase tracking-wider"
            style={{ color: "#9ca3af", backgroundColor: "#f9fafb" }}
          >
            <th className="px-4 py-3 font-semibold">ID</th>
            <th className="px-4 py-3 font-semibold">Dor</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Severidade</th>
            <th className="px-4 py-3 font-semibold">Personas</th>
            <th className="px-4 py-3 font-semibold">Reach</th>
            <th className="px-4 py-3 font-semibold">Ev · Hp</th>
            <th className="px-4 py-3 font-semibold" />
          </tr>
        </thead>
        <tbody>
          {pains.map((p) => {
            const cfg = statusConfig[p.status];
            const muted = p.status === "descartada";
            const Icon = p.status === "validada" ? CheckCircle2 : AlertCircle;
            return (
              <tr
                key={p.id}
                className="cursor-pointer border-t transition-colors hover:bg-[#f9fafb]"
                style={{ borderColor: "#f1f5f9", opacity: muted ? 0.7 : 1 }}
              >
                <td className="px-4 py-3 font-mono text-[12px]" style={{ color: "#6b7280" }}>
                  <Link href={`/dores/${p.id}`} className="inline-flex items-center gap-1.5 hover:underline">
                    <Icon size={13} color={p.status === "validada" ? "#16a34a" : undefined} />
                    {p.id}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/dores/${p.id}`} className="block hover:underline">
                    <div className="font-semibold" style={{ color: muted ? "#9ca3af" : "#2b364a" }}>
                      {p.title}
                    </div>
                  </Link>
                  <div className="mt-0.5 line-clamp-1 text-[13px]" style={{ color: "#9ca3af" }}>
                    {p.description}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center gap-2 text-[13px]"
                    style={{ color: "#4b5563" }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cfg.dot }} />
                    {cfg.label}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <SeverityDots level={p.severity} />
                </td>
                <td className="px-4 py-3">
                  <PersonaStack personas={p.personas} />
                </td>
                <td className="px-4 py-3 font-mono text-[13px]" style={{ color: "#4b5563" }}>
                  {p.reach}
                </td>
                <td className="px-4 py-3 font-mono text-[13px]" style={{ color: "#4b5563" }}>
                  {p.evidences} · {p.hypotheses}
                </td>
                <td className="px-4 py-3">
                  <Avatar initials={p.owner.initials} color={p.owner.color} size={24} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
