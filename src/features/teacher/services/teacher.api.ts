import { http } from '@/shared/services/http'

export const teacherApi = {
  primary: '/tew/teacher/weekly-reviews',
  endpoints: ["/tew/teacher/weekly-reviews", "/tew/teacher/assigned-tasks", "/tew/teacher/offline-activity-records"],
  getList: () => http.get('/tew/teacher/weekly-reviews'),
  getDetail: (id: string) => http.get(`/tew/teacher/weekly-reviews/${id}`)
}
