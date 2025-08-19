import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Types for our gamification system
export interface DashboardData {
  dailyProgress: number;
  stats: {
    streakDays: number;
    xpPoints: number;
    leaderboardRank: number;
    level: number;
  };
  motivationalQuote: string;
  aiTip: string;
  heatmapData: number[][];
  chartData: ChartDataPoint[];
  badges: Badge[];
  leaderboard: LeaderboardEntry[];
  adaptiveFeedback: string[];
}

export interface ChartDataPoint {
  date: string;
  xp: number;
  goals: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  level: number;
  streak: number;
}

// Simulated data generation functions
export function generateDashboardData(): DashboardData {
  try {
    return {
      dailyProgress: Math.floor(Math.random() * 100),
      stats: {
        streakDays: Math.floor(Math.random() * 50) + 1,
        xpPoints: Math.floor(Math.random() * 10000) + 1000,
        leaderboardRank: Math.floor(Math.random() * 100) + 1,
        level: Math.floor(Math.random() * 20) + 1,
      },
      motivationalQuote: getRandomMotivationalQuote(),
      aiTip: getRandomAITip(),
      heatmapData: generateHeatmapData(),
      chartData: generateChartData(),
      badges: generateBadges(),
      leaderboard: generateLeaderboard(),
      adaptiveFeedback: generateAdaptiveFeedback(),
    };
  } catch (error) {
    console.error('Error generating dashboard data:', error);
    return getDefaultDashboardData();
  }
}

function getRandomMotivationalQuote(): string {
  const quotes = [
    "The only impossible journey is the one you never begin.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It is during our darkest moments that we must focus to see the light.",
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "Life is what happens to you while you're busy making other plans.",
    "The way to get started is to quit talking and begin doing.",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function getRandomAITip(): string {
  const tips = [
    "You're 23% more productive in the morning. Try scheduling important tasks before 10 AM.",
    "Your streak is strongest on Tuesdays. Use this momentum for challenging goals.",
    "You've improved 15% this week. Keep up the consistent effort!",
    "Based on your patterns, taking a 5-minute break every 25 minutes boosts your performance.",
    "You're in the top 12% of users this month. Your dedication is paying off!",
    "Your focus peaks around 2 PM. Schedule deep work during this time.",
    "You've completed 89% of your weekly goals. One more push to hit 100%!",
    "Your consistency has improved 34% since last month. The compound effect is working!",
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

function generateHeatmapData(): number[][] {
  const weeks = 12;
  const daysPerWeek = 7;
  const data: number[][] = [];
  
  for (let week = 0; week < weeks; week++) {
    const weekData: number[] = [];
    for (let day = 0; day < daysPerWeek; day++) {
      // Generate activity level (0-4, where 0 is no activity, 4 is high activity)
      weekData.push(Math.floor(Math.random() * 5));
    }
    data.push(weekData);
  }
  
  return data;
}

function generateChartData(): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      xp: Math.floor(Math.random() * 200) + 50,
      goals: Math.floor(Math.random() * 10) + 1,
    });
  }
  
  return data;
}

function generateBadges(): Badge[] {
  const badgeTemplates = [
    { name: "First Steps", description: "Complete your first goal", rarity: 'common' as const },
    { name: "Week Warrior", description: "Maintain a 7-day streak", rarity: 'common' as const },
    { name: "Month Master", description: "Complete 30 days of goals", rarity: 'rare' as const },
    { name: "XP Hunter", description: "Earn 1000 XP points", rarity: 'rare' as const },
    { name: "Consistency King", description: "50-day streak achieved", rarity: 'epic' as const },
    { name: "Legendary Focus", description: "100-day streak achieved", rarity: 'legendary' as const },
    { name: "Early Bird", description: "Complete 10 morning goals", rarity: 'common' as const },
    { name: "Night Owl", description: "Complete 10 evening goals", rarity: 'common' as const },
    { name: "Perfectionist", description: "Complete 100% of weekly goals", rarity: 'rare' as const },
    { name: "Overachiever", description: "Exceed daily goals 10 times", rarity: 'epic' as const },
  ];
  
  return badgeTemplates.map((template, index) => ({
    id: `badge-${index}`,
    ...template,
    earned: Math.random() > 0.4, // 60% chance of being earned
    earnedDate: Math.random() > 0.4 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
  }));
}

function generateLeaderboard(): LeaderboardEntry[] {
  const names = [
    "Alex Chen", "Sarah Johnson", "Mike Rodriguez", "Emma Wilson", "David Kim",
    "Lisa Zhang", "Tom Anderson", "Maya Patel", "Chris Brown", "Anna Lee"
  ];
  
  return names.map((name, index) => ({
    rank: index + 1,
    name,
    xp: Math.floor(Math.random() * 5000) + 2000,
    level: Math.floor(Math.random() * 15) + 5,
    streak: Math.floor(Math.random() * 30) + 1,
  })).sort((a, b) => b.xp - a.xp).map((entry, index) => ({ ...entry, rank: index + 1 }));
}

function generateAdaptiveFeedback(): string[] {
  const feedback = [
    "You're 12% ahead of yesterday's performance!",
    "Your consistency has improved by 28% this week.",
    "You're beating 73% of users in your level range.",
    "Your morning productivity is 45% higher than average.",
    "You've maintained focus 18% longer than last week.",
    "Your goal completion rate is in the top 15% globally.",
  ];
  
  return feedback.slice(0, Math.floor(Math.random() * 3) + 2); // Return 2-4 feedback items
}

function getDefaultDashboardData(): DashboardData {
  return {
    dailyProgress: 0,
    stats: {
      streakDays: 0,
      xpPoints: 0,
      leaderboardRank: 0,
      level: 1,
    },
    motivationalQuote: "Every expert was once a beginner.",
    aiTip: "Start with small, achievable goals to build momentum.",
    heatmapData: [],
    chartData: [],
    badges: [],
    leaderboard: [],
    adaptiveFeedback: ["Welcome to your self-improvement journey!"],
  };
}

// Utility functions for calculations
export function calculateLevel(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

export function calculateXPForNextLevel(currentXP: number): number {
  const currentLevel = calculateLevel(currentXP);
  return currentLevel * 500;
}

export function calculateProgressToNextLevel(currentXP: number): number {
  const currentLevel = calculateLevel(currentXP);
  const xpForCurrentLevel = (currentLevel - 1) * 500;
  const xpForNextLevel = currentLevel * 500;
  const progressXP = currentXP - xpForCurrentLevel;
  const totalXPNeeded = xpForNextLevel - xpForCurrentLevel;
  
  return Math.floor((progressXP / totalXPNeeded) * 100);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getBadgeColor(rarity: Badge['rarity']): string {
  switch (rarity) {
    case 'common':
      return 'text-gray-400';
    case 'rare':
      return 'text-neon-blue';
    case 'epic':
      return 'text-neon-purple';
    case 'legendary':
      return 'text-xp-gold';
    default:
      return 'text-gray-400';
  }
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 100) return '🔥🔥🔥';
  if (streak >= 50) return '🔥🔥';
  if (streak >= 10) return '🔥';
  if (streak >= 3) return '⚡';
  return '✨';
}
