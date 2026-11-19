import { FaWhatsapp } from "react-icons/fa"

/**
 * Selo verde do WhatsApp para usar dentro do botão roxo.
 * O roxo continua sendo a marca; o verde só identifica o canal.
 */
export function WhatsAppBadge({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <span
      aria-hidden
      className={`-ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white ${className}`}
    >
      <FaWhatsapp className="h-3.5 w-3.5" />
    </span>
  )
}
