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
import { WorkspaceSwitcher } from "./workspace-switcher";
import { UserCard } from "./user-card";

export function Sidebar() {
  return (
    <aside
      className="flex h-screen w-[280px] flex-col border-r"
      style={{ backgroundColor: "#f7f8fa", borderColor: "#e5e7eb" }}
    >
      <div className="p-3">
        <WorkspaceSwitcher />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="space-y-1">
          <NavItem href="/dashboard" icon={LayoutGrid} label="Home" />
        </div>

        <Group title="Estratégia">
          <NavItem href="/pilares" icon={Columns3} label="Pilares" />
          <NavItem href="/okrs" icon={Target} label="OKRs" />
        </Group>

        <Group title="Discovery">
          <NavItem href="/evidencias" icon={Lightbulb} label="Evidências" />
          <NavItem href="/dores" icon={AlertCircle} label="Dores" badge={12} />
          <NavItem href="/hipoteses" icon={FlaskConical} label="Hipóteses" />
          <NavItem href="/experimentos" icon={Beaker} label="Experimentos" />
        </Group>

        <Group title="Delivery">
          <NavItem href="/roadmap" icon={Map} label="Roadmap" />
          <NavItem href="/outcomes" icon={Target} label="Outcomes" />
        </Group>

        <div
          className="my-4 h-px"
          style={{ backgroundColor: "#e5e7eb" }}
        />
        <div className="space-y-1">
          <NavItem href="/personas" icon={Users} label="Personas" />
          <NavItem href="/settings" icon={Settings} label="Settings" />
        </div>
      </nav>

      <div className="border-t p-3" style={{ borderColor: "#e5e7eb" }}>
        <UserCard />
      </div>
    </aside>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <div
        className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: "#9ca3af" }}
      >
        {title}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
