import { useEffect, useState } from 'react'
import { BRAND } from '../data/content'
import { WhatsAppIcon } from './Icons'

/** Barra fija de reserva en móvil (aparece tras el hero) */
export function MobileBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => {
      const cta = document.getElementById('reservar')
      const nearCta = cta ? cta.getBoundingClientRect().top < window.innerHeight * 0.9 : false
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearCta)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <div
      className="fixed inset-x-3 bottom-3 z-40 flex gap-2 transition-transform duration-700 ease-[var(--ease-silk)] md:hidden"
      style={{ transform: show ? 'translateY(0)' : 'translateY(140%)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!show}
    >
      <a href={BRAND.whatsappHref} target="_blank" rel="noopener" tabIndex={show ? 0 : -1} className="btn-pill btn-light flex-1 justify-center !py-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <WhatsAppIcon /> Reservar
      </a>
      <a href={BRAND.phoneHref} tabIndex={show ? 0 : -1} className="btn-pill flex-none justify-center border border-white/30 bg-black/70 !px-5 !py-4 text-white backdrop-blur" aria-label={`Llamar al ${BRAND.phone}`}>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
      </a>
    </div>
  )
}

export default MobileBar
