import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Menu, Settings, Plus, Filter } from 'lucide-react';
import CharacterCard from './components/CharacterCard';
import LifeBalanceWheel from './components/LifeBalanceWheel';
import QuestCard from './components/QuestCard';
import OutfitSelector from './components/OutfitSelector';
import { sampleCharacter, sampleQuests, sampleOutfits } from './data/sampleData';
import { CharacterState, Quest } from './types/character';

function App() {
  const [character, setCharacter] = useState<CharacterState>(sampleCharacter);
  const [quests, setQuests] = useState<Quest[]>(sampleQuests);
  const [activeTab, setActiveTab] = useState<'overview' | 'quests' | 'achievements'>('overview');
  const [questFilter, setQuestFilter] = useState<'all' | 'professional' | 'wellness' | 'social' | 'creative'>('all');
  const [isOutfitSelectorOpen, setIsOutfitSelectorOpen] = useState(false);

  const handleLevelUp = () => {
    setCharacter(prev => ({
      ...prev,
      level: prev.level + 1,
      currentXP: 0,
      xpToNextLevel: Math.floor(prev.xpToNextLevel * 1.2),
    }));
  };

  const handleQuestComplete = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest) return;

    // Update quest as completed
    setQuests(prev => 
      prev.map(q => 
        q.id === questId ? { ...q, isCompleted: true } : q
      )
    );

    // Add XP and update stats
    setCharacter(prev => {
      const newXP = prev.currentXP + quest.xpReward;
      const newStats = { ...prev.stats };

      // Apply stat bonuses
      Object.entries(quest.statBonus).forEach(([category, stats]) => {
        Object.entries(stats as any).forEach(([stat, value]) => {
          if (category === 'professional' && stat in newStats.professional) {
            (newStats.professional as any)[stat] = Math.min(100, (newStats.professional as any)[stat] + value);
          } else if (category === 'personal' && stat in newStats.personal) {
            (newStats.personal as any)[stat] = Math.min(100, (newStats.personal as any)[stat] + value);
          }
        });
      });

      return {
        ...prev,
        currentXP: newXP,
        totalXP: prev.totalXP + quest.xpReward,
        stats: newStats,
        completedQuests: [...prev.completedQuests, quest],
      };
    });
  };

  const getFilteredQuests = () => {
    if (questFilter === 'all') return quests;
    return quests.filter(quest => quest.category === questFilter);
  };

  const getCompletionRate = () => {
    const completed = quests.filter(q => q.isCompleted).length;
    return Math.round((completed / quests.length) * 100);
  };

  const handleOutfitChange = (outfit: any) => {
    setCharacter(prev => ({
      ...prev,
      currentOutfit: outfit,
      unlockedOutfits: prev.unlockedOutfits.some(o => o.id === outfit.id) 
        ? prev.unlockedOutfits 
        : [...prev.unlockedOutfits, outfit],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-pink/10 via-anime-purple/10 to-anime-blue/10">
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-md border-b border-white/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-8 h-8 text-primary-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  LevelHer
                </h1>
              </div>
              <div className="hidden md:block text-sm text-gray-600">
                Anime-Style Life RPG
              </div>
            </div>
            
            <nav className="flex items-center space-x-4">
              {['overview', 'quests', 'achievements'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-white/50'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-white/50 transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/50 transition-colors">
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Character Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <CharacterCard 
                character={character} 
                onLevelUp={handleLevelUp}
                onOpenOutfitSelector={() => setIsOutfitSelectorOpen(true)}
                className="h-fit"
              />
            </motion.div>

            {/* Life Balance Wheel */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 xl:col-span-2"
            >
              <LifeBalanceWheel stats={character.stats} />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 xl:col-span-3"
            >
              <div className="character-card p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Progress Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">{character.level}</div>
                    <div className="text-sm text-gray-600">Current Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-anime-gold">{character.totalXP.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-anime-mint">{getCompletionRate()}%</div>
                    <div className="text-sm text-gray-600">Quest Completion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-anime-coral">{character.achievements.length}</div>
                    <div className="text-sm text-gray-600">Achievements</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'quests' && (
          <div>
            {/* Quest Filters */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="character-card p-4 mb-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Quest Journal</h2>
                <div className="flex items-center space-x-3">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={questFilter}
                    onChange={(e) => setQuestFilter(e.target.value as any)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="professional">👑 Professional</option>
                    <option value="wellness">🌿 Wellness</option>
                    <option value="social">💖 Social</option>
                    <option value="creative">🎨 Creative</option>
                  </select>
                  <button className="anime-button flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Quest</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Quests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredQuests().map((quest, index) => (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <QuestCard 
                    quest={quest} 
                    onComplete={handleQuestComplete}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="character-card p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Achievement Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {character.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-anime-gold/20 to-anime-coral/20 rounded-lg p-6"
                >
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  {achievement.outfitReward && (
                    <div className="mt-3 text-xs text-anime-purple font-medium">
                      + Outfit Unlocked: {achievement.outfitReward.name}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
                  )}
        </main>

        {/* Outfit Selector Modal */}
        <OutfitSelector
          isOpen={isOutfitSelectorOpen}
          onClose={() => setIsOutfitSelectorOpen(false)}
          currentOutfit={character.currentOutfit}
          unlockedOutfits={character.unlockedOutfits}
          allOutfits={sampleOutfits}
          playerLevel={character.level}
          onSelectOutfit={handleOutfitChange}
        />
      </div>
    );
  }

export default App;
