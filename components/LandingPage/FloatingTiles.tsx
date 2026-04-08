const tiles = [
  { emoji: '🀄', top: '7%',  left: '5%',  size: '4.5rem', duration: '8s',   delay: '0s'   },
  { emoji: '🀄', top: '12%', left: '88%', size: '3.5rem', duration: '10s',  delay: '1.2s' },
  { emoji: '🀆', top: '58%', left: '3%',  size: '3.2rem', duration: '9s',   delay: '2.5s' },
  { emoji: '🀇', top: '78%', left: '87%', size: '3.8rem', duration: '7.5s', delay: '0.8s' },
  { emoji: '🀏', top: '42%', left: '94%', size: '2.8rem', duration: '11s',  delay: '3.2s' },
  { emoji: '🀙', top: '88%', left: '12%', size: '3rem',   duration: '8.5s', delay: '1.8s' },
  { emoji: '🀡', top: '28%', left: '1%',  size: '2.6rem', duration: '9.5s', delay: '2s'   },
  { emoji: '🀀', top: '92%', left: '72%', size: '4rem',   duration: '7.2s', delay: '0.4s' },
  { emoji: '🀁', top: '4%',  left: '52%', size: '3rem',   duration: '10.5s',delay: '3.8s' },
  { emoji: '🀃', top: '52%', left: '78%', size: '2.4rem', duration: '8.2s', delay: '4.2s' },
  { emoji: '🀈', top: '70%', left: '48%', size: '2.2rem', duration: '12s',  delay: '5s'   },
  { emoji: '🀛', top: '22%', left: '70%', size: '2rem',   duration: '9.8s', delay: '1.5s' },
]

export default function FloatingTiles() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {tiles.map((tile, i) => (
        <span
          key={i}
          className="absolute animate-float"
          style={{
            top: tile.top,
            left: tile.left,
            fontSize: tile.size,
            opacity: 0.1,
            '--float-duration': tile.duration,
            animationDelay: tile.delay,
            filter: 'drop-shadow(0 0 12px rgba(185,28,28,0.3))',
          } as React.CSSProperties}
        >
          {tile.emoji}
        </span>
      ))}
    </div>
  )
}
