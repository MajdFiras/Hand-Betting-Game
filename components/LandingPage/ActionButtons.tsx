import Link from 'next/link'

export default function ActionButtons() {
  return (
    <div
      className="animate-fade-in-up flex flex-col sm:flex-row gap-4"
      style={{ animationDelay: '0.55s' }}
    >
      <Link
        href="/newgame"
        className="btn-play animate-btn-glow px-10 py-4 rounded-2xl text-lg text-center"
      >
        Play Now
      </Link>

      <Link
        href="/leaderboard"
        className="px-10 py-4 rounded-2xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] hover:border-red-700/50 text-stone-300 hover:text-white font-semibold text-lg text-center backdrop-blur-sm transition-all duration-300"
      >
        Leaderboard
      </Link>
    </div>
  )
}
