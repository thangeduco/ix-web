import './PublicCoursesSection.css'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { PublicCourseTab } from '../types/public.types'

type PublicCoursesSectionProps = {
  tabs: PublicCourseTab[]
}

const COURSES_PER_PAGE = 8

export function PublicCoursesSection({ tabs }: PublicCoursesSectionProps) {
  const defaultTabId = tabs[0]?.id ?? ''
  const [activeTabId, setActiveTabId] = useState(defaultTabId)
  const [currentPage, setCurrentPage] = useState(0)

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? tabs[0],
    [activeTabId, tabs],
  )

  const courses = activeTab?.courses ?? []
  const totalPages = Math.max(Math.ceil(courses.length / COURSES_PER_PAGE), 1)

  const paginatedCourses = useMemo(() => {
    const startIndex = currentPage * COURSES_PER_PAGE
    const endIndex = startIndex + COURSES_PER_PAGE
    return courses.slice(startIndex, endIndex)
  }, [courses, currentPage])

  useEffect(() => {
    setCurrentPage(0)
  }, [activeTabId])

  useEffect(() => {
    if (currentPage > totalPages - 1) {
      setCurrentPage(Math.max(totalPages - 1, 0))
    }
  }, [currentPage, totalPages])

  const handleSelectTab = (tabId: string) => {
    setActiveTabId(tabId)
  }

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
  }

  const canMovePrev = currentPage > 0
  const canMoveNext = currentPage < totalPages - 1

  return (
    <section className="public-courses" id="curriculum">
      <div className="public-courses__container">
        <div className="public-courses__heading">
          <div className="public-courses__heading-copy">
            <h2>Khám phá khoá học</h2>
            <p>
              Hệ thống bài giảng toàn diện được chia theo các cấp bậc học, đảm bảo
              lộ trình phát triển tư duy vững chắc cho mọi học sinh.
            </p>
          </div>

          <div className="public-courses__tabs" role="tablist" aria-label="Cấp học">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`public-courses__tab ${
                  tab.id === activeTabId ? 'is-active' : ''
                }`}
                onClick={() => handleSelectTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="public-courses__slider-shell">
          <button
            type="button"
            className="public-courses__nav public-courses__nav--prev"
            onClick={handlePrev}
            disabled={!canMovePrev}
            aria-label="Di chuyển sang trang khoá học trước"
          >
            <span className="public-courses__nav-symbol">‹</span>
          </button>

          <button
            type="button"
            className="public-courses__nav public-courses__nav--next"
            onClick={handleNext}
            disabled={!canMoveNext}
            aria-label="Di chuyển sang trang khoá học tiếp theo"
          >
            <span className="public-courses__nav-symbol">›</span>
          </button>

          {courses.length > 0 ? (
            <>
              <div className="public-courses__viewport">
                <div className="public-courses__grid">
                  {paginatedCourses.map((course) => (
                    <article key={course.id} className="public-courses__card">
                      <div className="public-courses__image-wrap">
                        <img
                          className="public-courses__image"
                          src={course.image}
                          alt={course.title}
                        />
                        <span className="public-courses__badge">{course.levelLabel}</span>
                      </div>

                      <h3 className="public-courses__card-title">{course.title}</h3>
                      <p className="public-courses__card-description">{course.description}</p>

                      <div className="public-courses__progress">
                        <div className="public-courses__progress-meta">
                          <span>Tiến độ</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="public-courses__progress-track">
                          <div
                            className="public-courses__progress-bar"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="public-courses__pagination">
                <span className="public-courses__pagination-text">
                  Trang {currentPage + 1}/{totalPages}
                </span>
                <span className="public-courses__pagination-text">
                  Hiển thị {paginatedCourses.length}/{courses.length} khoá học
                </span>
              </div>
            </>
          ) : (
            <div className="public-courses__empty">
              Nội dung cấp học này sẽ được cập nhật sớm.
            </div>
          )}
        </div>

        <div className="public-courses__footer-link-wrap">
          <Link className="public-courses__footer-link" to="/khoa-hoc">
            Xem tất cả khoá học
          </Link>
        </div>
      </div>
    </section>
  )
}