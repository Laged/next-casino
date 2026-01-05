import { Club, Diamond, Heart, Spade } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-casino-gradient">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        {/* Card Suits Animation */}
        <div className="flex gap-4 mb-8">
          <Spade className="w-12 h-12 text-white animate-pulse" />
          <Heart className="w-12 h-12 text-red-500 animate-pulse delay-100" />
          <Diamond className="w-12 h-12 text-red-500 animate-pulse delay-200" />
          <Club className="w-12 h-12 text-white animate-pulse delay-300" />
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gold-gradient">
          Next Casino
        </h1>

        <p className="text-xl text-gray-400 text-center mb-8 max-w-md">
          Experience the thrill of gaming with our modern casino platform
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <button className="casino-button-gold text-lg px-8 py-3">Play Now</button>
          <button className="casino-button text-lg px-8 py-3">Learn More</button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl">
          <div className="casino-card p-6 hover:glow-green transition-all duration-300">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Spade className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Blackjack</h3>
            <p className="text-gray-400">Classic 21 with perfect strategy support</p>
          </div>

          <div className="casino-card p-6 hover:glow-green transition-all duration-300">
            <div className="w-12 h-12 bg-casino-gold/20 rounded-lg flex items-center justify-center mb-4">
              <Diamond className="w-6 h-6 text-casino-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2">Poker</h3>
            <p className="text-gray-400">Texas Hold&apos;em and more variants</p>
          </div>

          <div className="casino-card p-6 hover:glow-green transition-all duration-300">
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Roulette</h3>
            <p className="text-gray-400">European and American wheel options</p>
          </div>
        </div>

        {/* Chips Display */}
        <div className="flex gap-3 mt-12">
          <div className="casino-chip bg-casino-chip-red">5</div>
          <div className="casino-chip bg-casino-chip-blue">25</div>
          <div className="casino-chip bg-casino-chip-green">50</div>
          <div className="casino-chip bg-casino-chip-black">100</div>
          <div className="casino-chip bg-casino-chip-purple">500</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 p-6 text-center text-gray-500">
        <p>Built with Next.js 15, React 19, and Tailwind CSS</p>
      </footer>
    </div>
  );
}
