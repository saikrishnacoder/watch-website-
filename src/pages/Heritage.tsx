import { site } from "../config/site";
import { HeritageTimeline } from "../components/sections/HeritageTimeline";
import { MagneticButton } from "../components/ui/MagneticButton";

export function Heritage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Since {site.brand.founded}</div>
        <h1 className="display">A century in years.</h1>
        <p className="lede">
          Scroll the timeline the way a maison tells its own story — dates large enough to stand in a window, copy quiet enough to keep.
        </p>
        <MagneticButton to="/maison">The maison</MagneticButton>
      </section>
      <HeritageTimeline />
    </div>
  );
}
