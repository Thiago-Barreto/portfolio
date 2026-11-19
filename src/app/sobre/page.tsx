import type { Metadata } from "next"
import { timeLine } from "./timeline"
import { principles } from "./principles"
import { ContactCta } from "@/components/contact-cta"
import { shell } from "@/lib/ui"
import Image from "next/image"
import Photo from "@/assets/thiago-rodrigues.jpeg"

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Thiago Barreto Rodrigues, desenvolvedor full stack em Manaus desde 2019. Trajetória com landing pages, ERP, controle de qualidade, dashboards e automação para a indústria.",
  alternates: { canonical: "/sobre" },
  openGraph: { url: "/sobre" },
}

export default function About() {
  return (
    <>
      {/* APRESENTAÇÃO */}
      <section className={`${shell} pt-16 sm:pt-24`}>
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
          <div className="max-w-2xl">
            <h1 className="text-[clamp(2.4rem,6vw,4rem)] leading-[1.02] font-semibold tracking-[-0.03em]">
              Thiago Barreto Rodrigues
            </h1>
            <p className="mt-3 text-lg text-foreground/85">
              Desenvolvedor full stack em Manaus
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Escrevo software desde 2019. Comecei com landing pages como
              freelancer e fui para dentro das empresas: manutenção de
              sistemas, automação de processos e, depois, sistemas internos
              completos como ERP, controle de qualidade e dashboards. Hoje uno
              as duas pontas: o site que apresenta o seu negócio e o sistema
              que organiza a sua operação.
            </p>
            <blockquote className="mt-8 border-l-2 border-brand-soft/60 pl-5 text-sm leading-relaxed text-muted-foreground italic">
              “Quando pensar em desistir, lembre-se que tem alguém que te acha a
              pessoa mais incrível do mundo.”
            </blockquote>
          </div>
          <div className="relative w-full max-w-xs justify-self-start md:justify-self-end">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] opacity-60 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, color-mix(in oklab, var(--brand) 55%, transparent), transparent 70%)",
              }}
            />
            <Image
              src={Photo}
              alt="Thiago Rodrigues"
              placeholder="blur"
              preload
              sizes="(min-width: 768px) 20rem, 100vw"
              className="relative aspect-[4/5] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* TRAJETÓRIA */}
      <section className={`${shell} py-16 sm:py-24`}>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Trajetória
        </h2>
        <ol className="mt-12 border-l border-border pl-8">
          {timeLine.map((item) => (
            <li key={item.year} className="relative pb-12 last:pb-0">
              <span
                aria-hidden
                className="absolute top-1.5 -left-[2.4rem] h-3 w-3 rounded-full border-2 border-background bg-brand-soft"
              />
              <p className="font-mono text-sm text-brand-soft">{item.year}</p>
              <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
              {item.list && (
                <ul className="mt-4 max-w-xl space-y-2">
                  {item.list.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* PRINCÍPIOS */}
      <section className={`${shell} py-16 sm:py-24`}>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Como eu penso
        </h2>
        <dl className="mt-10 grid border-t border-border/60 md:grid-cols-3">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className={`py-8 md:px-8 md:first:pl-0 ${
                i > 0 ? "border-t border-border/60 md:border-t-0 md:border-l" : ""
              }`}
            >
              <dt className="text-lg font-semibold">{p.title}</dt>
              <dd className="mt-2 leading-relaxed text-muted-foreground">
                {p.desc}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <ContactCta />
    </>
  )
}
