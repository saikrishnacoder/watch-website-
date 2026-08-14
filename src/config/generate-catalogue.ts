import { watch } from "./catalog";
import type { Availability, BezelStyle, CaseMetal, Product, StrapStyle, WatchDesign } from "./types";

const TARGET_EXTRA = 970;

const DIALS = [
  { id: "ivoire", name: "Ivoire", hex: "#f3ead8", text: "#1a1814" },
  { id: "midnight", name: "Midnight", hex: "#101820", text: "#e8d5a3" },
  { id: "salmon", name: "Salmon", hex: "#d4a090", text: "#3a2418" },
  { id: "forest", name: "Forest", hex: "#1e3a34", text: "#e8f0ea" },
  { id: "bordeaux", name: "Bordeaux", hex: "#6b1d2a", text: "#f4efe6" },
  { id: "champagne", name: "Champagne", hex: "#c5a46a", text: "#3a2a12" },
  { id: "slate", name: "Slate", hex: "#3a4048", text: "#f4efe6" },
  { id: "opaline", name: "Opaline", hex: "#ece8e0", text: "#2a2a2c" },
  { id: "navy", name: "Navy", hex: "#12344a", text: "#f4efe6" },
  { id: "sand", name: "Sand", hex: "#c4b49a", text: "#2a2418" },
  { id: "noir", name: "Noir", hex: "#0e1420", text: "#e8d5a3" },
  { id: "glacier", name: "Glacier", hex: "#d8e0e8", text: "#1a242c" },
] as const;

const METALS: { id: string; label: string; material: string; caseMetal: CaseMetal; premium: number }[] = [
  { id: "st", label: "Steel", material: "Stainless steel", caseMetal: "steel", premium: 0 },
  { id: "yg", label: "Yellow gold", material: "18k yellow gold", caseMetal: "gold", premium: 14000 },
  { id: "rg", label: "Rose gold", material: "18k rose gold", caseMetal: "rose", premium: 13200 },
  { id: "wg", label: "White gold", material: "18k white gold", caseMetal: "steel", premium: 14800 },
  { id: "dlc", label: "Black DLC", material: "Steel, black DLC", caseMetal: "black", premium: 1800 },
  { id: "ti", label: "Titanium", material: "Grade 5 titanium", caseMetal: "black", premium: 2400 },
];

const SIZES = [34, 36, 38, 39, 40, 40.5, 41, 42, 43, 44];

const STRAPS: { id: StrapStyle; label: string; color: string }[] = [
  { id: "leather", label: "Alligator strap", color: "#2a1f18" },
  { id: "bracelet", label: "Metal bracelet", color: "#c5c7ca" },
  { id: "nato", label: "Textile strap", color: "#1c2430" },
];

const LINES = [
  {
    slug: "heritage",
    name: "Heritage",
    calibre: "H-08",
    movementType: "Automatic" as const,
    power: 42,
    water: 30,
    thick: 9.6,
    base: 7400,
    complications: ["Date"],
    bezels: ["none", "fluted"] as BezelStyle[],
    photos: ["/lines/heritage.jpg", "/studio/velvet.jpg", "/media/maison-meridian.jpg"],
  },
  {
    slug: "chronograph",
    name: "Chronograph",
    calibre: "H-72",
    movementType: "Chronograph" as const,
    power: 48,
    water: 100,
    thick: 13.2,
    base: 8900,
    complications: ["Chronograph", "Date"],
    bezels: ["none", "tachymeter"] as BezelStyle[],
    photos: ["/lines/chronograph.jpg", "/studio/velvet.jpg", "/media/maison-meridian.jpg"],
  },
  {
    slug: "diver",
    name: "Diver",
    calibre: "H-90",
    movementType: "Automatic" as const,
    power: 70,
    water: 200,
    thick: 13.4,
    base: 10800,
    complications: ["Date", "Unidirectional bezel"],
    bezels: ["ceramic"] as BezelStyle[],
    photos: ["/lines/diver.jpg", "/studio/velvet.jpg", "/media/maison-bench.jpg"],
  },
  {
    slug: "imperial",
    name: "Imperial",
    calibre: "H-12",
    movementType: "Automatic" as const,
    power: 42,
    water: 50,
    thick: 8.8,
    base: 19800,
    complications: ["Date"],
    bezels: ["fluted", "none"] as BezelStyle[],
    photos: ["/lines/imperial.jpg", "/studio/velvet.jpg", "/media/maison-meridian.jpg"],
  },
  {
    slug: "meridian",
    name: "Meridian",
    calibre: "H-24",
    movementType: "Automatic" as const,
    power: 70,
    water: 100,
    thick: 12.4,
    base: 14200,
    complications: ["GMT", "Date"],
    bezels: ["ceramic", "none"] as BezelStyle[],
    photos: ["/lines/meridian.jpg", "/studio/velvet.jpg", "/media/maison-meridian.jpg"],
  },
];

const AVAIL: Availability[] = ["Available", "Available", "Available", "In boutique", "Waitlist"];

function strapColor(strap: (typeof STRAPS)[number], metal: (typeof METALS)[number], dial: (typeof DIALS)[number]) {
  if (strap.id === "bracelet") return metal.caseMetal === "gold" || metal.caseMetal === "rose" ? "#e0c070" : "#c5c7ca";
  if (strap.id === "nato") return dial.hex;
  return "#2a1f18";
}

export function generateAtelierCatalogue(): Product[] {
  return Array.from({ length: TARGET_EXTRA }, (_, i) => {
    const line = LINES[i % LINES.length];
    const n = Math.floor(i / LINES.length);
    const size = SIZES[n % SIZES.length];
    const dial = DIALS[(n * 3 + i) % DIALS.length];
    const metal = METALS[(n * 2 + i) % METALS.length];
    const strap = STRAPS[n % STRAPS.length];
    const bezel = line.bezels[n % line.bezels.length];
    const serial = String(n + 1).padStart(3, "0");
    const design: WatchDesign = {
      caseMetal: metal.caseMetal,
      dial: dial.hex,
      dialText: dial.text,
      markers: line.slug === "heritage" ? (n % 2 === 0 ? "roman" : "arabic") : n % 3 === 0 ? "dots" : "baton",
      hands: line.slug === "diver" || line.slug === "chronograph" ? "sport" : "dauphine",
      bezel,
      strap: strap.id,
      strapColor: strapColor(strap, metal, dial),
      chronograph: line.slug === "chronograph",
      dateWindow: true,
    };
    const water = line.slug === "diver" && n % 4 === 0 ? 500 : line.water;
    const price = line.base + metal.premium + Math.round(size * 40) + (n % 7) * 150;
    const movement =
      line.movementType === "Chronograph"
        ? `${line.calibre} automatic chronograph`
        : n % 11 === 0 && line.slug === "heritage"
          ? `${line.calibre}S manual wind`
          : `${line.calibre} automatic`;

    return watch({
      slug: `${line.slug}-${size}-${dial.id}-${metal.id}-${serial}`,
      name: `${line.name} ${size} ${dial.name}, ${metal.label.toLowerCase()}`,
      reference: `${line.calibre.replace("H-", "H.")}.${size}.${metal.id.toUpperCase()}.${serial}`,
      collection: line.name,
      collectionSlug: line.slug,
      price,
      tagline: `${dial.name} dial. ${metal.label}. ${size} mm.`,
      description: `${line.name} in ${metal.material.toLowerCase()}, a ${dial.name.toLowerCase()} dial and ${strap.label.toLowerCase()}. The gold meridian sits at 12.`,
      story: `Atelier reference ${serial} in the ${line.name} line. Composed for the current catalogue — ${size} mm, ${water} metres, ${movement}.`,
      diameter: size,
      thickness: line.thick + (size > 41 ? 0.6 : 0),
      waterResistance: water,
      movement,
      movementType: movement.includes("manual") ? "Manual" : line.movementType,
      powerReserve: movement.includes("manual") ? 38 : line.power,
      material: metal.material,
      crystal: size <= 36 ? "Box sapphire" : "Sapphire, AR coated",
      bracelet: `${strap.label}${metal.caseMetal === "gold" || metal.caseMetal === "rose" ? ", gold buckle" : ""}`,
      complications: line.complications,
      availability: AVAIL[n % AVAIL.length],
      images: line.photos,
      design,
    });
  });
}

export const atelierProducts = generateAtelierCatalogue();
