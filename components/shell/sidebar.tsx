"use client";

import { useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { SidebarMenu } from "./sidebar-menu";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { UserCard } from "./user-card";
import { LogoutButton } from "./logout-button";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const width = collapsed ? 76 : 280;

  return (
    <aside
      className="relative flex h-screen flex-col border-r transition-[width] duration-200"
      style={{ backgroundColor: "#f7f8fa", borderColor: "#e5e7eb", width }}
    >
      <button
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border shadow-sm transition-colors hover:bg-[#f9fafb]"
        style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb", color: "#6b7280" }}
      >
        {collapsed ? <ChevronsRight size={14} /> : <ChevronsLeft size={14} />}
      </button>

      <div className="p-3">
        <WorkspaceSwitcher collapsed={collapsed} />
      </div>

      <SidebarMenu collapsed={collapsed} />

      <div className="border-t p-3 space-y-1" style={{ borderColor: "#e5e7eb" }}>
        <LogoutButton collapsed={collapsed} />
        <UserCard collapsed={collapsed} />
      </div>
    </aside>
  );
}
