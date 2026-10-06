import { BRAND } from '../data/content'
import { Accent } from './Logo'

const STATS = [
  { v: '4,9★', l: 'Calificación en Google' },
  { v: String(BRAND.reviews), l: 'Reseñas en Google' },
  { v: BRAND.instagramFollowers, l: 'Seguidores en Instagram' },
  { v: BRAND.instagramPosts, l: 'Publicaciones de trabajos' },
]

export function About() {
  return (
    <section id="la-casa" aria-labelledby="about-title" className="relative bg-noir px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-12 md:gap-10">
        <div className="relative md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden" data-clip>
            <img data-parallax src="/img/tocador-1600.webp" alt="Interior de un salón con espejo y sillones, en blanco y negro (imagen referencial)" loading="lazy" className="absolute inset-0 h-[118%] w-full object-cover" />
          </div>
          <div className="absolute -bottom-10 -right-4 hidden w-[46%] overflow-hidden border-8 border-noir md:block" data-clip>
            <div className="relative aspect-square">
              <img data-parallax src="/img/salon-800.webp" alt="Sillones de un salón de belleza, en blanco y negro (imagen referencial)" loading="lazy" className="absolute inset-0 h-[118%] w-full object-cover" />
            </div>
          </div>
          <p className="mt-4 text-[0.7rem] uppercase tracking-[0.18em] text-humo">Imágenes referenciales · Giorgio Trovato y Matt Connor / Unsplash</p>
        </div>

        <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <div className="mb-8 flex items-center gap-4" data-fade>
            <Accent className="w-5 text-marfil" />
            <p className="label text-humo">La casa</p>
          </div>
          <h2 id="about-title" className="display text-[clamp(2.8rem,6vw,5.6rem)]" data-split>
            En plena <span className="ital text-marfil">Benavides</span>
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/80" data-fade>
            <p>
              VOCÊ es un salón de belleza y spa en la Av. Alfredo Benavides, en Santiago de Surco. Un lugar al que se vuelve: muy concurrido, con un equipo que las clientas reconocen por su nombre y un ambiente que describen como “limpio, bonito”.
            </p>
            <p className="text-humo">
              Hasta hoy, toda su historia se cuenta en Instagram. Esta web le da un hogar propio: servicios, equipo, reseñas y reservas en un solo lugar.
            </p>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-px border border-linea bg-linea">
            {STATS.map((s) => (
              <div key={s.l} className="flex flex-col-reverse bg-noir p-6" data-fade>
                <dt className="label mt-2 text-[0.6rem] text-humo">{s.l}</dt>
                <dd className="font-serif text-4xl md:text-5xl">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default About
