export const simpleObjectFixture = {
  id: 42,
  name: "Ada Lovelace",
  active: true,
  nickname: null,
  title: undefined,
}

export const arrayOfObjectsFixture = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com", active: true },
  { id: 2, name: "Grace Hopper", email: "grace@example.com", active: true },
  { id: 3, name: "Alan Turing", email: "alan@example.com", active: false },
]

export const arrayOfObjectsMissingKeysFixture = [
  { id: 1, name: "Ada Lovelace", role: "Engineer" },
  { id: 2, name: "Grace Hopper" },
  { id: 3, name: "Alan Turing", role: "Researcher", team: "Cryptography" },
]

export const arrayOfPrimitivesFixture = {
  tags: ["math", "computing", "history"],
  scores: [98, 87, 91, 76],
}

export const deepNestingFixture = {
  organization: "Analytical Engines Inc.",
  departments: [
    {
      name: "Engineering",
      headcount: 12,
      lead: { name: "Ada Lovelace", email: "ada@example.com" },
      tags: ["core", "infra"],
    },
    {
      name: "Research",
      headcount: 4,
      lead: { name: "Alan Turing", email: "alan@example.com" },
      tags: ["theory"],
    },
  ],
}

const wideRow = Object.fromEntries(
  Array.from({ length: 20 }, (_, i) => [`field_${i + 1}`, i * 7])
)

export const edgeCasesFixture = {
  emptyObject: {},
  emptyArray: [],
  nullValue: null,
  mixedArray: [1, "two", { three: 3 }, [4, 5]],
  wideTable: [wideRow, wideRow],
}

export const keyTranslationsFixture: Record<string, string> = {
  id: "ID",
  name: "名前",
  email: "メール",
  active: "有効",
}

export function createCircularFixture(): Record<string, unknown> {
  const node: Record<string, unknown> = { name: "self-referencing" }
  node.self = node
  return node
}
