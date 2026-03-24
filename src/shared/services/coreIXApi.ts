import axios from 'axios'

const REGISTER_ENDPOINT_PATTERN = /\/iam\/auth\/register$/
const LOGIN_ENDPOINT_PATTERN = /\/iam\/auth\/login$/

function getStoredAccessToken(): string | null {
  return (
    localStorage.getItem('ix_access_token') ||
    sessionStorage.getItem('ix_access_token')
  )
}

function clearAuthStorage() {
  localStorage.removeItem('ix_access_token')
  localStorage.removeItem('ix_user')
  sessionStorage.removeItem('ix_access_token')
  sessionStorage.removeItem('ix_user')
}

const coreIXApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
})

coreIXApi.interceptors.request.use(
  (config) => {
    const token = getStoredAccessToken()

    const isFormData =
      typeof FormData !== 'undefined' && config.data instanceof FormData

    config.headers = {
      ...(config.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    } as any

    if (!isFormData) {
      config.headers = {
        ...(config.headers || {}),
        'Content-Type': 'application/json',
      } as any
    }

    if (token) {
      console.log(
        '[coreIXApi] Request WITH TOKEN:',
        config.method?.toUpperCase(),
        config.url
      )
    } else {
      console.log(
        '[coreIXApi] Request WITHOUT TOKEN:',
        config.method?.toUpperCase(),
        config.url
      )
    }

    return config
  },
  (error) => Promise.reject(error)
)

coreIXApi.interceptors.response.use(
  (response) => {
    console.log('[coreIXApi] Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('[coreIXApi] Response Error:', error)

    const requestUrl = error.config?.url || ''
    const isRegisterRequest = REGISTER_ENDPOINT_PATTERN.test(requestUrl)
    const isLoginRequest = LOGIN_ENDPOINT_PATTERN.test(requestUrl)

    if (
      error.response?.status === 401 &&
      !isRegisterRequest &&
      !isLoginRequest
    ) {
      clearAuthStorage()
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default coreIXApi