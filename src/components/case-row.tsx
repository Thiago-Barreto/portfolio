import Image from "next/image"
import type { Case } from "@/content/cases"
import { tag } from "@/lib/ui"

export function CaseRow({ item }: Readonly<{ item: Case }>) {
  const parts = [
    { label: "Problema", text: item.problem },
    { label: "Solução", text: item.solution },
    { label: "Resultado", text: item.outcome },
  ]

  return (
    <article className="grid gap-6 border-t border-border/60 py-10 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-12">
      {/* Com print, o título acompanha a rolagem para não deixar um vão ao lado da imagem */}
      <div className={item.image ? "md:sticky md:top-24 md:self-start" : undefined}>
        <p className="font-mono text-xs text-brand-soft">{item.kind}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-balance">
          {item.title}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologias">
          {item.stack.map((tech) => (
            <li key={tech} className={tag}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {item.image && (
          // Moldura neutra (paspatur): isola as cores do projeto das cores da marca.
          // Todos os prints no mesmo recorte 16:10, ancorado no topo da tela.
          <figure className="mb-8 rounded-xl border border-border/60 bg-border p-3 dark:bg-background">
            <Image
              src={item.image}
              alt={item.imageAlt ?? `Tela do projeto ${item.title}`}
              placeholder="blur"
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="aspect-[16/10] w-full rounded-lg object-cover object-top"
            />
          </figure>
        )}
        <dl className="grid gap-5 sm:grid-cols-3">
          {parts.map((p) => (
            <div key={p.label}>
              <dt className="text-sm font-medium">{p.label}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {p.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}
