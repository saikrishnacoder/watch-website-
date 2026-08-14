import { site } from "../../config/site";
import { Reveal } from "../ui/Reveal";

export function WatchmakerStories() {
  return (
    <section className="section" data-meridian="stories" data-meridian-label="Stories">
      <div className="section-head">
        <div>
          <div className="eyebrow">Watchmaker stories</div>
          <h2 className="display">Three pairs of hands.</h2>
        </div>
      </div>
      <div className="people-grid">
        {site.people.map((person, index) => (
          <Reveal key={person.name} delay={index * 0.08} className="person-card">
            <div className="eyebrow">{person.role}</div>
            <h3>{person.name}</h3>
            <p>{person.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
