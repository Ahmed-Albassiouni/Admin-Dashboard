import { create } from 'zustand'

const getInitialAuth = () => {
  if (typeof window === 'undefined') {
    return false
  }
  return window.localStorage.getItem('isAuthenticated') === 'true'
}

const useAuthStore = create((set) => ({
  isAuthenticated: getInitialAuth(),
  login() {
    window.localStorage.setItem('isAuthenticated', 'true')
    set({ isAuthenticated: true })
  },
  logout() {
    window.localStorage.removeItem('isAuthenticated')
    set({ isAuthenticated: false })
  },
}))

export default useAuthStore
