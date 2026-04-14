// src/features/student/components/task-content/StudentTaskContentScaffold.tsx
import './StudentTaskContentScaffold.css'
import type { ReactNode } from 'react'
import { PublicFooter } from '../../../public/components/PublicFooter'
import { PublicHeader } from '../../../public/components/PublicHeader'

type StudentTaskContentScaffoldProps = {
  classNameText: string
  slogan: string
  avatarUrl?: string | null
  sectionTitle: string
  taskTitle: string
  dateText?: string
  progressText?: string
  highestScoreText?: string
  onBack?: () => void
  children: ReactNode
  aside?: ReactNode
}

const FALLBACK_CLASS_IMAGE =
  'http://localhost:3000/static/avatars/class_0/avatar.jpg'

export function StudentTaskContentScaffold({
  classNameText,
  slogan,
  avatarUrl,
  sectionTitle,
  taskTitle,
  dateText = '—',
  progressText = '—',
  highestScoreText = '—',
  onBack,
  children,
  aside,
}: StudentTaskContentScaffoldProps) {
  return (
    <div className="student-task-content-layout">
      <PublicHeader />

      <main className="student-task-content-layout__main">
        <section className="student-task-content-layout__hero">
          <div className="student-task-content-layout__hero-inner">
            <button
              type="button"
              className="student-task-content-layout__back-btn"
              onClick={onBack}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                calendar_month
              </span>
              Về trang tuần học
            </button>

            <div className="student-task-content-layout__class-box">
              <div className="student-task-content-layout__class-avatar">
                <img
                  src={avatarUrl || FALLBACK_CLASS_IMAGE}
                  alt={classNameText}
                  onError={(event) => {
                    event.currentTarget.src = FALLBACK_CLASS_IMAGE
                  }}
                />
              </div>

              <div className="student-task-content-layout__class-meta">
                <h1>{classNameText}</h1>
                <p>{slogan}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="student-task-content-layout__content">
          <div className="student-task-content-layout__grid">
            <div className="student-task-content-layout__main-col">
              <div className="student-task-content-layout__task-head">
                <div className="student-task-content-layout__section-title">
                  {sectionTitle}
                </div>

                <h2 className="student-task-content-layout__task-title">
                  {taskTitle}
                </h2>

                <p className="student-task-content-layout__date-text">{dateText}</p>

                <div className="student-task-content-layout__stats">
                  <div className="student-task-content-layout__stat-card">
                    <div className="student-task-content-layout__stat-icon">
                      <span className="material-symbols-outlined" aria-hidden="true">
                        groups
                      </span>
                    </div>
                    <div>
                      <span>Tiến độ lớp học</span>
                      <strong>{progressText}</strong>
                    </div>
                  </div>

                  <div className="student-task-content-layout__stat-card">
                    <div className="student-task-content-layout__stat-icon">
                      <span className="material-symbols-outlined" aria-hidden="true">
                        star
                      </span>
                    </div>
                    <div>
                      <span>Thành tích cao nhất</span>
                      <strong>{highestScoreText}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {children}
            </div>

            {aside ? (
              <aside className="student-task-content-layout__aside">{aside}</aside>
            ) : null}
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}