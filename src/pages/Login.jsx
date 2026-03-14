import { LockKeyhole } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

const Login = () => {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuthStore()
  const [formState, setFormState] = useState({ email: '', password: '' })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login()
    toast.success('Welcome back!')
    navigate('/')
  }

  return (
    <div className="relative min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_10%_10%,rgba(37,99,235,0.12),transparent_45%),radial-gradient(700px_circle_at_90%_20%,rgba(20,184,166,0.1),transparent_45%)]" />
      </div>
      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-md items-center">
        <div className="glass-card w-full p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Sign in to access your dashboard.</p>
            </div>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Email</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                autoComplete="email"
                className="w-full rounded-xl border border-border bg-background/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@company.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Password</label>
              <input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full rounded-xl border border-border bg-background/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="********"
                required
              />
            </div>
            <button
              className="w-full rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-xs text-muted-foreground">
            Tip: This demo uses a simulated login for portfolio showcase.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
