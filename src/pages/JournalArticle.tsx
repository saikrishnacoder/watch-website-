import { useParams } from "react-router-dom";
import { site } from "../config/site";
import { NotFound } from "./NotFound";

export function JournalArticle() {
  const { slug = "" } = useParams();
  const article = site.journal.find((item) => item.slug === slug);
  if (!article) return <NotFound />;

  return (
    <div className="page">
      <article className="article">
        <div className="eyebrow">{article.date} · {Math.max(2, Math.round(article.body.join(" ").split(/\s+/).length / 180))} min</div>
        <h1 className="display">{article.title}</h1>
        <img src={article.image} alt="" className="article-hero" />
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
    </div>
  );
}
