// src/features/student/components/task-content/video-lecture/useStudentVideoLecture.ts
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { StudentVideoTaskDetail } from '../../../types/student.types'
import type {
  NormalizedQuizEvent,
  PrimitiveId,
  VideoLecturePopupState,
  YoutubeResumeRequest,
} from '../../../types/video-lecture.types'
import { resolveStudentIdFromStorage } from '../../../utils/studentStorage'
import { studentVideoTrackingApi } from '../../../services/studentVideoTracking.api'
import type { YoutubePlayerInstance } from '../StudentYoutubePlayer'
import {
  computeNextQuestionIndex,
  detectDeviceType,
  extractYoutubeVideoId,
  getVideoErrorMessage,
  normalizeQuizEvents,
  roundSecond,
} from './videoLecture.utils'

export function useStudentVideoLecture(data: StudentVideoTaskDetail) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const youtubePlayerRef = useRef<YoutubePlayerInstance | null>(null)

  const triggeredEventsRef = useRef<Set<string>>(new Set())
  const pausedAtSecondRef = useRef<number | null>(null)
  const resumeGuardUntilRef = useRef<number>(0)
  const popupStateRef = useRef<VideoLecturePopupState | null>(null)
  const sessionIdRef = useRef<PrimitiveId | null>(null)
  const heartbeatTimerRef = useRef<number | null>(null)
  const isSessionEndedRef = useRef(false)
  const isVideoPlayingRef = useRef(false)
  const lastTrackedSecondRef = useRef(0)
  const isInternalPauseRef = useRef(false)
  const isInternalResumeRef = useRef(false)
  const isMountedRef = useRef(true)

  const normalizedEvents = useMemo(() => normalizeQuizEvents(data), [data])

  const [popupState, setPopupState] = useState<VideoLecturePopupState | null>(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)
  const [videoError, setVideoError] = useState('')
  const [isYoutubePlaying, setIsYoutubePlaying] = useState(true)
  const [youtubeResumeRequest, setYoutubeResumeRequest] =
    useState<YoutubeResumeRequest>(null)
  const [trackingError, setTrackingError] = useState('')

  const videoUrl = data.lecture_video?.video_url?.trim() || ''
  const posterUrl = data.lecture_video?.thumbnail_url || undefined

  const youtubeVideoId = useMemo(() => extractYoutubeVideoId(videoUrl), [videoUrl])
  const isYoutubeVideo = Boolean(youtubeVideoId)

  const studentId = useMemo(
    () => String(data.student_id || resolveStudentIdFromStorage()),
    [data.student_id]
  )

  const taskId = useMemo(() => String(data.task_id || 'THANGDD_TODO'), [data.task_id])

  const taskCode = useMemo(
    () => String(data.task_code || data.task_info?.task_code || 'THANGDD_TODO'),
    [data.task_code, data.task_info?.task_code]
  )

  const lectureVideoId = useMemo(
    () => String(data.lecture_video?.id || data.video_id || 'THANGDD_TODO'),
    [data.lecture_video?.id, data.video_id]
  )

  useEffect(() => {
    popupStateRef.current = popupState
  }, [popupState])

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const activeEvent =
    popupState != null ? normalizedEvents[popupState.eventIndex] ?? null : null

  const activeQuestion =
    popupState != null
      ? activeEvent?.questions[popupState.questionIndex] ?? null
      : null

  const stopHeartbeat = useCallback(() => {
    if (heartbeatTimerRef.current != null) {
      window.clearInterval(heartbeatTimerRef.current)
      heartbeatTimerRef.current = null
    }
  }, [])

  const sendHeartbeat = useCallback(async () => {
    const sessionId = sessionIdRef.current
    if (!sessionId || isSessionEndedRef.current || !isVideoPlayingRef.current) return

    try {
      const playbackRate = isYoutubeVideo
        ? Number(youtubePlayerRef.current?.getPlaybackRate?.() ?? 1)
        : Number(videoRef.current?.playbackRate ?? 1)

      await studentVideoTrackingApi.heartbeatVideoSession({
        session_id: sessionId,
        current_second: roundSecond(lastTrackedSecondRef.current),
        playback_rate: Number.isFinite(playbackRate) ? playbackRate : 1,
      })

      setTrackingError('')
    } catch (error) {
      console.error('[StudentVideoTaskContent] heartbeatVideoSession failed:', error)
      setTrackingError('Không gửi được heartbeat video session.')
    }
  }, [isYoutubeVideo])

  const startHeartbeat = useCallback(() => {
    stopHeartbeat()

    heartbeatTimerRef.current = window.setInterval(() => {
      void sendHeartbeat()
    }, 10000)
  }, [sendHeartbeat, stopHeartbeat])

  const pauseVisualPlayer = useCallback(() => {
    if (isYoutubeVideo) {
      isInternalPauseRef.current = true
      setIsYoutubePlaying(false)
      return
    }

    if (videoRef.current) {
      isInternalPauseRef.current = true
      void videoRef.current.pause()
    }
  }, [isYoutubeVideo])

  const resumeVisualPlayer = useCallback(
    (resumeSecond?: number) => {
      const secondToResume =
        typeof resumeSecond === 'number' ? Math.max(0, resumeSecond) : null

      if (isYoutubeVideo) {
        isInternalResumeRef.current = true
        setIsYoutubePlaying(true)

        if (secondToResume != null) {
          setYoutubeResumeRequest({
            token: Date.now(),
            second: secondToResume,
          })
        }
        return
      }

      if (videoRef.current) {
        if (secondToResume != null) {
          try {
            videoRef.current.currentTime = secondToResume
          } catch (error) {
            console.error('[StudentVideoTaskContent] set currentTime failed:', error)
          }
        }

        isInternalResumeRef.current = true
        void videoRef.current.play().catch((error) => {
          console.error('[StudentVideoTaskContent] resume video failed:', error)
        })
      }
    },
    [isYoutubeVideo]
  )

  const startVideoSession = useCallback(async () => {
    if (sessionIdRef.current || isSessionEndedRef.current) return

    try {
      const session = await studentVideoTrackingApi.startVideoSession({
        student_id: Number(studentId),
        task_id: taskId === 'THANGDD_TODO' ? 'THANGDD_TODO' : Number(taskId),
        task_code: taskCode || 'THANGDD_TODO',
        lecture_video_id:
          lectureVideoId === 'THANGDD_TODO'
            ? 'THANGDD_TODO'
            : Number(lectureVideoId),
        start_second: 0,
        device_type: detectDeviceType(),
        app_platform: 'web',
      })

      sessionIdRef.current = session.id
      isSessionEndedRef.current = false
      setTrackingError('')
    } catch (error) {
      console.error('[StudentVideoTaskContent] startVideoSession failed:', error)
      setTrackingError('Không thể bắt đầu video session.')
    }
  }, [lectureVideoId, studentId, taskCode, taskId])

  const pauseTracking = useCallback(
    async (currentSecond: number) => {
      const sessionId = sessionIdRef.current
      if (!sessionId || isSessionEndedRef.current) return

      stopHeartbeat()
      isVideoPlayingRef.current = false

      try {
        await studentVideoTrackingApi.pauseVideoSession({
          session_id: sessionId,
          current_second: roundSecond(currentSecond),
        })
        setTrackingError('')
      } catch (error) {
        console.error('[StudentVideoTaskContent] pauseVideoSession failed:', error)
        setTrackingError('Không thể pause video session.')
      }
    },
    [stopHeartbeat]
  )

  const resumeTracking = useCallback(async () => {
    const sessionId = sessionIdRef.current
    if (!sessionId || isSessionEndedRef.current) return

    try {
      await studentVideoTrackingApi.resumeVideoSession({
        session_id: sessionId,
      })

      isVideoPlayingRef.current = true
      startHeartbeat()
      void sendHeartbeat()
      setTrackingError('')
    } catch (error) {
      console.error('[StudentVideoTaskContent] resumeVideoSession failed:', error)
      setTrackingError('Không thể resume video session.')
    }
  }, [sendHeartbeat, startHeartbeat])

  const seekTracking = useCallback(async (fromSecond: number, toSecond: number) => {
    const sessionId = sessionIdRef.current
    if (!sessionId || isSessionEndedRef.current) return

    try {
      await studentVideoTrackingApi.seekVideoSession({
        session_id: sessionId,
        from_second: roundSecond(fromSecond),
        to_second: roundSecond(toSecond),
      })
      setTrackingError('')
    } catch (error) {
      console.error('[StudentVideoTaskContent] seekVideoSession failed:', error)
      setTrackingError('Không thể ghi nhận thao tác tua video.')
    }
  }, [])

  const endVideoSession = useCallback(
    async (endSecond: number) => {
      const sessionId = sessionIdRef.current
      if (!sessionId || isSessionEndedRef.current) return

      try {
        stopHeartbeat()
        await studentVideoTrackingApi.endVideoSession({
          session_id: sessionId,
          end_second: roundSecond(endSecond),
        })
        isSessionEndedRef.current = true
        isVideoPlayingRef.current = false
        setTrackingError('')
      } catch (error) {
        console.error('[StudentVideoTaskContent] endVideoSession failed:', error)
        setTrackingError('Không thể kết thúc video session.')
      }
    },
    [stopHeartbeat]
  )

  const openQuizEvent = useCallback(
    async (eventIndex: number, eventSecond: number) => {
      const event = normalizedEvents[eventIndex]
      const sessionId = sessionIdRef.current
      if (!event || !sessionId) return null

      try {
        const attempt = await studentVideoTrackingApi.openVideoQuizEvent({
          student_id: Number(studentId),
          task_id: taskId === 'THANGDD_TODO' ? 'THANGDD_TODO' : Number(taskId),
          task_code: taskCode || 'THANGDD_TODO',
          session_id: sessionId,
          lecture_video_id:
            lectureVideoId === 'THANGDD_TODO'
              ? 'THANGDD_TODO'
              : Number(lectureVideoId),
          video_quiz_event_id: Number(event.id),
          event_second: roundSecond(eventSecond),
        })

        setTrackingError('')
        return attempt.id
      } catch (error) {
        console.error('[StudentVideoTaskContent] openVideoQuizEvent failed:', error)
        setTrackingError('Không thể mở quiz event.')
        return null
      }
    },
    [lectureVideoId, normalizedEvents, studentId, taskCode, taskId]
  )

  const closeQuizEvent = useCallback(async (attemptId: PrimitiveId, eventSecond: number) => {
    try {
      await studentVideoTrackingApi.closeVideoQuizEvent({
        attempt_id: attemptId,
        event_second: roundSecond(eventSecond),
      })
      setTrackingError('')
    } catch (error) {
      console.error('[StudentVideoTaskContent] closeVideoQuizEvent failed:', error)
      setTrackingError('Không thể đóng quiz event.')
    }
  }, [])

  const answerQuizQuestion = useCallback(
    async ({
      attemptId,
      eventId,
      questionId,
      selectedAnswer,
      isCorrect,
      answeredSecond,
    }: {
      attemptId: PrimitiveId
      eventId: string
      questionId: string
      selectedAnswer: string
      isCorrect: boolean
      answeredSecond: number
    }) => {
      const sessionId = sessionIdRef.current
      if (!sessionId) return

      try {
        await studentVideoTrackingApi.answerVideoQuizEvent({
          attempt_id: attemptId,
          student_id: Number(studentId),
          task_id: taskId === 'THANGDD_TODO' ? 'THANGDD_TODO' : Number(taskId),
          task_code: taskCode || 'THANGDD_TODO',
          session_id: sessionId,
          lecture_video_id:
            lectureVideoId === 'THANGDD_TODO'
              ? 'THANGDD_TODO'
              : Number(lectureVideoId),
          video_quiz_event_id: Number(eventId),
          question_id: Number(questionId),
          selected_answer: selectedAnswer,
          is_correct: isCorrect,
          answered_second: roundSecond(answeredSecond),
        })
        setTrackingError('')
      } catch (error) {
        console.error('[StudentVideoTaskContent] answerVideoQuizEvent failed:', error)
        setTrackingError('Không thể ghi nhận câu trả lời quiz.')
      }
    },
    [lectureVideoId, studentId, taskCode, taskId]
  )

  const submitQuizEvent = useCallback(
    async ({
      attemptId,
      totalQuestions,
      correctAnswers,
      score,
      isPassed,
    }: {
      attemptId: PrimitiveId
      totalQuestions: number
      correctAnswers: number
      score: number
      isPassed: boolean
    }) => {
      try {
        await studentVideoTrackingApi.submitVideoQuizEvent({
          attempt_id: attemptId,
          total_questions: totalQuestions,
          correct_answers: correctAnswers,
          score,
          is_passed: isPassed,
        })
        setTrackingError('')
      } catch (error) {
        console.error('[StudentVideoTaskContent] submitVideoQuizEvent failed:', error)
        setTrackingError('Không thể submit quiz event.')
      }
    },
    []
  )

  const openEventPopup = useCallback(
    async (eventIndex: number, eventSecond: number) => {
      const event = normalizedEvents[eventIndex]
      if (!event) return

      const firstQuestionIndex = Math.max(
        0,
        event.questions.findIndex((question) => question.isStartQuestion)
      )

      pausedAtSecondRef.current = roundSecond(eventSecond)
      resumeGuardUntilRef.current = Date.now() + 1200

      if (event.pauseVideo) {
        pauseVisualPlayer()
      }

      await pauseTracking(eventSecond)

      const attemptId = await openQuizEvent(eventIndex, eventSecond)

      if (!isMountedRef.current) return

      setPopupState({
        eventIndex,
        questionIndex: firstQuestionIndex >= 0 ? firstQuestionIndex : 0,
        selectedAnswer: undefined,
        isAnswered: false,
        isCorrect: undefined,
        attemptId,
        correctAnswersCount: 0,
        answersByQuestionId: {},
      })
    },
    [normalizedEvents, openQuizEvent, pauseTracking, pauseVisualPlayer]
  )

  const maybeTriggerQuizEvent = useCallback(
    (currentSecond: number) => {
      if (popupStateRef.current) return
      if (Date.now() < resumeGuardUntilRef.current) return

      const currentRounded = roundSecond(currentSecond)

      for (let index = 0; index < normalizedEvents.length; index += 1) {
        const event = normalizedEvents[index]
        if (!event) continue

        if (triggeredEventsRef.current.has(event.id)) continue

        if (currentRounded >= roundSecond(event.triggerSecond)) {
          triggeredEventsRef.current.add(event.id)
          void openEventPopup(index, currentRounded)
          break
        }
      }
    },
    [normalizedEvents, openEventPopup]
  )

  const handleTimeUpdate = useCallback(
    (currentSecond: number) => {
      lastTrackedSecondRef.current = currentSecond
      maybeTriggerQuizEvent(currentSecond)
    },
    [maybeTriggerQuizEvent]
  )

  const handlePlayerReady = useCallback(async () => {
    setVideoLoading(false)
    setVideoError('')
    await startVideoSession()
  }, [startVideoSession])

  const handleVideoCanPlay = useCallback(() => {
    setVideoLoading(false)
  }, [])

  const handleVideoError = useCallback(() => {
    setVideoLoading(false)
    setVideoError(getVideoErrorMessage(videoUrl))
  }, [videoUrl])

  const handlePlay = useCallback(
    async (currentSecond: number) => {
      lastTrackedSecondRef.current = currentSecond

      if (!sessionIdRef.current) {
        await startVideoSession()
      }

      if (isInternalPauseRef.current) {
        isInternalPauseRef.current = false
        return
      }

      if (isInternalResumeRef.current) {
        isInternalResumeRef.current = false
      }

      await resumeTracking()
    },
    [resumeTracking, startVideoSession]
  )

  const handlePause = useCallback(
    async (currentSecond: number) => {
      lastTrackedSecondRef.current = currentSecond

      if (popupStateRef.current) return

      if (isInternalResumeRef.current) {
        isInternalResumeRef.current = false
        return
      }

      if (isInternalPauseRef.current) {
        isInternalPauseRef.current = false
      }

      await pauseTracking(currentSecond)
    },
    [pauseTracking]
  )

  const handleSeek = useCallback(
    async (fromSecond: number, toSecond: number) => {
      lastTrackedSecondRef.current = toSecond
      await seekTracking(fromSecond, toSecond)
    },
    [seekTracking]
  )

  const handleEnded = useCallback(async () => {
    setVideoEnded(true)
    await endVideoSession(lastTrackedSecondRef.current)
  }, [endVideoSession])

  useEffect(() => {
    return () => {
      stopHeartbeat()
      void endVideoSession(lastTrackedSecondRef.current)
    }
  }, [endVideoSession, stopHeartbeat])

  const handleSelectPopupAnswer = useCallback((answerKey: string) => {
    setPopupState((prev) =>
      prev
        ? {
            ...prev,
            selectedAnswer: answerKey,
          }
        : prev
    )
  }, [])

  const handleSubmitPopupAnswer = useCallback(async () => {
    if (!popupState || !activeEvent || !activeQuestion) return
    if (popupState.isAnswered) return

    const selectedAnswer = popupState.selectedAnswer
    if (!selectedAnswer) return

    const isCorrect = selectedAnswer === activeQuestion.correctAnswer

    const nextAnswers = {
      ...popupState.answersByQuestionId,
      [activeQuestion.id]: {
        selectedAnswer,
        isCorrect,
      },
    }

    const nextCorrectAnswersCount =
      popupState.correctAnswersCount + (isCorrect ? 1 : 0)

    setPopupState({
      ...popupState,
      isAnswered: true,
      isCorrect,
      correctAnswersCount: nextCorrectAnswersCount,
      answersByQuestionId: nextAnswers,
    })

    if (popupState.attemptId != null) {
      await answerQuizQuestion({
        attemptId: popupState.attemptId,
        eventId: activeEvent.id,
        questionId: activeQuestion.id,
        selectedAnswer,
        isCorrect,
        answeredSecond: lastTrackedSecondRef.current,
      })
    }

    if (activeEvent.questions.length === 1) {
      const totalQuestions = activeEvent.questions.length
      const score = activeEvent.questions.reduce((sum, question) => {
        const answer = nextAnswers[question.id]
        return sum + (answer?.isCorrect ? question.score : 0)
      }, 0)

      if (popupState.attemptId != null) {
        await submitQuizEvent({
          attemptId: popupState.attemptId,
          totalQuestions,
          correctAnswers: nextCorrectAnswersCount,
          score,
          isPassed: nextCorrectAnswersCount === totalQuestions,
        })
      }
    }
  }, [
    activeEvent,
    activeQuestion,
    answerQuizQuestion,
    popupState,
    submitQuizEvent,
  ])

  const handleContinueQuiz = useCallback(async () => {
    if (!popupState || !activeEvent || !activeQuestion) return

    const selectedOption = activeQuestion.options.find(
      (option) => option.key === popupState.selectedAnswer
    )

    const nextQuestionIndex = computeNextQuestionIndex(
      activeEvent,
      popupState.questionIndex,
      Boolean(popupState.isCorrect),
      selectedOption
    )

    if (nextQuestionIndex != null) {
      setPopupState({
        ...popupState,
        questionIndex: nextQuestionIndex,
        selectedAnswer: undefined,
        isAnswered: false,
        isCorrect: undefined,
      })
      return
    }

    const totalQuestions = activeEvent.questions.length
    const score = activeEvent.questions.reduce((sum, question) => {
      const answer = popupState.answersByQuestionId[question.id]
      return sum + (answer?.isCorrect ? question.score : 0)
    }, 0)

    if (popupState.attemptId != null) {
      await submitQuizEvent({
        attemptId: popupState.attemptId,
        totalQuestions,
        correctAnswers: popupState.correctAnswersCount,
        score,
        isPassed: popupState.correctAnswersCount === totalQuestions,
      })

      await closeQuizEvent(
        popupState.attemptId,
        roundSecond(lastTrackedSecondRef.current)
      )
    }

    const resumeSecond =
      pausedAtSecondRef.current != null
        ? pausedAtSecondRef.current
        : roundSecond(lastTrackedSecondRef.current)

    setPopupState(null)
    popupStateRef.current = null
    pausedAtSecondRef.current = null
    resumeGuardUntilRef.current = Date.now() + 1200

    if (activeEvent.pauseVideo) {
      resumeVisualPlayer(resumeSecond)
      await resumeTracking()
    }
  }, [
    activeEvent,
    activeQuestion,
    closeQuizEvent,
    popupState,
    resumeTracking,
    resumeVisualPlayer,
    submitQuizEvent,
  ])

  const getLastTrackedSecond = useCallback(() => lastTrackedSecondRef.current, [])

  return {
    videoRef,
    youtubePlayerRef,
    videoUrl,
    posterUrl,
    youtubeVideoId,
    isYoutubeVideo,
    taskCode,
    popupState,
    activeEvent: activeEvent as NormalizedQuizEvent | null,
    activeQuestion,
    videoEnded,
    videoLoading,
    videoError,
    isYoutubePlaying,
    youtubeResumeRequest,
    trackingError,
    handlePlayerReady,
    handleVideoCanPlay,
    handleVideoError,
    handleTimeUpdate,
    handlePlay,
    handlePause,
    handleSeek,
    handleEnded,
    handleSelectPopupAnswer,
    handleSubmitPopupAnswer,
    handleContinueQuiz,
    getLastTrackedSecond,
  }
}