import { Link } from "react-router-dom";
import { BrandMark } from "../brand/BrandMark";
import { site } from "../../config/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <BrandMark to="/" />
          <p>{site.footer.blurb}</p>
          <p className="footer-rates">List prices in Swiss francs. Other currencies use the maison atelier rate.</p>
        </div>
        {site.footer.columns.map((column) => (
          <div key={column.title}>
            <h4>{column.title}</h4>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="copyright">
        <span>
          © {new Date().getFullYear()} {site.brand.name}. {site.footer.legal}
        </span>
        <div className="socials">
          {site.socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
