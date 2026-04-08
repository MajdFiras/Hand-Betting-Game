import {create} from "zustand";
import type {Tile, TileType} from "@/types/game";

interface TileStore {
    tiles : Record<string, Tile>
    initializeTiles: () => void
    updateTileValue: (id: string, delta: number) => void
    getTile: (id: string) => Tile | undefined
}

function buildDeck() : Record<string,Tile> {
    const tiles : Record<string,Tile> = {}
    
    /*
        for the number from 1-9 the value is the same
        in this loop we have two sets of 9 tiles so tiles = 18
    */

    for(let set=0 ; set < 2 ; set++) {
        for(let n=1 ; n <= 9; n++){
            const id = `num-${n}-${set}`
            tiles[id] = {id,type:'number',currentValue:n}
        }
    }

    /*
        for the dragon tiles the value is 5 initially
        in this loop we have 4 tiles so tiles = 4
    */
    const dragonLabels = ['a','b','c','d'];
    for(const label in dragonLabels) {
        const id = `dragon-${label}`
        tiles[id] = {id,type:'dragon',currentValue:5}
    }

    /*
        for the wind tiles the value is 5 initially
        in this loop we have 4 tiles so tiles = 4
    */
    const windLabels = ['a','b','c','d'];
    for(const label in windLabels) {
        const id = `wind-${label}`
        tiles[id] = {id,type:'wind',currentValue:5}
    }
    return tiles
}

export const useTileStore = create<TileStore>((set, get) => ({
    tiles: {},


    /*
        this is the initial state of the game number value is the number itself and dragon or wind value is 5    
    */ 
    initializeTiles: () => {
      set({ tiles: buildDeck() })
    },


    /*
        update the state value after we check if its not null and it not a number tile 
        because the value of the tiles is fixed for numbers and changes in the dragons and winds
     */
    updateTileValue: (id, delta) => {
      set((state) => {
        const tile = state.tiles[id]
        if (!tile || tile.type === 'number') return state
        return {
          tiles: {
            ...state.tiles,
            [id]: { ...tile, currentValue: tile.currentValue + delta },
          },
        }
      })
    },

    /*
        get the tile by id
    */
    getTile: (id) => get().tiles[id],
  }))