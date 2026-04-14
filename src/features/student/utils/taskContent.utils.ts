// src/features/student/components/task-content/taskContent.utils.ts
export function resolveTaskSectionTitle(sectionType?: string) {
  switch (sectionType) {
    case 'HOMEWORK_EXTRA_FOR_STUDENT':
      return 'A. BTVN thầy cho thêm'
    case 'HOMEWORK_FOR_CLASS':
      return 'B. BTVN chung của lớp'
    case 'PREPARE_LESSON_FOR_CLASS':
      return 'C. Chuẩn bị bài trước khi đi học'
    case 'OFFLINE_IN_CLASSROOM':
      return 'D. Nội dung sẽ học trên lớp'
    default:
      return 'Nhiệm vụ học tập'
  }
}

export function formatHighestScore(value?: number | null) {
  if (value == null || Number.isNaN(value)) return '—'
  if (Number.isInteger(value)) return `${value} điểm`
  return `${value.toFixed(1)} điểm`
}

export function formatDuration(seconds?: number | null) {
  if (!seconds || Number.isNaN(seconds) || seconds < 0) return '00:00'

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainSeconds = seconds % 60

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainSeconds).padStart(2, '0')}`
  }

  return `${String(minutes).padStart(2, '0')}:${String(remainSeconds).padStart(2, '0')}`
}

export function buildTaskProgressText(
  completed?: number,
  assigned?: number
): string {
  const done = typeof completed === 'number' ? completed : 0
  const total = typeof assigned === 'number' ? assigned : 0
  return `${done} / ${total} bạn đã hoàn thành`
}