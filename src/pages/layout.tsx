import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

interface LayoutMainProps {
  children: React.ReactNode;
}

export default function LayoutMain({ children }: Readonly<LayoutMainProps>) {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <header className="bg-background/70 fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-violet-500/10 px-10 py-6 backdrop-blur-md">
        <a
          href="/"
          className="text-xl font-semibold tracking-widest uppercase transition-colors hover:text-violet-300"
        >
          {import.meta.env.VITE_NAME_PORTFOLIO}
        </a>
        <motion.div
          className="relative flex h-12 w-12 items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-violet-500/20 blur-md" />
          <div
            className="absolute h-full w-full"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              border: "1px solid rgba(167,139,250,0.5)",
            }}
          />
          <div
            className="absolute h-7 w-7"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              border: "2px solid rgba(167,139,250,0.8)",
            }}
          />
          <motion.span
            className="absolute h-2 w-2 rounded-full bg-violet-400"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <nav className="flex items-center gap-8">
          {[
            { label: "Início", to: "/" },
            { label: "Sobre", to: "/sobre" },
            { label: "Projetos", to: "/projetos" },
            { label: "Contato", to: "/contato" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <ModeToggle />
        </nav>
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
      </header>
      <section className="relative min-h-full w-full px-10 py-12 pt-32">
        {children}
      </section>
    </main>
  );
}
