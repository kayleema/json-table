"use client"

import { Moon, Sun } from "lucide-react"

import { useLocale } from "@/lib/i18n/locale-context"
import { useTheme } from "@/lib/theme/theme-context"

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme()
  const { dict } = useLocale()

  if (!mounted) {
    return (
      <button
        type="button"
        aria-hidden="true"
        disabled
        className="shrink-0 rounded-md border p-2 opacity-0"
      >
        <Sun className="size-4" />
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-label={dict.themeToggle.ariaLabel}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="shrink-0 rounded-md border p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
