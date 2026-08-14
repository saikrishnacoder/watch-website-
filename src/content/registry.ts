import { parseMarkdown, type MarkdownDoc } from "../lib/markdown";

const docs = new Map<string, MarkdownDoc>();

export function ingestEssay(relative: string, raw: string) {
  if (relative === "README") return;
  docs.set(relative, parseMarkdown(raw, relative));
}

export function essay(id: string): MarkdownDoc {
  const doc = docs.get(id);
  if (!doc) throw new Error(`Missing content/${id}.md — add it for this client.`);
  return doc;
}

export function essayOrNull(id: string) {
  return docs.get(id) ?? null;
}

export function journalNotes() {
  return [...docs.entries()]
    .filter(([id]) => id.startsWith("journal/"))
    .map(([, doc]) => doc)
    .sort((a, b) => (b.meta.date ?? "").localeCompare(a.meta.date ?? ""));
}

export function lineEssay(slug: string) {
  return essay(`lines/${slug}`);
}

/** Split a Markdown essay on `##` headings for timelines and chapter lists. */
export function headingSections(id: string) {
  const sections: { title: string; body: string }[] = [];
  let current: { title: string; body: string } | null = null;
  for (const line of essay(id).markdown.split("\n")) {
    if (line.startsWith("## ")) {
      if (current) sections.push({ ...current, body: current.body.trim() });
      current = { title: line.slice(3).trim(), body: "" };
      continue;
    }
    if (current) current.body = current.body ? `${current.body}\n${line}` : line;
  }
  if (current) sections.push({ ...current, body: current.body.trim() });
  return sections;
}

export function heritageYears() {
  return headingSections("heritage").map((section) => {
    const match = section.title.match(/^(\d{4})\s+[—–-]\s+(.+)$/);
    return {
      year: match?.[1] ?? section.title,
      title: match?.[2] ?? section.title,
      body: section.body,
    };
  });
}
