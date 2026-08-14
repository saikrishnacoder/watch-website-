import { Link } from "react-router-dom";
import { CraftLoupe } from "../components/motion/CraftLoupe";
import { ExplodedCalibre } from "../components/motion/ExplodedCalibre";
import { WatchStudio } from "../components/motion/WatchStudio";
import { craftDisclaimer, productionCalibres } from "../config/calibres";
import { altFor, signatureProducts, site } from "../config/site";
import { FrameImage } from "../components/ui/FrameImage";
import { Reveal } from "../components/ui/Reveal";

export function Atelier() {
  const featured = signatureProducts()[0] ?? site.products[0];

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">{site.atelier.eyebrow}</div>
        <h1 className="display">{site.atelier.title}</h1>
        <p className="lede">{site.atelier.intro}</p>
      </section>

      <ExplodedCalibre />
      <CraftLoupe />

      <section className="section inspect-home" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <div className="eyebrow">In the round</div>
            <h2 className="display">360° on the bench.</h2>
          </div>
          <Link className="section-link" to={`/watch/${featured.slug}`}>
            {featured.name}
          </Link>
        </div>
        <p className="lede" style={{ maxWidth: 560, marginBottom: 36 }}>
          Rotate the signature piece. The same studio lives on each product page.
        </p>
        <div className="inspect-halo">
          <WatchStudio product={featured} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <div className="eyebrow">On the bench</div>
            <h2 className="display">Four rooms, one watch.</h2>
          </div>
        </div>
        <div className="timeline">
          {site.atelier.chapters.map((chapter, index) => (
            <Reveal key={chapter.title} delay={index * 0.06} className="chapter">
              <strong>{chapter.year}</strong>
              <div>
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <div className="eyebrow">Production</div>
            <h2 className="display">Five calibres that leave Geneva.</h2>
          </div>
        </div>
        <p className="lede" style={{ maxWidth: 560, marginBottom: 36 }}>
          {craftDisclaimer}
        </p>
        <div className="calibre-index">
          {productionCalibres.map((item) => (
            <article key={item.id}>
              <div className="eyebrow">
                {item.id} · {item.line}
              </div>
              <h3>{item.name}</h3>
              <p>{item.winding}</p>
              <p>{item.note}</p>
              <Link className="section-link" to={`/collection/${item.line.toLowerCase()}`}>
                {item.line} collection
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="gallery">
          {site.atelier.gallery.map((image) => (
            <figure key={image.caption}>
              <FrameImage src={image.src} alt={altFor(image.src, image.alt)} />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
