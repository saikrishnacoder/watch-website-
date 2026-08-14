/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
}

declare module "*.json" {
  const value: {
    particles: { x: number; y: number; size: number; dur: number; delay: number; amp: number }[];
    svgs: string[];
  };
  export default value;
}
