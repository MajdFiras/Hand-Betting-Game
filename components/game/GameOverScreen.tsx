'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLeaderboardStore } from '@/store/useLeaderboardStore'

interface GameOverScreenProps {
  score: number
}

export default function GameOverScreen({ score }: GameOverScreenProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)
  const addEntry = useLeaderboardStore((state) => state.addEntry)

  const handleSave = () => {
    if (!name.trim()) return
    addEntry({
      name: name.trim(),
      score,
      date: new Date().toLocaleDateString(),
    })
    setSaved(true)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8 sm:gap-10 px-4"
      style={{ background: '#07070f', color: '#f0f0f0' }}
    >
      {/* Title */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Game Over</h1>
        <p className="text-sm sm:text-base" style={{ color: 'rgba(240,240,240,0.4)' }}>
          The tiles have decided your fate
        </p>
      </div>

      {/* Score */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-xs uppercase tracking-widest font-semibold"
          style={{ color: 'rgba(240,240,240,0.4)' }}
        >
          Final Score
        </span>
        <span className="text-7xl sm:text-8xl font-bold text-gold">{score}</span>
      </div>

      {/* Save form */}
      {!saved ? (
        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            maxLength={20}
            className="w-full px-4 py-3 rounded-xl text-center font-semibold outline-none text-sm sm:text-base"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1.5px solid rgba(255,255,255,0.12)',
              color: '#f0f0f0',
            }}
          />
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="w-full py-3 rounded-xl font-bold transition-colors text-sm sm:text-base"
            style={{
              background: name.trim() ? '#991b1b' : 'rgba(255,255,255,0.04)',
              color: name.trim() ? '#fff' : 'rgba(255,255,255,0.25)',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: name.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            Save to Leaderboard
          </button>
        </div>
      ) : (
        <p className="font-semibold text-sm sm:text-base" style={{ color: '#4ade80' }}>
          ✓ Score saved!
        </p>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:w-auto sm:max-w-none">
        <button
          onClick={() => router.push('/')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-opacity hover:opacity-80 text-sm sm:text-base"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(240,240,240,0.8)',
          }}
        >
          ← Return to Menu
        </button>
        <button
          onClick={() => router.push('/leaderboard')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-opacity hover:opacity-80 text-sm sm:text-base"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(240,240,240,0.8)',
          }}
        >
          Leaderboard →
        </button>
      </div>
    </div>
  )
}
