import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const DEFAULT_MAX_DEPTH = 20

type PrimitiveKind = "string" | "number" | "boolean" | "null" | "undefined"

const DEFAULT_PRIMITIVE_CLASS_NAMES: Record<PrimitiveKind, string> = {
  string: "text-blue-600 dark:text-blue-400",
  number: "text-emerald-600 dark:text-emerald-400",
  boolean: "text-amber-600 dark:text-amber-500 font-medium",
  null: "text-muted-foreground italic",
  undefined: "text-muted-foreground/60 italic",
}

interface JsonTableProps {
  data: unknown
  className?: string
  maxDepth?: number
  /** Key name -> localized label. Values are never translated; unmapped keys render as-is. */
  keyTranslations?: Record<string, string>
  /** Overrides the default per-type value classes. Unset types keep their default. */
  primitiveClassNames?: Partial<Record<PrimitiveKind, string>>
}

export function JsonTable({
  data,
  className,
  maxDepth = DEFAULT_MAX_DEPTH,
  keyTranslations,
  primitiveClassNames,
}: JsonTableProps) {
  const ancestors = new WeakSet<object>()
  const content = renderNode(data, 0, maxDepth, ancestors, keyTranslations, primitiveClassNames)
  const kind = getValueKind(data)

  if (kind === "object" || kind === "array-of-objects") {
    return <div className={cn(className)}>{content}</div>
  }

  return (
    <div className={cn(className)}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="align-top whitespace-normal">
              {content}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

type ValueKind =
  | "object"
  | "array-of-objects"
  | "array-of-primitives"
  | "array-mixed"
  | "array-empty"
  | "primitive"

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false
  }
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

function getValueKind(value: unknown): ValueKind {
  if (Array.isArray(value)) {
    if (value.length === 0) return "array-empty"
    if (value.every(isPlainObject)) return "array-of-objects"
    if (value.every((item) => !isPlainObject(item) && !Array.isArray(item))) {
      return "array-of-primitives"
    }
    return "array-mixed"
  }
  if (isPlainObject(value)) return "object"
  return "primitive"
}

function getUniformColumns(items: Record<string, unknown>[]): string[] {
  const columns: string[] = []
  const seen = new Set<string>()
  for (const item of items) {
    for (const key of Object.keys(item)) {
      if (!seen.has(key)) {
        seen.add(key)
        columns.push(key)
      }
    }
  }
  return columns
}

function getPrimitiveTypeClass(
  value: unknown,
  primitiveClassNames: Partial<Record<PrimitiveKind, string>> | undefined
): string {
  const kind: PrimitiveKind | undefined =
    value === null
      ? "null"
      : value === undefined
        ? "undefined"
        : typeof value === "string"
          ? "string"
          : typeof value === "number"
            ? "number"
            : typeof value === "boolean"
              ? "boolean"
              : undefined

  if (!kind) return "text-foreground"
  return primitiveClassNames?.[kind] ?? DEFAULT_PRIMITIVE_CLASS_NAMES[kind]
}

function translateKey(key: string, keyTranslations?: Record<string, string>): string {
  return keyTranslations?.[key] ?? key
}

function formatPrimitiveValue(value: unknown): string {
  if (value === null) return "null"
  if (value === undefined) return "undefined"
  if (typeof value === "string") return `"${value}"`
  return String(value)
}

function renderNode(
  value: unknown,
  depth: number,
  maxDepth: number,
  ancestors: WeakSet<object>,
  keyTranslations: Record<string, string> | undefined,
  primitiveClassNames: Partial<Record<PrimitiveKind, string>> | undefined
): React.ReactNode {
  if (depth > maxDepth) {
    return <span className="text-muted-foreground italic">…</span>
  }

  if (typeof value === "object" && value !== null && ancestors.has(value)) {
    return <span className="text-muted-foreground italic">[Circular]</span>
  }

  switch (getValueKind(value)) {
    case "object": {
      const entries = Object.entries(value as Record<string, unknown>)
      if (entries.length === 0) {
        return <span className="text-muted-foreground italic">{"{}"}</span>
      }
      ancestors.add(value as object)
      const rows = entries.map(([key, val]) => (
        <TableRow key={key}>
          <TableCell className="w-1/3 align-top font-medium text-muted-foreground whitespace-normal">
            {translateKey(key, keyTranslations)}
          </TableCell>
          <TableCell className="align-top whitespace-normal">
            <div className="w-fit max-w-full">
              {renderNode(val, depth + 1, maxDepth, ancestors, keyTranslations, primitiveClassNames)}
            </div>
          </TableCell>
        </TableRow>
      ))
      ancestors.delete(value as object)
      return (
        <Table>
          <TableBody>{rows}</TableBody>
        </Table>
      )
    }

    case "array-empty":
      return <span className="text-muted-foreground italic">[]</span>

    case "array-of-objects": {
      const items = value as Record<string, unknown>[]
      const columns = getUniformColumns(items)
      ancestors.add(value as object)
      const body = items.map((item, index) => (
        <TableRow key={index}>
          {columns.map((column) => (
            <TableCell key={column} className="align-top whitespace-normal">
              <div className="w-fit max-w-full">
                {column in item ? (
                  renderNode(item[column], depth + 1, maxDepth, ancestors, keyTranslations, primitiveClassNames)
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))
      ancestors.delete(value as object)
      return (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{translateKey(column, keyTranslations)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{body}</TableBody>
        </Table>
      )
    }

    case "array-of-primitives": {
      const items = value as unknown[]
      return (
        <span className="whitespace-normal break-words">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <span className={getPrimitiveTypeClass(item, primitiveClassNames)}>
                {formatPrimitiveValue(item)}
              </span>
              {index < items.length - 1 ? ", " : null}
            </React.Fragment>
          ))}
        </span>
      )
    }

    case "array-mixed": {
      const items = value as unknown[]
      ancestors.add(value as object)
      const listItems = items.map((item, index) => (
        <li key={index}>
          {renderNode(item, depth + 1, maxDepth, ancestors, keyTranslations, primitiveClassNames)}
        </li>
      ))
      ancestors.delete(value as object)
      return <ul className="list-none space-y-1">{listItems}</ul>
    }

    case "primitive":
    default:
      return (
        <span className={getPrimitiveTypeClass(value, primitiveClassNames)}>
          {formatPrimitiveValue(value)}
        </span>
      )
  }
}
