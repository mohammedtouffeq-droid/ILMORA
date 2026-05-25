import { useState, useCallback } from 'react'
import type { StudentProfile } from '@/types/ai-teachers'

const defaultProfile: StudentProfile = {
  id: 'student-1',
  intelligenceLevel: 'intermediate',
  learningSpeed: 'normal',
  weakTopics: [],
  favoriteSubjects: [],
  preferredLearningMode: 'text',
  emotionalState: 'focused',
  progressMap: {}
}

export function useAdaptiveLearning(initialProfile?: StudentProfile) {
  const [profile, setProfile] = useState<StudentProfile>(initialProfile || defaultProfile)

  const updateIntelligenceLevel = useCallback((level: 'beginner' | 'intermediate' | 'advanced' | 'genius') => {
    setProfile(prev => ({ ...prev, intelligenceLevel: level }))
  }, [])

  const updateLearningSpeed = useCallback((speed: 'slow' | 'normal' | 'fast' | 'lightning') => {
    setProfile(prev => ({ ...prev, learningSpeed: speed }))
  }, [])

  const addWeakTopic = useCallback((topic: string) => {
    setProfile(prev => ({
      ...prev,
      weakTopics: [...new Set([...prev.weakTopics, topic])]
    }))
  }, [])

  const setEmotionalState = useCallback((state: 'motivated' | 'confused' | 'tired' | 'focused' | 'excited') => {
    setProfile(prev => ({ ...prev, emotionalState: state }))
  }, [])

  const updateProgress = useCallback((teacherId: string, progress: number) => {
    setProfile(prev => ({
      ...prev,
      progressMap: {
        ...prev.progressMap,
        [teacherId]: progress
      }
    }))
  }, [])

  return {
    profile,
    updateIntelligenceLevel,
    updateLearningSpeed,
    addWeakTopic,
    setEmotionalState,
    updateProgress
  }
}
