# JSON Table

A shadcn/ui-compatible component that renders arbitrary JSON as a nested, recursive HTML table. Install it the same way you'd install any shadcn/ui component:

```bash
npx shadcn@latest add https://json-table.kaylee.jp/r/json-table.json
```

That's it — no npm package. The CLI copies the component source (and the `table` component it depends on) straight into your project.

Live demo: [json-table.kaylee.jp](https://json-table.kaylee.jp)

## Usage

```tsx
import { JsonTable } from "@/components/ui/json-table"

<JsonTable data={yourJsonValue} />
```

- Plain objects render as two-column key/value tables.
- Arrays of objects render as sub-tables, with columns covering the union of every item's keys.
- Arrays of primitives render inline.
- Mixed-type arrays render as a list of independently-rendered items.
- Strings, numbers, booleans, `null`, and `undefined` are each styled distinctly.
- Circular references render as `[Circular]` instead of crashing.

Props: `data: unknown`, `className?: string`, `maxDepth?: number` (default `20`).

## Developing this repo

This repo is both the registry that publishes `json-table` and its own demo site.

```bash
npm install
npm run dev     # regenerates the registry JSON, then starts the dev server
```

- Component source lives in `registry/new-york/`.
- `registry.json` defines what gets published; `shadcn build` turns it into the static files served from `public/r/`.
- See `CLAUDE.md` for the architecture notes that matter for making changes here (in particular, why the component's imports and its color choices look the way they do).

## Documentation

[shadcn registry docs](https://ui.shadcn.com/docs/registry)
