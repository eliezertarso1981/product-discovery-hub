"use client";

import {
  LayoutGrid,
  Columns3,
  Target,
  Lightbulb,
  AlertCircle,
  FlaskConical,
  Beaker,
  Map,
  Users,
  Settings,
} from "lucide-react";
import { NavItem } from "./nav-item";

export function SidebarMenu({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 pb-4">
      <div className="space-y-1">
        <NavItem href="/dashboard" icon={LayoutGrid} label="Home" collapsed={collapsed} />
      </div>

      <Group title="Estratégia" collapsed={collapsed}>
        <NavItem href="/pilares" icon={Columns3} label="Pilares" collapsed={collapsed} />
        <NavItem href="/okrs" icon={Target} label="OKRs" collapsed={collapsed} />
      </Group>

      <Group title="Discovery" collapsed={collapsed}>
        <NavItem href="/evidencias" icon={Lightbulb} label="Evidências" collapsed={collapsed} />
        <NavItem href="/dores" icon={AlertCircle} label="Dores" badge={12} collapsed={collapsed} />
        <NavItem href="/hipoteses" icon={FlaskConical} label="Hipóteses" collapsed={collapsed} />
        <NavItem href="/experimentos" icon={Beaker} label="Experimentos" collapsed={collapsed} />
      </Group>

      <Group title="Delivery" collapsed={collapsed}>
        <NavItem href="/roadmap" icon={Map} label="Roadmap" collapsed={collapsed} />
        <NavItem href="/outcomes" icon={Target} label="Outcomes" collapsed={collapsed} />
      </Group>

      <div className="my-4 h-px" style={{ backgroundColor: "#e5e7eb" }} />
      <div className="space-y-1">
        <NavItem href="/personas" icon={Users} label="Personas" collapsed={collapsed} />
        <NavItem href="/settings" icon={Settings} label="Settings" collapsed={collapsed} />
      </div>
    </nav>
  );
}

function Group({
  title,
  children,
  collapsed,
}: {
  title: string;
  children: React.ReactNode;
  collapsed?: boolean;
}) {
  return (
    <div className="mt-6">
      {!collapsed && (
        <div
          className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: "#9ca3af" }}
        >
          {title}
        </div>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}
