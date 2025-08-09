import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  direction: number;
}

interface ParticleEffectProps {
  isActive: boolean;
  type?: 'level-up' | 'quest-complete' | 'sparkle' | 'celebration';
  particleCount?: number;
  duration?: number;
  className?: string;
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({
  isActive,
  type = 'sparkle',
  particleCount = 20,
  duration = 2000,
  className = ''
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const getParticleConfig = () => {
    switch (type) {
      case 'level-up':
        return {
          colors: ['#FFD700', '#FF7F7F', '#87CEEB', '#98FB98'],
          emoji: ['✨', '⭐', '💫', '🌟'],
          size: { min: 8, max: 16 },
          spread: 200,
        };
      case 'quest-complete':
        return {
          colors: ['#32CD32', '#FFD700', '#FF69B4'],
          emoji: ['✅', '🎉', '💎', '🏆'],
          size: { min: 6, max: 12 },
          spread: 150,
        };
      case 'celebration':
        return {
          colors: ['#FF69B4', '#FFB6C1', '#DDA0DD', '#87CEEB'],
          emoji: ['🎊', '🎉', '✨', '💖', '🌸'],
          size: { min: 10, max: 18 },
          spread: 300,
        };
      default: // sparkle
        return {
          colors: ['#FFD700', '#FFB6C1', '#DDA0DD'],
          emoji: ['✨', '⭐', '💫'],
          size: { min: 4, max: 8 },
          spread: 100,
        };
    }
  };

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    const config = getParticleConfig();
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (config.size.max - config.size.min) + config.size.min,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        delay: Math.random() * 1000,
        duration: 1000 + Math.random() * 2000,
        direction: Math.random() * 360,
      });
    }

    setParticles(newParticles);

    const timeout = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => clearTimeout(timeout);
  }, [isActive, type, particleCount, duration]);

  const getParticleComponent = (particle: Particle) => {
    const config = getParticleConfig();
    const isEmoji = Math.random() > 0.5;
    
    return (
      <motion.div
        key={particle.id}
        className="absolute pointer-events-none"
        style={{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          fontSize: `${particle.size}px`,
          color: particle.color,
        }}
        initial={{ 
          opacity: 0, 
          scale: 0,
          x: 0,
          y: 0,
          rotate: 0,
        }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0, 1.2, 1, 0.8],
          x: Math.cos(particle.direction * Math.PI / 180) * 50,
          y: Math.sin(particle.direction * Math.PI / 180) * 50 - 30,
          rotate: 360,
        }}
        transition={{
          duration: particle.duration / 1000,
          delay: particle.delay / 1000,
          ease: "easeOut",
        }}
      >
        {isEmoji ? (
          config.emoji[Math.floor(Math.random() * config.emoji.length)]
        ) : (
          <div
            className="rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`,
            }}
          />
        )}
      </motion.div>
    );
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <AnimatePresence>
        {particles.map((particle) => getParticleComponent(particle))}
      </AnimatePresence>
    </div>
  );
};

export default ParticleEffect;