import { useEffect, useState } from 'react'
import { BRAND, HOURS, limaNow, PEAKS } from '../data/content'
import { Arrow } from './Icons'
import { Accent } from './Logo'
import { Magnetic } from './Magnetic'

export function Visit() {
  const [now, setNow] = useState<{ idx: number; open: boolean } | null>(null)
  const [mapOn, setMapOn] = useState(false)
  useEffect(() => {
    setNow(limaNow())
    const t = setInterval(() => setNow(limaNow()), 60000)
    return () => clearInterval(t)
  }, [])
  // orden lunes → domingo
  const week = [...HOURS.slice(1), HOURS[0]]

  return (
    <section id="visitanos" aria-labelledby="visit-title" className="relative bg-noir px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-center gap-4" data-fade>
          <Accent className="w-5 text-marfil" />
          <p className="label text-humo">Visítanos</p>
        </div>
        <h2 id="visit-title" className="display text-[clamp(3rem,8vw,8rem)]" data-split>
          Te <span className="ital text-marfil">esperamos</span>
        </h2>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-12">
          <div className="relative min-h-[380px] overflow-hidden border border-linea bg-tinta md:col-span-7 md:min-h-[560px]" data-clip>
            {mapOn ? (
              <iframe
                title="Mapa: VOCÊ Salon & Spa, Av. Alfredo Benavides 4827, Santiago de Surco"
                src={BRAND.mapsEmbed}
                className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <button type="button" onClick={() => setMapOn(true)} className="group absolute inset-0 flex flex-col items-center justify-center gap-6" data-cursor="Mapa">
                {/* mapa abstracto: calles en líneas finas */}
                <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <g stroke="#6a6a61" strokeWidth="1" fill="none">
                    <path d="M-20 250 L640 170" strokeWidth="6" stroke="#3a3a35" />
                    <path d="M120 -10 L180 420M300 -10 L330 420M460 -10 L470 420M-10 90 L620 60M-10 340 L620 300" />
                    <path d="M40 -10 L90 420M230 -10 L250 420M390 -10 L400 420M540 -10 L560 420M-10 30 L620 0M-10 140 L620 110M-10 400 L620 360" strokeWidth="0.5" />
                  </g>
                  <text x="40" y="236" fill="#a3a39a" fontSize="11" letterSpacing="3" transform="rotate(-7 40 236)">AV. ALFREDO BENAVIDES</text>
                </svg>
                <span className="relative grid h-16 w-16 place-items-center rounded-full bg-marfil text-noir shadow-[0_0_0_12px_rgba(228,230,201,0.12)] transition-transform duration-700 group-hover:scale-110">
                  <Accent className="w-6" />
                </span>
                <span className="label relative text-white">Cargar mapa interactivo</span>
                <span className="relative text-xs text-humo">(Google Maps)</span>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-10 md:col-span-5">
            <div data-fade>
              <p className="label text-humo">Dirección</p>
              <address className="mt-3 text-2xl not-italic leading-snug">
                {BRAND.address}
                <br />
                <span className="text-humo">{BRAND.district}</span>
              </address>
            </div>

            <div data-fade>
              <div className="flex items-center justify-between">
                <p className="label text-humo">Horario</p>
                {now && (
                  <p className="label flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${now.open ? 'bg-marfil shadow-[0_0_0_4px_rgba(228,230,201,0.2)]' : 'bg-grafito'}`} />
                    {now.open ? 'Abierto ahora' : 'Cerrado ahora'}
                  </p>
                )}
              </div>
              <table className="mt-4 w-full text-left">
                <caption className="sr-only">Horario de atención</caption>
                <tbody>
                  {week.map((d) => {
                    const today = now && HOURS[now.idx].day === d.day
                    return (
                      <tr key={d.day} className={`border-b border-linea ${today ? 'text-marfil' : ''}`}>
                        <th scope="row" className="py-2.5 font-normal">
                          {d.day} {today && <span className="label ml-2 text-[0.55rem]">Hoy</span>}
                        </th>
                        <td className={`py-2.5 text-right tabular-nums ${d.open ? '' : 'text-humo'}`}>{d.open ? `${d.open} – ${d.close}` : 'Cerrado'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <p className="mt-4 text-sm text-humo">{PEAKS}</p>
            </div>

            <div className="flex flex-wrap gap-3" data-fade>
              <Magnetic>
                <a href={BRAND.mapsHref} target="_blank" rel="noopener" className="btn-pill btn-light">
                  Cómo llegar <Arrow />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={BRAND.phoneHref} className="btn-pill btn-ghost">
                  {BRAND.phone}
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Visit
