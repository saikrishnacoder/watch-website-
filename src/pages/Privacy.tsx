import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useConsent } from "../context/ConsentContext";
import { clearDeviceStores } from "../lib/consent";
import {
  privacyBlocks,
  privacyLede,
  privacyMetaLine,
  privacyToc,
  type PolicyLink,
  type PolicyPart,
} from "../lib/privacy-policy";

function isLink(part: PolicyPart): part is PolicyLink {
  return typeof part === "object";
}

function RichText({ parts }: { parts: PolicyPart[] }) {
  return (
    <>
      {parts.map((part, index) => {
        if (!isLink(part)) {
          const nodes: ReactNode[] = [];
          const chunks = part.split("\n");
          chunks.forEach((chunk, chunkIndex) => {
            if (chunkIndex) nodes.push(<br key={`br-${index}-${chunkIndex}`} />);
            nodes.push(chunk);
          });
          return <span key={index}>{nodes}</span>;
        }
        if (part.href.startsWith("/")) {
          return (
            <Link key={index} to={part.href}>
              {part.label}
            </Link>
          );
        }
        return (
          <a key={index} href={part.href}>
            {part.label}
          </a>
        );
      })}
    </>
  );
}

export function Privacy() {
  const { consent, acceptAll, essentialOnly } = useConsent();
  const [erased, setErased] = useState(false);
  const choice =
    consent === "all" ? "analytics allowed" : consent === "essential" ? "essential only" : "not yet chosen";

  const erase = () => {
    clearDeviceStores();
    setErased(true);
    window.setTimeout(() => window.location.reload(), 600);
  };

  return (
    <div className="page">
      <article className="article privacy-policy">
        <div className="eyebrow">Legal</div>
        <h1 className="display">Privacy policy</h1>
        <p className="lede">{privacyLede}</p>
        <p className="privacy-meta">{privacyMetaLine()}</p>

        <nav className="privacy-toc" aria-label="Policy sections">
          {privacyToc.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        {privacyBlocks.map((block, index) => {
          if (block.kind === "h2") {
            return (
              <h2 key={block.id ?? block.text} id={block.id}>
                {block.text}
              </h2>
            );
          }
          if (block.kind === "p") {
            return (
              <p key={`p-${index}`}>
                <RichText parts={block.parts} />
              </p>
            );
          }
          if (block.kind === "table") {
            return (
              <table key={`table-${index}`} className="privacy-table">
                <thead>
                  <tr>
                    {block.headers.map((cell) => (
                      <th key={cell}>{cell}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => (
                        <td key={cell}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          }
          if (block.name === "analytics") {
            return (
              <div key="analytics">
                <p>
                  Current choice on this device: <strong>{choice}</strong>. You can change it at any time. Essential-only
                  stops analytics immediately; it does not delete form messages already sent.
                </p>
                <div className="hero-actions privacy-actions">
                  <button type="button" className="btn" onClick={acceptAll}>
                    Allow analytics
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={essentialOnly}>
                    Essential only
                  </button>
                </div>
              </div>
            );
          }
          return (
            <div key="erase">
              <div className="hero-actions privacy-actions">
                <button type="button" className="btn btn-ghost" onClick={erase}>
                  Erase data on this device
                </button>
              </div>
              {erased && <p className="form-note">This browser’s maison data has been cleared. The page will refresh.</p>}
            </div>
          );
        })}

        <p>
          <Link className="section-link" to="/">
            Return home
          </Link>
        </p>
      </article>
    </div>
  );
}
