export const calibreStudy = {
  id: "HO-01",
  name: "Study calibre HO-01",
  eyebrow: "Atelier study",
  title: "Open the architecture.",
  disclaimer:
    "HO-01 is a teaching calibre drawn for this page — a concept architecture, not a production specification. Watches on the wrist use H-08, H-72, H-90, H-12 and H-24.",
  facts: [
    { id: "calibre", label: "Calibre HO-01", from: 4 },
    { id: "wind", label: "Automatic", from: 4 },
    { id: "vph", label: "28,800 vph", from: 5 },
    { id: "parts", label: "288 components", from: 6 },
    { id: "reserve", label: "72-hour power reserve", from: 7 },
  ],
  stages: [
    {
      id: "watch",
      label: "Watch",
      copy: "The finished volume. What the wrist will know — before the case is asked to speak.",
    },
    {
      id: "case",
      label: "Case",
      copy: "Bezel, mid-case, caseback. Finished to be refinished. The first surfaces a client’s eye meets.",
    },
    {
      id: "dial",
      label: "Dial",
      copy: "Enamel or opaline. Numerals applied, then the gold meridian drawn last — thinner than a hair.",
    },
    {
      id: "hands",
      label: "Hands",
      copy: "Dauphine, set at 10:10. The pose the atelier still draws by hand.",
    },
    {
      id: "movement",
      label: "Movement",
      copy: "The architecture, not the costume. Bridges, plate, and the train that carries the hours.",
    },
    {
      id: "balance",
      label: "Balance",
      copy: "The regulating organ. It beats, then agrees with Geneva.",
    },
    {
      id: "gears",
      label: "Gears",
      copy: "A train that should carry torque without chatter. Teeth cut, then inspected under raking light.",
    },
    {
      id: "spring",
      label: "Spring",
      copy: "The barrel that holds the hours, and the hairspring that spends them.",
    },
    {
      id: "assembled",
      label: "Assembled",
      copy: "Returned to silence. The craft, composed.",
    },
  ],
} as const

/** Scroll keyframes: Watch → … → Spring → Assembled */
export const explodeKeys = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]

export const explodeLayers = {
  crystal: {
    x: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    y: [0, -78, -96, -108, -138, -148, -156, -162, 0],
  },
  bezel: {
    x: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    y: [0, -40, -52, -60, -86, -96, -102, -108, 0],
  },
  case: {
    x: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    y: [0, 10, 16, 22, 48, 58, 64, 68, 0],
  },
  caseback: {
    x: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    y: [0, 78, 96, 108, 138, 148, 156, 162, 0],
  },
  dial: {
    x: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    y: [0, 0, -56, -64, -92, -104, -112, -118, 0],
  },
  hands: {
    x: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    y: [0, 0, 0, -82, -114, -128, -136, -142, 0],
  },
  movement: {
    x: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    y: [0, 0, 0, 0, 0, 10, 14, 16, 0],
    scale: [1, 1, 1, 1, 1.05, 1.08, 1.1, 1.12, 1],
  },
  balance: {
    x: [0, 0, 0, 0, 0, 118, 128, 136, 0],
    y: [0, 0, 0, 0, 0, -24, -32, -36, 0],
  },
  gears: {
    x: [0, 0, 0, 0, 0, 0, -108, -118, 0],
    y: [0, 0, 0, 0, 0, 0, 28, 34, 0],
  },
  spring: {
    x: [0, 0, 0, 0, 0, 0, 0, -96, 0],
    y: [0, 0, 0, 0, 0, 0, 0, -96, 0],
  },
} as const
