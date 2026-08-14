import { site } from "../config/site";
import { Link } from "react-router-dom";
import { HeritageTimeline } from "../components/sections/HeritageTimeline";
import { MagneticButton } from "../components/ui/MagneticButton";

export function Heritage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Since {site.brand.founded}</div>
        <h1 className="display">{site.heritagePage.title}</h1>
        <p className="lede">
          {site.heritagePage.lede} Open a year on the{" "}
          <Link to="/maison#heritage" style={{ color: "var(--gold)" }}>
            maison
          </Link>
          .
        </p>
        <MagneticButton to="/maison">The maison</MagneticButton>
      </section>
      <HeritageTimeline />
    </div>
  );
}
