import { create } from 'zustand'
import type { TeacherID, TeachingSession, AIMemory } from '@/types/ai-teachers'

interface TeachingStore {
  currentSession: TeachingSession | null
  aiMemories: Record<string, AIMemory>
  startSession: (session: TeachingSession) => void
  endSession: () => void
  updateMemory: (studentId: string, teacherId: TeacherID, memory: Partial<AIMemory>) => void
  getMemory: (studentId: string, teacherId: TeacherID) => AIMemory | undefined
}

export const useTeachingStore = create<TeachingStore>((set, get) => ({
  currentSession: null,
  aiMemories: {},

  startSession: (session: TeachingSession) => set({ currentSession: session }),

  endSession: () => set({ currentSession: null }),

  updateMemory: (studentId: string, teacherId: TeacherID, memory: Partial<AIMemory>) => {
    set(state => {
      const key = `${studentId}-${teacherId}`
      const existing = state.aiMemories[key]
      return {
        aiMemories: {
          ...state.aiMemories,
          [key]: { ...existing, ...memory }
        }
      }
    })
  },

  getMemory: (studentId: string, teacherId: TeacherID) => {
    const key = `${studentId}-${teacherId}`
    return get().aiMemories[key]
  }
}))
