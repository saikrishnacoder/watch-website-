type Connection = {
  saveData?: boolean;
  effectiveType?: string;
};

export type DeviceCapabilities = {
  reduceMotion: boolean;
  coarsePointer: boolean;
  saveData: boolean;
  slowNetwork: boolean;
  memory?: number;
  webgl: boolean;
  canHeavy: boolean;
};

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function detectCapabilities(userReduce = false): DeviceCapabilities {
  const reduceMotion =
    userReduce || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const connection = (navigator as Navigator & { connection?: Connection }).connection;
  const saveData = Boolean(connection?.saveData);
  const slowNetwork = ["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const webgl = hasWebGL();
  const canHeavy =
    webgl &&
    !reduceMotion &&
    !saveData &&
    !slowNetwork &&
    (memory === undefined || memory >= 4) &&
    window.innerWidth >= 900;

  return { reduceMotion, coarsePointer, saveData, slowNetwork, memory, webgl, canHeavy };
}
