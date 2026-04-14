// src/features/student/components/task-content/video-lecture/StudentVideoLectureSidebar.tsx
import './StudentVideoLectureSidebar.css'
import {
  buildTaskProgressText,
  formatDuration,
  formatHighestScore,
  resolveTaskSectionTitle,
} from '../../../utils/taskContent.utils'

type StudentVideoLectureSidebarProps = {
  sectionType?: string
  totalStudentCompleted?: number
  totalStudentAssigned?: number
  highestScore?: number | null
  durationSeconds?: number | null
  trackingError?: string
}

export function StudentVideoLectureSidebar({
  sectionType,
  totalStudentCompleted,
  totalStudentAssigned,
  highestScore,
  durationSeconds,
  trackingError,
}: StudentVideoLectureSidebarProps) {
  return (
    <div className="student-video-task__sidebar">
      <div className="student-video-task__section-badge">
        {resolveTaskSectionTitle(sectionType)}
      </div>

      <div className="student-video-task__info-list">
        <div className="student-task-shell__stat-card">
          <div className="student-task-shell__stat-icon">
            <span className="material-symbols-outlined">groups</span>
          </div>
          <div>
            <span className="student-task-shell__stat-label">Tiến độ lớp</span>
            <strong className="student-task-shell__stat-value">
              {buildTaskProgressText(totalStudentCompleted, totalStudentAssigned)}
            </strong>
          </div>
        </div>

        <div className="student-task-shell__stat-card">
          <div className="student-task-shell__stat-icon">
            <span className="material-symbols-outlined">workspace_premium</span>
          </div>
          <div>
            <span className="student-task-shell__stat-label">Điểm cao nhất</span>
            <strong className="student-task-shell__stat-value">
              {formatHighestScore(highestScore)}
            </strong>
          </div>
        </div>

        <div className="student-task-shell__stat-card">
          <div className="student-task-shell__stat-icon">
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <div>
            <span className="student-task-shell__stat-label">Thời lượng</span>
            <strong className="student-task-shell__stat-value">
              {formatDuration(durationSeconds)}
            </strong>
          </div>
        </div>
      </div>

      <div className="student-video-task__tip-card">
        <span className="material-symbols-outlined" aria-hidden="true">
          tips_and_updates
        </span>
        <div>
          <strong>Mẹo học tập</strong>
          <p>
            Hãy xem video thật tập trung. Khi popup câu hỏi xuất hiện, hệ thống sẽ
            ghi nhận toàn bộ quá trình học và kết quả trả lời của em.
          </p>
        </div>
      </div>

      {trackingError ? (
        <div className="student-video-task__tip-card">
          <span className="material-symbols-outlined" aria-hidden="true">
            warning
          </span>
          <div>
            <strong>Lỗi tracking</strong>
            <p>{trackingError}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}