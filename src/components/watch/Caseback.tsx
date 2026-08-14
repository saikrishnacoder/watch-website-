import type { CaseMetal } from "../../config/types";
import { site } from "../../config/site";

const METAL: Record<CaseMetal, { rim: string; plate: string; script: string }> = {
  steel: { rim: "#c5c7ca", plate: "#8a8e94", script: "#2a2c30" },
  gold: { rim: "#e0c070", plate: "#c9a86c", script: "#3a2a12" },
  rose: { rim: "#e0b09c", plate: "#c48874", script: "#3a2418" },
  black: { rim: "#4a4a4c", plate: "#1c1c1e", script: "#e8d5a3" },
};

type CasebackProps = {
  metal: CaseMetal;
  reference: string;
  engraving?: string;
  size?: number;
};

export function Caseback({ metal, reference, engraving = "", size = 220 }: CasebackProps) {
  const tone = METAL[metal];
  const text = engraving.trim().slice(0, 12).toUpperCase();

  return (
    <svg viewBox="0 0 220 220" width={size} height={size} role="img" aria-label="Engraved caseback preview">
      <defs>
        <radialGradient id="caseback-plate" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor={tone.rim} />
          <stop offset="55%" stopColor={tone.plate} />
          <stop offset="100%" stopColor={tone.script} stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="110" r="104" fill={tone.rim} />
      <circle cx="110" cy="110" r="96" fill="url(#caseback-plate)" />
      <circle cx="110" cy="110" r="88" fill="none" stroke={tone.script} strokeOpacity="0.28" />
      <circle cx="110" cy="110" r="42" fill="none" stroke={tone.script} strokeOpacity="0.45" />
      <text
        x="110"
        y="78"
        textAnchor="middle"
        fill={tone.script}
        fontFamily="Cormorant Garamond, serif"
        fontSize="13"
        letterSpacing="0.28em"
      >
        {site.brand.wordmark}
      </text>
      <text
        x="110"
        y="98"
        textAnchor="middle"
        fill={tone.script}
        fontFamily="Outfit, sans-serif"
        fontSize="7"
        letterSpacing="0.22em"
        opacity="0.8"
      >
        GENÈVE · {site.brand.founded}
      </text>
      <text
        x="110"
        y={text ? 128 : 124}
        textAnchor="middle"
        fill={tone.script}
        fontFamily="Cormorant Garamond, serif"
        fontSize={text ? 16 : 11}
        letterSpacing="0.16em"
      >
        {text || "À GRAVER"}
      </text>
      <text
        x="110"
        y="152"
        textAnchor="middle"
        fill={tone.script}
        fontFamily="Outfit, sans-serif"
        fontSize="7"
        letterSpacing="0.18em"
        opacity="0.75"
      >
        {reference}
      </text>
    </svg>
  );
}
