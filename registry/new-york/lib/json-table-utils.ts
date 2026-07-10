export type ValueKind =
  | "object"
  | "array-of-objects"
  | "array-of-primitives"
  | "array-mixed"
  | "array-empty"
  | "primitive"

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false
  }
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

export function getValueKind(value: unknown): ValueKind {
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

export function getUniformColumns(items: Record<string, unknown>[]): string[] {
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

export function getPrimitiveTypeClass(value: unknown): string {
  if (value === null) return "text-muted-foreground italic"
  if (value === undefined) return "text-muted-foreground/60 italic"
  switch (typeof value) {
    case "string":
      return "text-blue-600 dark:text-blue-400"
    case "number":
      return "text-emerald-600 dark:text-emerald-400"
    case "boolean":
      return "text-amber-600 dark:text-amber-500 font-medium"
    default:
      return "text-foreground"
  }
}

export function translateKey(
  key: string,
  keyTranslations?: Record<string, string>
): string {
  return keyTranslations?.[key] ?? key
}

export function formatPrimitiveValue(value: unknown): string {
  if (value === null) return "null"
  if (value === undefined) return "undefined"
  if (typeof value === "string") return `"${value}"`
  return String(value)
}
