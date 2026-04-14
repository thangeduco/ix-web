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
      '/api/v1/lsm/video-sessions/start',
      payload
    )

    return ensureApiData(response, 'Không thể bắt đầu video session.')
  },

  async heartbeatVideoSession(
  payload: StudentHeartbeatVideoSessionPayload
): Promise<boolean> {
  // tạm thời disable API call
  return true
},

  async pauseVideoSession(
    payload: StudentPauseVideoSessionPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      '/api/v1/lsm/video-sessions/pause',
      payload
    )

    return ensureApiData(response, 'Không thể pause video session.')
  },

  async resumeVideoSession(
    payload: StudentResumeVideoSessionPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      '/api/v1/lsm/video-sessions/resume',
      payload
    )

    return ensureApiData(response, 'Không thể resume video session.')
  },

  async seekVideoSession(
    payload: StudentSeekVideoSessionPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      '/api/v1/lsm/video-sessions/seek',
      payload
    )

    return ensureApiData(response, 'Không thể seek video session.')
  },

  async endVideoSession(
    payload: StudentEndVideoSessionPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      '/api/v1/lsm/video-sessions/end',
      payload
    )

    return ensureApiData(response, 'Không thể kết thúc video session.')
  },

  async openVideoQuizEvent(
    payload: StudentOpenVideoQuizEventPayload
  ): Promise<StudentVideoQuizAttempt> {
    const response = await coreIXApi.post<ApiSuccessResponse<StudentVideoQuizAttempt>>(
      '/api/v1/lsm/video-quiz-events/open',
      payload
    )

    return ensureApiData(response, 'Không thể mở video quiz event.')
  },

  async closeVideoQuizEvent(
    payload: StudentCloseVideoQuizEventPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      '/api/v1/lsm/video-quiz-events/close',
      payload
    )

    return ensureApiData(response, 'Không thể đóng video quiz event.')
  },

  async answerVideoQuizEvent(
    payload: StudentAnswerVideoQuizEventPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      '/api/v1/lsm/video-quiz-events/answer',
      payload
    )

    return ensureApiData(response, 'Không thể ghi nhận câu trả lời quiz.')
  },

  async submitVideoQuizEvent(
    payload: StudentSubmitVideoQuizEventPayload
  ): Promise<boolean> {
    const response = await coreIXApi.post<ApiSuccessResponse<boolean>>(
      '/api/v1/lsm/video-quiz-events/submit',
      payload
    )

    return ensureApiData(response, 'Không thể submit video quiz event.')
  },
}