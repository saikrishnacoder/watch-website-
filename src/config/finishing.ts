export type FinishId = "perlage" | "cotes" | "anglage" | "enamel" | "meridian"

export const finishing = {
  eyebrow: "Craftsmanship",
  title: "Why this watch is valuable.",
  lede:
    "Case, dial, movement, finishing. A HORLOGE passes through fewer than twelve pairs of hands. Surfaces are finished to be refinished. The meridian is drawn last.",
  spots: [
    {
      id: "perlage" as const,
      n: "01",
      label: "Perlage",
      x: 22,
      y: 42,
      copy:
        "Overlapping circles, cut by a rotating peg. Each plot must kiss the next without tearing it. The plate should look like it was snowed on, not stamped.",
    },
    {
      id: "cotes" as const,
      n: "02",
      label: "Côtes de Genève",
      x: 52,
      y: 38,
      copy:
        "Straight waves across a bridge, cut so they catch a lamp and go quiet in shade. The stripe is the maison's second handwriting, after the meridian.",
    },
    {
      id: "anglage" as const,
      n: "03",
      label: "Anglage",
      x: 78,
      y: 30,
      copy:
        "A bevel on the bridge edge, polished until it holds a line of light. Inside corners are still done by hand. A machine cannot turn a right angle into silk.",
    },
    {
      id: "enamel" as const,
      n: "04",
      label: "Grand feu enamel",
      x: 30,
      y: 78,
      copy:
        "Powder, fire, inspect, repeat. The dial is not painted in a single pass. Numerals wait until the surface has settled — then the meridian is drawn last.",
    },
    {
      id: "meridian" as const,
      n: "05",
      label: "Gold meridian",
      x: 68,
      y: 72,
      copy:
        "A stroke of gold at twelve, thinner than a hair. It is the maison’s north. If it is missing, the watch is not ours.",
    },
  ],
}
