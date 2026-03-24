import './PublicHeader.css'
import { Link, NavLink } from 'react-router-dom'

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

export function PublicHeader(props: PublicHeaderProps) {
  const navItems = props.navItems ?? DEFAULT_NAV_ITEMS
  const registerAction = props.registerAction ?? DEFAULT_REGISTER_ACTION
  const loginAction = props.loginAction ?? DEFAULT_LOGIN_ACTION

  return (
    <header className="public-header">
      <div className="public-header__container">
        {/* BRAND */}
        <Link className="public-header__brand" to="/">
          <div className="public-header__brand-badge">iX</div>
        </Link>

        {/* NAV */}
        <nav className="public-header__nav" aria-label="Điều hướng chính">
          {navItems.map(renderNavLink)}
        </nav>

        {/* ACTIONS */}
        <div className="public-header__actions">
          {/* REGISTER */}
          <Link className="public-header__register" to={registerAction.href}>
            {registerAction.label}
          </Link>

          {/* LOGIN */}
          <Link className="public-header__login" to={loginAction.href}>
            {loginAction.label}
          </Link>
        </div>
      </div>
    </header>
  )
}