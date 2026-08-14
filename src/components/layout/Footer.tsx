import { Link } from "react-router-dom";
import { BrandMark } from "../brand/BrandMark";
import { Newsletter } from "../sections/Newsletter";
import { RegionSwitch } from "./RegionSwitch";
import { site } from "../../config/site";
import { useMoney } from "../../context/CurrencyContext";
import { openSpecialist } from "../../lib/specialist";

export function Footer() {
  const { region } = useMoney();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <BrandMark to="/" />
          <p>{site.footer.blurb}</p>
          <p className="footer-rates">
            Viewing the {region.city} maison. List prices in Swiss francs; {region.currency} uses the atelier rate.
          </p>
          <RegionSwitch compact />
          <Newsletter compact source="footer" />
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
          <button type="button" className="footer-specialist" onClick={() => openSpecialist("ask")}>
            Speak to a specialist
          </button>
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
