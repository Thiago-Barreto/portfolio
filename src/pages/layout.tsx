import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

interface LayoutMainProps {
  children: React.ReactNode;
}

export default function LayoutMain({ children }: Readonly<LayoutMainProps>) {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <header className="relative z-50 flex items-center justify-between px-10 py-6">
        <a
          href="/"
          className="text-xl font-semibold tracking-widest text-violet-400 uppercase transition-colors hover:text-violet-300"
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
      </header>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
      <section className="relative px-10 py-12">{children}</section>
    </main>
  );
}
