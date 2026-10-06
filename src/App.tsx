import { useEffect, useLayoutEffect, useState } from 'react'
import About from './components/About'
import Cta from './components/Cta'
import Cursor from './components/Cursor'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Lookbook from './components/Lookbook'
import Manifesto from './components/Manifesto'
import { Marquee } from './components/Marquee'
import MobileBar from './components/MobileBar'
import Nav from './components/Nav'
import Promos from './components/Promos'
import Reviews from './components/Reviews'
import Services from './components/Services'
import Team from './components/Team'
import Visit from './components/Visit'
import { useFinePointer } from './hooks/useMedia'
import { destroyLenis, gsap, initLenis, prefersReduced, ScrollTrigger, SplitText } from './lib/scroll'

export default function App() {
  const [ready, setReady] = useState(false)
  const fine = useFinePointer()

  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  // Animaciones globales declarativas: [data-split] [data-fade] [data-clip] [data-parallax]
  useLayoutEffect(() => {
    if (prefersReduced()) return
    let ctx: gsap.Context | undefined
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve()
    fonts.then(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
          SplitText.create(el, {
            type: 'lines,words',
            mask: 'lines',
            linesClass: 'sl',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.words, {
                yPercent: 115,
                duration: 1.4,
                ease: 'expo.out',
                stagger: 0.06,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              }),
          })
        })
        gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
          gsap.from(el, { y: 40, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 97%', once: true } })
        })
        gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
          gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
        })
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          gsap.fromTo(el, { yPercent: -9 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
        })
      })
      ScrollTrigger.refresh()
    })
    return () => ctx?.revert()
  }, [])

  return (
    <>
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Loader onDone={() => setReady(true)} />
      {fine && <Cursor />}
      <Nav ready={ready} />
      <main id="contenido">
        <Hero ready={ready} />
        <Manifesto />
        <Marquee />
        <Services />
        <Promos />
        <Team />
        <Lookbook />
        <Reviews />
        <About />
        <Visit />
        <Cta />
      </main>
      <Footer />
      <MobileBar />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
