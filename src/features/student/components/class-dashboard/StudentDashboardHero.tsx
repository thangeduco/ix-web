// src/features/student/components/class-dashboard/StudentDashboardHero.tsx
import { Link } from 'react-router-dom'

type StudentDashboardHeroProps = {
  classNameText: string
  slogan?: string | null
  avatarUrl?: string | null
  fallbackAvatarUrl: string
  canGoPrevWeek?: boolean
  canGoNextWeek?: boolean
  onGoPrevWeek?: () => void
  onGoNextWeek?: () => void
}

function resolveAvatar(avatarUrl?: string | null, fallbackAvatarUrl?: string) {
  if (!avatarUrl || !avatarUrl.trim()) {
    return fallbackAvatarUrl || ''
  }

  return avatarUrl
}

export function StudentDashboardHero({
  classNameText,
  slogan,
  avatarUrl,
  fallbackAvatarUrl,
  canGoPrevWeek = false,
  canGoNextWeek = false,
  onGoPrevWeek,
  onGoNextWeek,
}: StudentDashboardHeroProps) {
  return (
    <section className="student-dashboard-body__hero">
      <div className="student-dashboard-body__hero-side student-dashboard-body__hero-side--left">
        <Link to="/student/home" className="student-dashboard-body__back-link">
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_back
          </span>
          Về trang các lớp học
        </Link>
      </div>

      <div className="student-dashboard-body__hero-main">
        <div className="student-dashboard-body__hero-avatar-wrap">
          <img
            className="student-dashboard-body__hero-avatar"
            src={resolveAvatar(avatarUrl, fallbackAvatarUrl)}
            alt={classNameText}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = fallbackAvatarUrl
            }}
          />
        </div>

        <div className="student-dashboard-body__hero-copy">
          <h1 className="student-dashboard-body__hero-title">{classNameText}</h1>

          <p className="student-dashboard-body__hero-subtitle">
            {slogan || 'Mỗi tuần là một bước tiến mới.'}
          </p>
        </div>
      </div>

      <div className="student-dashboard-body__hero-side student-dashboard-body__hero-side--right">
        <div className="student-dashboard-body__week-switcher">
          <button
            type="button"
            className="student-dashboard-body__week-switcher-btn student-dashboard-body__week-switcher-btn--prev"
            onClick={onGoPrevWeek}
            disabled={!canGoPrevWeek}
          >
            <span className="student-dashboard-body__week-switcher-arrow">{'<'}</span>
            Tuần trước
          </button>

          <button
            type="button"
            className="student-dashboard-body__week-switcher-btn student-dashboard-body__week-switcher-btn--next"
            onClick={onGoNextWeek}
            disabled={!canGoNextWeek}
          >
            Tuần sau
            <span className="student-dashboard-body__week-switcher-arrow">{'>'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}