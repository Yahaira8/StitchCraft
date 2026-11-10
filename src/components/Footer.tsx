import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-[#EBE5DC] pt-16 pb-12 text-[#57534E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F0EBE3]">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#292524] tracking-tight">
              StitchCraft
            </h3>
            <p className="text-xs text-[#78716C] leading-relaxed max-w-sm">
              An artisanal crochet studio and pattern house dedicated to slow fashion, tactile living, and meditative needlework. Every stitch is a deliberate pause.
            </p>
            <div className="text-[11px] text-[#A8A29E] pt-2">
              All wool is sourced from small regenerative farms in the Peruvian highlands.
            </div>
          </div>

          {/* Quick Studio Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-[#292524] uppercase tracking-wider">
              Studio Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#78716C]">
              <li>
                <button
                  onClick={() => onNavigate('patterns')}
                  className="hover:text-[#B45309] transition-colors focus:outline-none"
                >
                  Heirloom Wearables
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('patterns')}
                  className="hover:text-[#B45309] transition-colors focus:outline-none"
                >
                  Amigurumi Creatures
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('patterns')}
                  className="hover:text-[#B45309] transition-colors focus:outline-none"
                >
                  Waffle & Blanket Textures
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kits')}
                  className="hover:text-[#B45309] transition-colors focus:outline-none"
                >
                  Complete Maker Wool Kits
                </button>
              </li>
            </ul>
          </div>

          {/* Maker Tools */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-[#292524] uppercase tracking-wider">
              Digital Maker Tools
            </h4>
            <ul className="space-y-2 text-xs text-[#78716C]">
              <li>
                <button
                  onClick={() => onNavigate('row-counter')}
                  className="hover:text-[#B45309] transition-colors focus:outline-none"
                >
                  Interactive Row & Round Counter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('yarn-tools')}
                  className="hover:text-[#B45309] transition-colors focus:outline-none"
                >
                  Gauge Swatch & Tension Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('yarn-tools')}
                  className="hover:text-[#B45309] transition-colors focus:outline-none"
                >
                  Yarn Skein & Yardage Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('stitch-guide')}
                  className="hover:text-[#B45309] transition-colors focus:outline-none"
                >
                  US & UK Terminology Encyclopedia
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8A29E] gap-4">
          <p>© {new Date().getFullYear()} StitchCraft Studio. Handcrafted for Yahaira Papin.</p>
          <div className="flex items-center gap-1 text-[#78716C]">
            <span>Crafted with patience and wool</span>
            <Heart className="w-3.5 h-3.5 text-[#B45309] fill-[#B45309]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
