import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReduced } from '../lib/scroll'
import { CIRC_PATH, VOCE_LETTERS } from '../brand-paths'

/** Loader de marca: las letras se trazan, el acento “aterriza” sobre la E y el telón sube. */
export function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const el = root.current!
    document.documentElement.classList.add('is-loading')
    const finish = () => {
      document.documentElement.classList.remove('is-loading')
      setGone(true)
      onDone()
    }
    if (prefersReduced()) {
      const t = gsap.to(el, { autoAlpha: 0, duration: 0.4, delay: 0.3, onComplete: finish })
      return () => { t.kill() }
    }
    const letters = el.querySelectorAll<SVGPathElement>('.ld-letter')
    letters.forEach((p) => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = `${len}`
      p.style.strokeDashoffset = `${len}`
    })
    const counter = { v: 0 }
    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve()
    const tl = gsap.timeline({ paused: true })
    tl.to(counter, { v: 100, duration: 2.1, ease: 'power2.inOut', onUpdate: () => setCount(Math.round(counter.v)) }, 0)
      .to(letters, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut', stagger: 0.12 }, 0.1)
      .to(letters, { fillOpacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.08 }, 0.95)
      .fromTo('.ld-circ', { y: -60, autoAlpha: 0, rotate: -8, transformOrigin: '50% 100%' }, { y: 0, autoAlpha: 1, rotate: 0, duration: 1.1, ease: 'expo.out' }, 1.25)
      .fromTo('.ld-sub', { autoAlpha: 0, letterSpacing: '0.6em' }, { autoAlpha: 1, letterSpacing: '0.42em', duration: 1, ease: 'power3.out' }, 1.45)
      .to('.ld-inner', { y: -30, autoAlpha: 0, duration: 0.7, ease: 'power3.in' }, 2.45)
      .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut', onStart: () => onDone() }, 2.75)
      .add(() => { document.documentElement.classList.remove('is-loading'); setGone(true) })
    fontsReady.then(() => tl.play())
    return () => { tl.kill() }
  }, [])

  if (gone) return null
  return (
    <div ref={root} role="status" aria-live="polite" aria-label="Cargando VOCÊ Salon & Spa" className="fixed inset-0 z-[90] grid place-items-center bg-noir" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
      <div className="ld-inner flex flex-col items-center gap-6">
        <svg viewBox="64 116 258 112" className="w-[min(62vw,380px)] overflow-visible" aria-hidden="true">
          <LogoLetters />
        </svg>
        <p className="ld-sub label text-marfil" style={{ letterSpacing: '0.42em' }}>Salon &amp; Spa</p>
      </div>
      <p className="label absolute bottom-8 left-1/2 -translate-x-1/2 tabular-nums text-humo">
        {String(count).padStart(3, '0')}
      </p>
    </div>
  )
}

function LogoLetters() {
  // Reutiliza los trazados del logo con trazo para el efecto “dibujo”
  return (
    <>
      {VOCE_LETTERS.map((d, i) => (
        <path key={i} d={d} className="ld-letter" fill="#fff" fillOpacity={0} stroke="#fff" strokeWidth={0.9} />
      ))}
      <path d={CIRC_PATH} className="ld-circ" fill="#fff" />
    </>
  )
}

export default Loader
