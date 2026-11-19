"use client"

import * as React from "react"
import { THEME_STORAGE_KEY } from "@/lib/theme"

type Theme = "dark" | "light" | "system"
type ResolvedTheme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"
const THEME_VALUES: Theme[] = ["dark", "light", "system"]
/** Avisa as outras instâncias nesta aba (o evento "storage" só dispara em outras abas). */
const THEME_CHANGE_EVENT = "theme-change"

const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined)

function isTheme(value: string | null): value is Theme {
  if (value === null) {
    return false
  }

  return THEME_VALUES.includes(value as Theme)
}

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "dark"
  }

  if (window.matchMedia(COLOR_SCHEME_QUERY).matches) {
    return "dark"
  }

  return "light"
}

function readStoredTheme(storageKey: string): Theme | null {
  try {
    const value = localStorage.getItem(storageKey)
    return isTheme(value) ? value : null
  } catch {
    // Sem acesso ao localStorage (modo privado, cookies bloqueados).
    return null
  }
}

function writeStoredTheme(storageKey: string, theme: Theme) {
  try {
    localStorage.setItem(storageKey, theme)
  } catch {
    // Segue sem persistir: o tema ainda muda nesta visita.
  }
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(THEME_CHANGE_EVENT, onChange)

  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(THEME_CHANGE_EVENT, onChange)
  }
}

/** No servidor (e durante a hidratação) o tema salvo ainda é desconhecido. */
function getServerSnapshot() {
  return undefined
}

function disableTransitionsTemporarily() {
  const style = document.createElement("style")
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;transition:none!important}"
    )
  )
  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove()
      })
    })
  }
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable) {
    return true
  }

  const editableParent = target.closest(
    "input, textarea, select, [contenteditable='true']"
  )
  if (editableParent) {
    return true
  }

  return false
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  // undefined = ainda no servidor/hidratação; null = nada salvo.
  // Assim o primeiro render no navegador bate com o HTML do servidor.
  const storedTheme = React.useSyncExternalStore(
    subscribe,
    () => readStoredTheme(storageKey),
    getServerSnapshot
  )
  const hydrated = storedTheme !== undefined
  const theme: Theme = storedTheme ?? defaultTheme

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      writeStoredTheme(storageKey, nextTheme)
    },
    [storageKey]
  )

  const applyTheme = React.useCallback(
    (nextTheme: Theme) => {
      const root = document.documentElement
      const resolvedTheme =
        nextTheme === "system" ? getSystemTheme() : nextTheme
      const restoreTransitions = disableTransitionOnChange
        ? disableTransitionsTemporarily()
        : null

      root.classList.remove("light", "dark")
      root.classList.add(resolvedTheme)

      if (restoreTransitions) {
        restoreTransitions()
      }
    },
    [disableTransitionOnChange]
  )

  React.useEffect(() => {
    // Antes de hidratar, quem manda é o script do <head> (já aplicou o tema salvo).
    if (!hydrated) {
      return undefined
    }

    applyTheme(theme)

    if (theme !== "system") {
      return undefined
    }

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)
    const handleChange = () => {
      applyTheme("system")
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [hydrated, theme, applyTheme])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (isEditableTarget(event.target)) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      const resolved = theme === "system" ? getSystemTheme() : theme
      setTheme(resolved === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [theme, setTheme])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme]
  )

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
