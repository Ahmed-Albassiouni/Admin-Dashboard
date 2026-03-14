import { ChevronLeft, ChevronRight, LayoutGrid, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutGrid },
  { to: '/users', label: 'Users', icon: Users },
]

const Sidebar = ({ collapsed, mobileOpen, onClose, onToggleCollapse }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm transition-opacity lg:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full flex-col border-r border-border bg-card/95 px-3 pb-6 pt-5 shadow-soft backdrop-blur-xl transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <span className="text-lg font-semibold">AD</span>
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">AdminDock</p>
                <p className="text-xs text-muted-foreground">Premium Console</p>
              </div>
            )}
          </div>
          <button
            className="hidden rounded-xl border border-border bg-background/70 p-2 text-muted-foreground transition hover:text-foreground lg:inline-flex"
            onClick={onToggleCollapse}
            type="button"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <div className="mt-8 flex-1 space-y-2">
          {navItems.map((item) => {
            const ItemIcon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  } ${collapsed ? 'justify-center' : ''}`
                }
              >
                <ItemIcon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            )
          })}
        </div>

        <div className="mt-auto rounded-2xl border border-border bg-muted/40 p-3">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="h-9 w-9 rounded-full bg-primary/15" />
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">Ava Thompson</p>
                <p className="text-xs text-muted-foreground">System Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
