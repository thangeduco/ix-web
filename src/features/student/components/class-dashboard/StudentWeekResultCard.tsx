// src/features/student/components/class-dashboard/StudentWeekResultCard.tsx
import type { StudentPreviousWeekResult, StudentWeekBrief } from '../../types/student.types'
import { StudentTeacherComment } from './StudentTeacherComment'
import { StudentWeekSummaryTable } from './StudentWeekSummaryTable'
import { StudentWeekDetailTable } from './StudentWeekDetailTable'

type StudentWeekResultCardProps = {
  previousWeek: StudentWeekBrief | null
  previousWeekTitle: string
  previousWeekResult: StudentPreviousWeekResult | null
  formatDateRange: (startDate?: string | null, endDate?: string | null) => string
  buildSummaryRows: (result: StudentPreviousWeekResult | null) => {
    label: string
    value: string
    rank: string
    action: string
  }[]
  buildDetailRows: (result: StudentPreviousWeekResult | null) => {
    label: string
    score: string
    sticker: string
    rank: string
    action: string
  }[]
}

export function StudentWeekResultCard({
  previousWeek,
  previousWeekTitle,
  previousWeekResult,
  formatDateRange,
  buildSummaryRows,
  buildDetailRows,
}: StudentWeekResultCardProps) {
  return (
    <section className="student-dashboard-body__card student-dashboard-body__card--left">
      <div className="student-dashboard-body__card-header">
        <div>
          <h2 className="student-dashboard-body__card-title">{previousWeekTitle}</h2>
          <p className="student-dashboard-body__card-date">
            {formatDateRange(previousWeek?.start_date, previousWeek?.end_date)}
          </p>
        </div>
      </div>

      <StudentTeacherComment comment={previousWeekResult?.teacher_comment} />

      <StudentWeekSummaryTable rows={buildSummaryRows(previousWeekResult)} />

      <StudentWeekDetailTable rows={buildDetailRows(previousWeekResult)} />
    </section>
  )
}