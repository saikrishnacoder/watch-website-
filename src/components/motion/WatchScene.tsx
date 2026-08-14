import { useEffect, useRef } from "react"
import type { CaseMetal, Product } from "../../config/types"
import type { InspectSpotId } from "../../config/inspect"

type Pose = { yaw: number; pitch: number; zoom: number }

const POSES: Record<InspectSpotId, Pose> = {
  meridian: { yaw: 0, pitch: 0.08, zoom: 3.35 },
  dial: { yaw: 0.04, pitch: 0.02, zoom: 3.15 },
  bezel: { yaw: 0.12, pitch: 0.42, zoom: 2.95 },
  crown: { yaw: 1.22, pitch: 0.06, zoom: 3.05 },
  caseback: { yaw: Math.PI, pitch: 0.1, zoom: 3.2 },
}

const HOTSPOT_LOCAL: Record<InspectSpotId, [number, number, number]> = {
  meridian: [0, 0.62, 0.1],
  dial: [0, 0.06, 0.11],
  bezel: [0.58, 0.52, 0.12],
  crown: [0.98, 0, 0],
  caseback: [0, 0, -0.16],
}

const CASE_HEX: Record<CaseMetal, string> = {
  steel: "#c8ccd0",
  gold: "#d4b06a",
  rose: "#d4a090",
  black: "#2c2c30",
}

const GOLD = "#c9a86c"

type SpotMap = Record<InspectSpotId, { x: number; y: number; visible: boolean }>

type Props = {
  product: Product
  onHotspots?: (spots: SpotMap) => void
  onInspect?: (id: InspectSpotId) => void
  inspectId?: InspectSpotId | null
}

export function WatchScene({ product, onHotspots, onInspect, inspectId }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const inspectRef = useRef(inspectId)
  inspectRef.current = inspectId
  const onHotspotsRef = useRef(onHotspots)
  onHotspotsRef.current = onHotspots
  const onInspectRef = useRef(onInspect)
  onInspectRef.current = onInspect

  useEffect(() => {
    const el = host.current
    if (!el) return
    let dead = false
    let cleanup: (() => void) | undefined

    void (async () => {
      const THREE = await import("three")
      if (dead || !host.current) return

      const design = product.design
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40)
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      el.appendChild(renderer.domElement)

      const key = new THREE.DirectionalLight(0xfff4e0, 1.55)
      key.position.set(2.4, 3.2, 4)
      scene.add(key)
      const rim = new THREE.DirectionalLight(0x8a9bb8, 0.55)
      rim.position.set(-3, 0.4, -2)
      scene.add(rim)
      scene.add(new THREE.AmbientLight(0xffffff, 0.32))
      const fill = new THREE.PointLight(0xc9a227, 0.35)
      fill.position.set(0, -1.2, 2)
      scene.add(fill)

      const metal = new THREE.Color(CASE_HEX[design.caseMetal])
      const gold = new THREE.Color(GOLD)

      const watch = new THREE.Group()
      scene.add(watch)

      const caseMat = new THREE.MeshStandardMaterial({
        color: metal,
        metalness: 0.92,
        roughness: 0.22,
      })
      const goldMat = new THREE.MeshStandardMaterial({
        color: gold,
        metalness: 1,
        roughness: 0.18,
      })
      const polishMat = new THREE.MeshStandardMaterial({
        color: metal.clone().lerp(new THREE.Color("#ffffff"), 0.14),
        metalness: 0.98,
        roughness: 0.1,
      })
      const bezelMat =
        design.bezel === "ceramic"
          ? new THREE.MeshStandardMaterial({ color: "#1a1a1c", metalness: 0.35, roughness: 0.28 })
          : polishMat

      const caseBody = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.84, 0.22, 64), caseMat)
      caseBody.rotation.x = Math.PI / 2
      caseBody.name = "case"
      watch.add(caseBody)

      const bezel = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.07, 16, 80), bezelMat)
      bezel.rotation.x = Math.PI / 2
      bezel.position.z = 0.08
      bezel.name = "bezel"
      watch.add(bezel)

      const lugs = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.55, 0.12), caseMat)
      lugs.position.z = -0.02
      watch.add(lugs)

      const caseback = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.04, 48), polishMat)
      caseback.rotation.x = Math.PI / 2
      caseback.position.z = -0.13
      caseback.name = "caseback"
      watch.add(caseback)

      const punch = new THREE.Mesh(new THREE.CircleGeometry(0.08, 24), goldMat)
      punch.position.z = -0.152
      punch.rotation.y = Math.PI
      watch.add(punch)

      const canvas = document.createElement("canvas")
      canvas.width = 1024
      canvas.height = 1024
      const ctx = canvas.getContext("2d")!
      ctx.fillStyle = design.dial
      ctx.fillRect(0, 0, 1024, 1024)
      ctx.strokeStyle = GOLD
      ctx.lineWidth = 10
      ctx.beginPath()
      ctx.moveTo(512, 70)
      ctx.lineTo(512, 210)
      ctx.stroke()
      ctx.fillStyle = GOLD
      ctx.beginPath()
      ctx.arc(512, 512, 14, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = `${design.dialText}99`
      ctx.lineWidth = 2
      for (let i = 0; i < 60; i++) {
        const a = (i / 60) * Math.PI * 2
        const inner = i % 5 === 0 ? 390 : 420
        ctx.beginPath()
        ctx.moveTo(512 + Math.sin(a) * inner, 512 - Math.cos(a) * inner)
        ctx.lineTo(512 + Math.sin(a) * 448, 512 - Math.cos(a) * 448)
        ctx.stroke()
      }
      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      const dial = new THREE.Mesh(
        new THREE.CircleGeometry(0.72, 64),
        new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55, metalness: 0.08 }),
      )
      dial.position.z = 0.07
      dial.name = "dial"
      watch.add(dial)

      const meridian = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.2, 0.012), goldMat)
      meridian.position.set(0, 0.52, 0.085)
      meridian.name = "meridian"
      watch.add(meridian)

      const crystal = new THREE.Mesh(
        new THREE.CircleGeometry(0.74, 64),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.12,
          metalness: 0.08,
          roughness: 0.04,
        }),
      )
      crystal.position.z = 0.11
      watch.add(crystal)

      const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 16), goldMat)
      crown.rotation.z = Math.PI / 2
      crown.position.x = 0.92
      crown.name = "crown"
      watch.add(crown)

      const isBracelet = design.strap === "bracelet"
      const isNato = design.strap === "nato"
      const strapHex = isBracelet ? metal.clone() : new THREE.Color(design.strapColor)
      const strapMat = new THREE.MeshStandardMaterial({
        color: strapHex,
        metalness: isBracelet ? 0.86 : isNato ? 0.04 : 0.08,
        roughness: isBracelet ? 0.28 : isNato ? 0.72 : 0.58,
      })
      const strapWidth = isBracelet ? 0.52 : isNato ? 0.46 : 0.4
      const strapLower = new THREE.Mesh(new THREE.BoxGeometry(strapWidth, 1.32, isNato ? 0.05 : 0.08), strapMat)
      strapLower.position.set(0, -1.08, -0.02)
      watch.add(strapLower)
      const strapUpper = strapLower.clone()
      strapUpper.position.y = 1.08
      watch.add(strapUpper)
      if (isNato) {
        const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.35, 0.08), strapMat)
        ribbon.position.z = 0.02
        watch.add(ribbon)
      }
      if (isBracelet) {
        for (const y of [-0.72, -1.18, 0.72, 1.18]) {
          const link = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.22, 0.09), strapMat)
          link.position.set(0, y, -0.02)
          watch.add(link)
        }
      }

      const hour = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.38, 0.02), goldMat)
      hour.position.set(0.08, 0.14, 0.09)
      hour.rotation.z = -0.4
      watch.add(hour)
      const minute = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.52, 0.02), goldMat)
      minute.position.set(-0.12, 0.18, 0.095)
      minute.rotation.z = 0.55
      watch.add(minute)

      const raycaster = new THREE.Raycaster()
      const pointer = new THREE.Vector2()
      const world = new THREE.Vector3()
      const pointers = new Map<number, { x: number; y: number }>()
      let pinch0 = 0
      let yaw = 0.35
      let pitch = 0.12
      let zoom = 4.2
      let targetYaw = yaw
      let targetPitch = pitch
      let targetZoom = zoom
      let dragging = false
      let lastX = 0
      let lastY = 0
      let idle = 0
      let lastHotspot = 0
      const quiet = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const hitMeshes = [bezel, dial, meridian, crown, caseback, caseBody]

      const size = () => {
        const w = el.clientWidth
        const h = el.clientHeight
        camera.aspect = w / Math.max(h, 1)
        camera.updateProjectionMatrix()
        renderer.setSize(w, h, false)
      }
      size()

      const emitHotspots = () => {
        const cb = onHotspotsRef.current
        if (!cb) return
        const w = el.clientWidth
        const h = el.clientHeight
        const next = {} as SpotMap
        ;(Object.keys(HOTSPOT_LOCAL) as InspectSpotId[]).forEach((id) => {
          const [x, y, z] = HOTSPOT_LOCAL[id]
          world.set(x, y, z)
          watch.localToWorld(world)
          world.project(camera)
          const sx = (world.x * 0.5 + 0.5) * w
          const sy = (-world.y * 0.5 + 0.5) * h
          const onScreen = world.z < 1 && sx > 8 && sx < w - 8 && sy > 8 && sy < h - 8
          next[id] = { x: sx, y: sy, visible: onScreen }
        })
        cb(next)
      }

      const applyInspect = (id: InspectSpotId) => {
        const pose = POSES[id]
        targetYaw = pose.yaw
        targetPitch = pose.pitch
        targetZoom = pose.zoom
        idle = 0
      }

      const ndcFromEvent = (e: PointerEvent | MouseEvent) => {
        const r = el.getBoundingClientRect()
        pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1
        pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1
      }

      const pickSpot = (e: PointerEvent | MouseEvent): InspectSpotId | null => {
        ndcFromEvent(e)
        raycaster.setFromCamera(pointer, camera)
        const name = raycaster.intersectObjects(hitMeshes, false)[0]?.object.name
        if (name === "meridian" || name === "dial" || name === "bezel" || name === "crown" || name === "caseback") {
          return name
        }
        return null
      }

      const pinchDistance = () => {
        const pts = [...pointers.values()]
        if (pts.length < 2) return 0
        return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
      }

      const onDown = (e: PointerEvent) => {
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
        if (pointers.size === 2) {
          pinch0 = pinchDistance()
          dragging = false
          return
        }
        dragging = true
        lastX = e.clientX
        lastY = e.clientY
        idle = 0
        el.setPointerCapture(e.pointerId)
      }
      const onMove = (e: PointerEvent) => {
        if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
        if (pointers.size === 2) {
          const d = pinchDistance()
          if (pinch0 > 0) {
            targetZoom = THREE.MathUtils.clamp(targetZoom * (pinch0 / d), 2.25, 6.4)
            pinch0 = d
            idle = 0
          }
          return
        }
        if (!dragging) return
        targetYaw += (e.clientX - lastX) * 0.008
        targetPitch = THREE.MathUtils.clamp(targetPitch + (e.clientY - lastY) * 0.006, -0.85, 0.95)
        lastX = e.clientX
        lastY = e.clientY
        idle = 0
      }
      const onUp = (e: PointerEvent) => {
        pointers.delete(e.pointerId)
        if (pointers.size < 2) pinch0 = 0
        if (pointers.size === 0) dragging = false
      }
      const onWheel = (e: WheelEvent) => {
        e.preventDefault()
        targetZoom = THREE.MathUtils.clamp(targetZoom + e.deltaY * 0.004, 2.25, 7.4)
        idle = 0
      }
      const onDbl = (e: MouseEvent) => {
        e.preventDefault()
        const hit = pickSpot(e) ?? "dial"
        applyInspect(hit)
        onInspectRef.current?.(hit)
      }

      el.addEventListener("pointerdown", onDown)
      el.addEventListener("pointermove", onMove)
      el.addEventListener("pointerup", onUp)
      el.addEventListener("pointercancel", onUp)
      el.addEventListener("wheel", onWheel, { passive: false })
      el.addEventListener("dblclick", onDbl)
      const ro = new ResizeObserver(size)
      ro.observe(el)

      let lastInspect: InspectSpotId | null = null
      const tick = () => {
        if (dead) return
        const want = inspectRef.current ?? null
        if (want && want !== lastInspect) applyInspect(want)
        lastInspect = want

        idle += 0.0035
        if (!quiet && idle > 1.2 && !dragging && !inspectRef.current) targetYaw += 0.003
        yaw += (targetYaw - yaw) * 0.12
        pitch += (targetPitch - pitch) * 0.12
        zoom += (targetZoom - zoom) * 0.12
        watch.rotation.y = yaw
        watch.rotation.x = pitch
        camera.position.set(0, 0.12, zoom)
        camera.lookAt(0, 0, 0)
        renderer.render(scene, camera)
        const now = performance.now()
        if (now - lastHotspot > 48) {
          lastHotspot = now
          emitHotspots()
        }
      }
      renderer.setAnimationLoop(tick)

      cleanup = () => {
        renderer.setAnimationLoop(null)
        el.removeEventListener("pointerdown", onDown)
        el.removeEventListener("pointermove", onMove)
        el.removeEventListener("pointerup", onUp)
        el.removeEventListener("pointercancel", onUp)
        el.removeEventListener("wheel", onWheel)
        el.removeEventListener("dblclick", onDbl)
        ro.disconnect()
        renderer.dispose()
        tex.dispose()
        renderer.domElement.remove()
      }
      if (dead) cleanup()
    })()

    return () => {
      dead = true
      cleanup?.()
    }
  }, [product.slug, product.design.dial, product.design.dialText, product.design.strap, product.design.strapColor, product.design.caseMetal, product.design.bezel])

  return <div ref={host} className="watch-scene" role="img" aria-label={`${product.name} in three dimensions`} />
}
