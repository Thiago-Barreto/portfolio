import type { Metadata } from "next"
import Link from "next/link"
import { btnGhost, shell } from "@/lib/ui"

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className={`${shell} flex flex-1 flex-col justify-center py-24`}>
      <p className="font-mono text-sm text-brand-soft">404</p>
      <h1 className="mt-4 text-[clamp(2.4rem,6vw,4rem)] leading-[1.02] font-semibold tracking-[-0.03em]">
        Esta página não existe
      </h1>
      <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
        O endereço pode ter mudado. Volte para o início e siga por lá.
      </p>
      <Link href="/" className={`${btnGhost} mt-10 w-fit`}>
        Voltar para o início
      </Link>
    </section>
  )
}
