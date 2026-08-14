import { useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../config/site";
import { useConsent } from "../context/ConsentContext";
import { clearDeviceStores } from "../lib/consent";

const geneva = site.boutiques[0];

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
        <p className="lede">
          How Maison Horloge handles personal data on this website — what stays on your device, what you send us, and
          how you can change your mind.
        </p>
        <p className="privacy-meta">
          Effective {site.privacy.updated}. Controller: {site.privacy.entity}, {site.privacy.address}. This policy
          covers the public website, boutique appointment forms, the Meridian early-access letter, waitlist, specialist
          messages, and timepiece registration.
        </p>

        <nav className="privacy-toc" aria-label="Policy sections">
          <a href="#who">Who we are</a>
          <a href="#device">On this device</a>
          <a href="#forms">Forms you send</a>
          <a href="#checkout">Preview checkout</a>
          <a href="#hosting">Hosting and fonts</a>
          <a href="#analytics">Analytics</a>
          <a href="#rights">Your rights</a>
          <a href="#contact">Contact</a>
        </nav>

        <h2 id="who">Who we are</h2>
        <p>
          {site.privacy.entity} (“{site.brand.name}”, “we”) is the controller for personal data collected through this
          site. The maison is in Geneva. Boutiques in Paris, London, New York and Tokyo are listed for viewing
          appointments; they do not run separate websites.
        </p>
        <p>
          If you publish this template under another name, you become the controller. Replace the entity, address and
          email on this page before collecting real enquiries.
        </p>

        <h2 id="device">Data that stays on this device</h2>
        <p>
          These items are stored in your browser (local storage or session storage). They are not uploaded to the
          maison. Clearing your browser data, or using Erase below, removes them here.
        </p>
        <table className="privacy-table">
          <thead>
            <tr>
              <th>What</th>
              <th>Why</th>
              <th>Basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Selection tray</td>
              <td>Remember watches you added during this visit. The tray is held in memory and is not written to disk.</td>
              <td>Necessary for the site to work</td>
            </tr>
            <tr>
              <td>Wishlist, compare, recently viewed, registered pieces, study compositions</td>
              <td>
                Keep a cabinet of references and finishing studies between visits. Registered serials stay on this
                device until you erase them.
              </td>
              <td>Necessary for a feature you use</td>
            </tr>
            <tr>
              <td>Maison and currency</td>
              <td>
                Remember which maison (Geneva, Paris, London, New York, Tokyo) and which currency to show. May be set
                from your country or timezone on first visit, then kept if you change it.
              </td>
              <td>Necessary for a feature you use</td>
            </tr>
            <tr>
              <td>Paper/ivoire theme, reduced motion</td>
              <td>Keep display preferences you set in the bar.</td>
              <td>Necessary for a feature you use</td>
            </tr>
            <tr>
              <td>Cookie choice</td>
              <td>Remember whether analytics may run, so we do not ask on every page.</td>
              <td>Consent (Swiss FADP / GDPR)</td>
            </tr>
            <tr>
              <td>Introduction dismissed</td>
              <td>Skip the opening sequence for the rest of this session only.</td>
              <td>Necessary for the site to work</td>
            </tr>
          </tbody>
        </table>
        <p>
          We do not use advertising cookies, third-party heatmaps, or social pixels. The cookie banner refers to this
          local storage and to optional analytics — not to a marketing stack.
        </p>

        <h2 id="forms">Information you send us</h2>
        <p>
          When you submit a form, we process what you type so we can answer. Fields are only those on the form. We do
          not buy lists or append extra profiles.
        </p>
        <table className="privacy-table">
          <thead>
            <tr>
              <th>Form</th>
              <th>Typical fields</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Newsletter / Meridian early access</td>
              <td>Email, optional name, which page you joined from</td>
              <td>Early looks at the Meridian collection, then occasional maison letters. Consent.</td>
            </tr>
            <tr>
              <td>Boutique appointment</td>
              <td>Name, email, phone, house, date, message, watch</td>
              <td>To prepare a private viewing. Steps toward a contract.</td>
            </tr>
            <tr>
              <td>Waitlist</td>
              <td>Name, email, watch, edition</td>
              <td>To write when a waitlisted reference can be seen. Consent.</td>
            </tr>
            <tr>
              <td>Specialist</td>
              <td>Name, email, maison, message, watch</td>
              <td>To answer a question about availability or a piece. Consent / steps toward a contract.</td>
            </tr>
            <tr>
              <td>Timepiece registration</td>
              <td>Name, email, reference, caseback number, notes</td>
              <td>Service history for a watch you own. Contract / legitimate interest in after-sales.</td>
            </tr>
          </tbody>
        </table>
        <p>
          On a Netlify deploy, those posts are stored as Netlify Forms submissions for the site owner. On any other
          host, configure an equivalent inbox before inviting real clients. We keep enquiries as long as needed to
          complete the viewing, waitlist or service, then delete or archive according to Swiss commercial record rules
          where they apply (generally up to ten years for client files tied to a sale or repair).
        </p>
        <p>
          Newsletter addresses are used only for Meridian early access and maison letters. You may unsubscribe by
          writing to us. We do not sell lists.
        </p>

        <h2 id="checkout">Preview checkout</h2>
        <p>
          The payment screen is a preview. Card number, expiry and CVC stay in the browser for that session. They are
          not sent to a processor, not stored, and not used to charge. Do not enter a live card. A completed preview
          produces an on-screen receipt only.
        </p>

        <h2 id="hosting">Hosting, fonts and images</h2>
        <p>
          The site is served from a hosting provider (for example Vercel or Netlify). The host logs technical data such
          as IP address, time, requested path and browser type to operate the network, detect abuse and measure
          availability. Those logs follow the host’s own terms and retention.
        </p>
        <p>
          Type is loaded from Google Fonts (Cormorant Garamond, Outfit). Google may see your IP address when the files
          are fetched. Some editorial stills are requested from Unsplash; Unsplash may see the image request. We do not
          control those third-party logs. You can block third-party requests in your browser; the maison layout still
          works with system fonts.
        </p>

        <h2 id="analytics">Analytics</h2>
        <p>
          Optional and off until you allow it. If you choose “Allow analytics”, this browser may record named events
          such as <code>intro_start</code>, <code>intro_skip</code> and <code>intro_complete</code>. Events stay in this
          tab (a custom event, and <code>window.dataLayer</code> if a tag manager is added later). We do not load Google
          Analytics, advertising pixels, or session replay unless you later add them — and those must wait for this
          same consent.
        </p>
        <p>
          Current choice on this device: <strong>{choice}</strong>. You can change it at any time. Essential-only stops
          analytics immediately; it does not delete form messages already sent.
        </p>
        <div className="hero-actions privacy-actions">
          <button type="button" className="btn" onClick={acceptAll}>
            Allow analytics
          </button>
          <button type="button" className="btn btn-ghost" onClick={essentialOnly}>
            Essential only
          </button>
        </div>

        <h2 id="rights">Your rights</h2>
        <p>
          Under the Swiss Federal Act on Data Protection and, where it applies, the EU GDPR, you may ask to access,
          correct or erase personal data we hold, restrict or object to certain processing, withdraw consent (without
          affecting earlier lawful use), and receive a copy of data you provided in a common format. You may lodge a
          complaint with the Swiss Federal Data Protection and Information Commissioner (FDPIC) or with a supervisory
          authority in your country of residence in the EEA or UK.
        </p>
        <p>
          To exercise rights about data on this device, use Erase below. To exercise rights about a form you sent,
          write to {site.privacy.email} from the same address and name the form (newsletter, appointment, waitlist,
          specialist, or registration).
        </p>
        <p>
          The site is not directed at children under 16. If you believe a child has sent us personal data, write to us
          and we will delete it.
        </p>
        <div className="hero-actions privacy-actions">
          <button type="button" className="btn btn-ghost" onClick={erase}>
            Erase data on this device
          </button>
        </div>
        {erased && <p className="form-note">This browser’s maison data has been cleared. The page will refresh.</p>}

        <h2>How long we keep data</h2>
        <p>
          Device storage lasts until you clear it or it is overwritten. Hosting logs follow the host. Form submissions
          are kept for the purpose above, then deleted or archived. We do not keep preview card details.
        </p>

        <h2>Sharing</h2>
        <p>
          We share personal data only with processors who host the site or receive form posts (the hosting platform),
          with a boutique if you asked for a viewing there, and if the law requires it. We do not sell personal data or
          share it for advertising.
        </p>

        <h2>Transfers</h2>
        <p>
          The maison is in Switzerland. Hosting, fonts or form inboxes may process data in the EU, the UK or the United
          States. Where GDPR applies, we rely on an adequacy decision (Switzerland, UK) or the processor’s standard
          contractual clauses.
        </p>

        <h2 id="contact">Contact</h2>
        <p>
          For a watch, a viewing, or the catalogue,{" "}
          <Link to="/contact">speak to a specialist</Link> — there is no generic contact form.
        </p>
        <p>
          {site.privacy.entity}
          <br />
          {site.privacy.address}
          <br />
          {geneva.phone}
          <br />
          <a href={`mailto:${site.privacy.email}`}>{site.privacy.email}</a>
        </p>
        <p>
          We will update this policy if the site starts to process data differently — for example if a real payment
          provider or a third-party analytics tool is connected. The date at the top will change.
        </p>
        <p>
          <Link className="section-link" to="/">
            Return home
          </Link>
        </p>
      </article>
    </div>
  );
}
