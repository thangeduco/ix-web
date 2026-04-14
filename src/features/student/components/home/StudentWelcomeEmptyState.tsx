// src/features/student/components/home/StudentWelcomeEmptyState.tsx
import './StudentWelcomeEmptyState.css'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'

type StoredUser = {
  display_name?: string | null
  full_name?: string | null
}

function getStoredUser(): StoredUser | null {
  const raw =
    localStorage.getItem('ix_user') || sessionStorage.getItem('ix_user') || null

  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch (error) {
    console.error('[StudentWelcomeEmptyState] Parse ix_user failed:', error)
    return null
  }
}

function getDisplayName(): string {
  const user = getStoredUser()

  if (user?.display_name && user.display_name.trim()) {
    return user.display_name.trim()
  }

  if (user?.full_name && user.full_name.trim()) {
    return user.full_name.trim()
  }

  return 'em'
}

export function StudentWelcomeEmptyState() {
  const displayName = useMemo(() => getDisplayName(), [])

  return (
    <section className="student-welcome-empty">
      <div className="student-welcome-empty__container">
        <div className="student-welcome-empty__card">
          <section className="student-welcome-empty__section">
            <div className="student-welcome-empty__eyebrow">
              Chào mừng{' '}
              <span className="student-welcome-empty__display-name">
                {displayName}
              </span>{' '}
              đến với hệ thống giáo dục iX!
            </div>
          </section>

          <section className="student-welcome-empty__section student-welcome-empty__section--notice">
            <h2 className="student-welcome-empty__section-title">
              📌 Hiện tại em chưa tham gia khóa học nào
            </h2>
          </section>

          <section className="student-welcome-empty__section student-welcome-empty__section--actions">
            <h2 className="student-welcome-empty__section-title">
              👉 Gợi ý cho em:
            </h2>

            <div className="student-welcome-empty__suggestions">
              <p>
                Khám phá <strong>Các khóa học</strong> phù hợp với mục tiêu của mình
              </p>
              <p>
                Tìm hiểu <strong>Danh sách cơ sở</strong> để đăng ký học thuận tiện
                nhất
              </p>
              <p className="student-welcome-empty__final-text">
                Hãy bắt đầu ngay hôm nay để tạo nên sự khác biệt cho chính mình! 🌟
              </p>
            </div>

            <div className="student-welcome-empty__buttons">
              <Link
                to="/khoa-hoc"
                className="student-welcome-empty__button student-welcome-empty__button--primary"
              >
                Các khóa học
              </Link>

              <Link
                to="#"
                className="student-welcome-empty__button student-welcome-empty__button--secondary"
              >
                Danh sách cơ sở
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}