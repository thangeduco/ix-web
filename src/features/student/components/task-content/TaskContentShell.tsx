import './TaskContentShell.css'
import type { PropsWithChildren, ReactNode } from 'react'

type TaskContentShellProps = PropsWithChildren<{
  classNameText: string
  slogan?: string | null
  avatarUrl?: string | null
  title: string
  subtitle?: string | null
  meta?: ReactNode
  sidebar?: ReactNode
  onBack: () => void
}>

const FALLBACK_AVATAR =
  'http://localhost:3000/static/avatars/class_0/avatar.jpg'

export function TaskContentShell({
  classNameText,
  slogan,
  avatarUrl,
  title,
  subtitle,
  meta,
  sidebar,
  onBack,
  children,
}: TaskContentShellProps) {
  return (
    <section className="student-task-shell">
      <div className="student-task-shell__container">
        <div className="student-task-shell__hero">
          <button
            type="button"
            className="student-task-shell__back-btn"
            onClick={onBack}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
            Về trang tuần học
          </button>

          <div className="student-task-shell__identity">
            <div className="student-task-shell__avatar-wrap">
              <img
                src={avatarUrl || FALLBACK_AVATAR}
                alt={classNameText}
                className="student-task-shell__avatar"
              />
            </div>

            <div>
              <h1 className="student-task-shell__class-name">{classNameText}</h1>
              <p className="student-task-shell__class-slogan">
                {slogan || 'Học tập sáng tạo, bứt phá tư duy'}
              </p>
            </div>
          </div>
        </div>

        <div className="student-task-shell__content-grid">
          <div className="student-task-shell__main-card">
            <div className="student-task-shell__heading">
              <h2 className="student-task-shell__title">{title}</h2>
            </div>

            <div className="student-task-shell__body">{children}</div>
          </div>

          {sidebar ? (
            <aside className="student-task-shell__sidebar-card">{sidebar}</aside>
          ) : null}
        </div>
      </div>
    </section>
  )
}