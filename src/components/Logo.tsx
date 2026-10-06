import { CIRC_PATH, LOGO_VIEWBOX, SUB_PATH, VOCE_LETTERS } from '../brand-paths'

type Props = {
  className?: string
  withSub?: boolean
  title?: string
  /** clases para animar letra a letra */
  letterClass?: string
  circClass?: string
  subClass?: string
  subColor?: string
  color?: string
}

/** Wordmark oficial VOCÊ reconstruido en vector (ver scripts/build-logo.mjs) */
export function Logo({ className, withSub = true, title, letterClass, circClass, subClass, color = 'currentColor', subColor = 'var(--color-marfil)' }: Props) {
  const vb = withSub ? LOGO_VIEWBOX : '64 116 258 112'
  return (
    <svg viewBox={vb} className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} focusable="false">
      {title && <title>{title}</title>}
      <g fill={color}>
        {VOCE_LETTERS.map((d, i) => (
          <path key={i} d={d} className={letterClass} />
        ))}
        <path d={CIRC_PATH} className={circClass} />
      </g>
      {withSub && (
        <g fill={subColor} className={subClass}>
          <path d={SUB_PATH} />
        </g>
      )}
    </svg>
  )
}

/** El circunflejo como icono-firma */
export function Accent({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="270 124 43 23" className={className} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} focusable="false">
      {title && <title>{title}</title>}
      <path d={CIRC_PATH} fill="currentColor" />
    </svg>
  )
}
