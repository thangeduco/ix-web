// src/features/student/pages/StudentClassDashboardPage.tsx
import './StudentClassDashboardPage.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PublicFooter } from '../../public/components/PublicFooter'
import { PublicHeader } from '../../public/components/PublicHeader'
import { StudentDashboardBody } from '../components/class-dashboard/StudentDashboardBody'
import { studentApi } from '../services/student.api'
import type { StudentClassDashboardResponse } from '../types/student.types'

const EMPTY_DASHBOARD: StudentClassDashboardResponse = {
  student_id: '',
  class_code: '',
  class_info: {
    avatar_url: null,
    class_name: null,
    class_code: null,
    slogan: null,
  },
  reference_context: {
    mode: 'CURRENT',
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

export function StudentClassDashboardPage() {
  const { classCode = '' } = useParams()
  const [data, setData] = useState<StudentClassDashboardResponse>(EMPTY_DASHBOARD)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadDashboard() {
      if (!classCode) {
        if (!isMounted) return
        setData(EMPTY_DASHBOARD)
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const response = await studentApi.getClassDashboard(classCode)

        if (!isMounted) return
        setData(response)
      } catch (error) {
        console.error(
          '[StudentClassDashboardPage] loadDashboard failed:',
          error
        )

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
  }, [classCode])

  return (
    <div className="student-class-dashboard-page">
      <PublicHeader />

      <main className="student-class-dashboard-page__main">
        <StudentDashboardBody data={data} isLoading={isLoading} />
      </main>

      <PublicFooter />
    </div>
  )
}