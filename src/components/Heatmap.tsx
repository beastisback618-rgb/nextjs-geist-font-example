"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface HeatmapProps {
  data: number[][]; // 2D array where data[week][day] represents activity level (0-4)
}

export function Heatmap({ data }: HeatmapProps) {
  // Fallback for empty or invalid data
  const heatmapData = data && data.length > 0 ? data : [];
  
  const getActivityColor = (level: number): string => {
    switch (level) {
      case 0:
        return "rgba(255, 255, 255, 0.05)"; // Very low activity
      case 1:
        return "var(--neon-blue)"; // Low activity
      case 2:
        return "var(--neon-purple)"; // Medium activity
      case 3:
        return "var(--neon-green)"; // High activity
      case 4:
        return "var(--xp-gold)"; // Very high activity
      default:
        return "rgba(255, 255, 255, 0.05)";
    }
  };

  const getActivityLabel = (level: number): string => {
    switch (level) {
      case 0:
        return "No activity";
      case 1:
        return "Low activity";
      case 2:
        return "Medium activity";
      case 3:
        return "High activity";
      case 4:
        return "Very high activity";
      default:
        return "No activity";
    }
  };

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Calculate total activity and streak
  const totalActivity = heatmapData.flat().reduce((sum, level) => sum + level, 0);
  const averageActivity = heatmapData.length > 0 ? (totalActivity / (heatmapData.length * 7)).toFixed(1) : "0.0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="card-gradient border-0 p-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Activity Heatmap</h3>
              <p className="text-gray-400 text-sm">
                {heatmapData.length * 7} days • Average {averageActivity} activity/day
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl text-neon-green mb-1">{totalActivity}</div>
              <div className="text-gray-400 text-xs">Total Activity</div>
            </div>
          </div>

          {/* Heatmap Grid */}
          {heatmapData.length > 0 ? (
            <div className="space-y-4">
              {/* Month labels */}
              <div className="flex justify-between text-xs text-gray-500 px-8">
                {monthLabels.slice(0, 4).map((month, index) => (
                  <span key={month}>{month}</span>
                ))}
              </div>

              {/* Main heatmap */}
              <div className="flex items-start space-x-1">
                {/* Day labels */}
                <div className="flex flex-col space-y-1 text-xs text-gray-500 pr-2">
                  {dayLabels.map((day, index) => (
                    <div key={day} className="h-3 flex items-center">
                      {index % 2 === 1 && <span>{day}</span>}
                    </div>
                  ))}
                </div>

                {/* Heatmap cells */}
                <div className="flex space-x-1">
                  {heatmapData.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col space-y-1">
                      {week.map((level, dayIndex) => (
                        <motion.div
                          key={`${weekIndex}-${dayIndex}`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ 
                            delay: (weekIndex * 7 + dayIndex) * 0.01,
                            duration: 0.2 
                          }}
                          whileHover={{ 
                            scale: 1.2,
                            transition: { duration: 0.1 }
                          }}
                          className="w-3 h-3 rounded-sm cursor-pointer relative group"
                          style={{
                            backgroundColor: getActivityColor(level),
                            boxShadow: level > 0 ? `0 0 4px ${getActivityColor(level)}40` : 'none'
                          }}
                          title={`Week ${weekIndex + 1}, Day ${dayIndex + 1}: ${getActivityLabel(level)}`}
                        >
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                            {getActivityLabel(level)}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between pt-4">
                <span className="text-xs text-gray-500">Less</span>
                <div className="flex space-x-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className="w-3 h-3 rounded-sm"
                      style={{
                        backgroundColor: getActivityColor(level),
                        boxShadow: level > 0 ? `0 0 2px ${getActivityColor(level)}40` : 'none'
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">More</span>
              </div>
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-gray-400 mb-2">No activity data available</p>
              <p className="text-gray-500 text-sm">Start completing goals to see your activity heatmap!</p>
            </div>
          )}

          {/* Stats summary */}
          {heatmapData.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-white/10"
            >
              <div className="text-center">
                <div className="text-lg font-bold text-neon-blue">
                  {heatmapData.flat().filter(level => level > 0).length}
                </div>
                <div className="text-xs text-gray-400">Active Days</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-neon-purple">
                  {Math.max(...heatmapData.flat())}
                </div>
                <div className="text-xs text-gray-400">Peak Activity</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-neon-green">
                  {Math.round((heatmapData.flat().filter(level => level > 0).length / (heatmapData.length * 7)) * 100)}%
                </div>
                <div className="text-xs text-gray-400">Consistency</div>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
