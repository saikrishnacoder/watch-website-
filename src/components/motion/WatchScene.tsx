import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { WatchDesign } from "../../config/types";

const METAL: Record<WatchDesign["caseMetal"], number> = {
  steel: 0xd5d8dc,
  gold: 0xe0c070,
  rose: 0xe0b09c,
  black: 0x3a3a3c,
};

type WatchSceneProps = {
  design: WatchDesign;
  paused?: boolean;
};

export default function WatchScene({ design, paused = false }: WatchSceneProps) {
  const host = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = host.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070605);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0, 0.35, 4.2);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const watch = buildWatch(design);
    scene.add(watch);

    scene.add(new THREE.AmbientLight(0xf4efe6, 0.45));
    const key = new THREE.DirectionalLight(0xffe6b0, 1.35);
    key.position.set(3.2, 4.4, 3.6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x9ab0c8, 0.55);
    rim.position.set(-4, 1.2, -2);
    scene.add(rim);

    let frame = 0;
    let dragging = false;
    let lastX = 0;
    let hidden = document.hidden;
    const clock = new THREE.Clock();

    const resize = () => {
      const width = canvas.clientWidth || 480;
      const height = canvas.clientHeight || 480;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      canvas.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      watch.rotation.y += (event.clientX - lastX) * 0.008;
      lastX = event.clientX;
    };
    const onPointerUp = () => {
      dragging = false;
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (hidden || paused) return;
      const delta = clock.getDelta();
      if (!dragging) watch.rotation.y += delta * 0.18;
      renderer.render(scene, camera);
    };

    const onVisibility = () => {
      hidden = document.hidden;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(tick);
    renderer.render(scene, camera);

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) material.forEach((item) => disposeMaterial(item));
        else if (material) disposeMaterial(material);
      });
      renderer.dispose();
    };
  }, [design, paused]);

  return <canvas ref={host} className="watch-scene" aria-label="Interactive three-dimensional watch" />;
}

function disposeMaterial(material: THREE.Material) {
  const withMap = material as THREE.MeshStandardMaterial;
  withMap.map?.dispose();
  material.dispose();
}

function buildWatch(design: WatchDesign) {
  const group = new THREE.Group();
  const metal = METAL[design.caseMetal];
  const caseMat = new THREE.MeshStandardMaterial({
    color: metal,
    metalness: 0.92,
    roughness: 0.28,
  });
  const caseBody = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.18, 0.28, 72), caseMat);
  caseBody.rotation.x = Math.PI / 2;
  group.add(caseBody);

  const bezel = new THREE.Mesh(new THREE.TorusGeometry(1.16, 0.07, 16, 72), caseMat);
  group.add(bezel);

  const dialTex = makeDialTexture(design);
  const dial = new THREE.Mesh(
    new THREE.CircleGeometry(1.02, 72),
    new THREE.MeshStandardMaterial({ map: dialTex, roughness: 0.55, metalness: 0.08 }),
  );
  dial.position.z = 0.12;
  group.add(dial);

  const crystal = new THREE.Mesh(
    new THREE.CircleGeometry(1.04, 72),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
      roughness: 0.05,
      metalness: 0,
      transmission: 0.6,
    }),
  );
  crystal.position.z = 0.16;
  group.add(crystal);

  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.18, 16), caseMat);
  crown.rotation.z = Math.PI / 2;
  crown.position.set(1.28, 0, 0);
  group.add(crown);

  const handMat = new THREE.MeshStandardMaterial({
    color: design.hands === "sport" ? 0xc9a86c : 0x1a1814,
    metalness: 0.4,
    roughness: 0.35,
  });
  const hour = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.46, 0.03), handMat);
  hour.position.set(0.12, 0.16, 0.18);
  hour.rotation.z = -0.55;
  group.add(hour);
  const minute = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.68, 0.03), handMat);
  minute.position.set(-0.18, 0.22, 0.19);
  minute.rotation.z = 0.52;
  group.add(minute);

  return group;
}

function makeDialTexture(design: WatchDesign) {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = design.dial;
  ctx.fillRect(0, 0, size, size);
  const cx = size / 2;
  const cy = size / 2;
  ctx.strokeStyle = design.dialText;
  ctx.fillStyle = design.dialText;
  ctx.lineWidth = 6;
  for (let i = 0; i < 60; i += 1) {
    const a = ((i * 6 - 90) * Math.PI) / 180;
    const major = i % 5 === 0;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * (major ? 390 : 430), cy + Math.sin(a) * (major ? 390 : 430));
    ctx.lineTo(cx + Math.cos(a) * 460, cy + Math.sin(a) * 460);
    ctx.stroke();
  }
  ctx.strokeStyle = "#c9a86c";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(cx, 70);
  ctx.lineTo(cx, 150);
  ctx.stroke();
  ctx.fillStyle = design.dialText;
  ctx.font = "600 42px 'Outfit', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("HORLOGE", cx, cy - 80);
  ctx.font = "500 22px 'Outfit', sans-serif";
  ctx.fillStyle = "rgba(244,239,230,0.55)";
  ctx.fillText("GENÈVE", cx, cy - 40);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
