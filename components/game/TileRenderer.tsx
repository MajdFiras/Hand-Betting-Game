'use client'

import { useTileStore } from '@/store/useTileStore'
import NumberTile from './NumberTile'
import SpecialTile from './SpecialTile'

export default function TileRenderer({ tileId }: { tileId: string }) {
  const tile = useTileStore((state) => state.tiles[tileId])
  if (!tile) return null

  if (tile.type === 'number') {
    return <NumberTile value={tile.currentValue} />
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <SpecialTile type={tile.type} />
      <span
        className="text-xs font-bold leading-none"
        style={{ color: tile.type === 'dragon' ? '#f87171' : '#93c5fd' }}
      >
        {tile.currentValue}
      </span>
    </div>
  )
}
