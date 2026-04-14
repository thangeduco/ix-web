// src/features/student/components/class-dashboard/StudentWeekTaskCard.tsx
import type { StudentWeekBrief, StudentWeekTask } from '../../types/student.types'
import { StudentTaskGroupList } from './StudentTaskGroupList'
import { StudentWeekProgressBanner } from './StudentWeekProgressBanner'

type StudentWeekTaskCardProps = {
  currentWeek: StudentWeekBrief | null
  currentWeekTitle: string
  currentWeekTasks: StudentWeekTask[]
  progressPercent: number
  finishedTasks: number
  totalTasks: number
  unfinishedTasks: number
  formatDateRange: (startDate?: string | null, endDate?: string | null) => string
  resolveTaskStatusLabel: (status?: string) => string
  resolveTaskActionLabel: (task: StudentWeekTask) => string
  onTaskActionClick?: (task: StudentWeekTask) => void
}

export function StudentWeekTaskCard({
  currentWeek,
  currentWeekTitle,
  currentWeekTasks,
  progressPercent,
  finishedTasks,
  totalTasks,
  unfinishedTasks,
  formatDateRange,
  resolveTaskStatusLabel,
  resolveTaskActionLabel,
  onTaskActionClick,
}: StudentWeekTaskCardProps) {
  return (
    <aside className="student-dashboard-body__card student-dashboard-body__card--right">
      <div className="student-dashboard-body__card-header">
        <div>
          <h2 className="student-dashboard-body__card-title">{currentWeekTitle}</h2>
          <p className="student-dashboard-body__card-date">
            {formatDateRange(currentWeek?.start_date, currentWeek?.end_date)}
          </p>
        </div>
      </div>

      <div className="student-dashboard-body__task-card-content">
        <StudentTaskGroupList
          tasks={currentWeekTasks}
          resolveTaskStatusLabel={resolveTaskStatusLabel}
          resolveTaskActionLabel={resolveTaskActionLabel}
          onTaskActionClick={onTaskActionClick}
        />

        <StudentWeekProgressBanner
          progressPercent={progressPercent}
          finishedTasks={finishedTasks}
          totalTasks={totalTasks}
          unfinishedTasks={unfinishedTasks}
        />
      </div>
    </aside>
  )
}