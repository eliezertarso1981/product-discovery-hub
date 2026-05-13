"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDiscovery } from "@/lib/discovery-store";
import { useProducts } from "@/lib/products-context";
import { evidenceTypeConfig } from "@/lib/discovery-data";
import { PageHeader, EmptyState, formatDate } from "@/components/shared/crud-ui";

export default function EvidenciasPage() {
  const router = useRouter();
  const { currentProduct } = useProducts();
  const { evidences, createEvidence, getExperiment } = useDiscovery();
  const items = useMemo(
    () => evidences.filter((e) => e.productId === currentProduct.id),
    [evidences, currentProduct.id],
  );

  return (
    <div className="px-6 py-5">
      <PageHeader
        crumb={{ parent: { label: "Discovery", href: "/dashboard" }, title: "Evidências" }}
        title="Evidências"
        count={`${items.length} evidências`}
        onCreate={() => {
          const ev = createEvidence(currentProduct.id);
          router.push(`/evidencias/${ev.id}?new=1`);
        }}
        createLabel="Nova evidência"
      />

      <div className="mt-5">
        {items.length === 0 ? (
          <EmptyState
            title="Nenhuma evidência ainda"
            hint="Evidências nascem dos experimentos."
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
                  <th className="px-4 py-3 font-semibold">Evidência</th>
                  <th className="px-4 py-3 font-semibold">Tipo</th>
                  <th className="px-4 py-3 font-semibold">Origem</th>
                  <th className="px-4 py-3 font-semibold">Experimento</th>
                  <th className="px-4 py-3 font-semibold">Atualizada</th>
                </tr>
              </thead>
              <tbody>
                {items.map((ev) => {
                  const t = evidenceTypeConfig[ev.type];
                  const exp = ev.experimentId ? getExperiment(ev.experimentId) : undefined;
                  return (
                    <tr
                      key={ev.id}
                      className="cursor-pointer border-t transition-colors hover:bg-[#f9fafb]"
                      style={{ borderColor: "#f1f5f9" }}
                      onClick={() => router.push(`/evidencias/${ev.id}`)}
                    >
                      <td className="px-4 py-3 font-mono text-[12px] text-[#6b7280]">{ev.id}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-[#2b364a]">{ev.title}</div>
                        <div className="mt-0.5 line-clamp-1 text-[13px] text-[#9ca3af]">
                          {ev.notes}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="rounded px-1.5 py-0.5 text-[11px] font-semibold"
                          style={{ backgroundColor: `${t.color}15`, color: t.color }}
                        >
                          {t.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-[#4b5563]">{ev.source || "—"}</td>
                      <td className="px-4 py-3 text-[13px]">
                        {exp ? (
                          <Link
                            href={`/experimentos/${exp.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="font-mono text-[12px] text-[#13c8b5] hover:underline"
                          >
                            {exp.id}
                          </Link>
                        ) : (
                          <span className="text-[#cbd5e1]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[13px] text-[#6b7280]">
                        {formatDate(ev.updatedAt)}
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
