import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'
import useTheme from './hooks/useTheme'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Users from './pages/Users'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout theme={theme} onToggleTheme={toggleTheme} />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'rounded-xl border border-border bg-card text-foreground',
        }}
      />
    </BrowserRouter>
  )
}

export default App
