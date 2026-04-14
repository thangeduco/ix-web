// src/features/student/components/task-content/video-lecture/StudentVideoLecturePlayer.tsx
import './StudentVideoLecturePlayer.css'
import type { MutableRefObject } from 'react'
import type { StudentVideoTaskDetail } from '../../../types/student.types'
import type {
  NormalizedQuizEvent,
  NormalizedQuizQuestion,
  VideoLecturePopupState,
  YoutubeResumeRequest,
} from '../../../types/video-lecture.types'
import {
  StudentYoutubePlayer,
  type YoutubePlayerInstance,
} from '../StudentYoutubePlayer'
import { StudentVideoLectureQuizPopup } from './StudentVideoLectureQuizPopup'
import { StudentVideoLectureStatusOverlay } from './StudentVideoLectureStatusOverlay'

type StudentVideoLecturePlayerProps = {
  data: StudentVideoTaskDetail
  taskCode: string
  videoRef: MutableRefObject<HTMLVideoElement | null>
  youtubePlayerRef: MutableRefObject<YoutubePlayerInstance | null>
  youtubeVideoId: string | null
  isYoutubeVideo: boolean
  videoUrl: string
  posterUrl?: string
  videoLoading: boolean
  videoError: string
  videoEnded: boolean
  isYoutubePlaying: boolean
  youtubeResumeRequest: YoutubeResumeRequest
  popupState: VideoLecturePopupState | null
  activeEvent: NormalizedQuizEvent | null
  activeQuestion: NormalizedQuizQuestion | null
  onPlayerReady: () => void | Promise<void>
  onVideoCanPlay: () => void
  onVideoError: () => void
  onTimeUpdate: (currentSecond: number) => void
  onPlay: (currentSecond: number) => void | Promise<void>
  onPause: (currentSecond: number) => void | Promise<void>
  onSeek: (fromSecond: number, toSecond: number) => void | Promise<void>
  onEnded: () => void | Promise<void>
  onSelectPopupAnswer: (answerKey: string) => void
  onSubmitPopupAnswer: () => void | Promise<void>
  onContinueQuiz: () => void | Promise<void>
  getLastTrackedSecond: () => number
}

export function StudentVideoLecturePlayer({
  data,
  taskCode,
  videoRef,
  youtubePlayerRef,
  youtubeVideoId,
  isYoutubeVideo,
  videoUrl,
  posterUrl,
  videoLoading,
  videoError,
  videoEnded,
  isYoutubePlaying,
  youtubeResumeRequest,
  popupState,
  activeEvent,
  activeQuestion,
  onPlayerReady,
  onVideoCanPlay,
  onVideoError,
  onTimeUpdate,
  onPlay,
  onPause,
  onSeek,
  onEnded,
  onSelectPopupAnswer,
  onSubmitPopupAnswer,
  onContinueQuiz,
  getLastTrackedSecond,
}: StudentVideoLecturePlayerProps) {
  return (
    <div className="student-video-task__player-wrap">
      <div className="student-video-task__meta-row">
        <span className="student-video-task__meta-chip">Lecture Video</span>
        <span className="student-video-task__meta-text">
          Task code: {taskCode || 'THANGDD_TODO'}
        </span>
      </div>

      <div className="student-video-task__video-card">
        {isYoutubeVideo && youtubeVideoId ? (
          <StudentYoutubePlayer
            videoId={youtubeVideoId}
            title={data.video_title || data.lecture_video?.title || 'Lecture Video'}
            playerRef={youtubePlayerRef}
            playing={isYoutubePlaying}
            resumeRequest={youtubeResumeRequest}
            onReady={() => {
              void onPlayerReady()
            }}
            onTimeUpdate={onTimeUpdate}
            onPlay={(currentSecond) => {
              void onPlay(currentSecond)
            }}
            onPause={(currentSecond) => {
              void onPause(currentSecond)
            }}
            onSeek={(fromSecond, toSecond) => {
              void onSeek(fromSecond, toSecond)
            }}
            onEnded={() => {
              void onEnded()
            }}
          />
        ) : (
          <video
            ref={videoRef}
            className="student-video-task__video"
            src={videoUrl}
            poster={posterUrl}
            controls
            playsInline
            preload="metadata"
            onLoadedMetadata={() => {
              void onPlayerReady()
            }}
            onCanPlay={onVideoCanPlay}
            onTimeUpdate={(event) => {
              onTimeUpdate(event.currentTarget.currentTime)
            }}
            onPlay={(event) => {
              void onPlay(event.currentTarget.currentTime)
            }}
            onPause={(event) => {
              void onPause(event.currentTarget.currentTime)
            }}
            onSeeked={(event) => {
              const toSecond = event.currentTarget.currentTime
              const fromSecond = getLastTrackedSecond()
              void onSeek(fromSecond, toSecond)
            }}
            onEnded={() => {
              void onEnded()
            }}
            onError={onVideoError}
          />
        )}

        {videoLoading ? (
          <StudentVideoLectureStatusOverlay
            badge="Đang tải"
            title="Hệ thống đang chuẩn bị video bài giảng..."
          />
        ) : null}

        {videoError ? (
          <StudentVideoLectureStatusOverlay badge="Lỗi video" title={videoError} />
        ) : null}

        <StudentVideoLectureQuizPopup
          popupState={popupState}
          activeEvent={activeEvent}
          activeQuestion={activeQuestion}
          onSelectAnswer={onSelectPopupAnswer}
          onSubmitAnswer={() => {
            void onSubmitPopupAnswer()
          }}
          onContinueQuiz={() => {
            void onContinueQuiz()
          }}
        />
      </div>

      {videoEnded ? (
        <div className="student-video-task__tip-card">
          <span className="material-symbols-outlined" aria-hidden="true">
            celebration
          </span>
          <div>
            <strong>Em đã xem xong video</strong>
            <p>
              Hệ thống đã gửi lệnh kết thúc video session. Em có thể quay lại trang
              tuần học để tiếp tục nhiệm vụ khác.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}