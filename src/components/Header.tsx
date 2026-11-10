import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ cart, onOpenCart, onNavigate, activeSection }) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE5DC] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => onNavigate('hero')}
            className="text-2xl font-serif tracking-tight text-[#292524] hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0 text-left focus:outline-none"
          >
            StitchCraft
          </button>

          {/* Zone 2: 4-5 Clean Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#57534E]">
            <button
              onClick={() => onNavigate('patterns')}
              className={`hover:text-[#292524] transition-colors whitespace-nowrap shrink-0 focus:outline-none ${
                activeSection === 'patterns' ? 'text-[#B45309] font-semibold' : ''
              }`}
            >
              Patterns
            </button>
            <button
              onClick={() => onNavigate('kits')}
              className={`hover:text-[#292524] transition-colors whitespace-nowrap shrink-0 focus:outline-none ${
                activeSection === 'kits' ? 'text-[#B45309] font-semibold' : ''
              }`}
            >
              Maker Kits
            </button>
            <button
              onClick={() => onNavigate('row-counter')}
              className={`hover:text-[#292524] transition-colors whitespace-nowrap shrink-0 focus:outline-none ${
                activeSection === 'row-counter' ? 'text-[#B45309] font-semibold' : ''
              }`}
            >
              Row Counter
            </button>
            <button
              onClick={() => onNavigate('yarn-tools')}
              className={`hover:text-[#292524] transition-colors whitespace-nowrap shrink-0 focus:outline-none ${
                activeSection === 'yarn-tools' ? 'text-[#B45309] font-semibold' : ''
              }`}
            >
              Yarn Tools
            </button>
            <button
              onClick={() => onNavigate('stitch-guide')}
              className={`hover:text-[#292524] transition-colors whitespace-nowrap shrink-0 focus:outline-none ${
                activeSection === 'stitch-guide' ? 'text-[#B45309] font-semibold' : ''
              }`}
            >
              Stitch Guide
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenCart}
              aria-label="View shopping bag"
              className="group relative flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#292524] hover:bg-[#44403C] rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#B45309] whitespace-nowrap shrink-0 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-[#FAF7F2]" />
              <span>Bag</span>
              {totalItems > 0 && (
                <span className="ml-1 text-[11px] font-bold tabular-nums bg-[#B45309] text-white px-1.5 py-0.2 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
