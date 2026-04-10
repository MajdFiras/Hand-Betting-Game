import type { TileSnapshot } from '@/types/game'

const SPECIAL_CONFIG = {
  dragon: {
    emoji: '🐉',
    bg: 'linear-gradient(160deg, #221218 0%, #130d0d 100%)',
    border: 'rgba(185,28,28,0.55)',
    valueColor: '#f87171',
  },
  wind: {
    emoji: '💨',
    bg: 'linear-gradient(160deg, #121c2e 0%, #0c1320 100%)',
    border: 'rgba(59,130,246,0.55)',
    valueColor: '#93c5fd',
  },
}

const SIZE = { width: '2rem', height: '3rem' }

export default function MiniTile({ tile }: { tile: TileSnapshot }) {
  if (tile.type === 'number') {
    return (
      <div
        className="relative flex items-center justify-center rounded-lg select-none"
        style={{
          ...SIZE,
          background: 'linear-gradient(160deg, #1e1c2e 0%, #131122 100%)',
          border: '1px solid rgba(255,255,255,0.13)',
          boxShadow: '0 3px 8px rgba(0,0,0,0.5)',
        }}
      >
        <span className="font-bold" style={{ fontSize: '0.85rem', color: '#f0f0f0' }}>
          {tile.value}
        </span>
      </div>
    )
  }

  const cfg = SPECIAL_CONFIG[tile.type]
  return (
    <div
      className="flex flex-col items-center justify-center gap-0.5 rounded-lg select-none"
      style={{
        ...SIZE,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        boxShadow: '0 3px 8px rgba(0,0,0,0.5)',
      }}
    >
      <span style={{ fontSize: '0.8rem', lineHeight: 1 }}>{cfg.emoji}</span>
      <span className="font-bold" style={{ fontSize: '0.55rem', color: cfg.valueColor }}>
        {tile.value}
      </span>
    </div>
  )
}
