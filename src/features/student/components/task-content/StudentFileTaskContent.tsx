import './StudentFileTaskContent.css'
import { useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import type { StudentFileTaskDetail } from '../../types/student.types'
import {
  buildTaskProgressText,
  formatHighestScore,
  resolveTaskSectionTitle,
} from '../../utils/taskContent.utils'
import { TaskContentShell } from './TaskContentShell'

type StudentFileTaskContentProps = {
  data: StudentFileTaskDetail
  onBack: () => void
}

const addFileIndexPrefix = (fileName: string, index: number) => {
  return `${index + 1}.${fileName}`
}

export function StudentFileTaskContent({
  data,
  onBack,
}: StudentFileTaskContentProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const fileUrl = data.file_content?.file?.file_url || ''
  const fileName = data.file_content?.file?.file_name || 'tai-lieu-dinh-kem'

  const accept = useMemo(() => '.jpg,.jpeg,.png,.pdf', [])

  const sidebar = (
    <div className="student-file-task__sidebar">
      <div className="student-file-task__sidebar-title">
        {resolveTaskSectionTitle(data.task_statistics.section_type)}
      </div>

      <div className="student-task-shell__stat-grid">
        <div className="student-task-shell__stat-card">
          <div className="student-task-shell__stat-icon">
            <span className="material-symbols-outlined">groups</span>
          </div>
          <div>
            <span className="student-task-shell__stat-label">Tiến độ lớp học</span>
            <strong className="student-task-shell__stat-value">
              {buildTaskProgressText(
                data.task_statistics.total_student_completed,
                data.task_statistics.total_student_assigned
              )}
            </strong>
          </div>
        </div>

        <div className="student-task-shell__stat-card">
          <div className="student-task-shell__stat-icon">
            <span className="material-symbols-outlined">star</span>
          </div>
          <div>
            <span className="student-task-shell__stat-label">Thành tích cao nhất</span>
            <strong className="student-task-shell__stat-value">
              {formatHighestScore(data.task_statistics.highest_score)}
            </strong>
          </div>
        </div>
      </div>

      <div className="student-file-task__note-card">
        <span className="material-symbols-outlined">lightbulb</span>
        <div>
          <strong>Lưu ý:</strong>
          <p>
            Hãy trình bày bài làm rõ ràng. Nếu con chụp ảnh bài làm, nhớ chụp đủ sáng và
            không bị mờ.
          </p>
        </div>
      </div>
    </div>
  )

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles(files)
  }

  return (
    <TaskContentShell
      classNameText={data.class_info.class_name || 'Lớp học iX'}
      slogan={data.class_info.slogan}
      avatarUrl={data.class_info.avatar_url}
      title={data.task_info.task_title}
      subtitle="Con tải đề bài để xem nội dung và chuẩn bị nộp bài làm khi hoàn thành."
      onBack={onBack}
      sidebar={sidebar}
      meta={
        <div className="student-file-task__meta-row">
          <span className="student-file-task__section-chip">
            {resolveTaskSectionTitle(data.task_statistics.section_type)}
          </span>
        </div>
      }
    >
      <div className="student-file-task__layout">
        <section className="student-file-task__assignment-card">
          <div className="student-file-task__download-card">
            <span className="material-symbols-outlined student-file-task__download-icon">
              picture_as_pdf
            </span>
            <div>
              <a
                className="student-file-task__download-link"
                href={fileUrl || '#'}
                target="_blank"
                rel="noreferrer"
              >
                Tải về đề bài ({fileName})
              </a>
            </div>
          </div>
        </section>

        <section className="student-file-task__submit-card">
          <h3 className="student-file-task__submit-title">
            <span className="material-symbols-outlined">cloud_upload</span>
            Nộp bài làm của con
          </h3>

          <label className="student-file-task__upload-dropzone">
            <input
              type="file"
              multiple
              accept={accept}
              className="student-file-task__file-input"
              onChange={handleFileChange}
            />
            <span className="material-symbols-outlined">upload_file</span>
            <strong>Click để chọn ảnh hoặc kéo thả file vào đây</strong>
            <p>Hỗ trợ nộp nhiều file ảnh (JPG, PNG) hoặc PDF</p>
          </label>

          {selectedFiles.length > 0 ? (
            <div className="student-file-task__selected-files">
              {selectedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${file.size}-${index}`}
                  className="student-file-task__selected-file-item"
                >
                  <span className="material-symbols-outlined">description</span>
                  <span>{addFileIndexPrefix(file.name, index)}</span>
                </div>
              ))}
            </div>
          ) : null}

          <button type="button" className="student-file-task__submit-btn" disabled>
            Nộp bài tập (Chưa hỗ trợ, các con nộp khi đi học trên lớp)
          </button>

          {/* <p className="student-file-task__security-text">
            Bài làm sẽ được chuyển tới giáo viên sau khi tích hợp API submit bài tập.
          </p> */}
        </section>
      </div>
    </TaskContentShell>
  )
}