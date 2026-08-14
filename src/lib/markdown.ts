/**
 * Tiny Markdown for maison essays. Author in /content — not in TSX.
 * Supports YAML-ish frontmatter, headings, paragraphs, lists, **bold**, _italic_, [links](href).
 */
export type MarkdownDoc = {
  path: string;
  slug: string;
  meta: Record<string, string>;
  markdown: string;
  html: string;
  paragraphs: string[];
};

export function parseMarkdown(raw: string, path = ""): MarkdownDoc {
  const { meta, body } = splitFrontmatter(raw);
  const slug = meta.slug || path.replace(/^.*\//, "").replace(/\.md$/, "");
  const blocks = tokenize(body);
  return {
    path,
    slug,
    meta,
    markdown: body.trim(),
    html: blocksToHtml(blocks),
    paragraphs: blocks.filter((block) => block.type === "p").map((block) => block.text),
  };
}

function splitFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {} as Record<string, string>, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const cut = line.indexOf(":");
    if (cut < 1) continue;
    meta[line.slice(0, cut).trim()] = line.slice(cut + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { meta, body: match[2] };
}

type Block = { type: "h2" | "h3" | "p" | "ul"; text: string; items?: string[] };

function tokenize(body: string): Block[] {
  const blocks: Block[] = [];
  let list: string[] = [];
  const flushList = () => {
    if (!list.length) return;
    blocks.push({ type: "ul", text: "", items: list });
    list = [];
  };
  for (const rawLine of body.split("\n")) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      flushList();
      continue;
    }
    if (line.startsWith("- ")) {
      list.push(line.slice(2).trim());
      continue;
    }
    flushList();
    if (line.startsWith("### ")) blocks.push({ type: "h3", text: line.slice(4).trim() });
    else if (line.startsWith("## ")) blocks.push({ type: "h2", text: line.slice(3).trim() });
    else if (line.startsWith("# ")) blocks.push({ type: "h2", text: line.slice(2).trim() });
    else blocks.push({ type: "p", text: line.trim() });
  }
  flushList();
  return blocks;
}

function blocksToHtml(blocks: Block[]) {
  return blocks
    .map((block) => {
      if (block.type === "h2") return `<h2>${inline(block.text)}</h2>`;
      if (block.type === "h3") return `<h3>${inline(block.text)}</h3>`;
      if (block.type === "ul") {
        const items = (block.items ?? []).map((item) => `<li>${inline(item)}</li>`).join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${inline(block.text)}</p>`;
    })
    .join("\n");
}

function inline(value: string) {
  return escape(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/_([^_]+)_/g, "<em>$1</em>");
}

function escape(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
