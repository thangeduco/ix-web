// src/features/student/components/class-dashboard/StudentDashboardBody.tsx
import './StudentDashboardBody.css'
import './StudentDashboardHero.css'
import './StudentWeekResultCard.css'
import './StudentWeekTaskCard.css'
import './StudentTeacherComment.css'
import './StudentWeekSummaryTable.css'
import './StudentWeekDetailTable.css'
import './StudentTaskGroupList.css'
import './StudentWeekProgressBanner.css'

import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type {
  StudentCurrentWeekProgress,
  StudentDashboardData,
  StudentPreviousWeekResult,
  StudentWeekTask,
} from '../../types/student.types'
import { studentApi } from '../../services/student.api'
import { StudentDashboardHero } from './StudentDashboardHero'
import { StudentWeekResultCard } from './StudentWeekResultCard'
import { StudentWeekTaskCard } from './StudentWeekTaskCard'

type StudentDashboardBodyProps = {
  data?: StudentDashboardData | null
  isLoading?: boolean
}

const FALLBACK_CLASS_IMAGE =
  'http://localhost:3000/static/avatars/class_0/avatar.jpg'

const EMPTY_PROGRESS: StudentCurrentWeekProgress = {
  class_week_id: null,
  total_unfinished_tasks: 0,
  total_tasks: 0,
  progress_percent: 0,
}

function formatDate(dateString?: string | null) {
  if (!dateString) return '—'

  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) return '—'

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

function formatDateRange(startDate?: string | null, endDate?: string | null) {
  if (!startDate && !endDate) return '—'

  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

function formatScore(value?: number | null) {
  if (value == null || Number.isNaN(value)) return '—'

  if (Number.isInteger(value)) return String(value)

  return value.toFixed(1)
}

function formatRanking(value?: number | null) {
  if (value == null || Number.isNaN(value)) return '—'
  return String(value)
}

function normalizePercent(value?: number | null) {
  if (value == null || Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100

  return Math.round(value)
}

function resolveTaskStatusLabel(status?: string) {
  switch (status) {
    case 'STUDENT_DONE':
      return 'Đã hoàn thành'
    case 'NEED_STUDENT_DO':
      return 'Cần làm'
    case 'NEED_STUDENT_CONTINUE':
      return 'Đang làm'
    case 'NO_NEED_STUDENT_DO':
      return 'Học trên lớp'
    default:
      return status || 'Đang cập nhật'
  }
}

function resolveTaskActionLabel(task: StudentWeekTask) {
  const actionKey = task.task_next_action || task.task_status

  switch (actionKey) {
    case 'STUDENT_DONE':
      return 'Làm lại'
    case 'NEED_STUDENT_DO':
      return 'Vào làm'
    case 'NEED_TO_PREVIEW':
      return 'Xem trước'
    case 'NEED_STUDENT_CONTINUE':
      return 'Làm tiếp'
    case 'NO_NEED_STUDENT_DO':
      return 'Chờ học trên lớp'
    default:
      switch (task.task_status) {
        case 'STUDENT_DONE':
          return 'Làm lại'
        case 'NEED_STUDENT_DO':
          return 'Vào làm'
        case 'NEED_STUDENT_CONTINUE':
          return 'Làm tiếp'
        case 'NO_NEED_STUDENT_DO':
          return 'Chờ học trên lớp'
        default:
          return 'Vào học'
      }
  }
}

function buildSummaryRows(result: StudentPreviousWeekResult | null) {
  return [
    {
      label: 'Điểm tuần',
      value: formatScore(result?.week_score),
      rank: formatRanking(result?.week_score_ranking),
      action: 'Xem',
    },
    {
      label: 'Sticker thầy thưởng',
      value:
        result?.total_week_stickers == null ? '—' : String(result.total_week_stickers),
      rank: formatRanking(result?.total_week_stickers_ranking),
      action: 'Xem',
    },
  ]
}

function buildDetailRows(result: StudentPreviousWeekResult | null) {
  return [
    {
      label: 'BTVN chung',
      score: formatScore(result?.homework_score),
      sticker:
        result?.homework_stickers == null ? '—' : String(result.homework_stickers),
      rank: formatRanking(result?.homework_score_ranking),
      action: 'Xem',
    },
    {
      label: 'BTVN thầy cho thêm',
      score: formatScore(result?.extra_assignment_score),
      sticker:
        result?.extra_assignment_stickers == null
          ? '—'
          : String(result.extra_assignment_stickers),
      rank: formatRanking(result?.extra_assignment_score_ranking),
      action: 'Xem',
    },
    {
      label: 'Chuẩn bị bài',
      score: formatScore(result?.preparation_score),
      sticker:
        result?.preparation_stickers == null
          ? '—'
          : String(result.preparation_stickers),
      rank: formatRanking(result?.preparation_score_ranking),
      action: 'Xem',
    },
    {
      label: 'Học trên lớp',
      score: formatScore(result?.in_class_score),
      sticker:
        result?.in_class_stickers == null ? '—' : String(result.in_class_stickers),
      rank: formatRanking(result?.in_class_score_ranking),
      action: 'Xem',
    },
  ]
}

function DashboardSkeleton() {
  return (
    <section className="student-dashboard-body">
      <div className="student-dashboard-body__container">
        <div className="student-dashboard-body__hero student-dashboard-body__hero--loading">
          <div className="student-dashboard-body__skeleton student-dashboard-body__skeleton--hero-title" />
          <div className="student-dashboard-body__skeleton student-dashboard-body__skeleton--hero-subtitle" />
        </div>

        <div className="student-dashboard-body__grid">
          <div className="student-dashboard-body__card student-dashboard-body__card--left">
            <div className="student-dashboard-body__skeleton student-dashboard-body__skeleton--card-title" />
            <div className="student-dashboard-body__skeleton student-dashboard-body__skeleton--comment" />
            <div className="student-dashboard-body__skeleton student-dashboard-body__skeleton--table" />
            <div className="student-dashboard-body__skeleton student-dashboard-body__skeleton--table" />
          </div>

          <div className="student-dashboard-body__card student-dashboard-body__card--right">
            <div className="student-dashboard-body__skeleton student-dashboard-body__skeleton--card-title" />
            <div className="student-dashboard-body__skeleton student-dashboard-body__skeleton--task" />
            <div className="student-dashboard-body__skeleton student-dashboard-body__skeleton--task" />
            <div className="student-dashboard-body__skeleton student-dashboard-body__skeleton--progress" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function StudentDashboardBody({
  data,
  isLoading = false,
}: StudentDashboardBodyProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const [weekPopupMessage, setWeekPopupMessage] = useState('')
  const popupTimerRef = useRef<number | null>(null)

  const classInfo = data?.class_info
  const currentWeek = data?.current_week ?? null
  const previousWeek = data?.previous_week ?? null
  const nextWeek = data?.next_week ?? null
  const previousWeekResult = data?.previous_week_result ?? null
  const currentWeekTasks = Array.isArray(data?.current_week_tasks)
    ? data.current_week_tasks
    : []
  const currentWeekProgress = data?.current_week_progress ?? EMPTY_PROGRESS

  const classNameText = classInfo?.class_name || 'Lớp học iX'
  const classCode = classInfo?.class_code || data?.class_code || ''
  const slogan = classInfo?.slogan || 'Mỗi tuần là một bước tiến mới.'

  const currentWeekTitle =
    currentWeek?.title ||
    (currentWeek?.week_no != null ? `Tuần ${currentWeek.week_no}` : 'Tuần hiện tại')

  const previousWeekTitle =
    previousWeek?.title ||
    (previousWeek?.week_no != null
      ? `Tuần ${previousWeek.week_no}`
      : 'Kết quả tuần trước')

  const progressPercent = normalizePercent(currentWeekProgress.progress_percent)
  const totalTasks = currentWeekProgress.total_tasks ?? 0
  const unfinishedTasks = currentWeekProgress.total_unfinished_tasks ?? 0
  const finishedTasks = Math.max(totalTasks - unfinishedTasks, 0)

  const resolvedWeekNo =
    data?.reference_context?.resolved_week_no ?? currentWeek?.week_no ?? null

  const canGoPrevWeek = !!classCode && resolvedWeekNo != null
  const canGoNextWeek = !!classCode && resolvedWeekNo != null

  const showWeekBoundaryPopup = (message = 'Không còn tuần nào nữa') => {
    setWeekPopupMessage(message)

    if (popupTimerRef.current) {
      window.clearTimeout(popupTimerRef.current)
    }

    popupTimerRef.current = window.setTimeout(() => {
      setWeekPopupMessage('')
      popupTimerRef.current = null
    }, 2200)
  }

  const showTaskPopup = (message: string) => {
    setWeekPopupMessage(message)

    if (popupTimerRef.current) {
      window.clearTimeout(popupTimerRef.current)
    }

    popupTimerRef.current = window.setTimeout(() => {
      setWeekPopupMessage('')
      popupTimerRef.current = null
    }, 2400)
  }

  const handleTaskActionClick = async (task: StudentWeekTask) => {
    if (!classCode || !task?.task_code) return

    try {
      const detail = await studentApi.getTaskDetail(classCode, task.task_code)
      const returnTo = location.pathname

      switch (detail.content_type) {
        case 'VIDEO':
          navigate(`/student/classes/${classCode}/tasks/${task.task_code}/video`, {
            state: { returnTo },
          })
          return
        case 'FILE':
          navigate(`/student/classes/${classCode}/tasks/${task.task_code}/file`, {
            state: { returnTo },
          })
          return
        case 'QUIZ_TEST':
          navigate(`/student/classes/${classCode}/tasks/${task.task_code}/quiz`, {
            state: { returnTo },
          })
          return
        default:
          showTaskPopup('Loại nội dung chưa được hỗ trợ')
      }
    } catch (error) {
      console.error('[StudentDashboardBody] handleTaskActionClick failed:', error)
      showTaskPopup('Không tải được nội dung nhiệm vụ')
    }
  }

  const handleGoPrevWeek = async () => {
    if (!classCode || resolvedWeekNo == null) return

    if (previousWeek?.week_no != null) {
      navigate(`/student/classes/${classCode}/weeks/${previousWeek.week_no}`)
      return
    }

    const targetWeekNo = resolvedWeekNo - 1

    if (targetWeekNo < 1) {
      showWeekBoundaryPopup()
      return
    }

    try {
      const response = await studentApi.getWeekDashboard(classCode, targetWeekNo)
      const resolvedTargetWeekNo =
        response?.reference_context?.resolved_week_no ?? response?.current_week?.week_no

      if (resolvedTargetWeekNo === targetWeekNo) {
        navigate(`/student/classes/${classCode}/weeks/${targetWeekNo}`)
        return
      }

      showWeekBoundaryPopup()
    } catch (error) {
      console.error('[StudentDashboardBody] handleGoPrevWeek failed:', error)
      showWeekBoundaryPopup()
    }
  }

  const handleGoNextWeek = async () => {
    if (!classCode || resolvedWeekNo == null) return

    if (nextWeek?.week_no != null) {
      navigate(`/student/classes/${classCode}/weeks/${nextWeek.week_no}`)
      return
    }

    const targetWeekNo = resolvedWeekNo + 1

    try {
      const response = await studentApi.getWeekDashboard(classCode, targetWeekNo)
      const resolvedTargetWeekNo =
        response?.reference_context?.resolved_week_no ?? response?.current_week?.week_no

      if (resolvedTargetWeekNo === targetWeekNo) {
        navigate(`/student/classes/${classCode}/weeks/${targetWeekNo}`)
        return
      }

      showWeekBoundaryPopup()
    } catch (error) {
      console.error('[StudentDashboardBody] handleGoNextWeek failed:', error)
      showWeekBoundaryPopup()
    }
  }

  useEffect(() => {
    return () => {
      if (popupTimerRef.current) {
        window.clearTimeout(popupTimerRef.current)
      }
    }
  }, [])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <section className="student-dashboard-body">
      {weekPopupMessage ? (
        <div
          className="student-dashboard-body__popup"
          role="alert"
          aria-live="assertive"
        >
          <div className="student-dashboard-body__popup-card">
            <span className="material-symbols-outlined" aria-hidden="true">
              info
            </span>
            <span>{weekPopupMessage}</span>
          </div>
        </div>
      ) : null}

      <div className="student-dashboard-body__container">
        <StudentDashboardHero
          classNameText={classNameText}
          slogan={slogan}
          avatarUrl={classInfo?.avatar_url ?? null}
          fallbackAvatarUrl={FALLBACK_CLASS_IMAGE}
          canGoPrevWeek={canGoPrevWeek}
          canGoNextWeek={canGoNextWeek}
          onGoPrevWeek={() => {
            void handleGoPrevWeek()
          }}
          onGoNextWeek={() => {
            void handleGoNextWeek()
          }}
        />

        <div className="student-dashboard-body__grid">
          <StudentWeekResultCard
            previousWeek={previousWeek}
            previousWeekTitle={previousWeekTitle}
            previousWeekResult={previousWeekResult}
            formatDateRange={formatDateRange}
            buildSummaryRows={buildSummaryRows}
            buildDetailRows={buildDetailRows}
          />

          <StudentWeekTaskCard
            currentWeek={currentWeek}
            currentWeekTitle={currentWeekTitle}
            currentWeekTasks={currentWeekTasks}
            progressPercent={progressPercent}
            finishedTasks={finishedTasks}
            totalTasks={totalTasks}
            unfinishedTasks={unfinishedTasks}
            formatDateRange={formatDateRange}
            resolveTaskStatusLabel={resolveTaskStatusLabel}
            resolveTaskActionLabel={resolveTaskActionLabel}
            onTaskActionClick={(task) => {
              void handleTaskActionClick(task)
            }}
          />
        </div>
      </div>
    </section>
  )
}