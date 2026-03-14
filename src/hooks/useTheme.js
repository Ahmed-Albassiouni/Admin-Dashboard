import { useEffect, useState } from 'react'

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light'
  }
  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return { theme, setTheme, toggleTheme }
}

export default useTheme
