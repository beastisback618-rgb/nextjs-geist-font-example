"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface AdaptiveFeedbackProps {
  feedback: string[];
}

export function AdaptiveFeedback({ feedback }: AdaptiveFeedbackProps) {
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Fallback for empty feedback
  const feedbackList = feedback && feedback.length > 0 ? feedback : [
    "Welcome to your self-improvement journey!",
    "Every small step counts towards your bigger goals.",
    "Consistency is the key to lasting change."
  ];

  // Auto-rotate feedback every 5 seconds
  useEffect(() => {
    if (feedbackList.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentFeedbackIndex((prev) => (prev + 1) % feedbackList.length);
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [feedbackList.length]);

  const currentFeedback = feedbackList[currentFeedbackIndex];

  const getFeedbackIcon = (text: string): string => {
    if (text.includes('ahead') || text.includes('%')) return '📈';
    if (text.includes('improved') || text.includes('better')) return '⬆️';
    if (text.includes('beating') || text.includes('top')) return '🏆';
    if (text.includes('focus') || text.includes('productivity')) return '🎯';
    if (text.includes('consistency') || text.includes('streak')) return '🔥';
    if (text.includes('goal') || text.includes('completion')) return '✅';
    return '💡';
  };

  const getFeedbackColor = (text: string): string => {
    if (text.includes('ahead') || text.includes('improved')) return 'var(--neon-green)';
    if (text.includes('beating') || text.includes('top')) return 'var(--xp-gold)';
    if (text.includes('focus') || text.includes('productivity')) return 'var(--neon-blue)';
    if (text.includes('consistency')) return 'var(--streak-fire)';
    return 'var(--neon-purple)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="card-gradient border-0 p-6 relative overflow-hidden">
        {/* Background glow */}
        <div 
          className="absolute inset-0 opacity-10 blur-2xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at center, ${getFeedbackColor(currentFeedback)}, transparent 70%)`
          }}
        />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🤖</div>
              <div>
                <h3 className="text-xl font-semibold text-white">AI Insights</h3>
                <p className="text-gray-400 text-sm">Personalized feedback based on your progress</p>
              </div>
            </div>
            
            {/* Feedback counter */}
            {feedbackList.length > 1 && (
              <div className="flex space-x-1">
                {feedbackList.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentFeedbackIndex 
                        ? 'bg-neon-blue' 
                        : 'bg-white/20'
                    }`}
                    animate={index === currentFeedbackIndex ? {
                      scale: [1, 1.2, 1],
                    } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: index === currentFeedbackIndex ? Infinity : 0,
                      repeatDelay: 1,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Main feedback display */}
          <motion.div
            key={currentFeedbackIndex}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              x: isVisible ? 0 : -20, 
              scale: isVisible ? 1 : 0.95 
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-black/30 rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-start space-x-4">
              {/* Dynamic icon */}
              <motion.div
                className="text-3xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                {getFeedbackIcon(currentFeedback)}
              </motion.div>
              
              <div className="flex-1">
                <motion.p
                  className="text-white text-lg leading-relaxed"
                  style={{ color: getFeedbackColor(currentFeedback) }}
                >
                  {currentFeedback}
                </motion.p>
                
                {/* Progress indicator for percentage-based feedback */}
                {currentFeedback.includes('%') && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-3 h-1 bg-gradient-to-r from-transparent via-current to-transparent rounded-full opacity-30"
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Additional insights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Trend indicator */}
            <div className="bg-black/20 rounded-xl p-4 text-center">
              <div className="text-neon-green text-xl mb-1">📊</div>
              <div className="text-sm text-gray-300">Trending Up</div>
              <div className="text-xs text-gray-500">Performance improving</div>
            </div>
            
            {/* Motivation level */}
            <div className="bg-black/20 rounded-xl p-4 text-center">
              <div className="text-neon-blue text-xl mb-1">⚡</div>
              <div className="text-sm text-gray-300">High Energy</div>
              <div className="text-xs text-gray-500">Peak performance zone</div>
            </div>
            
            {/* Next milestone */}
            <div className="bg-black/20 rounded-xl p-4 text-center">
              <div className="text-neon-purple text-xl mb-1">🎯</div>
              <div className="text-sm text-gray-300">Next Goal</div>
              <div className="text-xs text-gray-500">Level up soon</div>
            </div>
          </motion.div>

          {/* Action suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-6 pt-4 border-t border-white/10"
          >
            <h4 className="text-sm font-medium text-gray-300 mb-3">💡 Quick Actions</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Set new goal",
                "Review progress",
                "Celebrate wins",
                "Plan tomorrow"
              ].map((action, index) => (
                <motion.button
                  key={action}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + (index * 0.1), duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs text-gray-300 border border-white/10 transition-all duration-200"
                >
                  {action}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Floating particles for visual appeal */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [-10, -20, -10],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
