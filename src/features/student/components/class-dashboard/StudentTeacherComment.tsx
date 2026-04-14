// src/features/student/components/class-dashboard/StudentTeacherComment.tsx
type StudentTeacherCommentProps = {
  comment?: string | null
}

export function StudentTeacherComment({
  comment,
}: StudentTeacherCommentProps) {
  if (!comment?.trim()) {
    return (
      <div className="student-dashboard-body__empty-card">
        <span className="material-symbols-outlined" aria-hidden="true">
          school
        </span>
        <h3>Chưa có nhận xét tuần trước</h3>
        <p>
          Khi giáo viên cập nhật nhận xét, nội dung sẽ hiển thị tại đây.
        </p>
      </div>
    )
  }

  return (
    <div className="student-dashboard-body__teacher-comment">
      <div className="student-dashboard-body__teacher-icon">
        <span className="material-symbols-outlined" aria-hidden="true">
          psychology
        </span>
      </div>

      <div className="student-dashboard-body__teacher-content">
        <div className="student-dashboard-body__section-label">
          Lời nhận xét của thầy
        </div>
        <p className="student-dashboard-body__teacher-text">“{comment}”</p>
      </div>
    </div>
  )
}