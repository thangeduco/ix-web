// src/features/public/services/public.api.ts
import { publicMock } from '../mocks/public.mock'
import coreIXApi from '../../../shared/services/coreIXApi'
import type {
  PublicCourseTab,
  PublicCurrentUser,
  PublicHeroData,
  PublicTestimonial,
} from '../types/public.types'

const wait = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms))

type ApiSuccessResponse<T> = {
  success: boolean
  message?: string
  data: T
}

export const publicApi = {
  endpoints: [
    '/public/hero',
    '/public/programs',
    '/public/testimonials',
    '/iam/me',
    '/iam/auth/logout',
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

  getCurrentUserProfile: async (): Promise<PublicCurrentUser> => {
    const response = await coreIXApi.get<ApiSuccessResponse<PublicCurrentUser>>(
      '/iam/me'
    )
    return response.data.data
  },

  logout: async (): Promise<void> => {
    await coreIXApi.post('/iam/auth/logout')
  },
}