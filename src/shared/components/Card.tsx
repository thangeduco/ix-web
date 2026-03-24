
import { PropsWithChildren } from 'react'
import clsx from 'clsx'
import './Card.css'

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <section className={clsx('card', className)}>{children}</section>
}
