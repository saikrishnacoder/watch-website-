import { CraftLoupe } from "../motion/CraftLoupe";
import { ExplodedCalibre } from "../motion/ExplodedCalibre";

export function CraftChapter() {
  return (
    <div>
      <CraftLoupe marked={false} />
      <ExplodedCalibre />
    </div>
  );
}
