"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChartDataPoint } from "@/lib/utils";
import { useMemo } from "react";

interface GrowthChartProps {
  data: ChartDataPoint[];
}

export function GrowthChart({ data }: GrowthChartProps) {
  // Fallback for empty or invalid data
  const chartData = data && data.length > 0 ? data : [];
  
  const { maxXP, maxGoals, totalXP, totalGoals, avgXP } = useMemo(() => {
    if (chartData.length === 0) {
      return { maxXP: 0, maxGoals: 0, totalXP: 0, totalGoals: 0, avgXP: 0 };
    }
    
    const xpValues = chartData.map(d => d.xp);
    const goalValues = chartData.map(d => d.goals);
    
    return {
      maxXP: Math.max(...xpValues),
      maxGoals: Math.max(...goalValues),
      totalXP: xpValues.reduce((sum, xp) => sum + xp, 0),
      totalGoals: goalValues.reduce((sum, goals) => sum + goals, 0),
      avgXP: Math.round(xpValues.reduce((sum, xp) => sum + xp, 0) / xpValues.length),
    };
  }, [chartData]);

  const chartWidth = 600;
  const chartHeight = 200;
  const padding = 40;

  const getXPosition = (index: number) => {
    return padding + (index / (chartData.length - 1)) * (chartWidth - 2 * padding);
  };

  const getYPosition = (value: number, maxValue: number) => {
    return chartHeight - padding - ((value / maxValue) * (chartHeight - 2 * padding));
  };

  // Generate path for XP line
  const xpPath = chartData.length > 1 ? chartData.map((point, index) => {
    const x = getXPosition(index);
    const y = getYPosition(point.xp, maxXP);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ') : '';

  // Generate path for Goals line
  const goalsPath = chartData.length > 1 ? chartData.map((point, index) => {
    const x = getXPosition(index);
    const y = getYPosition(point.goals, maxGoals);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ') : '';

  // Generate area path for XP
  const xpAreaPath = chartData.length > 1 ? [
    xpPath,
    `L ${getXPosition(chartData.length - 1)} ${chartHeight - padding}`,
    `L ${padding} ${chartHeight - padding}`,
    'Z'
  ].join(' ') : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="card-gradient border-0 p-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-neon-blue/5" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Growth Chart</h3>
              <p className="text-gray-400 text-sm">30-day XP and goals progress</p>
            </div>
            <div className="flex space-x-4 text-right">
              <div>
                <div className="text-lg font-bold text-neon-blue">{totalXP}</div>
                <div className="text-xs text-gray-400">Total XP</div>
              </div>
              <div>
                <div className="text-lg font-bold text-neon-purple">{totalGoals}</div>
                <div className="text-xs text-gray-400">Total Goals</div>
              </div>
            </div>
          </div>

          {chartData.length > 0 ? (
            <div className="space-y-4">
              {/* Chart */}
              <div className="relative">
                <svg
                  width={chartWidth}
                  height={chartHeight}
                  className="w-full h-auto"
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                >
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                    </pattern>
                    
                    {/* Gradients */}
                    <linearGradient id="xpGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--neon-blue)" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="var(--neon-blue)" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Grid background */}
                  <rect width={chartWidth} height={chartHeight} fill="url(#grid)" />
                  
                  {/* XP Area */}
                  {xpAreaPath && (
                    <motion.path
                      d={xpAreaPath}
                      fill="url(#xpGradient)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  )}
                  
                  {/* XP Line */}
                  {xpPath && (
                    <motion.path
                      d={xpPath}
                      fill="none"
                      stroke="var(--neon-blue)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3, duration: 2, ease: "easeInOut" }}
                      style={{
                        filter: "drop-shadow(0 0 6px var(--neon-blue))"
                      }}
                    />
                  )}
                  
                  {/* Goals Line */}
                  {goalsPath && (
                    <motion.path
                      d={goalsPath}
                      fill="none"
                      stroke="var(--neon-purple)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.8, duration: 2, ease: "easeInOut" }}
                      style={{
                        filter: "drop-shadow(0 0 4px var(--neon-purple))"
                      }}
                    />
                  )}
                  
                  {/* Data points */}
                  {chartData.map((point, index) => (
                    <g key={index}>
                      {/* XP point */}
                      <motion.circle
                        cx={getXPosition(index)}
                        cy={getYPosition(point.xp, maxXP)}
                        r="4"
                        fill="var(--neon-blue)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + (index * 0.05), duration: 0.3 }}
                        style={{
                          filter: "drop-shadow(0 0 4px var(--neon-blue))"
                        }}
                      />
                      
                      {/* Goals point */}
                      <motion.circle
                        cx={getXPosition(index)}
                        cy={getYPosition(point.goals, maxGoals)}
                        r="3"
                        fill="var(--neon-purple)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 + (index * 0.05), duration: 0.3 }}
                        style={{
                          filter: "drop-shadow(0 0 4px var(--neon-purple))"
                        }}
                      />
                    </g>
                  ))}
                  
                  {/* Y-axis labels */}
                  <text x="10" y="30" fill="rgba(255,255,255,0.6)" fontSize="12" textAnchor="start">
                    {maxXP}
                  </text>
                  <text x="10" y={chartHeight - 10} fill="rgba(255,255,255,0.6)" fontSize="12" textAnchor="start">
                    0
                  </text>
                </svg>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-0.5 bg-neon-blue rounded" style={{
                    filter: "drop-shadow(0 0 4px var(--neon-blue))"
                  }} />
                  <span className="text-sm text-gray-300">XP Points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-0.5 bg-neon-purple rounded border-dashed" style={{
                    filter: "drop-shadow(0 0 4px var(--neon-purple))"
                  }} />
                  <span className="text-sm text-gray-300">Goals Completed</span>
                </div>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-neon-green">{avgXP}</div>
                  <div className="text-xs text-gray-400">Avg XP/Day</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-neon-blue">{maxXP}</div>
                  <div className="text-xs text-gray-400">Best Day</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-neon-purple">
                    {chartData.length > 7 ? 
                      Math.round(((chartData.slice(-7).reduce((sum, d) => sum + d.xp, 0) / 7) / avgXP - 1) * 100) : 0}%
                  </div>
                  <div className="text-xs text-gray-400">Weekly Growth</div>
                </div>
              </motion.div>
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📈</div>
              <p className="text-gray-400 mb-2">No growth data available</p>
              <p className="text-gray-500 text-sm">Complete goals to track your progress over time!</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
