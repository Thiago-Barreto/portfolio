import { motion } from "framer-motion";
import LayoutMain from "../layout";
import { timeLine } from "./timeLine";
import { principles } from "./principles";
import Photo from "@/assets/WhatsApp Image 2025-12-15 at 21.51.08.jpeg";

export default function About() {
  return (
    <LayoutMain>
      <section className="relative mx-auto max-w-6xl px-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-background/60 relative mb-24 overflow-hidden rounded-2xl border border-violet-500/20 p-8 backdrop-blur-md"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent" />
          <div className="relative flex items-center justify-between">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold tracking-tight">
                Thiago Barreto Rodrigues
              </h2>

              <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed italic">
                “Quando pensar em desistir, lembre-se que tem alguém que te acha
                a pessoa mais incrível do mundo.”
              </p>

              <span className="mt-4 inline-block text-xs tracking-widest text-violet-400 uppercase">
                • Software Developer •
              </span>
            </div>
            <div className="relative flex flex-col items-center">
              <span className="mb-1 h-px w-32 bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-60" />
              <span className="mb-4 h-px w-24 bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-40" />
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-violet-500/30 blur-xl" />
                <img
                  src={Photo}
                  alt="Foto de perfil"
                  className="relative h-80 w-80 rounded-xl object-cover"
                />
              </div>
              <span className="mt-4 h-[3px] w-36 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
              <span className="mt-1 h-[3px] w-44 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-80" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="mb-2 text-xs tracking-widest text-violet-400 uppercase">
            System Profile
          </p>
          <h1 className="text-4xl font-semibold md:text-5xl">
            Evolução contínua
            <span className="text-violet-400"> orientada a propósito</span>
          </h1>
        </motion.div>
        <div className="relative border-l border-violet-500/30 pl-8">
          {timeLine.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="mb-12"
            >
              <span className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full bg-violet-400" />
              <p className="text-muted-foreground text-xs">{item.year}</p>
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-muted-foreground max-w-md">{item.desc}</p>
              <ul>
                {item.list?.map((point, idx) => (
                  <li
                    key={idx}
                    className="text-muted-foreground ml-5 list-disc text-xs"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="rounded-lg border border-violet-500/20 p-6"
            >
              <h4 className="mb-2 text-sm tracking-wider text-violet-400 uppercase">
                {p.title}
              </h4>
              <p className="text-muted-foreground text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </LayoutMain>
  );
}
