import './LoginPage.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PublicHeader } from '../../public/components/PublicHeader'
import { PublicFooter } from '../../public/components/PublicFooter'
import { authApi } from '../services/auth.api'
import type { LoginResponse } from '../types/auth.types'

type SocialProvider = {
  key: string
  label: string
  iconType: 'image' | 'symbol'
  iconSrc?: string
  alt?: string
  iconName?: string
}

const socialProviders: SocialProvider[] = [
  {
    key: 'google',
    label: 'Google',
    iconType: 'image',
    iconSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLCfBHwntE6sw-gjonMV87bZ4nI3AT9QLhTrFJHPSoG9JQbV4-zIEXA7Ak7XJuxUgWAGKPI6A2aMb53VCUSNU7MVzZ3JIKCqjJrOCiKEjSkrcVlT9nza-HUQxqDrFvijuo_RMqSI9I3KKsSpNZNPl0M882hfQvyUZ-N_GkJDbIgaIyh4hRkZWCxaWgtp5pTBuKAr9vEArLyYtwemGVkWsxQv_MyniU5a7Rjc117bqHXbFz3mUDsVtcm3x-WhmuJteb9yc1NYTfqT4',
    alt: 'Google',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    iconType: 'symbol',
    iconName: 'thumb_up',
  },
]

function getErrorMessage(error: any): string {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'Đăng nhập thất bại. Vui lòng thử lại.'
  )
}

function extractToken(response: LoginResponse): string | null {
  return (
    response?.data?.access_token ||
    response?.data?.token ||
    response?.access_token ||
    response?.token ||
    null
  )
}

function extractUser(response: LoginResponse) {
  return response?.data?.user || response?.user || null
}

export function LoginPage() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedIdentifier = identifier.trim()
    const normalizedPassword = password.trim()

    if (!normalizedIdentifier) {
      setErrorMessage('Vui lòng nhập email hoặc số điện thoại.')
      return
    }

    if (!normalizedPassword) {
      setErrorMessage('Vui lòng nhập mật khẩu.')
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage('')

      const response = await authApi.login({
        email_or_phone: normalizedIdentifier,
        password: normalizedPassword,
      })

      const token = extractToken(response)
      const user = extractUser(response)

      if (!token) {
        throw new Error('Không nhận được access token từ hệ thống.')
      }

      if (rememberMe) {
        localStorage.setItem('ix_access_token', token)

        if (user) {
          localStorage.setItem('ix_user', JSON.stringify(user))
        }

        sessionStorage.removeItem('ix_access_token')
        sessionStorage.removeItem('ix_user')
      } else {
        sessionStorage.setItem('ix_access_token', token)

        if (user) {
          sessionStorage.setItem('ix_user', JSON.stringify(user))
        }

        localStorage.removeItem('ix_access_token')
        localStorage.removeItem('ix_user')
      }

      navigate('/')
    } catch (error: any) {
      console.error('Login failed:', error)
      setErrorMessage(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <PublicHeader />

      <main className="login-page__main">
        <div className="login-page__shell">
          <section className="login-page__auth-card">
            <div className="login-page__brand-block">
              <div className="login-page__brand-icon">iX</div>
              <h1 className="login-page__title">Chào mừng quay lại</h1>
            </div>

            <form className="login-page__form" onSubmit={handleSubmit}>
              <div className="login-page__field">
                <label className="login-page__label" htmlFor="identifier">
                  Email / SĐT
                </label>

                <div className="login-page__input-wrapper">
                  <span className="material-symbols-outlined login-page__input-icon">
                    person
                  </span>

                  <input
                    id="identifier"
                    className="login-page__input"
                    type="text"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    placeholder="name@example.com hoặc số điện thoại"
                    autoComplete="username"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="login-page__field">
                <div className="login-page__field-top">
                  <label className="login-page__label" htmlFor="password">
                    Mật khẩu
                  </label>

                  <Link
                    className="login-page__forgot-link"
                    to="/quen-mat-khau"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                <div className="login-page__input-wrapper">
                  <span className="material-symbols-outlined login-page__input-icon">
                    lock
                  </span>

                  <input
                    id="password"
                    className="login-page__input login-page__input--password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={isSubmitting}
                  />

                  <button
                    type="button"
                    className="login-page__toggle-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    disabled={isSubmitting}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <label className="login-page__remember">
                <input
                  className="login-page__checkbox"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  disabled={isSubmitting}
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>

              {errorMessage ? (
                <div className="login-page__error" role="alert">
                  {errorMessage}
                </div>
              ) : null}

              <button
                className="login-page__submit"
                type="submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}</span>
                <span className="material-symbols-outlined login-page__submit-icon">
                  arrow_forward
                </span>
              </button>
            </form>

            <div className="login-page__register">
              <span>Chưa có tài khoản? </span>
              <Link className="login-page__register-link" to="/dang-ky">
                Đăng ký ngay
              </Link>
            </div>

            <div className="login-page__divider">
              <span>Hoặc đăng nhập với</span>
            </div>

            <div className="login-page__socials">
              {socialProviders.map((provider) => (
                <button
                  key={provider.key}
                  type="button"
                  className="login-page__social-button"
                  disabled={isSubmitting}
                >
                  {provider.iconType === 'image' ? (
                    <img
                      src={provider.iconSrc}
                      alt={provider.alt ?? provider.label}
                      className="login-page__social-image"
                    />
                  ) : (
                    <span className="material-symbols-outlined login-page__social-symbol">
                      {provider.iconName}
                    </span>
                  )}

                  <span>{provider.label}</span>
                </button>
              ))}
            </div>

            <p className="login-page__terms">
              Bằng cách đăng nhập, bạn đồng ý với Điều khoản và Chính sách bảo
              mật của iX Education.
            </p>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}