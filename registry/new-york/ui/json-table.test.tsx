import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { JsonTable } from "@/registry/new-york/ui/json-table"

describe("JsonTable", () => {
  describe("objects", () => {
    it("renders each key/value pair", () => {
      render(<JsonTable data={{ id: 1, name: "Ada" }} />)
      expect(screen.getByText("id")).toBeInTheDocument()
      expect(screen.getByText("1")).toBeInTheDocument()
      expect(screen.getByText("name")).toBeInTheDocument()
      expect(screen.getByText('"Ada"')).toBeInTheDocument()
    })

    it("renders null and undefined with distinct literal text", () => {
      render(<JsonTable data={{ a: null, b: undefined }} />)
      expect(screen.getByText("null")).toBeInTheDocument()
      expect(screen.getByText("undefined")).toBeInTheDocument()
    })

    it("renders an empty object as a literal placeholder", () => {
      render(<JsonTable data={{}} />)
      expect(screen.getByText("{}")).toBeInTheDocument()
    })

    it("renders exactly one table for a flat object (no extra shim wrapper)", () => {
      const { container } = render(<JsonTable data={{ a: 1 }} />)
      expect(container.querySelectorAll("table")).toHaveLength(1)
    })
  })

  describe("keyTranslations", () => {
    it("translates keys but never values, even when a value matches a translation key", () => {
      render(<JsonTable data={{ name: "id" }} keyTranslations={{ id: "ID", name: "Name" }} />)
      expect(screen.getByText("Name")).toBeInTheDocument()
      expect(screen.getByText('"id"')).toBeInTheDocument()
      expect(screen.queryByText("ID")).not.toBeInTheDocument()
    })

    it("falls back to the original key when no translation exists", () => {
      render(<JsonTable data={{ untouched: 1 }} keyTranslations={{ other: "Other" }} />)
      expect(screen.getByText("untouched")).toBeInTheDocument()
    })

    it("translates array-of-objects column headers", () => {
      render(<JsonTable data={[{ id: 1 }]} keyTranslations={{ id: "ID" }} />)
      expect(screen.getByRole("columnheader", { name: "ID" })).toBeInTheDocument()
    })
  })

  describe("arrays", () => {
    it("renders an empty array as a literal placeholder", () => {
      render(<JsonTable data={[]} />)
      expect(screen.getByText("[]")).toBeInTheDocument()
    })

    it("renders arrays of uniform objects as a table with columns = keys", () => {
      render(
        <JsonTable
          data={[
            { id: 1, name: "Ada" },
            { id: 2, name: "Grace" },
          ]}
        />
      )
      expect(screen.getByRole("columnheader", { name: "id" })).toBeInTheDocument()
      expect(screen.getByRole("columnheader", { name: "name" })).toBeInTheDocument()
      expect(screen.getByText('"Ada"')).toBeInTheDocument()
      expect(screen.getByText('"Grace"')).toBeInTheDocument()
    })

    it("uses the union of keys across items and shows a placeholder for missing ones", () => {
      render(<JsonTable data={[{ id: 1, role: "Engineer" }, { id: 2 }]} />)
      expect(screen.getByRole("columnheader", { name: "id" })).toBeInTheDocument()
      expect(screen.getByRole("columnheader", { name: "role" })).toBeInTheDocument()
      expect(screen.getByText("—")).toBeInTheDocument()
    })

    it("renders arrays of primitives inline, not as a sub-table", () => {
      render(<JsonTable data={{ tags: ["a", "b"] }} />)
      const cell = screen.getByText('"a"').closest("td")
      expect(cell?.querySelector("table")).toBeNull()
      expect(screen.getByText('"b"')).toBeInTheDocument()
    })

    it("renders mixed-type arrays as a list of independently-rendered items", () => {
      render(<JsonTable data={[1, "two", { three: 3 }]} />)
      expect(screen.getByText("1")).toBeInTheDocument()
      expect(screen.getByText('"two"')).toBeInTheDocument()
      expect(screen.getByText("three")).toBeInTheDocument()
      expect(screen.getByText("3")).toBeInTheDocument()
    })
  })

  describe("circular references", () => {
    it("renders [Circular] for an actual ancestor cycle instead of hanging", () => {
      const node: Record<string, unknown> = { name: "self" }
      node.self = node
      render(<JsonTable data={node} />)
      expect(screen.getByText("[Circular]")).toBeInTheDocument()
    })

    it("does not flag a shared (non-cyclic) reference between sibling branches as circular", () => {
      const shared = { value: 1 }
      render(<JsonTable data={{ a: shared, b: shared }} />)
      expect(screen.queryByText("[Circular]")).not.toBeInTheDocument()
      expect(screen.getAllByText("1")).toHaveLength(2)
    })
  })

  describe("maxDepth", () => {
    it("stops recursing past maxDepth and renders a placeholder instead of the deeper data", () => {
      render(<JsonTable data={{ a: { b: { c: { d: 1 } } } }} maxDepth={1} />)
      expect(screen.getByText("…")).toBeInTheDocument()
      expect(screen.queryByText("d")).not.toBeInTheDocument()
    })
  })

  describe("primitiveClassNames", () => {
    it("uses the default classes when no override is given", () => {
      render(<JsonTable data={{ name: "Ada" }} />)
      expect(screen.getByText('"Ada"')).toHaveClass("text-blue-600")
    })

    it("overrides only the specified types, leaving others at their default", () => {
      render(
        <JsonTable
          data={{ name: "Ada", age: 30 }}
          primitiveClassNames={{ string: "text-chart-1" }}
        />
      )
      expect(screen.getByText('"Ada"')).toHaveClass("text-chart-1")
      expect(screen.getByText("30")).toHaveClass("text-emerald-600")
    })
  })

  describe("top-level contract", () => {
    it("always renders an actual table, even for a top-level primitive", () => {
      const { container } = render(<JsonTable data="hello" />)
      expect(container.querySelector("table")).not.toBeNull()
      expect(screen.getByText('"hello"')).toBeInTheDocument()
    })

    it("always renders an actual table for a top-level array of primitives", () => {
      const { container } = render(<JsonTable data={[1, 2, 3]} />)
      expect(container.querySelector("table")).not.toBeNull()
    })

    it("passes className through to the root element", () => {
      const { container } = render(<JsonTable data={{ a: 1 }} className="custom-class" />)
      expect(container.firstChild).toHaveClass("custom-class")
    })
  })
})
