"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
  collapsed?: boolean;
}

export function NavItem({ href, icon: Icon, label, badge, collapsed }: NavItemProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`relative flex items-center gap-3 rounded-lg py-2 text-sm transition-colors ${
        collapsed ? "justify-center px-2" : "px-3"
      }`}
      style={{
        backgroundColor: active ? "#e6f8f5" : "transparent",
        color: active ? "#13c8b5" : "#4b5563",
        fontWeight: active ? 600 : 500,
      }}
    >
      {active && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full"
          style={{ backgroundColor: "#13c8b5" }}
        />
      )}
      <Icon size={18} />
      {!collapsed && (
        <>
          <span className="flex-1">{label}</span>
          {badge !== undefined && (
            <span
              className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-md px-1.5 text-xs font-semibold"
              style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}
