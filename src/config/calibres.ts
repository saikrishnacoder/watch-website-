export const productionCalibres = [
  {
    id: "H-08",
    name: "Calibre H-08",
    line: "Heritage",
    winding: "Automatic; H-08S is manual-wind on selected Heritage pieces",
    note: "Extra-thin. Railroad minutes. Regulated in five positions until it agrees with Geneva.",
  },
  {
    id: "H-72",
    name: "Calibre H-72",
    line: "Chronograph",
    winding: "Automatic chronograph, column wheel",
    note: "The start, stop and reset are three distinct mechanical events — not a cam, not a shutter.",
  },
  {
    id: "H-90",
    name: "Calibre H-90",
    line: "Diver",
    winding: "Automatic",
    note: "Finished like a dress calibre. Depth does not excuse a missing meridian.",
  },
  {
    id: "H-12",
    name: "Calibre H-12",
    line: "Imperial",
    winding: "Automatic",
    note: "Built for cases that will be refinished. The first owner is not the last.",
  },
  {
    id: "H-24",
    name: "Calibre H-24",
    line: "Meridian",
    winding: "Automatic, GMT and dual time",
    note: "Named for the line at 12. A second hour, still composed around one gold stroke.",
  },
] as const;

export type CalibreId = (typeof productionCalibres)[number]["id"];

export function calibreFamily(movement: string) {
  const match = movement.match(/H-\d+/);
  if (!match) return undefined;
  return productionCalibres.find((item) => item.id === match[0]);
}

export const craftDisclaimer =
  "Figures on this sheet are for the watch on the wrist. Teaching calibre HO-01 on the atelier pages is a concept drawing, not a production specification.";
