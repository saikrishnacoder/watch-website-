import { Link } from "react-router-dom";
import { signatureProducts, site } from "../config/site";
import { ProductCard } from "../components/ui/ProductCard";
import { Reveal } from "../components/ui/Reveal";

export function Collection() {
  const signatures = site.collectionLines
    .map((line) => signatureProducts(line.slug)[0])
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <div className="page">
      <section className="collection-hero">
        <img src="/media/maison-meridian.jpg" alt="" />
        <div>
          <div className="eyebrow">Five lines · one meridian</div>
          <h1 className="display">{site.collectionPage.title}</h1>
          <p className="lede">{site.collectionPage.lede}</p>
        </div>
      </section>

      <section className="section">
        <p className="lede collection-grid-intro">{site.collectionPage.gridIntro}</p>
        <div className="line-index">
          {site.collectionLines.map((family, index) => (
            <Reveal key={family.slug} delay={index * 0.04} className="line-index-card">
              <Link to={`/collection/${family.slug}`} className="line-index-media">
                <img src={family.image} alt="" />
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
    </div>
  );
}
