import { lazy, Suspense } from "react";
import type { WatchDesign } from "../../config/types";
import { site } from "../../config/site";
import { useMotion } from "../../context/MotionContext";
import { WatchFace } from "../watch/WatchFace";

const WatchScene = lazy(() => import("./WatchScene"));

type WatchStudioProps = {
  design: WatchDesign;
  className?: string;
};

export function WatchStudio({ design, className = "" }: WatchStudioProps) {
  const { canHeavy, reduceMotion } = useMotion();

  if (!canHeavy) {
    return (
      <div className={`watch-studio is-fallback ${className}`}>
        <WatchFace {...design} brand={site.brand.name} size={420} />
        <p className="studio-note">Volume studio needs a capable GPU. The calibre drawing is shown instead.</p>
      </div>
    );
  }

  return (
    <div className={`watch-studio ${className}`}>
      <Suspense fallback={<WatchFace {...design} brand={site.brand.name} size={420} />}>
        <WatchScene design={design} paused={reduceMotion} />
      </Suspense>
      <p className="studio-note">Drag to turn. A WebGL reading of the case — not a photograph.</p>
    </div>
  );
}
