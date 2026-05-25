'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AI_TEACHERS } from '@/data/ai-teachers'
import type { TeacherID } from '@/types/ai-teachers'

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface AIChatProps {
  teacherId: TeacherID
  mode: string
}

export default function AIChat({ teacherId, mode }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const teacher = AI_TEACHERS[teacherId]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initial greeting
    const greeting = `Hello! I'm ${teacher.name}, your ${teacher.subject} instructor. ${teacher.favoritePhrase} How can I help you learn today?`
    setMessages([{
      id: '0',
      role: 'ai',
      content: greeting,
      timestamp: new Date()
    }])
  }, [teacherId])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `That's a great question! In ${teacher.subject}, this concept is crucial. Let me explain it step by step...`,
        `I love your curiosity! This topic connects to several important ideas in ${teacher.subject}. Here's what you should know...`,
        `Excellent query! This is where ${teacher.personality} thinking becomes essential. Let me break this down for you...`,
        `I appreciate your engagement! This is a perfect example of ${teacher.learningMode} learning. Here's my explanation...`
      ]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000 + Math.random() * 1000)
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-cyan-500/20 overflow-hidden">
      {/* Chat Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-cyan-500/20 p-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{teacher.emoji}</span>
          <div className="flex-1">
            <h3 className="font-bold text-white">{teacher.name}</h3>
            <p className="text-xs text-cyan-300/60">Online • Ready to teach</p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-sm rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-cyan-600 to-cyan-700 text-white rounded-br-none'
                    : 'bg-gradient-to-br from-slate-700 to-slate-800 text-slate-100 rounded-bl-none border border-cyan-500/30'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-slate-100 rounded-lg p-3 rounded-bl-none border border-cyan-500/30">
              <div className="flex gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-cyan-500/20 p-4 bg-gradient-to-r from-slate-900 to-slate-800"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a question..."
            className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 disabled:opacity-50 text-white rounded-lg px-4 py-2 font-semibold transition-all"
          >
            Send
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
