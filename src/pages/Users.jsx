import { RefreshCw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from '../components/ui/Modal'
import UsersTable from '../components/ui/UsersTable'
import useUsersStore from '../store/useUsersStore'

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',
}

const Users = () => {
  const { users, isLoading, error, fetchUsers, addUser, deleteUser } = useUsersStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formState, setFormState] = useState(initialFormState)
  const [notifiedError, setNotifiedError] = useState(null)

  useEffect(() => {
    if (!users.length && !isLoading && !error) {
      fetchUsers()
    }
  }, [users.length, isLoading, error, fetchUsers])

  useEffect(() => {
    if (error && error !== notifiedError) {
      toast.error(error)
      setNotifiedError(error)
    }
  }, [error, notifiedError])

  const handleDeleteUser = (user) => {
    deleteUser(user.id)
    toast.success(`Deleted ${user.firstName} ${user.lastName}`)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const isFormValid = useMemo(() => {
    return (
      formState.firstName.trim() &&
      formState.lastName.trim() &&
      formState.email.trim() &&
      formState.phone.trim()
    )
  }, [formState])

  const handleSubmit = (event) => {
    event.preventDefault()

    const newUser = {
      id: Date.now(),
      firstName: formState.firstName.trim(),
      lastName: formState.lastName.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        `${formState.firstName} ${formState.lastName}`,
      )}`,
      username: `${formState.firstName}.${formState.lastName}`.toLowerCase(),
      company: {
        title: formState.role.trim() || 'Staff',
        department: 'Operations',
      },
    }

    addUser(newUser)
    toast.success(`Added ${newUser.firstName} ${newUser.lastName}`)
    setFormState(initialFormState)
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    setFormState(initialFormState)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormState(initialFormState)
  }

  const tableLoading = isLoading || (!users.length && !error)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Users Management</h2>
          <p className="text-sm text-muted-foreground">
            Keep your team organized with real-time role assignments.
          </p>
        </div>
        <button
          className="icon-button"
          onClick={() => fetchUsers(true)} 
          disabled={isLoading}
          type="button"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="ml-2">Refresh</span>
        </button>
      </div>

      <UsersTable
        users={users}
        isLoading={tableLoading}
        error={error}
        onRetry={fetchUsers}
        onDeleteUser={handleDeleteUser}
        onOpenModal={handleOpenModal}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add New User">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">First Name</label>
              <input
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-background/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Jane"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Last Name</label>
              <input
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-background/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Cooper"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground">Email</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-background/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="jane@company.com"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Phone</label>
              <input
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-background/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+1 555 000 1234"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Role</label>
              <input
                name="role"
                value={formState.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-background/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Product Manager"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
            <button
              className="icon-button"
              type="button"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={!isFormValid}
            >
              Add User
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Users
