import Link from "next/link"
import { BuildWindow } from "@/components/build-window"
import { WhatsAppBadge } from "@/components/whatsapp-badge"
import { WHATSAPP_URL } from "@/lib/contact"
import { btnGhost, btnPrimary, shell } from "@/lib/ui"

/**
 * Abertura da home. Animações de entrada em CSS (classes hero-* em index.css):
 * começam na primeira pintura, sem esperar o JavaScript carregar.
 * Título e parágrafo só deslizam (sem fade) para contar como LCP logo de cara.
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--brand-soft) 22%, transparent) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(70% 60% at 70% 40%, black, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand) 55%, transparent), transparent 70%)",
        }}
      />

      <div
        className={`${shell} relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:py-28`}
      >
        <div>
          <p
            className="hero-rise flex items-center gap-2 font-mono text-xs text-brand-soft"
            style={{ animationDelay: "100ms" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-soft opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-soft" />
            </span>
            Disponível para novos projetos
          </p>

          <h1
            className="hero-lift mt-6 text-[clamp(2.6rem,5.6vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.035em]"
            style={{ animationDelay: "200ms" }}
          >
            Do site ao{" "}
            <span className="sm:whitespace-nowrap">sistema interno.</span>
          </h1>

          <p
            className="hero-lift mt-6 max-w-[34rem] text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "300ms" }}
          >
            Sou Thiago Rodrigues, desenvolvedor full stack em Manaus. Faço
            landing pages, aplicações web e automações, com a experiência de
            quem já desenvolveu ERP, controle de qualidade e dashboards para
            a indústria.
          </p>

          <div
            className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "400ms" }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={btnPrimary}
            >
              <WhatsAppBadge />
              Conversar no WhatsApp
            </a>
            <Link href="/projetos" className={btnGhost}>
              Ver projetos
            </Link>
          </div>
        </div>

        <div className="hero-window" style={{ animationDelay: "500ms" }}>
          <BuildWindow />
        </div>
      </div>
    </section>
  )
}
