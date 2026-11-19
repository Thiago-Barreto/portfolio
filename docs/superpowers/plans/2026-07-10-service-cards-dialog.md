# Dialog nos cards de serviço — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ao clicar em cada um dos 3 cards de serviço da página de Projetos, abrir um Dialog com descrição rica, lista de entregáveis, stack e CTA de WhatsApp.

**Architecture:** Enriquecer o array de dados `projects` com campos `long` e `deliverables`, depois envolver cada card no componente `Dialog` (shadcn/Radix) já existente, usando o card como `DialogTrigger asChild`. Nenhum componente novo; nenhuma dependência nova.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, framer-motion, `radix-ui` (Dialog), react-router-dom.

## Global Constraints

- **Projeto NÃO é repositório git** — não há passos de `git commit`. Verificação é manual.
- **Sem framework de testes** — verificação via `npm run typecheck` (compilação) e `npm run dev` (browser).
- **NÃO usar o componente `Button`** (`src/components/ui/button.tsx` tem merge conflict não resolvido e não compila). O CTA é um `<a>` estilizado. Não usar `DialogFooter` (ele importa `Button`).
- **URL de WhatsApp (verbatim):** `https://wa.me/5592992391957?text=Ol%C3%A1,%20Thiago!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.`
- **Acento roxo:** classe `text-violet-400` para destaques (padrão do site).
- Todo texto em português (pt-BR), verbatim do que está nas tasks.

---

### Task 1: Enriquecer os dados dos serviços

**Files:**
- Modify: `src/pages/projects/projects.ts:1-17` (array `projects`)

**Interfaces:**
- Consumes: nada.
- Produces: array `projects` onde cada item tem `title: string`, `desc: string`, `stack: string[]`, `long: string`, `deliverables: string[]`. Consumido pela Task 2.

- [ ] **Step 1: Substituir o array `projects`**

Substituir o bloco atual (linhas 1-17) do array `projects` por:

```ts
export const projects = [
  {
    title: "Produtos Digitais",
    desc: "Criação de aplicações modernas com foco em performance, UX e identidade visual.",
    stack: ["React", "TypeScript", "Framer Motion"],
    long: "Crio aplicações web modernas do zero — do conceito à interface final — com foco em performance, usabilidade e uma identidade visual que diferencia o seu produto. Cada tela é pensada para carregar rápido, funcionar em qualquer dispositivo e converter.",
    deliverables: [
      "Interface responsiva, fluida e rápida em qualquer tela",
      "Código limpo, componentizado e fácil de evoluir",
      "UX orientada à conversão e à clareza",
      "Deploy e acompanhamento pós-entrega",
    ],
  },
  {
    title: "Automações & Processos",
    desc: "Automação de tarefas, integrações e soluções que reduzem tempo e erros operacionais.",
    stack: ["Python", "Selenium", "APIs"],
    long: "Transformo tarefas manuais e repetitivas em rotinas automáticas e confiáveis. Integro sistemas, extraio e organizo dados e elimino gargalos operacionais — liberando tempo da sua equipe e reduzindo erros humanos.",
    deliverables: [
      "Automação de tarefas repetitivas e coleta de dados",
      "Integrações entre sistemas e planilhas",
      "Redução de tempo operacional e de erros manuais",
      "Scripts documentados e fáceis de manter",
    ],
  },
  {
    title: "Sistemas Internos",
    desc: "Soluções sob medida para controle, gestão e análise de dados.",
    stack: ["Node.js", "MySQL", "Dashboards"],
    long: "Desenvolvo soluções sob medida para o funcionamento interno da sua operação — de dashboards de gestão a sistemas de controle e análise de dados. Feitos para a realidade do seu processo, com acesso seguro e informação na hora certa.",
    deliverables: [
      "Painéis e dashboards de controle e análise",
      "Autenticação segura e controle de acesso por perfil",
      "Modelagem e organização de banco de dados",
      "Relatórios e exportações sob demanda",
    ],
  },
];
```

O array `ProjectCard` abaixo (linhas 19-44) permanece INALTERADO.

- [ ] **Step 2: Verificar compilação**

Run: `npm run typecheck`
Expected: sem erros (exit 0). O arquivo é só dados; novos campos são inferidos.

---

### Task 2: Envolver os cards de serviço em Dialog

**Files:**
- Modify: `src/pages/projects/page.tsx` (imports no topo + o bloco `<div className="grid gap-10 md:grid-cols-3">` nas linhas 23-52)

**Interfaces:**
- Consumes: array `projects` da Task 1 (com `long` e `deliverables`); componentes de `src/components/ui/dialog.tsx` (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`).
- Produces: página de Projetos com Dialog funcional. Deliverable final.

- [ ] **Step 1: Adicionar imports e a constante de WhatsApp**

No topo de `src/pages/projects/page.tsx`, logo após a linha `import { motion } from "framer-motion";`, adicionar:

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const WHATSAPP_URL =
  "https://wa.me/5592992391957?text=Ol%C3%A1,%20Thiago!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.";
```

- [ ] **Step 2: Substituir o grid dos cards de serviço**

Substituir todo o bloco `<div className="grid gap-10 md:grid-cols-3"> ... </div>` (linhas 23-52 do arquivo original) por:

```tsx
<div className="grid gap-10 md:grid-cols-3">
  {projects.map((project, i) => (
    <Dialog key={project.title}>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className="group border-border/50 hover:border-violet-400/40 relative cursor-pointer overflow-hidden rounded-xl border p-6 text-left transition-colors"
        >
          <h3 className="mb-3 text-lg font-medium tracking-tight">
            {project.title}
          </h3>

          <p className="text-muted-foreground mb-6 text-sm">{project.desc}</p>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="bg-muted text-muted-foreground rounded-md px-2 py-1 font-mono text-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="mt-4 block font-mono text-xs tracking-widest text-violet-400 uppercase opacity-0 transition group-hover:opacity-100">
            Saiba mais →
          </span>
        </motion.div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">{project.title}</DialogTitle>
          <DialogDescription className="leading-relaxed">
            {project.long}
          </DialogDescription>
        </DialogHeader>

        <div>
          <p className="mb-3 font-mono text-xs tracking-widest text-violet-400 uppercase">
            O que entrego
          </p>
          <ul className="space-y-2">
            {project.deliverables.map((item) => (
              <li
                key={item}
                className="text-muted-foreground flex gap-2 text-sm"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="bg-muted text-muted-foreground rounded-md px-2 py-1 font-mono text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block font-mono text-sm tracking-widest text-violet-400 uppercase transition hover:text-violet-300"
        >
          Falar no WhatsApp →
        </a>
      </DialogContent>
    </Dialog>
  ))}
</div>
```

Notas para o implementador:
- O `motion.div` que já existia vira o filho do `DialogTrigger asChild`. Mantidas as mesmas animações e o `key` migra para o `<Dialog>` (o elemento raiz do map). Adicionadas `cursor-pointer` e `text-left` (o Radix aplica `role="button"` ao gatilho via `asChild`, e `text-left` evita que o texto centralize).
- O resto do arquivo (header, seção "Projetos" com `ProjectCard`, CTA "Vamos conversar") permanece INALTERADO.

- [ ] **Step 3: Verificar compilação**

Run: `npm run typecheck`
Expected: sem erros (exit 0).

- [ ] **Step 4: Verificar no browser**

Run: `npm run dev` e abrir a página de Projetos.
Expected — checar manualmente:
1. Clicar em cada um dos 3 cards abre o Dialog com título, descrição longa, "O que entrego" (bullets), stack e CTA corretos para aquele card.
2. "Saiba mais →" aparece ao passar o mouse no card.
3. CTA "Falar no WhatsApp →" abre a conversa do WhatsApp em nova aba.
4. Fechar funciona via botão X, tecla Esc e clique no overlay escuro.
5. Tab foca o card; Enter/Espaço abre o Dialog.
6. Em viewport mobile, o Dialog fica dentro da tela (o `DialogContent` já é responsivo com `max-w-[calc(100%-2rem)]`).

- [ ] **Step 5: Lint (opcional, se disponível sem erros pré-existentes)**

Run: `npm run lint`
Expected: sem novos erros introduzidos por estas mudanças.

---

## Self-Review

**Spec coverage:**
- Dialog só nos 3 cards de serviço → Task 2 (grid `projects`, `ProjectCard` intocado). ✓
- Campos `long` + `deliverables` → Task 1. ✓
- Conteúdo textual aprovado → Task 1 (verbatim). ✓
- Card inteiro como gatilho + dica "Saiba mais →" no hover → Task 2 Step 2. ✓
- DialogContent com título/descrição/entregáveis/stack/CTA → Task 2 Step 2. ✓
- CTA como `<a>` (não `Button`), sem `DialogFooter` → Task 2 (Global Constraints). ✓
- URL de WhatsApp reaproveitada como constante → Task 2 Step 1. ✓
- Acessibilidade (foco por teclado, Esc, overlay) → Task 2 Step 4 itens 4-5. ✓
- Verificação manual (sem testes, sem git) → Steps de typecheck + browser. ✓

**Placeholder scan:** nenhum TBD/TODO; todo código está completo e literal. ✓

**Type consistency:** os campos `long` e `deliverables` definidos na Task 1 são exatamente os consumidos na Task 2. Nomes de componentes do Dialog conferem com os exports de `dialog.tsx`. ✓
