export type PublicHeroAction = {
  label: string
  href?: string
}

export type PublicHeroData = {
  title: string
  titleHighlight: string
  description: string
  primaryAction: PublicHeroAction
  secondaryAction: PublicHeroAction
}

export type PublicCourseItem = {
  id: string
  title: string
  description: string
  levelLabel: string
  progress: number
  image: string
}

export type PublicCourseTab = {
  id: string
  label: string
  courses: PublicCourseItem[]
}

export type PublicTestimonial = {
  id: string
  quote: string
  studentName: string
  studentTitle: string
  avatar: string
  featured?: boolean
}

export type PublicFooterLink = {
  label: string
  href: string
}

export type PublicFooterContact = {
  icon: string
  label: string
}

export type PublicFooterColumn = {
  title: string
  links?: PublicFooterLink[]
  contacts?: PublicFooterContact[]
}

export type PublicFooterData = {
  columns: PublicFooterColumn[]
  copyright?: string
}

export type PublicPageData = {
  hero: PublicHeroData
  courseTabs: PublicCourseTab[]
  testimonials: PublicTestimonial[]
}