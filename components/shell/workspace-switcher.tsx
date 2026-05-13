import { ChevronsUpDown } from "lucide-react";
import { workspace } from "@/lib/mock-data";

export function WorkspaceSwitcher() {
  return (
    <button
      className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-white"
      style={{ color: "#2b364a" }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold text-white"
        style={{ backgroundColor: "#2b364a" }}
      >
        {workspace.initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="truncate text-sm font-semibold">{workspace.name}</div>
        <div className="text-xs" style={{ color: "#6b7280" }}>
          {workspace.members} membros
        </div>
      </div>
      <ChevronsUpDown size={16} color="#6b7280" />
    </button>
  );
}
