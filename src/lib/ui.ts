// Classes compartilhadas para manter as páginas com o mesmo ritmo.

/** Container das seções: 16px de margem lateral no celular, 1152px no máximo. */
export const shell = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand/80"

/** Secundário ao lado do btnPrimary. Contorno com token próprio (~2:1) para não sumir no fundo. */
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-btn-ghost-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand-soft/60 hover:text-brand-soft"

export const textLink =
  "font-medium text-brand-soft underline decoration-brand-soft/40 underline-offset-4 transition-colors hover:decoration-brand-soft"

/** Tag neutra (stack, categoria). O roxo fica reservado para links e ações. */
export const tag =
  "rounded-md bg-border px-2 py-1 font-mono text-xs text-foreground/70 dark:bg-foreground/5 dark:text-muted-foreground"

/** Bloco de conteúdo: separa do fundo por luminosidade e borda de 1px, sem sombra. */
export const surface = "rounded-2xl border border-border/60 bg-surface"

/** Card clicável: clareia, a borda puxa para o roxo e, no claro, ganha uma sombra leve. */
export const surfaceInteractive =
  "rounded-2xl border border-border/60 bg-surface transition-[background-color,border-color,box-shadow] hover:border-brand/30 hover:bg-surface-hover hover:shadow-[0_10px_25px_-5px_rgba(3,7,18,0.06)] dark:hover:border-brand-soft/35 dark:hover:shadow-none"
