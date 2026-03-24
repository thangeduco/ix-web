import { http } from '@/shared/services/http'

export const submissionApi = {
  primary: '/lsm/homeworks/:homeworkId/submissions',
  endpoints: ["/lsm/homeworks/:homeworkId/submissions", "/lsm/homework-submissions/:submissionId"],
  getList: () => http.get('/lsm/homeworks/:homeworkId/submissions'),
  getDetail: (id: string) => http.get(`/lsm/homeworks/:homeworkId/submissions/${id}`)
}
