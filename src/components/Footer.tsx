import { BRAND, CREDITS, NAV } from '../data/content'
import { scrollToHash } from '../lib/scroll'
import { InstagramIcon } from './Icons'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-noir px-5 pb-28 pt-24 md:px-10 md:pb-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 border-b border-linea pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="label text-humo">Dirección</p>
            <address className="mt-4 not-italic leading-relaxed text-white/85">
              {BRAND.address}
              <br />
              {BRAND.district}
            </address>
          </div>
          <div>
            <p className="label text-humo">Horario</p>
            <p className="mt-4 leading-relaxed text-white/85">
              Lunes a sábado · 8:30 – 20:00
              <br />
              Domingo · cerrado
            </p>
          </div>
          <div>
            <p className="label text-humo">Contacto</p>
            <p className="mt-4 flex flex-col gap-2 text-white/85">
              <a className="link-u self-start" href={BRAND.phoneHref}>{BRAND.phone}</a>
              <a className="link-u inline-flex items-center gap-2 self-start" href={BRAND.instagram} target="_blank" rel="noopener">
                <InstagramIcon /> {BRAND.instagramHandle}
              </a>
            </p>
          </div>
          <nav aria-label="Pie de página">
            <p className="label text-humo">Explora</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-white/85">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a className="link-u" href={n.href} onClick={(e) => { e.preventDefault(); scrollToHash(n.href) }}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="py-12 md:py-16" data-fade>
          <Logo className="mx-auto w-full max-w-[1100px]" title="VOCÊ Salon & Spa" />
        </div>

        <div className="flex flex-col gap-6 border-t border-linea pt-8 text-xs leading-relaxed text-humo md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl">
            <strong className="font-medium text-white">Demo conceptual no oficial.</strong> Propuesta de rediseño web preparada por INKRAAD para VOCÊ Salon &amp; Spa; no está afiliada ni publicada por el salón. Datos de contacto, horario, reseñas y calificación tomados de fuentes públicas (Google Maps, Instagram, oct-2026). Las promos diarias, las descripciones de servicios y las fotografías son <strong className="font-medium text-white/80">contenido de ejemplo</strong>.
          </p>
          <details className="max-w-md md:text-right">
            <summary className="label cursor-pointer text-white/80">Créditos de imágenes</summary>
            <ul className="mt-3 space-y-1">
              {CREDITS.map(([n, h, id]) => (
                <li key={id}>
                  <a className="link-u" href={`https://unsplash.com/photos/${id}`} target="_blank" rel="noopener">
                    {n} (@{h}) / Unsplash
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2">Imágenes bajo la Licencia Unsplash, convertidas a monocromo.</p>
          </details>
        </div>
      </div>
    </footer>
  )
}

export default Footer
