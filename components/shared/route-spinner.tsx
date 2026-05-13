export function RouteSpinner({ label = "Carregando…" }: { label?: string }) {
  return (
    <div
      className="flex h-full min-h-[60vh] w-full flex-col items-center justify-center gap-3"
      role="status"
      aria-live="polite"
    >
      <span
        className="inline-block h-9 w-9 animate-spin rounded-full border-[3px]"
        style={{
          borderColor: "#e5e7eb",
          borderTopColor: "#13c8b5",
        }}
      />
      <span className="text-[13px] font-medium" style={{ color: "#6b7280" }}>
        {label}
      </span>
    </div>
  );
}
