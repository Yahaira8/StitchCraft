import React, { useState } from 'react';
import { BookOpen, Globe, Lightbulb, ChevronRight } from 'lucide-react';
import { STITCH_LIBRARY } from '../data/crochetData';
import { StitchGuideItem } from '../types';

export const StitchGuide: React.FC = () => {
  const [selectedStitch, setSelectedStitch] = useState<StitchGuideItem>(STITCH_LIBRARY[0]);
  const [termSystem, setTermSystem] = useState<'US' | 'UK'>('US');

  return (
    <section id="stitch-guide" className="py-16 sm:py-20 bg-[#F5F2EB] border-b border-[#EBE5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#EBE5DC] gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5E3D] uppercase tracking-wider mb-2">
              <span>Craft Encyclopedia</span>
              <span aria-hidden="true">·</span>
              <span>Visual Anatomy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#292524] tracking-tight">
              Interactive Stitch Library
            </h2>
            <p className="text-sm text-[#78716C] mt-2 max-w-xl">
              Understand the mechanics behind every loop. Toggle effortlessly between North American (US) and British/Commonwealth (UK) crochet conventions.
            </p>
          </div>

          {/* US vs UK Terminology Switcher */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#E0D8CE] shadow-xs self-start sm:self-auto">
            <Globe className="w-4 h-4 text-[#8C5E3D] ml-2" />
            <span className="text-xs font-medium text-[#78716C] mr-1">Terms:</span>
            <button
              onClick={() => setTermSystem('US')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                termSystem === 'US'
                  ? 'bg-[#B45309] text-white shadow-xs'
                  : 'text-[#78716C] hover:text-[#292524]'
              }`}
            >
              US Terms
            </button>
            <button
              onClick={() => setTermSystem('UK')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                termSystem === 'UK'
                  ? 'bg-[#B45309] text-white shadow-xs'
                  : 'text-[#78716C] hover:text-[#292524]'
              }`}
            >
              UK Terms
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Stitch Navigation Menu */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E5DFD5] shadow-sm space-y-2">
            <div className="text-[11px] font-semibold text-[#8C5E3D] uppercase tracking-wider px-3 py-1">
              Select Stitch To Inspect
            </div>
            {STITCH_LIBRARY.map((item) => {
              const isSelected = item.id === selectedStitch.id;
              const displayName = termSystem === 'US' ? item.nameUS : item.nameUK;
              const displayAbbr = termSystem === 'US' ? item.abbrUS : item.abbrUK;

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedStitch(item)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group focus:outline-none ${
                    isSelected
                      ? 'bg-[#FAF4ED] border-[#B45309] shadow-xs'
                      : 'bg-white border-[#EAE3D9] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <div>
                    <p className={`text-xs font-semibold ${isSelected ? 'text-[#B45309]' : 'text-[#292524]'}`}>
                      {displayName}
                    </p>
                    <p className="text-[11px] text-[#78716C] mt-0.5">
                      Abbr: <span className="font-mono font-medium text-[#44403C]">{displayAbbr}</span> · {item.difficulty}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#B45309] translate-x-1' : 'text-[#A8A29E] group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Selected Stitch Breakdown */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD5] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EBE5DC] gap-2">
              <div>
                <span className="text-xs font-semibold text-[#8C5E3D] uppercase tracking-wider">
                  {selectedStitch.difficulty} Technique
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#292524] font-bold mt-1">
                  {termSystem === 'US' ? selectedStitch.nameUS : selectedStitch.nameUK}
                </h3>
              </div>

              {/* Equivalence Tag */}
              <div className="text-xs text-[#78716C] bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#E0D8CE] self-start sm:self-auto">
                <span className="font-medium">Notation in {termSystem === 'US' ? 'UK' : 'US'}: </span>
                <span className="font-serif font-bold text-[#292524]">
                  {termSystem === 'US' ? selectedStitch.nameUK : selectedStitch.nameUS}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#57534E] leading-relaxed my-6">
              {selectedStitch.description}
            </p>

            {/* Step-by-Step Execution */}
            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-semibold text-[#292524] uppercase tracking-wider">
                Step-by-Step Execution
              </h4>
              <div className="space-y-3">
                {selectedStitch.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9]">
                    <span className="w-6 h-6 rounded-full bg-[#B45309] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-[#292524] leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip Callout */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#B45309]">Master Artisan Tip: </span>
                <span>{selectedStitch.proTip}</span>
              </div>
            </div>

            {/* Ideal Usage */}
            <div className="mt-4 pt-4 border-t border-[#F0ECE4] text-xs text-[#78716C]">
              <span className="font-medium text-[#292524]">Best Suited For: </span>
              <span>{selectedStitch.idealFor}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
