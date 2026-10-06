import { useLayoutEffect, useRef } from 'react'
import { BRAND, LOOKBOOK } from '../data/content'
import { useIsMobile } from '../hooks/useMedia'
import { gsap, prefersReduced } from '../lib/scroll'
import { Arrow, InstagramIcon } from './Icons'
import { Accent } from './Logo'

const SIZES = ['h-[62vh] w-[42vh]', 'h-[48vh] w-[64vh]', 'h-[56vh] w-[72vh]', 'h-[44vh] w-[60vh]', 'h-[60vh] w-[86vh]', 'h-[50vh] w-[80vh]']
const OFFSETS = ['self-start mt-[8vh]', 'self-end mb-[10vh]', 'self-center', 'self-start mt-[4vh]', 'self-end mb-[6vh]', 'self-center']

/** Lookbook: scroll horizontal fijado (pin) en escritorio, carrusel táctil en móvil. */
export function Lookbook() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const mobile = useIsMobile()
  // ?captura → sin pin (solo para capturas de página completa)
  const noPin = mobile || (typeof location !== 'undefined' && new URLSearchParams(location.search).has('captura'))

  useLayoutEffect(() => {
    if (noPin || prefersReduced()) return
    const ctx = gsap.context(() => {
      const t = track.current!
      const dist = () => t.scrollWidth - window.innerWidth
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
      })
      // parallax interno de cada foto
      gsap.utils.toArray<HTMLElement>('.lb-img').forEach((img) => {
        gsap.fromTo(img, { xPercent: -10 }, { xPercent: 10, ease: 'none', scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
      })
      gsap.to('.lb-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + dist(), scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [noPin])

  return (
    <section id="lookbook" ref={root} aria-labelledby="lb-title" className="relative overflow-hidden bg-noir md:h-screen">
      <div ref={track} className={`flex h-full items-stretch gap-[6vh] ${mobile ? 'snap-x snap-mandatory scroll-pl-5 overflow-x-auto px-5 py-24 [scrollbar-width:none]' : 'w-max pl-10 pr-[12vw]'}`}>
        {/* portada del capítulo */}
        <div className={`flex shrink-0 flex-col justify-center ${mobile ? 'w-[78vw] snap-start' : 'w-[38vw] pr-[4vw]'}`}>
          <div className="mb-8 flex items-center gap-4">
            <Accent className="w-5 text-marfil" />
            <p className="label text-humo">Lookbook</p>
          </div>
          <h2 id="lb-title" className="display text-[clamp(3.2rem,8vw,8.5rem)]">
            Look<span className="ital text-marfil">book</span>
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-humo">
            Un espacio para mostrar el trabajo real del salón: cortes, color, peinados y manos. Aquí, imágenes referenciales en monocromo.
          </p>
          {!mobile && <p className="label mt-10 flex items-center gap-3 text-white/70">Desliza <Arrow /></p>}
        </div>

        {LOOKBOOK.map((g, i) => (
          <figure key={g.img} className={`relative shrink-0 ${mobile ? 'w-[78vw] snap-start' : `${SIZES[i]} ${OFFSETS[i]}`}`} data-cursor="Ver">
            <div className={`relative overflow-hidden bg-tinta ${mobile ? 'aspect-[4/5]' : 'h-full w-full'}`}>
              <img
                src={`/img/${g.img}-${mobile ? 800 : 1600}.webp`}
                alt={g.alt + ' (imagen referencial)'}
                loading="lazy"
                className="lb-img absolute inset-0 h-full w-full scale-[1.22] object-cover"
              />
            </div>
            <figcaption className="mt-4 flex flex-col gap-1">
              <span className="flex items-baseline gap-3">
                <span className="ital text-marfil">0{i + 1}</span>
                <span className="display text-xl">{g.caption}</span>
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-humo">Imagen referencial · {g.credit} / Unsplash</span>
            </figcaption>
          </figure>
        ))}

        <a
          href={BRAND.instagram}
          target="_blank"
          rel="noopener"
          className={`group flex shrink-0 flex-col items-start justify-center gap-6 border border-linea p-10 transition-colors duration-700 hover:bg-marfil hover:text-noir ${mobile ? 'w-[78vw] snap-start' : 'h-[50vh] w-[46vh] self-center'}`}
          data-cursor="Instagram"
        >
          <InstagramIcon className="h-8 w-8" />
          <span className="display text-3xl">{BRAND.instagramHandle}</span>
          <span className="text-humo group-hover:text-noir/70">{BRAND.instagramFollowers} seguidores · {BRAND.instagramPosts} publicaciones con el trabajo real del salón.</span>
          <span className="label flex items-center gap-2">Ver en Instagram <Arrow /></span>
        </a>
      </div>
      {!mobile && (
        <div className="absolute inset-x-10 bottom-8 h-px bg-linea" aria-hidden="true">
          <div className="lb-progress h-full origin-left scale-x-0 bg-marfil" />
        </div>
      )}
    </section>
  )
}

export default Lookbook
