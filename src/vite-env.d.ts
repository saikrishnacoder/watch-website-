/// <reference types="vite/client" />

declare module "*.json" {
  const value: {
    particles: { x: number; y: number; size: number; dur: number; delay: number; amp: number }[];
    svgs: string[];
  };
  export default value;
}
