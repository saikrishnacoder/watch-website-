import { ingestEssay } from "./registry";

export {
  essay,
  essayOrNull,
  headingSections,
  heritageYears,
  journalNotes,
  lineEssay,
} from "./registry";

let files: Record<string, string> = {};
try {
  files = import.meta.glob("../../content/**/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }) as Record<string, string>;
} catch {
  files = {};
}

for (const [path, raw] of Object.entries(files)) {
  const relative = path.replace(/^.*\/content\//, "").replace(/\.md$/, "");
  ingestEssay(relative, String(raw));
}
