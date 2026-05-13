import {
  FlaskConical,
  Lightbulb,
  AlertCircle,
  Beaker,
  Map,
  Target,
  type LucideIcon,
} from "lucide-react";

export type EntityType = "evidence" | "pain" | "hypothesis" | "experiment" | "roadmap" | "outcome";

export const entityConfig: Record<
  EntityType,
  { icon: LucideIcon; label: string; color: string; bg: string }
> = {
  evidence: { icon: Lightbulb, label: "Evidências", color: "#0891b2", bg: "#ecfeff" },
  pain: { icon: AlertCircle, label: "Dor", color: "#ea580c", bg: "#fff7ed" },
  hypothesis: { icon: FlaskConical, label: "Hipótese", color: "#7c3aed", bg: "#f5f3ff" },
  experiment: { icon: Beaker, label: "Experimento", color: "#0ea5e9", bg: "#f0f9ff" },
  roadmap: { icon: Map, label: "Roadmap", color: "#16a34a", bg: "#f0fdf4" },
  outcome: { icon: Target, label: "Outcome", color: "#13c8b5", bg: "#e6f8f5" },
};
