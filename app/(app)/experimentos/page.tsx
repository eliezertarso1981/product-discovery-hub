"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDiscovery } from "@/lib/discovery-store";
import { useProducts } from "@/lib/products-context";
import {
  experimentStatusConfig,
  experimentResultConfig,
} from "@/lib/discovery-data";
import { PageHeader, EmptyState, formatDateOnly } from "@/components/shared/crud-ui";
import { Avatar } from "@/components/shared/avatar";

export default function ExperimentosPage() {
  const router = useRouter();
  const { currentProduct } = useProducts();
  const { experiments, createExperiment, getHypothesis, evidencesByExperiment } = useDiscovery();
  const items = useMemo(
    () => experiments.filter((e) => e.productId === currentProduct.id),
    [experiments, currentProduct.id],
  );

  return (
    <div className="px-6 py-5">
      <PageHeader
        crumb={{ parent: { label: "Discovery", href: "/dashboard" }, title: "Experimentos" }}
        title="Experimentos"
        count={`${items.length} experimentos`}
        onCreate={() => {
          const e = createExperiment(currentProduct.id);
          router.push(`/experimentos/${e.id}?new=1`);
        }}
        createLabel="Novo experimento"
      />

      <div className="mt-5">
        {items.length === 0 ? (
          <EmptyState
            title="Nenhum experimento ainda"
            hint="Experimentos validam ou invalidam hipóteses."
          />
        ) : (
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#e5e7eb" }}>
            <table className="w-full text-left text-sm">
              <thead>
                <tr
                  className="text-[11px] uppercase tracking-wider"
                  style={{ color: "#9ca3af", backgroundColor: "#f9fafb" }}
                >
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">Experimento</th>
                  <th className="px-4 py-3 font-semibold">Hipótese</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Resultado</th>
                  <th className="px-4 py-3 font-semibold">Evidências</th>
                  <th className="px-4 py-3 font-semibold">Início</th>
                  <th className="px-4 py-3 font-semibold">Owner</th>
                </tr>
              </thead>
              <tbody>
                {items.map((e) => {
                  const cfg = experimentStatusConfig[e.status];
                  const hyp = e.hypothesisId ? getHypothesis(e.hypothesisId) : undefined;
                  const evCount = evidencesByExperiment(e.id).length;
                  const result = e.result ? experimentResultConfig[e.result] : null;
                  return (
                    <tr
                      key={e.id}
                      className="cursor-pointer border-t transition-colors hover:bg-[#f9fafb]"
                      style={{ borderColor: "#f1f5f9" }}
                      onClick={() => router.push(`/experimentos/${e.id}`)}
                    >
                      <td className="px-4 py-3 font-mono text-[12px] text-[#6b7280]">{e.id}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-[#2b364a]">{e.title}</div>
                        <div className="mt-0.5 line-clamp-1 text-[13px] text-[#9ca3af]">
                          {e.method || e.description}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[13px]">
                        {hyp ? (
                          <Link
                            href={`/hipoteses/${hyp.id}`}
                            onClick={(ev) => ev.stopPropagation()}
                            className="font-mono text-[12px] text-[#13c8b5] hover:underline"
                          >
                            {hyp.id}
                          </Link>
                        ) : (
                          <span className="text-[#cbd5e1]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[13px]">
                        <span className="inline-flex items-center gap-2 text-[#4b5563]">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cfg.dot }} />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[13px]">
                        {result ? (
                          <span style={{ color: result.color }}>{result.label}</span>
                        ) : (
                          <span className="text-[#cbd5e1]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-[13px] text-[#4b5563]">{evCount}</td>
                      <td className="px-4 py-3 text-[13px] text-[#6b7280]">
                        {formatDateOnly(e.startDate)}
                      </td>
                      <td className="px-4 py-3">
                        <Avatar initials={e.owner.initials} color={e.owner.color} size={24} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
