'use client'

import TileRenderer from './TileRenderer'

interface HandDisplayProps {
  label: string
  tileIds: string[]
  total: number
}

export default function HandDisplay({ label, tileIds, total }: HandDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      <span
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'rgba(240,240,240,0.45)' }}
      >
        {label}
      </span>

      <div className="flex items-end gap-2 sm:gap-3">
        {tileIds.map((id) => (
          <TileRenderer key={id} tileId={id} />
        ))}
      </div>

      <div
        className="px-4 sm:px-5 py-1.5 rounded-lg text-sm font-bold"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#f0f0f0',
        }}
      >
        Total: {total}
      </div>
    </div>
  )
}
