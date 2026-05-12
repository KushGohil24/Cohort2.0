import React, { useEffect } from 'react'
import { AppLayout } from './AppLayout'
import { AppRoutes } from './app.routes'
import './App.css'
import { useAuth } from '../features/auth/hook/useAuth.js'

const App = () => {
  const { fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  )
}

export default App
