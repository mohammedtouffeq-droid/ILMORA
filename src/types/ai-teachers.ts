// AI Teacher Type Definitions
export type TeacherID = 'physics' | 'math' | 'biology' | 'coding' | 'english' | 'history' | 'business' | 'medical' | 'engineering' | 'language'

export interface TeacherPersonality {
  name: string
  subject: string
  personality: string
  teachingStyle: string
  voiceTone: string
  emoji: string
  color: string
  accentGlow: string
  expertise: string[]
  favoritePhrase: string
  learningMode: 'visual' | 'logical' | 'interactive' | 'storytelling'
}

export interface StudentProfile {
  id: string
  intelligenceLevel: 'beginner' | 'intermediate' | 'advanced' | 'genius'
  learningSpeed: 'slow' | 'normal' | 'fast' | 'lightning'
  weakTopics: string[]
  favoriteSubjects: TeacherID[]
  preferredLearningMode: 'text' | 'voice' | 'visual' | 'gaming' | 'story' | 'cinematic'
  emotionalState: 'motivated' | 'confused' | 'tired' | 'focused' | 'excited'
  progressMap: Record<TeacherID, number>
}

export interface TeachingSession {
  id: string
  teacherId: TeacherID
  studentId: string
  topic: string
  mode: 'text' | 'voice' | 'visual' | 'gaming' | 'story' | 'cinematic'
  startTime: Date
  duration: number
  comprehensionLevel: number
  emotionalFeedback: string[]
}

export interface QuizQuestion {
  id: string
  type: 'mcq' | 'subjective' | 'coding' | 'visual'
  question: string
  difficulty: 'easy' | 'medium' | 'hard' | 'challenge'
  teacherId: TeacherID
  topic: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

export interface AIMemory {
  studentId: string
  teacherId: TeacherID
  lastTopicsTaught: string[]
  strugglingAreas: string[]
  strongAreas: string[]
  comprehensionHistory: number[]
  preferredExplanationStyle: string
  emotionalTriggers: Record<string, string>
  notesGenerated: string[]
  quizzesTaken: number
  averageScore: number
}
