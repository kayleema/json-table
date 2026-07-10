import { JsonTableDemo } from "@/components/json-table-demo"

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">JSON Table</h1>
        <p className="text-muted-foreground">
          A shadcn/ui-compatible component that renders arbitrary JSON as a
          nested table.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <JsonTableDemo />
      </main>
    </div>
  )
}
