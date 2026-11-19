# Dialog nos cards de serviço — Design

**Data:** 2026-07-10
**Escopo:** Página de Projetos (`src/pages/projects/`)

## Objetivo

Ao clicar em cada um dos 3 cards de serviço no topo da página de Projetos
(Produtos Digitais, Automações & Processos, Sistemas Internos), abrir um Dialog
com uma descrição mais rica do serviço, uma lista de entregáveis e um CTA de
contato (WhatsApp). Objetivo de negócio: vender serviço / gerar contato.

Fora de escopo: os 4 cards de projetos reais (`ProjectCard`) mais abaixo na
página permanecem inalterados nesta entrega.

## Arquitetura

Mudança contida na página de Projetos. Nenhum arquivo de UI novo — reuso do
componente `Dialog` (shadcn/Radix) que já existe em
`src/components/ui/dialog.tsx`.

Dois arquivos são alterados:

1. `src/pages/projects/projects.ts` — enriquecimento dos dados.
2. `src/pages/projects/page.tsx` — cada card de serviço vira gatilho de Dialog.

### 1. Dados — `projects.ts`

Cada item do array `projects` ganha dois campos novos, mantendo `title`, `desc`
e `stack` como estão:

- `long: string` — descrição rica (1 parágrafo) exibida no Dialog.
- `deliverables: string[]` — 3-4 bullets do bloco "O que entrego".

Conteúdo aprovado:

**Produtos Digitais**
- long: "Crio aplicações web modernas do zero — do conceito à interface final —
  com foco em performance, usabilidade e uma identidade visual que diferencia o
  seu produto. Cada tela é pensada para carregar rápido, funcionar em qualquer
  dispositivo e converter."
- deliverables:
  - "Interface responsiva, fluida e rápida em qualquer tela"
  - "Código limpo, componentizado e fácil de evoluir"
  - "UX orientada à conversão e à clareza"
  - "Deploy e acompanhamento pós-entrega"

**Automações & Processos**
- long: "Transformo tarefas manuais e repetitivas em rotinas automáticas e
  confiáveis. Integro sistemas, extraio e organizo dados e elimino gargalos
  operacionais — liberando tempo da sua equipe e reduzindo erros humanos."
- deliverables:
  - "Automação de tarefas repetitivas e coleta de dados"
  - "Integrações entre sistemas e planilhas"
  - "Redução de tempo operacional e de erros manuais"
  - "Scripts documentados e fáceis de manter"

**Sistemas Internos**
- long: "Desenvolvo soluções sob medida para o funcionamento interno da sua
  operação — de dashboards de gestão a sistemas de controle e análise de dados.
  Feitos para a realidade do seu processo, com acesso seguro e informação na
  hora certa."
- deliverables:
  - "Painéis e dashboards de controle e análise"
  - "Autenticação segura e controle de acesso por perfil"
  - "Modelagem e organização de banco de dados"
  - "Relatórios e exportações sob demanda"

### 2. UI — `page.tsx`

Dentro do `.map()` existente dos cards de serviço, cada card passa a ser
envolvido pela estrutura:

```
<Dialog>
  <DialogTrigger asChild>
    {/* o motion.div do card, agora clicável */}
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{project.title}</DialogTitle>
      <DialogDescription>{project.long}</DialogDescription>
    </DialogHeader>
    {/* "O que entrego" — lista de project.deliverables */}
    {/* tags de project.stack */}
    {/* CTA WhatsApp */}
  </DialogContent>
</Dialog>
```

Detalhes:

- **Gatilho:** o card inteiro é o `DialogTrigger asChild`. Adicionar
  `cursor-pointer` ao card. A dica de hover "Saiba mais →" (estilo violeta,
  aparece no hover, coerente com o "Ver detalhes →" dos projetos abaixo) é
  adicionada dentro do card.
- **Título:** `DialogTitle` com `project.title`.
- **Descrição:** `DialogDescription` com `project.long`.
- **"O que entrego":** um pequeno cabeçalho (`font-mono`, violeta, uppercase,
  no mesmo estilo do "System Modules") seguido de uma `<ul>` com os
  `deliverables`. Cada bullet com marcador simples estilizado (ex.: um traço
  ou ponto violeta), texto em `text-muted-foreground text-sm`.
- **Stack:** as mesmas tags já usadas no card
  (`bg-muted text-muted-foreground rounded-md px-2 py-1 font-mono text-xs`).
- **CTA:** link `<a>` estilizado (NÃO o componente `Button` — ver Riscos),
  apontando para a URL de WhatsApp já usada no site, `target="_blank"` +
  `rel="noopener noreferrer"`. Estilo violeta coerente com o CTA "Chamar no
  WhatsApp" da página de contato. Texto: "Falar no WhatsApp →".

A URL de WhatsApp é a mesma constante já usada em `contact/page.tsx` e no
rodapé desta página:
`https://wa.me/5592992391957?text=...` (mensagem pré-preenchida existente).
Definir como constante local no topo de `page.tsx` para evitar duplicação
literal dentro do map.

## Fluxo de dados

Estático. `projects.ts` exporta o array; `page.tsx` importa e renderiza. Sem
estado global — o estado de aberto/fechado de cada Dialog é gerenciado
internamente pelo Radix (um `Dialog` por card, não controlado).

## Acessibilidade

- `DialogTitle` e `DialogDescription` do Radix já fornecem os vínculos ARIA.
- O card como `DialogTrigger asChild` precisa ser um elemento focável. O
  `motion.div` não é focável por padrão; garantir que o gatilho seja um
  elemento interativo (o Radix aplica `role="button"` e `tabIndex` ao filho via
  `asChild`, mas convém validar foco por teclado — Tab até o card, Enter/Espaço
  abre; Esc fecha).
- Fechar com Esc e clicar fora já vêm do Radix. Botão de fechar (X) já é padrão
  do `DialogContent`.

## Riscos e observações

- **`button.tsx` com merge conflict não resolvido:** o arquivo
  `src/components/ui/button.tsx` contém marcadores `<<<<<<<`, `=======`,
  `>>>>>>>` e não compila. O `Dialog` importa `Button` (usado em
  `DialogFooter` quando `showCloseButton`), mas **não usaremos `DialogFooter`
  nem `Button`** nesta entrega — o CTA é um `<a>`. Assim o dialog funciona
  independentemente do conflito. O conflito do `button.tsx` é um problema
  pré-existente separado, a ser resolvido fora deste escopo (registrado na
  memória do projeto).

## Testes / verificação

Sem framework de testes automatizados no projeto (Vite + React). Verificação
manual:

1. `npm run dev` sobe sem erros de compilação.
2. Clicar em cada um dos 3 cards abre o Dialog correspondente com o conteúdo
   certo (título, descrição longa, entregáveis, stack, CTA).
3. CTA de WhatsApp abre a conversa em nova aba.
4. Fechar via X, Esc e clique no overlay.
5. Navegação por teclado: Tab foca o card, Enter/Espaço abre.
6. Layout responsivo do Dialog em mobile (o `DialogContent` já é responsivo).
