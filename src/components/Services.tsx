import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { SERVICES, waLink } from '../data/content'
import { useFinePointer } from '../hooks/useMedia'
import { gsap } from '../lib/scroll'
import { Arrow, WhatsAppIcon } from './Icons'
import { Accent } from './Logo'

const img = (k: string, w = 800) => `/img/${k}-${w}.webp`

/** “El menú”: índice editorial. En escritorio, una imagen flotante sigue al cursor. */
export function Services() {
  const [active, setActive] = useState<number | null>(null)
  const [open, setOpen] = useState<number | null>(null)
  const fine = useFinePointer()
  const float = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!fine || !float.current) return
    const xTo = gsap.quickTo(float.current, 'x', { duration: 0.8, ease: 'power3' })
    const yTo = gsap.quickTo(float.current, 'y', { duration: 0.8, ease: 'power3' })
    const rTo = gsap.quickTo(float.current, 'rotate', { duration: 1.2, ease: 'power3' })
    let lx = 0
    const move = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      rTo(gsap.utils.clamp(-8, 8, (e.clientX - lx) * 0.4))
      lx = e.clientX
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [fine])

  return (
    <section id="servicios" aria-labelledby="srv-title" className="relative bg-noir px-5 pb-28 pt-24 md:px-10 md:pb-40 md:pt-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="mb-8 flex items-center gap-4" data-fade>
              <Accent className="w-5 text-marfil" />
              <p className="label text-humo">Servicios</p>
            </div>
            <h2 id="srv-title" className="display text-[clamp(3.4rem,10vw,9.5rem)]" data-split>
              El <span className="ital text-marfil">menú</span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-humo md:col-span-5 md:justify-self-end" data-fade>
            Cabello, manos y pausa. Todo lo que las clientas de VOCÊ destacan, en un solo lugar de la Av. Benavides.
          </p>
        </div>

        <ul ref={list} className="mt-16 border-t border-linea md:mt-24" onPointerLeave={() => setActive(null)}>
          {SERVICES.map((s, i) => {
            const isOpen = open === i
            return (
              <li key={s.n} className="group relative border-b border-linea" onPointerEnter={() => fine && setActive(i)} data-fade>
                <h3>
                  <button
                    type="button"
                    className="relative flex w-full items-center gap-5 py-7 text-left md:gap-10 md:py-9"
                    aria-expanded={isOpen}
                    aria-controls={`srv-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onFocus={() => fine && setActive(i)}
                    data-cursor={isOpen ? 'Cerrar' : 'Abrir'}
                  >
                    <span className="ital w-10 shrink-0 text-lg text-humo transition-colors duration-500 group-hover:text-marfil md:w-16 md:text-2xl">{s.n}</span>
                    <span className="flex flex-1 flex-wrap items-baseline gap-x-5 transition-transform duration-700 ease-[var(--ease-silk)] md:group-hover:translate-x-6">
                      <span className="display text-[clamp(2rem,5.4vw,4.8rem)] font-light">{s.title}</span>
                      <span className="ital text-[clamp(1.1rem,2.2vw,2rem)] text-humo transition-colors duration-500 group-hover:text-marfil">{s.italic}</span>
                    </span>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 transition-transform duration-700 ease-[var(--ease-silk)] ${isOpen ? 'rotate-45 bg-white text-black' : ''}`} aria-hidden="true">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M8 2v12M2 8h12" /></svg>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`srv-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-10 pl-[3.75rem] md:grid-cols-12 md:pl-[6.5rem]">
                        <img src={img(s.img)} alt={s.alt} loading="lazy" className="aspect-[16/10] w-full object-cover md:hidden" />
                        <p className="max-w-xl text-lg leading-relaxed text-white/85 md:col-span-6">{s.desc}</p>
                        <div className="flex flex-col gap-3 md:col-span-6 md:items-end">
                          <p className="label text-humo">Precio: a consultar</p>
                          <a href={waLink(`Hola VOCÊ, quisiera consultar precio y disponibilidad de: ${s.title}.`)} target="_blank" rel="noopener" className="label link-u inline-flex items-center gap-2 pb-1 text-marfil">
                            <WhatsAppIcon className="h-3.5 w-3.5" /> Consultar por WhatsApp <Arrow className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-humo" data-fade>
          VOCÊ no publica precios: se cotizan por WhatsApp según el servicio. Las clientas destacan sus “precios cómodos” y los descuentos de cada día.
        </p>
      </div>

      {/* imagen flotante (solo puntero fino) */}
      {fine && (
        <div ref={float} className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block" aria-hidden="true">
          <div
            className="relative -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-[clip-path,opacity] duration-700 ease-[var(--ease-silk)]"
            style={{ width: 'min(26vw, 380px)', aspectRatio: '4/5', clipPath: active === null ? 'inset(50% 50% 50% 50%)' : 'inset(0% 0% 0% 0%)', opacity: active === null ? 0 : 1 }}
          >
            {SERVICES.map((s, i) => (
              <img
                key={s.n}
                src={img(s.img)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-silk)]"
                style={{ opacity: active === i ? 1 : 0, transform: active === i ? 'scale(1)' : 'scale(1.15)' }}
              />
            ))}
            <span className="label absolute bottom-3 left-3 text-[0.55rem] text-white/80 mix-blend-difference">Imagen referencial</span>
          </div>
        </div>
      )}
    </section>
  )
}

export default Services
