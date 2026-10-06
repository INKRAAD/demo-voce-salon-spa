import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { BRAND, NAV } from '../data/content'
import { getLenis, scrollToHash } from '../lib/scroll'
import { WhatsAppIcon } from './Icons'
import { Logo } from './Logo'
import { Magnetic } from './Magnetic'

export function Nav({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let last = 0
    const on = () => {
      const y = window.scrollY
      setSolid(y > 40)
      setHidden(y > 300 && y > last && !open)
      last = y
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [open])

  useEffect(() => {
    const l = getLenis()
    if (open) l?.stop()
    else l?.start()
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => scrollToHash(href), open ? 450 : 0)
  }

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter] duration-700 ease-[var(--ease-silk)]"
        style={{
          transform: hidden || !ready ? 'translateY(-110%)' : 'translateY(0)',
          backgroundColor: solid && !open ? 'rgba(0,0,0,0.55)' : 'transparent',
          backdropFilter: solid && !open ? 'blur(14px)' : 'none',
        }}
      >
        <nav aria-label="Principal" className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 md:h-[84px] md:px-10">
          <a href="#inicio" onClick={(e) => go(e, '#inicio')} className="relative z-10 block" aria-label="VOCÊ Salon & Spa, ir al inicio">
            <Logo className="h-[46px] w-auto md:h-[54px]" />
          </a>
          <ul className="hidden items-center gap-9 lg:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={(e) => go(e, n.href)} className="label link-u pb-1 text-white/85 hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="relative z-10 flex items-center gap-3">
            <Magnetic className="hidden md:inline-block">
              <a href={BRAND.whatsappHref} target="_blank" rel="noopener" className="btn-pill btn-ghost !py-3 !text-[0.68rem]" data-cursor="Reservar">
                <WhatsAppIcon className="h-3.5 w-3.5" /> Reservar
              </a>
            </Magnetic>
            <button
              ref={btn}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="group grid h-11 w-11 place-items-center rounded-full border border-white/30 lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 block h-px w-5 bg-white transition-transform duration-500 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 block h-px w-5 bg-white transition-transform duration-500 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-noir px-6 pb-10 pt-28"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {NAV.map((n, i) => (
                <li key={n.href} className="overflow-hidden">
                  <motion.a
                    href={n.href}
                    onClick={(e) => go(e, n.href)}
                    className="flex items-baseline gap-4 py-1 text-[2.6rem] leading-tight"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="ital text-base text-marfil">0{i + 1}</span>
                    <span className="display">{n.label}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.6 } }} exit={{ opacity: 0 }} className="space-y-5">
              <a href={BRAND.whatsappHref} target="_blank" rel="noopener" className="btn-pill btn-light w-full justify-center">
                <WhatsAppIcon /> Reservar por WhatsApp
              </a>
              <p className="text-sm text-humo">{BRAND.address}, {BRAND.district}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Nav
