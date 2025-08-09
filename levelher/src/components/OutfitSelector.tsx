import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Crown, Palette, Dumbbell, Users, Coffee, Star } from 'lucide-react';
import { CharacterOutfit } from '../types/character';
import ParticleEffect from './ParticleEffect';

interface OutfitSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentOutfit: CharacterOutfit;
  unlockedOutfits: CharacterOutfit[];
  allOutfits: CharacterOutfit[];
  playerLevel: number;
  onSelectOutfit: (outfit: CharacterOutfit) => void;
}

const OutfitSelector: React.FC<OutfitSelectorProps> = ({
  isOpen,
  onClose,
  currentOutfit,
  unlockedOutfits,
  allOutfits,
  playerLevel,
  onSelectOutfit,
}) => {
  const [selectedOutfit, setSelectedOutfit] = useState<CharacterOutfit>(currentOutfit);
  const [showUnlockEffect, setShowUnlockEffect] = useState(false);

  const getCategoryIcon = (category: CharacterOutfit['category']) => {
    switch (category) {
      case 'professional':
        return <Crown className="w-4 h-4 text-anime-gold" />;
      case 'casual':
        return <Coffee className="w-4 h-4 text-anime-peach" />;
      case 'workout':
        return <Dumbbell className="w-4 h-4 text-anime-mint" />;
      case 'creative':
        return <Palette className="w-4 h-4 text-anime-purple" />;
      case 'social':
        return <Users className="w-4 h-4 text-anime-pink" />;
      default:
        return <Star className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryGradient = (category: CharacterOutfit['category']) => {
    switch (category) {
      case 'professional':
        return 'from-anime-gold/20 to-anime-coral/20';
      case 'casual':
        return 'from-anime-peach/20 to-anime-lavender/20';
      case 'workout':
        return 'from-anime-mint/20 to-anime-blue/20';
      case 'creative':
        return 'from-anime-purple/20 to-anime-lavender/20';
      case 'social':
        return 'from-anime-pink/20 to-anime-purple/20';
      default:
        return 'from-gray-100/20 to-gray-200/20';
    }
  };

  const isOutfitUnlocked = (outfit: CharacterOutfit) => {
    return outfit.isUnlocked || playerLevel >= outfit.unlockLevel;
  };

  const handleOutfitSelect = (outfit: CharacterOutfit) => {
    if (!isOutfitUnlocked(outfit)) {
      return;
    }

    setSelectedOutfit(outfit);
  };

  const handleConfirmSelection = () => {
    onSelectOutfit(selectedOutfit);
    
    // Show unlock effect if this is a newly unlocked outfit
    if (!selectedOutfit.isUnlocked && playerLevel >= selectedOutfit.unlockLevel) {
      setShowUnlockEffect(true);
      setTimeout(() => setShowUnlockEffect(false), 2000);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="character-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Style Collection</h2>
              <p className="text-sm text-gray-600">Choose your perfect look for any occasion</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Current Selection Preview */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-anime-pink to-anime-purple p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {selectedOutfit.image ? (
                      <img
                        src={selectedOutfit.image}
                        alt={selectedOutfit.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-anime flex items-center justify-center">
                        <span className="text-2xl">👩‍💼</span>
                      </div>
                    )}
                  </div>
                </div>
                {selectedOutfit.id !== currentOutfit.id && (
                  <motion.div
                    className="absolute -top-1 -right-1 bg-anime-gold text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    ✨
                  </motion.div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{selectedOutfit.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  {getCategoryIcon(selectedOutfit.category)}
                  <span className="text-sm text-gray-600 capitalize">{selectedOutfit.category}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Unlocks at Level {selectedOutfit.unlockLevel}
                </div>
              </div>
              <button
                onClick={handleConfirmSelection}
                disabled={!isOutfitUnlocked(selectedOutfit)}
                className="anime-button px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedOutfit.id === currentOutfit.id ? 'Currently Wearing' : 'Wear This Style'}
              </button>
            </div>
          </div>

          {/* Outfit Grid */}
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {allOutfits.map((outfit, index) => {
                const unlocked = isOutfitUnlocked(outfit);
                const isSelected = selectedOutfit.id === outfit.id;
                const isCurrent = currentOutfit.id === outfit.id;

                return (
                  <motion.div
                    key={outfit.id}
                    className={`relative cursor-pointer group ${
                      unlocked ? 'hover:scale-105' : 'cursor-not-allowed'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleOutfitSelect(outfit)}
                  >
                    <div
                      className={`bg-gradient-to-br ${getCategoryGradient(outfit.category)} rounded-xl p-4 border-2 transition-all ${
                        isSelected
                          ? 'border-primary-500 shadow-lg'
                          : unlocked
                          ? 'border-transparent hover:border-primary-300'
                          : 'border-gray-200'
                      } ${!unlocked ? 'opacity-60' : ''}`}
                    >
                      {/* Outfit Preview */}
                      <div className="aspect-square mb-3 relative">
                        <div className="w-full h-full rounded-lg bg-gradient-to-br from-anime-pink to-anime-purple p-1">
                          <div className="w-full h-full rounded-lg bg-white flex items-center justify-center overflow-hidden">
                            {outfit.image ? (
                              <img
                                src={outfit.image}
                                alt={outfit.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-anime flex items-center justify-center">
                                <span className="text-2xl">👩‍💼</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Status Badges */}
                        {!unlocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                            <Lock className="w-6 h-6 text-white" />
                          </div>
                        )}
                        
                        {isCurrent && (
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}

                        {isSelected && selectedOutfit.id !== currentOutfit.id && (
                          <motion.div
                            className="absolute -top-2 -right-2 bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                          >
                            ✨
                          </motion.div>
                        )}
                      </div>

                      {/* Outfit Info */}
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-800 text-sm mb-1">{outfit.name}</h4>
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          {getCategoryIcon(outfit.category)}
                          <span className="text-xs text-gray-600 capitalize">{outfit.category}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {unlocked ? (
                            outfit.isUnlocked ? 'Unlocked' : 'Available'
                          ) : (
                            `Level ${outfit.unlockLevel}`
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Unlock Effect */}
        <ParticleEffect 
          isActive={showUnlockEffect} 
          type="celebration" 
          particleCount={40}
          duration={3000}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default OutfitSelector;