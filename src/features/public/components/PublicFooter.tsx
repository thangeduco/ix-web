import './PublicFooter.css'

type FooterLink = {
  label: string
  href: string
}

type FooterContact = {
  icon: string
  label: string
}

type FooterColumn = {
  title: string
  links?: FooterLink[]
  contacts?: FooterContact[]
}

type FooterData = {
  columns: FooterColumn[]
  copyright?: string
}

const footerData: FooterData = {
  columns: [
    {
      title: 'Khoá học',
      links: [
        { label: 'Toán Tiểu học', href: '#' },
        { label: 'Toán THCS', href: '#' },
        { label: 'Toán THPT', href: '#' },
        { label: 'Luyện thi', href: '#' },
      ],
    },
    {
      title: 'Về iX',
      links: [
        { label: 'Giới thiệu', href: '#' },
        { label: 'Đội ngũ giáo viên', href: '/teacher-team' },
        { label: 'Liên hệ', href: '#' },
        { label: 'Danh sách cơ sở', href: '#' },
      ],
    },
    {
      title: 'Thông tin liên hệ',
      contacts: [
        { icon: 'email', label: 'thangdaoduc.ict@gmail.com' },
        { icon: 'phone', label: '0986019229' },
        {
          icon: 'location',
          label: 'Liền kề 33, 34 - Khu chung cư Athena Complex Xuân Phương',
        },
      ],
    },
  ],
  copyright: '© 2024 IX Education Platform. All rights reserved.',
}

function ContactIcon({ icon }: { icon: string }) {
  if (icon === 'email') {
    return (
      <svg
        className="public-footer__svg-icon public-footer__contact-svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M4.5 7L12 12.5L19.5 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (icon === 'phone') {
    return (
      <svg
        className="public-footer__svg-icon public-footer__contact-svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
      >
        <path
          d="M8.2 4.5L10.3 4C11 3.8 11.8 4.1 12.1 4.8L13.3 7.5C13.6 8.1 13.4 8.9 12.8 9.3L11.4 10.2C12.2 11.9 13.6 13.3 15.3 14.1L16.2 12.7C16.6 12.1 17.4 11.9 18 12.2L20.7 13.4C21.4 13.7 21.7 14.5 21.5 15.2L21 17.3C20.7 18.6 19.6 19.5 18.3 19.5C10.9 19.5 4.5 13.1 4.5 5.7C4.5 4.4 5.4 3.3 6.7 3L8.2 4.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (icon === 'location') {
    return (
      <svg
        className="public-footer__svg-icon public-footer__contact-svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
      >
        <path
          d="M12 21C12 21 18 15.4 18 10C18 6.7 15.3 4 12 4C8.7 4 6 6.7 6 10C6 15.4 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }

  return null
}

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer__container">
        <div className="public-footer__grid">
          {footerData.columns.map((column) => (
            <div key={column.title} className="public-footer__column">
              <h4 className="public-footer__column-title">{column.title}</h4>

              {column.links && column.links.length > 0 && (
                <ul className="public-footer__list">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a className="public-footer__link" href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {column.contacts && column.contacts.length > 0 && (
                <ul className="public-footer__list">
                  {column.contacts.map((contact) => (
                    <li key={contact.label} className="public-footer__contact-item">
                      <span className="public-footer__contact-icon" aria-hidden="true">
                        <ContactIcon icon={contact.icon} />
                      </span>
                      <span>{contact.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {footerData.copyright && (
          <div className="public-footer__bottom">
            <p className="public-footer__copyright">{footerData.copyright}</p>
          </div>
        )}
      </div>
    </footer>
  )
}