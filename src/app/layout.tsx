import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Space_Grotesk } from "next/font/google"
import "@/index.css"
import { Providers } from "./providers"
import SiteLayout from "@/components/site-layout"
import { THEME_STORAGE_KEY } from "@/lib/theme"
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/contact"
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Thiago Rodrigues",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "desenvolvedor full stack",
    "programador freelancer",
    "desenvolvedor web",
    "freelancer react",
    "criar site",
    "desenvolvimento de sistemas",
    "sistema interno",
    "automação",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Thiago Rodrigues",
    "desenvolvedor Manaus",
    "freelancer Brasil",
  ],
  authors: [{ name: "Thiago B. Rodrigues", url: SITE_URL }],
  creator: "Thiago B. Rodrigues",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: { icon: "/favicon.svg" },
}

export const viewport: Viewport = {
  themeColor: "#8100D1",
  colorScheme: "dark light",
}

// Aplica o tema salvo antes da primeira pintura (evita piscar claro). Padrão: escuro.
const themeScript = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})||"dark";if(t==="system")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add("dark")}`

// Dados estruturados (Google Rich Results).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Thiago B. Rodrigues",
  alternateName: "Rods Programming",
  url: SITE_URL,
  jobTitle: "Desenvolvedor Full Stack",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Manaus",
    addressRegion: "AM",
    addressCountry: "BR",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Desenvolvimento Web",
    "Sistemas internos",
    "Automação de processos",
    "Front-end",
    "Back-end",
    "Full Stack",
  ],
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Desenvolvimento Web Freelance",
      description:
        "Criação de sites, sistemas web e automações com React, Next.js e Node.js",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replaceAll("<", String.raw`<`),
          }}
        />
        <Providers>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  )
}
