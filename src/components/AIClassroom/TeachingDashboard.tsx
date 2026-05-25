'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TeacherSelector from './TeacherSelector'
import LearningModeSelector from './LearningModeSelector'
import WhiteboardSystem from './WhiteboardSystem'
import AIChat from './AIChat'
import type { TeacherID } from '@/types/ai-teachers'

export default function TeachingDashboard() {
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherID | null>(null)
  const [selectedMode, setSelectedMode] = useState<string>('text')
  const [isSessionActive, setIsSessionActive] = useState(false)

  if (!selectedTeacher) {
    return <TeacherSelector onSelect={setSelectedTeacher} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Session Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-cyan-500/30 p-6 sticky top-0 z-50 backdrop-blur-md"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedTeacher(null)}
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all"
            >
              ← Change Teacher
            </button>
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">Learning Session Active</h2>
              <p className="text-slate-400">Mode: {selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)}</p>
            </div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50"
          >
            <span className="text-white font-bold">●</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Learning Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-cyan-500/20"
        >
          <LearningModeSelector
            selectedMode={selectedMode}
            onSelect={setSelectedMode}
          />
        </motion.div>

        {/* Main Teaching Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Whiteboard - takes 2 columns on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2"
          >
            <WhiteboardSystem teacherId={selectedTeacher} mode={selectedMode} />
          </motion.div>

          {/* AI Chat - sidebar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <AIChat teacherId={selectedTeacher} mode={selectedMode} />
          </motion.div>
        </div>

        {/* Session Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Progress', value: '75%', color: 'from-emerald-500 to-green-600' },
            { label: 'Time Spent', value: '32 min', color: 'from-blue-500 to-cyan-600' },
            { label: 'Concepts Learned', value: '12', color: 'from-purple-500 to-pink-600' },
            { label: 'Comprehension', value: '89%', color: 'from-orange-500 to-red-600' }
          ].map((stat, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}
            >
              <p className="text-sm font-semibold opacity-90 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
