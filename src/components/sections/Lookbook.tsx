import { site } from "../../config/site";
import { Reveal } from "../ui/Reveal";

export function Lookbook() {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <div className="eyebrow">Lookbook</div>
          <h2 className="display">Worn, not shown.</h2>
        </div>
        <p>Editorial studies of the current collection, photographed in the cities of the maison.</p>
      </div>
      <div className="lookbook">
        {site.lookbook.map((shot, index) => (
          <Reveal key={shot.title} delay={index * 0.1} className="look-card" y={20}>
            <figure className="look-card">
              <img src={shot.src} alt={shot.title} />
              <figcaption>
                <h3>{shot.title}</h3>
                <p>{shot.caption}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
