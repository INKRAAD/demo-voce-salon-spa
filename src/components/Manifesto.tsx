import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReduced, SplitText } from '../lib/scroll'
import { Accent } from './Logo'

const VALUES = [
  { t: 'Manos que se recuerdan', d: 'Nuestras clientas nos nombran en sus reseñas: Hugo, Karin, Athenas, Viviana.' },
  { t: 'Limpio, bonito, organizado', d: 'Así describen el ambiente de VOCÊ en Google. Así lo cuidamos cada día.' },
  { t: 'Descuentos cada día', d: '“Precios cómodos”, dicen. Y una promo distinta de lunes a sábado.' },
]

export function Manifesto() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (prefersReduced()) return
    const ctx = gsap.context(() => {
      const split = SplitText.create('.mf-text', { type: 'words', wordsClass: 'mf-w' })
      gsap.fromTo(split.words, { opacity: 0.12 }, {
        opacity: 1, stagger: 0.08, ease: 'none',
        scrollTrigger: { trigger: '.mf-text', start: 'top 80%', end: 'bottom 45%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} aria-labelledby="mf-title" className="relative bg-noir px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex items-center gap-4 md:mb-20" data-fade>
          <Accent className="w-5 text-marfil" />
          <h2 id="mf-title" className="label text-humo">Manifiesto</h2>
        </div>
        <p className="mf-text text-[clamp(1.85rem,4.6vw,4.6rem)] font-light leading-[1.08] tracking-[-0.01em]">
          <em className="ital text-marfil">Você</em> quiere decir <em className="ital">tú</em>. Por eso aquí el protagonismo tiene nombre propio: el tuyo. Cuidamos cada detalle —el corte, el brillo, las manos— para que salgas sintiéndote <em className="ital text-marfil">tú</em>, en tu mejor versión.
        </p>
        <ul className="mt-20 grid gap-px overflow-hidden border border-linea bg-linea md:mt-28 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <li key={v.t} className="bg-noir p-8 md:p-10" data-fade>
              <span className="ital text-lg text-marfil">0{i + 1}</span>
              <h3 className="mt-6 text-xl font-normal uppercase tracking-[0.08em]">{v.t}</h3>
              <p className="mt-3 leading-relaxed text-humo">{v.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Manifesto
