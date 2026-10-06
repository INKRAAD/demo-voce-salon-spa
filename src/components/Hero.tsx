import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { BRAND } from '../data/content'
import { useIsMobile, useReducedMotion } from '../hooks/useMedia'
import { gsap, scrollToHash } from '../lib/scroll'
import { Star, WhatsAppIcon } from './Icons'
import { Logo } from './Logo'
import { Magnetic } from './Magnetic'
import type { SilkState } from './Silk'

const Silk = lazy(() => import('./Silk'))

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const silk = useRef<SilkState>({ scroll: 0, hover: 0, mx: 0, my: 0 })
  const mobile = useIsMobile()
  const reduced = useReducedMotion()

  // Puntero → onda en la seda
  useEffect(() => {
    const s = silk.current
    let idle: number | undefined
    const move = (e: PointerEvent) => {
      s.mx = (e.clientX / window.innerWidth) * 2 - 1
      s.my = -((e.clientY / window.innerHeight) * 2 - 1)
      s.hover = 1
      window.clearTimeout(idle)
      idle = window.setTimeout(() => (s.hover = 0.35), 1600)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  // Estado inicial (antes de que termine el loader)
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.set('.hero-letter', { yPercent: 115 })
      gsap.set('.hero-circ', { y: -90, autoAlpha: 0 })
      gsap.set('.hero-sub', { autoAlpha: 0, y: 12 })
      gsap.set('.hero-fade', { autoAlpha: 0, y: 24 })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  // Entrada cinética + salida con scroll
  useEffect(() => {
    if (!ready || reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.to('.hero-letter', { yPercent: 0, duration: 1.8, stagger: 0.09 }, 0.15)
        .to('.hero-circ', { y: 0, autoAlpha: 1, duration: 1.6 }, 0.95)
        .to('.hero-sub', { autoAlpha: 1, y: 0, duration: 1.4 }, 1.15)
        .to('.hero-fade', { autoAlpha: 1, y: 0, duration: 1.4, stagger: 0.08 }, 1.2)

      // salida: las letras se abren como una tela, el acento se eleva
      const out = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.8, onUpdate: (st) => (silk.current.scroll = st.progress) },
      })
      const spread = [-0.09, -0.03, 0.03, 0.09]
      document.querySelectorAll<SVGPathElement>('.hero-letter').forEach((el, i) => {
        out.to(el, { xPercent: spread[i] * 900, ease: 'none' }, 0)
      })
      out.to('.hero-circ', { y: -60, rotate: 6, transformOrigin: '50% 100%', ease: 'none' }, 0)
        .to('.hero-mark', { scale: 0.92, autoAlpha: 0.15, ease: 'none' }, 0)
        .to('.hero-tag', { yPercent: -60, autoAlpha: 0, ease: 'none' }, 0)
        .to('.hero-bottom', { y: -80, autoAlpha: 0, ease: 'none' }, 0)
    }, root)
    return () => ctx.revert()
  }, [ready, reduced])

  return (
    <section id="inicio" ref={root} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-noir" aria-labelledby="hero-title">
      <Suspense fallback={<div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_20%,#2a2a27_0%,#0b0b0a_45%,#000_75%)]" />}>
        <Silk state={silk} mobile={mobile} reduced={reduced} className="absolute inset-0" />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_45%,rgba(0,0,0,0.55),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black" />

      <h1 id="hero-title" className="sr-only">
        VOCÊ Salon &amp; Spa — salón de belleza y spa en Santiago de Surco, Lima
      </h1>

      {/* línea de portada de revista */}
      <div className="hero-fade absolute inset-x-0 top-[88px] mx-auto flex max-w-[1600px] justify-between px-5 [text-shadow:0_1px_14px_rgba(0,0,0,0.9)] md:top-[110px] md:px-10">
        <p className="label text-humo">Edición Surco <span className="text-marfil">·</span> Nº 01</p>
        <p className="label hidden text-humo sm:block">Av. Benavides 4827 <span className="text-marfil">·</span> Lima</p>
      </div>

      {/* masthead: el logo oficial, gigante */}
      <div className="absolute left-1/2 top-[38%] w-[min(90vw,620px)] -translate-x-1/2 -translate-y-1/2 md:top-[45%] md:w-[min(66vw,96vh)]">
        <div className="hero-mark">
          <Logo className="w-full drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]" letterClass="hero-letter" circClass="hero-circ" subClass="hero-sub" />
        </div>
      </div>

      <p className="hero-tag hero-fade absolute inset-x-0 top-[60%] text-center text-[2rem] leading-[1.05] md:hidden">
        <span className="ital">El acento</span> <span className="ital text-marfil">eres tú.</span>
      </p>

      <div className="hero-bottom absolute inset-x-0 bottom-0 mx-auto flex max-w-[1600px] flex-col gap-6 px-5 pb-8 md:flex-row md:items-end md:justify-between md:px-10 md:pb-10">
        <div className="hero-fade hidden max-w-md md:block">
          <p className="text-[clamp(2.2rem,3.6vw,3.6rem)] leading-[0.95]">
            <span className="ital">El acento</span>
            <br />
            <span className="ital text-marfil">eres tú.</span>
          </p>
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-humo">
            Corte, peinado, brushing, tratamientos, manicure, pedicure y spa en el corazón de Santiago de Surco.
          </p>
        </div>

        <div className="hero-fade flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:flex-col md:items-end">
          <a href={BRAND.mapsHref} target="_blank" rel="noopener" className="group flex items-center justify-center gap-3 md:justify-end" aria-label={`Calificación ${BRAND.rating} de 5 con ${BRAND.reviews} reseñas en Google`}>
            <span className="ital text-3xl leading-none">4,9</span>
            <span className="flex text-marfil">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-3.5 w-3.5" />)}</span>
            <span className="label text-humo group-hover:text-white">{BRAND.reviews} reseñas Google</span>
          </a>
          <div className="flex gap-3">
            <Magnetic className="flex-1 sm:flex-none">
              <a href={BRAND.whatsappHref} target="_blank" rel="noopener" className="btn-pill btn-light w-full justify-center" data-cursor="WhatsApp">
                <WhatsAppIcon /> Reservar
              </a>
            </Magnetic>
            <Magnetic className="flex-1 sm:flex-none">
              <a href="#servicios" onClick={(e) => { e.preventDefault(); scrollToHash('#servicios') }} className="btn-pill btn-ghost w-full justify-center">
                Servicios
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* indicador de scroll: el circunflejo invertido */}
      <div className="hero-fade pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex" aria-hidden="true">
        <span className="label text-[0.6rem] text-humo">Desliza</span>
        <span className="block h-10 w-px origin-top animate-[scrolline_2.4s_var(--ease-drape)_infinite] bg-gradient-to-b from-marfil to-transparent" />
      </div>
      <style>{`@keyframes scrolline{0%{transform:scaleY(0)}50%{transform:scaleY(1)}100%{transform:scaleY(1);opacity:0}}`}</style>
    </section>
  )
}

export default Hero
