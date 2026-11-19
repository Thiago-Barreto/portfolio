import type { Metadata } from "next"
import { FaWhatsapp, FaLinkedinIn, FaGithub } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import {
  EMAIL,
  GITHUB_DISPLAY,
  GITHUB_URL,
  LINKEDIN_DISPLAY,
  LINKEDIN_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/contact"
import { btnPrimary, shell, surfaceInteractive } from "@/lib/ui"

const channels = [
  {
    label: "E-mail",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: <HiOutlineMail />,
    hint: "Para propostas e orçamentos",
  },
  {
    label: "LinkedIn",
    value: LINKEDIN_DISPLAY,
    href: LINKEDIN_URL,
    icon: <FaLinkedinIn />,
    hint: "Trajetória profissional",
  },
  {
    label: "GitHub",
    value: GITHUB_DISPLAY,
    href: GITHUB_URL,
    icon: <FaGithub />,
    hint: "Código e projetos",
  },
]

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com Thiago Rodrigues pelo WhatsApp, e-mail ou LinkedIn para orçar seu site, sistema interno ou automação.",
  alternates: { canonical: "/contato" },
  openGraph: { url: "/contato" },
}

export default function Contact() {
  return (
    <>
      <section className={`${shell} py-16 sm:py-24`}>
        <div className="max-w-2xl">
          <h1 className="text-[clamp(2.4rem,6vw,4rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-balance">
            Vamos construir algo juntos
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tem uma ideia, um sistema para automatizar ou um problema para
            resolver? Me conta pelo canal que preferir. O WhatsApp é o mais
            rápido.
          </p>
        </div>

        {/* Canal principal */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-12 flex flex-col gap-6 overflow-hidden rounded-3xl border border-brand/40 p-6 transition-colors hover:border-brand-soft/70 sm:flex-row sm:items-center sm:justify-between sm:p-10"
          style={{
            background:
              "radial-gradient(110% 140% at 0% 0%, color-mix(in oklab, var(--brand) 34%, transparent), transparent 62%)",
          }}
        >
          <span className="flex items-center gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-whatsapp text-2xl text-white">
              <FaWhatsapp />
            </span>
            <span>
              <span className="block text-2xl font-semibold tracking-tight">
                WhatsApp
              </span>
              <span className="mt-1 block font-mono text-sm text-foreground/80">
                {WHATSAPP_DISPLAY}
              </span>
            </span>
          </span>
          <span className={`${btnPrimary} pointer-events-none`}>
            Conversar no WhatsApp
          </span>
        </a>

        {/* Outros canais */}
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`${surfaceInteractive} group flex h-full items-start gap-4 p-5`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-foreground/[0.04] text-lg text-muted-foreground transition-colors group-hover:text-brand-soft">
                  {c.icon}
                </span>
                <span className="min-w-0">
                  <span className="block font-medium">{c.label}</span>
                  <span className="mt-0.5 block truncate font-mono text-xs text-muted-foreground">
                    {c.value}
                  </span>
                  <span className="mt-2 block text-xs text-muted-foreground/80">
                    {c.hint}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
