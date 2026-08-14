import { Link } from "react-router-dom";
import { photos, site } from "../../config/site";
import { FrameImage } from "../ui/FrameImage";
import { Reveal } from "../ui/Reveal";

export function CraftChapter() {
  return (
    <section className="section craft-tease" data-meridian="craft" data-meridian-label="Craft">
      <Reveal className="craft-tease-copy">
        <div className="eyebrow">Craft</div>
        <h2 className="display">Opened, then composed.</h2>
        <p className="lede">{site.atelier.intro}</p>
        <Link className="section-link" to="/atelier">
          The atelier
        </Link>
      </Reveal>
      <FrameImage src={photos.movement} alt="A HORLOGE movement, opened on the bench" />
    </section>
  );
}
