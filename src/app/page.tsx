import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { HomeHero } from "@/components/home-hero"
import { CaseRow } from "@/components/case-row"
import { ServicesPanel } from "@/components/services-panel"
import { ContactCta } from "@/components/contact-cta"
import { cases } from "@/content/cases"
import { shell, textLink } from "@/lib/ui"
import Photo from "@/assets/thiago-rodrigues.jpeg"

const steps = [
  {
    title: "Conversa",
    text: "Você conta o problema. Eu faço as perguntas certas e digo se faz sentido construir.",
  },
  {
    title: "Proposta",
    text: "Escopo, prazo e valor combinados por escrito antes de começar.",
  },
  {
    title: "Construção",
    text: "Entregas em partes, para você ver funcionando cedo e ajustar o rumo.",
  },
  {
    title: "Entrega e suporte",
    text: "Publicação, ajustes finos e acompanhamento depois de entregar.",
  },
]

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function Home() {
  const featured = cases.filter((c) => c.featured)

  return (
    <>
      <HomeHero />

      {/* SERVIÇOS */}
      <section id="servicos" className={`${shell} py-16 sm:py-24`}>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            O que eu faço
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Três tipos de projeto, do mais simples ao mais complexo. Muitas
            vezes eles se juntam: o site que capta o cliente, o sistema que
            organiza o atendimento e a automação que tira o trabalho repetitivo.
          </p>
        </div>
        <ServicesPanel />
        <p className="mt-6 text-sm text-muted-foreground">
          Quer ver o que está incluído em cada um?{" "}
          <Link href="/projetos#servicos" className={textLink}>
            Detalhes dos serviços
          </Link>
        </p>
      </section>

      {/* PROJETOS EM DESTAQUE */}
      <section className={`${shell} py-16 sm:py-24`}>
        <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Projetos que já rodam
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Problemas reais de operação, resolvidos com software.
            </p>
          </div>
          <Link href="/projetos" className={`${textLink} shrink-0 text-sm`}>
            Ver todos os projetos
          </Link>
        </div>
        {featured.map((c) => (
          <CaseRow key={c.title} item={c} />
        ))}
      </section>

      {/* COMO EU TRABALHO */}
      <section className={`${shell} py-16 sm:py-24`}>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Como funciona
        </h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-soft/50 font-mono text-sm text-brand-soft">
                  {i + 1}
                </span>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-border lg:block"
                  />
                )}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* SOBRE (CURTO) */}
      <section className={`${shell} py-16 sm:py-24`}>
        <div className="grid items-center gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-14">
          <Image
            src={Photo}
            alt="Thiago Rodrigues"
            placeholder="blur"
            sizes="16rem"
            className="aspect-[4/5] w-full max-w-[16rem] rounded-2xl object-cover"
          />
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Quem vai construir
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Programo desde 2019. Comecei fazendo landing pages como
              freelancer, passei por jovem aprendiz e auxiliar de engenharia, e
              hoje desenvolvo sistemas internos para a operação de uma
              empresa. Sou bacharel em Ciência da Computação pela UNIP.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Você fala direto comigo, do primeiro contato à entrega.
            </p>
            <Link href="/sobre" className={`${textLink} mt-6 inline-block text-sm`}>
              Minha trajetória completa
            </Link>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
