import { motion } from "framer-motion";
import LayoutMain from "../layout";
import {
  FaCss3Alt,
  FaDocker,
  FaHtml5,
  FaJava,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNestjs,
  SiMysql,
  SiCplusplus,
} from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { IoLogoElectron, IoLogoJavascript } from "react-icons/io5";
import { OrbitRing } from "./OrbitRing";
import { TbBrandCSharp } from "react-icons/tb";

export default function Home() {
  return (
    <LayoutMain>
      <div className="mt-10 flex min-h-full w-full items-center justify-around gap-10">
        <section className="relative flex min-h-[full] flex-col items-center justify-center text-center">
          {/* STATUS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 flex items-center gap-2 text-xs tracking-widest text-violet-400 uppercase"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
            System Online
          </motion.div>
          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl"
          >
            Construindo experiências{" "}
            <span className="text-violet-400">digitais</span>
            <br />
            com precisão e intenção
          </motion.h1>
          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-muted-foreground mt-6 max-w-xl text-sm leading-relaxed md:text-base"
          >
            Desenvolvedor FullStack focado em interfaces modernas, sistemas
            escaláveis e experiências que equilibram estética e performance.
          </motion.p>
          {/* ACTIONS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mt-10 flex items-center gap-6"
          >
            <a
              href="/projetos"
              className="relative px-6 py-3 text-sm tracking-wider text-violet-400 uppercase transition hover:text-violet-300"
            >
              Ver Projetos
              <span className="absolute -bottom-1 left-0 h-px w-full bg-violet-500/60" />
            </a>
            <a
              href="/sobre"
              className="text-muted-foreground hover:text-foreground text-sm tracking-wider uppercase transition"
            >
              Sobre mim
            </a>
          </motion.div>
        </section>
        <div className="relative h-105 w-105">
          <OrbitRing
            radius={180}
            speed={60}
            icons={[<FaReact />, <SiTypescript />, <FaNodeJs />, <SiMysql />]}
          />
          <OrbitRing
            radius={140}
            speed={50}
            icons={[
              <IoLogoElectron />,
              <SiTailwindcss />,
              <SiNestjs />,
              <FaPython />,
            ]}
          />
          <OrbitRing
            radius={100}
            speed={40}
            icons={[
              <TbBrandCSharp />,
              <SiCplusplus />,
              <FaHtml5 />,
              <FaCss3Alt />,
            ]}
          />
          <OrbitRing
            radius={65}
            speed={30}
            icons={[
              <FaDocker />,
              <RiNextjsFill />,
              <FaJava />,
              <IoLogoJavascript />,
            ]}
          />
        </div>
      </div>
    </LayoutMain>
  );
}
