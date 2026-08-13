import { MagneticButton } from "../components/ui/MagneticButton";

export function NotFound() {
  return (
    <div className="not-found">
      <div className="eyebrow">Lost time</div>
      <h1 className="display">404</h1>
      <p className="lede">This hour does not exist in the maison. Return to the collection.</p>
      <MagneticButton to="/collection">Back to collection</MagneticButton>
    </div>
  );
}
