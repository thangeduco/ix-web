// src/shared/components/StatusPill.tsx

import './StatusPill.css'
import clsx from 'clsx'

export function StatusPill({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'success' | 'warning' }) {
  return <span className={clsx('status-pill', `status-pill--${tone}`)}>{children}</span>
}
