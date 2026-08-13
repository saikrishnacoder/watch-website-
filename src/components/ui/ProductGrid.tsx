import { useEffect, useState } from "react";
import type { Product } from "../../config/types";
import { ProductCard } from "./ProductCard";

const PAGE_SIZE = 24;

export function ProductGrid({ products }: { products: Product[] }) {
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [products.length, products[0]?.slug]);

  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [page, pages]);

  const slice = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const go = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <>
      <div className="product-grid">
        {slice.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} priority={index < 2 && page === 1} />
        ))}
      </div>
      {pages > 1 && (
        <nav className="pager" aria-label="Catalogue pages">
          <button type="button" className="filter-btn" disabled={page === 1} onClick={() => go(page - 1)}>
            Previous
          </button>
          <span>
            {page} / {pages}
          </span>
          <button type="button" className="filter-btn" disabled={page === pages} onClick={() => go(page + 1)}>
            Next
          </button>
        </nav>
      )}
    </>
  );
}
