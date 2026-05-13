"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Download } from "lucide-react";

interface CrumbProps {
  parent?: { label: string; href: string };
  title: string;
}

export function PageHeader({
  crumb,
  title,
  count,
  onCreate,
  createLabel = "Novo",
}: {
  crumb: CrumbProps;
  title: string;
  count?: string;
  onCreate?: () => void;
  createLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="text-[13px]" style={{ color: "#9ca3af" }}>
          {crumb.parent && (
            <>
              <Link href={crumb.parent.href} className="hover:underline">
                {crumb.parent.label}
              </Link>
              <span className="mx-1">›</span>
            </>
          )}
          <span style={{ color: "#4b5563" }}>{crumb.title}</span>
        </div>
        <h1
          className="mt-1 text-[28px] font-semibold tracking-tight"
          style={{ color: "#2b364a" }}
        >
          {title}
        </h1>
        {count && (
          <div className="mt-1 font-mono text-[13px]" style={{ color: "#6b7280" }}>
            {count}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[13px] hover:bg-[#f9fafb]"
          style={{ borderColor: "#e5e7eb", color: "#4b5563" }}
        >
          <Download size={14} /> Exportar
        </button>
        {onCreate && (
          <button
            onClick={onCreate}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#13c8b5" }}
          >
            <Plus size={14} /> {createLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div
      className="rounded-xl border p-10 text-center"
      style={{ borderColor: "#e5e7eb", color: "#9ca3af" }}
    >
      <p className="text-[14px] font-semibold text-[#4b5563]">{title}</p>
      {hint && <p className="mt-1 text-[12px]">{hint}</p>}
    </div>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-[13px] text-[#6b7280] hover:text-[#2b364a]"
    >
      ← {label}
    </Link>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
        {label}
      </div>
      {children}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-md border bg-white px-2.5 py-1.5 text-[13px] text-[#2b364a] outline-none focus:border-[#13c8b5] " +
        (props.className ?? "")
      }
      style={{ borderColor: "#e5e7eb", ...props.style }}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={
        "w-full rounded-md border bg-white px-3 py-2 text-[14px] text-[#2b364a] outline-none focus:border-[#13c8b5] " +
        (props.className ?? "")
      }
      style={{ borderColor: "#e5e7eb", ...props.style }}
    />
  );
}

export function Select<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; dot?: string }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className="flex items-center justify-between rounded-md border px-2.5 py-1.5 text-[13px] hover:bg-[#f9fafb]"
            style={{
              borderColor: active ? "#13c8b5" : "#e5e7eb",
              backgroundColor: active ? "#f4fdfb" : "white",
            }}
          >
            <span className="inline-flex items-center gap-2 text-[#2b364a]">
              {o.dot && (
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: o.dot }} />
              )}
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function useCrudRouter() {
  return useRouter();
}

export function formatDate(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateOnly(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR");
}
