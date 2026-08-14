/** Quiet tactile feedback — a maison press, not a game vibration. */
export function tapFeel() {
  try {
    navigator.vibrate?.(10);
  } catch {
    /* some browsers throw if vibrate is blocked */
  }
}
