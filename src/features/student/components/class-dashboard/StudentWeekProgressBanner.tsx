// src/features/student/components/class-dashboard/StudentWeekProgressBanner.tsx
type StudentWeekProgressBannerProps = {
  progressPercent: number
  finishedTasks: number
  totalTasks: number
  unfinishedTasks: number
}

export function StudentWeekProgressBanner({
  progressPercent,
  finishedTasks,
  totalTasks,
  unfinishedTasks,
}: StudentWeekProgressBannerProps) {
  return (
    <div className="student-dashboard-body__progress-card">
      <div className="student-dashboard-body__progress-header">
        <h4>Bạn đã hoàn thành {progressPercent}% nhiệm vụ tuần</h4>
        <span className="student-dashboard-body__progress-meta">
          {finishedTasks}/{totalTasks} nhiệm vụ
        </span>
      </div>

      <div
        className="student-dashboard-body__progress-bar"
        aria-label={`Tiến độ tuần ${progressPercent}%`}
      >
        <div
          className="student-dashboard-body__progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <p className="student-dashboard-body__progress-note">
        {unfinishedTasks > 0
          ? `Chỉ còn ${unfinishedTasks} nhiệm vụ nữa thôi. Cố lên nhé!`
          : 'Tuyệt vời! Bạn đã hoàn thành toàn bộ nhiệm vụ tuần.'}
      </p>
    </div>
  )
}