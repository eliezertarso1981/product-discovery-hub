# Plano — Dashboard SaaS de Product Discovery

## Etapa 1 — Migração do projeto para Next.js 15

Reescrita do bootstrap (atualmente TanStack Start + Vite). Necessário porque o escopo todo assume App Router.

- Remover: `vite.config.ts`, `wrangler.jsonc`, `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/routeTree.gen.ts`, `src/routes/**`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`.
- Remover dependências: `@tanstack/*`, `vite`, `@vitejs/*`, `wrangler`, `tw-animate-css`.
- Instalar: `next@15`, `react@19`, `react-dom@19`, `@fontsource/geist-sans`, `@fontsource/geist-mono`, `lucide-react` (já existe), `tailwindcss@4`, `@tailwindcss/postcss`, `postcss`.
- Criar config Next: `next.config.ts`, `postcss.config.mjs`, `tsconfig.json` (Next preset), `app/globals.css` (Tailwind v4 import + reset mínimo, sem theme tokens).
- Atualizar `package.json` scripts: `dev`, `build`, `start`, `lint` para Next.
- Manter `src/components/ui/*` instalado mas **não importar** (pedido: sem shadcn). Não removo para não mexer fora do escopo de UI; se preferir, removo numa segunda passada.

## Etapa 2 — Estrutura de arquivos

```text
app/
  layout.tsx                 // <html>, Geist no body, sem providers
  page.tsx                   // redirect("/dashboard")
  globals.css                // tailwind v4, reset
  (app)/
    layout.tsx               // shell: <Sidebar/> + <Topbar/> + {children}
    dashboard/page.tsx
    pilares/page.tsx
    okrs/page.tsx
    evidencias/page.tsx
    dores/page.tsx
    hipoteses/page.tsx
    experimentos/page.tsx
    roadmap/page.tsx
    outcomes/page.tsx
    personas/page.tsx
    settings/page.tsx
components/
  shell/
    sidebar.tsx
    topbar.tsx
    nav-item.tsx
    workspace-switcher.tsx
    user-card.tsx
  shared/
    avatar.tsx
    placeholder-page.tsx
  dashboard/
    dashboard-header.tsx
    metric-tile.tsx
    funnel-view.tsx
    recent-activity.tsx
    upcoming-measurements.tsx
    health-signals.tsx
lib/
  mock-data.ts
  entity-config.ts
```

Login: pulado (conforme resposta). `app/page.tsx` redireciona direto para `/dashboard`.

## Etapa 3 — Design system (sem tokens, HEX literal)

Paleta fixada nos componentes (estilo inline ou classes arbitrárias `bg-[#13c8b5]`):

- Turquesa primária: `#13c8b5`
- Turquesa sutil (ativo sidebar): `#e6f8f5`
- Texto principal: `#2b364a`
- Texto secundário: `#6b7280`
- Bordas: `#e5e7eb`
- Sidebar bg: `#f7f8fa`
- Canvas bg: `#ffffff`
- Warning: `#f59e0b` / bg `#fff7ed`
- Danger: `#ef4444` / bg `#fef2f2`
- Avatares: paleta fixa por iniciais

Regras: max `font-semibold`, max `rounded-2xl` (16px), sem emoji, ícones só Lucide.

## Etapa 4 — Componentes

**Shell**
- `Sidebar` 280px fixo, fundo `#f7f8fa`, grupos: Estratégia (Pilares, OKRs), Discovery (Evidências, Dores [badge 12], Hipóteses, Experimentos), Delivery (Roadmap, Outcomes), e fora de grupo: Personas, Settings. Topo: `WorkspaceSwitcher` (Acme Product Team / 12 membros). Rodapé: `UserCard` (Eliezer Silva).
- `NavItem` recebe `href`, `icon`, `label`, `badge?`. Usa `usePathname` para estado ativo (barra esquerda turquesa + bg `#e6f8f5` + texto `#13c8b5`).
- `Topbar` 56px: busca central com `⌘K`, botão `+ Novo` turquesa, sino com dot, avatar.

**Shared**
- `Avatar` com initials e cor derivada.
- `PlaceholderPage` com título centralizado e subtítulo "Em breve".

**Dashboard**
- `DashboardHeader`: "Bom dia, Eliezer" + subtítulo + seletor "Esta semana".
- `MetricTile`: label, valor, delta com ícone Lucide.
- `FunnelView`: 8 estágios horizontais com chevrons entre eles + alerta de gargalo.
- `RecentActivity`: lista com ícone por tipo de entidade.
- `UpcomingMeasurements`: lista com badges de prazo (em N dias / vencido).
- `HealthSignals`: 3 indicadores (taxa invalidação com barra, idade média, cobertura).

## Etapa 5 — Mock data

`lib/entity-config.ts` mapeia entidade → `{ icon, color, label }` para evidence / pain / hypothesis / experiment / roadmap / outcome.

`lib/mock-data.ts` exporta: `currentUser`, `workspace`, `kpis`, `funnel`, `recentActivity`, `upcomingMeasurements`, `healthSignals` — valores idênticos aos prints anexados.

## Etapa 6 — Validação

- `npm run dev`, conferir `/` → `/dashboard`, sidebar com item ativo correto em cada placeholder, layout desktop bate com os screenshots fornecidos.

## O que NÃO entra nesta etapa

- Login, dark mode, drawer mobile, auth real, APIs, persistência, formulários funcionais, remoção de shadcn/ui já instalado.

## Detalhes técnicos

- Tailwind v4 via `@import "tailwindcss"` em `app/globals.css`, sem `@theme` customizado (pedido: sem tokens).
- Geist via `@fontsource/geist-sans` + `@fontsource/geist-mono` importados no `app/layout.tsx`, aplicados como `font-family` no body.
- Path alias `@/*` → raiz.
- `app/(app)/layout.tsx` é Server Component; `Sidebar`/`Topbar` viram Client Components (usam `usePathname`).
