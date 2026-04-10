'use client'

import { useState } from 'react'
import { useRoundStore } from '@/store/useRoundStore'
import MiniTile from './MiniTile'
import type { RoundResult } from '@/types/game'

const RESULT_COLOR: Record<RoundResult, string> = {
  win:  '#4ade80',
  lose: '#ef4444',
  draw: '#94a3b8',
}

export default function RoundHistory() {
  const [open, setOpen] = useState(false)
  const history = useRoundStore((s) => s.history)

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        disabled={history.length === 0}
        className="text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg transition-all
                   text-white/50 border border-white/10
                   hover:text-white/80 hover:border-white/25 hover:bg-white/5
                   disabled:opacity-25 disabled:cursor-not-allowed"
      >
        History
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-lg max-h-[80vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: '#0d0b18',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div>
                <h2 className="font-bold text-base sm:text-lg tracking-tight">Round History</h2>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(240,240,240,0.35)' }}>
                  {history.length} round{history.length !== 1 ? 's' : ''} played
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-all
                           text-white/40 hover:text-white/70 hover:bg-white/8 text-base"
              >
                ✕
              </button>
            </div>

            {/* Rounds list — most recent first */}
            <div className="overflow-y-auto flex-1 px-4 py-3 flex flex-col gap-2">
              {[...history].reverse().map((entry, i) => {
                const roundNum = history.length - i
                const color = RESULT_COLOR[entry.result]

                return (
                  <div
                    key={roundNum}
                    className="flex items-center gap-2 sm:gap-3 px-3 py-2.5 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* Round label */}
                    <span
                      className="text-[10px] font-semibold w-5 shrink-0 text-center"
                      style={{ color: 'rgba(240,240,240,0.3)' }}
                    >
                      R{roundNum}
                    </span>

                    {/* Hand 1 tiles */}
                    <div className="flex items-end gap-1 shrink-0">
                      {entry.hand1.map((t) => (
                        <MiniTile key={t.id} tile={t} />
                      ))}
                    </div>

                    {/* Hand 1 total */}
                    <span
                      className="text-xs font-bold tabular-nums shrink-0"
                      style={{ color: 'rgba(240,240,240,0.5)' }}
                    >
                      {entry.hand1Total}
                    </span>

                    {/* Result badge */}
                    <div className="flex-1 flex justify-center">
                      <span
                        className="px-2.5 py-0.5 rounded-lg font-bold text-xs"
                        style={{
                          color,
                          background: `${color}15`,
                          border: `1px solid ${color}35`,
                        }}
                      >
                        {entry.result.toUpperCase()}
                      </span>
                    </div>

                    {/* Hand 2 total */}
                    <span
                      className="text-xs font-bold tabular-nums shrink-0"
                      style={{ color: 'rgba(240,240,240,0.5)' }}
                    >
                      {entry.hand2Total}
                    </span>

                    {/* Hand 2 tiles */}
                    <div className="flex items-end gap-1 shrink-0">
                      {entry.hand2.map((t) => (
                        <MiniTile key={t.id} tile={t} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
