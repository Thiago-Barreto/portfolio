// Projetos em formato de case: problema, solução e resultado.
// Para destacar um projeto na home, marque `featured: true`.
// Quando tiver números reais (horas economizadas, volume processado), coloque em `outcome`.
// Prints: salve em src/assets/cases/, importe aqui e preencha `image` e `imageAlt`.

import type { StaticImageData } from "next/image"

export type Case = {
  title: string
  kind: string
  problem: string
  solution: string
  outcome: string
  stack: string[]
  featured?: boolean
  /**
   * Print da tela (importe de src/assets/cases). Opcional: sem ele, o case fica só em texto.
   * Antes de exportar, troque nomes de empresa, CNPJs e números reais por dados fictícios.
   */
  image?: StaticImageData
  /** Descrição curta do que aparece no print, para leitor de tela. */
  imageAlt?: string
}

export const cases: Case[] = [
  {
    title: "Dashboard de inspeção industrial",
    kind: "Sistema web",
    problem:
      "Os registros de inspeção ficavam espalhados, o que dificultava enxergar defeitos recorrentes.",
    solution:
      "Aplicação web para registrar e analisar inspeções, com filtros, gráficos e login com JWT.",
    outcome: "Qualidade e produção passam a consultar os mesmos dados, no mesmo lugar.",
    stack: ["React", "TypeScript", "Node.js", "MySQL"],
    featured: true,
  },
  {
    title: "Automação de certidões por CNPJ",
    kind: "Automação desktop",
    problem:
      "Emitir certidões federais para uma lista de CNPJs, uma por uma, tomava horas de trabalho manual.",
    solution:
      "App desktop que lê a planilha de CNPJs e emite as certidões automaticamente, em sequência.",
    outcome: "Menos tempo operacional e nenhum CNPJ digitado à mão.",
    stack: ["Python", "CustomTkinter", "Web scraping"],
    featured: true,
  },
  {
    title: "Gestão de proventos de FIIs",
    kind: "App desktop",
    problem:
      "Acompanhar proventos e calcular o preço teto de vários fundos exigia planilhas manuais.",
    solution:
      "App que centraliza os proventos, calcula o preço teto e exporta os dados para Excel.",
    outcome: "A decisão de compra começa com os números já calculados.",
    stack: ["Python", "CustomTkinter", "Excel"],
  },
  {
    title: "Sistema interno de login",
    kind: "Arquitetura de acesso",
    problem:
      "Os sistemas internos precisavam de um acesso único e seguro, com permissões diferentes por perfil.",
    solution:
      "Autenticação com expiração de token e controle de acesso por perfil, reaproveitável entre sistemas.",
    outcome: "Cada pessoa vê apenas o que o seu perfil permite.",
    stack: ["Node.js", "JWT", "MySQL"],
  },
]

/** Outros trabalhos entregues, em uma linha cada (vindos da trajetória). */
export const otherWork = [
  { title: "ERP interno", kind: "Sistema interno" },
  { title: "Controle de defeitos e qualidade", kind: "Sistema interno" },
  { title: "Dashboards analíticos e operacionais", kind: "Dashboards" },
  { title: "Landing page integrada a relatórios do Power BI", kind: "Landing page" },
  { title: "Site institucional para empresa de guinchos", kind: "Landing page" },
  { title: "Landing page para projeto NFT", kind: "Landing page" },
]
