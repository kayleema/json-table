import { OpenInV0Button } from "@/components/open-in-v0-button"
import { CopyCommand } from "@/components/copy-command"
import { JsonTable } from "@/registry/new-york/ui/json-table"
import {
  arrayOfObjectsFixture,
  arrayOfObjectsMissingKeysFixture,
  arrayOfPrimitivesFixture,
  createCircularFixture,
  deepNestingFixture,
  edgeCasesFixture,
  simpleObjectFixture,
} from "@/lib/json-table-fixtures"

const EXAMPLES = [
  {
    title: "Flat object",
    description: "Primitives, null, and undefined are each styled distinctly.",
    data: simpleObjectFixture,
  },
  {
    title: "Array of objects with missing keys",
    description: "Columns are the union of every item's keys.",
    data: arrayOfObjectsMissingKeysFixture,
  },
  {
    title: "Arrays of primitives",
    description: "Rendered inline rather than as a sub-table.",
    data: arrayOfPrimitivesFixture,
  },
  {
    title: "Deep nesting",
    description: "Objects, arrays, and objects again, several levels deep.",
    data: deepNestingFixture,
  },
  {
    title: "Edge cases",
    description: "Empty object/array, a mixed-type array, and a wide table.",
    data: edgeCasesFixture,
  },
  {
    title: "Circular reference",
    description: "A JS object graph pointing back at itself renders [Circular] instead of hanging.",
    data: createCircularFixture(),
  },
]

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
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-muted-foreground sm:pl-3">
            Renders arbitrary JSON as a nested, recursive HTML table.
          </h2>
          <OpenInV0Button name="json-table" className="w-fit" />
        </div>
        <div className="flex items-center justify-center min-h-[400px] relative">
          <JsonTable data={arrayOfObjectsFixture} className="w-full max-w-xl" />
        </div>
      </div>

      <CopyCommand command="npx shadcn@latest add https://json-table.vercel.app/r/json-table.json" />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>
        {EXAMPLES.map((example) => (
          <div key={example.title} className="flex flex-col gap-2 border rounded-lg p-4">
            <div>
              <h3 className="font-medium">{example.title}</h3>
              <p className="text-sm text-muted-foreground">{example.description}</p>
            </div>
            <JsonTable data={example.data} className="w-full" />
            <details className="text-sm text-muted-foreground">
              <summary className="cursor-pointer select-none">Raw JSON</summary>
              <pre className="mt-2 overflow-x-auto rounded-md bg-muted/50 p-3 text-xs">
                {stringifySafe(example.data)}
              </pre>
            </details>
          </div>
        ))}
      </div>
    </div>
  )
}
