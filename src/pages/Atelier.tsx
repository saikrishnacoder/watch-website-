import { CraftLoupe } from "../components/motion/CraftLoupe";
import { ExplodedCalibre } from "../components/motion/ExplodedCalibre";
import { site } from "../config/site";
import { Reveal } from "../components/ui/Reveal";

export function Atelier() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">{site.atelier.eyebrow}</div>
        <h1 className="display">Craft</h1>
        <p className="lede">{site.atelier.intro}</p>
      </section>
      <ExplodedCalibre />
      <CraftLoupe />
      <section className="section" style={{ paddingTop: 0 }}>
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
        <div className="gallery">
          {site.atelier.gallery.map((image) => (
            <figure key={image.caption}>
              <img src={image.src} alt={image.alt} />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
