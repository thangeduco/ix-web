// src/features/student/pages/task-content/StudentFileTaskContentPage.tsx
import './StudentFileTaskContentPage.css'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { PublicFooter } from '../../../public/components/PublicFooter'
import { PublicHeader } from '../../../public/components/PublicHeader'
import { StudentFileTaskContent } from '../../components/task-content/StudentFileTaskContent'
import { studentApi } from '../../services/student.api'
import type {
  StudentFileTaskDetail,
  StudentTaskDetailResponse,
} from '../../types/student.types'

function isFileTaskDetail(
  detail: StudentTaskDetailResponse | null
): detail is StudentFileTaskDetail {
  return !!detail && detail.content_type === 'FILE'
}

export default function StudentFileTaskContentPage() {
  const { classCode = '', taskCode = '' } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [data, setData] = useState<StudentFileTaskDetail | null>(null)
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

        if (!isFileTaskDetail(response)) {
          setErrorMessage('Nội dung task không phải file content.')
          setIsLoading(false)
          return
        }

        setData(response)
      } catch (error) {
        console.error('[StudentFileTaskContentPage] loadData failed:', error)
        if (mounted) {
          setErrorMessage('Không tải được nội dung file.')
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
          <div className="student-task-content-page__state-card">Đang tải nội dung file...</div>
        ) : errorMessage || !data ? (
          <div className="student-task-content-page__state-card student-task-content-page__state-card--error">
            <p>{errorMessage || 'Không có dữ liệu.'}</p>
            <button type="button" onClick={() => navigate(returnTo)}>
              Về trang tuần học
            </button>
          </div>
        ) : (
          <StudentFileTaskContent data={data} onBack={() => navigate(returnTo)} />
        )}
      </main>
      <PublicFooter />
    </div>
  )
}
