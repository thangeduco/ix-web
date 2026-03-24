import './CoursePage.css'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/PublicHeader'
import { PublicFooter } from '../components/PublicFooter'
import { publicMock } from '../mocks/public.mock'
import type { PublicCourseTab } from '../types/public.types'

export function CoursePage() {
  const [activeTabId, setActiveTabId] = useState<string>(publicMock.courseTabs[0]?.id ?? '')

  const activeTab: PublicCourseTab | undefined = useMemo(() => {
    return publicMock.courseTabs.find((tab) => tab.id === activeTabId) ?? publicMock.courseTabs[0]
  }, [activeTabId])

  const totalCourses = useMemo(() => {
    return publicMock.courseTabs.reduce((sum, tab) => sum + tab.courses.length, 0)
  }, [])

  const totalLevels = publicMock.courseTabs.length

  return (
    <div className="course-page">
      <PublicHeader />

      <main className="course-page__main">
        <section className="course-page__hero">
          <div className="course-page__hero-content">
            <div className="course-page__breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <span>Khoá học</span>
            </div>

            <span className="course-page__eyebrow">Danh mục khóa học</span>

            <h1 className="course-page__title">
              Khám phá lộ trình học Toán phù hợp cho từng cấp học
            </h1>

            <p className="course-page__description">
              Từ Tiểu học đến THPT, mỗi khóa học được thiết kế theo mục tiêu rõ ràng: bám sát
              chương trình, củng cố nền tảng, luyện tập có hệ thống và phát triển tư duy toán
              học bền vững.
            </p>

            <div className="course-page__stats">
              <div className="course-page__stat-card">
                <strong>{totalCourses}+</strong>
                <span>Khóa học</span>
              </div>

              <div className="course-page__stat-card">
                <strong>{totalLevels}</strong>
                <span>Cấp học</span>
              </div>

              <div className="course-page__stat-card">
                <strong>100%</strong>
                <span>Tập trung môn Toán</span>
              </div>
            </div>
          </div>
        </section>

        <section className="course-page__catalog">
          <div className="course-page__catalog-header">
            <div>
              <span className="course-page__section-label">Chọn nhóm khóa học</span>
              <h2>Danh sách khóa học</h2>
            </div>

            <div className="course-page__tabs" role="tablist" aria-label="Nhóm khóa học">
              {publicMock.courseTabs.map((tab) => {
                const isActive = tab.id === activeTab?.id

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`course-page__tab ${isActive ? 'course-page__tab--active' : ''}`}
                    onClick={() => setActiveTabId(tab.id)}
                  >
                    <span className="course-page__tab-label">{tab.label}</span>
                    <span className="course-page__tab-count">{tab.courses.length}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="course-page__tab-panel" role="tabpanel">
            <div className="course-page__tab-summary">
              <div>
                <h3>{activeTab?.label}</h3>
                <p>
                  {activeTab?.courses.length ?? 0} khóa học đang sẵn sàng để học sinh bắt đầu
                  theo đúng năng lực và mục tiêu.
                </p>
              </div>
            </div>

            <div className="course-page__grid">
              {activeTab?.courses.map((course) => (
                <article key={course.id} className="course-page__card">
                  <div className="course-page__card-image-wrapper">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="course-page__card-image"
                      loading="lazy"
                    />
                  </div>

                  <div className="course-page__card-body">
                    <span className="course-page__card-level">{course.levelLabel}</span>

                    <h3 className="course-page__card-title">{course.title}</h3>

                    <p className="course-page__card-description">{course.description}</p>

                    <div className="course-page__card-footer">
                      <Link to={`/courses/${course.id}`} className="course-page__card-link">
                        Xem chi tiết
                      </Link>

                      <Link to="/register" className="course-page__card-button">
                        Đăng ký học
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}