
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import clsx from 'clsx'
import './Button.css'

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  full?: boolean
}

export function Button({ variant = 'primary', full, className, children, ...props }: Props) {
  return (
    <button className={clsx('btn', `btn--${variant}`, full && 'btn--full', className)} {...props}>
      {children}
    </button>
  )
}
