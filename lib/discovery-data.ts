import type { PainOwner } from "./dores-data";

export type HypothesisStatus = "rascunho" | "em_teste" | "validada" | "invalidada";
export type ExperimentStatus = "planejado" | "em_andamento" | "concluido" | "cancelado";
export type ExperimentResult = "valida" | "invalida" | "inconclusivo" | null;
export type RoadmapStatus = "now" | "next" | "later" | "concluido";
export type EvidenceType = "entrevista" | "metrica" | "suporte" | "nps" | "outro";

export interface Hypothesis {
  id: string;
  productId: string;
  painId?: string;
  title: string;
  statement: string;
  status: HypothesisStatus;
  owner: PainOwner;
  createdAt: string;
  updatedAt: string;
}

export interface Experiment {
  id: string;
  productId: string;
  hypothesisId?: string;
  title: string;
  description: string;
  method: string;
  status: ExperimentStatus;
  result: ExperimentResult;
  owner: PainOwner;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Evidence {
  id: string;
  productId: string;
  experimentId?: string;
  title: string;
  source: string;
  type: EvidenceType;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoadmapItem {
  id: string;
  productId: string;
  painId?: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  owner: PainOwner;
  targetDate?: string;
  createdAt: string;
  updatedAt: string;
}

export const hypothesisStatusConfig: Record<HypothesisStatus, { label: string; dot: string }> = {
  rascunho: { label: "Rascunho", dot: "#9ca3af" },
  em_teste: { label: "Em teste", dot: "#3b82f6" },
  validada: { label: "Validada", dot: "#16a34a" },
  invalidada: { label: "Invalidada", dot: "#ef4444" },
};

export const experimentStatusConfig: Record<ExperimentStatus, { label: string; dot: string }> = {
  planejado: { label: "Planejado", dot: "#9ca3af" },
  em_andamento: { label: "Em andamento", dot: "#3b82f6" },
  concluido: { label: "Concluído", dot: "#16a34a" },
  cancelado: { label: "Cancelado", dot: "#cbd5e1" },
};

export const experimentResultConfig: Record<
  Exclude<ExperimentResult, null>,
  { label: string; color: string }
> = {
  valida: { label: "Valida hipótese", color: "#16a34a" },
  invalida: { label: "Invalida hipótese", color: "#ef4444" },
  inconclusivo: { label: "Inconclusivo", color: "#9ca3af" },
};

export const roadmapStatusConfig: Record<RoadmapStatus, { label: string; dot: string }> = {
  now: { label: "Now", dot: "#13c8b5" },
  next: { label: "Next", dot: "#3b82f6" },
  later: { label: "Later", dot: "#9ca3af" },
  concluido: { label: "Concluído", dot: "#16a34a" },
};

export const evidenceTypeConfig: Record<EvidenceType, { label: string; color: string }> = {
  entrevista: { label: "Entrevista", color: "#7c3aed" },
  metrica: { label: "Métrica", color: "#0891b2" },
  suporte: { label: "Ticket/Suporte", color: "#ea580c" },
  nps: { label: "NPS", color: "#16a34a" },
  outro: { label: "Outro", color: "#9ca3af" },
};

export const hypothesisStatuses: HypothesisStatus[] = [
  "rascunho",
  "em_teste",
  "validada",
  "invalidada",
];
export const experimentStatuses: ExperimentStatus[] = [
  "planejado",
  "em_andamento",
  "concluido",
  "cancelado",
];
export const roadmapStatuses: RoadmapStatus[] = ["now", "next", "later", "concluido"];
export const evidenceTypes: EvidenceType[] = ["entrevista", "metrica", "suporte", "nps", "outro"];
