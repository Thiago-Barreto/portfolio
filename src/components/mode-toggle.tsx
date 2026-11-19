"use client"

import { Moon, Sun } from "lucide-react"

import { getSystemTheme, useTheme } from "@/components/theme-provider"

/** Alterna entre escuro (padrão) e claro com um clique. */
export function ModeToggle({ className = "" }: Readonly<{ className?: string }>) {
  const { theme, setTheme } = useTheme()
  const isDark =
    theme === "dark" || (theme === "system" && getSystemTheme() === "dark")
  const label = isDark ? "Mudar para tema claro" : "Mudar para tema escuro"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground ${className}`}
    >
      {isDark ? (
        <Sun className="h-[1.1rem] w-[1.1rem]" />
      ) : (
        <Moon className="h-[1.1rem] w-[1.1rem]" />
      )}
    </button>
  )
}
