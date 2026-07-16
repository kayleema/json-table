import { JsonTableDemo } from "@/components/json-table-demo"
import { PageHeader } from "@/components/page-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <PageHeader />
      <main className="flex flex-col flex-1 gap-8">
        <JsonTableDemo />
      </main>
      <SiteFooter />
    </div>
  )
}
