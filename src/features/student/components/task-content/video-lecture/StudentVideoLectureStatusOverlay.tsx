// src/features/student/components/task-content/video-lecture/StudentVideoLectureStatusOverlay.tsx
import './StudentVideoLectureStatusOverlay.css'

type StudentVideoLectureStatusOverlayProps = {
  badge: string
  title: string
}

export function StudentVideoLectureStatusOverlay({
  badge,
  title,
}: StudentVideoLectureStatusOverlayProps) {
  return (
    <div className="student-video-task__overlay">
      <div className="student-video-task__popup">
        <span className="student-video-task__popup-badge">{badge}</span>
        <h3 className="student-video-task__popup-title">{title}</h3>
      </div>
    </div>
  )
}