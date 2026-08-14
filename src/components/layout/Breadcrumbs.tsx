import { Link, useLocation } from "react-router-dom";
import { crumbsForPath } from "../../lib/breadcrumbs";

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const crumbs = crumbsForPath(pathname);
  if (!crumbs || crumbs.length < 2) return null;

  return (
    <nav className="crumbs-bar" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.href}>
              {index > 0 && <span className="crumbs-sep" aria-hidden>/</span>}
              {last ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <Link to={crumb.href}>{crumb.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
