"use client";

import Link from "next/link";
import { ArrowRight, AlertCircle, FlaskConical, Beaker, Map } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Pain } from "@/lib/dores-data";
import { statusConfig as painStatusConfig } from "@/lib/dores-data";
import { useDiscovery } from "@/lib/discovery-store";
import {
  hypothesisStatusConfig,
  experimentStatusConfig,
  roadmapStatusConfig,
} from "@/lib/discovery-data";
import { SeverityDots } from "./severity-dots";

interface Props {
  pains: Pain[];
}

export function PainFlow({ pains }: Props) {
  const { hypothesesByPain, experimentsByHypothesis, roadmapByPain } = useDiscovery();

  if (pains.length === 0) {
    return (
      <div
        className="rounded-xl border p-10 text-center text-[13px]"
        style={{ borderColor: "#e5e7eb", color: "#9ca3af" }}
      >
        Nenhuma dor para exibir.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pains.map((pain) => {
        const hyps = hypothesesByPain(pain.id);
        const exps = hyps.flatMap((h) => experimentsByHypothesis(h.id));
        const roadmap = roadmapByPain(pain.id);

        return (
          <div
            key={pain.id}
            className="rounded-xl border bg-white p-4"
            style={{ borderColor: "#e5e7eb" }}
          >
            <div className="flex items-stretch gap-3 overflow-x-auto pb-1">
              {/* Dor */}
              <Column icon={AlertCircle} title="Dor" count={1} accent="#ef4444">
                <Link
                  href={`/dores/${pain.id}`}
                  className="group block rounded-lg border p-3 transition-colors hover:border-[#13c8b5]"
                  style={{ borderColor: "#e5e7eb", backgroundColor: "#fafbfc" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px]" style={{ color: "#9ca3af" }}>
                      {pain.id}
                    </span>
                    <SeverityDots level={pain.severity} />
                  </div>
                  <div
                    className="mt-1.5 line-clamp-2 text-[13px] font-medium leading-snug group-hover:text-[#13c8b5]"
                    style={{ color: "#2b364a" }}
                  >
                    {pain.title}
                  </div>
                  <StatusPill
                    label={painStatusConfig[pain.status].label}
                    color={painStatusConfig[pain.status].dot}
                  />
                </Link>
              </Column>

              <Arrow />

              {/* Hipóteses */}
              <Column
                icon={FlaskConical}
                title="Hipóteses"
                count={hyps.length}
                accent="#7c3aed"
              >
                {hyps.length === 0 ? (
                  <Empty>Sem hipóteses</Empty>
                ) : (
                  hyps.map((h) => (
                    <Link
                      key={h.id}
                      href={`/hipoteses/${h.id}`}
                      className="group block rounded-lg border p-3 transition-colors hover:border-[#13c8b5]"
                      style={{ borderColor: "#e5e7eb", backgroundColor: "#fafbfc" }}
                    >
                      <div className="font-mono text-[11px]" style={{ color: "#9ca3af" }}>
                        {h.id}
                      </div>
                      <div
                        className="mt-1 line-clamp-2 text-[13px] font-medium leading-snug group-hover:text-[#13c8b5]"
                        style={{ color: "#2b364a" }}
                      >
                        {h.title}
                      </div>
                      <StatusPill
                        label={hypothesisStatusConfig[h.status].label}
                        color={hypothesisStatusConfig[h.status].dot}
                      />
                    </Link>
                  ))
                )}
              </Column>

              <Arrow />

              {/* Experimentos */}
              <Column icon={Beaker} title="Experimentos" count={exps.length} accent="#0891b2">
                {exps.length === 0 ? (
                  <Empty>Sem experimentos</Empty>
                ) : (
                  exps.map((e) => (
                    <Link
                      key={e.id}
                      href={`/experimentos/${e.id}`}
                      className="group block rounded-lg border p-3 transition-colors hover:border-[#13c8b5]"
                      style={{ borderColor: "#e5e7eb", backgroundColor: "#fafbfc" }}
                    >
                      <div className="font-mono text-[11px]" style={{ color: "#9ca3af" }}>
                        {e.id}
                      </div>
                      <div
                        className="mt-1 line-clamp-2 text-[13px] font-medium leading-snug group-hover:text-[#13c8b5]"
                        style={{ color: "#2b364a" }}
                      >
                        {e.title}
                      </div>
                      <StatusPill
                        label={experimentStatusConfig[e.status].label}
                        color={experimentStatusConfig[e.status].dot}
                      />
                    </Link>
                  ))
                )}
              </Column>

              <Arrow />

              {/* Roadmap */}
              <Column icon={Map} title="Roadmap" count={roadmap.length} accent="#13c8b5">
                {roadmap.length === 0 ? (
                  <Empty>Sem itens</Empty>
                ) : (
                  roadmap.map((r) => (
                    <Link
                      key={r.id}
                      href={`/roadmap/${r.id}`}
                      className="group block rounded-lg border p-3 transition-colors hover:border-[#13c8b5]"
                      style={{ borderColor: "#e5e7eb", backgroundColor: "#fafbfc" }}
                    >
                      <div className="font-mono text-[11px]" style={{ color: "#9ca3af" }}>
                        {r.id}
                      </div>
                      <div
                        className="mt-1 line-clamp-2 text-[13px] font-medium leading-snug group-hover:text-[#13c8b5]"
                        style={{ color: "#2b364a" }}
                      >
                        {r.title}
                      </div>
                      <StatusPill
                        label={roadmapStatusConfig[r.status].label}
                        color={roadmapStatusConfig[r.status].dot}
                      />
                    </Link>
                  ))
                )}
              </Column>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Column({
  icon: Icon,
  title,
  count,
  accent,
  children,
}: {
  icon: LucideIcon;
  title: string;
  count: number;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-[260px] shrink-0 flex-col">
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <Icon size={14} style={{ color: accent }} />
          <span
            className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "#6b7280" }}
          >
            {title}
          </span>
        </div>
        <span
          className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-md px-1.5 text-[11px] font-semibold"
          style={{ backgroundColor: "#f1f5f9", color: "#4b5563" }}
        >
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center pt-7">
      <ArrowRight size={16} style={{ color: "#cbd5e1" }} />
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg border border-dashed p-3 text-center text-[12px]"
      style={{ borderColor: "#e5e7eb", color: "#9ca3af" }}
    >
      {children}
    </div>
  );
}

function StatusPill({ label, color }: { label: string; color: string }) {
  return (
    <div className="mt-2 flex items-center gap-1.5">
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-[11px]" style={{ color: "#6b7280" }}>
        {label}
      </span>
    </div>
  );
}
