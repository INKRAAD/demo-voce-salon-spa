import { useEffect, useState } from 'react'
import { DAILY_PROMOS, limaNow } from '../data/content'
import { Accent } from './Logo'

/**
 * “Descuentos cada día” es REAL (reseña de Google, dic-2025).
 * El detalle por día es CONTENIDO DE EJEMPLO para mostrar cómo se publicaría.
 */
export function Promos() {
  const [today, setToday] = useState<number>(-1)
  useEffect(() => setToday(limaNow().idx), [])

  return (
    <section aria-labelledby="promo-title" className="relative overflow-hidden bg-blanc px-5 py-24 text-noir md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-8 flex items-center gap-4" data-fade>
              <Accent className="w-5" />
              <p className="label text-[#55554e]">Promos</p>
            </div>
            <h2 id="promo-title" className="display text-[clamp(2.8rem,6.5vw,6rem)]" data-split>
              Cada día, <span className="ital">un descuento</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#55554e]" data-fade>
              “Precios cómodos (tienen descuentos cada día)”, cuenta una clienta en Google. Así podría verse la promo del día en la web.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 border border-noir/20 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[#55554e]" data-fade>
              <span className="h-1.5 w-1.5 rounded-full bg-noir" /> Promos de ejemplo · por confirmar con VOCÊ
            </p>
          </div>
          <ol className="grid grid-cols-2 gap-px self-end border border-noir/15 bg-noir/15 sm:grid-cols-3 md:col-span-7">
            {DAILY_PROMOS.map((p, i) => {
              const isToday = today === i + 1
              return (
                <li
                  key={p.day}
                  data-fade
                  className={`group relative flex aspect-[5/4] flex-col justify-between p-5 transition-colors duration-700 md:p-7 ${isToday ? 'bg-noir text-blanc' : 'bg-blanc hover:bg-marfil'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="label">{p.day}</span>
                    {isToday && <span className="label text-marfil">Hoy</span>}
                  </div>
                  <div>
                    <span className={`label block text-[0.6rem] ${isToday ? 'text-humo' : 'text-[#55554e]'}`}>Ejemplo</span>
                    <span className="ital mt-1 block text-[clamp(1.4rem,2.4vw,2.2rem)] leading-none">{p.promo}</span>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
        <p className="mt-6 text-right text-sm text-[#55554e]" data-fade>Domingo: cerrado.</p>
      </div>
    </section>
  )
}

export default Promos
