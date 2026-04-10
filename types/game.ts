export type TileType = 'number' | 'dragon' | 'wind'

export type GamePhase = 'landing' | 'betting' | 'reveal' | 'game-over'

export type Guess = 'lower' | 'higher'

export type RoundResult = 'win' | 'lose' | 'draw'


export type Tile = {
    id: string
    type: TileType
    currentValue: number
}

export type LeaderboardEntry = {
    name: string
    score: number
    date: string
}

export type TileSnapshot = { id: string; type: TileType; value: number }

export type RoundHistoryEntry = {
    hand1: TileSnapshot[]
    hand2: TileSnapshot[]
    hand1Total: number
    hand2Total: number
    result: RoundResult
}