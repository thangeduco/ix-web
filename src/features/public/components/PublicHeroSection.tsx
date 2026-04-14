// src/features/public/components/PublicHeroSection.tsx
import './PublicHeroSection.css'
import type { PublicHeroData } from '../types/public.types'

type PublicHeroSectionProps = {
  data: PublicHeroData
}

export function PublicHeroSection({ data }: PublicHeroSectionProps) {
  const descriptionMatch = data.description.match(/^(“[^”]+”)\s*(.*)$/)
  const quoteText = descriptionMatch?.[1] ?? data.description
  const bodyText = descriptionMatch?.[2] ?? ''

  return (
    <section className="public-hero">
      <div className="public-hero__container">
        <h1 className="public-hero__title">
          {data.title}
          <br />
          <span>{data.titleHighlight}</span>
        </h1>

        <p className="public-hero__description">
          <span className="public-hero__quote">{quoteText}</span>
          {bodyText ? <span className="public-hero__body">{bodyText}</span> : null}
        </p>
      </div>

      <div className="public-hero__blur public-hero__blur--right" />
      <div className="public-hero__blur public-hero__blur--left" />
    </section>
  )
}