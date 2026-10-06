# Manual de marca — VOCÊ Salon & Spa (versión demo)

> Documento preparado para la **demo conceptual no oficial** de rediseño web (INKRAAD / Sebastián, oct-2026).
> Se basa en el logo público de Instagram (@vocesalonspa) y en `brand.md`. No sustituye un manual oficial:
> todo lo marcado como **PROPUESTA** debe validarse con VOCÊ.

## 1. Esencia
- **Nombre:** VOCÊ Salon & Spa (en Google: “VOCE salon&spa Surco”). *Você* significa “tú/usted” en portugués.
- **Rubro:** salón de belleza y spa — cabello (corte, peinado, cambio de look, reacondicionado, lavado y brushing), manicure y pedicure, spa.
- **Dónde:** Av. Alfredo Benavides 4827, Urb. Las Gardenias, Santiago de Surco, Lima.
- **Idea rectora (PROPUESTA de concepto para la web):** *“El acento eres tú.”* El circunflejo de la Ê es el rasgo más distintivo del logo; lo usamos como firma gráfica: el acento siempre cae sobre la persona.

## 2. Logo
| Archivo | Uso |
|---|---|
| `logo-instagram-100.jpg` | **Original** (foto de perfil de Instagram, 100×100 px). Se conserva intacto como referencia. |
| `logo-upscaled-400.png` | Reescalado ×4 del original (no redibujado). Solo referencia de medidas. |
| `voce-logo-wordmark.svg` | **Principal.** Vector reconstruido: VOCÊ blanco + “SALON & SPA” marfil, fondo transparente (para negro / fotos oscuras). |
| `voce-logo-wordmark-blanco.svg` | Monocromo blanco puro. |
| `voce-logo-wordmark-negro.svg` | Negativo para fondos claros: VOCÊ negro + “SALON & SPA” grafito. |
| `voce-logo-perfil.svg` | Réplica 1:1 de la foto de perfil (cuadrado negro 400×400). |
| `logo-comparacion-original-vs-svg.png` | Comparación lado a lado (izq. original, der. vector). |

**Cómo se reconstruyó:** medición píxel a píxel del original en un lienzo de 400×400 (altura de mayúscula 66 px, cajas de cada letra, grosor de trazo ≈ 0,19 de la altura). Las letras se trazaron con **Jost SemiBold** (geométrica estilo Futura, licencia OFL), ajustando cada glifo a la caja medida; el **circunflejo es un chevrón dibujado a mano** (patas con corte horizontal) porque el del logo no corresponde al de ninguna fuente. “SALON & SPA” en Jost Bold con el espaciado medido letra por letra. Diferencia media vs. original: < 2 % de intensidad por píxel. Script: `site/scripts/build-logo.mjs`.
> Se recomienda pedir a VOCÊ el archivo vectorial original y reemplazar esta reconstrucción.

**Usos correctos:** respetar área de resguardo = altura de la “O”; tamaño mínimo 96 px de ancho en pantalla (por debajo, usar solo “VOCÊ” sin la línea secundaria); siempre sobre negro, blanco o fotografía monocroma con contraste suficiente.
**Usos incorrectos:** no cambiar la tipografía, no separar el circunflejo de la E (salvo en animaciones de marca donde “aterriza” sobre ella), no aplicar degradados, sombras ni colores fuera de la paleta, no deformar.

## 3. Paleta
| Color | HEX | Origen | Uso |
|---|---|---|---|
| Negro VOCÊ | `#000000` | Logo (fondo) | Fondo principal, ~70 % de la superficie. |
| Blanco | `#FFFFFF` | Logo (VOCÊ) | Tipografía principal, logo. |
| **Marfil VOCÊ** | `#E4E6C9` | **Logo**: tono real de “SALON & SPA” en la foto de perfil (muestreo de los píxeles más claros ≈ rgb 228,231,200; `brand.md` lo había leído como blanco) | **Único acento.** Máx. ~5 % de la superficie: estrellas de reseñas, palabras en itálica, filetes, estados activos, sección CTA. |
| Grafito cálido | `#6A6A61` | Logo (antialias/sombra) | Filetes, detalles decorativos. Sobre negro **solo** en texto ≥ 24 px (contraste 3,85:1). Sobre blanco sí apto para texto (5,46:1). |
| Humo | `#A3A39A` | Derivado del grafito (PROPUESTA) | Texto secundario sobre negro (8,26:1, AA/AAA). |
| Tinta | `#0E0E0D` | Derivado del negro (PROPUESTA) | Paneles y tarjetas sobre negro. |

**Justificación del acento:** no se inventa un color nuevo (p. ej. dorado): el marfil ya vive en el logo, en la línea “SALON & SPA”. Mantiene el lujo minimalista monocromo y aporta una calidez de “seda” al blanco y negro.

Contrastes verificados (WCAG): blanco/negro 21:1 · marfil/negro 16,5:1 · humo/negro 8,3:1 · negro/marfil 16,5:1.

## 4. Tipografías (web, licencia OFL)
- **Jost** (variable 100–900) — la más cercana a las letras del logo (geométrica tipo Futura). Uso: titulares en mayúsculas con tracking amplio, navegación, botones, datos. Pesos: 300 / 400 / 500 / 600.
- **Bodoni Moda** (variable, itálica) — contrapunto editorial de revista de moda. Uso: palabras de énfasis, citas de reseñas, números grandes, iniciales del equipo. Nunca en párrafos largos.
- Jerarquía: H1 display Jost 500 en mayúsculas (o el wordmark vectorial) · H2 Jost 400 mayúsculas + palabra en Bodoni itálica marfil · cuerpo Jost 300/400 16–18 px, interlineado 1,6 · etiquetas Jost 500 11–12 px, tracking 0,3 em.

## 5. Tono de voz
Cercano y profesional (como lo describen las reseñas: “muy amable y profesional”, “ambiente limpio, bonito”). Tutear con elegancia, frases cortas, sin exageraciones ni superlativos inventados. Bilingüe ocasional (la clientela incluye extranjeros: hay reseñas en inglés). Palabras clave: *cuidado, detalle, tu momento, manos expertas, el acento en ti.*
- ✅ “Reserva tu momento. Te respondemos por WhatsApp.”
- ❌ “¡El mejor salón de todo Lima, garantizado!” (afirmación no verificable).

## 6. Iconografía y recursos gráficos
- **Circunflejo (^)** como icono-firma: viñetas, marcador de sección, cursor personalizado, indicador de scroll, animación de carga (el acento “aterriza” sobre la E).
- Filetes de 1 px en grafito; numeración editorial (01, 02…) en Bodoni itálica.
- Fotografía: **siempre monocroma**, contraste suave, grano fino de película. En la demo se usan imágenes de Unsplash como referencia; deben reemplazarse por fotos reales del salón (Instagram tiene más de 1.000 publicaciones).
- Movimiento: lento, fluido, “sedoso” (easing `expo.out` / `power3.inOut`, 0,8–1,6 s). Nada de rebotes ni efectos estridentes. Respeta `prefers-reduced-motion`.
- Elemento 3D: **seda negra líquida** (shader WebGL) que evoca cabello recién peinado y textiles de lujo; en el cierre, seda marfil.

## 7. Pendiente de validar con VOCÊ
Logo vectorial original · uso oficial del marfil · lista de servicios y precios · fotos reales del equipo y del local · si el +51 923 461 397 es WhatsApp · apellidos y especialidades del equipo.
