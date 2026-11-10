import React, { useState } from 'react';
import { Search, SlidersHorizontal, Eye, Plus, Check } from 'lucide-react';
import { CrochetPattern, DifficultyLevel, ProjectCategory } from '../types';

interface PatternCatalogProps {
  patterns: CrochetPattern[];
  onSelectPattern: (pattern: CrochetPattern) => void;
  onAddToCart: (pattern: CrochetPattern, type: 'digital' | 'kit') => void;
}

export const PatternCatalog: React.FC<PatternCatalogProps> = ({
  patterns,
  onSelectPattern,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Designs' },
    { id: 'wearables', label: 'Wearables' },
    { id: 'amigurumi', label: 'Amigurumi' },
    { id: 'home', label: 'Home & Living' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const difficulties: { id: string; label: string }[] = [
    { id: 'all', label: 'All Levels' },
    { id: 'Beginner', label: 'Beginner' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Advanced', label: 'Advanced' },
  ];

  const filteredPatterns = patterns.filter((pattern) => {
    const matchesCategory = selectedCategory === 'all' || pattern.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || pattern.difficulty === selectedDifficulty;
    const matchesSearch =
      pattern.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.designer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const handleQuickAdd = (pattern: CrochetPattern, type: 'digital' | 'kit', e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(pattern, type);
    const key = `${pattern.id}-${type}`;
    setAddedItemNotice(key);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 1800);
  };

  return (
    <section id="patterns" className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#EBE5DC] gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5E3D] uppercase tracking-wider mb-2">
              <span>Curated Collection</span>
              <span aria-hidden="true">·</span>
              <span>Instant PDF & Shipped Kits</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#292524] tracking-tight">
              Designer Patterns & Maker Kits
            </h2>
            <p className="text-sm text-[#78716C] mt-2 max-w-xl">
              Each pattern includes detailed round-by-round stitch keys, schematics, full video timestamp notes, and responsive gauge guidance.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
            <input
              type="text"
              placeholder="Search stitches, cardigans, toys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#E0D8CE] rounded-lg text-[#292524] placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#B45309] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#EFECE6] rounded-lg overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap focus:outline-none ${
                  selectedCategory === cat.id
                    ? 'bg-white text-[#292524] shadow-sm font-semibold'
                    : 'text-[#78716C] hover:text-[#292524]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Difficulty Segmented Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#78716C] flex items-center gap-1 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Skill:</span>
            </span>
            <div className="flex items-center gap-1 p-1 bg-[#EFECE6] rounded-lg">
              {difficulties.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap focus:outline-none ${
                    selectedDifficulty === diff.id
                      ? 'bg-white text-[#292524] shadow-sm font-semibold'
                      : 'text-[#78716C] hover:text-[#292524]'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredPatterns.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#D6CEC4] rounded-xl bg-white/50">
            <p className="text-base font-serif text-[#292524]">No patterns found matching your search</p>
            <p className="text-xs text-[#78716C] mt-1">Try clearing your filters or search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-[#B45309] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPatterns.map((pattern) => {
              const noticeKeyDigital = `${pattern.id}-digital`;
              const noticeKeyKit = `${pattern.id}-kit`;

              return (
                <div
                  key={pattern.id}
                  onClick={() => onSelectPattern(pattern)}
                  className="group bg-white rounded-xl border border-[#E5DFD5] overflow-hidden hover:border-[#D0C5B7] hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Card Image Slot (4:3 aspect ratio) */}
                  <div className="relative aspect-[4/3] bg-[#EFECE6] overflow-hidden">
                    <img
                      src={pattern.image}
                      alt={pattern.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Quick View Overlay Button */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#292524] bg-white/95 rounded-lg shadow-sm backdrop-blur-sm pointer-events-auto">
                        <Eye className="w-3.5 h-3.5 text-[#B45309]" />
                        <span>View Instructions</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
                      <div className="flex items-center gap-2 text-xs text-[#78716C] mb-2 font-medium">
                        <span className="capitalize">{pattern.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{pattern.difficulty}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">~{pattern.estimatedHours}h</span>
                      </div>

                      <h3 className="text-lg font-serif font-semibold text-[#292524] group-hover:text-[#B45309] transition-colors leading-snug">
                        {pattern.title}
                      </h3>

                      <p className="text-xs text-[#57534E] mt-1.5 line-clamp-2 leading-relaxed">
                        {pattern.subtitle}
                      </p>

                      {/* Technical specifications */}
                      <div className="mt-3 pt-3 border-t border-[#F0EBE3] grid grid-cols-2 gap-2 text-[11px] text-[#78716C]">
                        <div>
                          <span className="font-medium text-[#44403C]">Hook: </span>
                          <span>{pattern.hookSize.split('(')[0]}</span>
                        </div>
                        <div className="truncate">
                          <span className="font-medium text-[#44403C]">Yarn: </span>
                          <span>{pattern.yarnWeight.split('(')[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Purchase Actions */}
                    <div className="mt-5 pt-4 border-t border-[#EBE5DC] flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[11px] text-[#78716C]">Digital PDF</div>
                        <div className="text-sm font-semibold font-serif text-[#292524] tabular-nums">
                          ${pattern.priceDigital.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quick Add Digital Pattern */}
                        <button
                          onClick={(e) => handleQuickAdd(pattern, 'digital', e)}
                          title="Add digital PDF pattern to bag"
                          className="px-2.5 py-1.5 text-xs font-medium text-[#292524] bg-[#EFECE6] hover:bg-[#E2DDD3] rounded-lg transition-colors flex items-center gap-1 focus:outline-none"
                        >
                          {addedItemNotice === noticeKeyDigital ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 text-[#8C5E3D]" />
                              <span>Pattern</span>
                            </>
                          )}
                        </button>

                        {/* Quick Add Maker Kit */}
                        <button
                          onClick={(e) => handleQuickAdd(pattern, 'kit', e)}
                          title="Add complete maker kit with organic wool to bag"
                          className="px-2.5 py-1.5 text-xs font-medium text-white bg-[#B45309] hover:bg-[#92400E] rounded-lg transition-colors flex items-center gap-1 focus:outline-none"
                        >
                          {addedItemNotice === noticeKeyKit ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <span>Kit ${pattern.priceKit.toFixed(0)}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
