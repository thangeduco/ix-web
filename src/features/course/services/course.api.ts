// src/features/course/services/course.api.ts
import { http } from '@/shared/services/http'

export const courseApi = {
  primary: '/ccc/courses',
  endpoints: ["/ccc/courses", "/ccc/courses/:courseId", "/ccc/courses/:courseId/weeks"],
  getList: () => http.get('/ccc/courses'),
  getDetail: (id: string) => http.get(`/ccc/courses/${id}`)
}
