'use client'

import { useDeckStore } from '@/store/useDeckStore'

export default function DeckStatsBar() {
  const drawCount      = useDeckStore((s) => s.drawPile.length)
  const discardCount   = useDeckStore((s) => s.discardPile.length)
  const reshuffleCount = useDeckStore((s) => s.reshuffleCount)

  const stats = [
    { label: 'Draw',       value: drawCount,             warn: false },
    { label: 'Discard',    value: discardCount,          warn: false },
    { label: 'Reshuffles', value: `${reshuffleCount}/3`, warn: reshuffleCount >= 2 },
  ]

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-4 py-2"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {stats.map(({ label, value, warn }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className="text-xs font-medium" style={{ color: 'rgba(240,240,240,0.4)' }}>
            {label}
          </span>
          <span
            className="text-xs font-bold"
            style={{ color: warn ? '#f87171' : '#f0f0f0' }}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}
