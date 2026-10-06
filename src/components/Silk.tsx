import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * Seda líquida — concepto 3D de la marca.
 * Un lienzo de tela (plano muy subdividido) se pliega en el vertex shader con ondas
 * domain-warped; el fragment shader imita el satén: brillo ancho + brillo nítido + fresnel.
 * El puntero deja una onda en la tela (como pasar la mano por el cabello recién peinado).
 */

export type SilkState = { scroll: number; hover: number; mx: number; my: number }

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uScroll;
  uniform float uAmp;
  varying vec3 vN;
  varying vec3 vWP;
  varying vec2 vUv;

  float hgt(vec2 p) {
    float t = uTime;
    vec2 q = p;
    q.x += 0.38 * sin(q.y * 0.85 + t * 0.21);
    q.y += 0.26 * sin(q.x * 0.70 - t * 0.17);
    float f = 0.0;
    f += 0.30 * sin(q.x * 1.30 + q.y * 0.45 + t * 0.33);
    f += 0.17 * sin(-q.x * 0.62 + q.y * 1.85 - t * 0.27 + 1.3);
    f += 0.085 * sin(q.x * 2.85 + q.y * 1.15 + t * 0.52 + 2.1);
    f += 0.035 * sin(q.x * 5.20 - q.y * 3.60 + t * 0.71);
    float d = length(p - uMouse);
    f += uHover * 0.20 * exp(-d * d * 1.6) * sin(d * 5.5 - t * 1.8);
    return f * uAmp * (1.0 + uScroll * 0.9);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float e = 0.015;
    float h = hgt(pos.xy);
    float hx = hgt(pos.xy + vec2(e, 0.0));
    float hy = hgt(pos.xy + vec2(0.0, e));
    vec3 n = normalize(vec3(-(hx - h) / e, -(hy - h) / e, 1.0));
    pos.z += h;
    vec4 wp = modelMatrix * vec4(pos, 1.0);
    vWP = wp.xyz;
    vN = normalize(mat3(modelMatrix) * n);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const fragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uShadow;
  uniform vec3 uSheen;
  uniform vec3 uSpec;
  uniform float uTime;
  uniform float uFade;
  uniform vec2 uRes;
  varying vec3 vN;
  varying vec3 vWP;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

  void main() {
    vec3 N = normalize(vN);
    vec3 V = normalize(cameraPosition - vWP);
    vec3 L1 = normalize(vec3(-0.55, 0.85, 0.75));
    vec3 L2 = normalize(vec3(0.9, -0.25, 0.45));
    vec3 H1 = normalize(L1 + V);
    vec3 H2 = normalize(L2 + V);
    float ndl = max(dot(N, L1), 0.0);
    float nh1 = max(dot(N, H1), 0.0);
    float broad = pow(nh1, 22.0);
    float crisp = pow(nh1, 150.0);
    float rim = pow(max(dot(N, H2), 0.0), 48.0);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);

    vec3 col = mix(uShadow, uBase, smoothstep(0.0, 1.0, ndl));
    col += uSheen * (broad * 0.6 + fres * 0.28);
    col += uSpec * (crisp * 0.62 + rim * 0.2);

    // viñeta editorial
    vec2 sc = gl_FragCoord.xy / uRes;
    float vig = smoothstep(1.15, 0.35, length(sc - 0.5) * 1.35);
    col *= mix(0.55, 1.0, vig);
    // grano fino
    col += (hash(gl_FragCoord.xy + fract(uTime * 7.0) * 91.7) - 0.5) * 0.035;
    gl_FragColor = vec4(col * uFade, 1.0);
  }
`

const VARIANTS = {
  noir: { base: [0.085, 0.085, 0.08], shadow: [0.003, 0.003, 0.003], sheen: [0.7, 0.7, 0.66], spec: [1, 1, 0.97], amp: 1.18, fade: 1 },
  marfil: { base: [0.9, 0.91, 0.8], shadow: [0.5, 0.5, 0.42], sheen: [0.3, 0.3, 0.27], spec: [0.55, 0.55, 0.5], amp: 0.85, fade: 1 },
} as const

const col = (a: readonly number[]) => new THREE.Color(a[0], a[1], a[2])

function SilkMesh({ state, variant, segments, reduced }: { state: React.RefObject<SilkState>; variant: keyof typeof VARIANTS; segments: [number, number]; reduced: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const { size, viewport } = useThree()
  const v = VARIANTS[variant]
  const uniforms = useMemo(
    () => ({
      uTime: { value: 12.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0 },
      uScroll: { value: 0 },
      uAmp: { value: v.amp },
      uFade: { value: v.fade },
      uRes: { value: new THREE.Vector2(1, 1) },
      uBase: { value: col(v.base) },
      uShadow: { value: col(v.shadow) },
      uSheen: { value: col(v.sheen) },
      uSpec: { value: col(v.spec) },
    }),
    [v],
  )
  const smooth = useRef({ mx: 0, my: 0, hover: 0, scroll: 0 })

  useFrame((_, dt) => {
    const m = mat.current
    if (!m) return
    const s = state.current
    const k = 1 - Math.pow(0.0015, Math.min(dt, 0.05)) // amortiguación independiente del fps
    const sm = smooth.current
    sm.mx += (s.mx - sm.mx) * k * 0.5
    sm.my += (s.my - sm.my) * k * 0.5
    sm.hover += (s.hover - sm.hover) * k * 0.35
    sm.scroll += (s.scroll - sm.scroll) * k
    if (!reduced) m.uniforms.uTime.value += Math.min(dt, 0.05) * (0.9 + sm.scroll * 0.6)
    m.uniforms.uMouse.value.set(sm.mx * viewport.width * 0.55, sm.my * viewport.height * 0.7)
    m.uniforms.uHover.value = sm.hover
    m.uniforms.uScroll.value = sm.scroll
    m.uniforms.uRes.value.set(size.width * viewport.dpr, size.height * viewport.dpr)
  })

  // tamaño del lienzo: cubre siempre el viewport aunque esté inclinado
  const w = Math.max(viewport.width * 1.6, 6)
  const h = Math.max(viewport.height * 1.9, 5)
  return (
    <mesh rotation={[-0.42, 0.04, 0.18]} position={[0, 0.1, 0]}>
      <planeGeometry args={[w, h, segments[0], segments[1]]} />
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  )
}

let webglOk: boolean | null = null
/** Detecta WebGL una sola vez y libera el contexto de prueba */
function hasWebGL() {
  if (webglOk !== null) return webglOk
  try {
    const c = document.createElement('canvas')
    const gl = (c.getContext('webgl2') || c.getContext('webgl')) as WebGLRenderingContext | null
    webglOk = !!gl
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    webglOk = false
  }
  return webglOk
}

type Props = {
  state: React.RefObject<SilkState>
  variant?: keyof typeof VARIANTS
  mobile: boolean
  reduced: boolean
  className?: string
}

export default function Silk({ state, variant = 'noir', mobile, reduced, className }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [dpr, setDpr] = useState<number>(mobile ? 1.25 : 1.5)
  const [ok] = useState(hasWebGL)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const fallback =
    variant === 'noir'
      ? 'radial-gradient(120% 80% at 30% 20%, #2a2a27 0%, #0b0b0a 45%, #000 75%)'
      : 'radial-gradient(120% 80% at 30% 20%, #fbfbf0 0%, #e4e6c9 45%, #b9bba2 100%)'

  return (
    <div ref={wrap} className={className} style={{ background: fallback }} aria-hidden="true">
      {ok && (
        <Canvas
          dpr={[1, dpr]}
          frameloop={reduced ? 'demand' : visible ? 'always' : 'never'}
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance', stencil: false, depth: true }}
          camera={{ fov: 35, position: [0, 0, 4.2], near: 0.1, far: 30 }}
          style={{ pointerEvents: 'none' }}
        >
          <PerformanceMonitor onDecline={() => setDpr(1)} />
          <SilkMesh state={state} variant={variant} segments={mobile ? [110, 90] : [240, 180]} reduced={reduced} />
        </Canvas>
      )}
    </div>
  )
}
