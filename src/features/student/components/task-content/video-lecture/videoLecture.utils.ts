// src/features/student/components/task-content/video-lecture/videoLecture.utils.ts
import type { StudentVideoTaskDetail } from '../../../types/student.types'
import type {
  NormalizedQuizEvent,
  NormalizedQuizOption,
} from '../../../types/video-lecture.types'

export function getVideoErrorMessage(videoUrl?: string | null) {
  if (!videoUrl?.trim()) {
    return 'Video chưa có đường dẫn phát hợp lệ.'
  }

  return 'Không tải được video. Vui lòng kiểm tra lại đường dẫn video hoặc cấu hình máy chủ media.'
}

export function extractYoutubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url)

    if (
      parsed.hostname === 'www.youtube.com' ||
      parsed.hostname === 'youtube.com' ||
      parsed.hostname === 'm.youtube.com'
    ) {
      const videoId = parsed.searchParams.get('v')
      return videoId || null
    }

    if (parsed.hostname === 'youtu.be') {
      const path = parsed.pathname.replace('/', '').trim()
      return path || null
    }

    return null
  } catch {
    return null
  }
}

export function buildFallbackOptions(correctAnswer: string): string[] {
  const normalizedCorrect = String(correctAnswer || '').trim()
  const fallback = [normalizedCorrect, 'Sai', 'Chưa đúng'].filter(Boolean)
  return Array.from(new Set(fallback)).slice(0, 3)
}

export function normalizeQuizEvents(
  data: StudentVideoTaskDetail
): NormalizedQuizEvent[] {
  return (data.quiz_events || []).map((event, eventIndex) => ({
    id: String(event.id ?? `event-${eventIndex}`),
    title: String(event.title ?? `Câu hỏi tương tác ${eventIndex + 1}`),
    triggerSecond: Number(event.trigger_second ?? 0),
    pauseVideo: Boolean(event.pause_video),
    isRequired: Boolean(event.is_required),
    questions: (event.questions || []).map((question, questionIndex) => {
      const rawQuestionText = question.quiz_question?.question_text || ''
      const rawCorrectAnswer = question.quiz_question?.correct_answer || ''

      const rawOptions =
        question.quiz_question?.options?.map((option) => ({
          key: String(option.key ?? option.text ?? ''),
          text: String(option.text ?? option.key ?? ''),
          nextQuestionId: option.next_question_id ?? null,
        })) || []

      const resolvedOptions =
        rawOptions.length > 0
          ? rawOptions
          : buildFallbackOptions(rawCorrectAnswer).map((optionText, optionIdx) => ({
              key: String(optionIdx),
              text: String(optionText),
              nextQuestionId: null,
            }))

      return {
        id: String(question.id ?? `question-${questionIndex}`),
        questionText: rawQuestionText,
        options: resolvedOptions,
        correctAnswer: String(rawCorrectAnswer),
        score: Number(question.score ?? 0),
        isStartQuestion: Boolean(question.is_start_question),
        nextQuestionIdCorrect:
          question.quiz_question?.next_question_id_correct ?? null,
        nextQuestionIdWrong:
          question.quiz_question?.next_question_id_wrong ?? null,
      }
    }),
  }))
}

export function roundSecond(value: number) {
  if (!Number.isFinite(value) || value < 0) return 0
  return Math.floor(value)
}

export function detectDeviceType() {
  const width = window.innerWidth || 0
  if (width <= 768) return 'mobile'
  if (width <= 1024) return 'tablet'
  return 'desktop'
}

export function computeNextQuestionIndex(
  event: NormalizedQuizEvent,
  currentQuestionIndex: number,
  isCorrect: boolean,
  selectedOption?: NormalizedQuizOption
): number | null {
  const currentQuestion = event.questions[currentQuestionIndex]
  if (!currentQuestion) return null

  const preferredNextQuestionId = isCorrect
    ? currentQuestion.nextQuestionIdCorrect
    : currentQuestion.nextQuestionIdWrong

  const optionNextQuestionId = selectedOption?.nextQuestionId || null
  const targetQuestionId = preferredNextQuestionId || optionNextQuestionId || null

  if (targetQuestionId) {
    const foundIndex = event.questions.findIndex(
      (question) => question.id === targetQuestionId
    )
    if (foundIndex >= 0) return foundIndex
  }

  const sequentialNextIndex = currentQuestionIndex + 1
  if (sequentialNextIndex < event.questions.length) return sequentialNextIndex

  return null
}