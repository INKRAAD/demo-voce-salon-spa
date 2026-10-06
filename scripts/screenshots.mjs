// Capturas con Chrome headless (Playwright). Uso: npm run preview & node scripts/screenshots.mjs [desktop|mobile|all]
import { chromium } from 'playwright'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'

const URL = process.env.URL || 'http://127.0.0.1:3121/'
const OUT = new globalThis.URL('../screenshots/', import.meta.url).pathname
const TMP = '/tmp/voce-shots/'
fs.mkdirSync(TMP, { recursive: true })
const which = process.argv[2] || 'all'

const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader', '--use-angle=swiftshader'],
})

async function scrollThrough(page, step = 320) {
  let y = 0
  for (;;) {
    const sh = await page.evaluate(() => document.documentElement.scrollHeight)
    if (y > sh) break
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(140)
    y += step
  }
  await page.waitForTimeout(600)
}

async function shoot(name, viewport, opts = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: opts.dpr || 1, isMobile: !!opts.mobile, hasTouch: !!opts.mobile, reducedMotion: opts.reduced ? 'reduce' : 'no-preference' })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text()}`) })
  page.on('pageerror', (e) => errors.push('[pageerror] ' + e.message))
  await page.goto(URL, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1700)
  if (!opts.noLoaderShot) await page.screenshot({ path: OUT + name + '-loader.png' })
  await page.waitForSelector('[aria-label^="Cargando VOC"]', { state: 'detached', timeout: 20000 })
  await page.waitForTimeout(3600)
  await page.screenshot({ path: OUT + name + '-hero.png' })
  if (opts.heroOnly) { report(name, errors); await ctx.close(); return }

  // capturas por sección (en viewport, con animaciones ya disparadas)
  for (const id of opts.sections || []) {
    await page.evaluate((i) => document.getElementById(i)?.scrollIntoView(), id)
    await page.waitForTimeout(2600)
    await page.screenshot({ path: OUT + `${name}-${id}.png` })
  }
  if (opts.extras) {
    // hover en el menú de servicios (imagen flotante) y lookbook a mitad del scroll horizontal
    await page.evaluate(() => document.getElementById('servicios')?.scrollIntoView())
    await page.waitForTimeout(2400)
    const row = page.locator('#servicios li').nth(1)
    const bb = await row.boundingBox()
    await page.mouse.move(bb.x + 640, bb.y + bb.height / 2, { steps: 10 })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: OUT + name + '-servicios-hover.png' })
    const top = await page.evaluate(() => document.getElementById('lookbook').getBoundingClientRect().top + window.scrollY)
    await page.evaluate((t) => window.scrollTo(0, t + 1500), top)
    await page.waitForTimeout(2500)
    await page.screenshot({ path: OUT + name + '-lookbook-scroll.png' })
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(800)

  if (opts.full) {
    // página completa: se recarga con ?captura (sin pin del lookbook) para medir la altura natural
    await page.goto(URL + '?captura', { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('[aria-label^="Cargando VOC"]', { state: 'detached', timeout: 20000 })
    await page.waitForTimeout(2500)
    await scrollThrough(page)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(1200)
    const H = await page.evaluate(() => document.documentElement.scrollHeight)
    const W = viewport.width
    const parts = []
    const STEP = Math.floor(3600 / (opts.dpr || 1))
    for (let y = 0; y < H; y += STEP) {
      const f = `${TMP}part-${name}-${String(y).padStart(6, '0')}.png`
      await page.screenshot({ path: f, fullPage: true, clip: { x: 0, y, width: W, height: Math.min(STEP, H - y) } })
      parts.push(f)
    }
    execFileSync('python3', ['-c', `
import sys
from PIL import Image
Image.MAX_IMAGE_PIXELS=None
ims=[Image.open(f) for f in sys.argv[2:]]
out=Image.new('RGB',(ims[0].width,sum(i.height for i in ims)),'black')
y=0
for i in ims: out.paste(i,(0,y)); y+=i.height
if out.width>700: out=out.resize((out.width//2,out.height//2))
out.save(sys.argv[1], optimize=True)
`, OUT + name + '-full.png', ...parts])
  }
  report(name, errors)
  await ctx.close()
}
function report(name, errors) { console.log(name, 'console errors/warnings:', errors.length ? '\n  ' + errors.slice(0, 20).join('\n  ') : 'none') }

const SECTIONS = ['servicios', 'equipo', 'lookbook', 'resenas', 'la-casa', 'visitanos', 'reservar']
if (which === 'all' || which === 'desktop') await shoot('desktop-1440', { width: 1440, height: 900 }, { sections: SECTIONS, full: true, extras: true })
if (which === 'all' || which === 'mobile') await shoot('mobile-390', { width: 390, height: 844 }, { mobile: true, dpr: 2, sections: SECTIONS, full: true })
if (which === 'all' || which === 'reduced') await shoot('reduced-motion-1440', { width: 1440, height: 900 }, { reduced: true, heroOnly: true, noLoaderShot: true })
if (which === 'og') {
  // imagen Open Graph 1200×630 a partir del hero real
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('[aria-label^="Cargando VOC"]', { state: 'detached', timeout: 20000 })
  await page.waitForTimeout(4200)
  await page.addStyleTag({ content: 'header{opacity:0!important}' })
  await page.screenshot({ path: new globalThis.URL('../public/og-image.jpg', import.meta.url).pathname, type: 'jpeg', quality: 86 })
  await ctx.close()
  console.log('og-image.jpg listo')
}
await browser.close()
