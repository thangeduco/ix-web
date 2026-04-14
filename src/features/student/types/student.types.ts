// src/features/student/types/student.types.ts
export type StudentPendingWeek = {
  class_week_id: string
  week_no: number | null
  title: string | null
  total_student_done: number
  total_student_assigned: number
}

export type StudentPendingCourse = {
  avatar_url: string | null
  class_code: string | null
  class_name: string | null
  slogan: string | null
  pending_weeks: StudentPendingWeek[]
}

export type StudentCoursesPendingResponse = {
  student_id: string
  courses: StudentPendingCourse[]
}

export type StudentStoredUser = {
  id?: string | number
  student_id?: string | number
  full_name?: string | null
  display_name?: string | null
  email?: string | null
  avatar_url?: string | null
  role_code?: string | null
  roles?: string[]
}

/**
 * Dashboard types
 */

export type StudentClassInfo = {
  avatar_url: string | null
  class_name: string | null
  class_code: string | null
  slogan: string | null
}

export type StudentReferenceContextMode = 'CURRENT' | 'SELECTED' | string

export type StudentReferenceContext = {
  mode: StudentReferenceContextMode
  requested_week_no: number | null
  resolved_week_no: number | null
}

export type StudentWeekBrief = {
  id: string | null
  week_no: number | null
  title: string | null
  start_date: string | null
  end_date: string | null
}

export type StudentCurrentWeekProgress = {
  class_week_id: string | null
  total_unfinished_tasks: number
  total_tasks: number
  progress_percent: number
}

export type StudentPreviousWeekResult = {
  id: string | null
  student_id: string | null
  class_id: string | null
  week_id: string | null
  class_code: string | null
  week_no: number | null
  teacher_comment: string | null

  week_score: number | null
  week_score_ranking: number | null

  total_week_stickers: number | null
  total_week_stickers_ranking: number | null

  homework_score: number | null
  homework_score_ranking: number | null
  homework_stickers: number | null

  extra_assignment_score: number | null
  extra_assignment_score_ranking: number | null
  extra_assignment_stickers: number | null

  preparation_score: number | null
  preparation_score_ranking: number | null
  preparation_stickers: number | null

  in_class_score: number | null
  in_class_score_ranking: number | null
  in_class_stickers: number | null

  created_at: string | null
  updated_at: string | null
}

export type StudentTaskSectionType =
  | 'HOMEWORK_EXTRA_FOR_STUDENT'
  | 'HOMEWORK_FOR_CLASS'
  | 'PREPARE_LESSON_FOR_CLASS'
  | 'OFFLINE_IN_CLASSROOM'
  | string

export type StudentTaskStatus =
  | 'STUDENT_DONE'
  | 'NEED_STUDENT_DO'
  | 'NEED_STUDENT_CONTINUE'
  | 'NO_NEED_STUDENT_DO'
  | string

export type StudentTaskNextAction =
  | 'STUDENT_DONE'
  | 'NEED_STUDENT_DO'
  | 'NEED_STUDENT_CONTINUE'
  | 'NO_NEED_STUDENT_DO'
  | string

export type StudentTaskContentType = 'VIDEO' | 'FILE' | 'QUIZ_TEST' | string

export type StudentWeekTask = {
  task_code: string
  task_title: string
  section_type: StudentTaskSectionType
  content_type: StudentTaskContentType
  task_status: StudentTaskStatus
  task_next_action: StudentTaskNextAction
  display_order: number
  total_student_completed: number
}

export type StudentDashboardData = {
  student_id: string
  class_code: string
  class_info: StudentClassInfo
  reference_context: StudentReferenceContext
  current_week: StudentWeekBrief | null
  current_week_tasks: StudentWeekTask[]
  current_week_progress: StudentCurrentWeekProgress | null
  previous_week: StudentWeekBrief | null
  next_week?: StudentWeekBrief | null
  previous_week_result: StudentPreviousWeekResult | null
}

export type StudentClassDashboardResponse = StudentDashboardData
export type StudentWeekDashboardResponse = StudentDashboardData

/**
 * Task content detail types
 */

export type StudentTaskInfo = {
  task_code: string
  task_title: string
  content_type: StudentTaskContentType
}

export type StudentTaskStatistics = {
  section_type: string
  class_id: string | null
  class_week_id: string | null
  total_student_assigned: number
  total_student_completed: number
  highest_score: number | null
}

export type StudentVideoLecture = {
  id: string
  title: string
  description: string | null
  video_url: string | null
  thumbnail_url: string | null
  duration_seconds: number
}

export type StudentVideoQuizOption = {
  key: string
  text: string
  next_question_id?: string | null
}

export type StudentVideoQuizQuestion = {
  question_text: string
  options: StudentVideoQuizOption[]
  correct_answer: string
  next_question_id_correct?: string | null
  next_question_id_wrong?: string | null
}

export type StudentVideoEventQuestion = {
  id: string
  is_start_question: boolean
  display_order: number
  score: number
  quiz_question: StudentVideoQuizQuestion
}

export type StudentQuizEvent = {
  id: string
  lecture_video_id: string
  title: string
  description: string | null
  trigger_second: number
  pause_video: boolean
  is_required: boolean
  questions: StudentVideoEventQuestion[]
}

export type StudentVideoTaskDetail = {
  student_id: string
  class_code: string
  task_code: string
  content_type: 'VIDEO'
  class_info: StudentClassInfo
  task_info: StudentTaskInfo
  task_statistics: StudentTaskStatistics
  video_title: string | null
  video_id: string | null
  lecture_video: StudentVideoLecture | null
  quiz_events: StudentQuizEvent[]

  /**
   * Chưa thấy trong payload hiện tại của file abc.txt.
   * Để optional để frontend tích hợp trước, nếu backend trả ra thì tận dụng luôn.
   */
  task_id?: string | null
}

export type StudentFileAsset = {
  file_url: string | null
  file_name: string | null
}

export type StudentFileContent = {
  content_id: string | null
  file: StudentFileAsset | null
}

export type StudentFileTaskDetail = {
  student_id: string
  class_code: string
  task_code: string
  content_type: 'FILE'
  class_info: StudentClassInfo
  task_info: StudentTaskInfo
  task_statistics: StudentTaskStatistics
  file_content: StudentFileContent | null
}

export type StudentQuizQuestionOption = {
  key: string
  text: string
}

export type StudentQuizQuestion = {
  id: string
  question_text: string
  question_type: string
  options: StudentQuizQuestionOption[]
  correct_answer: string | null
  explanation: string | null
  default_score: number
  difficulty_level: string | null
  display_order: number
  score: number
  is_required: boolean
}

export type StudentQuizConfig = {
  id: string
  title: string
  description: string | null
  quiz_type: string | null
  time_limit_minutes: number | null
  max_attempts: number | null
  passing_score: number | null
  shuffle_question: boolean
  shuffle_option: boolean
}

export type StudentQuizTestContent = {
  content_id: string | null
  title: string | null
  quiz_test: StudentQuizConfig | null
  questions: StudentQuizQuestion[]
}

export type StudentQuizTaskDetail = {
  student_id: string
  class_code: string
  task_code: string
  content_type: 'QUIZ_TEST'
  class_info: StudentClassInfo
  task_info: StudentTaskInfo
  task_statistics: StudentTaskStatistics
  quiz_test: StudentQuizTestContent | null
}

export type StudentTaskDetailResponse =
  | StudentVideoTaskDetail
  | StudentFileTaskDetail
  | StudentQuizTaskDetail

/**
 * Video tracking types for iX-core integration
 */

export type StudentVideoSessionStatus =
  | 'PLAYING'
  | 'PAUSED'
  | 'ENDED'
  | string

export type StudentVideoQuizAttemptStatus =
  | 'STARTED'
  | 'SUBMITTED'
  | 'CLOSED'
  | string

export type StudentVideoSession = {
  id: string | number
  student_id: string | number
  task_id: string | number
  task_code: string
  lecture_video_id: string | number
  status: StudentVideoSessionStatus
  start_second?: number | null
  end_second?: number | null
  current_second?: number | null
  device_type?: string | null
  app_platform?: string | null
  created_at?: string | null
  updated_at?: string | null
}

export type StudentVideoQuizAttempt = {
  id: string | number
  student_id: string | number
  task_id: string | number
  task_code: string
  session_id?: string | number | null
  lecture_video_id?: string | number | null
  video_quiz_event_id: string | number
  attempt_no?: number | null
  status: StudentVideoQuizAttemptStatus
  created_at?: string | null
  updated_at?: string | null
}

export type StudentStartVideoSessionPayload = {
  student_id: number
  task_id: number | string
  task_code: string
  lecture_video_id: number | string
  start_second: number
  device_type: string
  app_platform: string
}

export type StudentHeartbeatVideoSessionPayload = {
  session_id: string | number
  current_second: number
  playback_rate: number
}

export type StudentPauseVideoSessionPayload = {
  session_id: string | number
  current_second: number
}

export type StudentResumeVideoSessionPayload = {
  session_id: string | number
}

export type StudentSeekVideoSessionPayload = {
  session_id: string | number
  from_second: number
  to_second: number
}

export type StudentEndVideoSessionPayload = {
  session_id: string | number
  end_second: number
}

export type StudentOpenVideoQuizEventPayload = {
  student_id: number
  task_id: number | string
  task_code: string
  session_id: string | number
  lecture_video_id: number | string
  video_quiz_event_id: number
  event_second: number
}

export type StudentCloseVideoQuizEventPayload = {
  attempt_id: string | number
  event_second: number
}

export type StudentAnswerVideoQuizEventPayload = {
  attempt_id: string | number
  student_id: number
  task_id: number | string
  task_code: string
  session_id: string | number
  lecture_video_id: number | string
  video_quiz_event_id: number
  question_id: number
  selected_answer: string
  is_correct: boolean
  answered_second: number
}

export type StudentSubmitVideoQuizEventPayload = {
  attempt_id: string | number
  total_questions: number
  correct_answers: number
  score: number
  is_passed: boolean
}