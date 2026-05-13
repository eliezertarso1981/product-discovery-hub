import { Search, Plus, Bell, ChevronDown } from "lucide-react";
import { Avatar } from "@/components/shared/avatar";
import { currentUser } from "@/lib/mock-data";

export function Topbar() {
  return (
    <header
      className="flex h-14 items-center gap-4 border-b px-6"
      style={{ borderColor: "#e5e7eb", backgroundColor: "#ffffff" }}
    >
      <div className="flex-1 flex justify-center">
        <div
          className="flex w-full max-w-xl items-center gap-2 rounded-lg border px-3 py-1.5"
          style={{ borderColor: "#e5e7eb", backgroundColor: "#f9fafb" }}
        >
          <Search size={16} color="#9ca3af" />
          <input
            type="text"
            placeholder="Buscar ou usar comando…"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#2b364a" }}
          />
          <kbd
            className="rounded px-1.5 py-0.5 text-[11px] font-medium"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", color: "#6b7280" }}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      <button
        className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#13c8b5" }}
      >
        <Plus size={16} />
        Novo
        <ChevronDown size={14} />
      </button>

      <button
        className="relative rounded-lg p-2 transition-colors hover:bg-[#f3f4f6]"
        aria-label="Notificações"
      >
        <Bell size={18} color="#4b5563" />
        <span
          className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full"
          style={{ backgroundColor: "#ef4444" }}
        />
      </button>

      <Avatar initials={currentUser.initials} color="#13c8b5" size={32} />
    </header>
  );
}
