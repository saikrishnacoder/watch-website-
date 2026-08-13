export type CaseMetal = "steel" | "gold" | "rose" | "black";
export type MarkerStyle = "baton" | "roman" | "arabic" | "dots";
export type HandStyle = "dauphine" | "sword" | "sport";
export type BezelStyle = "none" | "fluted" | "tachymeter" | "ceramic";
export type StrapStyle = "leather" | "bracelet" | "nato";
export type MovementType = "Automatic" | "Manual" | "Chronograph";
export type Availability = "Available" | "In boutique" | "Waitlist";

export type WatchDesign = {
  caseMetal: CaseMetal;
  dial: string;
  dialText: string;
  markers: MarkerStyle;
  hands: HandStyle;
  bezel: BezelStyle;
  strap: StrapStyle;
  strapColor: string;
  chronograph?: boolean;
  dateWindow?: boolean;
};

export type SpecGroup = {
  title: string;
  rows: { label: string; value: string }[];
};

export type Product = {
  slug: string;
  name: string;
  reference: string;
  collection: string;
  collectionSlug: string;
  price: number;
  limited?: boolean;
  badge?: string;
  novelty?: boolean;
  tagline: string;
  description: string;
  story: string;
  diameter: number;
  thickness: number;
  waterResistance: number;
  movement: string;
  movementType: MovementType;
  powerReserve: number;
  material: string;
  crystal: string;
  bracelet: string;
  complications: string[];
  availability: Availability;
  images: string[];
  specGroups: SpecGroup[];
  design: WatchDesign;
};
