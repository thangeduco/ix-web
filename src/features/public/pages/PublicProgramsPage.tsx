import './PublicProgramsPage.css'
import { useEffect, useMemo, useState } from 'react'
import { publicApi } from '../services/public.api'
import { publicMock } from '../mocks/public.mock'
import { PublicHeader } from '../components/PublicHeader'
import { PublicFooter } from '../components/PublicFooter'
import type { PublicCourseTab } from '../types/public.types'

type PublicCourse = PublicCourseTab['courses'][number]

const SUBJECT_OPTIONS = ['Toán', 'Văn', 'Tiếng Anh']

const CATEGORY_OPTIONS = [
  'Bám SGK',
  'Nâng cao',
  'Chuyên đề',
  'Luyện thi chuyên',
  'Luyện thi HSG',
  'Luyện đề thi',
]

function inferGradeFromCourse(course: PublicCourse): number | null {
  const titleMatch = course.title.match(/lớp\s+(\d+)/i)
  if (titleMatch) return Number(titleMatch[1])

  const levelMatch = course.levelLabel.match(/LỚP\s+(\d+)/i)
  if (levelMatch) return Number(levelMatch[1])

  return null
}

function inferDurationWeeks(course: PublicCourse): number {
  const grade = inferGradeFromCourse(course)

  const durationByGrade: Record<number, number> = {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 24,
    8: 26,
    9: 28,
    10: 30,
    11: 32,
    12: 34,
  }

  if (grade && durationByGrade[grade]) return durationByGrade[grade]
  return 20
}

function inferCategoryFromCourse(course: PublicCourse): string {
  const title = course.title.toLowerCase()

  if (title.includes('bám sát sgk')) return 'Bám SGK'
  if (title.includes('nâng cao')) return 'Nâng cao'
  if (title.includes('chuyên đề')) return 'Chuyên đề'
  if (title.includes('luyện đề')) return 'Luyện đề thi'

  return 'Bám SGK'
}

function inferGradeBadgeTone(course: PublicCourse): 'primary' | 'middle' | 'high' {
  const grade = inferGradeFromCourse(course)

  if (!grade) return 'primary'
  if (grade <= 5) return 'primary'
  if (grade <= 9) return 'middle'
  return 'high'
}

function buildDisplayedCategoryOptions(courses: PublicCourse[]) {
  const available = new Set(courses.map(inferCategoryFromCourse))
  return CATEGORY_OPTIONS.filter((item) => available.has(item))
}

export function PublicProgramsPage() {
  const [tabs, setTabs] = useState<PublicCourseTab[]>(publicMock.courseTabs)
  const [activeTabId, setActiveTabId] = useState<string>(publicMock.courseTabs[0]?.id ?? '')
  const [activeSubject, setActiveSubject] = useState<string>('Toán')
  const [activeCategory, setActiveCategory] = useState<string>('Bám SGK')

  useEffect(() => {
    let isMounted = true

    async function loadPrograms() {
      try {
        const programs = await publicApi.getPrograms()
        if (!isMounted) return

        setTabs(programs)

        if (!programs.some((tab) => tab.id === activeTabId)) {
          setActiveTabId(programs[0]?.id ?? '')
        }
      } catch (error) {
        console.error('Không thể tải dữ liệu PublicProgramsPage:', error)
        if (!isMounted) return

        setTabs(publicMock.courseTabs)

        if (!publicMock.courseTabs.some((tab) => tab.id === activeTabId)) {
          setActiveTabId(publicMock.courseTabs[0]?.id ?? '')
        }
      }
    }

    void loadPrograms()

    return () => {
      isMounted = false
    }
  }, [activeTabId])

  const activeTab = useMemo(() => {
    return tabs.find((tab) => tab.id === activeTabId) ?? tabs[0] ?? null
  }, [tabs, activeTabId])

  const displayedCategoryOptions = useMemo(() => {
    if (!activeTab) return []
    return buildDisplayedCategoryOptions(activeTab.courses)
  }, [activeTab])

  useEffect(() => {
    if (displayedCategoryOptions.length === 0) return
    if (!displayedCategoryOptions.includes(activeCategory)) {
      setActiveCategory(displayedCategoryOptions[0])
    }
  }, [displayedCategoryOptions, activeCategory])

  const filteredCourses = useMemo(() => {
    if (!activeTab) return []

    let result = [...activeTab.courses]

    if (activeSubject !== 'Toán') {
      result = []
    }

    if (activeCategory) {
      result = result.filter((course) => inferCategoryFromCourse(course) === activeCategory)
    }

    return result
  }, [activeTab, activeSubject, activeCategory])

  return (
    <div className="public-programs-page">
      <PublicHeader />

      <main className="public-programs-page__main">
        <section className="public-programs-page__hero">
          <div className="public-programs-page__container public-programs-page__container--hero">
            <h1 className="public-programs-page__hero-title">Danh sách khoá học</h1>
          </div>
        </section>

        <section className="public-programs-page__filters">
          <div className="public-programs-page__container public-programs-page__container--filters">
            <div className="public-programs-page__filters-group">
              <span className="public-programs-page__filters-label">Cấp học:</span>

              <div className="public-programs-page__chips public-programs-page__chips--level">
                {tabs.map((tab) => {
                  const isActive = tab.id === (activeTab?.id ?? '')

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      className={`public-programs-page__chip public-programs-page__chip--pill ${
                        isActive ? 'is-active' : ''
                      }`}
                      onClick={() => setActiveTabId(tab.id)}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="public-programs-page__filters-group">
              <span className="public-programs-page__filters-label">Môn học:</span>

              <div className="public-programs-page__chips public-programs-page__chips--subject">
                {SUBJECT_OPTIONS.map((subject) => {
                  const isActive = subject === activeSubject

                  return (
                    <button
                      key={subject}
                      type="button"
                      className={`public-programs-page__chip public-programs-page__chip--pill ${
                        isActive ? 'is-active' : ''
                      }`}
                      onClick={() => setActiveSubject(subject)}
                    >
                      {subject}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="public-programs-page__filters-group">
              <span className="public-programs-page__filters-label">Loại khoá học:</span>

              <div className="public-programs-page__chips public-programs-page__chips--category">
                {displayedCategoryOptions.map((category) => {
                  const isActive = category === activeCategory

                  return (
                    <button
                      key={category}
                      type="button"
                      className={`public-programs-page__chip public-programs-page__chip--tag ${
                        isActive ? 'is-active' : ''
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="public-programs-page__courses">
          <div className="public-programs-page__container public-programs-page__container--courses">
            {filteredCourses.length > 0 ? (
              <div className="public-programs-page__grid">
                {filteredCourses.map((course) => {
                  const grade = inferGradeFromCourse(course)
                  const durationWeeks = inferDurationWeeks(course)
                  const badgeTone = inferGradeBadgeTone(course)

                  return (
                    <article key={course.id} className="public-programs-page__card">
                      <div className="public-programs-page__card-top">
                        <span
                          className={`public-programs-page__badge public-programs-page__badge--${badgeTone}`}
                        >
                          {grade ? `Lớp ${grade}` : course.levelLabel}
                        </span>
                      </div>

                      <h3 className="public-programs-page__card-title">{course.title}</h3>

                      <p className="public-programs-page__card-description">{course.description}</p>

                      <div className="public-programs-page__card-footer">
                        <div className="public-programs-page__card-meta">
                          <span className="material-symbols-outlined public-programs-page__card-meta-icon">
                            schedule
                          </span>
                          <span>{durationWeeks} tuần</span>
                        </div>

                        <button type="button" className="public-programs-page__card-button">
                          Bắt đầu học
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className="public-programs-page__empty">
                <h3 className="public-programs-page__empty-title">Chưa có khoá học phù hợp</h3>
                <p className="public-programs-page__empty-description">
                  Hiện tại chưa có dữ liệu khoá học cho bộ lọc đã chọn.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <PublicFooter/>
    </div>
  )
}