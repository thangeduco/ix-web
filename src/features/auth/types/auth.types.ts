// src/features/auth/types/auth.types.ts
export type AuthMetric = {
  label: string
  value: string
  hint?: string
}

export type AuthTableRow = [string, string, string]

export type AuthTable = {
  columns: string[]
  rows: AuthTableRow[]
}

export type AuthHero = {
  badge: string
  title: string
  subtitle: string
  description: string
}

export type AuthForm = {
  identifierLabel: string
  identifierPlaceholder: string
  passwordLabel: string
  passwordPlaceholder: string
  rememberLabel: string
  forgotPasswordLabel: string
  forgotPasswordHref: string
  submitLabel: string
  registerPrompt: string
  registerActionLabel: string
  registerActionHref: string
  termsText: string
}

export type AuthSocialProvider = {
  key: string
  label: string
  iconType: 'image' | 'symbol'
  iconSrc?: string
  alt?: string
  iconName?: string
}

export type AuthMock = {
  hero: AuthHero
  form: AuthForm
  keys: string[]
  registerBenefits: string[]
  socialProviders: AuthSocialProvider[]
  metrics: AuthMetric[]
  table: AuthTable
}

export type RoleCode = 'student' | 'parent' | 'teacher' | 'admin'

export type RegisterRequest = {
  full_name: string
  display_name: string
  email?: string
  phone?: string
  password: string
  role_code: RoleCode
  slogen?: string
}

export type RegisterSubmitPayload = RegisterRequest & {
  avatar_file?: File
}

export type RegisterResponse<TData = unknown> = {
  success?: boolean
  message?: string
  data?: TData
}

export type PasswordResetRequest = {
  email?: string
  phone?: string
  email_or_phone?: string
}

export type PasswordResetResponse<TData = unknown> = {
  success?: boolean
  message?: string
  data?: TData
}

export type LoginRequest = {
  email_or_phone: string
  password: string
}

export type AuthUser = {
  id?: string | number
  full_name?: string
  display_name?: string
  name?: string
  email?: string
  phone?: string
  role?: string
  role_code?: string
  slogen?: string
  avatar_url?: string
  avatar_key?: string
  [key: string]: unknown
}

export type LoginData = {
  access_token?: string
  token?: string
  refresh_token?: string
  user?: AuthUser
  [key: string]: unknown
}

export type LoginResponse = {
  success?: boolean
  message?: string
  access_token?: string
  token?: string
  refresh_token?: string
  user?: AuthUser
  data?: LoginData
}