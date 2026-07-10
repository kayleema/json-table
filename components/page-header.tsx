"use client"

import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLocale } from "@/lib/i18n/locale-context"

export function PageHeader() {
  const { dict } = useLocale()

  return (
    <header className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">{dict.header.title}</h1>
        <p className="text-muted-foreground">{dict.header.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </header>
  )
}
