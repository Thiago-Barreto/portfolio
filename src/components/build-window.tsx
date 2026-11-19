"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

const views = [
  { id: "site", label: "Landing page" },
  { id: "sistema", label: "Sistema interno" },
  { id: "automacao", label: "Automação" },
] as const

type ViewId = (typeof views)[number]["id"]

const CYCLE_MS = 5200

/**
 * Janela do hero: mostra os três tipos de entrega (site, sistema, automação).
 * Alterna sozinha até a pessoa clicar numa aba; pausa no hover e respeita
 * "reduzir movimento".
 */
export function BuildWindow() {
  const [active, setActive] = useState<ViewId>("site")
  const [autoplay, setAutoplay] = useState(true)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!autoplay || paused || reduce) return
    const timer = setTimeout(() => {
      const i = views.findIndex((v) => v.id === active)
      setActive(views[(i + 1) % views.length].id)
    }, CYCLE_MS)
    return () => clearTimeout(timer)
  }, [active, autoplay, paused, reduce])

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full overflow-hidden rounded-2xl border border-foreground/10 bg-card/70 shadow-[0_40px_120px_-40px_rgba(129,0,209,0.6)] backdrop-blur"
    >
      {/* Barra da janela com as abas */}
      <div className="flex items-center gap-3 border-b border-foreground/10 px-4 py-3">
        <div className="hidden gap-1.5 sm:flex" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        </div>
        <div
          role="tablist"
          aria-label="Tipos de projeto"
          className="flex flex-1 justify-center gap-1"
        >
          {views.map((v) => {
            const selected = v.id === active
            return (
              <button
                key={v.id}
                role="tab"
                id={`tab-${v.id}`}
                aria-selected={selected}
                aria-controls="build-window-panel"
                onClick={() => {
                  setActive(v.id)
                  setAutoplay(false)
                }}
                className={`relative rounded-full px-3 py-1 text-xs font-medium transition-colors sm:text-[0.8rem] ${
                  selected
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="build-window-tab"
                    className="absolute inset-0 rounded-full bg-foreground/10"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{v.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Conteúdo */}
      <div
        id="build-window-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="relative h-[300px] sm:h-[360px]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            aria-hidden
          >
            {active === "site" && <SiteView />}
            {active === "sistema" && <SystemView />}
            {active === "automacao" && <AutomationView />}
          </motion.div>
        </AnimatePresence>

        {/* Progresso do ciclo automático */}
        {autoplay && !paused && !reduce && (
          <motion.span
            key={`progress-${active}`}
            className="absolute bottom-0 left-0 h-px w-full origin-left bg-brand-soft/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
          />
        )}
      </div>
    </div>
  )
}

function SiteView() {
  return (
    <div className="flex h-full flex-col p-4 sm:p-5">
      <div className="mb-4 rounded-md bg-foreground/5 px-3 py-1.5 font-mono text-[0.7rem] text-muted-foreground">
        seunegocio.com.br
      </div>
      <div className="flex items-center justify-between">
        <span className="h-3 w-16 rounded bg-foreground/30" />
        <div className="flex gap-3">
          <span className="h-2 w-8 rounded bg-foreground/15" />
          <span className="h-2 w-8 rounded bg-foreground/15" />
          <span className="h-2 w-8 rounded bg-foreground/15" />
        </div>
      </div>
      <div className="mt-7 space-y-2.5 sm:mt-9">
        <span className="block h-5 w-4/5 rounded bg-foreground/80 sm:h-6" />
        <span className="block h-5 w-3/5 rounded bg-foreground/80 sm:h-6" />
        <span className="mt-4 block h-2 w-2/3 rounded bg-foreground/15" />
        <span className="block h-2 w-1/2 rounded bg-foreground/15" />
      </div>
      <span className="mt-5 inline-flex w-fit rounded-full bg-brand px-4 py-1.5 text-[0.7rem] font-medium text-white">
        Pedir orçamento
      </span>
      <div className="mt-auto grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            className="h-14 rounded-lg border border-foreground/10 bg-foreground/[0.04] sm:h-16"
          />
        ))}
      </div>
    </div>
  )
}

const bars = [42, 58, 50, 74, 66, 88, 71]
const rows = [
  { line: "Linha 1", status: "Aprovado", ok: true },
  { line: "Linha 2", status: "Em análise", ok: false },
  { line: "Linha 3", status: "Aprovado", ok: true },
]

function SystemView() {
  return (
    <div className="flex h-full">
      <div className="hidden w-28 shrink-0 flex-col gap-2.5 border-r border-foreground/10 p-4 sm:flex">
        <span className="mb-2 h-3 w-14 rounded bg-foreground/30" />
        {["Painel", "Inspeções", "Defeitos", "Relatórios"].map((item, i) => (
          <span
            key={item}
            className={`rounded px-2 py-1 text-[0.7rem] ${
              i === 0 ? "bg-foreground/10 text-foreground" : "text-muted-foreground"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { label: "Inspeções", value: "128" },
            { label: "Aprovadas", value: "96%" },
            { label: "Defeitos", value: "5" },
          ].map((k) => (
            <div
              key={k.label}
              className="rounded-lg border border-foreground/10 bg-foreground/[0.04] p-2.5"
            >
              <p className="text-[0.65rem] text-muted-foreground">{k.label}</p>
              <p className="font-mono text-base font-semibold sm:text-lg">
                {k.value}
              </p>
            </div>
          ))}
        </div>
        <div className="flex h-24 items-end gap-2 rounded-lg border border-foreground/10 bg-foreground/[0.02] p-3 sm:h-28">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className={`flex-1 origin-bottom rounded-sm ${
                i === 5 ? "bg-brand-soft" : "bg-foreground/20"
              }`}
              style={{ height: `${h}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
            />
          ))}
        </div>
        <div className="space-y-1.5">
          {rows.map((r) => (
            <div
              key={r.line}
              className="flex items-center justify-between rounded-md bg-foreground/[0.03] px-3 py-1.5 text-[0.7rem]"
            >
              <span className="text-muted-foreground">{r.line}</span>
              <span
                className={`rounded-full px-2 py-0.5 ${
                  r.ok ? "bg-brand/30 text-brand-soft" : "bg-foreground/10 text-foreground"
                }`}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const logLines = [
  { text: "$ python certidoes.py clientes.xlsx", kind: "cmd" },
  { text: "lendo clientes.xlsx", kind: "info" },
  { text: "40 CNPJs encontrados", kind: "info" },
  { text: "emitindo certidões na Receita Federal", kind: "info" },
  { text: "✓ 40 de 40 certidões emitidas", kind: "ok" },
  { text: "✓ arquivos salvos em /certidoes", kind: "ok" },
] as const

function AutomationView() {
  return (
    <div className="h-full bg-foreground/[0.04] p-4 font-mono dark:bg-black/30 text-[0.72rem] leading-6 sm:p-5 sm:text-[0.8rem] sm:leading-7">
      {logLines.map((l, i) => (
        <motion.p
          key={l.text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.45, duration: 0.15 }}
          className={
            l.kind === "cmd"
              ? "text-foreground"
              : l.kind === "ok"
                ? "text-brand-soft"
                : "text-muted-foreground"
          }
        >
          {l.text}
        </motion.p>
      ))}
      <motion.span
        className="mt-1 inline-block h-4 w-2 bg-foreground/70"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  )
}
