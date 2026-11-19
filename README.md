# Portfólio — Thiago Rodrigues

Site pessoal de freelancer (<https://thiagorodrigues.dev>): Next.js 16 (App Router), React 19, Tailwind CSS v4 e Framer Motion.

## Comandos

```bash
npm run dev        # desenvolvimento em http://localhost:3000
npm run build      # build de produção (inclui type-check)
npm start          # serve o build
npm run lint       # ESLint (config do Next)
npm run typecheck  # só TypeScript
```

## Estrutura

- `src/app/` — rotas: `/` (page.tsx), `/sobre`, `/projetos`, `/contato`; metadados de SEO em cada `page.tsx`.
  - `layout.tsx` — HTML raiz, fontes (`next/font`), metadados globais, JSON-LD e script que aplica o tema antes da pintura.
  - `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` (imagem de compartilhamento), `not-found.tsx`.
- `next.config.ts` — redirects 308 dos endereços alternativos (`/about`, `/projects`, `/home`...).
- `src/components/` — `site-layout.tsx` (cabeçalho, menu e rodapé), `home-hero.tsx` e demais blocos.
- `src/content/` — cases e serviços. `src/lib/` — contatos, dados do site, classes compartilhadas.

Componentes com estado ou animação levam `"use client"`; o resto é Server Component e chega pronto no HTML.

## Variáveis de ambiente

Veja `.env.example`. Variáveis lidas no navegador precisam do prefixo `NEXT_PUBLIC_`.
