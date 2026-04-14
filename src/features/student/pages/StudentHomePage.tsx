// src/features/student/pages/StudentHomePage.tsx
import './StudentHomePage.css'
import { useEffect, useMemo, useState } from 'react'
import { PublicFooter } from '../../public/components/PublicFooter'
import { PublicHeader } from '../../public/components/PublicHeader'
import { StudentHomeBody } from '../components/home/StudentHomeBody'
import { StudentWelcomeEmptyState } from '../components/home/StudentWelcomeEmptyState'
import { studentApi } from '../services/student.api'
import type { StudentCoursesPendingResponse } from '../types/student.types'

const EMPTY_DATA: StudentCoursesPendingResponse = {
  student_id: '',
  courses: [],
}

export function StudentHomePage() {
  const [data, setData] = useState<StudentCoursesPendingResponse>(EMPTY_DATA)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadStudentHome() {
      try {
        setIsLoading(true)
        const response = await studentApi.getHomePendingCourses()

        if (!isMounted) return
        setData(response)
      } catch (error) {
        console.error('[StudentHomePage] loadStudentHome failed:', error)

        if (!isMounted) return
        setData(EMPTY_DATA)
      } finally {
        if (!isMounted) return
        setIsLoading(false)
      }
    }

    void loadStudentHome()

    return () => {
      isMounted = false
    }
  }, [])

  const hasJoinedCourses = useMemo(() => {
    return Array.isArray(data.courses) && data.courses.length > 0
  }, [data.courses])

  return (
    <div className="student-home-page">
      <PublicHeader />

      <main className="student-home-page__main">
        {isLoading || hasJoinedCourses ? (
          <StudentHomeBody data={data} isLoading={isLoading} />
        ) : (
          <StudentWelcomeEmptyState />
        )}
      </main>

      <PublicFooter />
    </div>
  )
}