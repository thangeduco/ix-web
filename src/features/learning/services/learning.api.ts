import { http } from '@/shared/services/http'

export const learningApi = {
  primary: '/lsm/quizzes/:quizId/attempts',
  endpoints: ["/ccc/lessons/:lessonId", "/lsm/quizzes/:quizId/attempts", "/lsm/quiz-attempts/:attemptId"],
  getList: () => http.get('/ccc/lessons/:lessonId'),
  getDetail: (id: string) => http.get(`/ccc/lessons/:lessonId/${id}`)
}
