import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, Heart, Palette, Dumbbell, Clock, Star, 
  CheckCircle2, Trophy, Zap, Coffee, Users, Target 
} from 'lucide-react';
import { Quest } from '../types/character';
import ParticleEffect from './ParticleEffect';

interface QuestCardProps {
  quest: Quest;
  onComplete: (questId: string) => void;
  className?: string;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, onComplete, className = '' }) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const getCategoryTheme = () => {
    switch (quest.category) {
      case 'professional':
        return {
          gradient: 'from-anime-gold/20 to-anime-coral/20',
          icon: <Crown className="w-5 h-5 text-anime-gold" />,
          badge: 'Corporate Warrior',
          accent: 'anime-gold',
          bgPattern: '👑',
        };
      case 'wellness':
        return {
          gradient: 'from-anime-mint/20 to-anime-blue/20',
          icon: <Dumbbell className="w-5 h-5 text-anime-mint" />,
          badge: 'Self-Care Mage',
          accent: 'anime-mint',
          bgPattern: '🌿',
        };
      case 'social':
        return {
          gradient: 'from-anime-pink/20 to-anime-purple/20',
          icon: <Heart className="w-5 h-5 text-anime-pink" />,
          badge: 'Social Butterfly',
          accent: 'anime-pink',
          bgPattern: '💖',
        };
      case 'creative':
        return {
          gradient: 'from-anime-purple/20 to-anime-lavender/20',
          icon: <Palette className="w-5 h-5 text-anime-purple" />,
          badge: 'Artistic Soul',
          accent: 'anime-purple',
          bgPattern: '🎨',
        };
      default:
        return {
          gradient: 'from-gray-100 to-gray-200',
          icon: <Star className="w-5 h-5 text-gray-500" />,
          badge: 'Life Quest',
          accent: 'gray-500',
          bgPattern: '⭐',
        };
    }
  };

  const getDifficultyColor = () => {
    switch (quest.difficulty) {
      case 'easy': return 'text-green-500 bg-green-100';
      case 'medium': return 'text-yellow-500 bg-yellow-100';
      case 'hard': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    onComplete(quest.id);
    setIsCompleting(false);
  };

  const theme = getCategoryTheme();

  return (
    <motion.div
      className={`character-card relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Pattern */}
      <div className="absolute top-4 right-4 text-4xl opacity-10">
        {theme.bgPattern}
      </div>

      {/* Category Badge */}
      <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${theme.gradient} px-3 py-1 rounded-full mb-4`}>
        {theme.icon}
        <span className="text-xs font-semibold text-gray-700">{theme.badge}</span>
      </div>

      {/* Quest Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 leading-tight">{quest.title}</h3>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
            {quest.difficulty}
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{quest.description}</p>
      </div>

      {/* Quest Details */}
      <div className="space-y-3 mb-4">
        {/* Time Estimate */}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{quest.estimatedTime}</span>
        </div>

        {/* XP Reward */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-anime-gold" />
            <span className="text-sm font-semibold text-anime-gold">+{quest.xpReward} XP</span>
          </div>
        </div>

        {/* Stat Bonuses */}
        {Object.keys(quest.statBonus).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(quest.statBonus).map(([category, stats]) => 
              Object.entries(stats as any).map(([stat, value]) => (
                <div key={`${category}-${stat}`} className="flex items-center space-x-1 bg-white/50 px-2 py-1 rounded-full">
                  <Target className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600">+{value} {stat}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Due Date */}
        {quest.dueDate && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Trophy className="w-4 h-4" />
            <span>Due: {quest.dueDate.toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Quest Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quest.isDaily && (
          <span className="px-2 py-1 bg-anime-pink/20 text-anime-pink text-xs rounded-full font-medium">
            Daily
          </span>
        )}
        {quest.isWeekly && (
          <span className="px-2 py-1 bg-anime-purple/20 text-anime-purple text-xs rounded-full font-medium">
            Weekly
          </span>
        )}
      </div>

      {/* Complete Button */}
      {!quest.isCompleted ? (
        <motion.button
          className="anime-button w-full flex items-center justify-center space-x-2"
          onClick={handleComplete}
          disabled={isCompleting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isCompleting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-4 h-4" />
              </motion.div>
              <span>Completing...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Quest</span>
            </>
          )}
        </motion.button>
      ) : (
        <div className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-full text-center font-semibold flex items-center justify-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Quest Completed! ✨</span>
        </div>
      )}

      {/* Completion Animation Overlay */}
      {isCompleting && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-anime-gold/30 to-anime-coral/30 rounded-2xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-3xl mb-2">✨</div>
            <div className="text-white font-bold">Quest Complete!</div>
          </motion.div>
          <ParticleEffect 
            isActive={isCompleting} 
            type="quest-complete" 
            particleCount={15}
            duration={1500}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuestCard;