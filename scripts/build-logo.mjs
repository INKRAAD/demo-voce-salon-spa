// Reconstruye el wordmark oficial de VOCÊ (logo de Instagram de 100 px) como SVG vectorial.
// Medidas tomadas píxel a píxel de brand/logo-upscaled-400.png (espacio de 400×400).
// Tipografía de referencia: Jost SemiBold (geométrica estilo Futura, OFL) con ajuste por glifo.
import opentype from 'opentype.js'
import fs from 'node:fs'
import path from 'node:path'

const load = (fam, w) => {
  const b = fs.readFileSync(`node_modules/@fontsource/${fam}/files/${fam}-latin-${w}-normal.woff`)
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength))
}
const jost = load('jost', 600)
const jostB = load('jost', 700)

// Coloca un glifo para que su caja coincida con [x1,x2] y [top, baseline]
function placed(font, ch, x1, x2, top, base) {
  const g = font.charToGlyph(ch)
  const bb = g.getBoundingBox()
  const capH = font.charToGlyph('E').getBoundingBox().y2
  const sy = (base - top) / capH
  const sx = (x2 - x1) / (bb.x2 - bb.x1)
  const p = g.getPath(0, 0, font.unitsPerEm) // y hacia abajo, escala 1 unidad
  let d = ''
  for (const c of p.commands) {
    const X = (x) => +(x1 + (x - bb.x1) * sx).toFixed(2)
    const Y = (y) => +(base + y * sy).toFixed(2)
    if (c.type === 'M') d += `M${X(c.x)} ${Y(c.y)}`
    else if (c.type === 'L') d += `L${X(c.x)} ${Y(c.y)}`
    else if (c.type === 'Q') d += `Q${X(c.x1)} ${Y(c.y1)} ${X(c.x)} ${Y(c.y)}`
    else if (c.type === 'C') d += `C${X(c.x1)} ${Y(c.y1)} ${X(c.x2)} ${Y(c.y2)} ${X(c.x)} ${Y(c.y)}`
    else if (c.type === 'Z') d += 'Z'
  }
  return d
}

// --- VOCÊ (cap: 155 → 221)
const T = 155, B = 221
const voceLetters = [
  placed(jost, 'V', 72.6, 133.6, T, B),
  placed(jost, 'O', 131.4, 197.8, T - 1.2, B + 1.2), // la O tiene overshoot óptico
  placed(jost, 'C', 204.6, 261.4, T - 1.2, B + 1.2),
  placed(jost, 'E', 272, 313.4, T, B),
]
const voce = voceLetters.join('')
// Circunflejo: chevron propio (no es el de la fuente), patas con corte horizontal
const circ = 'M291.5 125.2L312 146L299.6 146L291.5 136.8L283.4 146L271 146Z'

// --- SALON & SPA (cap: 235 → 249), centros medidos por letra
const subTop = 235.2, subBase = 248.8
const subGlyphs = [['S', 92, 98.6], ['A', 110.2, 121.8], ['L', 133.6, 139], ['O', 151.4, 164.6], ['N', 176.4, 187.6], ['&', 213.6, 224.4], ['S', 249.6, 256.6], ['P', 269.6, 277.6], ['A', 288.2, 299.8]]
const sub = subGlyphs.map(([c, a, b]) => {
  if (c === 'O') return placed(jostB, c, a, b, subTop - 0.3, subBase + 0.3)
  return placed(jostB, c, a, b, subTop, subBase)
}).join('')

const WHITE = '#FFFFFF', MARFIL = '#E4E6C9', BLACK = '#000000', GRIS = '#6A6A61'
const vb = '64 116 258 142' // recorte del wordmark
const svg = (bg, main, second, viewBox = vb, title = 'VOCÊ Salon &amp; Spa') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${title}">
  <title>${title}</title>${bg ? `\n  <rect x="0" y="0" width="400" height="400" fill="${bg}"/>` : ''}
  <g fill="${main}"><path d="${voce}"/><path d="${circ}"/></g>
  <g fill="${second}"><path d="${sub}"/></g>
</svg>
`
const brandDir = '../brand'
const pub = 'public/brand'
fs.mkdirSync(pub, { recursive: true })
const files = {
  'voce-logo-wordmark.svg': svg(null, WHITE, MARFIL),            // principal sobre negro / foto oscura
  'voce-logo-wordmark-blanco.svg': svg(null, WHITE, WHITE),      // monocromo puro
  'voce-logo-wordmark-negro.svg': svg(null, BLACK, GRIS),        // sobre fondos claros
  'voce-logo-perfil.svg': svg(BLACK, WHITE, MARFIL, '0 0 400 400'), // réplica 1:1 de la foto de perfil
}
for (const [n, s] of Object.entries(files)) {
  fs.writeFileSync(path.join(pub, n), s)
  fs.writeFileSync(path.join(brandDir, n), s)
}
// Solo el monograma "VOCÊ" (para favicon / loader)
const mono = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="64 116 258 112" role="img" aria-label="VOCÊ"><title>VOCÊ</title><g fill="#fff"><path d="${voce}"/><path d="${circ}"/></g></svg>\n`
fs.writeFileSync(path.join(pub, 'voce-monograma.svg'), mono)
fs.writeFileSync('src/brand-paths.ts', `// Generado por scripts/build-logo.mjs — no editar a mano\nexport const VOCE_PATH = ${JSON.stringify(voce)}\nexport const VOCE_LETTERS = ${JSON.stringify(voceLetters)}\nexport const CIRC_PATH = ${JSON.stringify(circ)}\nexport const SUB_PATH = ${JSON.stringify(sub)}\nexport const LOGO_VIEWBOX = ${JSON.stringify(vb)}\n`)
console.log('ok')
