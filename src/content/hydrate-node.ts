/**
 * Node-only: fill the essay registry from /content.
 * Import this from vite.config before route-static so HTML stamping
 * can read Markdown without import.meta.glob.
 */
import fs from "node:fs";
import path from "node:path";
import { ingestEssay } from "./registry";

function walk(dir: string, prefix = "") {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = prefix ? `${prefix}/${name}` : name;
    if (fs.statSync(full).isDirectory()) walk(full, rel);
    else if (name.endsWith(".md")) ingestEssay(rel.replace(/\.md$/, ""), fs.readFileSync(full, "utf8"));
  }
}

walk(path.resolve("content"));
