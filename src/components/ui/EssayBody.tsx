import { essay } from "../../content/load";

export function EssayBody({ id, className = "essay-body" }: { id: string; className?: string }) {
  const doc = essay(id);
  return <div className={className} dangerouslySetInnerHTML={{ __html: doc.html }} />;
}
