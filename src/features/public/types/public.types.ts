// src/features/public/types/public.types.ts
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

export type PublicUserRole = 'student' | 'parent' | 'teacher' | 'admin'

export type PublicCurrentUser = {
  id: string
  email: string | null
  phone: string | null
  full_name: string
  display_name?: string | null
  avatar_url?: string | null
  slogen?: string | null
  role_code?: PublicUserRole | null
  roles: PublicUserRole[]
}