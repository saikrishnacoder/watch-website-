import { Link } from "react-router-dom";
import { site } from "../config/site";
import { Customizer } from "../components/sections/Customizer";
import { Features } from "../components/sections/Features";
import { Hero } from "../components/sections/Hero";
import { Limited } from "../components/sections/Limited";
import { Lookbook } from "../components/sections/Lookbook";
import { Marquee } from "../components/sections/Marquee";
import { Newsletter } from "../components/sections/Newsletter";
import { Stats } from "../components/sections/Stats";
import { Story } from "../components/sections/Story";
import { Testimonials } from "../components/sections/Testimonials";
import { ProductCard } from "../components/ui/ProductCard";
import { Reveal } from "../components/ui/Reveal";

export function Home() {
  const featured = site.products.slice(0, 3);

  return (
    <div className="page">
      <Hero />
      <Marquee />
      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">The collection</div>
            <h2 className="display">Signature watches</h2>
          </div>
          <div>
            <p>
              Designed with precision. Built with purpose. Every {site.brand.name} timepiece balances mechanical
              engineering with refined aesthetics.
            </p>
            <Link className="section-link" to="/collection">
              View all pieces
            </Link>
          </div>
        </div>
        <div className="product-grid">
          {featured.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </section>
      <Stats />
      <Story />
      <Features />
      <Customizer />
      <Lookbook />
      <Limited />
      <Testimonials />
      <Reveal>
        <Newsletter />
      </Reveal>
    </div>
  );
}
