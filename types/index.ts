// ====================================================================
// STITCHCRAFT CORE TYPES & DATABASE MODELS
// Phase 1 Foundation
// ====================================================================

export type DifficultyLevel = 'Beginner' | 'Advanced Beginner' | 'Intermediate' | 'Advanced';

export type PatternCategory = 'Animals & Bugs' | 'Sea Life' | 'Seasonal & Fantasy' | string;

export type ProjectStatus = 'Planning' | 'In Progress' | 'Completed' | 'Frogged';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string | null;
  created_at: string;
}

export type PatternInstructions = Record<string, string[]>;

export interface Pattern {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  yarn_weight: string;
  recommended_hook: string;
  recommended_eye_size: string;
  category: PatternCategory;
  instructions: PatternInstructions;
  video_url: string;
  image_urls: string[];
  created_at?: string;
}

export interface PartProgressItem {
  current_row: number;
  total_rows: number;
  completed: boolean;
}

export type PartProgressMap = Record<string, PartProgressItem>;

export interface UserProject {
  id: string;
  user_id: string;
  pattern_id: string | null;
  project_name: string;
  target_yarn: string;
  target_hook: string;
  target_eye_size: string;
  part_progress: PartProgressMap;
  overall_completion: number;
  status: ProjectStatus;
  personal_notes?: string | null;
  updated_at: string;
  pattern?: Pattern | null;
}

export interface UserFavorite {
  id: string;
  user_id: string;
  pattern_id: string;
  created_at: string;
}

export interface ScaleCalculationResult {
  scaleRatio: number;
  recommendedHook: string;
  recommendedEyeSize: string;
  stuffingMultiplier: number;
}
