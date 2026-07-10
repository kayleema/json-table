"use client"

import * as React from "react"

import { THEME_STORAGE_KEY } from "@/lib/theme/theme-script"

type Theme = "light" | "dark"

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  mounted: boolean
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("light")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setThemeState(document.documentElement.classList.contains("dark") ? "dark" : "light")
    setMounted(true)
  }, [])

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next)
    document.documentElement.classList.toggle("dark", next === "dark")
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // localStorage unavailable (private mode, etc.) — theme just won't persist
    }
  }, [])

  const value = React.useMemo(
    () => ({ theme, setTheme, mounted }),
    [theme, setTheme, mounted]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
