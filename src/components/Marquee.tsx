import { useEffect, useRef } from 'react'
import { getLenis, gsap, prefersReduced } from '../lib/scroll'
import { Accent } from './Logo'

const WORDS = ['Corte', 'Peinado', 'Brushing', 'Tratamientos', 'Manicure', 'Pedicure', 'Spa']

/** Cinta tipográfica infinita que se inclina con la velocidad del scroll */
export function Marquee({ light = false }: { light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (prefersReduced()) return
    const el = ref.current!
    const skew = gsap.quickTo(el, 'skewX', { duration: 0.6, ease: 'power3' })
    const tick = () => {
      const v = getLenis()?.velocity ?? 0
      skew(gsap.utils.clamp(-12, 12, -v * 0.35))
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {WORDS.map((w, i) => (
        <span key={w} className="flex items-center">
          <span className={i % 2 ? 'ital px-8 text-[clamp(2.6rem,7vw,6.5rem)]' : 'display px-8 text-[clamp(2.4rem,6.4vw,6rem)] font-light'}>{w}</span>
          <Accent className={`w-8 md:w-12 ${light ? 'text-black/40' : 'text-marfil/70'}`} />
        </span>
      ))}
    </div>
  )
  return (
    <div className={`relative overflow-hidden border-y py-6 md:py-9 ${light ? 'border-black/15 bg-marfil text-black' : 'border-linea bg-noir text-white'}`}>
      <p className="sr-only">Servicios: {WORDS.join(', ')}</p>
      <div ref={ref} className="will-change-transform">
        <div className="marquee-track">
          {row}
          {row}
        </div>
      </div>
    </div>
  )
}
