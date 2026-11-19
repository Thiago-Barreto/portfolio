import type { Metadata } from "next"
import { CaseRow } from "@/components/case-row"
import { ServicesPanel } from "@/components/services-panel"
import { ContactCta } from "@/components/contact-cta"
import { cases, otherWork } from "@/content/cases"
import { shell, surface } from "@/lib/ui"

export const metadata: Metadata = {
  title: "Projetos e serviços",
  description:
    "Projetos reais de landing pages, sistemas internos e automações, e os serviços de desenvolvimento web que Thiago Rodrigues oferece para empresas.",
  alternates: { canonical: "/projetos" },
  openGraph: { url: "/projetos" },
}

export default function Projects() {
  return (
    <>
      <section className={`${shell} pt-16 pb-8 sm:pt-24`}>
        <h1 className="max-w-3xl text-[clamp(2.4rem,6vw,4rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-balance">
          Projetos e serviços
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Uma seleção de projetos em que resolvi problemas reais com foco em
          performance, automação e experiência de quem usa. Logo abaixo, o que
          eu posso construir para você.
        </p>
      </section>

      <section className={`${shell} pb-8`} aria-label="Projetos">
        {cases.map((c) => (
          <CaseRow key={c.title} item={c} />
        ))}
      </section>

      <section className={`${shell} py-12`}>
        <div className={`${surface} p-6 sm:p-8`}>
          <h2 className="text-xl font-semibold tracking-tight">
            Também já entreguei
          </h2>
          <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {otherWork.map((w) => (
              <li
                key={w.title}
                className="flex items-baseline justify-between gap-4 border-b border-border/40 pb-3"
              >
                <span className="text-sm">{w.title}</span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {w.kind}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="servicos" className={`${shell} scroll-mt-24 py-16 sm:py-24`}>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Serviços
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Escolha pelo problema que você tem. Se não souber em qual se
            encaixa, me chama e a gente descobre junto.
          </p>
        </div>
        <ServicesPanel detailed />
      </section>

      <ContactCta title="Tem uma ideia ou um processo para resolver?" />
    </>
  )
}
