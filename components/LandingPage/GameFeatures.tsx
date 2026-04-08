const features = [
  {
    icon: '🎯',
    title: 'One Guess',
    description:
      'Study the first hand, make your call, then watch the second hand reveal itself. Higher or lower — you decide.',
  },
  {
    icon: '🐉',
    title: 'Living Tiles',
    description:
      'Dragon and Wind tiles shift in value as the game progresses. Win streaks push them up. Losses drag them down.',
  },
  {
    icon: '💀',
    title: 'Push the Limit',
    description:
      'Force any tile to 0 or 10 and the game ends instantly. The deck reshuffles twice before you truly run out.',
  },
]

export default function GameFeatures() {
  return (
    <div
      className="animate-fade-in-up grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl"
      style={{ animationDelay: '0.4s' }}
    >
      {features.map((f) => (
        <div
          key={f.title}
          className="group flex flex-col gap-3 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-sm hover:bg-white/[0.07] hover:border-red-700/30 transition-all duration-300"
        >
          <span className="text-2xl">{f.icon}</span>
          <h3 className="font-bold text-white text-sm tracking-wide uppercase">
            {f.title}
          </h3>
          <p className="text-sm text-stone-400 leading-relaxed">{f.description}</p>
        </div>
      ))}
    </div>
  )
}
