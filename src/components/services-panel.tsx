import { services } from "@/content/services"
import { WHATSAPP_URL } from "@/lib/contact"
import { btnPrimary, tag, surface, textLink } from "@/lib/ui"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { WhatsAppBadge } from "@/components/whatsapp-badge"

/**
 * Os três serviços num painel só, divididos por linhas.
 * Com `detailed`, cada coluna abre um diálogo com o que está incluído.
 */
export function ServicesPanel({ detailed = false }: Readonly<{ detailed?: boolean }>) {
  return (
    <div className={`${surface} grid overflow-hidden md:grid-cols-3`}>
      {services.map((s, i) => (
        <div
          key={s.id}
          className={`flex flex-col p-6 sm:p-8 ${
            i > 0 ? "border-t border-border/60 md:border-t-0 md:border-l" : ""
          }`}
        >
          <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {s.desc}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/85">
            {s.forWho}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologias">
            {s.stack.map((tech) => (
              <li key={tech} className={tag}>
                {tech}
              </li>
            ))}
          </ul>

          {detailed && (
            <Dialog>
              <DialogTrigger className={`${textLink} mt-6 w-fit text-left text-sm`}>
                Ver o que está incluído
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-xl">{s.title}</DialogTitle>
                  <DialogDescription className="leading-relaxed">
                    {s.long}
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <p className="mb-3 text-sm font-medium">O que está incluído</p>
                  <ul className="space-y-2">
                    {s.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm text-muted-foreground"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-soft" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btnPrimary} mt-2 w-full sm:w-fit`}
                >
                  <WhatsAppBadge />
                  Conversar no WhatsApp
                </a>
              </DialogContent>
            </Dialog>
          )}
        </div>
      ))}
    </div>
  )
}
