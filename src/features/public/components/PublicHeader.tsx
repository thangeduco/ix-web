// src/features/public/components/PublicHeader.tsx
import './PublicHeader.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { publicApi } from '../services/public.api'
import type { PublicCurrentUser } from '../types/public.types'

type HeaderAction = {
  label: string
  href: string
  variant?: 'text' | 'primary'
}

type NavItem = {
  label: string
  href: string
}

type PublicHeaderProps = {
  navItems?: NavItem[]
  registerAction?: HeaderAction
  loginAction?: HeaderAction
}

const DEFAULT_REGISTER_ACTION: HeaderAction = {
  label: 'Đăng ký',
  href: '/register',
  variant: 'text',
}

const DEFAULT_LOGIN_ACTION: HeaderAction = {
  label: 'Đăng nhập',
  href: '/login',
  variant: 'primary',
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Giới thiệu', href: '#' },
  { label: 'Khoá học', href: '/khoa-hoc' },
  { label: 'Đội ngũ giáo viên', href: '/teacher-team' },
  { label: 'Danh sách cơ sở', href: '#' },
  { label: 'Liên hệ', href: '#' },
]

const DEFAULT_AVATAR =
  'https://ui-avatars.com/api/?name=IX&background=E2E8F0&color=0F172A&bold=true'

function isInternalLink(href: string): boolean {
  return href.startsWith('/')
}

function renderNavLink(item: NavItem) {
  if (isInternalLink(item.href)) {
    return (
      <NavLink
        key={item.label}
        to={item.href}
        className={({ isActive }) =>
          isActive
            ? 'public-header__nav-link public-header__nav-link--active'
            : 'public-header__nav-link'
        }
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <a key={item.label} className="public-header__nav-link" href={item.href}>
      {item.label}
    </a>
  )
}

function getStoredAccessToken(): string | null {
  return (
    localStorage.getItem('ix_access_token') ||
    sessionStorage.getItem('ix_access_token')
  )
}

function getStoredUser(): PublicCurrentUser | null {
  const raw =
    localStorage.getItem('ix_user') || sessionStorage.getItem('ix_user') || null

  if (!raw) return null

  try {
    const parsed = JSON.parse(raw)

    return {
      id: parsed?.id ?? '',
      email: parsed?.email ?? null,
      phone: parsed?.phone ?? null,
      full_name: parsed?.full_name ?? '',
      display_name: parsed?.display_name ?? null,
      avatar_url: parsed?.avatar_url ?? null,
      slogen: parsed?.slogen ?? null,
      role_code: parsed?.role_code ?? null,
      roles: Array.isArray(parsed?.roles) ? parsed.roles : [],
    }
  } catch (error) {
    console.error('[PublicHeader] Parse ix_user failed:', error)
    return null
  }
}

function persistUser(user: PublicCurrentUser) {
  const localToken = localStorage.getItem('ix_access_token')
  const sessionToken = sessionStorage.getItem('ix_access_token')

  if (localToken) {
    localStorage.setItem('ix_user', JSON.stringify(user))
  }

  if (sessionToken) {
    sessionStorage.setItem('ix_user', JSON.stringify(user))
  }

  if (!localToken && !sessionToken) {
    sessionStorage.setItem('ix_user', JSON.stringify(user))
  }
}

function clearAuthStorage() {
  localStorage.removeItem('ix_access_token')
  localStorage.removeItem('ix_user')
  sessionStorage.removeItem('ix_access_token')
  sessionStorage.removeItem('ix_user')
}

function getUserDisplayName(user: PublicCurrentUser | null): string {
  if (!user) return ''
  return user.display_name || user.full_name || 'Người dùng iX'
}

function getUserSlogan(user: PublicCurrentUser | null): string {
  if (!user?.slogen || !user.slogen.trim()) {
    return 'Học tập chăm chỉ'
  }

  return user.slogen.trim()
}

export function PublicHeader(props: PublicHeaderProps) {
  const navigate = useNavigate()

  const navItems = props.navItems ?? DEFAULT_NAV_ITEMS
  const registerAction = props.registerAction ?? DEFAULT_REGISTER_ACTION
  const loginAction = props.loginAction ?? DEFAULT_LOGIN_ACTION

  const [currentUser, setCurrentUser] = useState<PublicCurrentUser | null>(
    () => getStoredUser()
  )
  const [isLoadingCurrentUser, setIsLoadingCurrentUser] = useState(false)
  const [isAvatarPreviewOpen, setIsAvatarPreviewOpen] = useState(false)

  const hasToken = !!getStoredAccessToken()
  const isLoggedIn = !!currentUser || hasToken

  const displayName = useMemo(
    () => getUserDisplayName(currentUser),
    [currentUser]
  )

  const slogan = useMemo(() => getUserSlogan(currentUser), [currentUser])

  const avatarUrl = currentUser?.avatar_url || DEFAULT_AVATAR

  useEffect(() => {
    let isMounted = true

    async function loadCurrentUser() {
      const token = getStoredAccessToken()
      const storedUser = getStoredUser()

      if (!token) {
        if (isMounted) {
          setCurrentUser(null)
        }
        return
      }

      if (storedUser) {
        if (isMounted) {
          setCurrentUser(storedUser)
        }
        return
      }

      try {
        setIsLoadingCurrentUser(true)
        const me = await publicApi.getCurrentUserProfile()

        if (!isMounted) return

        setCurrentUser(me)
        persistUser(me)
      } catch (error) {
        console.error('[PublicHeader] getCurrentUserProfile failed:', error)

        if (!isMounted) return
        setCurrentUser(null)
      } finally {
        if (isMounted) {
          setIsLoadingCurrentUser(false)
        }
      }
    }

    loadCurrentUser()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsAvatarPreviewOpen(false)
      }
    }

    if (isAvatarPreviewOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isAvatarPreviewOpen])

  async function handleLogout() {
    try {
      await publicApi.logout()
    } catch (error) {
      console.error('[PublicHeader] logout failed:', error)
    } finally {
      clearAuthStorage()
      setCurrentUser(null)
      navigate('/login')
    }
  }

  function openAvatarPreview() {
    setIsAvatarPreviewOpen(true)
  }

  function closeAvatarPreview() {
    setIsAvatarPreviewOpen(false)
  }

  return (
    <>
      <header className="public-header">
        <div className="public-header__container">
          <Link className="public-header__brand" to="/">
            <div className="public-header__brand-badge">iX</div>
          </Link>

          <nav className="public-header__nav" aria-label="Điều hướng chính">
            {navItems.map(renderNavLink)}
          </nav>

          <div className="public-header__actions">
            {!isLoggedIn && !isLoadingCurrentUser ? (
              <>
                <Link
                  className="public-header__register"
                  to={registerAction.href}
                >
                  {registerAction.label}
                </Link>

                <Link className="public-header__login" to={loginAction.href}>
                  {loginAction.label}
                </Link>
              </>
            ) : (
              <div className="public-header__profile">
                <div className="public-header__divider" />

                <div className="public-header__profile-inner">
                  <div className="public-header__profile-main">
                    <button
                      type="button"
                      className="public-header__avatar-button"
                      onClick={openAvatarPreview}
                      aria-label="Xem ảnh đại diện"
                    >
                      <div className="public-header__avatar-wrap">
                        <img
                          className="public-header__avatar"
                          src={avatarUrl}
                          alt={displayName}
                        />
                      </div>
                    </button>

                    <div className="public-header__user-meta">
                      <span className="public-header__user-name">
                        {displayName}
                      </span>
                      <span
                        className="public-header__user-slogan"
                        title={slogan}
                      >
                        {slogan}
                      </span>
                    </div>
                  </div>

                  <div className="public-header__profile-actions">
                    <button
                      type="button"
                      className="public-header__notification-btn"
                      aria-label="Thông báo"
                    >
                      <span
                        className="material-symbols-outlined public-header__notification-icon"
                        aria-hidden="true"
                      >
                        notifications
                      </span>
                      <span
                        className="public-header__notification-dot"
                        aria-hidden="true"
                      />
                    </button>

                    <div className="public-header__action-divider" />

                    <button
                      type="button"
                      className="public-header__logout-btn"
                      onClick={handleLogout}
                    >
                      <span
                        className="material-symbols-outlined public-header__logout-icon"
                        aria-hidden="true"
                      >
                        logout
                      </span>
                      <span className="public-header__logout-text">
                        Đăng xuất
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {isAvatarPreviewOpen && (
        <div
          className="public-header__preview-overlay"
          onClick={closeAvatarPreview}
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh đại diện"
        >
          <div
            className="public-header__preview-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="public-header__preview-close"
              onClick={closeAvatarPreview}
              aria-label="Đóng xem ảnh đại diện"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                close
              </span>
            </button>

            <div className="public-header__preview-image-wrap">
              <img
                className="public-header__preview-image"
                src={avatarUrl}
                alt={displayName}
              />
            </div>

            <div className="public-header__preview-meta">
              <div className="public-header__preview-name">{displayName}</div>
              <div className="public-header__preview-slogan">{slogan}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}