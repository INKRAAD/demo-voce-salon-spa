import { TEAM } from '../data/content'
import { Accent } from './Logo'

/** Equipo: nombres reales citados en reseñas de Google. Sin fotos reales → retrato tipográfico. */
export function Team() {
  return (
    <section id="equipo" aria-labelledby="team-title" className="relative bg-noir px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="mb-8 flex items-center gap-4" data-fade>
              <Accent className="w-5 text-marfil" />
              <p className="label text-humo">Equipo</p>
            </div>
            <h2 id="team-title" className="display text-[clamp(3rem,8.4vw,8rem)]" data-split>
              Las manos <span className="ital text-marfil">de VOCÊ</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-humo md:col-span-4 md:justify-self-end" data-fade>
            Nombres que se repiten en las reseñas. Porque en VOCÊ te atiende alguien, no “alguien del salón”.
          </p>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <li key={m.name} data-fade className="group relative flex min-h-[440px] flex-col justify-between overflow-hidden border border-linea bg-tinta p-7 transition-colors duration-700 hover:border-marfil/50 md:min-h-[520px]">
              <div className="flex items-center justify-between">
                <span className="label text-humo">0{i + 1}</span>
                <span className="label text-[0.55rem] text-humo">Foto por confirmar</span>
              </div>
              <span
                aria-hidden="true"
                className="ital pointer-events-none absolute right-6 top-10 select-none text-[12rem] leading-[1.1] text-transparent transition-all duration-[1200ms] ease-[var(--ease-silk)] [-webkit-text-stroke:1px_rgba(228,230,201,0.28)] group-hover:-translate-y-4 group-hover:text-marfil/10 md:text-[14rem]"
              >
                {m.name[0]}
              </span>
              <div className="relative">
                <Accent className="mb-5 w-6 translate-y-3 text-marfil opacity-0 transition-all duration-700 ease-[var(--ease-silk)] group-hover:translate-y-0 group-hover:opacity-100" />
                <h3 className="display text-5xl font-light">{m.name}</h3>
                <p className="label mt-3 text-marfil">{m.role}</p>
                <div className="mt-6 h-px w-10 bg-white/30 transition-all duration-700 ease-[var(--ease-silk)] group-hover:w-full group-hover:bg-marfil/60" />
                <blockquote className="mt-6">
                  <p className="ital text-xl leading-snug text-white/90">{m.quote}</p>
                  <footer className="mt-3 text-xs uppercase tracking-[0.2em] text-humo">{m.src}</footer>
                </blockquote>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Team
