"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

export function CopyCommand({
  command,
  label = "Copy command",
  className,
}: {
  command: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 rounded-lg border bg-muted/50 px-4 py-3 font-mono text-sm",
        className
      )}
    >
      <code className="overflow-x-auto whitespace-nowrap">{command}</code>
      <button
        type="button"
        aria-label={label}
        onClick={() => {
          navigator.clipboard.writeText(command)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }}
        className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        {copied ? (
          <Check className="size-4" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
    </div>
  )
}
