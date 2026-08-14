import { Customizer } from "../components/sections/Customizer";
import { useSearchParams } from "react-router-dom";

export function Compose() {
  const [params] = useSearchParams();
  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Composer</div>
        <h1 className="display">A watch, in your register.</h1>
        <p className="lede">
          This is a study composition — not a catalogue SKU. Save it to the cabinet on this device, or send it as a
          private viewing request.
        </p>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <Customizer standalone key={params.toString()} />
      </section>
    </div>
  );
}
