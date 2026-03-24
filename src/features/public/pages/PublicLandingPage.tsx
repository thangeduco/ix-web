import './PublicLandingPage.css'
import { useEffect, useState } from 'react'
import { publicApi } from '../services/public.api'
import { PublicHeader } from '../components/PublicHeader'
import { PublicFooter } from '../components/PublicFooter'
import { PublicHeroSection } from '../components/PublicHeroSection'
import { PublicCoursesSection } from '../components/PublicCoursesSection'
import { PublicTestimonialsSection } from '../components/PublicTestimonialsSection'
import type { PublicPageData } from '../types/public.types'
import { publicMock } from '../mocks/public.mock'

export function PublicLandingPage() {
  const [data, setData] = useState<PublicPageData>(publicMock)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadPageData() {
      try {
        setIsLoading(true)

        const [hero, courseTabs, testimonials] = await Promise.all([
          publicApi.getHero(),
          publicApi.getPrograms(),
          publicApi.getTestimonials()
        ])

        if (!isMounted) return

        setData({
          hero,
          courseTabs,
          testimonials
        })
      } catch (error) {
        console.error('Không thể tải dữ liệu PublicLandingPage:', error)

        if (!isMounted) return
        setData(publicMock)
      } finally {
        if (!isMounted) return
        setIsLoading(false)
      }
    }

    void loadPageData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="public-landing-page">
      <PublicHeader/>

      <main className="public-landing-page__main">
        <PublicHeroSection data={data.hero} />
        <PublicCoursesSection tabs={data.courseTabs} />
        <PublicTestimonialsSection testimonials={data.testimonials} />
      </main>

      <PublicFooter />
    </div>
  )
}