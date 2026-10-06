import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/scroll'
import { Accent } from './Logo'

/**
 * Cursor de marca: punto + anillo. Sobre elementos interactivos el anillo crece y el
 * circunflejo “cae” sobre el punto: el acento se posa donde tú miras.
 * data-cursor="Texto" muestra una etiqueta dentro del anillo.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [active, setActive] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('has-cursor')
    const xd = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
    const yd = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })
    const xr = gsap.quickTo(ring.current, 'x', { duration: 0.55, ease: 'power3' })
    const yr = gsap.quickTo(ring.current, 'y', { duration: 0.55, ease: 'power3' })
    let shown = false
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (!shown) {
        shown = true
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.4 })
      }
      xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY)
      const t = (e.target as HTMLElement | null)?.closest?.('a, button, [data-cursor], summary, iframe') as HTMLElement | null
      setActive(!!t)
      setLabel(t?.dataset.cursor ?? '')
    }
    const leave = () => { shown = false; gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 }) }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <>
      <div ref={ring} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[95] opacity-0 mix-blend-difference">
        <div
          className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 transition-[width,height,background-color] duration-500 ease-[var(--ease-silk)]"
          style={{ width: label ? 92 : active ? 58 : 34, height: label ? 92 : active ? 58 : 34, backgroundColor: label ? '#fff' : 'transparent' }}
        >
          <span className="label text-[0.6rem] tracking-[0.2em] text-black" style={{ opacity: label ? 1 : 0, transition: 'opacity .3s' }}>{label}</span>
        </div>
      </div>
      <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[96] opacity-0 mix-blend-difference">
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="h-[5px] w-[5px] rounded-full bg-white" style={{ opacity: label ? 0 : 1 }} />
          {/* el acento aparece y se posa sobre el punto al pasar por un enlace */}
          <Accent className="absolute left-1/2 top-0 w-3 text-white opacity-0" />
        </div>
      </div>
      <AccentState active={active && !label} dot={dot} />
    </>
  )
}

/** controla el circunflejo del cursor sin re-render del puntero */
function AccentState({ active, dot }: { active: boolean; dot: React.RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const acc = dot.current?.querySelector('svg')
    if (!acc) return
    gsap.to(acc, { xPercent: -50, y: active ? -13 : -30, autoAlpha: active ? 1 : 0, duration: 0.6, ease: 'expo.out' })
  }, [active, dot])
  return null
}

export default Cursor
