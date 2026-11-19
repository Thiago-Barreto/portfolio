import { ImageResponse } from "next/og"

// Imagem de compartilhamento (WhatsApp, LinkedIn, Google). Gerada no build.
export const alt = "Thiago Rodrigues — Desenvolvedor Full Stack"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Cores do tema escuro (src/index.css): fundo, texto, apoio e roxo de destaque.
const BACKGROUND = "#030712"
const FOREGROUND = "#f9fafb"
const MUTED = "#9ca3af"
const BRAND = "#8100d1"
const BRAND_SOFT = "#b48cff"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `radial-gradient(circle at 85% 10%, ${BRAND}66, transparent 55%), ${BACKGROUND}`,
          color: FOREGROUND,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 100 100">
            <polygon
              points="50,15 11,82.5 89,82.5"
              fill="none"
              stroke={BRAND_SOFT}
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <polygon
              points="50,30 24,75 76,75"
              fill="none"
              stroke={BRAND_SOFT}
              strokeWidth="5"
              strokeLinejoin="round"
              opacity="0.7"
            />
            <polygon
              points="50,45 37,67.5 63,67.5"
              fill="none"
              stroke={BRAND_SOFT}
              strokeWidth="5"
              strokeLinejoin="round"
              opacity="0.4"
            />
            <circle cx="50" cy="60" r="5" fill={BRAND_SOFT} />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 600 }}>
              Thiago Rodrigues
            </span>
            <span style={{ fontSize: 22, color: MUTED }}>Rods Programming</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1,
            }}
          >
            Do site ao sistema interno.
          </span>
          <span style={{ marginTop: 28, fontSize: 32, color: MUTED }}>
            Desenvolvedor full stack em Manaus · sites, sistemas e automações
          </span>
        </div>
      </div>
    ),
    size
  )
}
