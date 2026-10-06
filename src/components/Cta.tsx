import { lazy, Suspense, useEffect, useRef } from 'react'
import { BRAND } from '../data/content'
import { useIsMobile, useReducedMotion } from '../hooks/useMedia'
import { InstagramIcon, WhatsAppIcon } from './Icons'
import { Accent } from './Logo'
import { Magnetic } from './Magnetic'
import type { SilkState } from './Silk'

const Silk = lazy(() => import('./Silk'))

/** Cierre: la seda cambia a marfil (el color secreto del logo) y la invitación a reservar. */
export function Cta() {
  const silk = useRef<SilkState>({ scroll: 0.15, hover: 0, mx: 0, my: 0 })
  const root = useRef<HTMLElement>(null)
  const mobile = useIsMobile()
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = root.current!
    const s = silk.current
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      s.mx = ((e.clientX - r.left) / r.width) * 2 - 1
      s.my = -(((e.clientY - r.top) / r.height) * 2 - 1)
      s.hover = 1
    }
    const leave = () => (s.hover = 0.2)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <section id="reservar" ref={root} aria-labelledby="cta-title" className="relative flex min-h-[100svh] items-center overflow-hidden bg-marfil px-5 py-28 text-noir md:px-10">
      <Suspense fallback={null}>
        <Silk state={silk} variant="marfil" mobile={mobile} reduced={reduced} className="absolute inset-0" />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(228,230,201,0.55),transparent_75%)]" />
      <div className="relative mx-auto w-full max-w-[1400px] text-center">
        <Accent className="mx-auto mb-16 w-8 md:mb-20 md:w-12" />
        <h2 id="cta-title" className="display text-[clamp(3.2rem,11vw,11rem)]" data-split>
          Reserva <span className="ital">tu momento</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#3d3d37]" data-fade>
          Escríbenos por WhatsApp, cuéntanos qué te gustaría y te proponemos el horario. De lunes a sábado, de 8:30 a 20:00.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row" data-fade>
          <Magnetic>
            <a href={BRAND.whatsappHref} target="_blank" rel="noopener" className="btn-pill btn-dark !px-10 !py-5" data-cursor="WhatsApp">
              <WhatsAppIcon /> Reservar por WhatsApp
            </a>
          </Magnetic>
          <Magnetic>
            <a href={BRAND.instagram} target="_blank" rel="noopener" className="btn-pill border border-noir/40 !px-8 !py-5 text-noir hover:text-noir">
              <InstagramIcon /> {BRAND.instagramHandle}
            </a>
          </Magnetic>
        </div>
        <p className="mt-6 text-sm text-[#55554e]">o llámanos al <a className="link-u" href={BRAND.phoneHref}>{BRAND.phone}</a></p>
      </div>
    </section>
  )
}

export default Cta
