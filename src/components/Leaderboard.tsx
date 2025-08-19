"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LeaderboardEntry, formatNumber, getStreakEmoji } from "@/lib/utils";

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  currentUserRank?: number;
}

interface LeaderboardItemProps {
  entry: LeaderboardEntry;
  index: number;
  isCurrentUser?: boolean;
}

function LeaderboardItem({ entry, index, isCurrentUser = false }: LeaderboardItemProps) {
  const getRankIcon = (rank: number): string => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank: number): string => {
    switch (rank) {
      case 1: return "var(--xp-gold)";
      case 2: return "var(--neon-blue)";
      case 3: return "var(--streak-fire)";
      default: return "var(--neon-purple)";
    }
  };

  const getXPBarWidth = (xp: number, maxXP: number): number => {
    return Math.max(10, (xp / maxXP) * 100);
  };

  // Calculate max XP for progress bars
  const maxXP = Math.max(...[entry.xp, 5000]); // Minimum scale of 5000

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`
        relative overflow-hidden rounded-xl border transition-all duration-300
        ${isCurrentUser 
          ? 'bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border-neon-blue/50 shadow-lg' 
          : 'bg-black/30 border-white/10 hover:border-white/20'
        }
      `}
    >
      {/* Background glow for current user */}
      {isCurrentUser && (
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 blur-xl" />
      )}

      {/* XP Progress background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(90deg, ${getRankColor(entry.rank)} 0%, ${getRankColor(entry.rank)} ${getXPBarWidth(entry.xp, maxXP)}%, transparent ${getXPBarWidth(entry.xp, maxXP)}%)`,
        }}
      />

      <div className="relative z-10 p-4">
        <div className="flex items-center space-x-4">
          {/* Rank */}
          <motion.div
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
            style={{
              backgroundColor: entry.rank <= 3 ? `${getRankColor(entry.rank)}20` : 'rgba(255, 255, 255, 0.1)',
              color: getRankColor(entry.rank),
              border: `2px solid ${getRankColor(entry.rank)}40`
            }}
            animate={entry.rank <= 3 ? {
              boxShadow: [
                `0 0 0 ${getRankColor(entry.rank)}00`,
                `0 0 20px ${getRankColor(entry.rank)}40`,
                `0 0 0 ${getRankColor(entry.rank)}00`
              ]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            {typeof getRankIcon(entry.rank) === 'string' && getRankIcon(entry.rank).includes('#') 
              ? getRankIcon(entry.rank)
              : <span className="text-2xl">{getRankIcon(entry.rank)}</span>
            }
          </motion.div>

          {/* User info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className={`font-semibold truncate ${isCurrentUser ? 'text-neon-blue' : 'text-white'}`}>
                {entry.name}
                {isCurrentUser && <span className="ml-2 text-xs bg-neon-blue/20 px-2 py-1 rounded-full">YOU</span>}
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Level {entry.level}</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* XP */}
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-400">XP:</span>
                  <span 
                    className="font-bold"
                    style={{ color: getRankColor(entry.rank) }}
                  >
                    {formatNumber(entry.xp)}
                  </span>
                </div>

                {/* Streak */}
                <div className="flex items-center space-x-1">
                  <span className="text-xs">{getStreakEmoji(entry.streak)}</span>
                  <span className="text-xs text-gray-300">{entry.streak}d</span>
                </div>
              </div>

              {/* Rank change indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center space-x-1"
              >
                {entry.rank <= 10 && (
                  <motion.span
                    className="text-xs text-green-400"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ↗️
                  </motion.span>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Achievement indicators for top 3 */}
        {entry.rank <= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="mt-3 pt-2 border-t border-white/10"
          >
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">
                {entry.rank === 1 && "🏆 Champion"}
                {entry.rank === 2 && "⭐ Elite"}
                {entry.rank === 3 && "🔥 Rising Star"}
              </span>
              <span className="text-gray-500">
                +{Math.floor(Math.random() * 200 + 50)} XP today
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Animated border for top 3 */}
      {entry.rank <= 3 && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent, ${getRankColor(entry.rank)}30, transparent)`,
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </motion.div>
  );
}

export function Leaderboard({ leaderboard, currentUserRank }: LeaderboardProps) {
  // Fallback for empty leaderboard
  const leaderboardData = leaderboard && leaderboard.length > 0 ? leaderboard : [];
  
  // Show top 10 entries
  const topEntries = leaderboardData.slice(0, 10);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="card-gradient border-0 p-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-blue-500/5" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Global Leaderboard</h3>
              <p className="text-gray-400 text-sm">
                Top performers worldwide • Updated live
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl text-xp-gold mb-1">👑</div>
              <div className="text-gray-400 text-xs">Elite Rankings</div>
            </div>
          </div>

          {topEntries.length > 0 ? (
            <div className="space-y-3">
              {/* Podium for top 3 */}
              {topEntries.length >= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mb-8 p-6 bg-gradient-to-r from-yellow-500/10 via-blue-500/10 to-orange-500/10 rounded-2xl border border-white/10"
                >
                  <h4 className="text-center text-lg font-semibold text-white mb-4">🏆 Hall of Fame 🏆</h4>
                  <div className="flex justify-center items-end space-x-4">
                    {/* 2nd place */}
                    <div className="text-center">
                      <div className="w-16 h-12 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg mb-2 flex items-end justify-center">
                        <span className="text-2xl mb-1">🥈</span>
                      </div>
                      <div className="text-sm font-medium text-white">{topEntries[1]?.name}</div>
                      <div className="text-xs text-gray-400">{formatNumber(topEntries[1]?.xp || 0)} XP</div>
                    </div>

                    {/* 1st place */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-lg mb-2 flex items-end justify-center">
                        <span className="text-3xl mb-1">🥇</span>
                      </div>
                      <div className="text-sm font-medium text-white">{topEntries[0]?.name}</div>
                      <div className="text-xs text-gray-400">{formatNumber(topEntries[0]?.xp || 0)} XP</div>
                    </div>

                    {/* 3rd place */}
                    <div className="text-center">
                      <div className="w-16 h-10 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-lg mb-2 flex items-end justify-center">
                        <span className="text-2xl mb-1">🥉</span>
                      </div>
                      <div className="text-sm font-medium text-white">{topEntries[2]?.name}</div>
                      <div className="text-xs text-gray-400">{formatNumber(topEntries[2]?.xp || 0)} XP</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Full leaderboard list */}
              <div className="space-y-2">
                {topEntries.map((entry, index) => (
                  <LeaderboardItem
                    key={`${entry.rank}-${entry.name}`}
                    entry={entry}
                    index={index}
                    isCurrentUser={currentUserRank === entry.rank}
                  />
                ))}
              </div>

              {/* Current user position if not in top 10 */}
              {currentUserRank && currentUserRank > 10 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="mt-6 pt-4 border-t border-white/10"
                >
                  <div className="text-center text-gray-400 text-sm mb-3">Your Position</div>
                  <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-xl p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-blue">#{currentUserRank}</div>
                      <div className="text-sm text-gray-300">Keep climbing to reach the top 10!</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🏆</div>
              <p className="text-gray-400 mb-2">No leaderboard data available</p>
              <p className="text-gray-500 text-sm">Complete goals to join the global rankings!</p>
            </div>
          )}

          {/* Competition info */}
          {topEntries.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-8 pt-6 border-t border-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-neon-green">
                    {topEntries.length}
                  </div>
                  <div className="text-xs text-gray-400">Active Competitors</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-neon-blue">
                    {formatNumber(Math.max(...topEntries.map(e => e.xp)))}
                  </div>
                  <div className="text-xs text-gray-400">Highest XP</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-neon-purple">
                    {Math.max(...topEntries.map(e => e.streak))}
                  </div>
                  <div className="text-xs text-gray-400">Longest Streak</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
