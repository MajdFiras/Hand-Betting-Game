'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/store/useGameStore'
import { useRoundStore } from '@/store/useRoundStore'
import { useDeckStore } from '@/store/useDeckStore'
import type { RoundResult } from '@/types/game'
import HandDisplay from './HandDisplay'
import GameOverScreen from './GameOverScreen'
import RoundHistory from './RoundHistory'

const RESULT_CONFIG: Record<RoundResult, { label: string; icon: string; color: string }> = {
  win:  { label: 'You Win!',  icon: '✓', color: '#4ade80' },
  lose: { label: 'You Lose!', icon: '✗', color: '#ef4444' },
  draw: { label: 'Draw!',     icon: '→', color: '#94a3b8' },
}

export default function GameScreen() {
  const router = useRouter()

  const { phase, score, roundNumber, startGame, nextRound, recordRoundResult, endGame } =
    useGameStore()
  const { hand1Ids, hand2Ids, hand1Total, hand2Total, result, setGuess, dealHand2, resolveRound } =
    useRoundStore()
  const drawCount      = useDeckStore((s) => s.drawPile.length)
  const discardCount   = useDeckStore((s) => s.discardPile.length)
  const reshuffleCount = useDeckStore((s) => s.reshuffleCount)

  useEffect(() => {
    startGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGuess = (guess: 'higher' | 'lower') => {
    setGuess(guess)
    const success = dealHand2()
    if (!success) { endGame(); return }
    const res = resolveRound()
    recordRoundResult(res)
  }

  if (phase === 'game-over') return <GameOverScreen score={score} />

  if (phase === 'landing') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#07070f' }}>
        <span style={{ color: 'rgba(240,240,240,0.35)' }}>Starting game…</span>
      </div>
    )
  }

  const res = result ?? null

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#07070f', color: '#f0f0f0' }}>

      {/* ── Header ─────────────────────────────── */}
      <header
        className="grid grid-cols-3 items-center px-4 sm:px-5 py-3 sm:py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
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

      {/* ── Deck stats bar ─────────────────────── */}
      <div
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-4 py-2"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        {[
          { label: 'Draw',       value: drawCount,             warn: false },
          { label: 'Discard',    value: discardCount,          warn: false },
          { label: 'Reshuffles', value: `${reshuffleCount}/3`, warn: reshuffleCount >= 2 },
        ].map(({ label, value, warn }) => (
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

      {/* ── Main ───────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-10 px-4 py-6 sm:py-10">

        {/* Hands */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 md:gap-20">
          <HandDisplay label="Your Hand" tileIds={hand1Ids} total={hand1Total} />

          {phase === 'reveal' && hand2Ids.length > 0 && (
            <>
              <span className="font-bold text-lg sm:text-xl" style={{ color: 'rgba(240,240,240,0.18)' }}>
                VS
              </span>
              <HandDisplay label="Next Hand" tileIds={hand2Ids} total={hand2Total} />
            </>
          )}
        </div>

        {/* Betting buttons */}
        {phase === 'betting' && (
          <div className="flex gap-3 w-full max-w-xs sm:max-w-none sm:w-[22rem] px-2 sm:px-0">
            <button
              onClick={() => handleGuess('higher')}
              className="flex-1 py-4 sm:py-5 rounded-xl font-bold transition-all active:scale-95 text-sm sm:text-base"
              style={{
                background: 'linear-gradient(160deg, #991b1b, #7f1d1d)',
                border: '1.5px solid rgba(185,28,28,0.65)',
                boxShadow: '0 0 20px rgba(185,28,28,0.3), 0 4px 12px rgba(0,0,0,0.5)',
                color: '#fff',
                letterSpacing: '0.03em',
              }}
            >
              Bet Higher
            </button>
            <button
              onClick={() => handleGuess('lower')}
              className="flex-1 py-4 sm:py-5 rounded-xl font-bold transition-all active:scale-95 text-sm sm:text-base"
              style={{
                background: 'linear-gradient(160deg, #1e3a5f, #0f2444)',
                border: '1.5px solid rgba(59,130,246,0.55)',
                boxShadow: '0 0 20px rgba(59,130,246,0.25), 0 4px 12px rgba(0,0,0,0.5)',
                color: '#fff',
                letterSpacing: '0.03em',
              }}
            >
              Bet Lower
            </button>
          </div>
        )}

        {/* Reveal: result banner + next round */}
        {phase === 'reveal' && res && (
          <div className="flex flex-col items-center gap-4 sm:gap-5">
            <div
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-lg sm:text-xl"
              style={{
                color: RESULT_CONFIG[res].color,
                background: `${RESULT_CONFIG[res].color}18`,
                border: `1.5px solid ${RESULT_CONFIG[res].color}40`,
              }}
            >
              {RESULT_CONFIG[res].icon} {RESULT_CONFIG[res].label}
            </div>

            <button
              onClick={nextRound}
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
        )}
      </main>
    </div>
  )
}
