import React, { useState } from 'react';
import { Calculator, Scale, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { YARN_WEIGHT_CLASSES } from '../data/crochetData';

export const GaugeCalculatorTool: React.FC = () => {
  // Gauge Swatch State
  const [patternSts, setPatternSts] = useState<number>(18);
  const [patternRows, setPatternRows] = useState<number>(20);
  const [mySts, setMySts] = useState<number>(20);
  const [myRows, setMyRows] = useState<number>(22);

  // Skein Estimator State
  const [totalYardageNeeded, setTotalYardageNeeded] = useState<number>(1250);
  const [skeinYardage, setSkeinYardage] = useState<number>(210);
  const [safetyBuffer, setSafetyBuffer] = useState<number>(10); // 10% buffer

  // Calculations
  const stitchDiff = mySts - patternSts;
  const isGaugeExact = stitchDiff === 0;
  const isTensionTight = stitchDiff > 0;
  const isTensionLoose = stitchDiff < 0;

  const totalWithBuffer = Math.ceil(totalYardageNeeded * (1 + safetyBuffer / 100));
  const skeinsNeeded = Math.ceil(totalWithBuffer / (skeinYardage || 1));

  return (
    <section id="yarn-tools" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#EBE5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#8C5E3D] uppercase tracking-wider mb-2">
            <span>Studio Mathematics</span>
            <span aria-hidden="true">·</span>
            <span>Tension & Yardage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#292524] tracking-tight">
            Gauge Swatch & Yarn Calculator
          </h2>
          <p className="text-sm text-[#78716C] mt-2">
            Eliminate sizing guesswork before investing days into a project. Calculate hook adjustments and accurate skein counts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tool 1: Gauge Tension Adjuster */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD5] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5E3D] uppercase tracking-wider mb-1">
                <Calculator className="w-4 h-4" />
                <span>Gauge Swatch Matcher</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#292524] mb-2">
                4-Inch (10cm) Swatch Comparison
              </h3>
              <p className="text-xs text-[#78716C] mb-6">
                Compare your blocked swatch measurements against the pattern designer&apos;s gauge.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Pattern Target */}
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E0D8CE]">
                  <p className="text-xs font-semibold text-[#292524] mb-3">Pattern Gauge</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-[#78716C] mb-1">Stitches in 4&quot;</label>
                      <input
                        type="number"
                        min="5"
                        max="60"
                        value={patternSts}
                        onChange={(e) => setPatternSts(Number(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 text-sm font-semibold bg-white border border-[#DDD6CB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#78716C] mb-1">Rows in 4&quot;</label>
                      <input
                        type="number"
                        min="5"
                        max="60"
                        value={patternRows}
                        onChange={(e) => setPatternRows(Number(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 text-sm font-semibold bg-white border border-[#DDD6CB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                      />
                    </div>
                  </div>
                </div>

                {/* My Measured Swatch */}
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E0D8CE]">
                  <p className="text-xs font-semibold text-[#292524] mb-3">Your Measured Swatch</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-[#78716C] mb-1">Stitches in 4&quot;</label>
                      <input
                        type="number"
                        min="5"
                        max="60"
                        value={mySts}
                        onChange={(e) => setMySts(Number(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 text-sm font-semibold bg-white border border-[#DDD6CB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#78716C] mb-1">Rows in 4&quot;</label>
                      <input
                        type="number"
                        min="5"
                        max="60"
                        value={myRows}
                        onChange={(e) => setMyRows(Number(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 text-sm font-semibold bg-white border border-[#DDD6CB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation Box */}
            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed ${
                isGaugeExact
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : isTensionTight
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-blue-50 border-blue-200 text-blue-900'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {isGaugeExact ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                )}
                <div>
                  <p className="font-semibold text-sm">
                    {isGaugeExact
                      ? 'Spot On Gauge!'
                      : isTensionTight
                      ? `Tension is Tight (+${stitchDiff} sts per 4")`
                      : `Tension is Loose (${stitchDiff} sts per 4")`}
                  </p>
                  <p className="mt-1">
                    {isGaugeExact
                      ? 'Your gauge matches the designer perfectly. Your finished garment will meet the schematic measurements exactly.'
                      : isTensionTight
                      ? 'You have more stitches per 4 inches than intended, so your fabric is tighter and will turn out smaller. Recommendation: Switch to a hook 0.5mm – 1.0mm LARGER and re-swatch.'
                      : 'You have fewer stitches per 4 inches than intended, meaning your stitches are loose and the piece will turn out larger and consume more yarn. Recommendation: Switch to a hook 0.5mm – 1.0mm SMALLER.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tool 2: Skein Quantity & Yardage Estimator */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD5] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5E3D] uppercase tracking-wider mb-1">
                <Scale className="w-4 h-4" />
                <span>Yarn Purchasing Estimator</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#292524] mb-2">
                Skein Quantity Calculator
              </h3>
              <p className="text-xs text-[#78716C] mb-6">
                Calculate total skeins needed with an automatic safety cushion for swatching and ends.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-xs text-[#78716C] mb-1">
                    <span>Pattern Yardage Required</span>
                    <span className="font-semibold text-[#292524] tabular-nums">{totalYardageNeeded} yds</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="3500"
                    step="50"
                    value={totalYardageNeeded}
                    onChange={(e) => setTotalYardageNeeded(Number(e.target.value))}
                    className="w-full accent-[#B45309]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">Yards Per Skein / Ball</label>
                    <input
                      type="number"
                      min="50"
                      max="1000"
                      value={skeinYardage}
                      onChange={(e) => setSkeinYardage(Number(e.target.value) || 1)}
                      className="w-full px-3 py-1.5 text-xs font-semibold bg-[#FAF7F2] border border-[#DDD6CB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">Safety Buffer</label>
                    <select
                      value={safetyBuffer}
                      onChange={(e) => setSafetyBuffer(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs font-semibold bg-[#FAF7F2] border border-[#DDD6CB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                    >
                      <option value="5">5% (Tight fit)</option>
                      <option value="10">10% (Recommended)</option>
                      <option value="15">15% (Extra for fringe/swatch)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Skein Result Display Card */}
            <div className="p-5 bg-[#FAF4ED] rounded-xl border border-[#E9DC handle] flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#8C5E3D] font-semibold uppercase tracking-wider">Purchase Recommendation</p>
                <p className="text-3xl font-serif font-bold text-[#292524] mt-1 tabular-nums">
                  {skeinsNeeded} <span className="text-base font-normal text-[#57534E]">skeins</span>
                </p>
                <p className="text-xs text-[#78716C] mt-0.5 tabular-nums">
                  {totalWithBuffer} yds total ({totalYardageNeeded} + {totalWithBuffer - totalYardageNeeded} yds buffer)
                </p>
              </div>

              <div className="text-right">
                <span className="inline-block text-[11px] font-semibold text-[#8C5E3D] bg-white px-2.5 py-1 rounded-md border border-[#E0D8CE]">
                  Same Dye Lot
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference: Standard Yarn Weights & Hook Chart */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-[#E5DFD5] shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F0EBE3]">
            <Info className="w-4 h-4 text-[#8C5E3D]" />
            <h4 className="text-xs font-semibold text-[#292524] uppercase tracking-wider">
              Standard Yarn Weight & Crochet Hook Reference (Craft Yarn Council)
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EAE3D9] text-[#78716C]">
                  <th className="py-2.5 pr-4 font-semibold">Weight Class</th>
                  <th className="py-2.5 px-4 font-semibold">Recommended Metric Hook</th>
                  <th className="py-2.5 px-4 font-semibold">Standard 4&quot; Gauge</th>
                  <th className="py-2.5 pl-4 font-semibold">Approx. Meters / 100g</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F2EB] text-[#292524]">
                {YARN_WEIGHT_CLASSES.map((wc, i) => (
                  <tr key={i} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-2.5 pr-4 font-medium text-[#8C5E3D]">{wc.name}</td>
                    <td className="py-2.5 px-4 font-mono">{wc.recommendedHook}</td>
                    <td className="py-2.5 px-4 font-mono">{wc.typicalGauge}</td>
                    <td className="py-2.5 pl-4 font-mono text-[#78716C]">{wc.metersPer100g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
