"use client";

import { use, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Trash2, Plus, Check, X } from "lucide-react";
import { useDiscovery } from "@/lib/discovery-store";
import {
  experimentStatusConfig,
  experimentStatuses,
  experimentResultConfig,
  evidenceTypeConfig,
} from "@/lib/discovery-data";
import {
  BackLink,
  Field,
  Select,
  Textarea,
  TextInput,
  formatDate,
  formatDateOnly,
} from "@/components/shared/crud-ui";

export default function ExperimentDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = useSearchParams().get("new") === "1";
  const {
    ready,
    getExperiment,
    updateExperiment,
    deleteExperiment,
    setExperimentResult,
    getHypothesis,
    evidencesByExperiment,
    createEvidence,
  } = useDiscovery();

  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isNew) {
      titleRef.current?.focus();
      titleRef.current?.select();
    }
  }, [isNew]);

  if (!ready) return <div className="px-6 py-10 text-[#9ca3af]">Carregando...</div>;
  const exp = getExperiment(id);
  if (!exp)
    return (
      <div className="px-6 py-10">
        <Link href="/experimentos" className="text-[#13c8b5] hover:underline">
          ← Voltar
        </Link>
        <p className="mt-3 text-[#4b5563]">Experimento não encontrado.</p>
      </div>
    );

  const hyp = exp.hypothesisId ? getHypothesis(exp.hypothesisId) : undefined;
  const evidences = evidencesByExperiment(exp.id);

  return (
    <div className="px-6 py-5">
      <div className="mb-4 flex items-center justify-between">
        <BackLink href="/experimentos" label="Experimentos" />
        <button
          onClick={() => {
            if (confirm("Excluir este experimento?")) {
              deleteExperiment(exp.id);
              router.push("/experimentos");
            }
          }}
          className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[12px] text-[#ef4444] hover:bg-[#fef2f2]"
          style={{ borderColor: "#fecaca" }}
        >
          <Trash2 size={13} /> Excluir
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="font-mono text-[12px] text-[#9ca3af]">{exp.id}</div>
          <input
            ref={titleRef}
            value={exp.title}
            onChange={(e) => updateExperiment(exp.id, { title: e.target.value })}
            className="mt-1 w-full border-0 bg-transparent text-[24px] font-semibold tracking-tight text-[#2b364a] outline-none focus:bg-[#f9fafb] focus:px-2 focus:py-1"
          />

          <div className="mt-6">
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
              Descrição
            </div>
            <Textarea
              rows={3}
              value={exp.description}
              onChange={(e) => updateExperiment(exp.id, { description: e.target.value })}
              placeholder="O que vamos testar e por quê."
            />
          </div>

          <div className="mt-4">
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
              Método
            </div>
            <Textarea
              rows={2}
              value={exp.method}
              onChange={(e) => updateExperiment(exp.id, { method: e.target.value })}
              placeholder="Concierge MVP, A/B test, fake door, entrevistas, etc."
            />
          </div>

          <div className="mt-6 rounded-lg border p-4" style={{ borderColor: "#e5e7eb" }}>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
              Resultado
            </div>
            <p className="mb-3 text-[12px] text-[#6b7280]">
              Definir o resultado conclui o experimento e atualiza o status da hipótese vinculada.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setExperimentResult(exp.id, "valida")}
                className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[12px] hover:bg-[#f0fdf4]"
                style={{
                  borderColor: exp.result === "valida" ? "#16a34a" : "#e5e7eb",
                  color: "#16a34a",
                }}
              >
                <Check size={13} /> Valida hipótese
              </button>
              <button
                onClick={() => setExperimentResult(exp.id, "invalida")}
                className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[12px] hover:bg-[#fef2f2]"
                style={{
                  borderColor: exp.result === "invalida" ? "#ef4444" : "#e5e7eb",
                  color: "#ef4444",
                }}
              >
                <X size={13} /> Invalida hipótese
              </button>
              <button
                onClick={() => setExperimentResult(exp.id, "inconclusivo")}
                className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[12px] text-[#6b7280] hover:bg-[#f9fafb]"
                style={{ borderColor: exp.result === "inconclusivo" ? "#9ca3af" : "#e5e7eb" }}
              >
                Inconclusivo
              </button>
            </div>
            {exp.result && (
              <p
                className="mt-3 text-[13px] font-semibold"
                style={{ color: experimentResultConfig[exp.result].color }}
              >
                {experimentResultConfig[exp.result].label}
              </p>
            )}
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
                Evidências geradas ({evidences.length})
              </div>
              <button
                onClick={() => {
                  const ev = createEvidence(exp.productId, exp.id);
                  router.push(`/evidencias/${ev.id}?new=1`);
                }}
                className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] text-[#4b5563] hover:bg-[#f9fafb]"
                style={{ borderColor: "#e5e7eb" }}
              >
                <Plus size={12} /> Nova evidência
              </button>
            </div>
            {evidences.length === 0 ? (
              <p className="text-[13px] text-[#9ca3af]">Sem evidências ainda.</p>
            ) : (
              <ul className="space-y-1.5">
                {evidences.map((ev) => {
                  const t = evidenceTypeConfig[ev.type];
                  return (
                    <li key={ev.id}>
                      <Link
                        href={`/evidencias/${ev.id}`}
                        className="flex items-center justify-between rounded-md border bg-white px-2.5 py-2 text-[13px] hover:bg-[#f9fafb]"
                        style={{ borderColor: "#e5e7eb" }}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="font-mono text-[11px] text-[#9ca3af]">{ev.id}</span>
                          <span className="truncate text-[#2b364a]">{ev.title}</span>
                        </span>
                        <span
                          className="rounded px-1.5 py-0.5 text-[11px] font-semibold"
                          style={{ backgroundColor: `${t.color}15`, color: t.color }}
                        >
                          {t.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <aside className="space-y-5">
          <Field label="Status">
            <Select
              value={exp.status}
              onChange={(s) => updateExperiment(exp.id, { status: s })}
              options={experimentStatuses.map((s) => ({
                value: s,
                label: experimentStatusConfig[s].label,
                dot: experimentStatusConfig[s].dot,
              }))}
            />
          </Field>

          <Field label="Hipótese">
            {hyp ? (
              <Link
                href={`/hipoteses/${hyp.id}`}
                className="block rounded-md border bg-white p-2.5 text-[13px] hover:bg-[#f9fafb]"
                style={{ borderColor: "#e5e7eb" }}
              >
                <div className="font-mono text-[11px] text-[#9ca3af]">{hyp.id}</div>
                <div className="mt-0.5 text-[#2b364a]">{hyp.title}</div>
              </Link>
            ) : (
              <p className="text-[13px] text-[#9ca3af]">Sem hipótese vinculada.</p>
            )}
          </Field>

          <Field label="Início">
            <TextInput
              type="date"
              value={exp.startDate ? exp.startDate.slice(0, 10) : ""}
              onChange={(e) =>
                updateExperiment(exp.id, {
                  startDate: e.target.value ? new Date(e.target.value).toISOString() : undefined,
                })
              }
            />
          </Field>
          <Field label="Fim">
            <TextInput
              type="date"
              value={exp.endDate ? exp.endDate.slice(0, 10) : ""}
              onChange={(e) =>
                updateExperiment(exp.id, {
                  endDate: e.target.value ? new Date(e.target.value).toISOString() : undefined,
                })
              }
            />
          </Field>
          <Field label="Atualizado">
            <div className="text-[13px] text-[#4b5563]">{formatDate(exp.updatedAt)}</div>
          </Field>
        </aside>
      </div>
    </div>
  );
}
