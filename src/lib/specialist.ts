export const OPEN_SPECIALIST = "horloge-open-concierge";
export const OPEN_REGION = "horloge-open-region";

export type SpecialistTab = "ask" | "write";

export function openSpecialist(tab: SpecialistTab = "ask") {
  window.dispatchEvent(new CustomEvent(OPEN_SPECIALIST, { detail: { tab } }));
}

export function openRegion() {
  window.dispatchEvent(new Event(OPEN_REGION));
}
