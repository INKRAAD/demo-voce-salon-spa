// ─────────────────────────────────────────────────────────────────────────────
// Contenido de la demo. Fuente: brand/brand.md (investigación del 06-oct-2026).
//  • REAL  = dato verificado en Google Maps / Instagram / reseñas públicas.
//  • EJEMPLO = contenido de ejemplo para la demo (NO es un dato real de VOCÊ).
// ─────────────────────────────────────────────────────────────────────────────

/** Enlace a WhatsApp con mensaje prellenado (el número es el teléfono público de Google) */
export const waLink = (msg: string) => 'https://wa.me/51923461397?text=' + encodeURIComponent(msg)

export const BRAND = {
  name: 'VOCÊ Salon & Spa', // REAL (logo / Instagram)
  shortName: 'VOCÊ',
  address: 'Av. Alfredo Benavides 4827, Urb. Las Gardenias Etapa 1', // REAL
  district: 'Santiago de Surco, Lima', // REAL
  geo: { lat: -12.127678, lng: -76.986933 }, // REAL
  phone: '+51 923 461 397', // REAL (Google)
  phoneHref: 'tel:+51923461397',
  // REAL el número; que sea WhatsApp está POR CONFIRMAR (ver README)
  whatsappHref: waLink('Hola VOCÊ, quisiera reservar una cita. ¿Qué horarios tienen disponibles?'),
  instagram: 'https://www.instagram.com/vocesalonspa/', // REAL
  instagramHandle: '@vocesalonspa',
  instagramFollowers: '13K', // REAL
  instagramPosts: '1.026', // REAL
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=VOCE+salon%26spa+Surco%2C+Av.+Alfredo+Benavides+4827%2C+Santiago+de+Surco%2C+Lima',
  mapsEmbed: 'https://www.google.com/maps?q=-12.127678,-76.986933&z=16&hl=es&output=embed',
  rating: 4.9, // REAL (Google)
  reviews: 471, // REAL (Google)
}

// REAL (Google): Lun–Sáb 8:30–20:00 · Dom cerrado. Índice 0 = domingo.
export const HOURS: { day: string; short: string; open: string | null; close: string | null }[] = [
  { day: 'Domingo', short: 'Dom', open: null, close: null },
  { day: 'Lunes', short: 'Lun', open: '08:30', close: '20:00' },
  { day: 'Martes', short: 'Mar', open: '08:30', close: '20:00' },
  { day: 'Miércoles', short: 'Mié', open: '08:30', close: '20:00' },
  { day: 'Jueves', short: 'Jue', open: '08:30', close: '20:00' },
  { day: 'Viernes', short: 'Vie', open: '08:30', close: '20:00' },
  { day: 'Sábado', short: 'Sáb', open: '08:30', close: '20:00' },
]
// REAL (Google, "Muy concurrido"): horas punta
export const PEAKS = 'Horas de más afluencia: miércoles 17–18 h y sábados 14–15 h.'

export type Service = {
  n: string
  title: string
  italic: string
  desc: string // texto de presentación (redacción propuesta para la demo)
  source: string // de dónde sale que VOCÊ ofrece este servicio
  img: string
  alt: string
}

// Servicios REALES según reseñas y categorías de Google. Las descripciones son
// redacción propuesta. PRECIOS: no publicados → no se muestran (se consultan).
export const SERVICES: Service[] = [
  { n: '01', title: 'Corte', italic: '& cambio de look', desc: 'Diagnóstico, forma y textura pensados para ti. Del retoque sutil a la transformación completa.', source: 'Reseñas Google', img: 'corte', alt: 'Estilista cortando cabello con tijera, en blanco y negro (imagen referencial)' },
  { n: '02', title: 'Peinado', italic: 'para tu ocasión', desc: 'Ondas, recogidos y acabados que duran toda la noche. Manos de artista, como dicen nuestras clientas.', source: 'Reseñas Google', img: 'brushing', alt: 'Mujer acomodando su cabello, retrato en blanco y negro (imagen referencial)' },
  { n: '03', title: 'Lavado', italic: '& brushing', desc: 'El ritual clásico: lavado relajante y un brushing con movimiento, brillo y cuerpo.', source: 'Reseñas Google', img: 'espalda', alt: 'Cabello largo y liso visto de espaldas, en blanco y negro (imagen referencial)' },
  { n: '04', title: 'Reacondicionado', italic: '& tratamientos', desc: 'Hidratación y reparación profunda para devolverle la suavidad de la seda a tu cabello.', source: 'Reseñas Google', img: 'ondas', alt: 'Cabello ondulado de perfil, en blanco y negro (imagen referencial)' },
  { n: '05', title: 'Manicure', italic: 'con detalle', desc: 'Uñas impecables, del acabado natural al nail art. Precisión y paciencia en cada trazo.', source: 'Reseñas Google', img: 'manicure', alt: 'Manos con uñas decoradas, en blanco y negro (imagen referencial)' },
  { n: '06', title: 'Pedicure', italic: 'para caminar ligera', desc: 'Cuidado completo de pies: limpieza, forma, hidratación y esmaltado.', source: 'Reseñas Google', img: 'pedicure', alt: 'Pies con pedicure y esmalte oscuro, en blanco y negro (imagen referencial)' },
  { n: '07', title: 'Spa', italic: 'tu pausa', desc: 'Un momento para desconectar en plena Benavides. (Detalle de rituales por confirmar con VOCÊ.)', source: 'Categoría Google “spa”', img: 'spa', alt: 'Piedras calientes sobre la espalda durante un masaje, en blanco y negro (imagen referencial)' },
]

// REAL: "descuentos cada día" (reseña Google, dic-2025).
// EJEMPLO: el detalle de cada día es inventado para mostrar cómo se publicaría.
export const DAILY_PROMOS: { day: string; promo: string }[] = [
  { day: 'Lun', promo: 'Brushing' },
  { day: 'Mar', promo: 'Manicure' },
  { day: 'Mié', promo: 'Tratamiento' },
  { day: 'Jue', promo: 'Pedicure' },
  { day: 'Vie', promo: 'Peinado' },
  { day: 'Sáb', promo: 'Corte' },
]

// Equipo: nombres REALES mencionados en reseñas de Google. Especialidades
// inferidas de esas reseñas; Viviana sin especialidad publicada.
export const TEAM = [
  { name: 'Hugo', role: 'Corte · peinado · reacondicionado', quote: '“Hugo, un artista con el peinado.”', src: 'Reseña Google, dic 2025' },
  { name: 'Karin', role: 'Cabello', quote: '“Karin was the best… they did an amazing job on our hairs!”', src: 'Reseña Google, ene 2026' },
  { name: 'Athenas', role: 'Manos · manicure', quote: '“Athenas, encantadora con las manos.”', src: 'Reseña Google, dic 2025' },
  { name: 'Viviana', role: 'Equipo VOCÊ', quote: 'Mencionada por clientas en Google. (Especialidad por confirmar.)', src: 'Reseñas Google' },
]

// Reseñas REALES (citas cortas; autor no disponible en la fuente).
export const REVIEWS = [
  { text: 'Muy buen servicio, todo organizado y precios cómodos (tienen descuentos cada día). Hugo me atendió para un reacondicionado y corte, muy amable y profesional…', meta: 'Reseña de Google · 5★ · dic 2025' },
  { text: 'Muy buen servicio y atención. El ambiente bueno, limpio, bonito. Hugo un artista con el peinado… Athenas encantadora con las manos.', meta: 'Reseña de Google · 5★ · dic 2025' },
  { text: 'AMAZING EXPERIENCE!! Karin was the best… they did an amazing job on our hairs!!', meta: 'Reseña de Google · 5★ · ene 2026 · original en inglés' },
]

export type GalleryItem = { img: string; caption: string; alt: string; credit: string }
export const LOOKBOOK: GalleryItem[] = [
  { img: 'retrato', caption: 'Mirada', alt: 'Retrato editorial de mujer en blanco y negro', credit: 'Beyza Yurtkuran' },
  { img: 'melena', caption: 'Melena', alt: 'Mujer de cabello largo con el viento, en blanco y negro', credit: 'Marco Guerrero' },
  { img: 'espalda', caption: 'Brillo', alt: 'Cabello largo visto de espaldas, en blanco y negro', credit: 'Alexander Krivitskiy' },
  { img: 'manos', caption: 'Manos', alt: 'Manos en penumbra, en blanco y negro', credit: 'Severina Seidl' },
  { img: 'piedras', caption: 'Pausa', alt: 'Piedras de masaje sobre la piel, en blanco y negro', credit: 'Klara Kulikova' },
  { img: 'ondas', caption: 'Ondas', alt: 'Cabello ondulado de perfil, en blanco y negro', credit: 'Alef Morais' },
]

// Créditos de imágenes (Unsplash License). Ver también scripts/images.mjs
export const CREDITS = [
  ['Gabriela', 'gabigi', '8CLerODobnc'],
  ['Alexander Krivitskiy', 'krivitskiy', 'i7vBQJCeJso'],
  ['Alef Morais', 'alef_visuals', 'WC4oVkiyfmQ'],
  ['Kellen Barnes', 'boysenberriefairie', '2Eh-J7X5Qdw'],
  ['Konstantin Shmatov', 'shmatov', 'aBUCQtLcMDQ'],
  ['Jakub Klucký', 'jakubklucky', 'uWiQaLrQDMM'],
  ['Klara Kulikova', 'kkalerry', 'vJkYYMFK6s4'],
  ['Alexander Krivitskiy', 'krivitskiy', 'npl2BAJDZOU'],
  ['Beyza Yurtkuran', 'beyzaayurtkuran', 'dGDtoqYv1KQ'],
  ['Marco Guerrero', 'marcoguerreroleon', 'd0L8WpvTBCc'],
  ['Severina Seidl', 'myworldisblue', 'Kv3fj21tngM'],
  ['Sean Boyd', 'seanfboyd', '9Snkrx_UU6A'],
  ['Giorgio Trovato', 'giorgiotrovato', 'u-jq0g_ZdZE'],
] as const

export const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#lookbook', label: 'Lookbook' },
  { href: '#resenas', label: 'Reseñas' },
  { href: '#visitanos', label: 'Visítanos' },
]

/** ¿Abierto ahora? Calculado en hora de Lima (America/Lima). */
export function limaNow() {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Lima', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date())
  const wd = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon'
  const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24
  const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
  const idx = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(wd)
  const today = HOURS[idx]
  const mins = h * 60 + m
  const toM = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3))
  const open = !!today.open && mins >= toM(today.open) && mins < toM(today.close!)
  return { idx, open }
}
