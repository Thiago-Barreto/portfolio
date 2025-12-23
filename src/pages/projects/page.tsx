import LayoutMain from "../layout";
import { ProjectCard, projects } from "./projects";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <LayoutMain>
      <section className="relative mx-auto max-w-6xl px-10 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-0"
        >
          <p className="mb-2 text-xs tracking-widest text-violet-400 uppercase">
            System Modules
          </p>
          <h1 className="text-4xl font-semibold md:text-5xl">
            Projetos &<span className="text-violet-400"> Serviços</span>
          </h1>
        </motion.div>
        <div className="grid gap-10 md:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-background/60 relative overflow-hidden rounded-2xl border border-violet-500/20 p-6 backdrop-blur-md"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <h3 className="mb-3 text-lg font-medium">{project.title}</h3>

              <p className="text-muted-foreground mb-6 text-sm">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-violet-500/20 px-3 py-1 text-xs text-violet-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Linha ativa */}
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-violet-500 transition-all duration-300 group-hover:w-3/4" />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 mb-36 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Tem uma ideia ou um problema para resolver?
          </p>
          <a
            href="https://wa.me/5592992391957?text=Olá,%20Thiago!%20Vi%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm tracking-widest text-violet-400 uppercase transition hover:text-violet-300"
          >
            Vamos conversar →
          </a>
        </motion.div>
        <section className="space-y-10">
          <header className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight">Projetos</h2>
            <p className="text-muted-foreground max-w-xl">
              Uma seleção de projetos onde resolvi problemas reais com foco em
              performance, automação e experiência do usuário.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {ProjectCard.map((project) => (
              <article
                key={project.title}
                className="group border-border/50 rounded-xl border p-6 transition hover:border-violet-400/40"
              >
                <h3 className="text-lg font-medium tracking-tight">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mt-2 text-sm">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-muted text-muted-foreground rounded-md px-2 py-1 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <span className="text-sm text-violet-400 opacity-0 transition group-hover:opacity-100">
                    Ver detalhes →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </LayoutMain>
  );
}
