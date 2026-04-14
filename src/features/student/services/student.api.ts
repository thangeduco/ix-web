// src/features/student/services/student.api.ts
import coreIXApi from '../../../shared/services/coreIXApi'
import type {
  StudentClassDashboardResponse,
  StudentClassInfo,
  StudentCoursesPendingResponse,
  StudentCurrentWeekProgress,
  StudentFileTaskDetail,
  StudentPendingCourse,
  StudentPendingWeek,
  StudentPreviousWeekResult,
  StudentQuizConfig,
  StudentQuizEvent,
  StudentQuizQuestion,
  StudentQuizTaskDetail,
  StudentReferenceContext,
  StudentStoredUser,
  StudentTaskDetailResponse,
  StudentTaskInfo,
  StudentTaskStatistics,
  StudentVideoEventQuestion,
  StudentVideoLecture,
  StudentVideoTaskDetail,
  StudentWeekBrief,
  StudentWeekDashboardResponse,
  StudentWeekTask,
} from '../types/student.types'

type ApiSuccessResponse<T> = {
  success?: boolean
  message?: string
  data?: T
}

const STUDENT_API_ENDPOINTS = {
  pendingCourses: (studentId: string | number) =>
    `/lsm/students/${encodeURIComponent(String(studentId))}/courses/pending-weeks`,
  classDashboard: (classCode: string) =>
    `/lsm/student/classes/${encodeURIComponent(classCode)}/dashboard`,
  weekDashboard: (classCode: string, weekNo: number | string) =>
    `/lsm/student/classes/${encodeURIComponent(classCode)}/weeks/${encodeURIComponent(String(weekNo))}/dashboard`,
  taskDetail: (taskCode: string) =>
    `/lsm/student/tasks/${encodeURIComponent(taskCode)}/detail`,
}

const EMPTY_CLASS_INFO: StudentClassInfo = {
  avatar_url: null,
  class_name: null,
  class_code: null,
  slogan: null,
}

const EMPTY_REFERENCE_CONTEXT: StudentReferenceContext = {
  mode: 'CURRENT',
  requested_week_no: null,
  resolved_week_no: null,
}

const EMPTY_PROGRESS: StudentCurrentWeekProgress = {
  class_week_id: null,
  total_unfinished_tasks: 0,
  total_tasks: 0,
  progress_percent: 0,
}

function getStoredUser(): StudentStoredUser | null {
  const raw =
    localStorage.getItem('ix_user') || sessionStorage.getItem('ix_user') || null

  if (!raw) return null

  try {
    return JSON.parse(raw) as StudentStoredUser
  } catch (error) {
    console.error('[studentApi] Parse ix_user failed:', error)
    return null
  }
}

function resolveStudentId(): string {
  const storedUser = getStoredUser()

  if (storedUser?.student_id != null) return String(storedUser.student_id)
  if (storedUser?.id != null) return String(storedUser.id)

  throw new Error(
    'Không xác định được student_id từ phiên đăng nhập. Vui lòng đăng nhập lại.'
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function toNullableString(value: unknown): string | null {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  return null
}

function toStringSafe(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  return fallback
}

function toNumberSafe(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value

  if (typeof value === 'string') {
    const parsed = Number(value.trim())
    if (Number.isFinite(parsed)) return parsed
  }

  return fallback
}

function toNullableNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value

  if (typeof value === 'string') {
    const parsed = Number(value.trim())
    if (Number.isFinite(parsed)) return parsed
  }

  return null
}

function toBooleanSafe(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    if (normalized === 'true') return true
    if (normalized === 'false') return false
  }

  if (typeof value === 'number') {
    if (value === 1) return true
    if (value === 0) return false
  }

  return fallback
}

function ensureArray<T = unknown>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message

  if (isRecord(error)) {
    const message = error.message
    if (typeof message === 'string' && message.trim()) return message

    const responseData = isRecord(error.response) ? error.response.data : null
    if (isRecord(responseData)) {
      const dataMessage = responseData.message
      if (typeof dataMessage === 'string' && dataMessage.trim()) {
        return dataMessage
      }
    }
  }

  return fallback
}

function ensureApiData<T>(
  response: { data?: ApiSuccessResponse<T> } | ApiSuccessResponse<T>,
  fallbackMessage: string
): T {
  const payload: ApiSuccessResponse<T> =
    isRecord(response) && 'data' in response && isRecord(response.data)
      ? (response.data as ApiSuccessResponse<T>)
      : (response as ApiSuccessResponse<T>)

  if (payload.success === false) {
    throw new Error(
      typeof payload.message === 'string' && payload.message.trim()
        ? payload.message
        : fallbackMessage
    )
  }

  if (payload.data == null) {
    throw new Error(
      typeof payload.message === 'string' && payload.message.trim()
        ? payload.message
        : fallbackMessage
    )
  }

  return payload.data
}

function normalizePendingWeek(input: unknown): StudentPendingWeek {
  const raw = isRecord(input) ? input : {}

  return {
    class_week_id: toStringSafe(raw.class_week_id || raw.id),
    week_no: toNullableNumber(raw.week_no),
    title: toNullableString(raw.title),
    total_student_done: toNumberSafe(raw.total_student_done, 0),
    total_student_assigned: toNumberSafe(raw.total_student_assigned, 0),
  }
}

function normalizePendingCourse(input: unknown): StudentPendingCourse {
  const raw = isRecord(input) ? input : {}

  return {
    avatar_url: toNullableString(raw.avatar_url),
    class_code: toNullableString(raw.class_code),
    class_name: toNullableString(raw.class_name),
    slogan: toNullableString(raw.slogan),
    pending_weeks: ensureArray(raw.pending_weeks).map(normalizePendingWeek),
  }
}

function normalizeHomePendingCourses(
  input: unknown,
  studentId: string
): StudentCoursesPendingResponse {
  const raw = isRecord(input) ? input : {}

  return {
    student_id: toStringSafe(raw.student_id, studentId),
    courses: ensureArray(raw.courses).map(normalizePendingCourse),
  }
}

function normalizeClassInfo(input: unknown): StudentClassInfo {
  const raw = isRecord(input) ? input : {}

  return {
    avatar_url: toNullableString(raw.avatar_url),
    class_name: toNullableString(raw.class_name),
    class_code: toNullableString(raw.class_code),
    slogan: toNullableString(raw.slogan),
  }
}

function normalizeReferenceContext(
  input: unknown,
  options?: {
    modeFallback?: string
    requestedWeekNo?: number | null
    resolvedWeekNo?: number | null
  }
): StudentReferenceContext {
  const raw = isRecord(input) ? input : {}

  return {
    mode: toStringSafe(raw.mode, options?.modeFallback || 'CURRENT'),
    requested_week_no:
      toNullableNumber(raw.requested_week_no) ?? options?.requestedWeekNo ?? null,
    resolved_week_no:
      toNullableNumber(raw.resolved_week_no) ?? options?.resolvedWeekNo ?? null,
  }
}

function normalizeWeekBrief(input: unknown): StudentWeekBrief | null {
  if (!isRecord(input)) return null

  return {
    id: toNullableString(input.id),
    week_no: toNullableNumber(input.week_no),
    title: toNullableString(input.title),
    start_date: toNullableString(input.start_date),
    end_date: toNullableString(input.end_date),
  }
}

function normalizeCurrentWeekProgress(
  input: unknown
): StudentCurrentWeekProgress | null {
  if (!isRecord(input)) return null

  return {
    class_week_id: toNullableString(input.class_week_id),
    total_unfinished_tasks: toNumberSafe(input.total_unfinished_tasks, 0),
    total_tasks: toNumberSafe(input.total_tasks, 0),
    progress_percent: toNumberSafe(input.progress_percent, 0),
  }
}

function normalizePreviousWeekResult(
  input: unknown
): StudentPreviousWeekResult | null {
  if (!isRecord(input)) return null

  return {
    id: toNullableString(input.id),
    student_id: toNullableString(input.student_id),
    class_id: toNullableString(input.class_id),
    week_id: toNullableString(input.week_id),
    class_code: toNullableString(input.class_code),
    week_no: toNullableNumber(input.week_no),
    teacher_comment: toNullableString(input.teacher_comment),

    week_score: toNullableNumber(input.week_score),
    week_score_ranking: toNullableNumber(input.week_score_ranking),

    total_week_stickers: toNullableNumber(input.total_week_stickers),
    total_week_stickers_ranking: toNullableNumber(
      input.total_week_stickers_ranking
    ),

    homework_score: toNullableNumber(input.homework_score),
    homework_score_ranking: toNullableNumber(input.homework_score_ranking),
    homework_stickers: toNullableNumber(input.homework_stickers),

    extra_assignment_score: toNullableNumber(input.extra_assignment_score),
    extra_assignment_score_ranking: toNullableNumber(
      input.extra_assignment_score_ranking
    ),
    extra_assignment_stickers: toNullableNumber(input.extra_assignment_stickers),

    preparation_score: toNullableNumber(input.preparation_score),
    preparation_score_ranking: toNullableNumber(input.preparation_score_ranking),
    preparation_stickers: toNullableNumber(input.preparation_stickers),

    in_class_score: toNullableNumber(input.in_class_score),
    in_class_score_ranking: toNullableNumber(input.in_class_score_ranking),
    in_class_stickers: toNullableNumber(input.in_class_stickers),

    created_at: toNullableString(input.created_at),
    updated_at: toNullableString(input.updated_at),
  }
}

function normalizeWeekTask(input: unknown): StudentWeekTask {
  const raw = isRecord(input) ? input : {}

  return {
    task_code: toStringSafe(raw.task_code),
    task_title: toStringSafe(raw.task_title),
    section_type: toStringSafe(raw.section_type),
    content_type: toStringSafe(raw.content_type),
    task_status: toStringSafe(raw.task_status),
    task_next_action: toStringSafe(raw.task_next_action),
    display_order: toNumberSafe(raw.display_order, 0),
    total_student_completed: toNumberSafe(raw.total_student_completed, 0),
  }
}

function normalizeDashboardData(
  input: unknown,
  options?: {
    studentId?: string
    classCode?: string
    modeFallback?: string
  }
): StudentClassDashboardResponse {
  const raw = isRecord(input) ? input : {}
  const currentWeek = normalizeWeekBrief(raw.current_week)
  const referenceContext = normalizeReferenceContext(raw.reference_context, {
    modeFallback: options?.modeFallback || 'CURRENT',
    resolvedWeekNo: currentWeek?.week_no ?? null,
  })

  const classInfo = normalizeClassInfo(raw.class_info)

  return {
    student_id: toStringSafe(raw.student_id, options?.studentId || ''),
    class_code: toStringSafe(
      raw.class_code,
      classInfo.class_code || options?.classCode || ''
    ),
    class_info: classInfo.class_code || classInfo.class_name
      ? classInfo
      : {
          ...EMPTY_CLASS_INFO,
          class_code: options?.classCode || null,
        },
    reference_context: referenceContext,
    current_week: currentWeek,
    current_week_tasks: ensureArray(raw.current_week_tasks).map(normalizeWeekTask),
    current_week_progress:
      normalizeCurrentWeekProgress(raw.current_week_progress) || EMPTY_PROGRESS,
    previous_week: normalizeWeekBrief(raw.previous_week),
    next_week: normalizeWeekBrief(raw.next_week),
    previous_week_result: normalizePreviousWeekResult(raw.previous_week_result),
  }
}

function normalizeTaskInfo(
  input: unknown,
  taskCodeFallback: string,
  contentTypeFallback: string
): StudentTaskInfo {
  const raw = isRecord(input) ? input : {}

  return {
    task_code: toStringSafe(raw.task_code, taskCodeFallback),
    task_title: toStringSafe(raw.task_title),
    content_type: toStringSafe(raw.content_type, contentTypeFallback),
  }
}

function normalizeTaskStatistics(input: unknown): StudentTaskStatistics {
  const raw = isRecord(input) ? input : {}

  return {
    section_type: toStringSafe(raw.section_type),
    class_id: toNullableString(raw.class_id),
    class_week_id: toNullableString(raw.class_week_id),
    total_student_assigned: toNumberSafe(raw.total_student_assigned, 0),
    total_student_completed: toNumberSafe(raw.total_student_completed, 0),
    highest_score: toNullableNumber(raw.highest_score),
  }
}

function normalizeVideoLecture(input: unknown): StudentVideoLecture | null {
  if (!isRecord(input)) return null

  return {
    id: toStringSafe(input.id),
    title: toStringSafe(input.title),
    description: toNullableString(input.description),
    video_url: toNullableString(input.video_url),
    thumbnail_url: toNullableString(input.thumbnail_url),
    duration_seconds: toNumberSafe(input.duration_seconds, 0),
  }
}

function normalizeVideoEventQuestion(
  input: unknown
): StudentVideoEventQuestion {
  const raw = isRecord(input) ? input : {}
  const quizQuestion = isRecord(raw.quiz_question) ? raw.quiz_question : {}

  return {
    id: toStringSafe(raw.id),
    is_start_question: toBooleanSafe(raw.is_start_question, false),
    display_order: toNumberSafe(raw.display_order, 0),
    score: toNumberSafe(raw.score, 0),
    quiz_question: {
      question_text: toStringSafe(quizQuestion.question_text),
      options: ensureArray(quizQuestion.options).map((option) => {
        const optionRaw = isRecord(option) ? option : {}

        return {
          key: toStringSafe(optionRaw.key),
          text: toStringSafe(optionRaw.text),
          next_question_id: toNullableString(optionRaw.next_question_id),
        }
      }),
      correct_answer: toStringSafe(quizQuestion.correct_answer),
      next_question_id_correct: toNullableString(
        quizQuestion.next_question_id_correct
      ),
      next_question_id_wrong: toNullableString(
        quizQuestion.next_question_id_wrong
      ),
    },
  }
}

function normalizeQuizEvent(input: unknown): StudentQuizEvent {
  const raw = isRecord(input) ? input : {}

  return {
    id: toStringSafe(raw.id),
    lecture_video_id: toStringSafe(raw.lecture_video_id),
    title: toStringSafe(raw.title),
    description: toNullableString(raw.description),
    trigger_second: toNumberSafe(raw.trigger_second, 0),
    pause_video: toBooleanSafe(raw.pause_video, false),
    is_required: toBooleanSafe(raw.is_required, false),
    questions: ensureArray(raw.questions).map(normalizeVideoEventQuestion),
  }
}

function normalizeVideoTaskDetail(
  raw: Record<string, unknown>,
  studentId: string,
  classCode: string,
  taskCode: string
): StudentVideoTaskDetail {
  return {
    student_id: toStringSafe(raw.student_id, studentId),
    class_code: toStringSafe(raw.class_code, classCode),
    task_code: toStringSafe(raw.task_code, taskCode),
    content_type: 'VIDEO',
    class_info: normalizeClassInfo(raw.class_info),
    task_info: normalizeTaskInfo(raw.task_info, taskCode, 'VIDEO'),
    task_statistics: normalizeTaskStatistics(raw.task_statistics),
    video_title: toNullableString(raw.video_title),
    video_id: toNullableString(raw.video_id),
    lecture_video: normalizeVideoLecture(raw.lecture_video),
    quiz_events: ensureArray(raw.quiz_events).map(normalizeQuizEvent),
    task_id: toNullableString(raw.task_id),
  }
}

function normalizeFileTaskDetail(
  raw: Record<string, unknown>,
  studentId: string,
  classCode: string,
  taskCode: string
): StudentFileTaskDetail {
  const fileContent = isRecord(raw.file_content) ? raw.file_content : null
  const file = fileContent && isRecord(fileContent.file) ? fileContent.file : null

  return {
    student_id: toStringSafe(raw.student_id, studentId),
    class_code: toStringSafe(raw.class_code, classCode),
    task_code: toStringSafe(raw.task_code, taskCode),
    content_type: 'FILE',
    class_info: normalizeClassInfo(raw.class_info),
    task_info: normalizeTaskInfo(raw.task_info, taskCode, 'FILE'),
    task_statistics: normalizeTaskStatistics(raw.task_statistics),
    file_content: fileContent
      ? {
          content_id: toNullableString(fileContent.content_id),
          file: file
            ? {
                file_url: toNullableString(file.file_url),
                file_name: toNullableString(file.file_name),
              }
            : null,
        }
      : null,
  }
}

function normalizeQuizConfig(input: unknown): StudentQuizConfig | null {
  if (!isRecord(input)) return null

  return {
    id: toStringSafe(input.id),
    title: toStringSafe(input.title),
    description: toNullableString(input.description),
    quiz_type: toNullableString(input.quiz_type),
    time_limit_minutes: toNullableNumber(input.time_limit_minutes),
    max_attempts: toNullableNumber(input.max_attempts),
    passing_score: toNullableNumber(input.passing_score),
    shuffle_question: toBooleanSafe(input.shuffle_question, false),
    shuffle_option: toBooleanSafe(input.shuffle_option, false),
  }
}

function normalizeQuizQuestion(input: unknown): StudentQuizQuestion {
  const raw = isRecord(input) ? input : {}

  return {
    id: toStringSafe(raw.id),
    question_text: toStringSafe(raw.question_text),
    question_type: toStringSafe(raw.question_type),
    options: ensureArray(raw.options).map((option) => {
      const optionRaw = isRecord(option) ? option : {}

      return {
        key: toStringSafe(optionRaw.key),
        text: toStringSafe(optionRaw.text),
      }
    }),
    correct_answer: toNullableString(raw.correct_answer),
    explanation: toNullableString(raw.explanation),
    default_score: toNumberSafe(raw.default_score, 0),
    difficulty_level: toNullableString(raw.difficulty_level),
    display_order: toNumberSafe(raw.display_order, 0),
    score: toNumberSafe(raw.score, 0),
    is_required: toBooleanSafe(raw.is_required, false),
  }
}

function normalizeQuizTaskDetail(
  raw: Record<string, unknown>,
  studentId: string,
  classCode: string,
  taskCode: string
): StudentQuizTaskDetail {
  const quizTest = isRecord(raw.quiz_test) ? raw.quiz_test : null

  return {
    student_id: toStringSafe(raw.student_id, studentId),
    class_code: toStringSafe(raw.class_code, classCode),
    task_code: toStringSafe(raw.task_code, taskCode),
    content_type: 'QUIZ_TEST',
    class_info: normalizeClassInfo(raw.class_info),
    task_info: normalizeTaskInfo(raw.task_info, taskCode, 'QUIZ_TEST'),
    task_statistics: normalizeTaskStatistics(raw.task_statistics),
    quiz_test: quizTest
      ? {
          content_id: toNullableString(quizTest.content_id),
          title: toNullableString(quizTest.title),
          quiz_test: normalizeQuizConfig(quizTest.quiz_test),
          questions: ensureArray(quizTest.questions).map(normalizeQuizQuestion),
        }
      : null,
  }
}

function normalizeTaskDetail(
  input: unknown,
  options?: {
    studentId?: string
    classCode?: string
    taskCode?: string
  }
): StudentTaskDetailResponse {
  const raw = isRecord(input) ? input : {}
  const studentId = options?.studentId ?? ''
  const classCode = options?.classCode ?? ''
  const taskCode = options?.taskCode ?? ''

  const contentType = toStringSafe(
    raw.content_type ||
      (isRecord(raw.task_info) ? raw.task_info.content_type : ''),
    'VIDEO'
  )

  if (contentType === 'FILE') {
    return normalizeFileTaskDetail(raw, studentId, classCode, taskCode)
  }

  if (contentType === 'QUIZ_TEST') {
    return normalizeQuizTaskDetail(raw, studentId, classCode, taskCode)
  }

  return normalizeVideoTaskDetail(raw, studentId, classCode, taskCode)
}

export const studentApi = {
  getStoredUser,
  resolveStudentId,

  async getPendingCourses(
    studentIdParam?: string | number
  ): Promise<StudentCoursesPendingResponse> {
    const studentId = String(studentIdParam ?? resolveStudentId())

    try {
      const response = await coreIXApi.get<
        ApiSuccessResponse<StudentCoursesPendingResponse>
      >(STUDENT_API_ENDPOINTS.pendingCourses(studentId))

      const data = ensureApiData(
        response,
        'Không tải được danh sách khóa học đang chờ của học sinh.'
      )

      return normalizeHomePendingCourses(data, studentId)
    } catch (error) {
      throw new Error(
        getErrorMessage(
          error,
          'Không tải được danh sách khóa học đang chờ của học sinh.'
        )
      )
    }
  },

  async getHomePendingCourses(
    studentIdParam?: string | number
  ): Promise<StudentCoursesPendingResponse> {
    return this.getPendingCourses(studentIdParam)
  },

  async getClassDashboard(
    classCode: string,
    studentIdParam?: string | number
  ): Promise<StudentClassDashboardResponse> {
    const studentId = String(studentIdParam ?? resolveStudentId())

    try {
      const response = await coreIXApi.get<
        ApiSuccessResponse<StudentClassDashboardResponse>
      >(STUDENT_API_ENDPOINTS.classDashboard(classCode), {
        params: { student_id: studentId },
      })

      const data = ensureApiData(
        response,
        'Không tải được dashboard lớp học của học sinh.'
      )

      return normalizeDashboardData(data, {
        studentId,
        classCode,
        modeFallback: 'CURRENT',
      })
    } catch (error) {
      throw new Error(
        getErrorMessage(error, 'Không tải được dashboard lớp học của học sinh.')
      )
    }
  },

  async getWeekDashboard(
    classCode: string,
    weekNo: number | string,
    studentIdParam?: string | number
  ): Promise<StudentWeekDashboardResponse> {
    const studentId = String(studentIdParam ?? resolveStudentId())
    const resolvedWeekNo =
      typeof weekNo === 'number' ? weekNo : Number(String(weekNo).trim())

    if (!Number.isFinite(resolvedWeekNo)) {
      throw new Error('weekNo không hợp lệ.')
    }

    try {
      const response = await coreIXApi.get<
        ApiSuccessResponse<StudentWeekDashboardResponse>
      >(STUDENT_API_ENDPOINTS.weekDashboard(classCode, resolvedWeekNo), {
        params: { student_id: studentId, week_no: resolvedWeekNo },
      })

      const data = ensureApiData(
        response,
        'Không tải được dashboard tuần học của học sinh.'
      )

      return normalizeDashboardData(data, {
        studentId,
        classCode,
        modeFallback: 'SELECTED',
      })
    } catch (error) {
      throw new Error(
        getErrorMessage(error, 'Không tải được dashboard tuần học của học sinh.')
      )
    }
  },

  async getTaskDetail(
    classCode: string,
    taskCode: string
  ): Promise<StudentTaskDetailResponse> {
    const studentId = String(resolveStudentId())

    try {
      const response = await coreIXApi.get<
        ApiSuccessResponse<StudentTaskDetailResponse>
      >(STUDENT_API_ENDPOINTS.taskDetail(taskCode), {
        params: {
          student_id: studentId,
          class_code: classCode,
        },
      })

      const data = ensureApiData(response, 'Không tải được nội dung nhiệm vụ.')

      return normalizeTaskDetail(data, {
        studentId,
        classCode,
        taskCode,
      })
    } catch (error) {
      throw new Error(
        getErrorMessage(error, 'Không tải được nội dung nhiệm vụ.')
      )
    }
  },

  emptyState: {
    classInfo: EMPTY_CLASS_INFO,
    referenceContext: EMPTY_REFERENCE_CONTEXT,
    progress: EMPTY_PROGRESS,
  },
}