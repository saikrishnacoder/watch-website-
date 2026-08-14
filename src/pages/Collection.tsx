import { Link } from "react-router-dom";
import { altFor, photos, signatureProducts, site } from "../config/site";
import { ProductCard } from "../components/ui/ProductCard";
import { FrameImage } from "../components/ui/FrameImage";
import { Reveal } from "../components/ui/Reveal";
import { Newsletter } from "../components/sections/Newsletter";
import { PressStrip } from "../components/sections/PressStrip";

export function Collection() {
  const signatures = site.collectionLines
    .map((line) => signatureProducts(line.slug)[0])
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <div className="page">
      <section className="collection-hero">
        <FrameImage src={photos.luxury} alt={altFor(photos.luxury, "HORLOGE collection still")} />
        <div>
          <div className="eyebrow">Five lines · one meridian</div>
          <h1 className="display">{site.collectionPage.title}</h1>
          <p className="lede">{site.collectionPage.lede}</p>
        </div>
      </section>

      <PressStrip compact />

      <section className="section">
        <p className="lede collection-grid-intro">{site.collectionPage.gridIntro}</p>
        <div className="line-index">
          {site.collectionLines.map((family, index) => (
            <Reveal key={family.slug} delay={index * 0.04} className="line-index-card">
              <Link to={`/collection/${family.slug}`} className="line-index-media">
                <FrameImage src={family.image} alt={altFor(family.image, family.name)} />
              </Link>
              <div>
                <div className="eyebrow">
                  {family.name} · {family.calibre}
                </div>
                <h2 className="display">{family.chapterTitle}</h2>
                <p>{family.indexBlurb}</p>
                <p className="line-index-finish">{family.finishing}</p>
                <Link className="section-link" to={`/collection/${family.slug}`}>
                  Enter {family.name}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {signatures.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <div>
              <div className="eyebrow">One from each line</div>
              <h2 className="display">Five signatures.</h2>
            </div>
            <Link className="section-link" to="/finder">
              Watch Finder
            </Link>
          </div>
          <div className="product-grid">
            {signatures.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} priority={index < 2} />
            ))}
          </div>
        </section>
      )}

      <Newsletter source="collection" />
    </div>
  );
}
