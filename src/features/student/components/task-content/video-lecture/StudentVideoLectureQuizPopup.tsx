// src/features/student/components/task-content/video-lecture/StudentVideoLectureQuizPopup.tsx
import './StudentVideoLectureQuizPopup.css'
import type {
  NormalizedQuizEvent,
  NormalizedQuizQuestion,
  VideoLecturePopupState,
} from '../../../types/video-lecture.types'

type StudentVideoLectureQuizPopupProps = {
  popupState: VideoLecturePopupState | null
  activeEvent: NormalizedQuizEvent | null
  activeQuestion: NormalizedQuizQuestion | null
  onSelectAnswer: (answerKey: string) => void
  onSubmitAnswer: () => void
  onContinueQuiz: () => void
}

export function StudentVideoLectureQuizPopup({
  popupState,
  activeEvent,
  activeQuestion,
  onSelectAnswer,
  onSubmitAnswer,
  onContinueQuiz,
}: StudentVideoLectureQuizPopupProps) {
  if (!popupState || !activeEvent || !activeQuestion) return null

  const selectedAnswer = popupState.selectedAnswer

  return (
    <div className="student-video-task__overlay">
      <div className="student-video-task__popup">
        <span className="student-video-task__popup-badge">Quiz tương tác</span>

        <h3 className="student-video-task__popup-title">
          {activeQuestion.questionText || activeEvent.title}
        </h3>

        <div className="student-video-task__options">
          {activeQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.key
            const isCorrectOption = popupState.isAnswered
              ? option.key === activeQuestion.correctAnswer
              : false
            const isWrongSelected =
              popupState.isAnswered &&
              isSelected &&
              option.key !== activeQuestion.correctAnswer

            let className = 'student-video-task__option-btn'
            if (isSelected) {
              className += ' student-video-task__option-btn--selected'
            }
            if (isCorrectOption) {
              className += ' student-video-task__option-btn--correct'
            }
            if (isWrongSelected) {
              className += ' student-video-task__option-btn--wrong'
            }

            return (
              <button
                key={option.key}
                type="button"
                className={className}
                disabled={popupState.isAnswered}
                onClick={() => onSelectAnswer(option.key)}
              >
                <span>{option.text}</span>
                <span className="material-symbols-outlined" aria-hidden="true">
                  {isCorrectOption
                    ? 'check_circle'
                    : isWrongSelected
                      ? 'cancel'
                      : 'radio_button_unchecked'}
                </span>
              </button>
            )
          })}
        </div>

        <div className="student-video-task__popup-footer">
          {popupState.isAnswered ? (
            <>
              <p
                className={`student-video-task__result-text ${
                  popupState.isCorrect
                    ? 'student-video-task__result-text--correct'
                    : 'student-video-task__result-text--wrong'
                }`}
              >
                {popupState.isCorrect
                  ? 'Chính xác. Em làm rất tốt!'
                  : 'Chưa đúng. Em xem lại và tiếp tục nhé!'}
              </p>

              <button
                type="button"
                className="student-video-task__continue-btn"
                onClick={onContinueQuiz}
              >
                Tiếp tục
              </button>
            </>
          ) : (
            <button
              type="button"
              className="student-video-task__continue-btn"
              disabled={!popupState.selectedAnswer}
              onClick={onSubmitAnswer}
            >
              Trả lời
            </button>
          )}
        </div>
      </div>
    </div>
  )
}