"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { formatNumber, getStreakEmoji } from "@/lib/utils";

interface StatsCardsProps {
  stats: {
    streakDays: number;
    xpPoints: number;
    leaderboardRank: number;
    level: number;
  };
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
  glowColor: string;
  emoji: string;
  delay: number;
}

function StatCard({ title, value, subtitle, color, glowColor, emoji, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="card-gradient border-0 p-6 relative overflow-hidden group cursor-pointer">
        {/* Background glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-2xl"
          style={{
            background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`
          }}
        />
        
        {/* Animated border glow */}
        <div 
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(45deg, transparent, ${glowColor}20, transparent)`,
            padding: '1px',
          }}
        />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
              {title}
            </h3>
            <span className="text-2xl">{emoji}</span>
          </div>
          
          {/* Main value */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.5, type: "spring" }}
            className="mb-2"
          >
            <div 
              className="stat-number"
              style={{ color }}
            >
              {value}
            </div>
          </motion.div>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5, duration: 0.3 }}
            className="text-gray-300 text-sm"
          >
            {subtitle}
          </motion.p>
          
          {/* Decorative element */}
          <div 
            className="absolute top-2 right-2 w-12 h-12 rounded-full opacity-10 blur-xl"
            style={{ backgroundColor: glowColor }}
          />
        </div>
      </Card>
    </motion.div>
  );
}

export function StatsCards({ stats }: StatsCardsProps) {
  const { streakDays, xpPoints, leaderboardRank, level } = stats;
  
  const cards = [
    {
      title: "Current Streak",
      value: streakDays,
      subtitle: `${streakDays === 1 ? 'day' : 'days'} in a row`,
      color: "var(--streak-fire)",
      glowColor: "var(--streak-fire)",
      emoji: getStreakEmoji(streakDays),
      delay: 0,
    },
    {
      title: "Total XP",
      value: formatNumber(xpPoints),
      subtitle: `Level ${level} • ${Math.floor((xpPoints % 500) / 5)}% to next`,
      color: "var(--xp-gold)",
      glowColor: "var(--xp-gold)",
      emoji: "⭐",
      delay: 0.1,
    },
    {
      title: "Global Rank",
      value: `#${leaderboardRank}`,
      subtitle: leaderboardRank <= 10 ? "Top 10!" : leaderboardRank <= 100 ? "Top 100!" : "Keep climbing!",
      color: "var(--neon-purple)",
      glowColor: "var(--neon-purple)",
      emoji: leaderboardRank <= 10 ? "👑" : leaderboardRank <= 50 ? "🏆" : "🎯",
      delay: 0.2,
    },
    {
      title: "Current Level",
      value: level,
      subtitle: `${500 - (xpPoints % 500)} XP to level ${level + 1}`,
      color: "var(--neon-blue)",
      glowColor: "var(--neon-blue)",
      emoji: "🚀",
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
      
      {/* Achievement notification */}
      {streakDays > 0 && streakDays % 7 === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1, duration: 0.6, type: "spring" }}
          className="fixed top-20 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-bold shadow-lg"
        >
          🎉 {streakDays} Day Streak Achievement!
        </motion.div>
      )}
    </div>
  );
}
