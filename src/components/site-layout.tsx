"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  WHATSAPP_URL,
} from "@/lib/contact"
import { btnPrimary, shell } from "@/lib/ui"
import { ModeToggle } from "@/components/mode-toggle"
import { WhatsAppBadge } from "@/components/whatsapp-badge"

interface LayoutProps {
  children: React.ReactNode
}

const navLinks = [
  { name: "Início", path: "/" },
  { name: "Projetos", path: "/projetos" },
  { name: "Sobre", path: "/sobre" },
  { name: "Contato", path: "/contato" },
]

function Logo({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <polygon
        points="50,15 11,82.5 89,82.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <polygon
        points="50,30 24,75 76,75"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <polygon
        points="50,45 37,67.5 63,67.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
        opacity="0.4"
      />
      <circle cx="50" cy="60" r="5" fill="currentColor" />
    </svg>
  )
}

export default function SiteLayout({ children }: LayoutProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // O layout fica montado entre as páginas: fecha o menu quando a rota muda
  // (inclusive pelo botão voltar do navegador).
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <nav
          aria-label="Principal"
          className={`${shell} flex h-16 items-center justify-between`}
        >
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-8 w-8 shrink-0 text-brand-soft" />
            <span className="flex flex-col leading-none">
              <span className="text-base font-semibold tracking-tight">
                Thiago Rodrigues
              </span>
              <span className="mt-1 font-mono text-[0.68rem] text-muted-foreground">
                Rods Programming
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex gap-6 text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    aria-current={pathname === link.path ? "page" : undefined}
                    className={`py-1 font-medium transition-colors ${
                      pathname === link.path
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="relative">
                      {link.name}
                      {pathname === link.path && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-brand-soft"
                        />
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnPrimary} px-4 py-2`}
            >
              <WhatsAppBadge className="h-5 w-5" />
              Conversar
            </a>
            <ModeToggle className="-mr-2" />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ModeToggle />
            {/* Botão do menu — só no celular */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="relative -mr-2 flex h-10 w-10 flex-col items-center justify-center rounded-lg transition-colors hover:bg-foreground/5"
            >
              <span
                className="block h-0.5 w-6 origin-center rounded-full bg-foreground transition-transform duration-300"
                style={{
                  transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="mt-1.25 block h-0.5 w-6 rounded-full bg-foreground transition-all duration-200"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              <span
                className="mt-1.25 block h-0.5 w-6 origin-center rounded-full bg-foreground transition-transform duration-300"
                style={{
                  transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="drawer"
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 z-50 flex h-full w-72 max-w-[85vw] flex-col border-l border-border/50 bg-background shadow-2xl md:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-border/50 px-6">
                <span className="font-semibold tracking-tight">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fechar menu"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <nav aria-label="Menu" className="flex flex-1 flex-col gap-1 p-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-foreground/5 text-foreground"
                          : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`block h-5 w-0.75 rounded-full ${
                          isActive ? "bg-brand-soft" : "bg-transparent"
                        }`}
                      />
                      {link.name}
                    </Link>
                  )
                })}
              </nav>

              <div className="border-t border-border/50 p-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btnPrimary} w-full`}
                >
                  <WhatsAppBadge />
                  Conversar no WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex w-full flex-1 flex-col">{children}</main>

      <Footer />
    </div>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  const contactLinks = [
    { name: "WhatsApp", href: WHATSAPP_URL },
    { name: "E-mail", href: `mailto:${EMAIL}` },
    { name: "LinkedIn", href: LINKEDIN_URL },
    { name: "GitHub", href: GITHUB_URL },
  ]

  return (
    <footer className="border-t border-border/50">
      <div
        className={`${shell} grid gap-10 py-12 sm:grid-cols-[2fr_1fr_1fr]`}
      >
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-7 w-7 text-brand-soft" />
            <span className="font-semibold tracking-tight">Thiago Rodrigues</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Desenvolvedor full stack em Manaus. Sites, sistemas internos e
            automações.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Páginas</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <li key={l.path}>
                <Link href={l.path} className="transition-colors hover:text-foreground">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Contato</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {contactLinks.map((l) => (
              <li key={l.name}>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${shell} border-t border-border/50 py-6`}>
        <p className="text-xs text-muted-foreground">
          © {year} Thiago B. Rodrigues
        </p>
      </div>
    </footer>
  )
}
