"use client"

import { OpenInV0Button } from "@/components/open-in-v0-button"
import { CopyCommand } from "@/components/copy-command"
import { CodeBlock } from "@/components/code-block"
import { JsonTable } from "@/registry/new-york/ui/json-table"
import { useLocale } from "@/lib/i18n/locale-context"
import {
  arrayOfObjectsFixture,
  arrayOfObjectsMissingKeysFixture,
  arrayOfPrimitivesFixture,
  createCircularFixture,
  deepNestingFixture,
  edgeCasesFixture,
  keyTranslationsFixture,
  primitiveClassNamesFixture,
  simpleObjectFixture,
} from "@/lib/json-table-fixtures"

const DATA_EXAMPLES = [
  {
    key: "flatObject",
    data: simpleObjectFixture,
    keyTranslations: undefined,
    primitiveClassNames: undefined,
  },
  {
    key: "localizedKeys",
    data: arrayOfObjectsFixture,
    keyTranslations: keyTranslationsFixture,
    primitiveClassNames: undefined,
  },
  {
    key: "customColors",
    data: simpleObjectFixture,
    keyTranslations: undefined,
    primitiveClassNames: primitiveClassNamesFixture,
  },
  {
    key: "missingKeys",
    data: arrayOfObjectsMissingKeysFixture,
    keyTranslations: undefined,
    primitiveClassNames: undefined,
  },
  {
    key: "primitiveArrays",
    data: arrayOfPrimitivesFixture,
    keyTranslations: undefined,
    primitiveClassNames: undefined,
  },
  {
    key: "deepNesting",
    data: deepNestingFixture,
    keyTranslations: undefined,
    primitiveClassNames: undefined,
  },
  {
    key: "edgeCases",
    data: edgeCasesFixture,
    keyTranslations: undefined,
    primitiveClassNames: undefined,
  },
  {
    key: "circularReference",
    data: createCircularFixture(),
    keyTranslations: undefined,
    primitiveClassNames: undefined,
  },
] as const

const USAGE_EXAMPLE_ITEMS = [
  {
    key: "basicUsage",
    code: `import { JsonTable } from "@/components/ui/json-table"

const data = {
  id: 1,
  name: "Ada Lovelace",
  active: true,
}

export function Example() {
  return <JsonTable data={data} />
}
`,
  },
  {
    key: "stylingDepth",
    code: `import { JsonTable } from "@/components/ui/json-table"

export function Example({ data }: { data: unknown }) {
  return <JsonTable data={data} className="max-w-2xl" maxDepth={5} />
}
`,
  },
  {
    key: "localizingKeys",
    code: `import { JsonTable } from "@/components/ui/json-table"

const keyTranslations = {
  name: "名前",
  email: "メール",
}

export function Example({ data }: { data: unknown }) {
  return <JsonTable data={data} keyTranslations={keyTranslations} />
}
`,
  },
  {
    key: "customColors",
    code: `import { JsonTable } from "@/components/ui/json-table"

const primitiveClassNames = {
  string: "text-chart-1",
  number: "text-chart-2",
  boolean: "text-chart-4",
}

export function Example({ data }: { data: unknown }) {
  return <JsonTable data={data} primitiveClassNames={primitiveClassNames} />
}
`,
  },
] as const

function stringifySafe(data: unknown): string {
  const seen = new WeakSet<object>()
  return JSON.stringify(
    data,
    (_key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return "[Circular]"
        seen.add(value)
      }
      return value
    },
    2
  )
}

export function JsonTableDemo() {
  const { dict } = useLocale()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-muted-foreground sm:pl-3">
            {dict.hero.description}
          </h2>
          <OpenInV0Button name="json-table" className="w-fit" />
        </div>
        <div className="flex items-center justify-center min-h-[400px] relative">
          <JsonTable data={arrayOfObjectsFixture} className="w-full max-w-xl" />
        </div>
      </div>

      <CopyCommand
        command="npx shadcn@latest add https://json-table.kaylee.jp/r/json-table.json"
        label={dict.copy.copyCommand}
      />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight">{dict.usageSection.heading}</h2>
        {USAGE_EXAMPLE_ITEMS.map((example) => {
          const text = dict.usageExamples[example.key]
          return (
            <div key={example.key} className="flex flex-col gap-2">
              <div>
                <h3 className="font-medium">{text.title}</h3>
                <p className="text-sm text-muted-foreground">{text.description}</p>
              </div>
              <CodeBlock code={example.code} label={dict.copy.copyCode} />
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight">{dict.examplesSection.heading}</h2>
        {DATA_EXAMPLES.map((example) => {
          const text = dict.dataExamples[example.key]
          return (
            <div key={example.key} className="flex flex-col gap-2 border rounded-lg p-4">
              <div>
                <h3 className="font-medium">{text.title}</h3>
                <p className="text-sm text-muted-foreground">{text.description}</p>
              </div>
              <JsonTable
                data={example.data}
                keyTranslations={example.keyTranslations}
                primitiveClassNames={example.primitiveClassNames}
                className="w-full"
              />
              <details className="text-sm text-muted-foreground">
                <summary className="cursor-pointer select-none">
                  {dict.examplesSection.rawJson}
                </summary>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted/50 p-3 text-xs">
                  {stringifySafe(example.data)}
                </pre>
              </details>
            </div>
          )
        })}
      </div>
    </div>
  )
}
