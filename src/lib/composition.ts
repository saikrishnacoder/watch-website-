import type { BezelStyle, CaseMetal, HandStyle, MarkerStyle, StrapStyle } from "../config/types"

export type Composition = {
  caseMetal: CaseMetal
  dial: string
  dialLabel: string
  markers: MarkerStyle
  hands: HandStyle
  bezel: BezelStyle
  strap: StrapStyle
  strapColor: string
  strapLabel: string
}

const METALS: CaseMetal[] = ["steel", "gold", "rose", "black"]
const MARKERS: MarkerStyle[] = ["baton", "roman", "arabic", "dots"]
const HANDS: HandStyle[] = ["dauphine", "sword", "sport"]
const BEZELS: BezelStyle[] = ["none", "fluted", "tachymeter", "ceramic"]
const STRAPS: StrapStyle[] = ["leather", "bracelet", "nato"]

export function compositionCode(c: Composition) {
  return `HO-C.${c.caseMetal.slice(0, 2).toUpperCase()}.${c.markers.slice(0, 2).toUpperCase()}`
}

export function compositionQuery(c: Composition) {
  return new URLSearchParams({
    case: c.caseMetal,
    dial: c.dial.replace("#", ""),
    markers: c.markers,
    hands: c.hands,
    bezel: c.bezel,
    strap: c.strap,
  }).toString()
}

function pick<T extends string>(value: string | null, allowed: T[], fallback: T): T {
  return value && allowed.includes(value as T) ? (value as T) : fallback
}

export function parseComposition(search: string, fallback: Composition): Composition {
  const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search)
  const dialHex = q.get("dial")
  return {
    ...fallback,
    caseMetal: pick(q.get("case"), METALS, fallback.caseMetal),
    dial: dialHex ? `#${dialHex.replace("#", "")}` : fallback.dial,
    markers: pick(q.get("markers"), MARKERS, fallback.markers),
    hands: pick(q.get("hands"), HANDS, fallback.hands),
    bezel: pick(q.get("bezel"), BEZELS, fallback.bezel),
    strap: pick(q.get("strap"), STRAPS, fallback.strap),
  }
}
