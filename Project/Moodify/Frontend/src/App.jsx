import React from 'react'
import FaceExpression from './features/Expression/components/FaceExpression'
import "./features/shared/global.scss"
import { router } from './app.routes'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './features/auth/auth.context'

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App