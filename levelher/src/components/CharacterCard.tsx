import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Crown, Zap } from 'lucide-react';
import { CharacterState } from '../types/character';
import ParticleEffect from './ParticleEffect';

interface CharacterCardProps {
  character: CharacterState;
  onLevelUp?: () => void;
  onOpenOutfitSelector?: () => void;
  className?: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onLevelUp,
  onOpenOutfitSelector,
  className = ''
}) => {
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const xpPercentage = (character.currentXP / character.xpToNextLevel) * 100;

  useEffect(() => {
    // Generate sparkle effects around the character card
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLevelUp = () => {
    setIsLevelingUp(true);
    onLevelUp?.();
    setTimeout(() => setIsLevelingUp(false), 1000);
  };

  const getModeIcon = () => {
    switch (character.currentMode) {
      case 'professional':
        return <Crown className="w-5 h-5 text-anime-gold" />;
      case 'wellness':
        return <Sparkles className="w-5 h-5 text-anime-mint" />;
      case 'social':
        return <Star className="w-5 h-5 text-anime-pink" />;
      case 'creative':
        return <Zap className="w-5 h-5 text-anime-purple" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  const getModeGradient = () => {
    switch (character.currentMode) {
      case 'professional':
        return 'from-anime-gold/20 to-anime-coral/20';
      case 'wellness':
        return 'from-anime-mint/20 to-anime-blue/20';
      case 'social':
        return 'from-anime-pink/20 to-anime-purple/20';
      case 'creative':
        return 'from-anime-purple/20 to-anime-lavender/20';
      default:
        return 'from-anime-pink/20 to-anime-purple/20';
    }
  };

  return (
    <motion.div
      className={`character-card p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Sparkle Effects */}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="sparkle-effect"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Star className="w-3 h-3 text-anime-gold fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Level Up Animation Overlay */}
      <AnimatePresence>
        {isLevelingUp && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-anime-gold/30 to-anime-coral/30 rounded-2xl z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <div className="text-3xl font-bold text-white mb-2">LEVEL UP!</div>
              <div className="text-xl text-anime-gold">Level {character.level}</div>
            </motion.div>
            <ParticleEffect 
              isActive={isLevelingUp} 
              type="level-up" 
              particleCount={30}
              duration={3000}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Level and Mode */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <motion.div
            className={`p-2 rounded-full bg-gradient-to-r ${getModeGradient()}`}
            whileHover={{ scale: 1.1 }}
          >
            {getModeIcon()}
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{character.name}</h3>
            <p className="text-sm text-gray-600 capitalize">{character.currentMode} Mode</p>
          </div>
        </div>
        <motion.div
          className="text-right"
          animate={isLevelingUp ? { scale: [1, 1.2, 1] } : {}}
        >
          <div className="text-2xl font-bold text-primary-600">Lv. {character.level}</div>
          <div className="text-sm text-gray-500">Total XP: {character.totalXP.toLocaleString()}</div>
        </motion.div>
      </div>

      {/* Character Avatar */}
      <div className="flex justify-center mb-6">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          animate={isLevelingUp ? { scale: [1, 1.1, 1] } : {}}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-anime-pink to-anime-purple p-1">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              {character.currentOutfit.image ? (
                <img
                  src={character.currentOutfit.image}
                  alt={character.currentOutfit.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-anime flex items-center justify-center">
                  <span className="text-3xl">👩‍💼</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Floating animation for the avatar */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-6 h-6 text-anime-gold fill-current" />
          </motion.div>
        </motion.div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Experience</span>
          <span className="text-primary-600 font-semibold">
            {character.currentXP.toLocaleString()} / {character.xpToNextLevel.toLocaleString()} XP
          </span>
        </div>
        <div className="xp-bar">
          <motion.div
            className="xp-progress"
            initial={{ width: 0 }}
            animate={{ width: `${xpPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="text-center mt-2">
          <span className="text-sm font-medium text-anime-coral">
            {character.xpToNextLevel - character.currentXP} XP to Level {character.level + 1}
          </span>
        </div>
      </div>

      {/* Current Outfit Info */}
      <div className="bg-white/50 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-700">Current Style</div>
            <div className="text-xs text-gray-600 capitalize">
              {character.currentOutfit.name} ({character.currentOutfit.category})
            </div>
          </div>
          <motion.button
            className="anime-button text-xs py-1 px-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenOutfitSelector}
          >
            Change Style
          </motion.button>
        </div>
      </div>

      {/* Quick Stats Preview */}
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center">
          <div className="text-sm text-gray-600">Professional</div>
          <div className="text-lg font-bold text-anime-coral">
            {Math.round((Object.values(character.stats.professional).reduce((a, b) => a + b, 0) / 4))}%
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Personal</div>
          <div className="text-lg font-bold text-anime-mint">
            {Math.round((Object.values(character.stats.personal).reduce((a, b) => a + b, 0) / 4))}%
          </div>
        </div>
      </div>

      {/* Level Up Button (when XP is full) */}
      {xpPercentage >= 100 && (
        <motion.button
          className="anime-button w-full mt-4"
          onClick={handleLevelUp}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ✨ Level Up! ✨
        </motion.button>
      )}
    </motion.div>
  );
};

export default CharacterCard;