import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/app/layout/MainLayout'
import { AuthLayout } from '@/app/layout/AuthLayout'

// Public Pages
import { PublicLandingPage } from '@/features/public/pages/PublicLandingPage'
import { PublicProgramsPage } from '@/features/public/pages/PublicProgramsPage'
import { TeacherTeamPage } from '@/features/public/pages/TeacherTeamPage'

// Auth Pages
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { RegisterCompactPage } from '@/features/auth/pages/RegisterCompactPage'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'

// Learning / Course / System
import { CourseListPage } from '@/features/course/pages/CourseListPage'
import { CourseDetailPage } from '@/features/course/pages/CourseDetailPage'
import { LessonPage } from '@/features/learning/pages/LessonPage'
import { QuizPage } from '@/features/learning/pages/QuizPage'
import { QuizResultPage } from '@/features/learning/pages/QuizResultPage'

import { HomeworkUploadPage } from '@/features/submission/pages/HomeworkUploadPage'
import { HomeworkGalleryPage } from '@/features/submission/pages/HomeworkGalleryPage'
import { HomeworkViewSubmittedPage } from '@/features/submission/pages/HomeworkViewSubmittedPage'
import { HomeworkResultPage } from '@/features/submission/pages/HomeworkResultPage'
import { SubmissionSuccessPage } from '@/features/submission/pages/SubmissionSuccessPage'
import { PauseSuccessPage } from '@/features/submission/pages/PauseSuccessPage'

import { StudentDashboardPage } from '@/features/dashboard/pages/StudentDashboardPage'
import { ParentDashboardPage } from '@/features/dashboard/pages/ParentDashboardPage'

import { TeacherDashboardPage } from '@/features/teacher/pages/TeacherDashboardPage'
import { WeeklyReviewPage } from '@/features/teacher/pages/WeeklyReviewPage'

import { RankingClassPage } from '@/features/ranking/pages/RankingClassPage'
import { RankingRegionPage } from '@/features/ranking/pages/RankingRegionPage'
import { RankingNationalPage } from '@/features/ranking/pages/RankingNationalPage'

export const router = createBrowserRouter([
  /**
   * PUBLIC + MAIN LAYOUT
   */
  {
    element: <MainLayout />,
    children: [
      // Landing
      { path: '/', element: <PublicLandingPage /> },

      // Public pages
      { path: '/khoa-hoc', element: <PublicProgramsPage /> },
      { path: '/teacher-team', element: <TeacherTeamPage /> },

      // 👉 AUTH ROUTES (đặt ở đây để dùng PublicHeader)
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },

      // Courses
      { path: '/courses', element: <CourseListPage /> },
      { path: '/courses/:courseId', element: <CourseDetailPage /> },

      // Learning
      { path: '/learning/lesson/:lessonId', element: <LessonPage /> },
      { path: '/learning/quiz/:quizId', element: <QuizPage /> },
      { path: '/learning/quiz/:quizId/result', element: <QuizResultPage /> },

      // Submission
      { path: '/submission/upload', element: <HomeworkUploadPage /> },
      { path: '/submission/gallery', element: <HomeworkGalleryPage /> },
      { path: '/submission/view/:submissionId', element: <HomeworkViewSubmittedPage /> },
      { path: '/submission/result/:submissionId', element: <HomeworkResultPage /> },
      { path: '/submission/success', element: <SubmissionSuccessPage /> },
      { path: '/submission/pause-success', element: <PauseSuccessPage /> },

      // Dashboard
      { path: '/dashboard/student', element: <StudentDashboardPage /> },
      { path: '/dashboard/parent', element: <ParentDashboardPage /> },

      // Teacher
      { path: '/teacher/dashboard', element: <TeacherDashboardPage /> },
      { path: '/teacher/reviews/:reviewId', element: <WeeklyReviewPage /> },

      // Ranking
      { path: '/ranking/class', element: <RankingClassPage /> },
      { path: '/ranking/region', element: <RankingRegionPage /> },
      { path: '/ranking/national', element: <RankingNationalPage /> },
    ],
  },

  /**
   * AUTH LAYOUT (dùng nếu bạn có flow riêng như compact / forgot password)
   */
  {
    element: <AuthLayout />,
    children: [
      { path: '/auth/register-compact', element: <RegisterCompactPage /> },
      { path: '/auth/forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
])