import React, { useState } from 'react';
import { X, Check, ShoppingBag, Download, ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react';
import { CrochetPattern } from '../types';

interface PatternModalProps {
  pattern: CrochetPattern | null;
  onClose: () => void;
  onAddToCart: (pattern: CrochetPattern, type: 'digital' | 'kit', colorScheme?: string, includeHook?: boolean) => void;
  onLoadIntoCounter: (pattern: CrochetPattern) => void;
}

export const PatternModal: React.FC<PatternModalProps> = ({
  pattern,
  onClose,
  onAddToCart,
  onLoadIntoCounter,
}) => {
  const [activeTab, setActiveTab] = useState<'instructions' | 'materials' | 'kit-options'>('instructions');
  const [selectedColor, setSelectedColor] = useState<string>('Terracotta Hearth');
  const [includeHook, setIncludeHook] = useState<boolean>(true);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  if (!pattern) return null;

  const colorPalettes = [
    { name: 'Terracotta Hearth', hex: '#B45309', desc: 'Warm rust, spiced honey & unspun cream' },
    { name: 'Forest Sage', hex: '#4D6B53', desc: 'Muted moss, eucalyptus & oatmeal' },
    { name: 'Coastal Ecru', hex: '#D6C7B2', desc: 'Raw unbleached linen & soft sand' },
  ];

  const handleAdd = (type: 'digital' | 'kit') => {
    onAddToCart(pattern, type, selectedColor, includeHook);
    setAddedNotice(type === 'digital' ? 'Digital Pattern added to bag!' : 'Maker Kit added to bag!');
    setTimeout(() => {
      setAddedNotice(null);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#FAF7F2] rounded-2xl max-w-4xl w-full border border-[#E0D8CE] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-white border-b border-[#EBE5DC] flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#78716C]">
              <span className="font-semibold uppercase tracking-wider text-[#8C5E3D]">{pattern.category}</span>
              <span aria-hidden="true">·</span>
              <span>By {pattern.designer}</span>
              <span aria-hidden="true">·</span>
              <span>{pattern.difficulty}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-[#292524] mt-0.5">{pattern.title}</h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-[#78716C] hover:text-[#292524] hover:bg-[#F3EFE9] rounded-lg transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Product Image & Spec Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl overflow-hidden border border-[#E0D8CE] aspect-[4/3] bg-[#EFECE6]">
                <img
                  src={pattern.image}
                  alt={pattern.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Technical Specifications Spec Sheet */}
              <div className="bg-white rounded-xl p-4 border border-[#EBE5DC] text-xs space-y-2.5">
                <div className="text-[11px] font-semibold text-[#8C5E3D] uppercase tracking-wider border-b border-[#F0ECE4] pb-2">
                  Pattern Specifications
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Hook Size:</span>
                  <span className="font-medium text-[#292524] text-right">{pattern.hookSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Yarn Weight:</span>
                  <span className="font-medium text-[#292524] text-right">{pattern.yarnWeight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Yardage Req:</span>
                  <span className="font-medium text-[#292524] text-right">{pattern.yardage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Time to Finish:</span>
                  <span className="font-medium text-[#292524] text-right tabular-nums">~{pattern.estimatedHours} hours</span>
                </div>
              </div>

              {/* Send to Live Row Counter button */}
              <button
                onClick={() => onLoadIntoCounter(pattern)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-[#292524] bg-[#EFECE6] hover:bg-[#E2DDD3] rounded-xl transition-colors border border-[#DDD6CB] flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#8C5E3D]" />
                <span>Track This Pattern in Row Counter</span>
              </button>
            </div>

            {/* Right: Tabs & Detailed Pattern Content */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <p className="text-sm text-[#57534E] leading-relaxed mb-6">
                  {pattern.description}
                </p>

                {/* Tabs */}
                <div className="flex items-center gap-1 p-1 bg-[#EFECE6] rounded-lg mb-6">
                  <button
                    onClick={() => setActiveTab('instructions')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                      activeTab === 'instructions'
                        ? 'bg-white text-[#292524] shadow-sm font-semibold'
                        : 'text-[#78716C] hover:text-[#292524]'
                    }`}
                  >
                    Instructions Preview
                  </button>
                  <button
                    onClick={() => setActiveTab('materials')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                      activeTab === 'materials'
                        ? 'bg-white text-[#292524] shadow-sm font-semibold'
                        : 'text-[#78716C] hover:text-[#292524]'
                    }`}
                  >
                    Materials & Skills
                  </button>
                  <button
                    onClick={() => setActiveTab('kit-options')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                      activeTab === 'kit-options'
                        ? 'bg-white text-[#292524] shadow-sm font-semibold'
                        : 'text-[#78716C] hover:text-[#292524]'
                    }`}
                  >
                    Maker Kit Bundle
                  </button>
                </div>

                {/* Tab 1: Instructions Preview */}
                {activeTab === 'instructions' && (
                  <div className="space-y-4">
                    <div className="bg-[#FAF4ED] p-3 rounded-lg border border-[#E9DC handle] text-xs text-[#8C5E3D]">
                      <span className="font-semibold">Stitch Key (US Terms): </span>
                      <span>{pattern.stitchKey}</span>
                    </div>

                    <div className="space-y-4">
                      {pattern.sampleInstructions.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-4 border border-[#EAE3D9]">
                          <h4 className="text-xs font-semibold text-[#292524] uppercase tracking-wider mb-3">
                            {section.sectionName}
                          </h4>
                          <div className="space-y-2.5 text-xs">
                            {section.rows.map((row, rIdx) => (
                              <div key={rIdx} className="grid grid-cols-12 gap-2 pb-2 border-b border-[#F5F2EB] last:border-0 last:pb-0">
                                <span className="col-span-3 font-semibold text-[#8C5E3D]">{row.rowNumber}</span>
                                <span className="col-span-6 text-[#44403C]">{row.text}</span>
                                <span className="col-span-3 text-right text-[#78716C] italic font-mono">{row.stitchCount}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Materials & Skills */}
                {activeTab === 'materials' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-5 border border-[#EAE3D9]">
                      <h4 className="text-xs font-semibold text-[#292524] uppercase tracking-wider mb-3">
                        Included Materials in Maker Kit
                      </h4>
                      <ul className="space-y-2 text-xs text-[#57534E]">
                        {pattern.materials.map((mat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                            <span>{mat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl p-5 border border-[#EAE3D9]">
                      <h4 className="text-xs font-semibold text-[#292524] uppercase tracking-wider mb-3">
                        Techniques Utilized
                      </h4>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {pattern.techniques.map((tech, i) => (
                          <span
                            key={i}
                            className="bg-[#FAF7F2] text-[#44403C] border border-[#E0D8CE] px-2.5 py-1 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Kit Customization */}
                {activeTab === 'kit-options' && (
                  <div className="space-y-5">
                    <div className="bg-white rounded-xl p-5 border border-[#EAE3D9]">
                      <h4 className="text-xs font-semibold text-[#292524] uppercase tracking-wider mb-3">
                        Select Artisan Yarn Palette
                      </h4>
                      <div className="space-y-2.5">
                        {colorPalettes.map((cp) => (
                          <label
                            key={cp.name}
                            onClick={() => setSelectedColor(cp.name)}
                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedColor === cp.name
                                ? 'border-[#B45309] bg-[#FAF4ED]'
                                : 'border-[#EAE3D9] hover:bg-[#FAF7F2]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="w-5 h-5 rounded-full border border-black/10 shrink-0"
                                style={{ backgroundColor: cp.hex }}
                              />
                              <div>
                                <p className="text-xs font-semibold text-[#292524]">{cp.name}</p>
                                <p className="text-[11px] text-[#78716C]">{cp.desc}</p>
                              </div>
                            </div>
                            <input
                              type="radio"
                              name="colorScheme"
                              checked={selectedColor === cp.name}
                              onChange={() => setSelectedColor(cp.name)}
                              className="accent-[#B45309]"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-[#EAE3D9]">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="text-xs">
                          <p className="font-semibold text-[#292524]">Add Handcrafted Beechwood Hook</p>
                          <p className="text-[#78716C] text-[11px]">Silky ergonomic handle sized for this project (+$8.00)</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={includeHook}
                          onChange={(e) => setIncludeHook(e.target.checked)}
                          className="w-4 h-4 rounded text-[#B45309] accent-[#B45309]"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Contiguous Purchase Module */}
              <div className="mt-8 pt-6 border-t border-[#EBE5DC]">
                {addedNotice && (
                  <div className="mb-3 px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{addedNotice}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Digital PDF Buy Button */}
                  <button
                    onClick={() => handleAdd('digital')}
                    className="p-3 bg-white border border-[#DDD6CB] hover:border-[#B45309] hover:bg-[#FAF4ED] rounded-xl transition-all text-left flex items-center justify-between group focus:outline-none"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-[#78716C]">
                        <Download className="w-3.5 h-3.5 text-[#8C5E3D]" />
                        <span>Instant PDF Pattern</span>
                      </div>
                      <div className="text-base font-serif font-bold text-[#292524] mt-0.5 tabular-nums">
                        ${pattern.priceDigital.toFixed(2)}
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#8C5E3D] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Add to Bag <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  {/* Maker Kit Buy Button */}
                  <button
                    onClick={() => handleAdd('kit')}
                    className="p-3 bg-[#B45309] hover:bg-[#92400E] text-white rounded-xl transition-all text-left flex items-center justify-between group focus:outline-none shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-amber-200">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Complete Maker Kit</span>
                      </div>
                      <div className="text-base font-serif font-bold text-white mt-0.5 tabular-nums">
                        ${(pattern.priceKit + (includeHook ? 8 : 0)).toFixed(2)}
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-white group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Order Kit <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
