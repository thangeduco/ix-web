import coreIXApi from '@/shared/services/coreIXApi'
import type {
  LoginRequest,
  LoginResponse,
  PasswordResetRequest,
  PasswordResetResponse,
  RegisterResponse,
  RegisterSubmitPayload,
} from '../types/auth.types'

function buildRegisterFormData(payload: RegisterSubmitPayload): FormData {
  const formData = new FormData()

  formData.append('full_name', payload.full_name)
  formData.append('display_name', payload.display_name)
  formData.append('password', payload.password)
  formData.append('role_code', payload.role_code)

  if (payload.email) {
    formData.append('email', payload.email)
  }

  if (payload.phone) {
    formData.append('phone', payload.phone)
  }

  if (payload.slogen) {
    formData.append('slogen', payload.slogen)
  }

  if (payload.avatar_file) {
    formData.append('avatar_file', payload.avatar_file)
  }

  return formData
}

export const authApi = {
  endpoints: {
    login: '/iam/auth/login',
    register: '/iam/auth/register',
    passwordResetRequest: '/iam/auth/password-reset/request',
  },

  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const response = await coreIXApi.post('/iam/auth/login', payload)
    return response.data
  },

  register: async (
    payload: RegisterSubmitPayload
  ): Promise<RegisterResponse> => {
    const formData = buildRegisterFormData(payload)

    const response = await coreIXApi.post('/iam/auth/register', formData)
    return response.data
  },

  requestPasswordReset: async (
    payload: PasswordResetRequest
  ): Promise<PasswordResetResponse> => {
    const response = await coreIXApi.post(
      '/iam/auth/password-reset/request',
      payload
    )
    return response.data
  },
}