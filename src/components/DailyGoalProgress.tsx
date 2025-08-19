"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface DailyGoalProgressProps {
  progress: number; // 0-100
}

export function DailyGoalProgress({ progress }: DailyGoalProgressProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  // Validate progress input
  const validProgress = Math.max(0, Math.min(100, progress || 0));
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(validProgress);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [validProgress]);

  // Calculate circle properties
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "var(--neon-green)";
    if (progress >= 70) return "var(--neon-blue)";
    if (progress >= 40) return "var(--neon-purple)";
    return "var(--neon-pink)";
  };

  const getProgressMessage = (progress: number) => {
    if (progress >= 100) return "Perfect Day! 🎉";
    if (progress >= 90) return "Almost There! 🔥";
    if (progress >= 70) return "Great Progress! ⚡";
    if (progress >= 40) return "Keep Going! 💪";
    return "Just Getting Started! ✨";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="card-gradient border-0 p-8 text-center relative overflow-hidden">
        {/* Background glow */}
        <div 
          className="absolute inset-0 opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(circle at center, ${getProgressColor(validProgress)}, transparent 70%)`
          }}
        />
        
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-white mb-6">Daily Goal Progress</h3>
          
          {/* Circular Progress Ring */}
          <div className="relative inline-block">
            <svg
              width="200"
              height="200"
              className="transform -rotate-90"
            >
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
                fill="transparent"
              />
              
              {/* Progress circle */}
              <motion.circle
                cx="100"
                cy="100"
                r={radius}
                stroke={getProgressColor(validProgress)}
                strokeWidth="8"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{
                  filter: `drop-shadow(0 0 10px ${getProgressColor(validProgress)})`
                }}
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="text-center"
              >
                <div className="stat-number text-white mb-1">
                  {validProgress}%
                </div>
                <div className="text-gray-400 text-sm">Complete</div>
              </motion.div>
            </div>
          </div>
          
          {/* Progress message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-6"
          >
            <p 
              className="text-lg font-medium"
              style={{ color: getProgressColor(validProgress) }}
            >
              {getProgressMessage(validProgress)}
            </p>
          </motion.div>
          
          {/* Progress bar at bottom */}
          <div className="mt-6 bg-black/30 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: getProgressColor(validProgress) }}
              initial={{ width: 0 }}
              animate={{ width: `${validProgress}%` }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            />
          </div>
          
          {/* Decorative particles */}
          {validProgress >= 90 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute inset-0 pointer-events-none"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-neon-green rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [-10, -30, -10],
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
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
