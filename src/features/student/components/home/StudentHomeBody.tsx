// src/features/student/components/home/StudentHomeBody.tsx
import './StudentHomeBody.css'
import { Link } from 'react-router-dom'
import type { StudentCoursesPendingResponse } from '../../types/student.types'

type StudentHomeBodyProps = {
  data: StudentCoursesPendingResponse
  isLoading?: boolean
}

const FALLBACK_CLASS_IMAGE =
  'http://localhost:3000/static/avatars/class_0/avatar.jpg'

function resolveCourseAvatar(avatarUrl?: string | null) {
  if (!avatarUrl || !avatarUrl.trim()) {
    return FALLBACK_CLASS_IMAGE
  }

  return avatarUrl
}

function resolveCurrentDashboardLink(classCode?: string | null) {
  if (!classCode) {
    return '#'
  }

  return `/student/classes/${classCode}/weeks/current`
}

function resolveWeekLink(classCode?: string | null, weekNo?: number | null) {
  if (!classCode || weekNo == null) {
    return '#'
  }

  return `/student/classes/${classCode}/weeks/${weekNo}`
}

export function StudentHomeBody({
  data,
  isLoading = false,
}: StudentHomeBodyProps) {
  const courses = data?.courses ?? []

  if (isLoading) {
    return (
      <section className="student-home-body">
        <div className="student-home-body__container">
          <div className="student-home-body__hero student-home-body__hero--loading">
            <div className="student-home-body__skeleton student-home-body__skeleton--title" />
            <div className="student-home-body__skeleton student-home-body__skeleton--subtitle" />
          </div>

          <div className="student-home-body__grid">
            {Array.from({ length: 2 }).map((_, index) => (
              <article key={index} className="student-home-body__course-card">
                <div className="student-home-body__skeleton student-home-body__skeleton--card-cover" />
                <div className="student-home-body__skeleton student-home-body__skeleton--card-title" />
                <div className="student-home-body__skeleton student-home-body__skeleton--card-subtitle" />
                <div className="student-home-body__skeleton student-home-body__skeleton--week" />
                <div className="student-home-body__skeleton student-home-body__skeleton--week" />
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="student-home-body">
      <div className="student-home-body__container">
        <section className="student-home-body__hero">
          <div className="student-home-body__hero-copy">
            <span className="student-home-body__eyebrow">Các lớp học của con</span>
            <p className="student-home-body__subtitle">
              Mỗi tuần hoàn thành là một bước tiến mới. Hãy tiếp tục cùng các bạn
              của con nhé.
            </p>
          </div>
        </section>

        {courses.length > 0 ? (
          <div className="student-home-body__grid">
            {courses.map((course, courseIndex) => {
              const pendingWeeks = course.pending_weeks ?? []
              const previewWeeks = pendingWeeks.slice(0, 6)
              const hasPendingWeeks = previewWeeks.length > 0
              const classCode = course.class_code ?? ''

              return (
                <article
                  key={`${course.class_name || 'course'}-${courseIndex}`}
                  className="student-home-body__course-card"
                >
                  <div className="student-home-body__course-top">
                    <div className="student-home-body__course-main">
                      <div className="student-home-body__course-thumb-wrap">
                        <img
                          className="student-home-body__course-thumb"
                          src={resolveCourseAvatar(course.avatar_url)}
                          alt={course.class_name || 'Lớp học'}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = FALLBACK_CLASS_IMAGE
                          }}
                        />
                      </div>

                      <div className="student-home-body__course-copy">
                        <div className="student-home-body__course-headline">
                          <div className="student-home-body__course-text">
                            <h2 className="student-home-body__course-title">
                              {course.class_name || 'Lớp học iX'}
                            </h2>
                            <p className="student-home-body__course-slogan">
                              {course.slogan || 'Tiếp tục học tập thật bền bỉ mỗi ngày'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="student-home-body__course-actions">
                      <Link
                        to={resolveCurrentDashboardLink(classCode)}
                        className="student-home-body__enter-class-btn"
                      >
                        Vào lớp
                        <span
                          className="material-symbols-outlined"
                          aria-hidden="true"
                        >
                          arrow_forward
                        </span>
                      </Link>

                      <button
                        type="button"
                        className="student-home-body__notify-btn"
                        title="Thông báo lớp học"
                      >
                        <span
                          className="material-symbols-outlined"
                          aria-hidden="true"
                        >
                          notifications
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="student-home-body__weeks-panel">
                    <h3 className="student-home-body__weeks-title">
                      <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                      >
                        pending_actions
                      </span>
                      Các tuần thầy chờ con hoàn thành
                    </h3>

                    {hasPendingWeeks ? (
                      <div className="student-home-body__weeks-list">
                        {previewWeeks.map((week, weekIndex) => {
                          const done = Number(week.total_student_done || 0)
                          const assigned = Number(week.total_student_assigned || 0)

                          return (
                            <div
                              key={`${week.class_week_id}-${weekIndex}`}
                              className="student-home-body__week-item"
                            >
                              <div className="student-home-body__week-main">
                                <div className="student-home-body__week-icon-wrap">
                                  <span
                                    className="material-symbols-outlined student-home-body__week-icon"
                                    aria-hidden="true"
                                  >
                                    event_upcoming
                                  </span>
                                </div>

                                <div className="student-home-body__week-copy">
                                  <div className="student-home-body__week-name">
                                    {week.title ||
                                      `Tuần ${week.week_no ?? ''}`.trim()}
                                  </div>
                                  <div className="student-home-body__week-progress-mobile">
                                    {done}/{assigned} bạn đã xong
                                  </div>
                                </div>
                              </div>

                              <div className="student-home-body__week-actions">
                                <Link
                                  to={resolveWeekLink(classCode, week.week_no)}
                                  className="student-home-body__week-link"
                                >
                                  Vào xem
                                  <span
                                    className="material-symbols-outlined"
                                    aria-hidden="true"
                                  >
                                    arrow_forward
                                  </span>
                                </Link>

                                <span className="student-home-body__week-progress">
                                  {done}/{assigned} bạn đã xong
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="student-home-body__all-done">
                        <span
                          className="material-symbols-outlined"
                          aria-hidden="true"
                        >
                          check_circle
                        </span>
                        <p>Không còn tuần nào chờ hoàn thành.</p>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="student-home-body__empty">
            <span className="material-symbols-outlined" aria-hidden="true">
              school
            </span>
            <h3>Hiện chưa có lớp học đang chờ hoàn thành</h3>
            <p>
              Khi hệ thống giao thêm tuần học hoặc con tham gia lớp mới, nội dung sẽ
              hiển thị tại đây.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}