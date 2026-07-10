export type Locale = "en" | "ja"

export const locales: Locale[] = ["en", "ja"]

export const defaultLocale: Locale = "en"

export const LOCALE_COOKIE = "locale"

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value)
}

const en = {
  meta: {
    title: "JSON Table — shadcn/ui registry",
    description:
      "A shadcn/ui-compatible component that renders arbitrary JSON as a nested table. Install with the shadcn CLI.",
  },
  header: {
    title: "JSON Table",
    description:
      "A shadcn/ui-compatible component that renders arbitrary JSON as a nested table.",
  },
  hero: {
    description: "Renders arbitrary JSON as a nested, recursive HTML table.",
  },
  usageSection: {
    heading: "Usage",
  },
  examplesSection: {
    heading: "Examples",
    rawJson: "Raw JSON",
  },
  copy: {
    copyCommand: "Copy command",
    copyCode: "Copy code",
  },
  languageToggle: {
    ariaLabel: "Switch language",
    targetLabel: "日本語",
  },
  usageExamples: {
    basicUsage: {
      title: "Basic usage",
      description: "Import from where the CLI installed it and pass your data.",
    },
    stylingDepth: {
      title: "Styling and depth limit",
      description:
        "className passes through; maxDepth guards against pathologically deep data.",
    },
    localizingKeys: {
      title: "Localizing keys",
      description:
        "keyTranslations maps a key name to a label. Values are never translated.",
    },
  },
  dataExamples: {
    flatObject: {
      title: "Flat object",
      description: "Primitives, null, and undefined are each styled distinctly.",
    },
    localizedKeys: {
      title: "Localized keys",
      description: "keyTranslations maps a key to a label. Values are never translated.",
    },
    missingKeys: {
      title: "Array of objects with missing keys",
      description: "Columns are the union of every item's keys.",
    },
    primitiveArrays: {
      title: "Arrays of primitives",
      description: "Rendered inline rather than as a sub-table.",
    },
    deepNesting: {
      title: "Deep nesting",
      description: "Objects, arrays, and objects again, several levels deep.",
    },
    edgeCases: {
      title: "Edge cases",
      description: "Empty object/array, a mixed-type array, and a wide table.",
    },
    circularReference: {
      title: "Circular reference",
      description:
        "A JS object graph pointing back at itself renders [Circular] instead of hanging.",
    },
  },
}

const ja: typeof en = {
  meta: {
    title: "JSON Table — shadcn/ui レジストリ",
    description:
      "任意のJSONをネストされたテーブルとして表示する、shadcn/ui互換のコンポーネントです。shadcn CLIでインストールできます。",
  },
  header: {
    title: "JSON Table",
    description: "任意のJSONをネストされたテーブルとして表示する、shadcn/ui互換のコンポーネントです。",
  },
  hero: {
    description: "任意のJSONを、ネストされた再帰的なHTMLテーブルとして表示します。",
  },
  usageSection: {
    heading: "使い方",
  },
  examplesSection: {
    heading: "例",
    rawJson: "元のJSON",
  },
  copy: {
    copyCommand: "コマンドをコピー",
    copyCode: "コードをコピー",
  },
  languageToggle: {
    ariaLabel: "言語を切り替える",
    targetLabel: "English",
  },
  usageExamples: {
    basicUsage: {
      title: "基本的な使い方",
      description: "CLIでインストールされた場所からインポートし、データを渡します。",
    },
    stylingDepth: {
      title: "スタイルと深さの制限",
      description:
        "classNameはそのまま渡され、maxDepthは異常に深いデータに対する安全装置になります。",
    },
    localizingKeys: {
      title: "キーのローカライズ",
      description: "keyTranslationsはキー名をラベルに変換します。値は翻訳されません。",
    },
  },
  dataExamples: {
    flatObject: {
      title: "フラットなオブジェクト",
      description: "プリミティブ値、null、undefinedはそれぞれ異なる見た目で表示されます。",
    },
    localizedKeys: {
      title: "ローカライズされたキー",
      description: "keyTranslationsはキーをラベルに変換します。値は翻訳されません。",
    },
    missingKeys: {
      title: "キーが欠けているオブジェクトの配列",
      description: "列は、各項目のキーの和集合になります。",
    },
    primitiveArrays: {
      title: "プリミティブ値の配列",
      description: "サブテーブルではなく、インラインで表示されます。",
    },
    deepNesting: {
      title: "深いネスト",
      description: "オブジェクトと配列が何段にもわたって入れ子になっています。",
    },
    edgeCases: {
      title: "エッジケース",
      description: "空のオブジェクト・配列、型が混在する配列、そして横に長いテーブルです。",
    },
    circularReference: {
      title: "循環参照",
      description:
        "自分自身を参照するJSのオブジェクトグラフは、ハングする代わりに[Circular]と表示されます。",
    },
  },
}

export type Dictionary = typeof en

export const dictionaries: Record<Locale, Dictionary> = { en, ja }
