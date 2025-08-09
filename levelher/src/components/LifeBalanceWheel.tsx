import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Heart, Palette, Dumbbell, Users, Brain, Coffee, Star } from 'lucide-react';
import { CharacterStats } from '../types/character';

interface LifeBalanceWheelProps {
  stats: CharacterStats;
  className?: string;
}

interface StatItem {
  key: string;
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  category: 'professional' | 'personal';
}

const LifeBalanceWheel: React.FC<LifeBalanceWheelProps> = ({ stats, className = '' }) => {
  const statItems: StatItem[] = [
    // Professional Stats
    { key: 'focus', label: 'Focus', value: stats.professional.focus, icon: <Brain className="w-5 h-5" />, color: '#FFD700', category: 'professional' },
    { key: 'leadership', label: 'Leadership', value: stats.professional.leadership, icon: <Star className="w-5 h-5" />, color: '#FF7F7F', category: 'professional' },
    { key: 'technical', label: 'Technical', value: stats.professional.technical, icon: <Briefcase className="w-5 h-5" />, color: '#87CEEB', category: 'professional' },
    { key: 'networking', label: 'Networking', value: stats.professional.networking, icon: <Users className="w-5 h-5" />, color: '#DDA0DD', category: 'professional' },
    
    // Personal Stats
    { key: 'wellness', label: 'Wellness', value: stats.personal.wellness, icon: <Dumbbell className="w-5 h-5" />, color: '#98FB98', category: 'personal' },
    { key: 'relationships', label: 'Relationships', value: stats.personal.relationships, icon: <Heart className="w-5 h-5" />, color: '#FFB6C1', category: 'personal' },
    { key: 'creativity', label: 'Creativity', value: stats.personal.creativity, icon: <Palette className="w-5 h-5" />, color: '#E6E6FA', category: 'personal' },
    { key: 'selfCare', label: 'Self Care', value: stats.personal.selfCare, icon: <Coffee className="w-5 h-5" />, color: '#FFCCCB', category: 'personal' },
  ];

  const overallBalance = Math.round(
    statItems.reduce((sum, stat) => sum + stat.value, 0) / statItems.length
  );

  const professionalAvg = Math.round(
    statItems.filter(s => s.category === 'professional').reduce((sum, stat) => sum + stat.value, 0) / 4
  );

  const personalAvg = Math.round(
    statItems.filter(s => s.category === 'personal').reduce((sum, stat) => sum + stat.value, 0) / 4
  );

  const createCircularProgress = (value: number, color: string, radius: number, strokeWidth: number = 8) => {
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <motion.circle
        cx="150"
        cy="150"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.1))' }}
      />
    );
  };

  return (
    <div className={`character-card p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Life Balance Wheel</h3>
        <div className="text-3xl font-bold text-primary-600">{overallBalance}%</div>
        <p className="text-sm text-gray-600">Overall Balance Score</p>
      </div>

      <div className="relative flex justify-center mb-6">
        <svg width="300" height="300" className="transform -rotate-90">
          {/* Background circles */}
          {statItems.map((_, index) => (
            <circle
              key={`bg-${index}`}
              cx="150"
              cy="150"
              r={60 + index * 10}
              fill="none"
              stroke="#f0f0f0"
              strokeWidth="8"
            />
          ))}

          {/* Progress circles */}
          {statItems.map((stat, index) => 
            createCircularProgress(stat.value, stat.color, 60 + index * 10)
          )}

          {/* Center circle with overall score */}
          <circle
            cx="150"
            cy="150"
            r="45"
            fill="url(#centerGradient)"
            stroke="#e0e0e0"
            strokeWidth="2"
          />

          <defs>
            <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center transform rotate-90">
            <motion.div
              className="text-2xl font-bold text-primary-600"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {overallBalance}%
            </motion.div>
            <div className="text-xs text-gray-500">Balance</div>
          </div>
        </div>

        {/* Stat labels positioned around the wheel */}
        {statItems.map((stat, index) => {
          const angle = (index * 360) / statItems.length - 90; // Start from top
          const radius = 130;
          const x = 150 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 150 + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.div
              key={stat.key}
              className="absolute"
              style={{
                left: x - 25,
                top: y - 25,
                width: 50,
                height: 50,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-center whitespace-nowrap">
                <div className="font-semibold text-gray-700">{stat.value}%</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Category Summaries */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <motion.div
          className="bg-gradient-to-r from-anime-coral/20 to-anime-gold/20 rounded-lg p-4 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="text-lg font-bold text-anime-coral">{professionalAvg}%</div>
          <div className="text-sm text-gray-600">Professional</div>
          <Briefcase className="w-5 h-5 text-anime-coral mx-auto mt-2" />
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-anime-mint/20 to-anime-pink/20 rounded-lg p-4 text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="text-lg font-bold text-anime-mint">{personalAvg}%</div>
          <div className="text-sm text-gray-600">Personal</div>
          <Heart className="w-5 h-5 text-anime-mint mx-auto mt-2" />
        </motion.div>
      </div>

      {/* Balance Insight */}
      <div className="mt-6 text-center">
        <motion.div
          className="inline-flex items-center space-x-2 bg-white/50 rounded-full px-4 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <Star className="w-4 h-4 text-anime-gold" />
          <span className="text-sm font-medium text-gray-700">
            {Math.abs(professionalAvg - personalAvg) <= 10 
              ? "Great balance! 🎉" 
              : professionalAvg > personalAvg 
              ? "Focus on personal growth 💪" 
              : "Time to level up professionally 🚀"
            }
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default LifeBalanceWheel;