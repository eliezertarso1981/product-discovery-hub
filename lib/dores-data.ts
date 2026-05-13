export type PainStatus =
  | "identificada"
  | "investigando"
  | "priorizada"
  | "enderecada"
  | "resolvida"
  | "descartada";

export interface PersonaTag {
  id: string;
  initial: string;
  color: string;
}

export interface PainOwner {
  id: string;
  initials: string;
  color: string;
}

export interface Pain {
  id: string;
  title: string;
  description: string;
  status: PainStatus;
  severity: 1 | 2 | 3 | 4 | 5;
  reach: number;
  evidences: number;
  hypotheses: number;
  personas: PersonaTag[];
  owner: PainOwner;
}

export const personas: Record<string, PersonaTag> = {
  S: { id: "S", initial: "S", color: "#13c8b5" },
  E: { id: "E", initial: "E", color: "#7c3aed" },
  D: { id: "D", initial: "D", color: "#b45309" },
};

export const owners: Record<string, PainOwner> = {
  CM: { id: "CM", initials: "CM", color: "#13c8b5" },
  JC: { id: "JC", initials: "JC", color: "#ea580c" },
  AS: { id: "AS", initials: "AS", color: "#13c8b5" },
};

export const statusConfig: Record<PainStatus, { label: string; dot: string; accent?: string }> = {
  identificada: { label: "Identificada", dot: "#9ca3af" },
  investigando: { label: "Investigando", dot: "#3b82f6" },
  priorizada: { label: "Priorizada", dot: "#8b5cf6" },
  enderecada: { label: "Endereçada", dot: "#f59e0b", accent: "#f59e0b" },
  resolvida: { label: "Resolvida", dot: "#16a34a" },
  descartada: { label: "Descartada", dot: "#cbd5e1" },
};

export const boardColumns: PainStatus[] = [
  "identificada",
  "investigando",
  "priorizada",
  "enderecada",
];

export const initialPains: Pain[] = [
  {
    id: "PN-04",
    title: "Performance ruim no mobile gera abandono",
    description: "Timeline carrega em 8s no mobile. 78% abandonam em <30s.",
    status: "identificada",
    severity: 4,
    reach: 280,
    evidences: 4,
    hypotheses: 1,
    personas: [personas.S, personas.E],
    owner: owners.CM,
  },
  {
    id: "PN-07",
    title: "Falta exportação de roadmap para PowerPoint",
    description:
      "PMs precisam apresentar roadmap pra liderança e gastam tempo refazendo slides manualmente.",
    status: "identificada",
    severity: 2,
    reach: 95,
    evidences: 3,
    hypotheses: 0,
    personas: [personas.E],
    owner: owners.JC,
  },
  {
    id: "PN-09",
    title: "Convites para workspace expiram silenciosamente",
    description:
      "Admin convida membro e o link expira em 24h sem aviso. Membro recebe erro genérico.",
    status: "identificada",
    severity: 2,
    reach: 40,
    evidences: 2,
    hypotheses: 0,
    personas: [personas.S],
    owner: owners.AS,
  },
  {
    id: "PN-03",
    title: "Falta de relatórios executivos prontos",
    description:
      "Liderança quer reports mensais, e PMs montam manualmente em PowerPoint. Esforço de 4–6h/mês por PM.",
    status: "investigando",
    severity: 4,
    reach: 150,
    evidences: 6,
    hypotheses: 1,
    personas: [personas.E],
    owner: owners.JC,
  },
  {
    id: "PN-05",
    title: "Difícil rastrear quais decisões mudaram porque",
    description:
      'Mudanças de prioridade no roadmap acontecem mas o motivo se perde. Time pergunta "por que isso saiu?"',
    status: "investigando",
    severity: 3,
    reach: 110,
    evidences: 3,
    hypotheses: 0,
    personas: [personas.S, personas.E],
    owner: owners.AS,
  },
  {
    id: "PN-02",
    title: "Time-to-value alto pra novos clientes",
    description:
      "Novos clientes levam em média 2 semanas pra modelar estratégia inicial. Muitos abandonam antes.",
    status: "priorizada",
    severity: 4,
    reach: 180,
    evidences: 8,
    hypotheses: 2,
    personas: [personas.S],
    owner: owners.CM,
  },
  {
    id: "PN-08",
    title: "Sincronização com Jira perde contexto em loops longos",
    description: "Itens com sub-tarefas profundas no Jira chegam ao roadmap sem hierarquia clara.",
    status: "priorizada",
    severity: 3,
    reach: 220,
    evidences: 4,
    hypotheses: 1,
    personas: [personas.D],
    owner: owners.CM,
  },
  {
    id: "PN-01",
    title: "PMs perdem horas consolidando feedback de múltiplas fontes",
    description:
      "Feedback vive espalhado em Slack, email, Zendesk, Notion. PMs gastam até 4h/semana consolidando.",
    status: "enderecada",
    severity: 5,
    reach: 320,
    evidences: 9,
    hypotheses: 2,
    personas: [personas.S, personas.E],
    owner: owners.AS,
  },
  {
    id: "PN-11",
    title: "Edição de bar no roadmap perdia datas ao salvar",
    description: "Bug. Ao editar e salvar, datas voltavam ao estado anterior.",
    status: "resolvida",
    severity: 2,
    reach: 60,
    evidences: 3,
    hypotheses: 1,
    personas: [personas.S],
    owner: owners.CM,
  },
  {
    id: "PN-06",
    title: "Falta integração com algumas ferramentas de nicho",
    description: "Pedidos esporádicos de integrações com tools de pequena adoção.",
    status: "descartada",
    severity: 1,
    reach: 30,
    evidences: 1,
    hypotheses: 0,
    personas: [personas.E],
    owner: owners.AS,
  },
];
