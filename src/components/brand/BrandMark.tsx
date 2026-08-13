import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { Monogram } from "./Monogram";

type BrandMarkProps = {
  to?: string | false;
  stacked?: boolean;
  size?: number;
};

export function BrandMark({ to = "/", stacked = false, size = 34 }: BrandMarkProps) {
  const inner = (
    <>
      <Monogram size={size} />
      <span className="brand-copy">
        <strong>{site.brand.wordmark}</strong>
        <small>{site.brand.motto}</small>
      </span>
    </>
  );

  const className = `brand-mark ${stacked ? "is-stacked" : ""}`;
  if (!to) return <div className={className}>{inner}</div>;
  return (
    <Link to={to} className={className} aria-label={site.brand.name}>
      {inner}
    </Link>
  );
}
