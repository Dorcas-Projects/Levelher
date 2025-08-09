export interface CharacterStats {
  professional: {
    focus: number;
    leadership: number;
    technical: number;
    networking: number;
  };
  personal: {
    wellness: number;
    relationships: number;
    creativity: number;
    selfCare: number;
  };
}

export interface CharacterOutfit {
  id: string;
  name: string;
  category: 'professional' | 'casual' | 'workout' | 'creative' | 'social';
  image: string;
  unlockLevel: number;
  isUnlocked: boolean;
}

export interface CharacterState {
  id: string;
  name: string;
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  stats: CharacterStats;
  currentOutfit: CharacterOutfit;
  unlockedOutfits: CharacterOutfit[];
  currentMode: 'professional' | 'wellness' | 'social' | 'creative';
  achievements: Achievement[];
  weeklyGoals: Quest[];
  completedQuests: Quest[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: 'professional' | 'wellness' | 'social' | 'creative';
  xpReward: number;
  statBonus: Partial<CharacterStats>;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  isCompleted: boolean;
  dueDate?: Date;
  isDaily?: boolean;
  isWeekly?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'level' | 'balance' | 'streak' | 'special';
  outfitReward?: CharacterOutfit;
}

export interface LifeBalanceScore {
  overall: number;
  professional: number;
  personal: number;
  trend: 'improving' | 'stable' | 'declining';
}