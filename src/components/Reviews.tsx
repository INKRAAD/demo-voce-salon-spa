import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BRAND, REVIEWS } from '../data/content'
import { useReducedMotion } from '../hooks/useMedia'
import { gsap, prefersReduced } from '../lib/scroll'
import { Arrow, Star } from './Icons'
import { Accent } from './Logo'

export function Reviews() {
  const root = useRef<HTMLElement>(null)
  const num = useRef<HTMLSpanElement>(null)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (prefersReduced()) return
    const ctx = gsap.context(() => {
      const o = { v: 0 }
      gsap.to(o, {
        v: BRAND.rating, duration: 2.2, ease: 'power3.out',
        scrollTrigger: { trigger: num.current, start: 'top 85%', once: true },
        onUpdate: () => { if (num.current) num.current.textContent = o.v.toFixed(1).replace('.', ',') },
      })
      gsap.from('.rv-star', { scale: 0, rotate: -90, stagger: 0.08, duration: 1, ease: 'back.out(2)', scrollTrigger: { trigger: '.rv-stars', start: 'top 85%', once: true } })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (paused || reduced) return
    const t = setInterval(() => setI((v) => (v + 1) % REVIEWS.length), 7000)
    return () => clearInterval(t)
  }, [paused, reduced])

  const r = REVIEWS[i]
  return (
    <section id="resenas" ref={root} aria-labelledby="rv-title" className="relative overflow-hidden bg-noir px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="mb-8 flex items-center gap-4" data-fade>
            <Accent className="w-5 text-marfil" />
            <h2 id="rv-title" className="label text-humo">Reseñas de Google</h2>
          </div>
          <p className="flex items-start leading-[0.8]" aria-label={`${BRAND.rating} de 5 estrellas`}>
            <span ref={num} className="font-serif text-[clamp(8rem,22vw,19rem)] font-normal tracking-[-0.04em]">4,9</span>
          </p>
          <div className="rv-stars mt-6 flex gap-1.5 text-marfil" aria-hidden="true">
            {Array.from({ length: 5 }, (_, k) => <Star key={k} className="rv-star h-6 w-6" />)}
          </div>
          <p className="mt-6 text-lg text-humo">
            <span className="text-white">{BRAND.reviews} reseñas</span> en Google Maps
          </p>
          <a href={BRAND.mapsHref} target="_blank" rel="noopener" className="label link-u mt-8 inline-flex items-center gap-2 pb-1 text-marfil">
            Ver en Google <Arrow className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="flex flex-col justify-between md:col-span-7 md:pl-10" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
          <span aria-hidden="true" className="font-serif text-[9rem] leading-[0.6] text-marfil/60">“</span>
          <div className="relative min-h-[320px] md:min-h-[300px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="ital text-[clamp(1.6rem,3.2vw,2.9rem)] leading-[1.18]">{r.text}</blockquote>
                <figcaption className="mt-8 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-humo">
                  <span className="flex text-marfil" aria-hidden="true">{Array.from({ length: 5 }, (_, k) => <Star key={k} className="h-3 w-3" />)}</span>
                  {r.meta}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-linea pt-6">
            <p className="label tabular-nums text-humo">
              0{i + 1} <span className="text-humo/80">/ 0{REVIEWS.length}</span>
            </p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setI((v) => (v - 1 + REVIEWS.length) % REVIEWS.length)} aria-label="Reseña anterior" className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-black">
                <Arrow className="h-4 w-4 rotate-180" />
              </button>
              <button type="button" onClick={() => setI((v) => (v + 1) % REVIEWS.length)} aria-label="Reseña siguiente" className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-black">
                <Arrow className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews
