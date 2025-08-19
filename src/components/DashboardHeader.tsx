"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface DashboardHeaderProps {
  motivationalQuote: string;
  aiTip: string;
}

export function DashboardHeader({ motivationalQuote, aiTip }: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full mb-8"
    >
      <Card className="card-gradient border-0 p-8 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        
        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-2">
              Level Up Your Life
            </h1>
            <p className="text-gray-400 text-lg">
              Transform yourself one goal at a time
            </p>
          </motion.div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-6"
          >
            <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
              <div className="flex items-start space-x-4">
                <div className="text-neon-blue text-3xl">💭</div>
                <div>
                  <h3 className="text-neon-blue font-semibold mb-2">Daily Inspiration</h3>
                  <blockquote className="text-white text-lg italic leading-relaxed">
                    "{motivationalQuote}"
                  </blockquote>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Tip Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
              <div className="flex items-start space-x-4">
                <div className="text-neon-purple text-3xl">🤖</div>
                <div>
                  <h3 className="text-neon-purple font-semibold mb-2">AI Coach Insight</h3>
                  <p className="text-gray-200 leading-relaxed">
                    {aiTip}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-neon-blue/10 rounded-full blur-xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-neon-purple/10 rounded-full blur-xl" />
        </div>
      </Card>
    </motion.div>
  );
}
