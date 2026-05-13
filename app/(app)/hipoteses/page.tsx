"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDiscovery } from "@/lib/discovery-store";
import { useDores } from "@/lib/dores-store";
import { useProducts } from "@/lib/products-context";
import { hypothesisStatusConfig } from "@/lib/discovery-data";
import { PageHeader, EmptyState, formatDate } from "@/components/shared/crud-ui";
import { Avatar } from "@/components/shared/avatar";

export default function HipotesesPage() {
  const router = useRouter();
  const { currentProduct } = useProducts();
  const { hypotheses, createHypothesis, experimentsByHypothesis } = useDiscovery();
  const { getPain } = useDores();
  const items = useMemo(
    () => hypotheses.filter((h) => h.productId === currentProduct.id),
    [hypotheses, currentProduct.id],
  );

  return (
    <div className="px-6 py-5">
      <PageHeader
        crumb={{ parent: { label: "Discovery", href: "/dashboard" }, title: "Hipóteses" }}
        title="Hipóteses"
        count={`${items.length} hipóteses`}
        onCreate={() => {
          const h = createHypothesis(currentProduct.id);
          router.push(`/hipoteses/${h.id}?new=1`);
        }}
        createLabel="Nova hipótese"
      />

      <div className="mt-5">
        {items.length === 0 ? (
          <EmptyState
            title="Nenhuma hipótese ainda"
            hint="Hipóteses nascem a partir de uma dor. Comece criando uma."
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
                  <th className="px-4 py-3 font-semibold">Hipótese</th>
                  <th className="px-4 py-3 font-semibold">Dor de origem</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Experimentos</th>
                  <th className="px-4 py-3 font-semibold">Atualizada</th>
                  <th className="px-4 py-3 font-semibold">Owner</th>
                </tr>
              </thead>
              <tbody>
                {items.map((h) => {
                  const cfg = hypothesisStatusConfig[h.status];
                  const pain = h.painId ? getPain(h.painId) : undefined;
                  const expCount = experimentsByHypothesis(h.id).length;
                  return (
                    <tr
                      key={h.id}
                      className="cursor-pointer border-t transition-colors hover:bg-[#f9fafb]"
                      style={{ borderColor: "#f1f5f9" }}
                      onClick={() => router.push(`/hipoteses/${h.id}`)}
                    >
                      <td className="px-4 py-3 font-mono text-[12px] text-[#6b7280]">{h.id}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-[#2b364a]">{h.title}</div>
                        <div className="mt-0.5 line-clamp-1 text-[13px] text-[#9ca3af]">
                          {h.statement}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[13px]">
                        {pain ? (
                          <Link
                            href={`/dores/${pain.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="font-mono text-[12px] text-[#13c8b5] hover:underline"
                          >
                            {pain.id}
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
                      <td className="px-4 py-3 font-mono text-[13px] text-[#4b5563]">{expCount}</td>
                      <td className="px-4 py-3 text-[13px] text-[#6b7280]">
                        {formatDate(h.updatedAt)}
                      </td>
                      <td className="px-4 py-3">
                        <Avatar initials={h.owner.initials} color={h.owner.color} size={24} />
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
