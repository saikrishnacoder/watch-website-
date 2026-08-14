export type ThemeId = "encre" | "ivoire";

export const THEME_KEY = "horloge-theme";

export const palettes: Record<
  ThemeId,
  {
    bg: string;
    bgElevated: string;
    bgSoft: string;
    ink: string;
    muted: string;
    gold: string;
    goldSoft: string;
    line: string;
    danger: string;
  }
> = {
  encre: {
    bg: "#070605",
    bgElevated: "#110f0d",
    bgSoft: "#181614",
    ink: "#f4efe6",
    muted: "#9a9286",
    gold: "#c9a86c",
    goldSoft: "#e8d5a3",
    line: "rgba(244, 239, 230, 0.1)",
    danger: "#b5453a",
  },
  ivoire: {
    bg: "#f3ead8",
    bgElevated: "#ebe3d2",
    bgSoft: "#e4dcc8",
    ink: "#1a1612",
    muted: "#6f675c",
    gold: "#8d6b32",
    goldSoft: "#b08948",
    line: "rgba(26, 22, 18, 0.14)",
    danger: "#9a3a32",
  },
};

export function isTheme(value: string): value is ThemeId {
  return value === "encre" || value === "ivoire";
}
