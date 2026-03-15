import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUsersStore = create(
  persist(
    (set, get) => ({
      users: [],
      isLoading: false,
      error: null,
      
      async fetchUsers(force = false) { // ضفنا كلمة force هنا
        // لو مش force (يعني مش ضغطة زرار) وعندنا داتا، متعملش fetch
        if ((get().users.length > 0 && !force) || get().isLoading) return;

        set({ isLoading: true, error: null })
        try {
          const response = await fetch('https://dummyjson.com/users?limit=50')
          if (!response.ok) {
            throw new Error('Failed to fetch users')
          }
          const data = await response.json()
          set({ users: data.users ?? [], isLoading: false })
        } catch (err) {
          set({ error: err?.message ?? 'Something went wrong', isLoading: false })
        }
      },
      
      addUser(user) {
        set((state) => ({ users: [user, ...state.users] }))
      },
      
      deleteUser(userId) {
        set((state) => ({ users: state.users.filter((user) => user.id !== userId) }))
      },
    }),
    {
      name: 'dashboard-users-storage', // الاسم اللي هيتحفظ بيه في الـ Local Storage
    }
  )
)

export default useUsersStore