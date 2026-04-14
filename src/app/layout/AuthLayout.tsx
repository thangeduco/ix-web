// src/app/layout/AuthLayout.tsx

import { Outlet, Link } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <Link className="auth-layout__brand" to="/">iX Education</Link>
      <div className="auth-layout__content">
        <Outlet />
      </div>
    </div>
  )
}
