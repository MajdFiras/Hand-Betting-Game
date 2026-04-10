'use client'

import { useRouter } from 'next/navigation'
import { useLeaderboardStore } from '@/store/useLeaderboardStore'

const RANK_STYLES: Record<number, { color: string; label: string }> = {
  1: { color: '#FFD700', label: '🥇' },
  2: { color: '#C0C0C0', label: '🥈' },
  3: { color: '#CD7F32', label: '🥉' },
}

export default function LeaderboardPage() {
  const router = useRouter()
  const allEntries = useLeaderboardStore((s) => s.entries)
  const entries = allEntries.slice(0, 5)
  const clearEntries = useLeaderboardStore((s) => s.clearEntries)

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#07070f', color: '#f0f0f0' }}
    >
      {/* Header */}
      <header
        className="grid grid-cols-3 items-center px-4 sm:px-6 py-3 sm:py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div>
          <button
            onClick={() => router.push('/')}
            className="text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg transition-all
                       text-white/50 border border-white/10
                       hover:text-white/80 hover:border-white/25 hover:bg-white/5"
          >
            ← Back
          </button>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xl sm:text-2xl font-bold tracking-tight">Leaderboard</span>
          <span
            className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: 'rgba(240,240,240,0.35)' }}
          >
            Top 5 Scores
          </span>
        </div>

        <div className="flex justify-end">
          {entries.length > 0 && (
            <button
              onClick={clearEntries}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all
                         text-white/30 border border-white/08
                         hover:text-red-400/80 hover:border-red-500/30 hover:bg-red-500/05"
            >
              Clear
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12">
        {entries.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-3 mt-16">
            <span className="text-5xl opacity-20">🏆</span>
            <p className="text-sm font-semibold" style={{ color: 'rgba(240,240,240,0.3)' }}>
              No scores yet
            </p>
            <p className="text-xs" style={{ color: 'rgba(240,240,240,0.18)' }}>
              Finish a game to appear here
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md flex flex-col gap-2">
            {entries.map((entry, i) => {
              const rank = i + 1
              const rankStyle = RANK_STYLES[rank]

              return (
                <div
                  key={`${entry.name}-${i}`}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl"
                  style={{
                    background:
                      rank === 1
                        ? 'rgba(255,215,0,0.06)'
                        : 'rgba(255,255,255,0.03)',
                    border:
                      rank === 1
                        ? '1px solid rgba(255,215,0,0.15)'
                        : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Rank */}
                  <div className="w-8 text-center shrink-0">
                    {rankStyle ? (
                      <span className="text-xl">{rankStyle.label}</span>
                    ) : (
                      <span
                        className="text-sm font-bold"
                        style={{ color: 'rgba(240,240,240,0.3)' }}
                      >
                        {rank}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <span
                    className="flex-1 font-semibold text-sm sm:text-base truncate"
                    style={{ color: rankStyle ? rankStyle.color : '#f0f0f0' }}
                  >
                    {entry.name}
                  </span>

                  {/* Date */}
                  <span
                    className="text-xs shrink-0"
                    style={{ color: 'rgba(240,240,240,0.3)' }}
                  >
                    {entry.date}
                  </span>

                  {/* Score */}
                  <div className="flex items-center gap-1 shrink-0">
                    <span
                      className="text-lg sm:text-xl font-bold"
                      style={{ color: rankStyle ? rankStyle.color : '#f0f0f0' }}
                    >
                      {entry.score}
                    </span>
                    <span className="text-base">🏆</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
