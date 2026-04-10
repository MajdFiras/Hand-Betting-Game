'use client'

import { useRouter } from 'next/navigation'
import { useGameStore } from '@/store/useGameStore'
import RoundHistory from './RoundHistory'

export default function GameHeader() {
  const router = useRouter()
  const roundNumber = useGameStore((s) => s.roundNumber)
  const score = useGameStore((s) => s.score)

  return (
    <header
      className="grid grid-cols-3 items-center px-4 sm:px-5 py-3 sm:py-4"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Left: exit + history */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push('/')}
          className="text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg transition-all
                     text-white/50 border border-white/10
                     hover:text-white/80 hover:border-white/25 hover:bg-white/5"
        >
          ← Exit
        </button>
        <RoundHistory />
      </div>

      {/* Center: round */}
      <div className="flex flex-col items-center gap-0.5">
        <span
          className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: 'rgba(240,240,240,0.4)' }}
        >
          Round
        </span>
        <span className="text-2xl sm:text-3xl font-bold leading-none">{roundNumber}</span>
      </div>

      {/* Right: score */}
      <div className="flex flex-col items-end gap-0.5">
        <span
          className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: 'rgba(240,240,240,0.4)' }}
        >
          Score
        </span>
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="text-2xl sm:text-3xl font-bold leading-none">{score}</span>
          <span className="text-lg sm:text-xl leading-none">🏆</span>
        </div>
      </div>
    </header>
  )
}
