import { ArrowDown, ArrowUp, ArrowUpDown, FileDown, Search, Trash2, UserPlus } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const pageSize = 10

const UsersTable = ({ users, isLoading, error, onRetry, onDeleteUser, onOpenModal }) => {
  const [query, setQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)

  const filteredUsers = useMemo(() => {
    if (!query.trim()) {
      return users
    }
    const lower = query.toLowerCase()
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
      return fullName.includes(lower) || user.email.toLowerCase().includes(lower)
    })
  }, [users, query])

  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers]
    const { key, direction } = sortConfig

    const compare = (a, b) => (direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a))

    if (key === 'name') {
      sorted.sort((a, b) => compare(`${a.firstName} ${a.lastName}`.toLowerCase(), `${b.firstName} ${b.lastName}`.toLowerCase()))
    }

    if (key === 'email') {
      sorted.sort((a, b) => compare(a.email.toLowerCase(), b.email.toLowerCase()))
    }

    if (key === 'role') {
      sorted.sort((a, b) =>
        compare(
          (a.company?.title || 'Staff').toLowerCase(),
          (b.company?.title || 'Staff').toLowerCase(),
        ),
      )
    }

    if (key === 'phone') {
      sorted.sort((a, b) => {
        const phoneA = Number(String(a.phone).replace(/\D/g, ''))
        const phoneB = Number(String(b.phone).replace(/\D/g, ''))
        return direction === 'asc' ? phoneA - phoneB : phoneB - phoneA
      })
    }

    return sorted
  }, [filteredUsers, sortConfig])

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / pageSize))

  useEffect(() => {
    setCurrentPage(1)
  }, [query, sortConfig])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedUsers.slice(start, start + pageSize)
  }, [sortedUsers, currentPage])

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: 'asc' }
    })
  }, [])

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4" />
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    )
  }

  const exportToCsv = () => {
    if (!paginatedUsers.length) {
      toast.error('No data to export on this page.')
      return
    }

    const headers = ['Name', 'Email', 'Phone', 'Role']
    const rows = paginatedUsers.map((user) => [
      `${user.firstName} ${user.lastName}`,
      user.email,
      user.phone,
      user.company?.title || 'Staff',
    ])

    const escapeValue = (value) => `"${String(value).replace(/"/g, '""')}"`
    const csvContent = [headers.map(escapeValue).join(','), ...rows.map((row) => row.map(escapeValue).join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `users-page-${currentPage}.csv`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 0)

    toast.success('CSV exported successfully.')
  }

  if (error) {
    return (
      <div className="glass-card flex flex-col items-center justify-center gap-3 p-10 text-center">
        <p className="text-sm text-muted-foreground">{error}</p>
        <button className="icon-button" onClick={onRetry} type="button">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold">User Directory</h3>
          <p className="text-sm text-muted-foreground">Manage users, roles, and access.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="w-full rounded-xl border border-border bg-background/70 py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search by name or email"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <button className="icon-button" onClick={() => onOpenModal?.()} type="button">
            <UserPlus className="h-4 w-4" />
            <span className="ml-2">Add New</span>
          </button>
          <button className="icon-button" onClick={exportToCsv} type="button">
            <FileDown className="h-4 w-4" />
            <span className="ml-2">Export CSV</span>
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-[860px] w-full text-left text-sm">
          <thead className="text-xs uppercase text-muted-foreground">
            <tr className="... transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
              <th className="pb-3 font-medium">User</th>
              <th className="pb-3 font-medium">
                <button
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"
                  onClick={() => handleSort('name')}
                  type="button"
                >
                  Name
                  {renderSortIcon('name')}
                </button>
              </th>
              <th className="pb-3 font-medium">
                <button
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"
                  onClick={() => handleSort('email')}
                  type="button"
                >
                  Email
                  {renderSortIcon('email')}
                </button>
              </th>
              <th className="pb-3 font-medium">
                <button
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"
                  onClick={() => handleSort('phone')}
                  type="button"
                >
                  Phone
                  {renderSortIcon('phone')}
                </button>
              </th>
              <th className="pb-3 font-medium">
                <button
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"
                  onClick={() => handleSort('role')}
                  type="button"
                >
                  Role
                  {renderSortIcon('role')}
                </button>
              </th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <tr key={`skeleton-${index}`} className="border-t border-border">
                  <td colSpan={6} className="py-4">
                    <div className="h-8 w-full animate-pulse rounded-xl bg-muted" />
                  </td>
                </tr>
              ))
            ) : paginatedUsers.length ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border-t border-border text-sm">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{user.username ?? `${user.firstName}.${user.lastName}`}</p>
                        <p className="text-xs text-muted-foreground">{user.company?.department || 'Operations'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-medium">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="py-4 text-muted-foreground">{user.email}</td>
                  <td className="py-4 text-muted-foreground">{user.phone}</td>
                  <td className="py-4">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {user.company?.title || 'Staff'}
                    </span>
                  </td>
                  <td className="py-4">
                    <button
                      className="inline-flex items-center justify-center rounded-xl border border-border bg-background/70 p-2 text-rose-500 transition hover:bg-rose-500/10"
                      onClick={() => onDeleteUser?.(user)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                  No users found. Try a different search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground md:flex-row">
        <p>
          Showing <span className="font-semibold text-foreground">{paginatedUsers.length}</span> of{' '}
          <span className="font-semibold text-foreground">{sortedUsers.length}</span> users
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="icon-button"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            type="button"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1
            const isActive = page === currentPage
            return (
              <button
                key={`page-${page}`}
                className={`h-9 w-9 rounded-xl border text-sm font-semibold transition ${
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background/70 text-muted-foreground hover:bg-muted'
                }`}
                onClick={() => setCurrentPage(page)}
                type="button"
              >
                {page}
              </button>
            )
          })}
          <button
            className="icon-button"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default UsersTable
