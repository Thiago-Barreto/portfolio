"use client"

import { MotionConfig } from "framer-motion"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider defaultTheme="dark">
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  )
}
