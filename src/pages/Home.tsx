import { Link } from "react-router-dom";
import { site } from "../config/site";
import { Customizer } from "../components/sections/Customizer";
import { Hero } from "../components/sections/Hero";
import { Identity } from "../components/sections/Identity";
import { Limited } from "../components/sections/Limited";
import { Marquee } from "../components/sections/Marquee";
import { Newsletter } from "../components/sections/Newsletter";
import { Stats } from "../components/sections/Stats";
import { Story } from "../components/sections/Story";
import { KineticGallery } from "../components/motion/KineticGallery";
import { ProductCard } from "../components/ui/ProductCard";
import { Reveal } from "../components/ui/Reveal";

export function Home() {
  const novelties = site.products.filter((product) => product.novelty);
  const featured = site.products.filter((product) => !product.novelty).slice(0, 6);

  return (
    <div className="page">
      <Hero />
      <Marquee />
      <Identity />

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Collections</div>
            <h2 className="display">The five lines</h2>
            <p>{site.products.length} references, one gold meridian at 12.</p>
          </div>
          <Link className="section-link" to="/collection">
            All models
          </Link>
        </div>
        <div className="family-grid">
          {site.collectionLines.map((line, index) => (
            <Reveal key={line.slug} delay={index * 0.08} className="family-card">
              <Link to={`/collection/${line.slug}`}>
                <img src={line.image} alt={line.name} />
                <div>
                  <strong>{line.name}</strong>
                  <span>{line.tagline}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <div className="eyebrow">Novelties</div>
            <h2 className="display">New this season</h2>
          </div>
          <Link className="section-link" to="/finder">
            Watch Finder
          </Link>
        </div>
        <div className="product-grid">
          {novelties.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </section>

      <Stats />
      <Story />

      <section className="section kinetic-home">
        <div className="section-head">
          <div>
            <div className="eyebrow">Kinetic atelier</div>
            <h2 className="display">Python, in motion</h2>
          </div>
          <Link className="section-link" to="/motion">
            All machines
          </Link>
        </div>
        <p className="lede" style={{ maxWidth: 560, marginBottom: 36 }}>
          Escapement, tourbillon and hairspring — drawn with trigonometry in Python, then animated as living SVG.
        </p>
        <KineticGallery featured={["escapement.svg", "tourbillon.svg", "hairspring.svg"]} />
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Signatures</div>
            <h2 className="display">Permanent collection</h2>
          </div>
          <Link className="section-link" to="/find">
            Find your watch
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </section>

      <Customizer />

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Journal</div>
            <h2 className="display">World of HORLOGE</h2>
          </div>
          <Link className="section-link" to="/journal">
            All stories
          </Link>
        </div>
        <div className="journal-grid">
          {site.journal.map((article) => (
            <Link key={article.slug} to={`/journal/${article.slug}`} className="journal-card">
              <img src={article.image} alt="" />
              <div>
                <div className="product-line">
                  {article.category} · {article.date}
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Limited />
      <Reveal>
        <Newsletter />
      </Reveal>
    </div>
  );
}
