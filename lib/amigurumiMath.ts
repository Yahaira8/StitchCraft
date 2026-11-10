// ====================================================================
// STITCHCRAFT AMIGURUMI MATHEMATICS & DOMAIN LOGIC
// Section 4.5 Technical Specification
// ====================================================================

import { PartProgressItem, ScaleCalculationResult } from '../types';

export const YARN_WEIGHT_MAP: Record<string, { weight: number; baseHook: number; baseEye: number }> = {
  'Fingering Cotton (#1)': { weight: 1, baseHook: 2.0, baseEye: 6 },
  'Sport Cotton (#2)': { weight: 2, baseHook: 2.5, baseEye: 8 },
  'DK / Worsted (#3 / #4)': { weight: 3.5, baseHook: 3.25, baseEye: 6 },
  'Worsted (#4)': { weight: 4, baseHook: 3.5, baseEye: 8 },
  'Worsted Plush (#4)': { weight: 4, baseHook: 4.0, baseEye: 8 },
  'Chunky Plush (#5)': { weight: 5, baseHook: 5.0, baseEye: 12 },
  'Super Bulky Plush (#6)': { weight: 6, baseHook: 5.0, baseEye: 10 },
};

export function calculateAmigurumiScale(
  originalYarnKey: string,
  targetYarnKey: string,
  originalEyeSizeMm: number
): ScaleCalculationResult {
  const orig = YARN_WEIGHT_MAP[originalYarnKey] || YARN_WEIGHT_MAP['Worsted (#4)'];
  const target = YARN_WEIGHT_MAP[targetYarnKey] || YARN_WEIGHT_MAP['Super Bulky Plush (#6)'];

  const scaleRatio = target.weight / orig.weight;
  const estimatedSizeMultiplier = Math.round(Math.pow(scaleRatio, 0.75) * 100) / 100;
  const recommendedEyeSize = Math.round(originalEyeSizeMm * Math.sqrt(scaleRatio));

  return {
    scaleRatio: estimatedSizeMultiplier,
    recommendedHook: `${target.baseHook}mm`,
    recommendedEyeSize: `${recommendedEyeSize}mm`,
    stuffingMultiplier: Math.round(Math.pow(scaleRatio, 1.5) * 100) / 100,
  };
}

export function calculateOverallProgress(
  partProgress: Record<string, PartProgressItem>
): number {
  const parts = Object.values(partProgress);
  if (parts.length === 0) return 0;

  const totalRowsSum = parts.reduce((sum, p) => sum + Math.max(1, p.total_rows), 0);
  const currentRowsSum = parts.reduce(
    (sum, p) => sum + Math.min(p.current_row, p.total_rows),
    0
  );

  return Math.min(100, Math.round((currentRowsSum / totalRowsSum) * 100));
}
