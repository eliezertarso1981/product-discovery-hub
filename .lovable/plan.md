# Plano — Tela de login mock

## Stack & restrições (mantidas da etapa anterior)

Next.js 15 App Router, TypeScript, Tailwind v4, Lucide, Geist. Sem shadcn/Radix. Cores HEX literais (sem tokens). Max `font-semibold`, max `rounded-2xl`. Login mock: qualquer email+senha vai para `/dashboard`. Botões Google/Microsoft só visuais.

## Estrutura de arquivos

```text
app/
  (auth)/
    layout.tsx              // sem Sidebar/Topbar; <html> já vem do app/layout.tsx
    login/page.tsx          // form + painel direito
    forgot-password/page.tsx// pede email
    check-email/page.tsx    // "Verifique seu email"
components/
  auth/
    auth-shell.tsx          // split desktop, single mobile, com toggle de tema
    brand-mark.tsx          // logo "Product" + "Gen" turquesa
    testimonial-panel.tsx   // painel direito dark com depoimento + clientes
    theme-toggle.tsx        // botão Sol/Lua, persiste em localStorage
    social-buttons.tsx      // Google + Microsoft (visuais)
    text-field.tsx          // input com ícone + erro + (opcional) toggle senha
lib/
  theme.ts                  // helpers do toggle (apply class no <html>)
```

`app/layout.tsx`: adicionar script inline pequeno que lê `localStorage.theme` e aplica `data-theme="dark"` no `<html>` antes do paint, evitando flash. Body troca cores via seletores CSS.

`app/globals.css`: além do reset, adicionar variáveis CSS escopadas em `[data-theme="dark"]` **apenas para a área de auth** — para não quebrar o resto do app que está em HEX literal puro. Alternativa mais simples: cada componente de auth recebe `theme` por prop e aplica HEX correspondente. Vou usar esta segunda via para respeitar a regra de "HEX literal sempre" e não introduzir tokens.

## Página `/login`

Layout split 1:1 desktop, single column mobile.

**Lado esquerdo — formulário (≈ 480px coluna):**
- Logo `BrandMark` no topo
- Título "Entrar" (font-semibold, ~36px) + subtítulo "Acesse sua plataforma de Product Intelligence."
- Botão "Continuar com Google" (ícone G colorido) — visual
- Botão "Continuar com Microsoft" (ícone MS colorido) — visual
- Divisor "ou continue com email"
- Campo Email com ícone Mail (Lucide)
- Campo Senha com ícone Lock + toggle Eye/EyeOff
- Link "Esqueci a senha" → `/forgot-password`
- Botão "Entrar" turquesa (`#13c8b5`), ocupa largura total
- Estado loading: ícone Loader2 girando + "Entrar"
- Estado erro: borda vermelha nos dois campos + linha "Email ou senha incorretos. Tente novamente." (ícone CircleAlert)
- Footer link: "Ainda não tem conta? Criar workspace"
- Rodapé do bloco: "© 2025 ProductGen, Inc." + Privacidade / Termos / Status
- Toggle de tema (Sol/Lua) no canto superior direito do painel esquerdo

**Lado direito — painel (oculto em mobile):**
- Fundo `#0f172a` (dark navy) com padrão de pontos via `radial-gradient`
- Logo ProductGen no topo
- Aspas grandes turquesa + depoimento "Pela primeira vez consigo provar que o que entregamos moveu o que prometemos."
- Avatar "MS" + "Maria Souza" / "VP de Produto, Acme Corp"
- Rodapé com nomes de clientes em letra cinza esmaecida: ACME · NIMBUS · HELIA · STRATA · VOLTA

## Comportamento mock

Submit do form (`<form onSubmit>`):
1. `e.preventDefault()`
2. Validação local com Zod: `email().min(1)` + `password.min(1)`. Erro de schema → estado de erro genérico (igual print C/H).
3. Se válido → `setLoading(true)`, `setTimeout(600ms)` e `router.push("/dashboard")` (puro mock, sem auth real).

Botões sociais: `type="button"`, sem handler.

`/forgot-password`: form com 1 campo email + botão "Enviar link de recuperação". Submit → `router.push("/check-email?email=<encoded>")`.

`/check-email`: lê `?email=` via `useSearchParams`, exibe ícone CheckCircle turquesa pálido, título "Verifique seu email", texto com email + "O link expira em 30 minutos.", botão "Reenviar email" (visual), link "← Voltar para login", linha "Não recebeu? Verifique sua pasta de spam ou fale com suporte."

## Dark mode (escopo apenas auth)

Toggle armazena `localStorage.setItem("auth-theme", "dark"|"light")`.
Componentes de auth lêem o estado via hook `useAuthTheme()` (Client Component) e aplicam HEX correspondentes:

| token              | light       | dark        |
|--------------------|-------------|-------------|
| canvas             | `#ffffff`   | `#0a0f1c`   |
| text primary       | `#2b364a`   | `#ffffff`   |
| text secondary     | `#6b7280`   | `#94a3b8`   |
| border             | `#e5e7eb`   | `#1e293b`   |
| input bg           | `#ffffff`   | `#111827`   |
| social btn bg      | `#ffffff`   | `#0f172a`   |
| primary CTA        | `#13c8b5`   | `#13c8b5`   |

Aplicado via `style={{ backgroundColor: dark ? "#0a0f1c" : "#ffffff" }}`. Nada de classes utilitárias `dark:`.

## Responsivo

- `< 768px`: painel direito oculto, formulário ocupa 100% com padding 24px, sem rodapé "© 2025…" (igual prints F/G/H).
- `≥ 768px`: split 50/50, max-width do form ≈ 440px centralizado na coluna esquerda.

## Validação & segurança

- Zod schema `{ email: z.string().email().max(255), password: z.string().min(1).max(128) }`.
- `encodeURIComponent` no email passado para `/check-email`.
- Sem logs de credencial.

## Integração com app existente

- Mudar `app/page.tsx`: redirect → `/login` (em vez de `/dashboard`).
- Não criar guard ainda (login é mock; qualquer um pode acessar `/dashboard` direto).
- Adicionar dependência: `zod`. (Lucide e clsx já existem.)

## Validação final

- `/login` light + dark
- Submeter com qualquer email+senha → `/dashboard`
- Submeter vazio → estado de erro
- "Esqueci a senha" → `/forgot-password` → `/check-email?email=…`
- Mobile (375px): coluna única, painel direito sumido
- `/` redireciona para `/login`
