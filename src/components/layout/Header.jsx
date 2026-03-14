import { Bell, ChevronDown, LogOut, Menu, Moon, Search, Settings, Sun, UserCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'

const Header = ({ title, subtitle, onToggleTheme, theme, onOpenSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [menuOpen])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 px-4 py-4 backdrop-blur-xl md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center justify-center rounded-xl border border-border bg-background/70 p-2 text-muted-foreground transition hover:text-foreground lg:hidden"
            onClick={onOpenSidebar}
            type="button"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-lg font-semibold leading-tight">{title}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-2xl border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground md:flex">
          <Search className="h-4 w-4" />
          <input
            className="w-52 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            placeholder="Search anything"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="icon-button relative" type="button" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
          </button>
          <button className="icon-button" onClick={onToggleTheme} type="button">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="ml-2 hidden text-xs font-semibold sm:inline">
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </button>
          <div className="relative" ref={menuRef}>
            <button
              className="flex items-center gap-2 rounded-2xl border border-border bg-background/70 px-3 py-2 text-sm font-medium"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              type="button"
            >
              <div className="h-8 w-8 rounded-full bg-primary/20" />
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold">Ava Thompson</p>
                <p className="text-[11px] text-muted-foreground">Admin</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-border bg-card p-2 shadow-card">
                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-muted" type="button">
                  <UserCircle className="h-4 w-4" />
                  Profile
                </button>
                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-muted" type="button">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-rose-500 hover:bg-rose-500/10"
                  onClick={handleLogout}
                  type="button"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
