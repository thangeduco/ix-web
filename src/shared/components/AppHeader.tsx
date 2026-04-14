// src/shared/components/AppHeader.tsx
import { NavLink } from 'react-router-dom'
import './AppHeader.css'

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <NavLink className="app-header__brand" to="/">
          iX
        </NavLink>

        <nav className="app-header__nav">
          <NavLink to="/courses">Khóa học</NavLink>
          <NavLink to="/learning/lesson/demo">Bài học</NavLink>
          <NavLink to="/ranking/class">Xếp hạng</NavLink>
          <NavLink to="/teacher/dashboard">Teacher</NavLink>
        </nav>

        <div className="app-header__actions">
          <NavLink className="btn btn--ghost" to="/auth/forgot-password">
            Quên mật khẩu
          </NavLink>
          <NavLink className="btn btn--primary" to="/auth/register">
            Đăng ký
          </NavLink>
        </div>
      </div>
    </header>
  )
}