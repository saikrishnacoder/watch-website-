import { site } from "../../config/site";
import { Reveal } from "../ui/Reveal";
import { MeridianTravel } from "../motion/MeridianTravel";

export function MeridianChapter() {
  return (
    <section className="section meridian-chapter" data-meridian="meridian" data-meridian-label="Meridian">
      <Reveal>
        <div className="eyebrow">{site.brand.signature}</div>
        <h2 className="display meridian-chapter-title">The Golden Meridian</h2>
        <p className="lede">
          Every HORLOGE composition begins from the 12 o’clock reference. The gold line is not a logo applied after the
          fact. It is the point from which the rest of the watch is built outward.
        </p>
      </Reveal>
      <MeridianTravel />
      <Reveal delay={0.18}>
        <p className="lede">
          {site.brand.signatureNote} You will find it on Heritage enamel and on a Diver. If it is missing, it is not
          ours.
        </p>
      </Reveal>
    </section>
  );
}
