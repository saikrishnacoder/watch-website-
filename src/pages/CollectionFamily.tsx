import { Link, useParams } from "react-router-dom";
import { altFor, getCollection, productsIn, signatureProducts, site } from "../config/site";
import { EssayBody } from "../components/ui/EssayBody";
import { ProductGrid } from "../components/ui/ProductGrid";
import { ProductCard } from "../components/ui/ProductCard";
import { FrameImage } from "../components/ui/FrameImage";
import { Newsletter } from "../components/sections/Newsletter";
import { MagneticButton } from "../components/ui/MagneticButton";
import { StudioStage } from "../components/watch/StudioStage";
import { Reveal } from "../components/ui/Reveal";
import { WaitlistForm } from "../components/watch/WaitlistForm";
import { NotFound } from "./NotFound";

export function CollectionFamily() {
  const { slug = "" } = useParams();
  const line = getCollection(slug);
  if (!line) return <NotFound />;
  const watches = productsIn(slug);
  const signatures = signatureProducts(slug);
  const heroWatch = signatures[0] ?? watches[0];
  const sisters = site.collectionLines.filter((item) => item.slug !== slug);
  const scarce = signatures.find((item) => item.limited || item.availability === "Waitlist");

  return (
    <div className="page">
      <section className="family-hero">
        <FrameImage src={line.image} alt={altFor(line.image, line.name)} className="family-hero-photo" />
        <div>
          <div className="eyebrow">
            {line.name} · {line.calibre}
          </div>
          <h1 className="display">{line.name}</h1>
          <p className="lede">{line.description}</p>
          <div className="hero-actions">
            <MagneticButton to="/boutique">Private Viewing</MagneticButton>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="maison-split">
          <Reveal>
            <div className="eyebrow">{line.finishing}</div>
            <h2 className="display">{line.chapterTitle}</h2>
            <EssayBody id={`lines/${slug}`} />
          </Reveal>
          {heroWatch && (
            <Reveal delay={0.08}>
              <StudioStage product={heroWatch} size={340} caption={`${heroWatch.name} · studio render`} />
            </Reveal>
          )}
        </div>
      </section>

      {signatures.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <div>
              <div className="eyebrow">{line.name} signatures</div>
              <h2 className="display">{line.name} on the tray.</h2>
            </div>
          </div>
          <div className="product-grid">
            {signatures.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} priority={index < 2} />
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-head">
          <h2 className="display">
            {watches.length} {line.name} references
          </h2>
          <Link className="section-link" to="/collection">
            All collections
          </Link>
        </div>
        <ProductGrid products={watches} />
      </section>

      {scarce && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <div>
              <div className="eyebrow">Limited</div>
              <h2 className="display">{scarce.name}.</h2>
            </div>
          </div>
          <p className="lede" style={{ maxWidth: 520, marginBottom: 24 }}>
            An independent maison does not keep an open tray of every reference. Join the list for {scarce.name}.
          </p>
          <WaitlistForm product={scarce} />
        </section>
      )}

      {slug === "meridian" && <Newsletter source="meridian" />}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 className="display">The other lines</h2>
        </div>
        <div className="line-tiles">
          {sisters.map((family) => (
            <Link key={family.slug} to={`/collection/${family.slug}`} className="line-tile">
              <FrameImage src={family.image} alt={altFor(family.image, family.name)} />
              <div>
                <strong>{family.name}</strong>
                <span>{family.tagline}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
