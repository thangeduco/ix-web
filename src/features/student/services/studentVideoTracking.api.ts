// src/features/student/services/studentVideoTracking.api.ts
import coreIXApi from '../../../shared/services/coreIXApi'
import type {
  StudentAnswerVideoQuizEventPayload,
  StudentCloseVideoQuizEventPayload,
  StudentHeartbeatVideoSessionPayload,
  StudentOpenVideoQuizEventPayload,
  StudentPauseVideoSessionPayload,
  StudentResumeVideoSessionPayload,
  StudentSeekVideoSessionPayload,
  StudentStartVideoSessionPayload,
  StudentSubmitVideoQuizEventPayload,
  StudentEndVideoSessionPayload,
  StudentVideoQuizAttempt,
  StudentVideoSession,
} from '../types/student.types'

type ApiSuccessResponse<T> = {
  success?: boolean
  message?: string
  data?: T
}

const VIDEO_TRACKING_ENDPOINTS = {
  START_SESSION: '/lsm/video-sessions/start',
  HEARTBEAT_SESSION: '/lsm/video-sessions/heartbeat',
  PAUSE_SESSION: '/lsm/video-sessions/pause',
  RESUME_SESSION: '/lsm/video-sessions/resume',
  SEEK_SESSION: '/lsm/video-sessions/seek',
  END_SESSION: '/lsm/video-sessions/end',
  OPEN_QUIZ_EVENT: '/lsm/video-quiz-events/open',
  CLOSE_QUIZ_EVENT: '/lsm/video-quiz-events/close',
  ANSWER_QUIZ_EVENT: '/lsm/video-quiz-events/answer',
  SUBMIT_QUIZ_EVENT: '/lsm/video-quiz-events/submit',
} as const

function ensureApiData<T>(
  response: { data?: ApiSuccessResponse<T> } | undefined,
  fallbackMessage: string
): T {
  const payload = response?.data

  if (!payload) {
    throw new Error(fallbackMessage)
  }

  if (payload.success === false) {
    throw new Error(payload.message || fallbackMessage)
  }

  if (typeof payload.data === 'undefined' || payload.data === null) {
    throw new Error(payload.message || fallbackMessage)
  }

  return payload.data
}

export const studentVideoTrackingApi = {
  async startVideoSession(
    payload: StudentStartVideoSessionPayload
  ): Promise<StudentVideoSession> {
    const response = await coreIXApi.post<ApiSuccessResponse<StudentVideoSession>>(
      VIDEO_TRACKING_ENDPOINTS.START_SESSION,
      payload
    )

    return ensureApiData(response, 'Không thể bắt đầu video session.')
  },

  async heartbeatVideoSession(
    payload: StudentHeartbeatVideoSessionPayload
  ): Promise<boolean> {
    // Tạm thời disable API call như logic hiện tại.
    // Khi backend heartbeat sẵn sàng, chỉ cần mở lại đoạn code bên dưới.
    void payload
    return true

    /*
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      VIDEO_TRACKING_ENDPOINTS.HEARTBEAT_SESSION,
      payload
    )

    return ensureApiData(response, 'Không thể heartbeat video session.')
    */
  },

  async pauseVideoSession(
    payload: StudentPauseVideoSessionPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      VIDEO_TRACKING_ENDPOINTS.PAUSE_SESSION,
      payload
    )

    return ensureApiData(response, 'Không thể pause video session.')
  },

  async resumeVideoSession(
    payload: StudentResumeVideoSessionPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      VIDEO_TRACKING_ENDPOINTS.RESUME_SESSION,
      payload
    )

    return ensureApiData(response, 'Không thể resume video session.')
  },

  async seekVideoSession(
    payload: StudentSeekVideoSessionPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      VIDEO_TRACKING_ENDPOINTS.SEEK_SESSION,
      payload
    )

    return ensureApiData(response, 'Không thể seek video session.')
  },

  async endVideoSession(
    payload: StudentEndVideoSessionPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      VIDEO_TRACKING_ENDPOINTS.END_SESSION,
      payload
    )

    return ensureApiData(response, 'Không thể kết thúc video session.')
  },

  async openVideoQuizEvent(
    payload: StudentOpenVideoQuizEventPayload
  ): Promise<StudentVideoQuizAttempt> {
    const response = await coreIXApi.post<
      ApiSuccessResponse<StudentVideoQuizAttempt>
    >(VIDEO_TRACKING_ENDPOINTS.OPEN_QUIZ_EVENT, payload)

    return ensureApiData(response, 'Không thể mở video quiz event.')
  },

  async closeVideoQuizEvent(
    payload: StudentCloseVideoQuizEventPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      VIDEO_TRACKING_ENDPOINTS.CLOSE_QUIZ_EVENT,
      payload
    )

    return ensureApiData(response, 'Không thể đóng video quiz event.')
  },

  async answerVideoQuizEvent(
    payload: StudentAnswerVideoQuizEventPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      VIDEO_TRACKING_ENDPOINTS.ANSWER_QUIZ_EVENT,
      payload
    )

    return ensureApiData(response, 'Không thể ghi nhận câu trả lời quiz.')
  },

  async submitVideoQuizEvent(
    payload: StudentSubmitVideoQuizEventPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      VIDEO_TRACKING_ENDPOINTS.SUBMIT_QUIZ_EVENT,
      payload
    )

    return ensureApiData(response, 'Không thể submit video quiz event.')
  },
}