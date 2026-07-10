"use client"

import { useLocale } from "@/lib/i18n/locale-context"

export function LanguageToggle() {
  const { locale, setLocale, dict } = useLocale()

  return (
    <button
      type="button"
      aria-label={dict.languageToggle.ariaLabel}
      onClick={() => setLocale(locale === "en" ? "ja" : "en")}
      className="shrink-0 rounded-md border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      {dict.languageToggle.targetLabel}
    </button>
  )
}
