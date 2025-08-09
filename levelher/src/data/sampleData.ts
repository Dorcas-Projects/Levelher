import { CharacterState, Quest, CharacterOutfit, Achievement } from '../types/character';

export const sampleOutfits: CharacterOutfit[] = [
  {
    id: 'professional-blazer',
    name: 'Executive Blazer',
    category: 'professional',
    image: '',
    unlockLevel: 1,
    isUnlocked: true,
  },
  {
    id: 'casual-sweater',
    name: 'Cozy Sweater',
    category: 'casual',
    image: '',
    unlockLevel: 5,
    isUnlocked: true,
  },
  {
    id: 'workout-athleisure',
    name: 'Athleisure Set',
    category: 'workout',
    image: '',
    unlockLevel: 10,
    isUnlocked: false,
  },
  {
    id: 'creative-artist',
    name: 'Artist Smock',
    category: 'creative',
    image: '',
    unlockLevel: 15,
    isUnlocked: false,
  },
  {
    id: 'social-party',
    name: 'Party Dress',
    category: 'social',
    image: '',
    unlockLevel: 20,
    isUnlocked: false,
  },
];

export const sampleQuests: Quest[] = [
  // Professional Quests
  {
    id: 'prof-1',
    title: 'Complete Strategic Project Plan',
    description: 'Design and present a comprehensive project plan for your next initiative. Focus on clear objectives, timelines, and resource allocation.',
    category: 'professional',
    xpReward: 250,
    statBonus: {
      professional: { leadership: 15, focus: 10 }
    },
    difficulty: 'hard',
    estimatedTime: '2-3 hours',
    isCompleted: false,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    isWeekly: true,
  },
  {
    id: 'prof-2',
    title: 'Attend Networking Event',
    description: 'Connect with industry professionals at a networking event or conference. Aim to make 3 meaningful connections.',
    category: 'professional',
    xpReward: 150,
    statBonus: {
      professional: { networking: 20 }
    },
    difficulty: 'medium',
    estimatedTime: '3-4 hours',
    isCompleted: false,
  },
  {
    id: 'prof-3',
    title: 'Learn New Technical Skill',
    description: 'Complete an online course or tutorial in a skill relevant to your career growth.',
    category: 'professional',
    xpReward: 100,
    statBonus: {
      professional: { technical: 15, focus: 5 }
    },
    difficulty: 'easy',
    estimatedTime: '1-2 hours',
    isCompleted: false,
    isDaily: true,
  },

  // Wellness Quests
  {
    id: 'well-1',
    title: 'Morning Meditation Practice',
    description: 'Start your day with 15 minutes of mindfulness meditation. Use your favorite app or practice in silence.',
    category: 'wellness',
    xpReward: 50,
    statBonus: {
      personal: { wellness: 10, selfCare: 5 }
    },
    difficulty: 'easy',
    estimatedTime: '15 minutes',
    isCompleted: false,
    isDaily: true,
  },
  {
    id: 'well-2',
    title: 'Complete Full Body Workout',
    description: 'Engage in a comprehensive fitness session including cardio, strength, and flexibility training.',
    category: 'wellness',
    xpReward: 120,
    statBonus: {
      personal: { wellness: 15 }
    },
    difficulty: 'medium',
    estimatedTime: '45-60 minutes',
    isCompleted: false,
  },
  {
    id: 'well-3',
    title: 'Prepare Healthy Meal',
    description: 'Plan and prepare a nutritious, balanced meal from scratch. Focus on fresh ingredients and mindful eating.',
    category: 'wellness',
    xpReward: 80,
    statBonus: {
      personal: { wellness: 8, selfCare: 7 }
    },
    difficulty: 'medium',
    estimatedTime: '30-45 minutes',
    isCompleted: false,
  },

  // Social Quests
  {
    id: 'social-1',
    title: 'Plan Friend Gathering',
    description: 'Organize a fun activity with friends - could be dinner, game night, outdoor adventure, or creative workshop.',
    category: 'social',
    xpReward: 180,
    statBonus: {
      personal: { relationships: 20 }
    },
    difficulty: 'medium',
    estimatedTime: '2-4 hours',
    isCompleted: false,
    isWeekly: true,
  },
  {
    id: 'social-2',
    title: 'Call Family Member',
    description: 'Have a meaningful conversation with a family member you haven\'t spoken to recently. Practice active listening.',
    category: 'social',
    xpReward: 75,
    statBonus: {
      personal: { relationships: 12 }
    },
    difficulty: 'easy',
    estimatedTime: '20-30 minutes',
    isCompleted: false,
  },
  {
    id: 'social-3',
    title: 'Send Appreciation Message',
    description: 'Reach out to someone who has positively impacted your life recently with a thoughtful message of gratitude.',
    category: 'social',
    xpReward: 60,
    statBonus: {
      personal: { relationships: 8 }
    },
    difficulty: 'easy',
    estimatedTime: '10 minutes',
    isCompleted: false,
    isDaily: true,
  },

  // Creative Quests
  {
    id: 'creative-1',
    title: 'Start Creative Project',
    description: 'Begin a new creative endeavor - art, writing, music, crafting, or any form of self-expression that excites you.',
    category: 'creative',
    xpReward: 200,
    statBonus: {
      personal: { creativity: 25 }
    },
    difficulty: 'hard',
    estimatedTime: '1-2 hours',
    isCompleted: false,
  },
  {
    id: 'creative-2',
    title: 'Journal Reflection',
    description: 'Write a thoughtful journal entry about your recent experiences, goals, and personal growth insights.',
    category: 'creative',
    xpReward: 70,
    statBonus: {
      personal: { creativity: 8, selfCare: 7 }
    },
    difficulty: 'easy',
    estimatedTime: '15-20 minutes',
    isCompleted: false,
    isDaily: true,
  },
  {
    id: 'creative-3',
    title: 'Learn New Creative Skill',
    description: 'Explore a new creative technique or medium through online tutorials, workshops, or experimentation.',
    category: 'creative',
    xpReward: 130,
    statBonus: {
      personal: { creativity: 18 }
    },
    difficulty: 'medium',
    estimatedTime: '45-60 minutes',
    isCompleted: false,
  },
];

export const sampleAchievements: Achievement[] = [
  {
    id: 'first-level',
    title: 'Getting Started',
    description: 'Reached level 5 in your life journey',
    icon: '🌟',
    unlockedAt: new Date(),
    category: 'level',
  },
  {
    id: 'balanced-life',
    title: 'Life Balance Master',
    description: 'Maintained 80%+ balance in all life areas for a week',
    icon: '⚖️',
    unlockedAt: new Date(),
    category: 'balance',
    outfitReward: sampleOutfits[1],
  },
];

export const sampleCharacter: CharacterState = {
  id: 'player-1',
  name: 'Alexandra Chen',
  level: 8,
  currentXP: 2850,
  xpToNextLevel: 3500,
  totalXP: 15420,
  stats: {
    professional: {
      focus: 75,
      leadership: 68,
      technical: 82,
      networking: 55,
    },
    personal: {
      wellness: 70,
      relationships: 78,
      creativity: 60,
      selfCare: 65,
    },
  },
  currentOutfit: sampleOutfits[0],
  unlockedOutfits: sampleOutfits.slice(0, 2),
  currentMode: 'professional',
  achievements: sampleAchievements,
  weeklyGoals: sampleQuests.filter(q => q.isWeekly),
  completedQuests: [],
};