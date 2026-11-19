import { EMAIL, WHATSAPP_URL } from "@/lib/contact"
import { btnGhost, btnPrimary, shell } from "@/lib/ui"
import { WhatsAppBadge } from "@/components/whatsapp-badge"

type ContactCtaProps = {
  title?: string
  text?: string
}

export function ContactCta({
  title = "Me conta o que você precisa.",
  text = "Landing page, sistema ou automação: a primeira conversa é para entender o problema e ver se eu sou a pessoa certa para resolver.",
}: Readonly<ContactCtaProps>) {
  return (
    <section className={`${shell} py-16 sm:py-24`}>
      <div
        className="relative overflow-hidden rounded-3xl border border-brand/40 px-6 py-12 sm:px-12 sm:py-16"
        style={{
          background:
            "radial-gradient(110% 140% at 0% 0%, color-mix(in oklab, var(--brand) 38%, transparent), transparent 62%), radial-gradient(80% 120% at 100% 100%, color-mix(in oklab, var(--brand) 18%, transparent), transparent 60%)",
        }}
      >
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-foreground/80">{text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={btnPrimary}
          >
            <WhatsAppBadge />
            Conversar no WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className={btnGhost}>
            Enviar e-mail
          </a>
        </div>
      </div>
    </section>
  )
}
