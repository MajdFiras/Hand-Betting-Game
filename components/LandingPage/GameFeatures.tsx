const features = [
  {
    icon: '🎯',
    title: 'One Guess',
    description:
      'Study the first hand, make your call, then watch the second hand reveal itself. Higher or lower — you decide.',
    accentColor: '240,240,240',
    step: '01',
  },
  {
    icon: '🐉',
    title: 'Living Tiles',
    description:
      'Dragon and Wind tiles shift in value as the game progresses. Win streaks push them up. Losses drag them down.',
    accentColor: '185,28,28',
    step: '02',
  },
  {
    icon: '💀',
    title: 'Push the Limit',
    description:
      'Force any tile to 0 or 10 and the game ends instantly. The deck reshuffles twice before you truly run out.',
    accentColor: '245,158,11',
    step: '03',
  },
]

function FeatureCard({
  icon, title, description, accentColor, step,
}: (typeof features)[number]) {
  const a = accentColor
  return (
    <div
      className="group relative flex flex-col gap-4 p-5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: `linear-gradient(160deg, rgba(${a},0.06) 0%, rgba(255,255,255,0.02) 60%)`,
        border: `1px solid rgba(${a},0.12)`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        // CSS custom prop so pure-CSS hover can use it
        ['--card-glow' as string]: `rgba(${a},0.18)`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: `linear-gradient(90deg, transparent, rgba(${a},0.7), transparent)` }}
      />

      {/* Step number */}
      <span
        className="absolute top-4 right-4 text-[10px] font-black tracking-widest tabular-nums select-none"
        style={{ color: 'rgba(240,240,240,0.1)' }}
      >
        {step}
      </span>

      {/* Icon badge */}
      <div
        className="w-11 h-11 flex items-center justify-center rounded-xl text-2xl shrink-0"
        style={{ background: `rgba(${a},0.1)` }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-bold text-white text-sm tracking-wide uppercase">
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,240,0.45)' }}>
          {description}
        </p>
      </div>
    </div>
  )
}

export default function GameFeatures() {
  return (
    <div
      className="animate-fade-in-up grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl"
      style={{ animationDelay: '0.4s' }}
    >
      {features.map((f) => (
        <FeatureCard key={f.title} {...f} />
      ))}
    </div>
  )
}
