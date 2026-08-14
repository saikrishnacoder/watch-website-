import { site, type Product } from "./site";

export function papersFor(product: Product) {
  const secondStrap =
    product.design.strap === "bracelet"
      ? "Alligator strap, cut in Geneva and held for first service"
      : product.design.strap === "nato"
        ? "Alligator strap in the maison box"
        : "Steel bracelet, fitted in boutique on request";

  return [
    { title: "Maison box", body: "Gilt-edged box, travel pouch, and a polishing cloth in ivoire linen." },
    { title: "Extrait de registre", body: `A numbered certificate for ${product.reference}, signed by the atelier.` },
    { title: "International warranty", body: "Five years on the movement. The meridian is meant to be refinished." },
    { title: "Second strap", body: secondStrap },
  ];
}

export function complimentaryStrap(product: Product) {
  return papersFor(product)[3].body;
}

export function maisonInclusions() {
  return [
    `${site.brand.city} regulation in five positions`,
    "White-glove delivery or boutique collection",
    "First timing check, complimentary within 24 months",
  ];
}
