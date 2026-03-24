import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/routes/router'
import '@/shared/styles/reset.css'
import '@/shared/styles/theme.css'
import '@/shared/styles/utilities.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element with id "root" was not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)