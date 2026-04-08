import { create } from 'zustand'
  import { persist } from 'zustand/middleware'
  import type { LeaderboardEntry } from '@/types/game'

  interface LeaderboardStore {
    entries: LeaderboardEntry[]
    addEntry: (entry: LeaderboardEntry) => void
    getTopEntries: (n?: number) => LeaderboardEntry[]
    clearEntries: () => void
  }

  export const useLeaderboardStore = create<LeaderboardStore>()(
    persist(
      (set, get) => ({
        entries: [],

        addEntry: (entry) => {
          set((state) => {
            const updated = [...state.entries, entry]
              .sort((a, b) => b.score - a.score)
              .slice(0, 10)
            return { entries: updated }
          })
        },

        getTopEntries: (n = 5) => {
          return get().entries.slice(0, n)
        },

        clearEntries: () => set({ entries: [] }),
      }),
      {
        name: 'leaderboard',
      }
    )
  )