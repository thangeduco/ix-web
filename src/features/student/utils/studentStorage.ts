// src/features/student/utils/studentStorage.ts
import type { StudentStoredUser } from '../types/student.types'

export function getStoredStudentUser(): StudentStoredUser | null {
  const raw =
    localStorage.getItem('ix_user') || sessionStorage.getItem('ix_user') || null

  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch (error) {
    console.error('[studentStorage] Parse ix_user failed:', error)
    return null
  }
}

export function resolveStudentIdFromStorage(): string {
  const storedUser = getStoredStudentUser()

  if (storedUser?.student_id) return String(storedUser.student_id)
  if (storedUser?.id) return String(storedUser.id)

  return '1001'
}

export function resolveStudentDisplayName(): string {
  const storedUser = getStoredStudentUser()

  if (storedUser?.display_name && storedUser.display_name.trim()) {
    return storedUser.display_name.trim()
  }

  if (storedUser?.full_name && storedUser.full_name.trim()) {
    return storedUser.full_name.trim()
  }

  return 'Học sinh iX'
}

export function resolveStudentAvatar(): string {
  const storedUser = getStoredStudentUser()

  if (storedUser?.avatar_url && storedUser.avatar_url.trim()) {
    return storedUser.avatar_url.trim()
  }

  return 'http://localhost:3000/static/avatars/student_0/avatar.jpg'
}