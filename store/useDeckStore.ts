import { create } from 'zustand'
import { useTileStore } from './useTileStore'

  interface DeckStore {
    drawPile: string[]
    discardPile: string[]
    reshuffleCount: number
    initializeDeck: () => void
    drawTiles: (n: number) => string[]
    discardTiles: (ids: string[]) => void
    reshuffle: () => void
  }

  function shuffle<T>(array: T[]): T[] {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr          // 3rd time running out — game over signal
[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  export const useDeckStore = create<DeckStore>((set, get) => ({
    drawPile: [],
    discardPile: [],
    reshuffleCount: 0,

    initializeDeck: () => {
      const allIds = Object.keys(useTileStore.getState().tiles)
      set({
        drawPile: shuffle(allIds),
        discardPile: [],
        reshuffleCount: 0,
      })
    },

    drawTiles: (n) => {
      const { drawPile, reshuffle, reshuffleCount } = get()

      if (drawPile.length < n) {
        if (reshuffleCount >= 2) {
          // 3rd time running out — game over signal
          return []
        }
        reshuffle()
      }

      const drawn = get().drawPile.slice(0, n)
      set((state) => ({ drawPile: state.drawPile.slice(n) }))
      return drawn
    },

    discardTiles: (ids) => {
      set((state) => ({
        discardPile: [...state.discardPile, ...ids],
      }))
    },

    reshuffle: () => {
      const { discardPile, reshuffleCount } = get()
      const freshDeck = Object.keys(useTileStore.getState().tiles)
      const combined = shuffle([...freshDeck, ...discardPile])
      set({
        drawPile: combined,
        discardPile: [],
        reshuffleCount: reshuffleCount + 1,
      })
    },
  }))