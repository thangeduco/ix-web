import { publicMock } from '../mocks/public.mock'
import type {
  PublicCourseTab,
  PublicFooterData,
  PublicHeroData,
  PublicTestimonial,
} from '../types/public.types'

const wait = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms))

export const publicApi = {
  endpoints: [
    '/public/hero',
    '/public/programs',
    '/public/testimonials',
    '/public/footer',
  ],

  getHero: async (): Promise<PublicHeroData> => {
    await wait()
    return publicMock.hero
  },

  getPrograms: async (): Promise<PublicCourseTab[]> => {
    await wait()
    return publicMock.courseTabs
  },

  getTestimonials: async (): Promise<PublicTestimonial[]> => {
    await wait()
    return publicMock.testimonials
  },
}