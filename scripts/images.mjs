// Descarga imágenes de Unsplash (Unsplash License) y las convierte a monocromo editorial (WebP).
// Uso: node scripts/images.mjs
import sharp from 'sharp'
import fs from 'node:fs'

export const IMAGES = [
  { key: 'corte', id: '1647462742006-adc8b77b52d2', page: '8CLerODobnc', author: 'Gabriela', handle: 'gabigi' },
  { key: 'brushing', id: '1639607829708-550326d68cef', page: 'i7vBQJCeJso', author: 'Alexander Krivitskiy', handle: 'krivitskiy' },
  { key: 'ondas', id: '1740359399407-90c42560d45d', page: 'WC4oVkiyfmQ', author: 'Alef Morais', handle: 'alef_visuals' },
  { key: 'manicure', id: '1773808605530-17926a0463e9', page: '2Eh-J7X5Qdw', author: 'Kellen Barnes', handle: 'boysenberriefairie' },
  { key: 'pedicure', id: '1662132092975-b7ee2eabe377', page: 'aBUCQtLcMDQ', author: 'Konstantin Shmatov', handle: 'shmatov' },
  { key: 'spa', id: '1745327883348-8d78cb4661b0', page: 'uWiQaLrQDMM', author: 'Jakub Klucký', handle: 'jakubklucky' },
  { key: 'piedras', id: '1602510980042-83898e983728', page: 'vJkYYMFK6s4', author: 'Klara Kulikova', handle: 'kkalerry' },
  { key: 'espalda', id: '1554162383-d5e3f885d9a7', page: 'npl2BAJDZOU', author: 'Alexander Krivitskiy', handle: 'krivitskiy' },
  { key: 'retrato', id: '1742234081489-fab18d1aa664', page: 'dGDtoqYv1KQ', author: 'Beyza Yurtkuran', handle: 'beyzaayurtkuran' },
  { key: 'melena', id: '1646701096452-14eb85c86aac', page: 'd0L8WpvTBCc', author: 'Marco Guerrero', handle: 'marcoguerreroleon' },
  { key: 'manos', id: '1770892142008-b48dc2eeb360', page: 'Kv3fj21tngM', author: 'Severina Seidl', handle: 'myworldisblue' },
  { key: 'salon', id: '1679621577331-4025252aa65b', page: 'ei0Sb1tgygQ', author: 'Matt Connor', handle: 'mattconnor' },
  { key: 'espejos', id: '1641252064345-235d409679eb', page: '9Snkrx_UU6A', author: 'Sean Boyd', handle: 'seanfboyd' },
  { key: 'tocador', id: '1637777277435-3c44f82fd0c9', page: 'u-jq0g_ZdZE', author: 'Giorgio Trovato', handle: 'giorgiotrovato' },
]

if (process.argv[1].endsWith('images.mjs')) {
  fs.mkdirSync('public/img', { recursive: true })
  fs.mkdirSync('/tmp/voce-raw', { recursive: true })
  for (const im of IMAGES) {
    const raw = `/tmp/voce-raw/${im.key}.jpg`
    if (!fs.existsSync(raw)) {
      const r = await fetch(`https://images.unsplash.com/photo-${im.id}?fm=jpg&q=85&w=2200`)
      if (!r.ok) throw new Error(im.key + ' ' + r.status)
      fs.writeFileSync(raw, Buffer.from(await r.arrayBuffer()))
    }
    for (const w of [1600, 800]) {
      await sharp(raw)
        .resize({ width: w, withoutEnlargement: true })
        .grayscale()
        .linear(1.08, -8) // contraste editorial suave
        .webp({ quality: w > 1000 ? 72 : 68 })
        .toFile(`public/img/${im.key}-${w}.webp`)
    }
    const meta = await sharp(`public/img/${im.key}-1600.webp`).metadata()
    console.log(im.key, meta.width + 'x' + meta.height)
  }
}
