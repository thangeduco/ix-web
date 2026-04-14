// src/features/student/pages/StudentWeekDashboardPage.tsx
import './StudentWeekDashboardPage'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PublicFooter } from '../../public/components/PublicFooter'
import { PublicHeader } from '../../public/components/PublicHeader'
import { StudentDashboardBody } from '../components/class-dashboard/StudentDashboardBody'
import { studentApi } from '../services/student.api'
import type { StudentWeekDashboardResponse } from '../types/student.types'

const EMPTY_DASHBOARD: StudentWeekDashboardResponse = {
  student_id: '',
  class_code: '',
  class_info: {
    avatar_url: null,
    class_name: null,
    class_code: null,
    slogan: null,
  },
  reference_context: {
    mode: 'SELECTED',
    requested_week_no: null,
    resolved_week_no: null,
  },
  current_week: null,
  current_week_tasks: [],
  current_week_progress: {
    class_week_id: null,
    total_unfinished_tasks: 0,
    total_tasks: 0,
    progress_percent: 0,
  },
  previous_week: null,
  previous_week_result: null,
}

export function StudentWeekDashboardPage() {
  const { classCode = '', weekNo = '' } = useParams()
  const [data, setData] = useState<StudentWeekDashboardResponse>(EMPTY_DASHBOARD)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadDashboard() {
      if (!classCode || !weekNo) {
        if (!isMounted) return
        setData(EMPTY_DASHBOARD)
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)

        const response =
          weekNo === 'current'
            ? await studentApi.getClassDashboard(classCode)
            : await studentApi.getWeekDashboard(classCode, weekNo)

        if (!isMounted) return
        setData(response)
      } catch (error) {
        console.error('[StudentWeekDashboardPage] loadDashboard failed:', error)

        if (!isMounted) return
        setData(EMPTY_DASHBOARD)
      } finally {
        if (!isMounted) return
        setIsLoading(false)
      }
    }

    void loadDashboard()

    return () => {
      isMounted = false
    }
  }, [classCode, weekNo])

  return (
    <div className="student-week-dashboard-page">
      <PublicHeader />

      <main className="student-week-dashboard-page__main">
        <StudentDashboardBody data={data} isLoading={isLoading} />
      </main>

      <PublicFooter />
    </div>
  )
}