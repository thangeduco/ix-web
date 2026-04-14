// src/features/student/pages/task-content/StudentQuizTaskContentPage.tsx
import './StudentQuizTaskContentPage.css'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { PublicFooter } from '../../../public/components/PublicFooter'
import { PublicHeader } from '../../../public/components/PublicHeader'
import { StudentQuizTaskContent } from '../../components/task-content/StudentQuizTaskContent'
import { studentApi } from '../../services/student.api'
import type {
  StudentQuizTaskDetail,
  StudentTaskDetailResponse,
} from '../../types/student.types'

function isQuizTaskDetail(
  detail: StudentTaskDetailResponse | null
): detail is StudentQuizTaskDetail {
  return !!detail && detail.content_type === 'QUIZ_TEST'
}

export default function StudentQuizTaskContentPage() {
  const { classCode = '', taskCode = '' } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [data, setData] = useState<StudentQuizTaskDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const returnTo = useMemo(() => {
    return (
      (location.state as { returnTo?: string } | null)?.returnTo ||
      `/student/classes/${classCode}/weeks/current`
    )
  }, [classCode, location.state])

  useEffect(() => {
    let mounted = true

    async function loadData() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await studentApi.getTaskDetail(classCode, taskCode)

        if (!mounted) return

        if (!isQuizTaskDetail(response)) {
          setErrorMessage('Nội dung task không phải quiz test.')
          setIsLoading(false)
          return
        }

        setData(response)
      } catch (error) {
        console.error('[StudentQuizTaskContentPage] loadData failed:', error)
        if (mounted) {
          setErrorMessage('Không tải được nội dung quiz.')
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    void loadData()

    return () => {
      mounted = false
    }
  }, [classCode, taskCode])

  return (
    <div className="student-task-content-page">
      <PublicHeader />
      <main className="student-task-content-page__main">
        {isLoading ? (
          <div className="student-task-content-page__state-card">Đang tải nội dung quiz...</div>
        ) : errorMessage || !data ? (
          <div className="student-task-content-page__state-card student-task-content-page__state-card--error">
            <p>{errorMessage || 'Không có dữ liệu.'}</p>
            <button type="button" onClick={() => navigate(returnTo)}>
              Về trang tuần học
            </button>
          </div>
        ) : (
          <StudentQuizTaskContent data={data} onBack={() => navigate(returnTo)} />
        )}
      </main>
      <PublicFooter />
    </div>
  )
}
