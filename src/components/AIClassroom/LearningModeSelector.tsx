'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LEARNING_MODES } from '@/data/ai-teachers'

interface LearningModeSelectorProps {
  onSelect: (mode: string) => void
  selectedMode?: string
}

export default function LearningModeSelector({
  onSelect,
  selectedMode
}: LearningModeSelectorProps) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-cyan-400 mb-4">Choose Your Learning Mode</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {LEARNING_MODES.map((mode, index) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(mode.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative group p-4 rounded-xl transition-all duration-300 ${
              selectedMode === mode.id
                ? 'bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/50'
                : 'bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700'
            }`}
            title={mode.description}
          >
            {/* Glow effect */}
            {selectedMode === mode.id && (
              <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{ boxShadow: [
                  'inset 0 0 20px rgba(0,217,255,0.2)',
                  'inset 0 0 40px rgba(157,78,221,0.3)',
                  'inset 0 0 20px rgba(0,217,255,0.2)'
                ] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-2xl">{mode.icon}</span>
              <span className={`text-sm font-semibold text-center ${
                selectedMode === mode.id ? 'text-white' : 'text-slate-300'
              }`}>
                {mode.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
