import { site } from "../../config/site";
import { Monogram } from "../brand/Monogram";

export function JourneyLockup({ close = false }: { close?: boolean }) {
  return (
    <section
      className={`journey-lockup${close ? " is-close" : ""}`}
      data-meridian={close ? "close" : "open"}
      data-meridian-label="Horloge"
    >
      <Monogram size={close ? 56 : 88} />
      <p className="journey-wordmark">{site.brand.wordmark}</p>
      <p className="journey-motto">{site.brand.motto}</p>
      <span className="journey-stroke" aria-hidden />
      {close ? (
        <p className="journey-en">{site.brand.mottoEn}.</p>
      ) : (
        <p className="journey-hint">Scroll</p>
      )}
    </section>
  );
}
