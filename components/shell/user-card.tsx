import { MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/shared/avatar";
import { currentUser } from "@/lib/mock-data";

export function UserCard() {
  return (
    <div className="flex items-center gap-3 rounded-lg p-2">
      <Avatar initials={currentUser.initials} color="#13c8b5" size={36} />
      <div className="flex-1 min-w-0">
        <div className="truncate text-sm font-semibold" style={{ color: "#2b364a" }}>
          {currentUser.name}
        </div>
        <div className="truncate text-xs" style={{ color: "#6b7280" }}>
          {currentUser.email}
        </div>
      </div>
      <button
        className="rounded-md p-1 transition-colors hover:bg-white"
        aria-label="Mais opções"
      >
        <MoreHorizontal size={16} color="#6b7280" />
      </button>
    </div>
  );
}
