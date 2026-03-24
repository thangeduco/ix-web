import { http } from '@/shared/services/http'

export const rankingApi = {
  primary: '/slp/rankings',
  endpoints: ["/slp/rankings", "/slp/rankings/compare", "/slp/rankings/calculate"],
  getList: () => http.get('/slp/rankings'),
  getDetail: (id: string) => http.get(`/slp/rankings/${id}`)
}
