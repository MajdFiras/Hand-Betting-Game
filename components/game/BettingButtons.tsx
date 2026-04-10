interface BettingButtonsProps {
  onGuess: (guess: 'higher' | 'lower') => void
}

export default function BettingButtons({ onGuess }: BettingButtonsProps) {
  return (
    <div className="flex gap-3 w-full max-w-xs sm:max-w-none sm:w-[22rem] px-2 sm:px-0">
      <button
        onClick={() => onGuess('higher')}
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
        onClick={() => onGuess('lower')}
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
  )
}
