import { altFor, site, type Product } from "../../config/site";
import { WatchFace } from "../watch/WatchFace";

type StudioStageProps = {
  product: Product;
  size?: number;
  caption?: string;
};

export function StudioStage({ product, size = 420, caption }: StudioStageProps) {
  return (
    <figure className="studio-stage">
      <img src="/studio/velvet.jpg" alt={altFor("/studio/velvet.jpg", `${product.name} on studio velvet`)} />
      <WatchFace {...product.design} brand={site.brand.name} size={size} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
