"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge, getBadgeColor } from "@/lib/utils";

interface BadgeWallProps {
  badges: Badge[];
}

interface BadgeItemProps {
  badge: Badge;
  index: number;
}

function BadgeItem({ badge, index }: BadgeItemProps) {
  const rarityColors = {
    common: "var(--neon-blue)",
    rare: "var(--neon-purple)",
    epic: "var(--neon-green)",
    legendary: "var(--xp-gold)",
  };

  const rarityEmojis = {
    common: "🥉",
    rare: "🥈",
    epic: "🥇",
    legendary: "👑",
  };

  const getBadgeEmoji = (name: string): string => {
    const emojiMap: { [key: string]: string } = {
      "First Steps": "👶",
      "Week Warrior": "⚔️",
      "Month Master": "🗓️",
      "XP Hunter": "🎯",
      "Consistency King": "👑",
      "Legendary Focus": "🔥",
      "Early Bird": "🌅",
      "Night Owl": "🦉",
      "Perfectionist": "💎",
      "Overachiever": "🚀",
    };
    return emojiMap[name] || "🏆";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <Card 
        className={`
          relative overflow-hidden border-0 p-4 cursor-pointer transition-all duration-300
          ${badge.earned 
            ? 'card-gradient shadow-lg' 
            : 'bg-black/20 border border-white/10'
          }
        `}
        style={{
          boxShadow: badge.earned 
            ? `0 0 20px ${rarityColors[badge.rarity]}40` 
            : 'none'
        }}
      >
        {/* Earned glow effect */}
        {badge.earned && (
          <div 
            className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
            style={{
              background: `radial-gradient(circle at center, ${rarityColors[badge.rarity]}, transparent 70%)`
            }}
          />
        )}

        {/* Rarity border */}
        {badge.earned && (
          <div 
            className="absolute inset-0 rounded-lg opacity-50"
            style={{
              background: `linear-gradient(45deg, transparent, ${rarityColors[badge.rarity]}30, transparent)`,
              padding: '1px',
            }}
          />
        )}

        <div className="relative z-10 text-center">
          {/* Badge icon */}
          <motion.div
            className="text-4xl mb-3"
            animate={badge.earned ? {
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            {badge.earned ? getBadgeEmoji(badge.name) : "🔒"}
          </motion.div>

          {/* Rarity indicator */}
          <div className="flex items-center justify-center mb-2">
            <span className="text-lg">{rarityEmojis[badge.rarity]}</span>
            <span 
              className={`ml-1 text-xs font-medium uppercase tracking-wide ${getBadgeColor(badge.rarity)}`}
            >
              {badge.rarity}
            </span>
          </div>

          {/* Badge name */}
          <h4 className={`font-semibold mb-2 ${badge.earned ? 'text-white' : 'text-gray-500'}`}>
            {badge.name}
          </h4>

          {/* Badge description */}
          <p className={`text-xs leading-relaxed ${badge.earned ? 'text-gray-300' : 'text-gray-600'}`}>
            {badge.description}
          </p>

          {/* Earned date */}
          {badge.earned && badge.earnedDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3 pt-2 border-t border-white/10"
            >
              <p className="text-xs text-gray-400">
                Earned {new Date(badge.earnedDate).toLocaleDateString()}
              </p>
            </motion.div>
          )}

          {/* New badge indicator */}
          {badge.earned && badge.earnedDate && 
           new Date(badge.earnedDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold"
            >
              NEW!
            </motion.div>
          )}

          {/* Particle effect for legendary badges */}
          {badge.earned && badge.rarity === 'legendary' && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [-5, -15, -5],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export function BadgeWall({ badges }: BadgeWallProps) {
  const earnedBadges = badges.filter(badge => badge.earned);
  const totalBadges = badges.length;
  const completionPercentage = totalBadges > 0 ? Math.round((earnedBadges.length / totalBadges) * 100) : 0;

  // Group badges by rarity
  const badgesByRarity = badges.reduce((acc, badge) => {
    if (!acc[badge.rarity]) acc[badge.rarity] = [];
    acc[badge.rarity].push(badge);
    return acc;
  }, {} as Record<string, Badge[]>);

  const rarityOrder: (keyof typeof badgesByRarity)[] = ['legendary', 'epic', 'rare', 'common'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="card-gradient border-0 p-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-purple-500/5" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Achievement Wall</h3>
              <p className="text-gray-400 text-sm">
                {earnedBadges.length} of {totalBadges} badges earned ({completionPercentage}%)
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl text-xp-gold mb-1">🏆</div>
              <div className="text-gray-400 text-xs">Achievements</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-8 bg-black/30 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-xp-gold rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
              style={{
                boxShadow: "0 0 10px var(--neon-blue)"
              }}
            />
          </div>

          {badges.length > 0 ? (
            <div className="space-y-8">
              {rarityOrder.map(rarity => {
                const rarityBadges = badgesByRarity[rarity];
                if (!rarityBadges || rarityBadges.length === 0) return null;

                const earnedInRarity = rarityBadges.filter(b => b.earned).length;

                return (
                  <div key={rarity}>
                    {/* Rarity section header */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="flex items-center mb-4"
                    >
                      <h4 className={`text-lg font-semibold capitalize ${getBadgeColor(rarity as Badge['rarity'])}`}>
                        {rarity} Badges
                      </h4>
                      <span className="ml-3 text-sm text-gray-400">
                        ({earnedInRarity}/{rarityBadges.length})
                      </span>
                    </motion.div>

                    {/* Badges grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {rarityBadges.map((badge, index) => (
                        <BadgeItem key={badge.id} badge={badge} index={index} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🏆</div>
              <p className="text-gray-400 mb-2">No badges available</p>
              <p className="text-gray-500 text-sm">Complete goals to start earning achievements!</p>
            </div>
          )}

          {/* Achievement celebration */}
          {completionPercentage === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.8, type: "spring" }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-xl shadow-2xl">
                🎉 ALL BADGES EARNED! LEGENDARY STATUS! 🎉
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
