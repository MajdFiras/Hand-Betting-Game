'use client'

import { useEffect } from 'react'
import { useGameStore } from '@/store/useGameStore'
import { useRoundStore } from '@/store/useRoundStore'
import HandDisplay from './HandDisplay'
import GameOverScreen from './GameOverScreen'
import GameHeader from './GameHeader'
import DeckStatsBar from './DeckStatsBar'
import BettingButtons from './BettingButtons'
import RoundResult from './RoundResult'

export default function GameScreen() {
  const { phase, score, startGame, nextRound, recordRoundResult, endGame } = useGameStore()
  const { hand1Ids, hand2Ids, hand1Total, hand2Total, setGuess, dealHand2, resolveRound } =
    useRoundStore()

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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#07070f', color: '#f0f0f0' }}>
      <GameHeader />
      <DeckStatsBar />

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

        {phase === 'betting' && <BettingButtons onGuess={handleGuess} />}
        {phase === 'reveal'  && <RoundResult onNext={nextRound} />}
      </main>
    </div>
  )
}
