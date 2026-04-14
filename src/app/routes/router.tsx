// src/app/routes/router.tsx
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

// Student
import { StudentHomePage } from '@/features/student/pages/StudentHomePage'
import { StudentClassDashboardPage } from '@/features/student/pages/StudentClassDashboardPage'
import { StudentWeekDashboardPage } from '@/features/student/pages/StudentWeekDashboardPage'
import StudentVideoTaskContentPage from '@/features/student/pages/task-content/StudentVideoTaskContentPage'
import StudentFileTaskContentPage from '@/features/student/pages/task-content/StudentFileTaskContentPage'
import StudentQuizTaskContentPage from '@/features/student/pages/task-content/StudentQuizTaskContentPage'

// Learning / Course / System
import { CourseListPage } from '@/features/course/pages/CourseListPage'
import { CourseDetailPage } from '@/features/course/pages/CourseDetailPage'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <PublicLandingPage /> },

      // Public pages
      { path: '/khoa-hoc', element: <PublicProgramsPage /> },
      { path: '/teacher-team', element: <TeacherTeamPage /> },

      // Auth routes dùng PublicHeader/PublicFooter
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },

      // Student
      { path: '/student/home', element: <StudentHomePage /> },
      { path: '/student/classes/:classCode', element: <StudentClassDashboardPage /> },
      {
        path: '/student/classes/:classCode/weeks/:weekNo',
        element: <StudentWeekDashboardPage />,
      },
      {
        path: '/student/classes/:classCode/tasks/:taskCode/video',
        element: <StudentVideoTaskContentPage />,
      },
      {
        path: '/student/classes/:classCode/tasks/:taskCode/file',
        element: <StudentFileTaskContentPage />,
      },
      {
        path: '/student/classes/:classCode/tasks/:taskCode/quiz',
        element: <StudentQuizTaskContentPage />,
      },

      // Courses
      { path: '/courses', element: <CourseListPage /> },
      { path: '/courses/:courseId', element: <CourseDetailPage /> },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: '/auth/register-compact', element: <RegisterCompactPage /> },
      { path: '/auth/forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
])
