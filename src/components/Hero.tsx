import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/crochetData';

interface HeroProps {
  onExplore: () => void;
  onOpenCounter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenCounter }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-[#EBE5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5E3D] tracking-wider uppercase mb-4">
              <span>Artisan Crochet Studio</span>
              <span aria-hidden="true">·</span>
              <span>Slow Fiber Crafts</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2024</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#292524] tracking-tight leading-[1.12] mb-6 [text-wrap:balance]">
              Thoughtful stitches for modern makers.
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-8 max-w-xl">
              Elevate your crochet practice with clear, size-inclusive patterns, curated organic wool kits, and digital studio tools designed for a calmer craft flow.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#B45309] hover:bg-[#92400E] rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B45309] focus:ring-offset-2 whitespace-nowrap"
              >
                <span>Browse Pattern Library</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCounter}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#292524] bg-[#EFECE6] hover:bg-[#E5E0D8] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#B45309] whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-[#8C5E3D]" />
                <span>Open Row Counter</span>
              </button>
            </div>

            {/* Quiet craft values - unboxed text */}
            <div className="mt-12 pt-8 border-t border-[#EBE5DC] grid grid-cols-3 gap-6">
              <div>
                <p className="text-xl sm:text-2xl font-serif font-semibold text-[#292524] tabular-nums">48+</p>
                <p className="text-xs text-[#78716C] mt-0.5">Motifs & Patterns</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-semibold text-[#292524] tabular-nums">100%</p>
                <p className="text-xs text-[#78716C] mt-0.5">Peruvian Wool & Cotton</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-semibold text-[#292524] tabular-nums">US & UK</p>
                <p className="text-xs text-[#78716C] mt-0.5">Dual Term Notation</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Hero Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E0D8CE] shadow-sm bg-[#EDE8E1] aspect-[16/10] sm:aspect-[16/11]">
              <img
                src={HERO_IMAGE}
                alt="Modern artisanal crochet studio with textured chunky blanket, wooden hooks, and yarn skeins"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs px-3 py-2 rounded-lg bg-[#292524]/75 backdrop-blur-sm border border-white/10">
                <span className="font-medium">Studio Collection — Waffle Throw & Botanical Knit</span>
                <span className="text-stone-300">Handcrafted in Natural Fibers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
