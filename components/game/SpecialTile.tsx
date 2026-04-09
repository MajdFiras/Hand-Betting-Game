interface SpecialTileProps {
  type: 'dragon' | 'wind'
}

const TILE_CONFIG = {
  dragon: {
    emoji: '🐉',
    label: 'Dragon',
    borderColor: 'rgba(185,28,28,0.55)',
    glowColor: 'rgba(185,28,28,0.25)',
    bg: 'linear-gradient(160deg, #221218 0%, #130d0d 100%)',
    labelColor: '#f87171',
  },
  wind: {
    emoji: '💨',
    label: 'Wind',
    borderColor: 'rgba(59,130,246,0.55)',
    glowColor: 'rgba(59,130,246,0.2)',
    bg: 'linear-gradient(160deg, #121c2e 0%, #0c1320 100%)',
    labelColor: '#93c5fd',
  },
}

export default function SpecialTile({ type }: SpecialTileProps) {
  const config = TILE_CONFIG[type]

  return (
    <div
      className="relative flex flex-col items-center justify-center gap-1 rounded-xl select-none"
      style={{
        width: 'var(--tile-w)',
        height: 'var(--tile-h)',
        background: config.bg,
        border: `1.5px solid ${config.borderColor}`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 18px rgba(0,0,0,0.65), 0 0 12px ${config.glowColor}`,
      }}
    >
      <span style={{ fontSize: 'var(--tile-emoji-fs)', lineHeight: 1 }}>{config.emoji}</span>
      <span
        className="font-semibold tracking-wide uppercase leading-none"
        style={{ fontSize: '0.45rem', color: config.labelColor, letterSpacing: '0.08em' }}
      >
        {config.label}
      </span>
    </div>
  )
}
