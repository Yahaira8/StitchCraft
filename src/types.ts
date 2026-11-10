export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type ProjectCategory = 'wearables' | 'amigurumi' | 'home' | 'accessories';
export type ItemType = 'digital' | 'kit';

export interface CrochetPattern {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  difficulty: DifficultyLevel;
  hookSize: string;
  yarnWeight: string;
  yardage: string;
  estimatedHours: number;
  priceDigital: number;
  priceKit: number;
  image: string;
  description: string;
  materials: string[];
  techniques: string[];
  designer: string;
  stitchKey: string;
  sampleInstructions: {
    sectionName: string;
    rows: {
      rowNumber: string;
      text: string;
      stitchCount: string;
    }[];
  }[];
}

export interface CartItem {
  id: string;
  patternId: string;
  title: string;
  type: ItemType;
  price: number;
  quantity: number;
  colorScheme: string;
  includeHook: boolean;
  image: string;
}

export interface StitchGuideItem {
  id: string;
  nameUS: string;
  nameUK: string;
  abbrUS: string;
  abbrUK: string;
  difficulty: DifficultyLevel;
  description: string;
  steps: string[];
  proTip: string;
  idealFor: string;
}

export interface ActiveProjectCounter {
  id: string;
  name: string;
  currentSection: string;
  round: number;
  totalRounds: number;
  stitchCount: number;
  notes: string;
}
