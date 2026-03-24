
import { Outlet, NavLink } from 'react-router-dom'
import { AppHeader } from '@/shared/components/AppHeader'
import { AppFooter } from '@/shared/components/AppFooter'

export function MainLayout() {
  const links = [
    { to: '/', label: 'Trang chủ' },
    { to: '/courses', label: 'Khóa học' },
    { to: '/dashboard/student', label: 'Học sinh' },
    { to: '/dashboard/parent', label: 'Phụ huynh' },
    { to: '/teacher/dashboard', label: 'Giáo viên' },
    { to: '/ranking/class', label: 'Xếp hạng' }
  ]

  return (
    <div className="app-layout">
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
