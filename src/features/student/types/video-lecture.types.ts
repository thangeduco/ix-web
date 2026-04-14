// src/features/student/types/video-lecture.types.ts
import type { YoutubePlayerInstance } from '../components/task-content/StudentYoutubePlayer'

export type PrimitiveId = string | number

export type NormalizedQuizOption = {
  key: string
  text: string
  nextQuestionId?: string | null
}

export type NormalizedQuizQuestion = {
  id: string
  questionText: string
  options: NormalizedQuizOption[]
  correctAnswer: string
  score: number
  isStartQuestion: boolean
  nextQuestionIdCorrect?: string | null
  nextQuestionIdWrong?: string | null
}

export type NormalizedQuizEvent = {
  id: string
  title: string
  triggerSecond: number
  pauseVideo: boolean
  isRequired: boolean
  questions: NormalizedQuizQuestion[]
}

export type PopupAnswerMap = Record<
  string,
  {
    selectedAnswer: string
    isCorrect: boolean
  }
>

export type VideoLecturePopupState = {
  eventIndex: number
  questionIndex: number
  selectedAnswer?: string
  isAnswered: boolean
  isCorrect?: boolean
  attemptId?: PrimitiveId | null
  correctAnswersCount: number
  answersByQuestionId: PopupAnswerMap
}

export type YoutubeResumeRequest = {
  token: number
  second: number
} | null

export type VideoLecturePlayerRefs = {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
  youtubePlayerRef: React.MutableRefObject<YoutubePlayerInstance | null>
}