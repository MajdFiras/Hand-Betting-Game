'use client'

import { useRoundStore } from '@/store/useRoundStore'
import type { RoundResult as RoundResultType } from '@/types/game'

const RESULT_CONFIG: Record<RoundResultType, { label: string; icon: string; color: string }> = {
  win:  { label: 'You Win!',  icon: '✓', color: '#4ade80' },
  lose: { label: 'You Lose!', icon: '✗', color: '#ef4444' },
  draw: { label: 'Draw!',     icon: '→', color: '#94a3b8' },
}

interface RoundResultProps {
  onNext: () => void
}

export default function RoundResult({ onNext }: RoundResultProps) {
  const result = useRoundStore((s) => s.result)
  if (!result) return null

  const config = RESULT_CONFIG[result]

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-5">
      <div
        className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-lg sm:text-xl"
        style={{
          color: config.color,
          background: `${config.color}18`,
          border: `1.5px solid ${config.color}40`,
        }}
      >
        {config.icon} {config.label}
      </div>

      <button
        onClick={onNext}
        className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold transition-all hover:opacity-90 active:scale-95 text-sm sm:text-base"
        style={{
          background: '#991b1b',
          color: '#fff',
          boxShadow: '0 4px 16px rgba(153,27,27,0.4)',
        }}
      >
        Next Round →
      </button>
    </div>
  )
}
