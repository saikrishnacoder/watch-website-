export type InspectSpotId = "meridian" | "dial" | "bezel" | "crown" | "caseback"

export type InspectSpot = {
  id: InspectSpotId
  n: string
  label: string
  copy: string
}

export const inspectSpots: InspectSpot[] = [
  {
    id: "meridian",
    n: "①",
    label: "Gold meridian",
    copy:
      "A single stroke of gold at twelve — thinner than a hair, laid before the crystal is set. It is not an hour mark. It is the maison’s north: the line every other index is measured against.",
  },
  {
    id: "dial",
    n: "②",
    label: "Hand-finished dial",
    copy:
      "Enamel or opaline, never printed in a single pass. Numerals are applied, then inspected under raking light. The meridian is drawn last so nothing on the chapter ring sits proud of it.",
  },
  {
    id: "bezel",
    n: "③",
    label: "Polished bezel",
    copy:
      "Alternating brushed and polished facets, finished by hand so the piece can be refinished in a century. The edge is the first surface a client’s eye meets. It must take light without shouting.",
  },
  {
    id: "crown",
    n: "④",
    label: "Crown",
    copy:
      "Signed, gasketed, and cut to the case rather than bought in. Winding should feel like a lock turning — resistance, then give — not a click from a catalogue part.",
  },
  {
    id: "caseback",
    n: "⑤",
    label: "Caseback",
    copy:
      "Sapphire or metal, according to the line. The punch mark is the maison’s word that this case left the bench. Reference, serial, and water resistance are engraved, never printed.",
  },
]

export const inspectHint =
  "Drag to rotate · scroll to zoom · double-click a point to inspect"
