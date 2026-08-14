import { Link, useParams } from "react-router-dom";
import { site } from "../config/site";
import { FrameImage } from "../components/ui/FrameImage";
import { NotFound } from "./NotFound";

export function JournalArticle() {
  const { slug = "" } = useParams();
  const article = site.journal.find((item) => item.slug === slug);
  if (!article) return <NotFound />;
  const minutes = Math.max(2, Math.round(article.body.join(" ").split(/\s+/).length / 180));
  const others = site.journal.filter((item) => item.slug !== slug);

  return (
    <div className="page">
      <article className="article">
        <div className="eyebrow">
          {article.date} · {minutes} min · {article.category}
        </div>
        <h1 className="display">{article.title}</h1>
        <FrameImage src={article.image} alt="" className="article-hero" />
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
      <section className="section">
        <div className="eyebrow">Further notes</div>
        <ul className="journal-more">
          {others.map((item) => (
            <li key={item.slug}>
              <Link to={`/journal/${item.slug}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
