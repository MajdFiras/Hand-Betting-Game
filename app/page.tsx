import FloatingTiles from '@/components/LandingPage/FloatingTiles'
import HeroSection from '@/components/LandingPage/HeroSection'
import GameFeatures from '@/components/LandingPage/GameFeatures'
import ActionButtons from '@/components/LandingPage/ActionButtons'

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen gap-12 bg-[#07070f] px-6 py-16 overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="animate-ambient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(185,28,28,0.07) 0%, transparent 70%)' }}
        />
        <div
          className="animate-ambient absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(153,27,27,0.05) 0%, transparent 70%)', animationDelay: '3s' }}
        />
      </div>

      <FloatingTiles />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-3xl">
        <HeroSection />
        <GameFeatures />
        <ActionButtons />
      </div>

    </main>
  )
}
