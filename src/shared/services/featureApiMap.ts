export const featureApiMap = {
  home: {"primary": "/ccc/courses", "secondary": ["/ccc/courses", "/ccc/courses/:courseId"]},
  auth: {"primary": "/iam/auth/register", "secondary": ["/iam/auth/register", "/iam/auth/password-reset/request"]},
  course: {"primary": "/ccc/courses", "secondary": ["/ccc/courses", "/ccc/courses/:courseId", "/ccc/courses/:courseId/weeks"]},
  learning: {"primary": "/lsm/quizzes/:quizId/attempts", "secondary": ["/ccc/lessons/:lessonId", "/lsm/quizzes/:quizId/attempts", "/lsm/quiz-attempts/:attemptId"]},
  submission: {"primary": "/lsm/homeworks/:homeworkId/submissions", "secondary": ["/lsm/homeworks/:homeworkId/submissions", "/lsm/homework-submissions/:submissionId"]},
  dashboard: {"primary": "/pse/weekly-summary", "secondary": ["/pse/weekly-summary", "/pse/weekly-tasks"]},
  ranking: {"primary": "/slp/rankings", "secondary": ["/slp/rankings", "/slp/rankings/compare", "/slp/rankings/calculate"]},
  teacher: {"primary": "/tew/teacher/weekly-reviews", "secondary": ["/tew/teacher/weekly-reviews", "/tew/teacher/assigned-tasks", "/tew/teacher/offline-activity-records"]},
} as const
