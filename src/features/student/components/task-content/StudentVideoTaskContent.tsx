// src/features/student/components/task-content/StudentVideoTaskContent.tsx
import type { StudentVideoTaskDetail } from '../../types/student.types'
import { TaskContentShell } from './TaskContentShell'
import { StudentVideoLecturePlayer } from './video-lecture/StudentVideoLecturePlayer'
import { StudentVideoLectureSidebar } from './video-lecture/StudentVideoLectureSidebar'
import { useStudentVideoLecture } from './video-lecture/useStudentVideoLecture'

type StudentVideoTaskContentProps = {
  data: StudentVideoTaskDetail
  onBack: () => void
}

export function StudentVideoTaskContent({
  data,
  onBack,
}: StudentVideoTaskContentProps) {
  const lecture = useStudentVideoLecture(data)

  const sidebar = (
    <StudentVideoLectureSidebar
      sectionType={data.task_statistics.section_type}
      totalStudentCompleted={data.task_statistics.total_student_completed}
      totalStudentAssigned={data.task_statistics.total_student_assigned}
      highestScore={data.task_statistics.highest_score}
      durationSeconds={data.lecture_video?.duration_seconds}
      trackingError={lecture.trackingError}
    />
  )

  return (
    <TaskContentShell
      classNameText={data.class_info.class_name || 'Lớp học iX'}
      slogan={data.class_info.slogan}
      avatarUrl={data.class_info.avatar_url}
      title={data.video_title || data.lecture_video?.title || 'Video bài giảng'}
      subtitle={data.lecture_video?.description}
      sidebar={sidebar}
      onBack={onBack}
    >
      <StudentVideoLecturePlayer
        data={data}
        taskCode={lecture.taskCode}
        videoRef={lecture.videoRef}
        youtubePlayerRef={lecture.youtubePlayerRef}
        youtubeVideoId={lecture.youtubeVideoId}
        isYoutubeVideo={lecture.isYoutubeVideo}
        videoUrl={lecture.videoUrl}
        posterUrl={lecture.posterUrl}
        videoLoading={lecture.videoLoading}
        videoError={lecture.videoError}
        videoEnded={lecture.videoEnded}
        isYoutubePlaying={lecture.isYoutubePlaying}
        youtubeResumeRequest={lecture.youtubeResumeRequest}
        popupState={lecture.popupState}
        activeEvent={lecture.activeEvent}
        activeQuestion={lecture.activeQuestion}
        onPlayerReady={lecture.handlePlayerReady}
        onVideoCanPlay={lecture.handleVideoCanPlay}
        onVideoError={lecture.handleVideoError}
        onTimeUpdate={lecture.handleTimeUpdate}
        onPlay={lecture.handlePlay}
        onPause={lecture.handlePause}
        onSeek={lecture.handleSeek}
        onEnded={lecture.handleEnded}
        onSelectPopupAnswer={lecture.handleSelectPopupAnswer}
        onSubmitPopupAnswer={lecture.handleSubmitPopupAnswer}
        onContinueQuiz={lecture.handleContinueQuiz}
        getLastTrackedSecond={lecture.getLastTrackedSecond}
      />
    </TaskContentShell>
  )
}