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
import {
  formatPrimitiveValue,
  getPrimitiveTypeClass,
  getUniformColumns,
  getValueKind,
} from "@/registry/new-york/lib/json-table-utils"

const DEFAULT_MAX_DEPTH = 20

interface JsonTableProps {
  data: unknown
  className?: string
  maxDepth?: number
}

export function JsonTable({
  data,
  className,
  maxDepth = DEFAULT_MAX_DEPTH,
}: JsonTableProps) {
  const ancestors = new WeakSet<object>()
  const content = renderNode(data, 0, maxDepth, ancestors)
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

function renderNode(
  value: unknown,
  depth: number,
  maxDepth: number,
  ancestors: WeakSet<object>
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
            {key}
          </TableCell>
          <TableCell className="align-top whitespace-normal">
            <div className="w-fit max-w-full">
              {renderNode(val, depth + 1, maxDepth, ancestors)}
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
                  renderNode(item[column], depth + 1, maxDepth, ancestors)
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
                <TableHead key={column}>{column}</TableHead>
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
              <span className={getPrimitiveTypeClass(item)}>
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
        <li key={index}>{renderNode(item, depth + 1, maxDepth, ancestors)}</li>
      ))
      ancestors.delete(value as object)
      return <ul className="list-none space-y-1">{listItems}</ul>
    }

    case "primitive":
    default:
      return (
        <span className={getPrimitiveTypeClass(value)}>
          {formatPrimitiveValue(value)}
        </span>
      )
  }
}
