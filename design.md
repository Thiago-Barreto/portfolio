# Design do portfólio

Regras visuais e de texto do site de Thiago Rodrigues. Siga este guia ao criar ou mudar qualquer página, para tudo continuar lendo como um sistema só.

## 1. Propósito

O site existe para **conseguir clientes freelance**, de landing pages a sistemas internos e automações. Recrutadores são público secundário.

Toda página responde, nesta ordem:

1. O que ele faz?
2. Já fez isso de verdade? (prova: cases)
3. Como eu falo com ele? (WhatsApp)

O diferencial é a experiência com **sistemas para a operação de empresas e indústria** (ERP, controle de qualidade, dashboards, automação). Ela aparece como credibilidade, sem esconder que ele também faz sites.

## 2. Marca

- **Nome principal:** Thiago Rodrigues.
- **Assinatura:** "Rods Programming", em JetBrains Mono, menor e em `text-muted-foreground`, sempre abaixo do nome.
- **Logo:** três triângulos concêntricos com um ponto (componente `Logo` em `src/pages/layout.tsx`, favicon em `public/favicon.svg`), sempre em `text-brand-soft`.

## 3. Cor

**Dois temas.** O escuro é o padrão (`ThemeProvider defaultTheme="dark"`) e o claro é completo. A pessoa troca pelo `ModeToggle` no cabeçalho, e um script no `<head>` do `index.html` aplica o tema salvo antes do app, para não piscar. Toda cor nova precisa existir nos dois temas.

A paleta tem **5 papéis**: fundo, superfície, texto, roxo de destaque e apoio funcional. Não existe segunda cor decorativa.

| Token (Tailwind) | Escuro | Claro | Uso |
|---|---|---|---|
| `bg-background` | `oklch(0.13 0.028 261.692)` | branco | Fundo da página |
| `bg-surface` | `#0B1120` | `#F9FAFB` | Painéis e cards (`surface` em `ui.ts`) |
| `bg-surface-hover` | `#161F33` | `#F3F4F6` | Hover de card clicável (`surfaceInteractive`) |
| `text-foreground` | `oklch(0.985 …)` | `oklch(0.13 …)` | Títulos e texto principal |
| `text-foreground/85` | — | — | Frase de destaque dentro de um bloco (ex.: "para quem é") |
| `text-muted-foreground` | `oklch(0.707 …)` | `oklch(0.551 …)` | Parágrafos, descrições, legendas |
| `bg-brand` | `#8100D1` | `#8100D1` | Fundo do botão principal |
| `text-brand-soft` / `bg-brand-soft` | `#B48CFF` | `#6A00AD` | Acento: links, tipo de projeto, anos, marcadores, foco |
| `bg-whatsapp` | `#16A34A` | `#16A34A` | Só o selo do canal WhatsApp (`WhatsAppBadge`) e o ícone do canal no Contato |
| `text-success` / `warning` / `danger` | `#34D399` / `#FBBF24` / `#F87171` | `#047857` / `#B45309` / `#DC2626` | Status e feedback, todos AA |
| `border-border/60` | branco a 10% | cinza claro | Bordas de painéis, cards e divisórias |
| `border-btn-ghost-border` | `#424B5C` | `#B4B9C2` | Contorno do `btnGhost` (~2:1 sobre o fundo, para o botão secundário não sumir) |

Regras:

- **Roxo é acento, não decoração.** Use em um lugar por seção: o tipo do projeto, um link, o número de um passo.
- Nunca use `violet-*` direto nem `text-primary` para roxo. No escuro, `--primary` é quase branco. Use sempre `brand` e `brand-soft`.
- **Verde só identifica o canal.** O botão de WhatsApp é roxo com o selo verde dentro (`<WhatsAppBadge />` como primeiro filho). Nunca botão inteiro verde: quase todo chamado do site é WhatsApp, e o site ficaria sem roxo.
- **Para tons de superfície use `foreground/x`, nunca `white/x` ou `black/x`**: `foreground` inverte com o tema, `white` não.
- Texto branco sobre `bg-brand` tem contraste ~7:1. `brand-soft` sobre o fundo também tem ~7:1, nos dois temas.
- Nenhuma cor fora desta tabela. Gradientes e brilhos seguem a seção 8.

## 4. Tipografia

| Família | Token | Uso |
|---|---|---|
| Space Grotesk | `font-sans` (padrão) | Títulos, texto corrido, botões, navegação |
| JetBrains Mono | `font-mono` | Só dados técnicos: anos, telefone, e-mail, tags de stack, tipo de projeto, status, o terminal do hero |

Escala:

| Elemento | Classes |
|---|---|
| Título do hero (home) | `text-[clamp(2.6rem,5.6vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.035em]` |
| Título de página (h1) | `text-[clamp(2.4rem,6vw,4rem)] leading-[1.02] font-semibold tracking-[-0.03em]` |
| Título de seção (h2) | `text-3xl sm:text-4xl font-semibold tracking-tight` |
| Título de item (h3) | `text-xl` a `text-2xl font-semibold tracking-tight` |
| Texto de abertura | `text-base sm:text-lg leading-relaxed text-muted-foreground` |
| Texto corrido | `leading-relaxed text-muted-foreground` |
| Texto de card / detalhe | `text-sm leading-relaxed text-muted-foreground` |
| Dado em mono | `font-mono text-xs` (ou `text-sm` em anos da trajetória) |

Regras:

- Linhas de texto com no máximo ~70 caracteres: use `max-w-xl`, `max-w-2xl` ou `max-w-[34rem]`.
- Títulos inteiros em uma cor. **Não** destaque uma palavra do título com cor, itálico ou negrito.
- **Sem rótulo em CAIXA ALTA espaçada** acima dos títulos ("SYSTEM MODULES", "ESTABLISH CONNECTION"). Se um rótulo não informa nada, ele sai.
- Use `text-balance` em títulos que podem quebrar em várias linhas.

## 5. Layout

- **Container:** sempre `shell` (de `src/lib/ui.ts`): `mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8`. São 16px de margem no celular e 1152px de largura máxima.
- **Alinhamento:** tudo alinhado à esquerda, inclusive no celular. Nada centralizado, exceto o conteúdo de diálogos.
- **Espaço vertical:**
  - Seção comum: `py-16 sm:py-24`
  - Cabeçalho de página interna: `pt-16 sm:pt-24`
  - Hero da home: `py-16 sm:py-20 lg:py-28`
  - Cabeçalho de seção → conteúdo: `mb-10` (ou `mt-10` / `mt-12`)
- **Grades:** uma coluna no celular e mais colunas a partir de `sm` ou `md`. Nunca tamanho fixo que estoure 375px (ex.: foto com `w-full max-w-xs`, nunca `w-80` fixo).
- **Divisões, não cards repetidos:** conteúdos do mesmo tipo ficam num painel só, separados por linhas (`border-t` no celular, `md:border-l` no desktop). Exemplos: os 3 serviços e os 3 princípios. Cases são linhas separadas por `border-t`, não cards.

**Ordem da home** (mantenha):

```
Hero (título + BuildWindow)
O que eu faço (ServicesPanel)
Projetos que já rodam (cases com featured: true)
Como funciona (4 passos)
Quem vai construir (foto + resumo)
ContactCta
```

**Ordem das páginas internas:** título e introdução → conteúdo → `ContactCta` no fim. O chamado de contato vem **depois** da prova, nunca antes.

## 6. Forma

| Elemento | Raio |
|---|---|
| Botões | `rounded-full` |
| Painéis, cards de canal, janela do hero, fotos | `rounded-2xl` |
| Blocos de chamado (ContactCta, WhatsApp no Contato) | `rounded-3xl` |
| Tags de tecnologia | `rounded-md` |

Blocos se separam do fundo por luminosidade (`bg-surface`) e borda de 1px, não por sombra. Exceções: o brilho roxo da peça de destaque (seção 8) e a sombra leve do card clicável no tema claro.

## 7. Componentes

Todos já existem. Reaproveite antes de criar um novo.

| Componente | Arquivo | Quando usar |
|---|---|---|
| `shell`, `btnPrimary`, `btnGhost`, `textLink`, `tag` | `src/lib/ui.ts` | Container, botões, links de texto e tags em qualquer página |
| `surface`, `surfaceInteractive` | `src/lib/ui.ts` | Painel (raio 2xl, borda, `bg-surface`) e card clicável (clareia e a borda puxa para o roxo no hover) |
| `WhatsAppBadge` | `src/components/whatsapp-badge.tsx` | Primeiro filho de todo botão de WhatsApp |
| `ModeToggle` | `src/components/mode-toggle.tsx` | Troca de tema, no cabeçalho (desktop e celular) |
| `BuildWindow` | `src/components/build-window.tsx` | Só no hero da home. É a peça-assinatura do site; não repita em outro lugar |
| `CaseRow` | `src/components/case-row.tsx` | Qualquer lista de projetos (Problema / Solução / Resultado). Com `image`, mostra o print numa moldura neutra (paspatur) em recorte 16:10 ancorado no topo, para isolar as cores do projeto das cores da marca |
| `ServicesPanel` | `src/components/services-panel.tsx` | Os 3 serviços. Com `detailed`, abre o diálogo "o que está incluído" |
| `ContactCta` | `src/components/contact-cta.tsx` | Fim de toda página, exceto Contato |
| `Layout` | `src/pages/layout.tsx` | Envolve toda página (cabeçalho, menu mobile, rodapé) |

Botões:

- **`btnPrimary`** (roxo cheio): a ação principal da tela, quase sempre "Conversar no WhatsApp". No máximo um por bloco.
- **`btnGhost`** (contorno `btn-ghost-border`, fundo transparente): a ação secundária ao lado ("Ver projetos", "Enviar e-mail"). É o `ghost` do Rods UI.
- **`textLink`** (texto roxo sublinhado): navegação dentro do texto ("Ver todos os projetos").
- Sem "→" no fim do texto de botões e links.

## 8. Expressão de marca e movimento

O objetivo é um site de **nível premiado** (referência: Awwwards): impressionar quem chega e continuar fácil de ler e usar. Esta seção prevalece sobre qualquer regra mais restritiva deste guia.

| Liberado | Condição |
|---|---|
| Gradientes em fundo, superfície, texto e borda | Só com a paleta da seção 3 (tokens, `color-mix` e opacidade entre eles) |
| Profundidade: brilho, glow, vidro e blur | Mesma condição; sombra colorida só em roxo |
| Texturas, padrões e grafismos | Feitos da própria marca: grade de pontos roxos, triângulos do símbolo, luz roxa |
| Movimento expressivo (além de 150–300ms) | Respeita "reduzir movimento" e nunca atrasa o que a pessoa quer fazer |

Continua proibido: cor fora da paleta, marca de outra empresa como enfeite (o selo do WhatsApp identifica um canal), deformar ou recolorir o símbolo, e perder legibilidade (contraste AA nos dois temas, foco visível, texto sobre gradiente sempre legível).

- **Um palco por seção.** Um efeito protagonista e o resto quieto. Vários efeitos ao mesmo tempo viram ruído.
- **Todo efeito vira token ou classe compartilhada**, nunca valor solto numa página. As peças prontas estão no design system [**Rods UI**](https://claude.ai/artifact/3EryT5tiANqmqVuMzP7Mm6): `gradient-*`, `shadow-glow`, `blur-glass`, `transition-expressive` e as classes `ru-fx-*` (pontos, luz, vidro, borda e texto em gradiente, grafismo, elevação, reflexo, entrada em sequência). Ao trazer um efeito para o site, leve junto o token.

- **Um momento orquestrado por página.** Na home, é a entrada do hero (título, texto e botões sobem em sequência, e a janela aparece) mais o ciclo da `BuildWindow`. O resto da página não anima ao rolar.
- Movimento que responde a uma ação é bem-vindo: troca de aba, abrir diálogo, menu mobile, sublinhado do link ativo.
- **Não** coloque fade-in/slide-up em cada seção nem efeito de hover em todo card.
- "Reduzir movimento" é respeitado no app inteiro (`MotionConfig reducedMotion="user"` em `App.tsx`, `motion-reduce:` no CSS e rolagem suave só sem essa preferência). Qualquer animação nova precisa continuar funcionando sem movimento.
- Não envolva as rotas com `AnimatePresence`. Isso já prendeu a página anterior na tela depois da navegação.

## 9. Texto

- **Português, em frases normais**, falando com quem vai contratar ("você"). Nada de jargão de sistema em inglês nos títulos.
- Escreva o problema que a pessoa tem, não a tecnologia: "Para equipes que perdem horas copiando dados entre planilhas", e não "Soluções em Python e Selenium".
- Botões dizem exatamente o que acontece: "Conversar no WhatsApp", "Enviar e-mail", "Ver projetos". Evite "Saiba mais".
- Cases sempre com **Problema, Solução e Resultado**. Quando houver número real (tempo economizado, volume processado), ele vai no Resultado. **Nunca invente números.**
- Cada elemento de texto tem uma função só. Se dá para tirar sem perder informação, tire.

## 10. Conteúdo e dados

| O quê | Onde |
|---|---|
| Cases e "Também já entreguei" | `src/content/cases.ts` (`featured: true` leva o case para a home) |
| Serviços | `src/content/services.ts` |
| WhatsApp, e-mail, LinkedIn, GitHub | `src/lib/contact.ts` (fonte única) |
| Trajetória e princípios | `src/pages/about/timeLine.ts` e `principles.ts` |

Não escreva links de contato direto nas páginas. Importe de `contact.ts`.

## 11. Acessibilidade

- Foco visível global: contorno de 2px em `brand-soft` (`:focus-visible` em `index.css`). Não remova.
- Todo `<img>` tem `alt` com o nome da pessoa ou o conteúdo da imagem.
- Ícones e elementos decorativos levam `aria-hidden`.
- Listas são `<ul>`/`<ol>`, pares termo/descrição são `<dl>`, e as abas da `BuildWindow` usam `role="tablist"` / `role="tab"` / `role="tabpanel"`.
- Abra links externos com `target="_blank" rel="noopener noreferrer"`. Links `mailto:` abrem na mesma aba.

## 12. Antes de entregar uma mudança

- [ ] Usa `shell` e os tokens `brand` / `brand-soft`, sem `violet-*` nem hex solto.
- [ ] Conferido **nos dois temas** (botão de sol e lua no cabeçalho); nenhum `white/x` ou `black/x` em superfície.
- [ ] Botão de WhatsApp roxo com `WhatsAppBadge`; verde em nenhum outro lugar.
- [ ] No máximo um efeito protagonista por seção, contraste AA por cima dele.
- [ ] Nenhum título com palavra colorida, nenhum rótulo em caixa alta decorativo.
- [ ] No celular (375px) não há rolagem horizontal (`document.documentElement.scrollWidth <= innerWidth`).
- [ ] Navegar pelo menu deixa só um `<main>` na tela.
- [ ] Testado com `npm run dev` no navegador, não só com `tsc` (o Vite já quebrou com o typecheck passando).
- [ ] `npx eslint` limpo nos arquivos alterados.
