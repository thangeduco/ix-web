import { http } from '@/shared/services/http'

export const dashboardApi = {
  primary: '/pse/weekly-summary',
  endpoints: ["/pse/weekly-summary", "/pse/weekly-tasks"],
  getList: () => http.get('/pse/weekly-summary'),
  getDetail: (id: string) => http.get(`/pse/weekly-summary/${id}`)
}
