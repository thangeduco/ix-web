
import { InputHTMLAttributes } from 'react'
import './InputField.css'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function InputField({ label, ...props }: Props) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <input className="field__input" {...props} />
    </label>
  )
}
