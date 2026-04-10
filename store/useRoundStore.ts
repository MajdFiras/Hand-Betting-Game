import {create} from "zustand";
import type  {Guess, RoundResult, RoundHistoryEntry, TileSnapshot} from "@/types/game";
import { useTileStore } from "./useTileStore";
import { useDeckStore } from "./useDeckStore";

interface RoundStore {
    hand1Ids : string[]
    hand2Ids : string[]
    guess : Guess | null
    result : RoundResult | null
    hand1Total : number
    hand2Total : number
    history: RoundHistoryEntry[]
    pendingHistory: RoundHistoryEntry | null
    dealHand1 : ()=>boolean
    setGuess : (guess : Guess) => void
    dealHand2 : ()=>boolean
    resolveRound: ()=> RoundResult
    resetRound: () => void
}

function calcTotal(ids :string[]): number {
 const {getTile} = useTileStore.getState()
 return ids.reduce((sum,id) => {
    const tile = getTile(id)
    return sum + (tile?.currentValue ?? 0)
 },0) 
}

export const useRoundStore = create<RoundStore>((set,get)=>({
  hand1Ids : [],
  hand2Ids : [],
  guess: null,
  result: null,
  hand1Total: 0,
  hand2Total: 0,
  history: [],
  pendingHistory: null,


  dealHand1: ()=> {
    const drawn = useDeckStore.getState().drawTiles(3)
    if (drawn.length === 0) return false
    set({
        hand1Ids : drawn,
        hand1Total: calcTotal(drawn),
        hand2Ids: [],
        hand2Total: 0,
        guess: null,
        result: null
    })
    return true
  },
  setGuess : (guess)=> {
    set({guess})
  },
  dealHand2 : ()=> {
    const drawn = useDeckStore.getState().drawTiles(3)
    if(drawn.length === 0) return false
    set({hand2Ids: drawn, hand2Total: calcTotal(drawn)})
    return true
  },
    resolveRound: () => {
    const { hand1Total, hand2Total, guess, hand1Ids, hand2Ids } = get()
    const { updateTileValue, getTile } = useTileStore.getState()

    // Snapshot tile values BEFORE any mutation so history shows the values
    // that were actually used to compute the totals
    const snapshot = (ids: string[]): TileSnapshot[] =>
      ids.map((id) => {
        const t = getTile(id)!
        return { id, type: t.type, value: t.currentValue }
      })

    let result: RoundResult
    if (hand1Total === hand2Total) {
      result = 'draw'
    } else if (
      (guess === 'higher' && hand2Total > hand1Total) ||
      (guess === 'lower' && hand2Total < hand1Total)
    ) {
      result = 'win'
    } else {
      result = 'lose'
    }

    if (result !== 'draw') {
      const delta = result === 'win' ? 1 : -1
      for (const id of [...hand1Ids, ...hand2Ids]) {
        const tile = getTile(id)
        if (tile?.type === 'dragon' || tile?.type === 'wind') {
          updateTileValue(id, delta)
        }
      }
    }

    set({
      result,
      pendingHistory: {
        hand1: snapshot(hand1Ids),
        hand2: snapshot(hand2Ids),
        hand1Total,
        hand2Total,
        result,
      },
    })
    return result
  },
  resetRound : ()=> {
    const { hand1Ids, hand2Ids, pendingHistory, history } = get()
    const played = [...hand1Ids, ...hand2Ids]
    if (played.length > 0) useDeckStore.getState().discardTiles(played)
    set({
        hand1Ids: [],
        hand2Ids: [],
        guess: null,
        result: null,
        hand1Total: 0,
        hand2Total: 0,
        pendingHistory: null,
        history: pendingHistory ? [...history, pendingHistory] : history,
    })
  },


}))