// src/features/public/components/PublicTestimonialsSection.tsx
import { useMemo, useState } from 'react'
import './PublicTestimonialsSection.css'
import type { PublicTestimonial } from '../types/public.types'

type PublicTestimonialsSectionProps = {
  testimonials: PublicTestimonial[]
}

const ITEMS_PER_PAGE = 3

export function PublicTestimonialsSection({
  testimonials,
}: PublicTestimonialsSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE)

  const pagedTestimonials = useMemo(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE
    return testimonials.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [currentPage, testimonials])

  const handleDotClick = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }

  return (
    <section className="public-testimonials">
      <div className="public-testimonials__container">
        <div className="public-testimonials__heading">
          <h2>Trải nghiệm từ học viên</h2>
          <div className="public-testimonials__divider" />
        </div>

        <div className="public-testimonials__grid">
          {pagedTestimonials.map((item) => (
            <article
              key={item.id}
              className={`public-testimonials__card ${
                item.featured ? 'is-featured' : ''
              }`}
            >
              <div>
                <blockquote className="public-testimonials__quote">
                  "{item.quote}"
                </blockquote>
              </div>

              <div className="public-testimonials__student">
                <img
                  className="public-testimonials__avatar"
                  src={item.avatar}
                  alt={item.studentName}
                />
                <div>
                  <p className="public-testimonials__student-name">
                    {item.studentName}
                  </p>
                  <p className="public-testimonials__student-title">
                    {item.studentTitle}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="public-testimonials__dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={`testimonial-dot-${index}`}
              type="button"
              className={`public-testimonials__dot ${
                currentPage === index ? 'is-active' : ''
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Chuyển đến trang review ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="public-testimonials__fade" />
    </section>
  )
}