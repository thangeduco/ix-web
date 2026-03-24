import './PageHeader.css'
import { Button } from './Button'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  actions?: {
    primary?: string
    secondary?: string
  }
}

export function PageHeader({ eyebrow, title, subtitle, actions }: Props) {
  return (
    <section className="page-header">
      <div>
        {eyebrow ? <div className="page-header__eyebrow">{eyebrow}</div> : null}
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>

      {actions?.primary || actions?.secondary ? (
        <div className="page-header__actions">
          {actions?.secondary ? (
            <Button variant="secondary">{actions.secondary}</Button>
          ) : null}
          {actions?.primary ? <Button>{actions.primary}</Button> : null}
        </div>
      ) : null}
    </section>
  )
}