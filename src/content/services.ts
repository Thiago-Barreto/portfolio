export type Service = {
  id: string
  title: string
  desc: string
  forWho: string
  long: string
  deliverables: string[]
  stack: string[]
}

export const services: Service[] = [
  {
    id: "sites",
    title: "Sites e landing pages",
    desc: "Páginas rápidas e bem estruturadas para apresentar o seu negócio e transformar visita em contato.",
    forWho: "Para quem está lançando algo ou precisa de uma presença online que funcione.",
    long: "Crio o site do conceito à publicação: estrutura, texto, interface e performance. Cada página é pensada para carregar rápido, funcionar bem no celular e levar o visitante até o contato.",
    deliverables: [
      "Layout responsivo, rápido em qualquer tela",
      "Estrutura pensada para gerar contato",
      "Integração com WhatsApp, formulários ou relatórios",
      "Publicação e acompanhamento pós-entrega",
    ],
    stack: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: "sistemas",
    title: "Sistemas web e internos",
    desc: "Ferramentas sob medida para controlar, gerir e analisar a operação da sua empresa.",
    forWho: "Para empresas que controlam processos em planilha, papel ou num sistema que já não atende.",
    long: "Desenvolvo soluções feitas para a realidade do seu processo, de dashboards de gestão a sistemas de controle e análise de dados, com acesso seguro e a informação certa na hora certa.",
    deliverables: [
      "Painéis e dashboards de controle e análise",
      "Login seguro e acesso por perfil",
      "Modelagem e organização do banco de dados",
      "Relatórios e exportações sob demanda",
    ],
    stack: ["React", "Node.js", "MySQL"],
  },
  {
    id: "automacoes",
    title: "Automações",
    desc: "Tarefas repetitivas viram rotinas automáticas, com menos tempo gasto e menos erro manual.",
    forWho: "Para equipes que perdem horas copiando dados entre sistemas e planilhas.",
    long: "Transformo tarefas manuais em rotinas automáticas e confiáveis. Integro sistemas, extraio e organizo dados e elimino gargalos, liberando tempo da sua equipe.",
    deliverables: [
      "Automação de tarefas repetitivas e coleta de dados",
      "Integrações entre sistemas e planilhas",
      "Apps desktop simples para quem opera a rotina",
      "Scripts documentados e fáceis de manter",
    ],
    stack: ["Python", "Selenium", "APIs"],
  },
]
