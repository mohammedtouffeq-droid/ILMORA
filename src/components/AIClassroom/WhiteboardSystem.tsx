'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { TeacherID } from '@/types/ai-teachers'

interface WhiteboardSystemProps {
  teacherId: TeacherID
  mode: string
}

export default function WhiteboardSystem({
  teacherId,
  mode
}: WhiteboardSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState(3)
  const [brushColor, setBrushColor] = useState('#00d9ff')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const ctx = canvas.getContext('2d')
    if (ctx) {
      // Draw background
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)'
      ctx.lineWidth = 1
      const gridSize = 20
      for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) {
      const rect = canvas.getBoundingClientRect()
      ctx.beginPath()
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) {
      const rect = canvas.getBoundingClientRect()
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
      ctx.strokeStyle = brushColor
      ctx.lineWidth = brushSize
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) {
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Redraw grid
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)'
      ctx.lineWidth = 1
      const gridSize = 20
      for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Whiteboard Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-4 border border-cyan-500/20 flex flex-wrap gap-4 items-center"
      >
        <div className="flex items-center gap-2">
          <label className="text-sm text-cyan-300">Brush Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-xs text-slate-400">{brushSize}px</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-cyan-300">Color:</label>
          <div className="flex gap-2">
            {['#00d9ff', '#9d4edd', '#ff006e', '#0066ff', '#ffffff'].map((color) => (
              <button
                key={color}
                onClick={() => setBrushColor(color)}
                className={`w-6 h-6 rounded-full transition-all ${
                  brushColor === color ? 'ring-2 ring-offset-2 ring-cyan-400' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={clearCanvas}
          className="ml-auto px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded-lg transition-all font-semibold"
        >
          Clear Canvas
        </button>
      </motion.div>

      {/* Whiteboard Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-cyan-500/20 overflow-hidden"
      >
        <div className="relative h-96 bg-gradient-to-br from-slate-900 to-black rounded-lg overflow-hidden shadow-2xl">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full h-full cursor-crosshair"
          />
        </div>
      </motion.div>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/20"
      >
        <p className="text-sm text-purple-300 font-semibold mb-2">AI Suggestions:</p>
        <p className="text-xs text-slate-300">
          💡 Try drawing a diagram related to the concept you're learning. The AI will analyze and provide explanations!
        </p>
      </motion.div>
    </div>
  )
}
