"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Trash2,
  Paperclip,
  X,
  Send,
  Check,
  ChevronDown,
} from "lucide-react";
import {
  ownersList,
  severityColor,
  statusConfig,
  type PainAttachment,
  type PainOwner,
  type PainStatus,
  boardColumns,
} from "@/lib/dores-data";
import { useDores } from "@/lib/dores-store";
import { useDiscovery } from "@/lib/discovery-store";
import {
  hypothesisStatusConfig,
  roadmapStatusConfig,
} from "@/lib/discovery-data";
import { Plus } from "lucide-react";
import { Avatar } from "@/components/shared/avatar";

export default function PainDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "1";
  const { ready, getPain, updatePain, deletePain, addComment, addAttachments, removeAttachment } =
    useDores();
  const {
    hypothesesByPain,
    roadmapByPain,
    createHypothesis,
    createRoadmap,
  } = useDiscovery();

  const pain = getPain(id);
  const linkedHypotheses = pain ? hypothesesByPain(pain.id) : [];
  const linkedRoadmap = pain ? roadmapByPain(pain.id) : [];

  const titleInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isNew && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isNew]);

  if (!ready) {
    return <div className="px-6 py-10 text-[13px] text-[#9ca3af]">Carregando...</div>;
  }
  if (!pain) {
    return (
      <div className="px-6 py-10">
        <p className="text-[14px] text-[#4b5563]">Dor não encontrada.</p>
        <Link href="/dores" className="mt-3 inline-block text-[13px] text-[#13c8b5] hover:underline">
          ← Voltar para Dores
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-5">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/dores"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#6b7280] hover:text-[#2b364a]"
        >
          <ArrowLeft size={14} /> Dores
        </Link>
        <button
          onClick={() => {
            if (confirm("Excluir esta dor?")) {
              deletePain(pain.id);
              router.push("/dores");
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
          <div className="font-mono text-[12px] text-[#9ca3af]">{pain.id}</div>
          <input
            ref={titleInputRef}
            value={pain.title}
            onChange={(e) => updatePain(pain.id, { title: e.target.value })}
            placeholder="Título da dor"
            className="mt-1 w-full border-0 bg-transparent text-[24px] font-semibold tracking-tight text-[#2b364a] outline-none placeholder:text-[#cbd5e1] focus:bg-[#f9fafb] focus:px-2 focus:py-1"
          />

          <Section title="Descrição">
            <textarea
              value={pain.description}
              onChange={(e) => updatePain(pain.id, { description: e.target.value })}
              placeholder="Descreva o problema, contexto e impacto..."
              rows={5}
              className="w-full rounded-md border bg-white px-3 py-2 text-[14px] text-[#2b364a] outline-none transition-colors placeholder:text-[#cbd5e1] focus:border-[#13c8b5]"
              style={{ borderColor: "#e5e7eb" }}
            />
          </Section>

          <Section
            title={`Hipóteses geradas (${linkedHypotheses.length})`}
            action={
              <button
                onClick={() => {
                  const h = createHypothesis(pain.productId, pain.id);
                  router.push(`/hipoteses/${h.id}?new=1`);
                }}
                className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] text-[#4b5563] hover:bg-[#f9fafb]"
                style={{ borderColor: "#e5e7eb" }}
              >
                <Plus size={12} /> Nova hipótese
              </button>
            }
          >
            {linkedHypotheses.length === 0 ? (
              <p className="text-[13px] text-[#9ca3af]">Ainda não há hipóteses derivadas desta dor.</p>
            ) : (
              <ul className="space-y-1.5">
                {linkedHypotheses.map((h) => {
                  const cfg = hypothesisStatusConfig[h.status];
                  return (
                    <li key={h.id}>
                      <Link
                        href={`/hipoteses/${h.id}`}
                        className="flex items-center justify-between rounded-md border bg-white px-2.5 py-2 text-[13px] hover:bg-[#f9fafb]"
                        style={{ borderColor: "#e5e7eb" }}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="font-mono text-[11px] text-[#9ca3af]">{h.id}</span>
                          <span className="truncate text-[#2b364a]">{h.title}</span>
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] text-[#4b5563]">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cfg.dot }} />
                          {cfg.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </Section>

          {pain.status === "validada" && (
            <Section
              title={`Itens de roadmap (${linkedRoadmap.length})`}
              action={
                <button
                  onClick={() => {
                    const r = createRoadmap(pain.productId, pain.id);
                    router.push(`/roadmap/${r.id}?new=1`);
                  }}
                  className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] text-[#4b5563] hover:bg-[#f9fafb]"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <Plus size={12} /> Novo item
                </button>
              }
            >
              {linkedRoadmap.length === 0 ? (
                <p className="text-[13px] text-[#9ca3af]">Nenhum item de roadmap ainda.</p>
              ) : (
                <ul className="space-y-1.5">
                  {linkedRoadmap.map((r) => {
                    const cfg = roadmapStatusConfig[r.status];
                    return (
                      <li key={r.id}>
                        <Link
                          href={`/roadmap/${r.id}`}
                          className="flex items-center justify-between rounded-md border bg-white px-2.5 py-2 text-[13px] hover:bg-[#f9fafb]"
                          style={{ borderColor: "#e5e7eb" }}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <span className="font-mono text-[11px] text-[#9ca3af]">{r.id}</span>
                            <span className="truncate text-[#2b364a]">{r.title}</span>
                          </span>
                          <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] text-[#4b5563]">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cfg.dot }} />
                            {cfg.label}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Section>
          )}

          <Section title="Anexos">
            <Attachments
              attachments={pain.attachments}
              onAdd={(files) => addAttachments(pain.id, files)}
              onRemove={(attId) => removeAttachment(pain.id, attId)}
            />
          </Section>

          <Section title={`Comentários (${pain.comments.length})`}>
            <Comments
              comments={pain.comments}
              onAdd={(text) => addComment(pain.id, text)}
            />
          </Section>
        </div>

        <aside className="space-y-5">
          <Field label="Status">
            <StatusSelect
              value={pain.status}
              onChange={(s) => updatePain(pain.id, { status: s })}
            />
          </Field>

          <Field label="Severidade">
            <SeveritySelect
              value={pain.severity}
              onChange={(v) => updatePain(pain.id, { severity: v })}
            />
          </Field>

          <Field label="Responsáveis">
            <ResponsiblesSelect
              selected={pain.responsibles}
              onChange={(list) => updatePain(pain.id, { responsibles: list })}
            />
          </Field>

          <Field label="Criado em">
            <div className="text-[13px] text-[#4b5563]">{formatDate(pain.createdAt)}</div>
          </Field>
          <Field label="Última atualização">
            <div className="text-[13px] text-[#4b5563]">{formatDate(pain.updatedAt)}</div>
          </Field>
        </aside>
      </div>
    </div>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
        {title}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
        {label}
      </div>
      {children}
    </div>
  );
}

function StatusSelect({
  value,
  onChange,
}: {
  value: PainStatus;
  onChange: (s: PainStatus) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      {boardColumns.map((s) => {
        const cfg = statusConfig[s];
        const active = s === value;
        return (
          <button
            key={s}
            onClick={() => onChange(s)}
            className="flex items-center justify-between rounded-md border px-2.5 py-1.5 text-[13px] transition-colors hover:bg-[#f9fafb]"
            style={{
              borderColor: active ? "#13c8b5" : "#e5e7eb",
              backgroundColor: active ? "#f4fdfb" : "white",
            }}
          >
            <span className="inline-flex items-center gap-2 text-[#2b364a]">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cfg.dot }} />
              {cfg.label}
            </span>
            {active && <Check size={14} color="#13c8b5" />}
          </button>
        );
      })}
    </div>
  );
}

function SeveritySelect({
  value,
  onChange,
}: {
  value: 1 | 2 | 3 | 4 | 5;
  onChange: (v: 1 | 2 | 3 | 4 | 5) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {([1, 2, 3, 4, 5] as const).map((i) => {
        const filled = i <= value;
        const color = severityColor(value);
        return (
          <button
            key={i}
            onClick={() => onChange(i)}
            aria-label={`Severidade ${i}`}
            className="h-4 w-4 rounded-full border transition-transform hover:scale-110"
            style={{
              backgroundColor: filled ? color : "transparent",
              borderColor: filled ? color : "#d1d5db",
            }}
          />
        );
      })}
      <span className="ml-2 text-[12px] text-[#6b7280]">{value}/5</span>
    </div>
  );
}

function ResponsiblesSelect({
  selected,
  onChange,
}: {
  selected: PainOwner[];
  onChange: (list: PainOwner[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedIds = useMemo(() => new Set(selected.map((s) => s.id)), [selected]);

  const toggle = (o: PainOwner) => {
    if (selectedIds.has(o.id)) onChange(selected.filter((s) => s.id !== o.id));
    else onChange([...selected, o]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-md border bg-white px-2.5 py-1.5 text-[13px] hover:bg-[#f9fafb]"
        style={{ borderColor: "#e5e7eb" }}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          {selected.length === 0 && <span className="text-[#9ca3af]">Ninguém</span>}
          {selected.map((o) => (
            <span key={o.id} className="inline-flex items-center gap-1">
              <Avatar initials={o.initials} color={o.color} size={20} />
              <span className="text-[12px] text-[#4b5563]">{o.name ?? o.initials}</span>
            </span>
          ))}
        </div>
        <ChevronDown size={14} color="#9ca3af" />
      </button>
      {open && (
        <div
          className="absolute z-10 mt-1 w-full rounded-md border bg-white py-1 shadow-lg"
          style={{ borderColor: "#e5e7eb" }}
        >
          {ownersList.map((o) => {
            const isSel = selectedIds.has(o.id);
            return (
              <button
                key={o.id}
                onClick={() => toggle(o)}
                className="flex w-full items-center justify-between px-2.5 py-1.5 text-[13px] hover:bg-[#f9fafb]"
              >
                <span className="inline-flex items-center gap-2">
                  <Avatar initials={o.initials} color={o.color} size={22} />
                  <span className="text-[#2b364a]">{o.name ?? o.initials}</span>
                </span>
                {isSel && <Check size={14} color="#13c8b5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Attachments({
  attachments,
  onAdd,
  onRemove,
}: {
  attachments: PainAttachment[];
  onAdd: (files: PainAttachment[]) => void;
  onRemove: (attId: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const list: PainAttachment[] = [];
    for (const f of Array.from(files)) {
      const dataUrl = await new Promise<string | undefined>((resolve) => {
        if (f.size > 2 * 1024 * 1024) {
          resolve(undefined);
          return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => resolve(undefined);
        reader.readAsDataURL(f);
      });
      list.push({
        id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: f.name,
        size: f.size,
        type: f.type,
        dataUrl,
        addedAt: new Date().toISOString(),
      });
    }
    onAdd(list);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <button
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-1.5 rounded-md border border-dashed px-3 py-2 text-[13px] text-[#4b5563] hover:bg-[#f9fafb]"
        style={{ borderColor: "#cbd5e1" }}
      >
        <Paperclip size={14} /> Adicionar anexos
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {attachments.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {attachments.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between rounded-md border bg-white px-2.5 py-1.5 text-[13px]"
              style={{ borderColor: "#e5e7eb" }}
            >
              <div className="flex min-w-0 items-center gap-2">
                <Paperclip size={13} color="#9ca3af" />
                {a.dataUrl ? (
                  <a
                    href={a.dataUrl}
                    download={a.name}
                    className="truncate text-[#2b364a] hover:underline"
                  >
                    {a.name}
                  </a>
                ) : (
                  <span className="truncate text-[#2b364a]">{a.name}</span>
                )}
                <span className="shrink-0 text-[11px] text-[#9ca3af]">
                  {formatSize(a.size)}
                </span>
              </div>
              <button
                onClick={() => onRemove(a.id)}
                aria-label="Remover anexo"
                className="rounded p-1 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#ef4444]"
              >
                <X size={13} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Comments({
  comments,
  onAdd,
}: {
  comments: { id: string; author: PainOwner; text: string; createdAt: string }[];
  onAdd: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const submit = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };
  return (
    <div className="space-y-3">
      <ul className="space-y-3">
        {comments.length === 0 && (
          <li className="text-[13px] text-[#9ca3af]">Nenhum comentário ainda.</li>
        )}
        {comments.map((c) => (
          <li key={c.id} className="flex gap-2.5">
            <Avatar initials={c.author.initials} color={c.author.color} size={28} />
            <div className="flex-1 rounded-md border bg-white px-3 py-2" style={{ borderColor: "#e5e7eb" }}>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#2b364a]">
                  {c.author.name ?? c.author.initials}
                </span>
                <span className="text-[11px] text-[#9ca3af]">{formatDate(c.createdAt)}</span>
              </div>
              <p className="mt-1 whitespace-pre-wrap text-[13px] text-[#4b5563]">{c.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-end gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              submit();
            }
          }}
          rows={2}
          placeholder="Escreva um comentário... (⌘+Enter para enviar)"
          className="flex-1 rounded-md border bg-white px-3 py-2 text-[13px] outline-none placeholder:text-[#cbd5e1] focus:border-[#13c8b5]"
          style={{ borderColor: "#e5e7eb" }}
        />
        <button
          onClick={submit}
          disabled={!text.trim()}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "#13c8b5" }}
        >
          <Send size={13} /> Enviar
        </button>
      </div>
    </div>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
