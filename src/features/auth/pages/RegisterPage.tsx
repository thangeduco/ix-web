import './RegisterPage.css'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { PublicHeader } from '../../public/components/PublicHeader'
import { PublicFooter } from '../../public/components/PublicFooter'
import { authApi } from '../services/auth.api'
import type { RegisterSubmitPayload, RoleCode } from '../types/auth.types'

type RoleOption = {
  value: RoleCode
  label: string
}

const roleOptions: RoleOption[] = [
  { value: 'student', label: 'Học sinh' },
  { value: 'teacher', label: 'Giáo viên' },
  { value: 'parent', label: 'Phụ huynh học sinh' },
  { value: 'admin', label: 'Quản lý dịch vụ' },
]

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^(0|\+84)\d{9,10}$/

export function RegisterPage() {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [roleCode, setRoleCode] = useState<RoleCode>('student')
  const [slogan, setSlogan] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarFileName, setAvatarFileName] = useState('')
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    return () => {
      if (avatarPreviewUrl) {
        URL.revokeObjectURL(avatarPreviewUrl)
      }
    }
  }, [avatarPreviewUrl])

  const validateForm = () => {
    if (!identifier.trim()) {
      return 'Vui lòng nhập tên đăng nhập là email hoặc số điện thoại.'
    }

    const trimmedIdentifier = identifier.trim()
    const isEmail = emailRegex.test(trimmedIdentifier)
    const isPhone = phoneRegex.test(trimmedIdentifier)

    if (!isEmail && !isPhone) {
      return 'Tên đăng nhập phải là email hoặc số điện thoại hợp lệ.'
    }

    if (!password) {
      return 'Vui lòng nhập mật khẩu.'
    }

    if (password.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự.'
    }

    if (!confirmPassword) {
      return 'Vui lòng nhập xác nhận mật khẩu.'
    }

    if (password !== confirmPassword) {
      return 'Mật khẩu xác nhận không khớp.'
    }

    if (!fullName.trim()) {
      return 'Vui lòng nhập họ và tên.'
    }

    if (!displayName.trim()) {
      return 'Vui lòng nhập tên hiển thị.'
    }

    return ''
  }

  const resetForm = () => {
    if (avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl)
    }

    setFullName('')
    setDisplayName('')
    setIdentifier('')
    setRoleCode('student')
    setSlogan('')
    setAvatarFile(null)
    setAvatarFileName('')
    setAvatarPreviewUrl('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleRoleChange = (value: string) => {
    const matchedRole = roleOptions.find((option) => option.value === value)
    if (matchedRole) {
      setRoleCode(matchedRole.value)
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Vui lòng chọn tệp hình ảnh hợp lệ.')
      return
    }

    const maxSizeInMb = 5
    if (file.size > maxSizeInMb * 1024 * 1024) {
      setErrorMessage('Ảnh đại diện không được vượt quá 5MB.')
      return
    }

    if (avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl)
    }

    const nextPreviewUrl = URL.createObjectURL(file)

    setAvatarFile(file)
    setAvatarFileName(file.name)
    setAvatarPreviewUrl(nextPreviewUrl)
    setErrorMessage('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const validationError = validateForm()
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    const trimmedIdentifier = identifier.trim()
    const isEmail = emailRegex.test(trimmedIdentifier)

    const payload: RegisterSubmitPayload = {
      full_name: fullName.trim(),
      display_name: displayName.trim(),
      ...(isEmail ? { email: trimmedIdentifier } : { phone: trimmedIdentifier }),
      password,
      role_code: roleCode,
      ...(slogan.trim() ? { slogen: slogan.trim() } : {}),
      ...(avatarFile ? { avatar_file: avatarFile } : {}),
    }

    try {
      setIsSubmitting(true)

      const response = await authApi.register(payload)

      setSuccessMessage(
        response?.message || 'Đăng ký thành công. Vui lòng đăng nhập.'
      )

      resetForm()

      setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          'Đăng ký thất bại. Vui lòng thử lại.'

        setErrorMessage(backendMessage)
      } else {
        setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="register-page">
      <PublicHeader />

      <main className="register-page__main">
        <div className="register-page__container">
          <div className="register-page__card">
            <div className="register-page__heading">
              <div className="register-page__brand">
                <div className="register-page__brand-icon">iX</div>
                <h1 className="register-page__title">Tạo tài khoản</h1>
              </div>
            </div>

            <form className="register-page__form" onSubmit={handleSubmit}>
              <div className="register-page__grid">
                <div className="register-page__column">
                  <div className="register-page__field">
                    <label className="register-page__label" htmlFor="identifier">
                      Tên đăng nhập
                    </label>
                    <div className="register-page__input-wrapper">
                      <span className="material-symbols-outlined register-page__input-icon">
                        alternate_email
                      </span>
                      <input
                        id="identifier"
                        className="register-page__input"
                        type="text"
                        placeholder="Email hoặc số điện thoại"
                        value={identifier}
                        onChange={(event) => setIdentifier(event.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <p className="register-page__helper">
                      Tên đăng nhập là email hoặc số điện thoại.
                    </p>
                  </div>

                  <div className="register-page__field">
                    <label className="register-page__label" htmlFor="password">
                      Mật khẩu
                    </label>
                    <div className="register-page__input-wrapper">
                      <span className="material-symbols-outlined register-page__input-icon">
                        lock
                      </span>
                      <input
                        id="password"
                        className="register-page__input register-page__input--password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        className="register-page__toggle-password"
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

                  <div className="register-page__field">
                    <label
                      className="register-page__label"
                      htmlFor="confirmPassword"
                    >
                      Xác nhận mật khẩu
                    </label>
                    <div className="register-page__input-wrapper">
                      <span className="material-symbols-outlined register-page__input-icon">
                        lock_reset
                      </span>
                      <input
                        id="confirmPassword"
                        className="register-page__input register-page__input--password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        className="register-page__toggle-password"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label={
                          showConfirmPassword
                            ? 'Ẩn xác nhận mật khẩu'
                            : 'Hiện xác nhận mật khẩu'
                        }
                        disabled={isSubmitting}
                      >
                        <span className="material-symbols-outlined">
                          {showConfirmPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="register-page__column">
                  <div className="register-page__field">
                    <label className="register-page__label" htmlFor="fullName">
                      Họ và tên
                    </label>
                    <div className="register-page__input-wrapper">
                      <span className="material-symbols-outlined register-page__input-icon">
                        person
                      </span>
                      <input
                        id="fullName"
                        className="register-page__input"
                        type="text"
                        placeholder="Đào Đức Thăng"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="register-page__field">
                    <label className="register-page__label" htmlFor="displayName">
                      Tên hiển thị
                    </label>
                    <div className="register-page__input-wrapper">
                      <span className="material-symbols-outlined register-page__input-icon">
                        badge
                      </span>
                      <input
                        id="displayName"
                        className="register-page__input"
                        type="text"
                        placeholder="Thăng"
                        value={displayName}
                        onChange={(event) => setDisplayName(event.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="register-page__field">
                    <label className="register-page__label" htmlFor="roleCode">
                      Nhóm người dùng
                    </label>
                    <div className="register-page__input-wrapper">
                      <span className="material-symbols-outlined register-page__input-icon">
                        groups
                      </span>
                      <select
                        id="roleCode"
                        className="register-page__input register-page__select"
                        value={roleCode}
                        onChange={(event) => handleRoleChange(event.target.value)}
                        disabled={isSubmitting}
                      >
                        {roleOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined register-page__select-arrow">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                <div className="register-page__column">
                  <div className="register-page__field">
                    <label className="register-page__label" htmlFor="slogan">
                      Slogan học tập
                    </label>
                    <div className="register-page__input-wrapper">
                      <span className="material-symbols-outlined register-page__input-icon">
                        format_quote
                      </span>
                      <input
                        id="slogan"
                        className="register-page__input"
                        type="text"
                        placeholder="Học suốt đời"
                        value={slogan}
                        onChange={(event) => setSlogan(event.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="register-page__field">
                    <label className="register-page__label" htmlFor="avatarFile">
                      Ảnh đại diện
                    </label>

                    <label
                      className={`register-page__upload ${
                        isSubmitting ? 'register-page__upload--disabled' : ''
                      }`}
                      htmlFor="avatarFile"
                    >
                      <span className="material-symbols-outlined register-page__upload-icon">
                        upload
                      </span>
                      <div className="register-page__upload-content">
                        <span className="register-page__upload-title">
                          Tải ảnh từ máy tính
                        </span>
                        <span className="register-page__upload-subtitle">
                          PNG, JPG, JPEG, WEBP tối đa 5MB
                        </span>
                      </div>
                    </label>

                    <input
                      id="avatarFile"
                      className="register-page__file-input"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleAvatarChange}
                      disabled={isSubmitting}
                    />

                    {avatarFileName ? (
                      <p className="register-page__file-name">{avatarFileName}</p>
                    ) : null}

                    {avatarPreviewUrl ? (
                      <div className="register-page__avatar-preview">
                        <img
                          src={avatarPreviewUrl}
                          alt="Ảnh đại diện"
                          className="register-page__avatar-image"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {errorMessage ? (
                <div className="register-page__alert register-page__alert--error">
                  {errorMessage}
                </div>
              ) : null}

              {successMessage ? (
                <div className="register-page__alert register-page__alert--success">
                  {successMessage}
                </div>
              ) : null}

              <button
                className="register-page__submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký ngay'}
              </button>
            </form>

            <div className="register-page__login">
              <p className="register-page__login-text">
                Đã có tài khoản?{' '}
                <Link className="register-page__login-link" to="/login">
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>

          <div className="register-page__terms">
            Bằng việc đăng ký, bạn đồng ý với{' '}
            <Link className="register-page__terms-link" to="/terms">
              Điều khoản dịch vụ
            </Link>{' '}
            và{' '}
            <Link className="register-page__terms-link" to="/privacy-policy">
              Chính sách bảo mật
            </Link>{' '}
            của iX.
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}