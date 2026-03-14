import { useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const pageMeta = {
  '/': {
    title: 'Dashboard Overview',
    subtitle: 'Track revenue, performance, and system health in real time.',
  },
  '/users': {
    title: 'Users Management',
    subtitle: 'Manage access, roles, and team activity across your workspace.',
  },
}

const AppLayout = ({ theme, onToggleTheme }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const location = useLocation()

  const currentMeta = useMemo(() => {
    return pageMeta[location.pathname] ?? pageMeta['/']
  }, [location.pathname])

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_0%_0%,rgba(37,99,235,0.12),transparent_45%),radial-gradient(900px_circle_at_100%_0%,rgba(20,184,166,0.10),transparent_45%)] dark:bg-[radial-gradient(1200px_circle_at_0%_0%,rgba(56,189,248,0.12),transparent_45%),radial-gradient(900px_circle_at_100%_0%,rgba(45,212,191,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_35%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.85)_0%,rgba(15,23,42,0)_45%)]" />
      </div>

      <Sidebar
        collapsed={isSidebarCollapsed}
        mobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      <div
        className={`flex min-h-screen flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <Header
          title={currentMeta.title}
          subtitle={currentMeta.subtitle}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onOpenSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <main className="flex-1 px-4 pb-10 pt-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
