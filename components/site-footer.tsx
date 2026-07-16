"use client"

import { useLocale } from "@/lib/i18n/locale-context"

export function SiteFooter() {
  const { dict } = useLocale()

  return (
    <footer className="border-t pt-6 text-sm text-muted-foreground flex flex-col gap-1">
      <p>
        {dict.footer.line1Prefix}
        <a
          href="https://skypattern.jp"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          skypattern.jp
        </a>
        {dict.footer.line1Connector}
        <a
          href="https://kaylee.jp"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          kaylee.jp
        </a>
        {dict.footer.line1Suffix}
      </p>
      <p>
        {dict.footer.line2Prefix}
        <a
          href="https://skypattern.jp"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-2 hover:text-foreground"
        >
          SkyPattern
        </a>
        {dict.footer.line2Suffix}
      </p>
    </footer>
  )
}
