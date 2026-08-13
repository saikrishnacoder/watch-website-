import { site } from "../../config/site";
import { MagneticButton } from "../ui/MagneticButton";
import { Reveal } from "../ui/Reveal";

export function Story() {
  return (
    <section className="section" id="story">
      <div className="story">
        <Reveal>
          <div
            className="story-image"
            role="img"
            aria-label={site.story.imageAlt}
            style={{ backgroundImage: `url(${site.story.image})` }}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="eyebrow">{site.story.eyebrow}</div>
          <h2 className="display">{site.story.title}</h2>
          {site.story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <MagneticButton to="/atelier">Discover the atelier</MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
