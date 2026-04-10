  import { create } from 'zustand'
  import type { GamePhase, RoundResult } from '@/types/game'
  import { useTileStore } from './useTileStore'
  import { useDeckStore } from './useDeckStore'
  import { useRoundStore } from './useRoundStore'

  interface GameStore {
    phase: GamePhase
    score: number
    roundNumber: number
    setPhase: (phase: GamePhase) => void
    startGame: () => void
    nextRound: () => void
    recordRoundResult: (result: RoundResult) => void
    endGame: () => void
  }

  export const useGameStore = create<GameStore>((set, get) => ({
    phase: 'landing',
    score: 0,
    roundNumber: 0,

    setPhase: (phase) => set({ phase }),

    startGame: () => {
      useTileStore.getState().initializeTiles()
      useRoundStore.getState().resetRound()
      useRoundStore.setState({ history: [], pendingHistory: null })
      useDeckStore.getState().initializeDeck()
      useRoundStore.getState().dealHand1()
      set({ phase: 'betting', score: 0, roundNumber: 1 })
    },

    nextRound: () => {
      useRoundStore.getState().resetRound()
      const success = useRoundStore.getState().dealHand1()
      if (!success) {
        get().endGame()
        return
      }
      set((state) => ({ roundNumber: state.roundNumber + 1, phase: 'betting' }))
    },

    recordRoundResult: (result) => {
      if (result === 'win') {
        set((state) => ({ score: state.score + 1 }))
      }

      // Check game over conditions: any tile at 0 or 10
      const tiles = Object.values(useTileStore.getState().tiles)
      const tileBreached = tiles.some(
        (t) => t.currentValue <= 0 || t.currentValue >= 10
      )

      if (tileBreached) {
        get().endGame()
        return
      }

      set({ phase: 'reveal' })
    },

    endGame: () => {
      set({ phase: 'game-over' })
    },
  }))