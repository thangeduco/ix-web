// src/features/student/components/class-dashboard/StudentTaskGroupList.tsx
import type { StudentWeekTask } from '../../types/student.types'

type StudentTaskGroupListProps = {
  tasks: StudentWeekTask[]
  resolveTaskStatusLabel: (status?: string) => string
  resolveTaskActionLabel: (task: StudentWeekTask) => string
  onTaskActionClick?: (task: StudentWeekTask) => void
}

type TaskSection = {
  key: string
  title: string
  sectionType: string
}

const TASK_SECTIONS: TaskSection[] = [
  {
    key: 'extra',
    title: 'A. BTVN thầy cho thêm',
    sectionType: 'HOMEWORK_EXTRA_FOR_STUDENT',
  },
  {
    key: 'class-homework',
    title: 'B. BTVN chung của lớp',
    sectionType: 'HOMEWORK_FOR_CLASS',
  },
  {
    key: 'prepare',
    title: 'C. Chuẩn bị bài trước khi đi học',
    sectionType: 'PREPARE_LESSON_FOR_CLASS',
  },
  {
    key: 'offline',
    title: 'D. Nội dung sẽ học trên lớp',
    sectionType: 'OFFLINE_IN_CLASSROOM',
  },
]

function sortTasks(items: StudentWeekTask[]) {
  return [...items].sort((a, b) => {
    const orderA = typeof a.display_order === 'number' ? a.display_order : 0
    const orderB = typeof b.display_order === 'number' ? b.display_order : 0

    if (orderA !== orderB) return orderA - orderB

    return a.task_title.localeCompare(b.task_title, 'vi')
  })
}

function resolveTaskStatusClass(status?: string) {
  switch (status) {
    case 'STUDENT_DONE':
      return 'student-dashboard-body__task-status-pill--done'
    case 'NEED_STUDENT_CONTINUE':
      return 'student-dashboard-body__task-status-pill--in-progress'
    case 'NEED_STUDENT_DO':
      return 'student-dashboard-body__task-status-pill--todo'
    case 'NO_NEED_STUDENT_DO':
      return 'student-dashboard-body__task-status-pill--waiting'
    default:
      return 'student-dashboard-body__task-status-pill--default'
  }
}

function resolveTaskActionClass(actionLabel: string, isDisabled: boolean) {
  if (isDisabled) {
    return 'student-dashboard-body__task-action-btn--disabled'
  }

  switch (actionLabel) {
    case 'Làm lại':
      return 'student-dashboard-body__task-action-btn--redo'
    case 'Làm tiếp':
      return 'student-dashboard-body__task-action-btn--continue'
    case 'Vào làm':
      return 'student-dashboard-body__task-action-btn--start'
    default:
      return 'student-dashboard-body__task-action-btn--default'
  }
}

function resolveCompletedLabel(value?: number) {
  const totalCompleted =
    typeof value === 'number' && !Number.isNaN(value) ? value : 0

  return `${totalCompleted} bạn`
}

function getTaskContentType(task: StudentWeekTask): string | undefined {
  return (task as StudentWeekTask & { content_type?: string }).content_type
}

function resolveTaskContentTypeIcon(contentType?: string) {
  switch (contentType) {
    case 'VIDEO':
      return 'play_circle'
    case 'FILE':
      return 'description'
    case 'QUIZ_TEST':
      return 'quiz'
    default:
      return null
  }
}

export function StudentTaskGroupList({
  tasks,
  resolveTaskStatusLabel,
  resolveTaskActionLabel,
  onTaskActionClick,
}: StudentTaskGroupListProps) {
  if (!tasks.length) {
    return (
      <div className="student-dashboard-body__empty-card">
        <span className="material-symbols-outlined" aria-hidden="true">
          school
        </span>
        <h3>Chưa có nhiệm vụ tuần</h3>
        <p>
          Khi giáo viên giao nội dung tuần mới, danh sách nhiệm vụ sẽ hiển thị tại đây.
        </p>
      </div>
    )
  }

  return (
    <div className="student-dashboard-body__task-sections">
      {TASK_SECTIONS.map((section) => {
        const sectionTasks = sortTasks(
          tasks.filter((task) => task.section_type === section.sectionType)
        )

        return (
          <section
            key={section.key}
            className="student-dashboard-body__task-section-card"
          >
            <h3 className="student-dashboard-body__task-section-title">
              {section.title}
            </h3>

            {sectionTasks.length > 0 ? (
              <div className="student-dashboard-body__task-table-wrap">
                <table className="student-dashboard-body__task-table">
                  <thead>
                    <tr>
                      <th className="student-dashboard-body__task-col-index">TT</th>
                      <th className="student-dashboard-body__task-col-title">
                        Nội dung
                      </th>
                      <th className="student-dashboard-body__task-col-completed">
                        done
                      </th>
                      <th className="student-dashboard-body__task-col-status">
                        status
                      </th>
                      <th className="student-dashboard-body__task-col-action">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sectionTasks.map((task, index) => {
                      const actionLabel = resolveTaskActionLabel(task)
                      const isDisabled = actionLabel === 'Chờ học trên lớp'
                      const statusClassName = resolveTaskStatusClass(task.task_status)
                      const actionClassName = resolveTaskActionClass(
                        actionLabel,
                        isDisabled
                      )
                      const contentTypeIcon = resolveTaskContentTypeIcon(
                        getTaskContentType(task)
                      )

                      return (
                        <tr key={task.task_code || `${section.key}-${index}`}>
                          <td className="student-dashboard-body__task-index-cell">
                            {index + 1}
                          </td>
                          <td className="student-dashboard-body__task-title-cell">
                            <div className="student-dashboard-body__task-title-content">
                              {contentTypeIcon ? (
                                <span
                                  className="material-symbols-outlined student-dashboard-body__task-type-icon"
                                  aria-hidden="true"
                                >
                                  {contentTypeIcon}
                                </span>
                              ) : null}
                              <span className="student-dashboard-body__task-title-text">
                                {task.task_title}
                              </span>
                            </div>
                          </td>
                          <td className="student-dashboard-body__task-completed-cell">
                            {resolveCompletedLabel(task.total_student_completed)}
                          </td>
                          <td className="student-dashboard-body__task-status-cell">
                            <span
                              className={`student-dashboard-body__task-status-pill ${statusClassName}`}
                            >
                              {resolveTaskStatusLabel(task.task_status)}
                            </span>
                          </td>
                          <td className="student-dashboard-body__task-action-cell">
                            <button
                              type="button"
                              className={`student-dashboard-body__task-action-btn ${actionClassName}`}
                              disabled={isDisabled}
                              onClick={() => {
                                if (isDisabled) return
                                onTaskActionClick?.(task)
                              }}
                            >
                              {actionLabel}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="student-dashboard-body__task-empty">
                Chưa có nội dung cho mục này.
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}