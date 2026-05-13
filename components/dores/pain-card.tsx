"use client";

import { AlertCircle, Users, Lightbulb, FlaskConical, GripVertical } from "lucide-react";
import type { Pain } from "@/lib/dores-data";
import { Avatar } from "@/components/shared/avatar";
import { SeverityDots } from "./severity-dots";
import { PersonaStack } from "./persona-chip";

interface Props {
  pain: Pain;
  selected?: boolean;
  dragging?: boolean;
  onSelect?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
}

export function PainCard({ pain, selected, dragging, onSelect, onDragStart, onDragEnd }: Props) {
  const baseBorder = selected ? "#13c8b5" : "#e5e7eb";
  const baseBg = selected ? "#f4fdfb" : "#ffffff";

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onSelect}
      className="group relative cursor-grab rounded-lg border p-3 transition-all hover:-translate-y-px hover:shadow-sm active:cursor-grabbing"
      style={{
        backgroundColor: baseBg,
        borderColor: baseBorder,
        opacity: dragging ? 0.95 : 1,
        transform: dragging ? "rotate(2deg)" : undefined,
        boxShadow: dragging
          ? "0 16px 32px -12px rgba(15,20,25,0.18)"
          : undefined,
      }}
    >
      <span
        className="absolute left-1 top-2 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ color: "#9ca3af" }}
        aria-hidden
      >
        <GripVertical size={12} />
      </span>

      <div className="flex items-center justify-between">
        <div
          className="inline-flex items-center gap-1.5 font-mono text-[12px]"
          style={{ color: "#6b7280" }}
        >
          <AlertCircle size={13} />
          {pain.id}
        </div>
        <SeverityDots level={pain.severity} />
      </div>

      <h3
        className="mt-2 text-[14px] font-semibold leading-snug"
        style={{ color: "#2b364a" }}
      >
        {pain.title}
      </h3>

      <p
        className="mt-1.5 text-[13px] leading-snug"
        style={{ color: "#6b7280" }}
      >
        {pain.description}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-[11px] uppercase tracking-wider" style={{ color: "#9ca3af" }}>
          Afeta:
        </span>
        <PersonaStack personas={pain.personas} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-3 font-mono text-[12px]" style={{ color: "#6b7280" }}>
          <span className="inline-flex items-center gap-1">
            <Users size={12} /> {pain.reach}
          </span>
          <span className="inline-flex items-center gap-1">
            <Lightbulb size={12} /> {pain.evidences}
          </span>
          <span className="inline-flex items-center gap-1">
            <FlaskConical size={12} /> {pain.hypotheses}
          </span>
        </div>
        <Avatar initials={pain.owner.initials} color={pain.owner.color} size={22} />
      </div>
    </div>
  );
}
