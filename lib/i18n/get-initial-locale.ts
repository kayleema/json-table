import { cookies, headers } from "next/headers"

import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n/dictionaries"

export async function getInitialLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale
  }

  const headerStore = await headers()
  const preferred = headerStore.get("accept-language")?.split(",")[0]?.trim().toLowerCase()
  if (preferred?.startsWith("ja")) {
    return "ja"
  }

  return defaultLocale
}
