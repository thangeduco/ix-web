import './StudentQuizTaskContent.css'
import { useEffect, useMemo, useState } from 'react'
import type { StudentQuizQuestion, StudentQuizTaskDetail } from '../../types/student.types'
import {
  buildTaskProgressText,
  formatHighestScore,
  resolveTaskSectionTitle,
} from '../../utils/taskContent.utils'
import { TaskContentShell } from './TaskContentShell'

type StudentQuizTaskContentProps = {
  data: StudentQuizTaskDetail
  onBack: () => void
}

type AnswerMap = Record<string, string>

function normalizeQuestions(questions: StudentQuizQuestion[], shuffle = false) {
  const sorted = [...questions].sort((a, b) => a.display_order - b.display_order)

  if (!shuffle) return sorted

  return [...sorted].sort((a, b) => a.id.localeCompare(b.id))
}

export function StudentQuizTaskContent({
  data,
  onBack,
}: StudentQuizTaskContentProps) {
  const config = data.quiz_test?.quiz_test
  const questions = useMemo(
    () => normalizeQuestions(data.quiz_test?.questions || [], !!config?.shuffle_question),
    [config?.shuffle_question, data.quiz_test?.questions]
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState(
    (config?.time_limit_minutes || 0) * 60
  )

  const currentQuestion = questions[currentIndex] ?? null
  const correctCount = questions.filter(
    (question) => answers[question.id] && answers[question.id] === question.correct_answer
  ).length
  const totalScore = questions.reduce((acc, question) => {
    return acc + (answers[question.id] === question.correct_answer ? question.score : 0)
  }, 0)

  useEffect(() => {
    if (!config?.time_limit_minutes || isSubmitted) return

    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer)
          setIsSubmitted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [config?.time_limit_minutes, isSubmitted])

  const formatTimer = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const setAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const sidebar = (
    <div className="student-quiz-task__sidebar">
      <div className="student-task-shell__stat-grid">
        <div className="student-task-shell__stat-card">
          <div className="student-task-shell__stat-icon">
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <div>
            <span className="student-task-shell__stat-label_time">Thời gian còn lại</span>
            <strong className="student-task-shell__stat-value_time">
              {config?.time_limit_minutes ? formatTimer(remainingSeconds) : 'Không giới hạn'}
            </strong>
          </div>
        </div>

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
    </div>
  )

  return (
    <TaskContentShell
      classNameText={data.class_info.class_name || 'Lớp học iX'}
      slogan={data.class_info.slogan}
      avatarUrl={data.class_info.avatar_url}
      title={data.quiz_test?.title || data.task_info.task_title}
      subtitle={config?.description || 'Con làm bài trắc nghiệm và kiểm tra lại đáp án trước khi nộp.'}
      onBack={onBack}
      sidebar={sidebar}
      meta={
        <div className="student-quiz-task__meta-row">
          <span className="student-quiz-task__section-chip">
            {resolveTaskSectionTitle(data.task_statistics.section_type)}
          </span>
          <span className="student-quiz-task__meta-text">
            {questions.length} câu hỏi · Tối đa {config?.max_attempts ?? '—'} lượt làm
          </span>
        </div>
      }
    >
      {isSubmitted ? (
        <section className="student-quiz-task__result-card">
          <h3>Kết quả tạm tính</h3>
          <p>
            + Con trả lời đúng: <strong>{correctCount}</strong> / <strong>{questions.length}</strong> câu.
          </p>
          <p>
            + Tổng điểm hiện tại: <strong>{totalScore}</strong>
          </p>
          <button
            type="button"
            className="student-quiz-task__primary-btn"
            onClick={onBack}
          >
            Về trang tuần học
          </button>
        </section>
      ) : currentQuestion ? (
        <div className="student-quiz-task__content">
          <section className="student-quiz-task__question-card">
            <div className="student-quiz-task__question-head">
              <span className="student-quiz-task__question-no">{currentIndex + 1}</span>
              <h3>{currentQuestion.question_text}</h3>
            </div>

            <div className="student-quiz-task__options">
              {currentQuestion.question_type === 'SINGLE_CHOICE' ? (
                currentQuestion.options.map((option) => (
                  <label key={option.key} className="student-quiz-task__option-item">
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      checked={answers[currentQuestion.id] === option.key}
                      onChange={() => setAnswer(currentQuestion.id, option.key)}
                    />
                    <span>{option.key}. {option.text}</span>
                  </label>
                ))
              ) : (
                <div className="student-quiz-task__text-answer-wrap">
                  <input
                    type="text"
                    className="student-quiz-task__text-answer-input"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(event) => setAnswer(currentQuestion.id, event.target.value)}
                    placeholder="Nhập đáp án của con..."
                  />
                </div>
              )}
            </div>
          </section>

          <div className="student-quiz-task__footer-actions">
            <button
              type="button"
              className="student-quiz-task__secondary-btn"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Câu trước
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                type="button"
                className="student-quiz-task__primary-btn"
                onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
              >
                Câu tiếp theo
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            ) : (
              <button
                type="button"
                className="student-quiz-task__primary-btn"
                onClick={() => setIsSubmitted(true)}
              >
                Nộp bài
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="student-task-shell__empty">
          <h3>Chưa có câu hỏi nào</h3>
          <p>Quiz này chưa có dữ liệu câu hỏi để hiển thị.</p>
        </div>
      )}
    </TaskContentShell>
  )
}
