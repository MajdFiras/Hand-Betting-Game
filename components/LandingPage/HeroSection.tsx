export default function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">

    

      {/* Title */}
      <div
        className="animate-fade-in-up flex flex-col items-center leading-none"
        style={{ animationDelay: '0.15s' }}
      >
        <h1 className="text-[5.5rem] sm:text-[8rem] font-black tracking-tight text-gold">
          Hand
        </h1>
        <h1 className="text-[5.5rem] sm:text-[8rem] font-black tracking-tight text-white -mt-4 sm:-mt-6">
          Bet
        </h1>
      </div>

      {/* Divider */}
      <div
        className="animate-fade-in-up w-24 h-px bg-gradient-to-r from-transparent via-red-700/60 to-transparent"
        style={{ animationDelay: '0.25s' }}
      />

      {/* Subtitle */}
      <p
        className="animate-fade-in-up text-lg sm:text-xl text-stone-400 max-w-sm leading-relaxed"
        style={{ animationDelay: '0.3s' }}
      >
        Two hands are dealt. You call it —
        {' '}<span className="text-red-400 font-semibold">higher</span>
        {' '}or{' '}
        <span className="text-sky-400 font-semibold">lower</span>.
        {' '}Every round raises the stakes.
      </p>

    </div>
  )
}
