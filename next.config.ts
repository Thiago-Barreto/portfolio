import type { NextConfig } from "next"

// Endereços antigos/alternativos que o site em Vite aceitava. Agora viram
// redirect 308 no servidor, então o Google consolida tudo na URL principal.
const aliases: Record<string, string[]> = {
  "/": ["/início", "/inicio", "/home", "/starting", "/start"],
  "/sobre": ["/about", "/info"],
  "/projetos": ["/projects", "/servicos", "/services"],
  "/contato": ["/contact"],
}

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(aliases).flatMap(([destination, sources]) =>
      sources.map((source) => ({
        source: encodeURI(source),
        destination,
        permanent: true,
      }))
    )
  },
}

export default nextConfig
