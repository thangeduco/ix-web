// src/shared/components/AppFooter.tsx

import './AppFooter.css'

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div>
          <strong>iX Education</strong>
          <p>Nền tảng học tập hybrid cho Toán, Văn và Tiếng Anh.</p>
        </div>
        <div className="app-footer__links">
          <a href="#">Điều khoản</a>
          <a href="#">Bảo mật</a>
          <a href="#">Hỗ trợ</a>
        </div>
      </div>
    </footer>
  )
}
