import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUsersStore = create(
  persist(
    (set, get) => ({
      users: [],
      isLoading: false,
      error: null,
      
      async fetchUsers() {
        // لو البيانات موجودة بالفعل (سواء من fetch قديم أو متسجلة في المتصفح)، متعملش fetch تاني!
        // ده بيضمن إن أي تعديل (إضافة/حذف) يفضل موجود
        if (get().users.length > 0 || get().isLoading) return;

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