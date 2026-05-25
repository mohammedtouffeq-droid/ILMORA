'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AI_TEACHERS } from '@/data/ai-teachers'
import type { TeacherID } from '@/types/ai-teachers'

interface TeacherSelectorProps {
  onSelect: (teacherId: TeacherID) => void
  selectedTeacher?: TeacherID
}

export default function TeacherSelector({
  onSelect,
  selectedTeacher
}: TeacherSelectorProps) {
  const [hoveredTeacher, setHoveredTeacher] = useState<string | null>(null)

  const teacherEntries = Object.entries(AI_TEACHERS)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black relative overflow-hidden p-6">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,217,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Cosmic particles background */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-sm"
            animate={{
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Choose Your AI Teacher
          </h1>
          <p className="text-xl text-cyan-300/80 font-light">
            Select from 10 specialized AI educators
          </p>
        </motion.div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {teacherEntries.map(([teacherId, teacher], index) => (
            <motion.div
              key={teacherId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredTeacher(teacherId)}
              onMouseLeave={() => setHoveredTeacher(null)}
              onClick={() => onSelect(teacherId as TeacherID)}
              className="cursor-pointer group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`relative h-72 rounded-2xl overflow-hidden transition-all duration-300 ${
                  selectedTeacher === teacherId
                    ? `bg-gradient-to-br ${teacher.color} p-1`
                    : 'bg-gradient-to-br from-slate-700 to-slate-800 p-1 hover:shadow-lg'
                }`}
              >
                {/* Card background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black rounded-xl"></div>

                {/* Animated border glow */}
                {(hoveredTeacher === teacherId || selectedTeacher === teacherId) && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{ boxShadow: [
                      `0 0 20px rgba(0,217,255,0.3)`,
                      `0 0 40px rgba(0,217,255,0.5)`,
                      `0 0 20px rgba(0,217,255,0.3)`
                    ] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-between p-6 rounded-xl z-10">
                  {/* Emoji */}
                  <motion.div
                    animate={hoveredTeacher === teacherId ? { scale: 1.2, rotate: 360 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-6xl mb-4"
                  >
                    {teacher.emoji}
                  </motion.div>

                  {/* Name & Subject */}
                  <div className="text-center flex-1 flex flex-col justify-center">
                    <h3 className={`text-xl font-bold mb-1 transition-colors ${
                      hoveredTeacher === teacherId
                        ? 'text-cyan-400'
                        : 'text-white'
                    }`}>
                      {teacher.name}
                    </h3>
                    <p className="text-sm text-slate-400 mb-3">{teacher.subject}</p>
                  </div>

                  {/* Personality */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredTeacher === teacherId ? 1 : 0.5 }}
                    className="text-xs text-slate-300 text-center font-light italic mb-3"
                  >
                    "{teacher.favoritePhrase}"
                  </motion.p>

                  {/* Select button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      selectedTeacher === teacherId
                        ? `bg-gradient-to-r ${teacher.color} text-white shadow-lg`
                        : 'bg-slate-700 text-cyan-300 hover:bg-slate-600'
                    }`}
                  >
                    {selectedTeacher === teacherId ? '✓ Selected' : 'Select'}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Selected Teacher Info */}
        {selectedTeacher && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                {AI_TEACHERS[selectedTeacher].name} - Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {AI_TEACHERS[selectedTeacher].expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
